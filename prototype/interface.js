// Atlas Wanderer — interface : écrans, rendu, déroulement.
'use strict';
// ==== UI ====
const app = document.getElementById('app');
const UI = { screen: 'menu', sel: { heroes: [], dungeon: null }, g: null, rf: null, pb: null, timer: null, timer2: null, notice: '', showLog: false };

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// Pastilles de type : espèce = fond teinté, archétype = contour. Icônes et couleurs viennent de svg.js.
const typeBadges = ts => ts.map(t => {
  const c = AWGfx.typeColor(t), sp = AWGfx.isSpecies(t);
  return `<span class="badge badge-sm gap-1 ${sp ? '' : 'badge-outline'}" style="color:${c};border-color:${c};${sp ? `background:${c}33;` : ''}">${AWGfx.icon(t, { size: 12, color: c, bg: '#1d232a' })}<span class="text-base-content">${t}</span></span>`;
}).join(' ');
const kwBadges = (kw, s) => kw
  .filter(k => !(s && 'shield' in s) || (k === 'shield' ? s.shield : k === 'rebirth' ? s.reb : true))
  .map(k => `<span class="badge badge-xs badge-outline">${KW[k]}</span>`).join(' ');
const skLine = k => `<span class="${TRIG_KIND[k.t] === 'combat' ? 'text-error' : 'text-info'}">${esc(skDesc(k))}</span>`;

// Cartes : le dessin vient de svg.js, l'enveloppe HTML porte les clics et les surbrillances.
const CARD_W = 'w-[10.5rem]';
function servantCard(s, o = {}) {
  const ring = o.att ? 'ring-4 ring-warning' : o.tgt ? 'ring-4 ring-error' : '';
  // En combat, un Bouclier divin perdu ou une Renaissance déjà jouée restent affichés, marqués « utilisé ».
  const kwSpent = ('shield' in s) ? s.kw.filter(k => (k === 'shield' && !s.shield) || (k === 'rebirth' && !s.reb)) : [];
  const art = AWGfx.servantCard({ ...s, kwSpent, skills: [...skillsOf(s).map(k => ({ text: skDesc(k), kind: TRIG_KIND[k.t] })), ...(s.probeA || s.probeH ? [{ text: `Sondes invoquées : +${s.probeA}/+${s.probeH}`, kind: 'combat' }] : [])] }, { width: '100%' });
  return `<div class="${CARD_W} shrink-0 rounded-2xl ${ring} ${o.cls || ''}" ${o.attrs || ''}>${art}${o.extra ? `<div class="flex justify-center gap-1 mt-1">${o.extra}</div>` : ''}</div>`;
}
function equipCard(e, o = {}) {
  return `<div class="${CARD_W} shrink-0 rounded-2xl ${o.cls || ''}" ${o.attrs || ''}>${AWGfx.equipCard({ ...e, skillText: e.skill ? skDesc(e.skill).replace('à lui-même', 'au porteur') : (e.mod ? e.mod.text : ''), skillKind: e.skill ? TRIG_KIND[e.skill.t] : 'combat' }, { width: '100%' })}${o.extra ? `<div class="flex justify-center gap-1 mt-1">${o.extra}</div>` : ''}</div>`;
}
// Lieutenants en cours de partie : mêmes cartes paysage que le choix, avec leurs PV actuels.
const heroesPanel = g => `<div class="flex flex-wrap justify-center gap-3">${g.heroes.map(h => `
  <div class="w-full max-w-[24rem] rounded-2xl">${AWGfx.heroCard({ name: h.def.name, types: h.def.types, hp: h.hp, maxhp: h.maxhp, kw: h.def.kw, powerText: skDesc(h.def.power), powerKind: TRIG_KIND[h.def.power.t] }, { width: '100%' })}</div>`).join('')}</div>`;
