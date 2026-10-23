// Atlas Wanderer — moteur de règles : combat automatique, partie, renfort, fusion.
'use strict';
// =====================================================================
// MOTEUR DE RÈGLES
// =====================================================================
function mkServant(d) {
  return { uid: uid(), name: d.name, rank: d.rank, atk: d.atk, hp: d.hp, maxhp: d.hp,
           types: [...d.types], kw: [...d.kw], skill: d.skill, equips: [], eqSkills: [], probeA: 0, probeH: 0 };
}
// Compétences d'un serviteur : la sienne, puis celles que ses équipements lui donnent.
const skillsOf = s => [s.skill, ...(s.eqSkills || [])].filter(Boolean);

// Règle : Bouclier divin annule la première source de dégâts ; Poison détruit
// tout serviteur auquel il inflige réellement des dégâts.
function hit(t, amt, src) {
  if (amt <= 0) return false;
  if (t.shield) { t.shield = false; return false; }
  t.hp -= amt;
  if (src && src.kw.includes('poison')) t.hp = Math.min(t.hp, 0);
  return true;
}

function applyFx(k, src, allies, enemies, say) {
  const alive = l => l.filter(s => s.hp > 0);
  const buff = (s, a, h) => { s.atk += a; s.hp += h; s.maxhp += h; };
  switch (k.fx) {
    case 'buffSelf':
      buff(src, k.a, k.h); say(`${src.name} gagne +${k.a}/+${k.h}.`); break;
    case 'buffAllies': {
      const c = alive(allies).filter(s => s !== src);
      c.forEach(s => buff(s, k.a, k.h));
      if (c.length) say(`${src.name} donne +${k.a}/+${k.h} aux autres alliés.`); break;
    }
    case 'buffRandomAlly': {
      let c = alive(allies).filter(s => s !== src);
      if (!c.length) c = alive(allies);
      if (c.length) { const t = pick(c); buff(t, k.a, k.h); say(`${src.name} donne +${k.a}/+${k.h} à ${t.name}.`); }
      break;
    }
    case 'buffLeftmost': {
      const t = alive(allies)[0];
      if (t) { buff(t, k.a, k.h); say(`${src.name} donne +${k.a}/+${k.h} à ${t.name}.`); }
      break;
    }
    case 'buffAdjacent': {
      const i = allies.indexOf(src), c = [allies[i - 1], allies[i + 1]].filter(s => s && s.hp > 0);
      c.forEach(s => buff(s, k.a, k.h));
      if (c.length) say(`${src.name} donne +${k.a}/+${k.h} à ${c.map(s => s.name).join(' et ')}.`);
      break;
    }
    case 'buffEquippedAlly': {
      const c = alive(allies).filter(s => s !== src && s.equips.length);
      if (c.length) { const t = pick(c); buff(t, k.a, k.h); say(`${src.name} donne +${k.a}/+${k.h} à ${t.name} (équipé).`); }
      break;
    }
    case 'buffPerType': {
      const n = Math.min(3, new Set(alive(allies).flatMap(s => s.types)).size);
      if (n) { buff(src, k.a * n, k.h * n); say(`${src.name} gagne +${k.a * n}/+${k.h * n} (${n} types dans l'équipe).`); }
      break;
    }
    case 'debuffRandomEnemy': {
      const c = alive(enemies);
      if (c.length) { const t = pick(c); t.atk = Math.max(0, t.atk - k.n); say(`${src.name} retire ${k.n} ATQ à ${t.name}.`); }
      break;
    }
    case 'summon': {
      if (allies.length >= MAX_BOARD) { say(`${src.name} ne peut pas invoquer : plateau plein.`); break; }
      // Les équipements du serviteur renforcent les sondes qu'il invoque (probeA / probeH).
      const pa = src.probeA || 0, ph = src.probeH || 0;
      const a = { uid: uid(), name: 'Sonde', rank: 1, atk: k.a + pa, hp: k.h + ph, maxhp: k.h + ph, types: [], kw: [], skill: null, equips: [], eqSkills: [], shield: false, reb: false };
      allies.splice(allies.indexOf(src) + 1, 0, a);
      say(`${src.name} invoque une sonde ${a.atk}/${a.hp} à sa droite.`); break;
    }
    case 'dmgRandomEnemy': {
      const c = alive(enemies);
      if (c.length) { const t = pick(c); hit(t, k.n, null); say(`${src.name} inflige ${k.n} dégâts à ${t.name}.`); }
      break;
    }
  }
}

