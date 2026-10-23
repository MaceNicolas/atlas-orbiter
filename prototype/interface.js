// Atlas Wanderer — interface : écrans, rendu, déroulement.
'use strict';
// ==== UI ====
const app = document.getElementById('app');
const UI = { screen: 'menu', sel: { heroes: [], dungeon: 'nid' }, g: null, rf: null, pb: null, timer: null, timer2: null, replace: null, notice: '', showLog: false };

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
const heroesPanel = g => `<div class="flex flex-wrap gap-2">${g.heroes.map(h => `
  <div class="card card-compact bg-base-200 flex-1 min-w-[13rem] ${h.hp <= 0 ? 'opacity-50' : ''}"><div class="card-body !p-3 gap-1">
    <div class="flex justify-between items-center"><b>${esc(h.def.name)}</b><span>${typeBadges(h.def.types)}</span></div>
    <progress class="progress progress-success" value="${h.hp}" max="${h.maxhp}"></progress>
    <div class="text-xs">♥ ${h.hp}/${h.maxhp} ${h.def.kw ? `<span class="badge badge-xs badge-outline">${KW[h.def.kw]}</span>` : ''}</div>
    <div class="text-[11px]">${skLine(h.def.power)}</div>
    ${h.hp <= 0 ? '<div class="text-error text-xs">À terre : pouvoirs perdus</div>' : ''}
  </div></div>`).join('')}</div>`;
const bossPanel = g => `<div class="card card-compact bg-base-200 border border-error/30"><div class="card-body !p-3 gap-1">
  <div class="flex justify-between"><b class="text-error">${esc(g.boss.name)}</b><span class="text-xs opacity-70">${esc(g.dungeon.name)}</span></div>
  <progress class="progress progress-error" value="${g.boss.hp}" max="${g.boss.maxhp}"></progress>
  <div class="text-xs">♥ ${g.boss.hp}/${g.boss.maxhp}</div>
  <div class="text-[11px] opacity-80">${esc(g.dungeon.boss.desc)}</div></div></div>`;
const header = g => `<div class="flex flex-wrap items-center justify-between gap-2 mb-3">
  <h1 class="text-xl font-bold">Atlas Wanderer <span class="badge badge-ghost">prototype</span></h1>
  <div class="flex gap-2 text-sm"><span class="badge badge-lg">Salle ${g.room}</span><span class="badge badge-lg badge-secondary">Renfort niv. ${g.level}</span><span class="badge badge-lg badge-warning">◈ ${g.datacrons} Datacron${g.datacrons > 1 ? 's' : ''}</span>
  <span class="badge badge-lg badge-outline">Types : ${g.types.join(', ')}</span></div></div>`;

// ---------- Écrans ----------
function renderMenu() {
  const sel = UI.sel;
  const heroes = Object.values(HEROES).map(h => `
    <button data-act="selHero" data-id="${h.id}" class="card card-compact bg-base-200 text-left border-2 ${sel.heroes.includes(h.id) ? 'border-primary' : 'border-transparent'} hover:border-primary/50">
      <div class="card-body !p-3 gap-1"><b>${esc(h.name)}</b><div>${typeBadges(h.types)}</div>
      <div class="text-xs">♥ ${h.hp} ${h.kw ? '· ' + KW[h.kw] : ''}</div>
      <div class="text-[11px]">${skLine(h.power)}</div></div></button>`).join('');
  const dungeons = Object.values(DUNGEONS).map(d => `
    <button data-act="selDungeon" data-id="${d.id}" class="card card-compact bg-base-200 text-left border-2 ${sel.dungeon === d.id ? 'border-primary' : 'border-transparent'} hover:border-primary/50">
      <div class="card-body !p-3 gap-1"><b>${esc(d.name)}</b><div class="text-xs">Type du donjon : ${typeBadges([d.type])}</div>
      <div class="text-xs">Boss : <b>${esc(d.boss.name)}</b> · ♥ ${d.boss.hp}</div>
      <div class="text-[11px] opacity-80">${esc(d.boss.desc)}</div></div></button>`).join('');
  const types = sel.heroes.length === 2 ? [...new Set([...sel.heroes.flatMap(i => HEROES[i].types), DUNGEONS[sel.dungeon].type])] : [];
  return `<h1 class="text-2xl font-bold mb-1">Atlas Wanderer <span class="badge badge-ghost">prototype</span></h1>
  <h2 class="font-bold mb-2">1. Choisis deux héros (${sel.heroes.length}/2)</h2><div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-5 mb-4">${heroes}</div>
  <h2 class="font-bold mb-2">2. Choisis un donjon</h2><div class="grid gap-2 sm:grid-cols-2 mb-4">${dungeons}</div>
  <div class="mb-4 text-sm">${types.length ? `Types de la partie (${types.length}) : ${typeBadges(types)}` : 'Sélectionne deux héros.'}</div>
  <button class="btn btn-primary" data-act="start" ${sel.heroes.length === 2 ? '' : 'disabled'}>Partir en exploration</button>`;
}