// Bandeau fin du donjon en cours : décor et nom à gauche, Boss, PV, type et pouvoir à droite.
const bossPanel = (g, showBoard) => { const d = g.dungeon; return `<div class="flex rounded-2xl overflow-hidden border-2" style="border-color:${AWGfx.typeColor(d.type)}88;background:#151a26">
  <div class="relative w-[28%] shrink-0 min-h-[5.5rem]">
    <div class="absolute inset-0 [&>svg]:w-full [&>svg]:h-full">${AWGfx.dungeonScene(d, { width: '100%' })}</div>
    <div class="absolute inset-x-0 bottom-0 px-2 py-1 bg-gradient-to-t from-black/80 to-transparent"><div class="text-sm sm:text-base font-extrabold text-white leading-tight">${esc(d.name)}</div></div>
  </div>
  <div class="flex-1 min-w-0 px-3 py-2 grid gap-1 content-center">
    <div class="flex flex-wrap items-center gap-2"><b class="text-error text-lg leading-none">${esc(g.boss.name)}</b>${showBoard ? `<span class="badge badge-outline">Plateau ${g.bossCur + 1}/3</span>` : ''}
      <span class="badge badge-error text-black font-black gap-1">${AWGfx.icon('heart', { size: 14, color: '#000' })}${g.boss.hp}/${g.boss.maxhp}</span></div>
    <progress class="progress progress-error w-full h-1.5" value="${g.boss.hp}" max="${g.boss.maxhp}"></progress>
    <div class="flex flex-wrap items-center gap-2"><span class="shrink-0">${AWGfx.typeChipSvg(d.type)}</span><span class="text-xs opacity-80">${esc(d.boss.desc)}</span></div>
  </div></div>`; };
const header = g => `<div class="flex flex-wrap items-center justify-between gap-2 mb-3">
  <h1 class="text-xl font-bold">Atlas Wanderer <span class="badge badge-ghost">prototype</span></h1>
  <div class="flex gap-2 text-sm"><span class="badge badge-lg">Salle ${g.room}</span><span class="badge badge-lg badge-secondary">Renfort niv. ${g.level}</span><span class="badge badge-lg badge-warning">◈ ${g.datacrons} Datacron${g.datacrons > 1 ? 's' : ''}</span>
  <span class="badge badge-lg badge-outline">Types : ${g.types.join(', ')}</span></div></div>`;

// ---------- Écrans ----------
function renderMenu() {
  const sel = UI.sel;
  const heroes = Object.values(HEROES).map(h => `
    <button data-act="selHero" data-id="${h.id}" class="rounded-2xl text-left transition hover:-translate-y-0.5 ${sel.heroes.includes(h.id) ? '' : 'opacity-80 hover:opacity-100'}">
      ${AWGfx.heroCard({ name: h.name, types: h.types, hp: h.hp, kw: h.kw, powerText: skDesc(h.power), powerKind: TRIG_KIND[h.power.t] }, { width: '100%', selected: sel.heroes.includes(h.id) })}</button>`).join('');
  // Carte cliquable ; une fois choisie, le bouton « Sélectionner » apparaît dans la carte et mène aux héros.
  const dungeons = Object.values(DUNGEONS).map(d => { const on = sel.dungeon === d.id; return `
    <div data-act="selDungeon" data-id="${d.id}" class="relative rounded-2xl cursor-pointer transition hover:-translate-y-0.5 ${on ? '' : 'opacity-80 hover:opacity-100'}">
      ${AWGfx.dungeonCard(d, { width: '100%', selected: on })}
      ${on ? '<div class="absolute inset-x-0 top-0 h-[58%] flex items-center justify-center pointer-events-none"><button class="btn btn-primary btn-lg px-10 text-xl shadow-lg pointer-events-auto" data-act="toHeroes">Sélectionner</button></div>' : ''}</div>`; }).join('');
  const types = sel.dungeon ? [...new Set([DUNGEONS[sel.dungeon].type, ...sel.heroes.flatMap(i => HEROES[i].types)])] : [];   // types de la partie, mis à jour à chaque choix
  const title = '<h1 class="text-2xl font-bold mb-3">Atlas Wanderer <span class="badge badge-ghost">prototype</span></h1>';
  if (UI.screen === 'heroes') { const d = DUNGEONS[sel.dungeon]; return `${title}
  <div class="flex flex-col sm:flex-row rounded-2xl overflow-hidden border-2 mb-5" style="border-color:${AWGfx.typeColor(d.type)}88;background:#151a26">
    <div class="relative sm:w-[42%] shrink-0 min-h-[10rem]">
      <div class="absolute inset-0 [&>svg]:w-full [&>svg]:h-full">${AWGfx.dungeonScene(d, { width: '100%' })}</div>
      <div class="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent"><div class="text-2xl font-extrabold text-white">${esc(d.name)}</div></div>
    </div>
    <div class="flex-1 p-4 grid gap-3 content-center">
      <div class="flex flex-wrap items-center gap-3"><div class="text-2xl font-bold text-error">${esc(d.boss.name)}</div><span class="badge badge-lg badge-error text-black font-black text-base gap-1">${AWGfx.icon('heart', { size: 16, color: '#000' })}${d.boss.hp}</span></div>
      <div>${AWGfx.typeChipSvg(d.type)}</div>
      <div class="text-sm">${esc(d.boss.desc)}</div>
    </div>
  </div>
  <h2 class="text-xl font-bold text-center mb-3">Sélection des lieutenants</h2><div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 mb-6">${heroes}</div>
  <div class="grid grid-cols-[auto_1fr_auto] items-center gap-3">
    <button class="btn btn-ghost" data-act="backToDungeon">Changer de donjon</button>
    <div class="flex flex-wrap justify-center gap-1.5">${types.map(AWGfx.typeChipSvg).join('')}</div>
    <button class="btn btn-primary btn-lg" data-act="start" ${sel.heroes.length === 2 ? '' : 'disabled'}>Entrer dans le donjon (${sel.heroes.length}/2)</button>
  </div>`; }
  return `${title}
  <h2 class="font-bold mb-2">Choisis un donjon</h2><div class="grid gap-3 sm:grid-cols-2 mb-6">${dungeons}</div>`;
}