function applyEquip(s, eq) {
  s.atk += eq.atk; s.hp += eq.hp; s.maxhp += eq.hp;
  if (eq.kw && !s.kw.includes(eq.kw)) s.kw.push(eq.kw);
  s.equips.push(eq.name);
  if (eq.skill) s.eqSkills.push(eq.skill);
  if (eq.mod) { s.probeA += eq.mod.probeA; s.probeH += eq.mod.probeH; }
}

// Combat automatique. Travaille sur des copies : les serviteurs du joueur
// « reviennent » donc intacts pour le combat suivant.
function runCombat(playerBoard, enemyBoard, ctx) {
  const frames = [];
  const cl = s => ({ ...s, equips: [...s.equips], kw: [...s.kw], shield: s.kw.includes('shield'), reb: s.kw.includes('rebirth') });
  const B = { p: playerBoard.map(cl), e: enemyBoard.map(cl) };
  const other = side => (side === 'p' ? 'e' : 'p');
  const say = (msg, hl) => frames.push({ p: B.p.map(s => ({ ...s })), e: B.e.map(s => ({ ...s })), msg, hl: hl || {} });

  function deaths(prio = []) {
    for (let guard = 0; guard < 500; guard++) {
      const all = [...B.p.map(s => ['p', s]), ...B.e.map(s => ['e', s])].filter(([, s]) => s.hp <= 0);
      if (!all.length) return;
      all.sort((a, b) => {
        const ia = prio.indexOf(a[1].uid), ib = prio.indexOf(b[1].uid);
        return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
      });
      const [side, s] = all[0];
      say(`${s.name} (${side === 'p' ? 'allié' : 'ennemi'}) meurt.`, { dead: [s.uid] });
      B[side].splice(B[side].indexOf(s), 1);
      skillsOf(s).filter(k => k.t === 'deathrattle').forEach(k => applyFx(k, s, B[side], B[other(side)], m => say(m)));
      if (s.reb) {
        if (B[side].length < MAX_BOARD) {
          B[side].push({ ...s, uid: uid(), hp: 1, reb: false, shield: false });
          say(`${s.name} renaît avec 1 PV, à l'extrême droite.`);
        } else say(`${s.name} ne peut pas renaître : plateau plein.`);
      }
    }
  }

  say('Début du combat.');
  const startFx = (list, allies, enemies) => list.forEach(s => {
    skillsOf(s).filter(k => k.t === 'startCombat').forEach(k => applyFx(k, s, allies, enemies, m => say(m)));
  });
  startFx([...B.p], B.p, B.e);
  ctx.heroes.forEach(h => {
    if (h.hp > 0 && h.def.power && h.def.power.t === 'startCombat')
      applyFx(h.def.power, { name: h.def.name, kw: [] }, B.p, B.e, m => say(m));
  });
  startFx([...B.e], B.e, B.p);
  if (ctx.dungeon.boss.power === 'surge') {
    const v = Math.floor((ctx.room - 1) / 3);
    if (v > 0) { B.e.forEach(s => { s.atk += v; s.hp += v; s.maxhp += v; }); say(`${ctx.dungeon.boss.name} : Surcharge, ses serviteurs gagnent +${v}/+${v}.`); }
  }
  if (ctx.dungeon.boss.power === 'plate') {
    B.e.forEach(s => { s.hp += 3; s.maxhp += 3; }); say(`${ctx.dungeon.boss.name} : Blindage, ses serviteurs gagnent +0/+3.`);
  }
  deaths();

  const Q = { p: [], e: [] };
  const nextAtk = side => {
    for (;;) {
      if (!Q[side].length) Q[side] = B[side].map(s => s.uid);
      const id = Q[side].shift();
      const s = B[side].find(x => x.uid === id);
      if (s) return s;
    }
  };
  const target = side => {
    const foes = B[other(side)];
    const pv = foes.filter(s => s.kw.includes('prov'));
    return pick(pv.length ? pv : foes);
  };

  let cur = B.e.length > B.p.length ? 'e' : 'p';   // égalité : le joueur commence
  let attacks = 0, fatigue = 0;
  if (B.p.length && B.e.length) say(cur === 'p' ? 'Le joueur attaque en premier.' : 'Le Boss attaque en premier.');
  while (B.p.length && B.e.length && attacks < 3000) {
    if (attacks >= FATIGUE_START) {
      fatigue++;
      [...B.p, ...B.e].forEach(s => { s.hp -= fatigue; });
      say(`Usure : ${fatigue} dégâts à tous les serviteurs.`);
      deaths();
      if (!B.p.length || !B.e.length) break;
    }
    const A = nextAtk(cur), T = target(cur);
    const dA = A.atk, dT = A.kw.includes('ranged') ? 0 : T.atk;
    if (cur === 'e' && ctx.dungeon.boss.power === 'frenzy') { A.atk += 1; say(`Écho : ${A.name} gagne +1 ATQ.`); }
    hit(T, dA, A); hit(A, dT, T);          // dégâts et riposte simultanés
    say(`${A.name} attaque ${T.name} (${dA} dégâts${dT ? `, riposte ${dT}` : ', sans riposte'}).`, { att: A.uid, tgt: T.uid, ranged: A.kw.includes('ranged') });
    if (ctx.dungeon.boss.power === 'regen') {
      B.e.forEach(s => { if (s.hp > 0) s.hp = Math.min(s.maxhp, s.hp + 2); });
      say('Régénération : les serviteurs du Boss récupèrent 2 PV.');
    }
    deaths([A.uid, T.uid]);
    attacks++; cur = other(cur);
  }
  const winner = B.p.length && !B.e.length ? 'p' : B.e.length && !B.p.length ? 'e' : 'draw';
  say(winner === 'p' ? 'Combat remporté.' : winner === 'e' ? 'Combat perdu.' : 'Égalité : les deux camps sont vides.');
  return { frames, winner, survivors: { p: B.p, e: B.e }, attacks };
}

