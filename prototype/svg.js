// Atlas Wanderer : stylisation SVG (provisoire).
// Emblèmes d'espèces, icônes d'archétypes, de statistiques et de mots-clés, cartes de serviteurs et d'équipements.
// Aucune dépendance : le fichier fonctionne dans un navigateur (<script src>) et sous Node (require).
// Toutes les fonctions renvoient du SVG sous forme de chaîne.
(function (root) {
  'use strict';

  // ---------- Couleurs ----------
  const SPECIES = ['Elk', 'Dwork', 'Droïde', 'Félin'];
  const SPECIES_COLOR = { 'Elk': '#d9a441', 'Dwork': '#c4622d', 'Droïde': '#4fb3d9', 'Félin': '#b57bee' };
  // Les archétypes suivent les trois familles de documentation/types/archetypes.md.
  const FAMILY_COLOR = { navigation: '#4f8cff', soutien: '#46c28a', tactique: '#e8604c' };
  const ARCH_FAMILY = {
    'Pilote': 'navigation', 'Explorateur': 'navigation', 'Diplomate': 'navigation',
    'Ingénieur': 'soutien', 'Médecin': 'soutien', 'Xénobiologiste': 'soutien', 'Roboticien': 'soutien',
    'Sécurité': 'tactique', 'Artilleur': 'tactique', 'Renseignement': 'tactique'
  };
  const SHIELD = '#6fe3ff';
  const UI = { card: '#151a26', cardDeep: '#0e121b', text: '#f1f5f9', muted: '#94a3b8', atk: '#f0a53a', hp: '#e5534b', gold: '#f5c542' };
  const typeColor = t => SPECIES_COLOR[t] || FAMILY_COLOR[ARCH_FAMILY[t]] || '#9aa4b2';
  const isSpecies = t => SPECIES.includes(t);

  // ---------- Icônes (viewBox 24x24) ----------
  // Chaque icône est une fonction (c = couleur principale, b = couleur de fond pour les détails en creux).
  const line = (c, body) => `<g fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${body}</g>`;
  const ICONS = {
    // --- Espèces : silhouettes pleines ---
    'Elk': (c, b) => `<ellipse cx="13" cy="12.5" rx="5.8" ry="7.2" fill="${c}"/>
      <path d="M18 9 L23.2 5 L20.2 13.6 Z" fill="${c}"/>
      <path d="M8.5 5.5 C2.2 5.5 1.8 14.5 5 20.8 L8.2 19.2 C6 15.2 6.4 10.5 9.8 9 Z" fill="${c}"/>
      <path d="M5.4 11.2 l3.4 -1.1 M4.9 14.2 l3.8 -.9 M5.7 17.2 l3.1 -.5" stroke="${b}" stroke-width="1" stroke-linecap="round" fill="none"/>
      <circle cx="11.2" cy="12" r="1" fill="${b}"/><circle cx="15.4" cy="12" r="1" fill="${b}"/>
      <path d="M11.5 16.2 q1.6 1 3.2 0" stroke="${b}" stroke-width="1" stroke-linecap="round" fill="none"/>`,
    'Dwork': (c, b) => `<path d="M3.2 8.2 L5.6 6.2 V11 Z M20.8 8.2 L18.4 6.2 V11 Z" fill="${c}"/>
      <rect x="5.4" y="3.6" width="13.2" height="10" rx="3.4" fill="${c}"/>
      <path d="M5 11.4 H19 V15.4 C19 19.6 15.6 22 12 22 C8.4 22 5 19.6 5 15.4 Z" fill="${c}"/>
      <path d="M7.4 8.2 L10.6 9.2 M16.6 8.2 L13.4 9.2" stroke="${b}" stroke-width="1.4" stroke-linecap="round"/>
      <circle cx="9.4" cy="10.2" r=".9" fill="${b}"/><circle cx="14.6" cy="10.2" r=".9" fill="${b}"/>
      <path d="M9.6 13.6 L10.4 11.8 L11.2 13.6 Z M12.8 13.6 L13.6 11.8 L14.4 13.6 Z" fill="${b}"/>
      <path d="M9 17 V20 M12 17 V21 M15 17 V20" stroke="${b}" stroke-width="1" stroke-linecap="round"/>`,
    'Droïde': (c, b) => `<rect x="3" y="10" width="2.2" height="5.4" rx="1" fill="${c}"/><rect x="18.8" y="10" width="2.2" height="5.4" rx="1" fill="${c}"/>
      <rect x="5.2" y="6.4" width="13.6" height="12.4" rx="3.6" fill="${c}"/>
      <path d="M12 6.4 V3.4" stroke="${c}" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="2.8" r="1.5" fill="${c}"/>
      <rect x="7.4" y="10.2" width="9.2" height="4.2" rx="2.1" fill="${b}"/>
      <circle cx="10.2" cy="12.3" r="1" fill="${c}"/><circle cx="13.8" cy="12.3" r="1" fill="${c}"/>
      <path d="M9 16.6 H15" stroke="${b}" stroke-width="1.2" stroke-linecap="round"/>`,
    'Félin': (c, b) => `<path d="M3.6 3.4 L9 7.6 Q12 6.8 15 7.6 L20.4 3.4 V13 C20.4 18 16.8 21.2 12 21.2 C7.2 21.2 3.6 18 3.6 13 Z" fill="${c}"/>
      <path d="M7.6 11 Q9.4 9.8 11 12 Q9.2 12.8 7.6 11 Z M16.4 11 Q14.6 9.8 13 12 Q14.8 12.8 16.4 11 Z" fill="${b}"/>
      <path d="M10.6 14.6 H13.4 L12 16 Z" fill="${b}"/><path d="M12 16 V17.4 M12 17.4 q-1.2 1.2 -2.4 .4 M12 17.4 q1.2 1.2 2.4 .4" stroke="${b}" stroke-width="1" stroke-linecap="round" fill="none"/>
      <path d="M1.2 12.4 H4.4 M1.4 15.6 L4.6 14.6 M22.8 12.4 H19.6 M22.6 15.6 L19.4 14.6" stroke="${c}" stroke-width="1" stroke-linecap="round"/>`,

    // --- Archétypes : icônes au trait ---
    'Pilote': c => line(c, '<path d="M3 11.5 L21 3.5 L14.5 20.5 L11.5 13 Z"/><path d="M11.5 13 L21 3.5"/>'),
    'Ingénieur': c => line(c, '<circle cx="12" cy="12" r="6.2"/><circle cx="12" cy="12" r="2.4"/><path d="M12 2.5 v3.1 M12 18.4 v3.1 M2.5 12 h3.1 M18.4 12 h3.1 M5.3 5.3 l2.2 2.2 M16.5 16.5 l2.2 2.2 M18.7 5.3 l-2.2 2.2 M7.5 16.5 l-2.2 2.2"/>'),
    'Médecin': c => line(c, '<path d="M9 3.5 h6 v5.5 h5.5 v6 H15 v5.5 H9 V15 H3.5 V9 H9 Z"/>'),
    'Sécurité': c => line(c, '<path d="M12 2.8 L20 5.8 V12 C20 16.8 16.5 20 12 21.4 C7.5 20 4 16.8 4 12 V5.8 Z"/><path d="M12 7 V16 M8.2 10 H15.8"/>'),
    'Explorateur': c => line(c, '<circle cx="12" cy="12" r="9"/><path d="M15.8 8.2 L13.6 13.6 L8.2 15.8 L10.4 10.4 Z"/>'),
    'Artilleur': c => line(c, '<circle cx="12" cy="12" r="6.6"/><path d="M12 2 v5 M12 17 v5 M2 12 h5 M17 12 h5"/><circle cx="12" cy="12" r=".6"/>'),
    'Renseignement': c => line(c, '<path d="M2 12 C5 6.6 8.4 5 12 5 C15.6 5 19 6.6 22 12 C19 17.4 15.6 19 12 19 C8.4 19 5 17.4 2 12 Z"/><circle cx="12" cy="12" r="3"/>'),
    'Roboticien': c => line(c, '<circle cx="12" cy="6.8" r="2.8"/><circle cx="5.8" cy="17" r="2.8"/><circle cx="18.2" cy="17" r="2.8"/><path d="M10.6 9.2 L7.2 14.6 M13.4 9.2 L16.8 14.6 M8.6 17 H15.4"/>'),
    'Xénobiologiste': c => line(c, '<path d="M10 3 v6.2 L4.8 19.2 A1.8 1.8 0 0 0 6.4 22 h11.2 a1.8 1.8 0 0 0 1.6 -2.8 L14 9.2 V3"/><path d="M8.4 3 h7.2 M7.4 15.4 h9.2"/><circle cx="11" cy="18.4" r=".7"/><circle cx="14" cy="17.4" r=".5"/>'),
    'Diplomate': c => line(c, '<circle cx="8" cy="9" r="3.2"/><circle cx="16.4" cy="9" r="3.2"/><path d="M3 20 c0 -3.6 2.4 -5.6 5 -5.6 s5 2 5 5.6 M11.4 20 c0 -3.6 2.4 -5.6 5 -5.6 s5 2 5 5.6"/>'),

    // --- Repères ---
    'rank': c => line(c, '<path d="M5 13.5 L12 6.5 L19 13.5 M5 19 L12 12 L19 19"/>'),
    'datacron': (c, b) => `<path d="M12 2.4 L20 7 V17 L12 21.6 L4 17 V7 Z" fill="${c}"/><path d="M12 2.4 V12 M4 7 L12 12 L20 7 M12 12 V21.6" stroke="${b}" stroke-width="1.2" fill="none" stroke-linejoin="round"/>`,
    'equip': c => `<path d="M13.4 2 L5 13.6 H10.8 L9.8 22 L19 9.8 H13 Z" fill="${c}"/>`,

    // --- Mots-clés ---
    'prov': c => line(c, '<path d="M3 10 V14 H7 L14 18.4 V5.6 L7 10 Z"/><path d="M17.4 9 C19 10.6 19 13.4 17.4 15 M19.8 6.4 C23 9.6 23 14.4 19.8 17.6"/>'),
    'shield': c => line(c, '<circle cx="12" cy="12" r="9"/><path d="M7.4 12 A4.6 4.6 0 0 1 12 7.4"/><path d="M12 15.4 V16.4 M9.6 13.6 L8.9 14.3"/>'),
    'poison': c => line(c, '<path d="M12 2.6 C12 2.6 5.4 10 5.4 14.8 A6.6 6.6 0 0 0 18.6 14.8 C18.6 10 12 2.6 12 2.6 Z"/><path d="M9.6 14 l4.8 4.4 M14.4 14 l-4.8 4.4"/>'),
    'rebirth': c => line(c, '<path d="M20 12 A8 8 0 1 1 17.6 6.3"/><path d="M20 3.6 V8.8 H14.8"/>'),
    'ranged': c => line(c, '<path d="M4 20 L19 5 M19 5 H13.6 M19 5 V10.4 M4 20 L8 18.8 M4 20 L5.2 16"/>')
  };
  const KW_ICON = { prov: 'prov', shield: 'shield', poison: 'poison', rebirth: 'rebirth', ranged: 'ranged' };
  const KW_LABEL = { prov: 'Provocation', shield: 'Bouclier divin', poison: 'Poison', rebirth: 'Renaissance', ranged: 'À distance' };
  // Rappel de règle affiché sous le nom du mot-clé (une ligne, 35 caractères maximum).
  const KW_DESC = {
    prov: 'Attire les attaques ennemies', shield: 'Annule la 1re source de dégâts', poison: 'Détruit toute cible blessée',
    rebirth: 'Revient 1 fois avec 1 PV', ranged: 'Ne subit pas de riposte'
  };

  const num = n => Math.round(n * 100) / 100;
  // Icône isolée (balise <svg>) : à insérer telle quelle dans une page.
  function icon(name, o = {}) {
    const size = o.size || 24, c = o.color || 'currentColor', b = o.bg || UI.card;
    const f = ICONS[name]; if (!f) return '';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" role="img" aria-label="${name}">${f(c, b)}</svg>`;
  }
  // Icône placée dans un autre SVG (groupe positionné) : (x, y) = coin haut gauche.
  function iconG(name, x, y, size, c, b) {
    const f = ICONS[name]; if (!f) return '';
    return `<g transform="translate(${num(x)} ${num(y)}) scale(${num(size / 24)})">${f(c, b || UI.card)}</g>`;
  }
  // Pastille d'un type : fond teinté, icône, nom.
  function typeChip(t, o = {}) {
    const col = typeColor(t), h = o.height || 22, w = Math.ceil(h + 8 + t.length * (h * 0.46));
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
      <rect x=".5" y=".5" width="${w - 1}" height="${h - 1}" rx="${h / 2}" fill="${col}" fill-opacity=".16" stroke="${col}" stroke-opacity=".7"/>
      ${iconG(t, 4, (h - h * 0.72) / 2, h * 0.72, col, UI.card)}
      <text x="${h * 0.72 + 8}" y="${h / 2 + h * 0.18}" font-family="system-ui,sans-serif" font-size="${num(h * 0.5)}" font-weight="600" fill="${UI.text}">${esc(t)}</text></svg>`;
  }

  // ---------- Utilitaires ----------
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function wrap(text, max) {
    const out = []; let cur = '';
    String(text).split(/\s+/).forEach(w => {
      if ((cur + ' ' + w).trim().length > max && cur) { out.push(cur); cur = w; } else cur = (cur + ' ' + w).trim();
    });
    if (cur) out.push(cur);
    return out;
  }
  let GID = 0;   // identifiants de dégradés uniques par carte
  const FONT = 'system-ui,-apple-system,Segoe UI,sans-serif';

  // Pastilles de types d'une carte : largeur ajustée au nom, alignées à gauche.
  function chipRow(types, y) {
    let x = 12;
    return types.map(t => {
      const w = Math.max(56, Math.ceil(31 + t.length * 5.8)), col = typeColor(t), g = `<g><rect x="${x}" y="${y}" width="${w}" height="20" rx="10" fill="${col}" fill-opacity=".16" stroke="${col}" stroke-opacity=".7"/>
        ${iconG(t, x + 5, y + 3, 14, col, UI.card)}<text x="${x + 23}" y="${y + 14}" font-size="10" font-weight="600" fill="${UI.text}">${esc(t)}</text></g>`;
      x += w + 6; return g;
    }).join('');
  }

  // Couleur d'accent d'une carte : l'espèce si elle existe, sinon l'archétype ; or pour un doré.
  function accentOf(types, gold) {
    if (gold) return UI.gold;
    const sp = types.find(isSpecies);
    return typeColor(sp || types[0]);
  }
  function pips(rank, x, y, col) {
    let out = '';
    for (let i = 0; i < rank; i++) out += `<path transform="translate(${x - i * 11} ${y})" d="M0 -5 L4.4 0 L0 5 L-4.4 0 Z" fill="${col}" stroke="${UI.cardDeep}" stroke-width="1"/>`;
    return out;
  }

  // Visuel central d'une carte : l'emblème de l'espèce avec l'archétype en médaillon,
  // ou l'icône d'archétype seule dans un cadre hexagonal quand il n'y a pas d'espèce.
  function artwork(types, col, cx, cy, gid) {
    const sp = types.find(isSpecies), arch = types.find(t => !isSpecies(t));
    const hex = (r, f, s) => `<polygon points="${[0, 1, 2, 3, 4, 5].map(i => `${num(cx + r * Math.cos(Math.PI / 3 * i - Math.PI / 2))},${num(cy + r * Math.sin(Math.PI / 3 * i - Math.PI / 2))}`).join(' ')}" fill="${f}" stroke="${s}" stroke-width="1.5"/>`;
    if (sp) {
      return `<circle cx="${cx}" cy="${cy}" r="46" fill="${col}" fill-opacity=".12"/><circle cx="${cx}" cy="${cy}" r="38" fill="none" stroke="${col}" stroke-opacity=".35" stroke-dasharray="2 5"/>
        ${iconG(sp, cx - 36, cy - 38, 72, col, UI.cardDeep)}
        ${arch ? `<circle cx="${cx + 38}" cy="${cy + 26}" r="17" fill="${UI.cardDeep}" stroke="${typeColor(arch)}" stroke-width="2"/>${iconG(arch, cx + 38 - 10, cy + 26 - 10, 20, typeColor(arch))}` : ''}`;
    }
    return `${hex(46, col + '22', col + '88')}${hex(36, 'none', col + '55')}${iconG(arch, cx - 26, cy - 26, 52, col)}`;
  }

  // ---------- Carte de serviteur (200 x 330) ----------
  // s : { name, rank, atk, hp, maxhp, types[], kw[], kwSpent?[], skillText?, skillKind? ('combat'|'renfort'), equips?[], gold? }
  // Chaque mot-clé est écrit sur la carte (nom + rappel de règle). Un mot-clé déjà consommé
  // (Bouclier divin perdu, Renaissance jouée) reste visible mais grisé et barré.
  function servantCard(s, o = {}) {
    const id = 'g' + (++GID), types = s.types.length ? s.types : [], col = accentOf(types, s.gold);
    const maxhp = s.maxhp || s.hp, hurt = s.hp < maxhp, W = 200, H = 330;
    const name = String(s.name), fs = name.length > 22 ? 10 : name.length > 17 ? 11.5 : 13.5;
    const kw = (s.kw || []).filter(k => KW_LABEL[k]), spent = s.kwSpent || [];
    const shieldUp = kw.includes('shield') && !spent.includes('shield');
    const skills = s.skills || (s.skillText ? [{ text: s.skillText, kind: s.skillKind }] : []);
    const dead = s.hp <= 0 ? ' opacity=".45"' : '';
    const artY = 36, artH = 92, chipsY = 134, textY = 164, rowH = 24, gy = H - 30;
    const skillY = textY + kw.length * rowH + (kw.length ? 6 : 10);
    // Une ligne par morceau de texte ; on s'arrête avant les pastilles d'attaque et de PV.
    const maxLines = Math.min(7, Math.floor((H - 30 - 26 - (skillY + 8)) / 12.5) + 1);
    const lines = skills.flatMap(k => wrap(k.text, 33).map(l => ({ l, col: k.kind === 'renfort' ? '#7ad0ff' : '#ff9d8f' }))).slice(0, Math.max(1, maxLines));
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${o.width || W}" font-family="${FONT}"${dead}>
      <defs>
        <linearGradient id="${id}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${col}" stop-opacity=".42"/><stop offset="1" stop-color="${UI.cardDeep}"/></linearGradient>
        <linearGradient id="${id}b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${s.gold ? '#fff2b0' : col}"/><stop offset=".5" stop-color="${col}"/><stop offset="1" stop-color="${s.gold ? '#b8860b' : col}" stop-opacity=".6"/></linearGradient>
        <radialGradient id="${id}c" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
      </defs>
      <rect x="1.5" y="1.5" width="${W - 3}" height="${H - 3}" rx="15" fill="${UI.card}" stroke="url(#${id}b)" stroke-width="3"/>
      <rect x="7" y="7" width="${W - 14}" height="${H - 14}" rx="11" fill="none" stroke="${col}" stroke-opacity=".25"/>
      ${shieldUp ? `<rect x="-2" y="-2" width="${W + 4}" height="${H + 4}" rx="18" fill="none" stroke="${SHIELD}" stroke-width="3" stroke-opacity=".9"/><rect x="3" y="3" width="${W - 6}" height="${H - 6}" rx="13" fill="none" stroke="${SHIELD}" stroke-width="1.2" stroke-opacity=".6" stroke-dasharray="5 4"/>` : ''}
      <text x="14" y="27" font-size="${fs}" font-weight="700" fill="${s.gold ? UI.gold : UI.text}">${esc(name)}</text>
      <rect x="12" y="${artY}" width="176" height="${artH}" rx="9" fill="url(#${id}a)" stroke="${col}" stroke-opacity=".5"/>
      <g clip-path="inset(${artY}px 12px ${H - artY - artH}px 12px round 9px)" opacity=".12" stroke="${col}">${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<path d="M${12 + i * 24} ${artY} l-40 ${artH}"/>`).join('')}</g>
      ${artwork(types, col, 100, artY + artH / 2, id)}
      ${pips(s.rank, 176, artY + 12, col)}
      ${s.gold ? `<text x="20" y="${artY + 18}" font-size="11" font-weight="700" fill="${UI.gold}">★ doré</text>` : ''}
      ${chipRow(types, chipsY)}
      ${kw.map((k, i) => {
        const y = textY + i * rowH, off = spent.includes(k), c = off ? UI.muted : (k === 'shield' ? SHIELD : UI.text);
        return `<g${off ? ' opacity=".5"' : ''}><circle cx="23" cy="${y + 10}" r="10" fill="${UI.cardDeep}" stroke="${c}" stroke-opacity=".8"/>${iconG(KW_ICON[k], 16, y + 3, 14, c)}
          <text x="40" y="${y + 9}" font-size="10.5" font-weight="700" fill="${c}"${off ? ' text-decoration="line-through"' : ''}>${KW_LABEL[k]}${off ? ' (utilisé)' : ''}</text>
          <text x="40" y="${y + 20}" font-size="8.5" fill="${UI.muted}">${KW_DESC[k]}</text></g>`;
      }).join('')}
      <g font-size="10">${lines.map((k, i) => `<text x="14" y="${skillY + 8 + i * 12.5}" fill="${k.col}">${esc(k.l)}</text>`).join('')}</g>
      ${s.equips && s.equips.length ? `<g><title>${esc(s.equips.join(', '))}</title>${iconG('equip', 78, gy - 8, 14, UI.muted)}<text x="95" y="${gy + 4}" font-size="11" font-weight="700" fill="${UI.muted}">×${s.equips.length}</text></g>` : ''}
      <circle cx="34" cy="${gy}" r="22" fill="${UI.atk}" stroke="${UI.cardDeep}" stroke-width="2.5"/><circle cx="34" cy="${gy}" r="22" fill="url(#${id}c)"/>
      <text x="34" y="${gy + 8}" text-anchor="middle" font-size="24" font-weight="800" fill="#2a1a00">${s.atk}</text>
      <circle cx="166" cy="${gy}" r="22" fill="${hurt ? '#b3342d' : UI.hp}" stroke="${UI.cardDeep}" stroke-width="2.5"/><circle cx="166" cy="${gy}" r="22" fill="url(#${id}c)"/>
      <text x="166" y="${gy + 8}" text-anchor="middle" font-size="24" font-weight="800" fill="#fff">${s.hp}</text>
    </svg>`;
  }

  // ---------- Carte d'équipement (200 x 200) ----------
  // e : { name, rank, atk, hp, kw?, type?, skillText?, skillKind? }
  function equipCard(e, o = {}) {
    const id = 'e' + (++GID), col = e.type ? typeColor(e.type) : '#9aa4b2', W = 200, H = 200;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${o.width || W}" font-family="${FONT}">
      <defs><linearGradient id="${id}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${col}" stop-opacity=".4"/><stop offset="1" stop-color="${UI.cardDeep}"/></linearGradient></defs>
      <rect x="1.5" y="1.5" width="${W - 3}" height="${H - 3}" rx="13" fill="${UI.card}" stroke="${col}" stroke-width="2.5"/>
      <path d="M1.5 40 H198.5" stroke="${col}" stroke-opacity=".3"/>
      <text x="14" y="27" font-size="${e.name.length > 20 ? 11 : 13}" font-weight="700" fill="${UI.text}">${esc(e.name)}</text>
      ${pips(e.rank, 184, 56, col)}
      <rect x="12" y="46" width="52" height="52" rx="9" fill="url(#${id}a)" stroke="${col}" stroke-opacity=".5"/>
      ${iconG('equip', 20, 54, 36, col)}
      <text x="78" y="82" font-size="26" font-weight="800" fill="${UI.text}"><tspan fill="${UI.atk}">+${e.atk}</tspan> <tspan fill="${UI.muted}" font-size="19">/</tspan> <tspan fill="${UI.hp}">+${e.hp}</tspan></text>
      <text x="78" y="95" font-size="8.5" fill="${UI.muted}">attaque / points de vie</text>
      ${e.kw ? `<g><circle cx="23" cy="118" r="10" fill="${UI.cardDeep}" stroke="${UI.text}" stroke-opacity=".8"/>${iconG(KW_ICON[e.kw], 16, 111, 14, UI.text)}
        <text x="40" y="117" font-size="10.5" font-weight="700" fill="${UI.text}">${KW_LABEL[e.kw]}</text><text x="40" y="128" font-size="8.5" fill="${UI.muted}">${KW_DESC[e.kw]}</text></g>` : ''}
      <g font-size="10">${(e.skillText ? wrap(e.skillText, 33).slice(0, e.kw ? 2 : 3) : []).map((l, i) => `<text x="14" y="${(e.kw ? 146 : 118) + i * 12.5}" fill="${e.skillKind === 'renfort' ? '#7ad0ff' : '#ff9d8f'}">${esc(l)}</text>`).join('')}</g>
      <rect x="12" y="${H - 34}" width="${e.type ? 96 : 76}" height="22" rx="11" fill="${col}" fill-opacity=".16" stroke="${col}" stroke-opacity=".7"/>
      ${e.type ? iconG(e.type, 18, H - 31, 16, col) : ''}
      <text x="${e.type ? 38 : 24}" y="${H - 19}" font-size="10.5" font-weight="600" fill="${UI.text}">${e.type ? esc(e.type) : 'Tous types'}</text>
    </svg>`;
  }

  const api = { SPECIES, SPECIES_COLOR, FAMILY_COLOR, ARCH_FAMILY, UI, typeColor, isSpecies, ICONS, KW_LABEL, KW_DESC, icon, iconG, typeChip, servantCard, equipCard };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.AWGfx = api;
})(typeof window !== 'undefined' ? window : globalThis);