// Main : en renfort les cartes ont leurs boutons, en combat elle est affichée seule.
function handHtml(g, rf) {
  const busy = rf && (rf.offer || rf.reward);
  const discard = i => `<button class="btn btn-xs btn-ghost text-error" data-act="discard" data-i="${i}" ${busy ? 'disabled' : ''} title="Jeter cette carte">Jeter</button>`;
  const drag = i => rf && !busy ? { cls: 'cursor-grab select-none', attrs: `draggable="true" data-drag="hand" data-i="${i}"`, extra: discard(i) } : { extra: '' };
  return g.hand.map((h, i) => h.kind === 'servant' ? servantCard(h.s, drag(i)) : equipCard(h.def, drag(i))).join('')
    || emptySlots(HAND_MAX, 'Ta main est vide', 'Achète un serviteur ou un équipement avec tes Datacrons : il arrive ici, puis tu le glisses sur le plateau.');
}
// Rangée d'emplacements vides en pointillés, avec un message par-dessus.
const emptySlots = (n, title, hint) => `<div class="relative w-full">
  <div class="flex flex-wrap justify-center gap-2 opacity-40">${Array.from({ length: n }, () => '<div class="w-[110px] aspect-[200/330] rounded-xl border-2 border-dashed border-base-content/40"></div>').join('')}</div>
  <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-2"><div class="font-bold text-lg bg-base-300/90 rounded-box px-4 py-1">${title}</div><div class="text-sm bg-base-300/90 rounded-box px-3 py-1 mt-1 max-w-md">${hint}</div></div></div>`;
const handSection = (g, rf) => `<div class="rounded-box border-2 ${g.hand.length ? 'border-base-content/20' : 'border-dashed border-warning/60'} bg-base-200/40 p-3 mb-4">
  <h2 class="font-bold mb-2 text-center">✋ Ta main (${g.hand.length}/${HAND_MAX}) <span class="font-normal text-xs opacity-70">· cartes achetées, pas encore en jeu</span></h2>
  <div class="flex flex-wrap justify-center gap-2">${handHtml(g, rf)}</div></div>`;