// ---------- Partie ----------
function newGame(heroIds, dungeonId) {
  const dungeon = DUNGEONS[dungeonId];
  const heroes = heroIds.map(id => ({ def: HEROES[id], hp: HEROES[id].hp, maxhp: HEROES[id].hp }));
  const types = [...new Set([...heroes.flatMap(h => h.def.types), dungeon.type])];
  // Deux types cachés, tirés au hasard à chaque partie, s'ajoutent à celui du donjon pour le Boss.
  const bossTypes = [...SPECIES, ...ARCHETYPES].filter(t => t !== dungeon.type).sort(() => Math.random() - 0.5).slice(0, 2);
  return {
    heroes, dungeon, types,
    boss: { name: dungeon.boss.name, hp: dungeon.boss.hp, maxhp: dungeon.boss.hp },
    bossTypes, bossTeams: BOSS_BOARDS.map(b => makeTeam([dungeon.type, ...bossTypes], b.malus)),
    bossCur: -1, bossLast: -1, bossLog: [],
    board: [],                    // règle : on commence sans serviteur sur le plateau
    room: 1, level: 1, counter: 0, over: null,
    hand: [], datacrons: 0, stats: { earned: 0, servants: 0, equips: 0, contrib: 0, fusions: 0, discarded: 0 }
  };
}
const levelCost = lvl => lvl + 1;    // niveau N -> N+1 : N+1 Datacrons de contribution (provisoire)

// ---------- Plateaux du Boss ----------
// Chaque plateau est un « joueur » automatique, avec sa main, son niveau de renfort et ses Datacrons.
// Il utilise les mêmes fonctions que le joueur (tirage de 3 cartes, pose, équipement, fusion).
function makeTeam(types, malus) {
  return { types, malus, heroes: [], board: [], hand: [], level: 1, counter: 0, datacrons: 0,
           stats: { earned: 0, servants: 0, equips: 0, contrib: 0, fusions: 0, discarded: 0 } };
}
const powerOf = s => s.rank * 10 + s.atk + s.hp + (s.equips ? s.equips.length * 2 : 0);
const cardScore = c => c.rank * 10 + c.atk + c.hp + (c.kw ? (Array.isArray(c.kw) ? c.kw.length : 1) * 3 : 0) + (c.skill ? 4 : 0);
const bestOf = cards => cards.reduce((b, c) => (cardScore(c) > cardScore(b) ? c : b));

// Pose ce que la main contient : serviteurs sur le plateau (ou à la place du plus faible s'il est plein),
// équipements sur le serviteur le plus fort ; le reste est jeté.
function aiPlace(t, say) {
  for (let i = t.hand.length - 1; i >= 0; i--) {
    const h = t.hand[i];
    if (h.kind === 'servant') {
      if (t.board.length < MAX_BOARD) placeServant(t, i, null, say);
      else {
        const wi = t.board.reduce((w, s, j) => (powerOf(s) < powerOf(t.board[w]) ? j : w), 0);
        if (powerOf(h.s) > powerOf(t.board[wi])) placeServant(t, i, wi, say); else { t.hand.splice(i, 1); t.stats.discarded++; }
      }
    } else if (t.board.length) {
      const target = t.board.reduce((b, s) => (powerOf(s) > powerOf(b) ? s : b));
      applyEquip(target, h.def); t.hand.splice(i, 1);
    }
  }
}