// Main : en renfort les cartes ont leurs boutons, en combat elle est affichée seule.
function handHtml(g, rf) {
  const busy = rf && (rf.offer || rf.reward);
  const discard = i => `<button class="btn btn-xs btn-ghost text-error" data-act="discard" data-i="${i}" ${busy ? 'disabled' : ''} title="Jeter cette carte">Jeter</button>`;
  return g.hand.map((h, i) => h.kind === 'servant'
    ? servantCard(h.s, { extra: rf ? `<button class="btn btn-xs btn-primary" data-act="placeServant" data-i="${i}" ${busy ? 'disabled' : ''}>Poser</button>${discard(i)}` : '' })
    : equipCard(h.def, { cls: rf && rf.equipHand === i ? 'ring-2 ring-primary' : '',
        extra: rf ? `<button class="btn btn-xs btn-primary" data-act="selHandEquip" data-i="${i}" ${busy || !g.board.length ? 'disabled' : ''}>Équiper</button>${discard(i)}` : '' })).join('')
    || '<div class="opacity-50 text-sm p-4">— vide —</div>';
}
const handSection = (g, rf) => `<h2 class="font-bold mt-3 mb-1 text-center">Ta main (${g.hand.length}/${HAND_MAX})</h2>
  <div class="flex flex-wrap justify-center gap-2 mb-4">${handHtml(g, rf)}</div>`;
// Bouton fixe en bas à droite : lance la salle suivante / continue.
const nextBtn = (act, label, disabled) => `<div class="h-24"></div>
  <button class="btn btn-primary btn-lg fixed bottom-4 right-4 z-30 shadow-xl" data-act="${act}" ${disabled ? 'disabled' : ''}>${label}</button>`;