function renderRenfort() {
  const g = UI.g, rf = UI.rf, cost = levelCost(g.level), maxed = g.level >= MAX_LEVEL;
  const busy = !!(rf.offer || rf.reward), full = g.hand.length >= HAND_MAX, can = g.datacrons >= 1 && !busy;
  // Le lancement n'apparaît qu'une fois les Datacrons dépensés (ou s'il n'y a plus rien à acheter).
  const launch = !busy && (g.datacrons < 1 || (maxed && full));
  const board = g.board.map((sv, i) => servantCard(sv, {
    cls: 'select-none cursor-grab', attrs: `draggable="true" data-drag="board" data-drop="card" data-uid="${sv.uid}" data-idx="${i}"`
  })).join('');
  const offerCards = rf.offer ? rf.offer.cards.map((d, i) => rf.offer.kind === 'servant'
    ? servantCard({ ...d, maxhp: d.hp, equips: [] }, { cls: 'cursor-pointer hover:ring-2 hover:ring-primary', attrs: `data-act="pickOffer" data-i="${i}"` })
    : equipCard(d, { cls: 'cursor-pointer hover:ring-2 hover:ring-primary', attrs: `data-act="pickOffer" data-i="${i}"` })).join('') : '';
  const reward = rf.reward ? `<dialog class="modal modal-open"><div class="modal-box max-w-4xl">
    <h3 class="font-bold text-lg mb-1">Fusion ! Choisis un serviteur de rang ${rf.reward.rank}</h3>
    <p class="text-sm opacity-70 mb-3">Il rejoint ta main.</p>
    <div class="flex flex-wrap gap-2 justify-center">${rf.reward.cards.map((d, i) => servantCard({ ...d, maxhp: d.hp, equips: [] }, { cls: 'cursor-pointer hover:ring-2 hover:ring-warning', attrs: `data-act="pickReward" data-i="${i}"` })).join('')}</div>
    </div></dialog>` : '';
  return `${bossPanel(g)}
  <div class="my-3 p-3 rounded-box bg-base-200/60 border border-info/30">
    <div class="grid gap-3 sm:grid-cols-[1fr_2fr_1fr] items-stretch">
      <div class="rounded-box bg-base-300/70 p-3 text-center flex flex-col justify-center">
        <div class="text-[11px] uppercase tracking-widest opacity-60">Niveau de renfort</div>
        <div class="text-5xl font-black text-secondary leading-none mt-1">${g.level}</div></div>
      <div class="rounded-box bg-base-300/70 p-3 flex flex-col justify-center gap-2">
        <div class="flex justify-between items-baseline"><span class="text-[11px] uppercase tracking-widest opacity-60">${maxed ? 'Niveau maximum' : `Vers le niveau ${g.level + 1}`}</span>
          ${maxed ? '' : `<span class="text-lg font-bold text-secondary">encore ${cost - g.counter} <span class="text-warning">◈</span></span>`}</div>
        <progress class="progress progress-secondary w-full h-3" value="${maxed ? 1 : g.counter}" max="${maxed ? 1 : cost}"></progress></div>
      <div class="rounded-box bg-base-300/70 p-3 text-center flex flex-col justify-center">
        <div class="text-[11px] uppercase tracking-widest opacity-60">Datacrons</div>
        <div class="text-5xl font-black text-warning leading-none mt-1">${g.datacrons} <span class="text-3xl">◈</span></div></div>
    </div>
    <div class="flex flex-wrap items-center justify-center gap-2 mt-3">
      ${[['buyServant', 'btnServant', 'Serviteur', can && !full], ['buyEquip', 'btnEquip', 'Équipement', can && !full], ['buyLevel', 'btnLevel', maxed ? 'Niveau max' : 'Niveau', can && !maxed]].map(([act, ic, label, ok]) =>
        `<button class="btn btn-neutral border-base-content/20 gap-2 ${ok ? '' : 'opacity-60'}" data-act="${act}" ${ok ? '' : 'disabled'}>${AWGfx.icon(ic, { size: 22, color: ok ? '#7dd3fc' : '#94a3b8' })}${label}${act === 'buyLevel' && maxed ? '' : ' <span class="font-black text-warning">1 ◈</span>'}</button>`).join('')}
      ${full ? '<span class="badge badge-warning">Main pleine</span>' : ''}</div>
    ${launch ? `<div class="flex justify-center mt-3"><button class="btn btn-success btn-lg" data-act="finishRenfort">Lancer la salle suivante</button></div>` : ''}
    ${rf.offer ? `<div class="mt-3 p-3 rounded-box border-2 border-primary"><div class="flex flex-wrap justify-center gap-2">${offerCards}</div></div>` : ''}
  </div>
  <div class="rounded-box border-2 ${g.board.length ? 'border-primary/40' : 'border-dashed border-primary/70'} bg-base-200/40 p-3 mb-3">
    <h2 class="font-bold mb-2 text-center">⚔ Ton plateau (${g.board.length}/${MAX_BOARD}) <span class="font-normal text-xs opacity-70">· seuls ces serviteurs combattent · glisse pour ordonner</span></h2>
    <div class="flex flex-wrap justify-center gap-2 min-h-[8rem]" data-drop="board">${board || emptySlots(MAX_BOARD, 'Ton plateau est vide', 'Glisse un serviteur de ta main jusqu\'ici : sans serviteur, personne ne combattra.')}</div>
  </div>
  ${handSection(g, rf)}
  ${heroesPanel(g)}
  ${reward}`;
}