function aiRenfort(t, room, say) {
  const inc = Math.max(1, incomeFor(room) - (t.malus >= 1 ? 1 : Math.random() < t.malus ? 1 : 0));
  t.datacrons += inc; t.stats.earned += inc;
  renfortFx(t, 'startRenfort', say);
  const rf = { reward: null };
  const want = Math.min(MAX_BOARD, 3 + Math.floor(room / 2));
  for (let guard = 0; t.datacrons >= 1 && guard < 40; guard++) {
    const held = t.board.length + t.hand.filter(h => h.kind === 'servant').length;
    let act;
    if (held < want) act = 'servant';
    else if (t.level < MAX_LEVEL && t.level < 1 + Math.floor(room / 3)) act = 'level';
    else act = t.board.length && Math.random() < 0.4 ? 'equip' : 'servant';
    t.datacrons--;
    if (act === 'level') {
      t.counter++;
      if (t.counter >= levelCost(t.level)) { t.counter -= levelCost(t.level); t.level++; if (t.level >= MAX_LEVEL) t.counter = 0; }
      continue;
    }
    const card = bestOf(drawCards(t, act, t.level));
    if (!card) continue;
    t.hand.push(act === 'servant' ? { kind: 'servant', s: mkServant(card) } : { kind: 'equip', def: card });
    aiPlace(t, say);
    for (let f = 0; f < 5 && resolveFusion(t, rf, say); f++) {
      if (rf.reward) { t.hand.push({ kind: 'servant', s: mkServant(bestOf(rf.reward.cards)) }); rf.reward = null; }
      aiPlace(t, say);
    }
  }
  renfortFx(t, 'endRenfort', say);
}

// Au début de chaque salle, les trois plateaux se renforcent, puis le Boss en présente un,
// toujours différent de celui de la salle précédente.
function bossRenfort(g) {
  g.bossLog = [];
  g.bossTeams.forEach((t, i) => aiRenfort(t, g.room, m => g.bossLog.push(`[Plateau ${i + 1}] ${m}`)));
  const choices = [0, 1, 2].filter(i => i !== g.bossLast);
  g.bossCur = pick(choices); g.bossLast = g.bossCur;
  g.bossLog.push(`Le Boss présente le plateau ${g.bossCur + 1}.`);
}

// Tirage d'un choix du renfort : 3 cartes au hasard dans un pool infini, rang max = maxRank,
// rangs inférieurs possibles. exact = true : uniquement le rang maxRank (récompense de fusion).
function drawCards(g, kind, maxRank, exact) {
  const pool = kind === 'servant'
    ? SERVANTS.filter(x => x.types.some(t => g.types.includes(t)))
    : EQUIPS.filter(e => !e.type || g.types.includes(e.type));
  const weightOf = x => kind === 'servant' ? 1 + x.types.filter(t => g.types.includes(t)).length : 1;
  const res = [];
  for (let guard = 0; res.length < PROPOSALS && guard < 100; guard++) {
    const r = exact || Math.random() < 0.6 ? maxRank : 1 + rand(maxRank);
    let c = pool.filter(x => x.rank === r && !res.includes(x));
    if (!c.length) c = pool.filter(x => x.rank <= r && !res.includes(x));
    if (!c.length) c = pool.filter(x => !res.includes(x));
    if (!c.length) break;
    const w = c.map(weightOf); let t = Math.random() * w.reduce((a, b) => a + b, 0), i = 0;
    while (t > w[i] && i < c.length - 1) { t -= w[i]; i++; }
    res.push(c[i]);
  }
  return res;
}

function renfortFx(g, trig, say) {
  g.board.slice().forEach(s => {
    skillsOf(s).filter(k => k.t === trig).forEach(k => applyFx(k, s, g.board, [], say));
  });
  g.heroes.forEach(h => {
    if (h.hp > 0 && h.def.power && h.def.power.t === trig)
      applyFx(h.def.power, { name: h.def.name, kw: [] }, g.board, [], say);
  });
}
// Pose d'un serviteur de la main sur le plateau (remplacement si replaceIdx).
function placeServant(g, handIdx, replaceIdx, say) {
  const s = g.hand[handIdx].s;
  g.hand.splice(handIdx, 1);
  if (replaceIdx != null) { say(`${g.board[replaceIdx].name} est remplacé (ses équipements sont perdus).`); g.board.splice(replaceIdx, 1, s); }
  else g.board.push(s);
  say(`${s.name} rejoint le plateau.`);
  if (s.skill && s.skill.t === 'battlecry') applyFx(s.skill, s, g.board, [], say);
}