function renderRenfort() {
  const g = UI.g, rf = UI.rf, cost = levelCost(g.level), maxed = g.level >= MAX_LEVEL;
  const busy = !!(rf.offer || rf.reward), full = g.hand.length >= HAND_MAX, can = g.datacrons >= 1 && !busy;
  const equipMode = rf.equipHand != null;
  const board = g.board.map((s, i) => servantCard(s, {
    cls: equipMode ? 'cursor-pointer ring-2 ring-primary/60 hover:ring-primary' : '',
    attrs: equipMode ? `data-act="equipTarget" data-uid="${s.uid}"` : '',
    extra: `<div class="join justify-center mt-1">
      <button class="btn btn-xs join-item" data-act="mv" data-uid="${s.uid}" data-dir="-1" ${i === 0 ? 'disabled' : ''}>◀</button>
      <button class="btn btn-xs join-item" data-act="mv" data-uid="${s.uid}" data-dir="1" ${i === g.board.length - 1 ? 'disabled' : ''}>▶</button></div>`
  })).join('');
  const offerCards = rf.offer ? rf.offer.cards.map((d, i) => rf.offer.kind === 'servant'
    ? servantCard({ ...d, maxhp: d.hp, equips: [] }, { cls: 'cursor-pointer hover:ring-2 hover:ring-primary', attrs: `data-act="pickOffer" data-i="${i}"` })
    : equipCard(d, { cls: 'cursor-pointer hover:ring-2 hover:ring-primary', attrs: `data-act="pickOffer" data-i="${i}"` })).join('') : '';
  const reward = rf.reward ? `<dialog class="modal modal-open"><div class="modal-box max-w-4xl">
    <h3 class="font-bold text-lg mb-1">Fusion ! Choisis un serviteur de rang ${rf.reward.rank}</h3>
    <p class="text-sm opacity-70 mb-3">Il rejoint ta main.</p>
    <div class="flex flex-wrap gap-2 justify-center">${rf.reward.cards.map((d, i) => servantCard({ ...d, maxhp: d.hp, equips: [] }, { cls: 'cursor-pointer hover:ring-2 hover:ring-warning', attrs: `data-act="pickReward" data-i="${i}"` })).join('')}</div>
    </div></dialog>` : '';
  const modal = UI.replace != null ? `<dialog class="modal modal-open"><div class="modal-box max-w-5xl">
    <h3 class="font-bold text-lg mb-1">Plateau plein : quel serviteur remplacer ?</h3>
    <p class="text-sm opacity-70 mb-3">Les équipements du serviteur remplacé sont perdus.</p>
    <div class="flex flex-wrap gap-2 justify-center">${g.board.map((s, i) => servantCard(s, { cls: 'cursor-pointer hover:ring-2 hover:ring-error', attrs: `data-act="doReplace" data-ri="${i}"` })).join('')}</div>
    <div class="modal-action"><button class="btn" data-act="cancelReplace">Annuler</button></div></div></dialog>` : '';
  return `${header(g)}
  ${bossPanel(g)}
  <div class="my-3 p-3 rounded-box bg-base-200/60 border border-info/30 text-center">
    <div class="font-bold">Renfort · ◈ ${g.datacrons} Datacron${g.datacrons > 1 ? 's' : ''}</div>
    <div class="text-sm">Niveau de renfort ${g.level}${maxed ? ' (maximum)' : ` : contribution ${g.counter}/${cost} pour le niveau ${g.level + 1}`}. Rang maximum des propositions : ${g.level}.</div>
    ${maxed ? '' : `<progress class="progress progress-secondary w-full max-w-md my-1" value="${g.counter}" max="${cost}"></progress>`}
    <div class="flex flex-wrap justify-center gap-2 my-2">
      <button class="btn ${maxed ? 'btn-disabled opacity-40 grayscale' : 'btn-secondary'}" data-act="buyLevel" ${can && !maxed ? '' : 'disabled'}>${maxed ? 'Niveau max' : 'Niveau (1 ◈)'}</button>
      <button class="btn btn-primary" data-act="buyServant" ${can && !full ? '' : 'disabled'}>Serviteur (1 ◈)</button>
      <button class="btn btn-accent" data-act="buyEquip" ${can && !full ? '' : 'disabled'}>Équipement (1 ◈)</button></div>
    <div class="text-xs opacity-70">Chaque choix coûte 1 Datacron et propose 3 cartes au hasard.${full ? ' <span class="badge badge-warning badge-sm">Main pleine : pose ou jette une carte</span>' : ''}</div>
    ${rf.offer ? `<div class="mt-3 p-3 rounded-box border-2 border-primary"><div class="font-bold mb-1">Choisis ${rf.offer.kind === 'servant' ? 'un serviteur' : 'un équipement'} (déjà payé)</div>
      <div class="flex flex-wrap justify-center gap-2">${offerCards}</div></div>` : ''}
    ${rf.log.length ? `<div class="text-xs mt-2 opacity-80">${rf.log.slice(-4).map(esc).join('<br>')}</div>` : ''}
  </div>
  <h2 class="font-bold mb-1 text-center">Ton plateau (${g.board.length}/${MAX_BOARD}) ${equipMode ? '<span class="badge badge-primary">Choisis le serviteur à équiper</span> <button class="btn btn-xs" data-act="cancelEquip">Annuler</button>' : ''}</h2>
  <div class="flex flex-wrap justify-center gap-2 min-h-[8rem] mb-3">${board || '<div class="opacity-50 text-sm p-6">— plateau vide : pose des serviteurs depuis ta main —</div>'}</div>
  ${heroesPanel(g)}
  ${handSection(g, rf)}
  ${nextBtn('finishRenfort', 'Lancer la salle suivante ▶', busy)}${modal}${reward}`;
}