function renderCombat() {
  const g = UI.g, pb = UI.pb, cur = pb.res.frames[pb.i], prev = pb.res.frames[pb.i - 1];
  // Avant l'impact d'une attaque, on montre encore l'état précédent (la charge se joue sur ces cartes).
  const f = pb.phase === 'pre' && prev ? { p: prev.p, e: prev.e, hl: cur.hl } : cur;
  const row = list => list.length ? list.map(s => servantCard(s, { att: f.hl.att === s.uid, tgt: f.hl.tgt === s.uid, attrs: `data-uid="${s.uid}"` })).join('') : '<div class="opacity-50 text-sm p-6">— vide —</div>';
  // Aucune commande pendant l'animation : seul le bouton de fin apparaît, une fois le combat terminé.
  const controls = pb.done ? `<div class="my-3 p-3 rounded-box bg-base-200/60 border border-info/30 flex justify-center">
    <button class="btn btn-success btn-lg" data-act="next">${g.over ? 'Voir le résultat' : 'Vers le renfort'}</button></div>` : '<div class="my-3"></div>';
  return `${bossPanel(g, true)}
  ${controls}
  <div class="text-center text-xs opacity-60 mt-3 mb-1">Serviteurs du donjon</div>
  <div class="flex flex-wrap justify-center gap-2 min-h-[8rem] mb-2">${row(f.e)}</div>
  <div class="divider my-1">VS</div>
  <div class="flex flex-wrap justify-center gap-2 min-h-[8rem] mb-1">${row(f.p)}</div>
  <div class="text-center text-xs opacity-60 mb-3">Ton plateau</div>
  ${heroesPanel(g)}
  ${handSection(g, null)}`;
}

function renderEnd() {
  const g = UI.g, win = g.over === 'win';
  return `<div class="hero py-10"><div class="hero-content text-center"><div class="max-w-md">
    <h1 class="text-4xl font-bold ${win ? 'text-success' : 'text-error'}">${win ? 'Victoire !' : 'Défaite'}</h1>
    <p class="py-4">${win ? `${esc(g.boss.name)} est vaincu` : 'Vos deux héros sont à terre'} après ${g.room - 1} salle${g.room - 1 > 1 ? 's' : ''}.</p>
    <div class="stats stats-vertical sm:stats-horizontal shadow mb-4">
      <div class="stat"><div class="stat-title">Salles</div><div class="stat-value">${g.room - 1}</div></div>
      <div class="stat"><div class="stat-title">Niveau de renfort</div><div class="stat-value">${g.level}</div></div>
      <div class="stat"><div class="stat-title">PV du Boss</div><div class="stat-value">${g.boss.hp}</div></div></div>
    <div class="text-sm opacity-80 mb-4">Datacrons gagnés : ${g.stats.earned} · restants : ${g.datacrons} · serviteurs : ${g.stats.servants} · équipements : ${g.stats.equips} · contributions au niveau : ${g.stats.contrib} · fusions : ${g.stats.fusions} · cartes jetées : ${g.stats.discarded}</div>
    <div><button class="btn btn-primary" data-act="restart">Nouvelle partie</button></div></div></div></div>`;
}