// Fusion simple de trois serviteurs identiques (même nom, non dorés), plateau et main confondus.
// Le doré additionne leurs statistiques et double les valeurs de sa compétence.
// Retourne true si une fusion a eu lieu (une récompense est alors à choisir).
function resolveFusion(g, rf, say) {
  const all = [...g.board.map(s => ({ s })), ...g.hand.filter(h => h.kind === 'servant').map(h => ({ s: h.s }))];
  const names = [...new Set(all.filter(x => !x.s.gold).map(x => x.s.name))];
  const name = names.find(n => all.filter(x => !x.s.gold && x.s.name === n).length >= 3);
  if (!name) return false;
  const trio = all.filter(x => !x.s.gold && x.s.name === name).slice(0, 3).map(x => x.s);
  const sum = k => trio.reduce((a, x) => a + x[k], 0);
  const k = trio[0].skill;
  const gold = {
    uid: uid(), name: `${name} doré`, rank: trio[0].rank, atk: sum('atk'), hp: sum('hp'), maxhp: sum('maxhp'),
    types: [...trio[0].types], kw: [...new Set(trio.flatMap(x => x.kw))], gold: true,
    skill: k ? { ...k, a: k.a * 2, h: k.h * 2, n: k.n * 2 } : null, equips: trio.flatMap(x => x.equips),
    eqSkills: trio.flatMap(x => x.eqSkills || []), probeA: trio.reduce((a, x) => a + (x.probeA || 0), 0), probeH: trio.reduce((a, x) => a + (x.probeH || 0), 0)
  };
  const ids = new Set(trio.map(x => x.uid));
  const bi = g.board.findIndex(x => ids.has(x.uid));
  if (bi >= 0) g.board[bi] = gold;
  else g.hand[g.hand.findIndex(h => h.kind === 'servant' && ids.has(h.s.uid))] = { kind: 'servant', s: gold };
  g.board = g.board.filter(x => x === gold || !ids.has(x.uid));
  g.hand = g.hand.filter(h => h.kind !== 'servant' || h.s === gold || !ids.has(h.s.uid));
  g.stats.fusions++;
  const r = Math.min(5, g.level + 1);
  rf.reward = { rank: r, cards: drawCards(g, 'servant', r, true) };
  say(`Fusion : trois ${name} deviennent ${gold.name} ! Choisis une récompense de rang ${r}.`);
  return true;
}

// Règle : fin de combat, les survivants du camp gagnant infligent leur rang.
function settleCombat(g, res) {
  const lines = [];
  if (res.winner === 'p') {
    const dmg = res.survivors.p.reduce((a, s) => a + s.rank, 0);
    g.boss.hp = Math.max(0, g.boss.hp - dmg);
    lines.push(`Vos survivants (${res.survivors.p.map(s => `${s.name} R${s.rank}`).join(', ')}) infligent ${dmg} dégâts au Boss.`);
    if (g.boss.hp <= 0) { g.over = 'win'; lines.push('Le Boss est vaincu !'); }
  } else if (res.winner === 'e') {
    let shield = g.heroes.map(h => h.hp > 0 && h.def.kw === 'shield');
    for (const s of res.survivors.e) {
      const live = g.heroes.map((h, i) => i).filter(i => g.heroes[i].hp > 0);
      if (!live.length) break;
      const prov = live.filter(i => g.heroes[i].def.kw === 'prov');
      const i = prov.length === 1 ? prov[0] : pick(live);
      const h = g.heroes[i];
      if (shield[i]) { shield[i] = false; lines.push(`${s.name} frappe ${h.def.name} (${s.rank}) : annulé par le Bouclier divin.`); continue; }
      h.hp = Math.max(0, h.hp - s.rank);
      lines.push(`${s.name} frappe ${h.def.name} : ${s.rank} dégâts${h.hp <= 0 ? ' — il tombe !' : ''}.`);
    }
    if (g.heroes.every(h => h.hp <= 0)) { g.over = 'lose'; lines.push('Les deux héros sont à terre.'); }
  } else lines.push('Égalité : aucun dégât.');
  g.room++;
  return lines;
}