function renderCombat() {
  const g = UI.g, pb = UI.pb, cur = pb.res.frames[pb.i], prev = pb.res.frames[pb.i - 1];
  // Avant l'impact d'une attaque, on montre encore l'état précédent (la charge se joue sur ces cartes).
  const f = pb.phase === 'pre' && prev ? { p: prev.p, e: prev.e, hl: cur.hl } : cur;
  const row = list => list.length ? list.map(s => servantCard(s, { att: f.hl.att === s.uid, tgt: f.hl.tgt === s.uid, attrs: `data-uid="${s.uid}"` })).join('') : '<div class="opacity-50 text-sm p-6">— vide —</div>';
  const log = pb.res.frames.slice(0, pb.i + 1).map(x => x.msg).slice(-60);
  const speeds = [['Lent', 1100], ['Normal', 700], ['Rapide', 300]];
  return `${header(g)}
  ${UI.notice ? `<div class="alert alert-success mb-3 text-sm">${esc(UI.notice)}</div>` : ''}
  ${bossPanel(g)}
  <div class="text-center text-xs opacity-60 mt-3 mb-1">Serviteurs du donjon</div>
  <div class="flex flex-wrap justify-center gap-2 min-h-[8rem] mb-2">${row(f.e)}</div>
  <div class="divider my-1">VS</div>
  <div class="flex flex-wrap justify-center gap-2 min-h-[8rem] mb-1">${row(f.p)}</div>
  <div class="text-center text-xs opacity-60 mb-3">Ton plateau</div>
  ${heroesPanel(g)}
  ${handSection(g, null)}
  <div class="flex flex-wrap items-center gap-2 mb-2">
    ${pb.done ? '' : `<div class="join">${speeds.map(([n, v]) => `<button class="btn btn-sm join-item ${pb.speed === v ? 'btn-active' : ''}" data-act="speed" data-v="${v}">${n}</button>`).join('')}</div>
    <button class="btn btn-sm btn-outline" data-act="skip">Passer l'animation</button>`}
    <button class="btn btn-sm btn-ghost" data-act="toggleLog">${UI.showLog ? 'Masquer le journal' : 'Journal'}</button>
    ${UI.showLog ? `<span class="text-xs opacity-60">Image ${pb.i + 1}/${pb.res.frames.length}</span>` : ''}</div>
  ${UI.showLog ? `<div id="log" class="bg-base-200 rounded-box p-3 h-48 overflow-y-auto text-sm font-mono space-y-0.5">${log.map(esc).join('<br>')}</div>` : ''}
  ${pb.done ? `<div class="alert ${pb.res.winner === 'p' ? 'alert-success' : pb.res.winner === 'e' ? 'alert-error' : 'alert-warning'} mt-3">
    <div><div class="font-bold">${pb.res.winner === 'p' ? 'Combat gagné' : pb.res.winner === 'e' ? 'Combat perdu' : 'Égalité'}</div>
    ${pb.lines.map(l => `<div class="text-sm">${esc(l)}</div>`).join('')}</div></div>
    ${nextBtn('next', g.over ? 'Voir le résultat ▶' : 'Vers le renfort ▶', false)}` : ''}`;
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

function render() {
  const y = window.scrollY;
  app.innerHTML = { menu: renderMenu, renfort: renderRenfort, combat: renderCombat, end: renderEnd }[UI.screen]();
  const l = document.getElementById('log'); if (l) l.scrollTop = l.scrollHeight;
  window.scrollTo(0, y);
}

// ---------- Déroulement ----------
function startCombatUI() {
  const res = runCombat(UI.g.board, genEnemies(UI.g), UI.g);
  UI.pb = { res, i: 0, speed: UI.pb ? UI.pb.speed : 700, done: false, lines: null, phase: 'hit', lunge: null };
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
  UI.rf = { offer: null, reward: null, equipHand: null, log };
  UI.replace = null; UI.screen = 'renfort'; render();
}

const ACT = {
  selHero(d) { const h = UI.sel.heroes, i = h.indexOf(d.id); if (i >= 0) h.splice(i, 1); else if (h.length < 2) h.push(d.id); render(); },
  selDungeon(d) { UI.sel.dungeon = d.id; render(); },
  start() { UI.g = newGame(UI.sel.heroes, UI.sel.dungeon); UI.notice = ''; openRenfort(); },
  speed(d) { UI.pb.speed = +d.v; render(); },
  toggleLog() { UI.showLog = !UI.showLog; render(); },
  skip() { finishPb(); },
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
  placeServant(d) {
    const g = UI.g, rf = UI.rf;
    if (g.board.length >= MAX_BOARD) { UI.replace = +d.i; render(); return; }
    placeServant(g, +d.i, null, m => rf.log.push(m)); render();
  },
  doReplace(d) {
    const g = UI.g, rf = UI.rf;
    placeServant(g, UI.replace, +d.ri, m => rf.log.push(m)); UI.replace = null; render();
  },
  cancelReplace() { UI.replace = null; render(); },
  // Jeter une carte de la main (gratuit, sans remboursement) pour libérer une place.
  discard(d) {
    const g = UI.g, rf = UI.rf, h = g.hand[+d.i];
    if (!h || rf.offer || rf.reward) return;
    const name = h.kind === 'servant' ? h.s.name : h.def.name;
    if (typeof confirm === 'function' && !confirm(`Jeter « ${name} » ? Cette carte sera perdue.`)) return;
    g.hand.splice(+d.i, 1); rf.equipHand = null; g.stats.discarded++;
    rf.log.push(`${name} est jeté.`); render();
  },
  selHandEquip(d) { UI.rf.equipHand = +d.i; render(); },
  cancelEquip() { UI.rf.equipHand = null; render(); },
  equipTarget(d) {
    const g = UI.g, rf = UI.rf, s = g.board.find(x => x.uid === +d.uid), e = g.hand[rf.equipHand].def;
    applyEquip(s, e); g.hand.splice(rf.equipHand, 1);
    rf.log.push(`${e.name} équipé sur ${s.name}.`); rf.equipHand = null; render();
  },
  mv(d) {
    const b = UI.g.board, i = b.findIndex(x => x.uid === +d.uid), j = i + +d.dir;
    if (j >= 0 && j < b.length) { [b[i], b[j]] = [b[j], b[i]]; render(); }
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
render();