// ---------- Mode débogage ----------
// Icône fixe en bas à gauche ; le panneau flotte au-dessus du jeu, hors de la mise en page.
const dbg = document.createElement('div');
document.body.appendChild(dbg);
function renderDebug() {
  const g = UI.g, rows = [];
  if (g) {
    rows.push(`Salle ${g.room} · renfort niv. ${g.level} (${g.counter}/${levelCost(g.level)}) · ${g.datacrons} Datacron(s)`);
    rows.push(`Plateau ${g.board.length}/${MAX_BOARD} · main ${g.hand.length}/${HAND_MAX} · types : ${g.types.join(', ')}`);
    rows.push(`Boss ${g.boss.hp}/${g.boss.maxhp} · ${g.heroes.map(h => `${h.def.name} ${h.hp}/${h.maxhp}`).join(' · ')}`);
  }
  if (g) {
    rows.push(`Boss — types cachés : ${g.bossTypes.join(', ')}`);
    g.bossTeams.forEach((t, i) => rows.push(`  Plateau ${i + 1}${i === g.bossCur ? ' (joué)' : ''} : niv. ${t.level}, ${t.board.length} serviteur(s), malus ${t.malus} — ${t.board.map(s => `${s.name} ${s.atk}/${s.hp}`).join(', ') || 'vide'}`));
  }
  if (UI.notice) rows.push(`Fin de renfort : ${UI.notice}`);
  if (UI.screen === 'renfort' && UI.rf) rows.push('', ...UI.rf.log.slice(-30), '', ...g.bossLog.slice(-40));
  if (UI.screen === 'combat' && UI.pb) {
    const pb = UI.pb;
    rows.push(`Image ${pb.i + 1}/${pb.res.frames.length}`);
    if (pb.done) rows.push(pb.res.winner === 'p' ? 'Combat gagné' : pb.res.winner === 'e' ? 'Combat perdu' : 'Égalité', ...pb.lines);
    rows.push('', ...pb.res.frames.slice(0, pb.i + 1).map(x => x.msg).slice(-60));
  }
  dbg.innerHTML = `${UI.showLog ? `<div id="log" class="fixed left-3 bottom-16 z-50 w-[22rem] max-w-[90vw] max-h-[55vh] overflow-y-auto rounded-box bg-black/85 border border-base-content/20 p-3 text-xs font-mono space-y-0.5 pointer-events-auto">${rows.map(r => r ? esc(r) : '<br>').join('<br>')}</div>` : ''}
    <button data-act="toggleLog" class="fixed left-3 bottom-3 z-50 btn btn-circle btn-sm ${UI.showLog ? 'btn-warning' : 'btn-ghost bg-black/50'}" title="Mode débogage">${AWGfx.icon('bug', { size: 18, color: UI.showLog ? '#000' : '#cbd5e1' })}</button>`;
  const l = document.getElementById('log'); if (l) l.scrollTop = l.scrollHeight;
}

function render() {
  const y = window.scrollY;
  app.innerHTML = { menu: renderMenu, heroes: renderMenu, renfort: renderRenfort, combat: renderCombat, end: renderEnd }[UI.screen]();
  renderDebug();
  window.scrollTo(0, y);
}

// ---------- Déroulement ----------
function startCombatUI() {
  const res = runCombat(UI.g.board, UI.g.bossTeams[UI.g.bossCur].board, UI.g);
  UI.pb = { res, i: 0, speed: 700, done: false, lines: null, phase: 'hit', lunge: null };
  UI.screen = 'combat'; showFrame();
}
// Une image du combat. Une attaque se joue en deux temps : la carte charge (état précédent affiché),
// puis l'impact (nouvel état affiché, tremblement, chiffres flottants). Les autres images n'ont qu'un temps.
function showFrame() {
  clearTimeout(UI.timer); clearTimeout(UI.timer2);
  const pb = UI.pb, f = pb.res.frames[pb.i], prev = pb.res.frames[pb.i - 1];
  const attack = !!prev && f.hl.att != null;
  if (attack) {
    pb.phase = 'pre'; render(); playLunge(f);
    UI.timer2 = setTimeout(() => { pb.phase = 'hit'; render(); playImpact(prev, f); }, pb.speed * 0.4);
  } else {
    pb.phase = 'hit'; render(); if (prev) playImpact(prev, f);
  }
  UI.timer = setTimeout(nextFrame, attack ? pb.speed : pb.speed * 0.6);
}
function nextFrame() {
  const pb = UI.pb;
  if (pb.i < pb.res.frames.length - 1) pb.i++;
  if (pb.i >= pb.res.frames.length - 1) finishPb(); else showFrame();
}
function finishPb() {
  const pb = UI.pb; clearTimeout(UI.timer); clearTimeout(UI.timer2);
  pb.i = pb.res.frames.length - 1; pb.phase = 'hit';
  pb.lines = settleCombat(UI.g, pb.res); pb.done = true; render();
}
function openRenfort() {
  const g = UI.g, log = [], inc = incomeFor(g.room);
  g.datacrons += inc; g.stats.earned += inc;
  log.push(`Salle ${g.room} : +${inc} Datacrons.`);
  renfortFx(g, 'startRenfort', m => log.push(m));
  bossRenfort(g);
  UI.rf = { offer: null, reward: null, log };
  UI.screen = 'renfort'; render();
}

const ACT = {
  selHero(d) { const h = UI.sel.heroes, i = h.indexOf(d.id); if (i >= 0) h.splice(i, 1); else if (h.length < 2) h.push(d.id); render(); },
  selDungeon(d) { UI.sel.dungeon = d.id; render(); },
  toHeroes() { UI.screen = 'heroes'; render(); },
  backToDungeon() { UI.screen = 'menu'; render(); },
  start() { UI.g = newGame(UI.sel.heroes, UI.sel.dungeon); UI.notice = ''; openRenfort(); },
  toggleLog() { UI.showLog = !UI.showLog; renderDebug(); },
  next() { UI.notice = ''; if (UI.g.over) { UI.screen = 'end'; render(); } else openRenfort(); },
  // Chaque achat coûte 1 Datacron, payé à l'ouverture du choix (pas d'annulation : pas de relance gratuite).
  buyLevel() {
    const g = UI.g, rf = UI.rf;
    if (g.datacrons < 1 || g.level >= MAX_LEVEL || rf.offer || rf.reward) return;
    g.datacrons--; g.counter++; g.stats.contrib++;
    if (g.counter >= levelCost(g.level)) {
      g.counter -= levelCost(g.level); g.level++;
      rf.log.push(`Niveau de renfort ${g.level} atteint.`);
      if (g.level >= MAX_LEVEL) g.counter = 0;
    }
    render();
  },
  buyServant() { ACT.buy('servant'); },
  buyEquip() { ACT.buy('equip'); },
  buy(kind) {
    const g = UI.g, rf = UI.rf;
    if (g.datacrons < 1 || g.hand.length >= HAND_MAX || rf.offer || rf.reward) return;
    g.datacrons--; rf.offer = { kind, cards: drawCards(g, kind, g.level) }; render();
  },
  pickOffer(d) {
    const g = UI.g, rf = UI.rf, card = rf.offer.cards[+d.i], say = m => rf.log.push(m);
    if (rf.offer.kind === 'servant') { g.hand.push({ kind: 'servant', s: mkServant(card) }); g.stats.servants++; say(`${card.name} rejoint ta main.`); }
    else { g.hand.push({ kind: 'equip', def: card }); g.stats.equips++; say(`${card.name} rejoint ta main.`); }
    rf.offer = null; resolveFusion(g, rf, say); render();
  },
  pickReward(d) {
    const g = UI.g, rf = UI.rf, say = m => rf.log.push(m), card = rf.reward.cards[+d.i];
    g.hand.push({ kind: 'servant', s: mkServant(card) }); say(`${card.name} rejoint ta main.`);
    rf.reward = null; resolveFusion(g, rf, say); render();
  },
  // Jeter une carte de la main (gratuit, sans remboursement) pour libérer une place.
  discard(d) {
    const g = UI.g, rf = UI.rf, h = g.hand[+d.i];
    if (!h || rf.offer || rf.reward) return;
    const name = h.kind === 'servant' ? h.s.name : h.def.name;
    if (typeof confirm === 'function' && !confirm(`Jeter « ${name} » ? Cette carte sera perdue.`)) return;
    g.hand.splice(+d.i, 1); g.stats.discarded++;
    rf.log.push(`${name} est jeté.`); render();
  },
  finishRenfort() {
    const msgs = []; renfortFx(UI.g, 'endRenfort', m => msgs.push(m));
    UI.notice = msgs.join(' '); startCombatUI();
  },
  restart() { clearTimeout(UI.timer); clearTimeout(UI.timer2); UI.screen = 'menu'; UI.sel.heroes = []; render(); }
};
document.addEventListener('click', e => {
  const b = e.target.closest('[data-act]');
  if (b && !b.disabled && ACT[b.dataset.act]) ACT[b.dataset.act](b.dataset);
});
// ---------- Glisser-déposer (renfort) ----------
// main -> plateau : pose un serviteur (sur une carte : devant ou derrière elle, ou remplace si le plateau est plein)
// main -> serviteur : équipe ; plateau -> plateau : change l'ordre. Un dépôt invalide ne fait rien.
const DRAG = { src: null };
const dropSide = (el, e) => { const r = el.getBoundingClientRect(); return e.clientX < r.left + r.width / 2 ? 'l' : 'r'; };
const clearDrop = () => document.querySelectorAll('.drop-l,.drop-r,.drop-on,.drop-zone').forEach(n => n.classList.remove('drop-l', 'drop-r', 'drop-on', 'drop-zone'));
function dragInfo() {
  const d = DRAG.src, g = UI.g;
  if (!d || UI.screen !== 'renfort') return null;
  if (d.kind === 'hand') { const h = g.hand[d.i]; return h ? { from: 'hand', type: h.kind, i: d.i } : null; }
  const i = g.board.findIndex(x => x.uid === d.uid); return i < 0 ? null : { from: 'board', type: 'servant', i };
}
document.addEventListener('dragstart', e => {
  const el = e.target.closest && e.target.closest('[data-drag]');
  if (!el) return;
  DRAG.src = { kind: el.dataset.drag, i: +el.dataset.i, uid: +el.dataset.uid };
  e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', 'atlas');
  el.classList.add('opacity-50');
});
document.addEventListener('dragend', () => { DRAG.src = null; clearDrop(); document.querySelectorAll('[data-drag].opacity-50').forEach(n => n.classList.remove('opacity-50')); });
document.addEventListener('dragover', e => {
  const info = dragInfo(), t = e.target.closest && e.target.closest('[data-drop]');
  if (!info || !t) return;
  const card = t.dataset.drop === 'card';
  if (info.type === 'equip' && !card) return;
  if (card && info.from === 'board' && +t.dataset.uid === DRAG.src.uid) return;
  e.preventDefault(); clearDrop();
  if (info.type === 'equip') t.classList.add('drop-on');
  else if (card) t.classList.add(UI.g.board.length >= MAX_BOARD && info.from === 'hand' ? 'drop-on' : 'drop-' + dropSide(t, e));
  else t.classList.add('drop-zone');
});
document.addEventListener('drop', e => {
  const info = dragInfo(), t = e.target.closest && e.target.closest('[data-drop]');
  if (!info || !t) return;
  e.preventDefault();
  const g = UI.g, rf = UI.rf, say = m => rf.log.push(m), card = t.dataset.drop === 'card';
  const side = card ? dropSide(t, e) : 'r', ti = card ? +t.dataset.idx : g.board.length;
  clearDrop(); DRAG.src = null;
  if (rf.offer || rf.reward) return;
  if (info.type === 'equip') {
    if (!card) return;
    const sv = g.board[ti], eq = g.hand[info.i].def;
    applyEquip(sv, eq); g.hand.splice(info.i, 1); say(`${eq.name} équipé sur ${sv.name}.`);
  } else if (info.from === 'board') {
    const [sv] = g.board.splice(info.i, 1);
    let at = card ? ti + (side === 'r' ? 1 : 0) : g.board.length;
    if (info.i < at) at--;
    g.board.splice(at, 0, sv);
  } else if (g.board.length >= MAX_BOARD) {
    if (!card) { say('Plateau plein : dépose la carte sur un serviteur pour le remplacer.'); }
    else if (typeof confirm !== 'function' || confirm(`Remplacer « ${g.board[ti].name} » ? Ses équipements seront perdus.`)) placeServant(g, info.i, ti, say);
  } else {
    placeServant(g, info.i, null, say);
    if (card) { const sv = g.board.pop(); g.board.splice(ti + (side === 'r' ? 1 : 0), 0, sv); }
  }
  render();
});
render();
