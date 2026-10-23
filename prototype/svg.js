// Atlas Wanderer : stylisation SVG (provisoire).
// Emblèmes d'espèces, icônes d'archétypes, de statistiques et de mots-clés, cartes de serviteurs et d'équipements.
// Aucune dépendance : le fichier fonctionne dans un navigateur (<script src>) et sous Node (require).
// Toutes les fonctions renvoient du SVG sous forme de chaîne.
(function (root) {
  'use strict';

  // ---------- Couleurs ----------
  const SPECIES = ['Alien', 'Elk', 'Dwork', 'Droïde', 'Félin'];
  // Alien : espèce générique, en gris argenté neutre. Aucune couleur n'est dorée (l'or est réservé aux dorés).
  const SPECIES_COLOR = { 'Alien': '#b4bcc9', 'Elk': '#e56b9a', 'Dwork': '#c4622d', 'Droïde': '#4fb3d9', 'Félin': '#b57bee' };
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
    // Alien : tête grise classique, grands yeux en amande.
    'Alien': (c, b) => `<path d="M12 2.4 C7 2.4 4.4 6 4.4 10 C4.4 14.2 8 17.6 10.4 21 C11.2 22.2 12.8 22.2 13.6 21 C16 17.6 19.6 14.2 19.6 10 C19.6 6 17 2.4 12 2.4 Z" fill="${c}"/>
      <path d="M5.8 9 C8.4 9.2 10.8 11.2 11 13.6 C8.4 13.8 6 12.2 5.8 9 Z M18.2 9 C15.6 9.2 13.2 11.2 13 13.6 C15.6 13.8 18 12.2 18.2 9 Z" fill="${b}"/>
      <path d="M7.6 10.4 l1.6 .9 M16.4 10.4 l-1.6 .9" stroke="${c}" stroke-opacity=".55" stroke-width=".9" stroke-linecap="round"/>
      <path d="M11 18 H13" stroke="${b}" stroke-width="1" stroke-linecap="round"/>`,
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

    'bug': c => line(c, '<rect x="8" y="7" width="8" height="12" rx="4"/><path d="M9.5 7 C9.5 4.5 14.5 4.5 14.5 7 M8 11 H3.5 M16 11 H20.5 M8 15 H4.5 M16 15 H19.5 M8.4 9 L5.4 6.4 M15.6 9 L18.6 6.4 M12 10 V19"/>'),

    // --- Boutons du renfort ---
    'btnServant': c => line(c, '<circle cx="12" cy="7.5" r="3.6"/><path d="M4.5 20.5 C4.5 15.5 8 13.2 12 13.2 C16 13.2 19.5 15.5 19.5 20.5"/><path d="M12 15.4 l.9 1.8 2 .3 -1.4 1.4 .3 2 -1.8 -.9 -1.8 .9 .3 -2 -1.4 -1.4 2 -.3 Z"/>'),
    'btnEquip': c => line(c, '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'),
    'btnLevel': c => line(c, '<path d="M5.5 11.5 L12 5 L18.5 11.5"/><path d="M5.5 19 L12 12.5 L18.5 19"/>'),

    // --- Statistiques ---
    'heart': c => `<path d="M12 21.2 C12 21.2 2.8 15 2.8 8.8 A4.7 4.7 0 0 1 12 7 A4.7 4.7 0 0 1 21.2 8.8 C21.2 15 12 21.2 12 21.2 Z" fill="${c}"/>`,

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

  // Couleur d'accent d'une carte : l'espèce si elle existe, sinon l'archétype. Aucune n'est dorée :
  // l'or est réservé au contour des serviteurs dorés.
  function accentOf(types) {
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
    const id = 'g' + (++GID), types = s.types.length ? s.types : [], col = accentOf(types);
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
        <linearGradient id="${id}b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${s.gold ? '#fff2b0' : col}"/><stop offset=".5" stop-color="${s.gold ? UI.gold : col}"/><stop offset="1" stop-color="${s.gold ? '#b8860b' : col}" stop-opacity="${s.gold ? 1 : .6}"/></linearGradient>
        <radialGradient id="${id}c" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
      </defs>
      <rect x="1.5" y="1.5" width="${W - 3}" height="${H - 3}" rx="15" fill="${UI.card}" stroke="url(#${id}b)" stroke-width="3"/>
      <rect x="7" y="7" width="${W - 14}" height="${H - 14}" rx="11" fill="none" stroke="${s.gold ? UI.gold : col}" stroke-opacity="${s.gold ? 1 : .25}" stroke-width="${s.gold ? 2 : 1}"/>
      ${shieldUp ? `<rect x="-2" y="-2" width="${W + 4}" height="${H + 4}" rx="18" fill="none" stroke="${SHIELD}" stroke-width="3" stroke-opacity=".9"/><rect x="3" y="3" width="${W - 6}" height="${H - 6}" rx="13" fill="none" stroke="${SHIELD}" stroke-width="1.2" stroke-opacity=".6" stroke-dasharray="5 4"/>` : ''}
      <text x="14" y="27" font-size="${fs}" font-weight="700" fill="${UI.text}">${esc(name)}</text>
      <rect x="12" y="${artY}" width="176" height="${artH}" rx="9" fill="url(#${id}a)" stroke="${col}" stroke-opacity=".5"/>
      <g clip-path="inset(${artY}px 12px ${H - artY - artH}px 12px round 9px)" opacity=".12" stroke="${col}">${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<path d="M${12 + i * 24} ${artY} l-40 ${artH}"/>`).join('')}</g>
      ${artwork(types, col, 100, artY + artH / 2, id)}
      ${pips(s.rank, 176, artY + 12, col)}
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

  // ---------- Décors de donjons (400 x 150) ----------
  const scenes = {
    // Le Nid de la Reine : un ravin luxuriant, parois couvertes de jungle, cascade et œufs lumineux.
    nid: id => `<defs>
        <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe9c8"/><stop offset=".45" stop-color="#4f9c78"/><stop offset="1" stop-color="#0d2a2a"/></linearGradient>
        <linearGradient id="${id}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8fff4" stop-opacity=".9"/><stop offset="1" stop-color="#5fd6c4" stop-opacity=".25"/></linearGradient>
        <radialGradient id="${id}g" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff7ad9" stop-opacity=".95"/><stop offset="1" stop-color="#ff7ad9" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="400" height="150" fill="url(#${id}s)"/>
      <path d="M150 0 H250 L236 150 H164 Z" fill="#e8fff6" opacity=".18"/>
      <path d="M0 0 H120 C112 40 132 62 112 100 C100 124 118 140 104 150 H0 Z" fill="#183a2c"/>
      <path d="M400 0 H282 C292 36 270 66 292 104 C304 128 286 140 298 150 H400 Z" fill="#14342a"/>
      <path d="M0 0 H92 C86 36 100 56 84 92 C74 112 86 130 78 150 H0 Z" fill="#245c3c"/>
      <path d="M400 0 H312 C318 32 304 60 322 96 C332 118 320 134 326 150 H400 Z" fill="#1f5238"/>
      <path d="M196 30 C190 70 204 100 196 150 H206 C214 100 198 70 204 30 Z" fill="url(#${id}w)"/>
      ${[[20, 22, 26], [58, 14, 20], [104, 34, 18], [8, 70, 22], [66, 62, 17], [96, 88, 15], [372, 20, 24], [338, 12, 20], [296, 38, 17], [388, 66, 20], [330, 70, 16], [304, 94, 14]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r * 1.3}" ry="${r}" fill="#35a85a" opacity=".85"/><ellipse cx="${x + 4}" cy="${y - 3}" rx="${r * .8}" ry="${r * .6}" fill="#7fe08a" opacity=".6"/>`).join('')}
      <g stroke="#2f8a4c" stroke-width="2.2" fill="none" stroke-linecap="round">
        <path d="M30 40 C26 70 36 84 30 112"/><path d="M70 30 C66 54 78 70 72 96"/><path d="M360 36 C364 66 352 82 358 108"/><path d="M322 28 C318 52 330 66 324 90"/><path d="M110 60 C118 80 108 92 114 110"/></g>
      <rect y="124" width="400" height="26" fill="#0b2226"/>
      <path d="M0 126 C80 118 140 130 200 124 C260 118 330 130 400 124 V150 H0 Z" fill="#102f30"/>
      ${[[150, 128], [176, 134], [226, 130], [252, 136]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="26" fill="url(#${id}g)"/><ellipse cx="${x}" cy="${y}" rx="8" ry="11" fill="#ffc9f1"/><ellipse cx="${x - 2}" cy="${y - 3}" rx="3" ry="4" fill="#fff" opacity=".8"/>`).join('')}
      ${[[40, 100], [128, 56], [262, 80], [350, 104], [214, 56], [180, 92], [300, 50], [90, 118]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 2 ? 1.6 : 2.4}" fill="#c8ff9a" opacity=".85"/>`).join('')}`,

    // Cité souterraine alien : caverne, flèches lumineuses, ponts et fleuve de lumière.
    cite: id => `<defs>
        <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a0716"/><stop offset=".7" stop-color="#2a1646"/><stop offset="1" stop-color="#3b2063"/></linearGradient>
        <linearGradient id="${id}r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#58e0ff" stop-opacity=".85"/><stop offset="1" stop-color="#7a4dff" stop-opacity=".6"/></linearGradient>
        <radialGradient id="${id}g" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#8af0ff" stop-opacity=".7"/><stop offset="1" stop-color="#8af0ff" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="400" height="150" fill="url(#${id}s)"/>
      <circle cx="200" cy="70" r="90" fill="url(#${id}g)"/>
      <path d="M0 0 H400 V22 L384 12 L368 34 L346 14 L326 40 L300 16 L280 30 L252 10 L230 36 L206 12 L180 38 L158 14 L132 34 L110 12 L86 36 L60 14 L36 32 L14 16 L0 28 Z" fill="#05030c"/>
      ${[[40, 62, 40, 56], [92, 82, 26, 50], [140, 56, 30, 70], [262, 54, 30, 74], [312, 80, 26, 48], [356, 60, 40, 58]].map(([x, y, w, h]) => `<rect x="${x - w / 2}" y="${y}" width="${w}" height="${150 - y}" fill="#1a1033" stroke="#5b3aa8" stroke-opacity=".5"/><path d="M${x - w / 2} ${y} L${x} ${y - 14} L${x + w / 2} ${y} Z" fill="#241546"/>${Array.from({ length: Math.floor(h / 12) }, (_, i) => `<rect x="${x - 3}" y="${y + 6 + i * 11}" width="6" height="5" rx="1" fill="${i % 3 ? '#ffd36b' : '#6fe3ff'}" opacity=".9"/>`).join('')}`).join('')}
      <path d="M186 150 V58 C186 44 194 34 200 18 C206 34 214 44 214 58 V150 Z" fill="#2a1a52" stroke="#8d6cff" stroke-opacity=".7"/>
      <path d="M200 18 V150" stroke="#8af0ff" stroke-opacity=".6"/>
      <circle cx="200" cy="52" r="9" fill="#8af0ff"/><circle cx="200" cy="52" r="4" fill="#fff"/>
      ${[0, 1, 2, 3, 4].map(i => `<rect x="192" y="${74 + i * 13}" width="16" height="4" rx="2" fill="#ffd36b" opacity=".85"/>`).join('')}
      <path d="M100 100 Q150 80 186 98 M214 98 Q250 80 300 100" fill="none" stroke="#8d6cff" stroke-width="4" stroke-opacity=".85"/>
      <path d="M0 126 C90 120 150 132 200 126 C260 120 320 132 400 124 V150 H0 Z" fill="url(#${id}r)"/>
      <path d="M20 134 H110 M150 140 H260 M300 134 H380" stroke="#fff" stroke-opacity=".5" stroke-width="1.2" stroke-linecap="round"/>
      ${[[70, 40], [150, 28], [250, 34], [330, 26], [110, 90], [292, 100], [226, 88]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#8af0ff"/>`).join('')}`,

    // Station Oméga : espace profond, anneau de station et cœur cyclope.
    omega: id => `<defs>
        <radialGradient id="${id}s" cx=".5" cy=".5" r=".75"><stop offset="0" stop-color="#16203a"/><stop offset="1" stop-color="#04060e"/></radialGradient>
        <radialGradient id="${id}e" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff6a5a"/><stop offset=".5" stop-color="#ff3b3b" stop-opacity=".7"/><stop offset="1" stop-color="#ff3b3b" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="400" height="150" fill="url(#${id}s)"/>
      ${Array.from({ length: 36 }, (_, i) => `<circle cx="${(i * 97) % 400}" cy="${(i * 53) % 150}" r="${i % 5 ? .8 : 1.4}" fill="#cfe3ff" opacity="${.35 + (i % 4) * .15}"/>`).join('')}
      <circle cx="200" cy="75" r="62" fill="url(#${id}e)" opacity=".5"/>
      <ellipse cx="200" cy="78" rx="150" ry="34" fill="none" stroke="#3a4a6c" stroke-width="14"/>
      <ellipse cx="200" cy="78" rx="150" ry="34" fill="none" stroke="#7d93c0" stroke-width="2"/>
      ${Array.from({ length: 14 }, (_, i) => { const a = i / 14 * Math.PI * 2; return `<rect x="${num(200 + Math.cos(a) * 150 - 3)}" y="${num(78 + Math.sin(a) * 34 - 2)}" width="6" height="4" fill="${i % 3 ? '#6fe3ff' : '#ffd36b'}"/>`; }).join('')}
      <path d="M200 8 V142 M170 20 L230 136 M230 20 L170 136" stroke="#2b3956" stroke-width="5"/>
      <circle cx="200" cy="75" r="34" fill="#141c30" stroke="#8aa0cc" stroke-width="3"/>
      <circle cx="200" cy="75" r="24" fill="#0a0f1c" stroke="#ff5a4a" stroke-width="2"/>
      <circle cx="200" cy="75" r="14" fill="#ff4a3a"/><circle cx="200" cy="75" r="6" fill="#ffd0c8"/><circle cx="196" cy="71" r="2.4" fill="#fff"/>
      <path d="M0 140 L70 118 L110 132 L60 150 H0 Z M400 140 L336 120 L296 134 L346 150 H400 Z" fill="#0d1424" stroke="#3a4a6c"/>`,

    // Forge de Brasier-Roc : volcan, fleuve de lave, enclume et cheminées.
    forge: id => `<defs>
        <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a0d0d"/><stop offset=".6" stop-color="#8a2a10"/><stop offset="1" stop-color="#ff9a2e"/></linearGradient>
        <linearGradient id="${id}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd23a"/><stop offset="1" stop-color="#ff4a12"/></linearGradient>
      </defs>
      <rect width="400" height="150" fill="url(#${id}s)"/>
      <path d="M0 150 V84 L60 62 L120 90 L190 28 L230 28 L300 90 L350 66 L400 86 V150 Z" fill="#1b0a0a"/>
      <path d="M190 28 H230 L224 40 H196 Z" fill="#ff7a1a"/><path d="M204 28 C200 14 212 6 208 -4 M216 28 C220 12 210 4 216 -6" stroke="#ffb27a" stroke-opacity=".45" stroke-width="5" fill="none"/>
      ${[[56, 70, 12, 50], [330, 74, 14, 56]].map(([x, y, w, h]) => `<rect x="${x - w / 2}" y="${y}" width="${w}" height="${h}" fill="#2a1410" stroke="#5a2a1a"/><rect x="${x - w / 2 - 2}" y="${y - 4}" width="${w + 4}" height="5" fill="#3a1c14"/><circle cx="${x}" cy="${y - 14}" r="9" fill="#ffb27a" opacity=".25"/>`).join('')}
      <path d="M0 116 C70 108 120 124 200 116 C280 108 330 124 400 114 V150 H0 Z" fill="url(#${id}l)"/>
      <path d="M30 128 q18 -6 34 0 M150 134 q22 -7 44 0 M290 128 q18 -6 36 0" stroke="#fff3a8" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/>
      <g fill="#0c0606"><path d="M158 118 H242 L234 104 H200 L206 92 H176 C168 92 166 100 172 104 H164 Z"/><rect x="186" y="118" width="28" height="18"/><rect x="170" y="134" width="60" height="8" rx="2"/></g>
      ${[[170, 80], [230, 70], [140, 60], [270, 90], [208, 56], [110, 96], [300, 62]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 2 ? 1.4 : 2.2}" fill="#ffd27a"/>`).join('')}`
  };

  // Carte de donjon, format paysage (400 x 270). d : { id, name, type, boss: { name, hp, desc } }
  function dungeonCard(d, o = {}) {
    const id = 'd' + (++GID), W = 400, H = 270, col = typeColor(d.type), sel = !!o.selected;
    const scene = (scenes[d.id] || scenes.omega)(id);
    const desc = wrap(d.boss.desc, 62).slice(0, 3);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${o.width || W}" font-family="${FONT}">
      <defs><clipPath id="${id}c"><rect x="8" y="8" width="384" height="140" rx="10"/></clipPath>
        <linearGradient id="${id}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".75"/></linearGradient></defs>
      <rect x="1.5" y="1.5" width="${W - 3}" height="${H - 3}" rx="15" fill="${UI.card}" stroke="${sel ? UI.gold : col}" stroke-opacity="${sel ? 1 : .55}" stroke-width="${sel ? 4 : 2.5}"/>
      <g clip-path="url(#${id}c)"><svg x="0" y="4" width="400" height="150" viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice">${scene}</svg>
        <rect x="8" y="88" width="384" height="60" fill="url(#${id}f)"/></g>
      <rect x="8" y="8" width="384" height="140" rx="10" fill="none" stroke="${col}" stroke-opacity=".6"/>
      <text x="20" y="136" font-size="19" font-weight="800" fill="#fff" stroke="#000" stroke-opacity=".5" stroke-width=".6" paint-order="stroke">${esc(d.name)}</text>
      ${typeChipG(d.type, 20, 158)}
      <text x="380" y="173" text-anchor="end" font-size="11" fill="${UI.muted}">Boss</text>
      <text x="20" y="200" font-size="13" font-weight="700" fill="#ff9d8f">${esc(d.boss.name)}</text>
      <circle cx="372" cy="196" r="15" fill="${UI.hp}" stroke="${UI.cardDeep}" stroke-width="2"/><text x="372" y="202" text-anchor="middle" font-size="${d.boss.hp > 99 ? 13 : 15}" font-weight="800" fill="#fff">${d.boss.hp}</text>
      <g font-size="10.5" fill="${UI.muted}">${desc.map((l, i) => `<text x="20" y="${220 + i * 13}">${esc(l)}</text>`).join('')}</g>
    </svg>`;
  }

  // Décor seul (400 x 150), pour les bandeaux HTML.
  function dungeonScene(d, o = {}) {
    const id = 'd' + (++GID);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 150" width="${o.width || 400}" preserveAspectRatio="xMidYMid slice" font-family="${FONT}">${(scenes[d.id] || scenes.omega)(id)}</svg>`;
  }

  // Pastille de type à insérer dans un SVG existant (position x, y).
  function typeChipG(t, x, y) {
    const col = typeColor(t), w = Math.max(70, Math.ceil(31 + t.length * 6.4));
    return `<g><rect x="${x}" y="${y}" width="${w}" height="22" rx="11" fill="${col}" fill-opacity=".16" stroke="${col}" stroke-opacity=".7"/>${iconG(t, x + 5, y + 3, 16, col, UI.card)}<text x="${x + 26}" y="${y + 15}" font-size="11" font-weight="600" fill="${UI.text}">${esc(t)}</text></g>`;
  }

  // Même pastille que sur les cartes de donjon et de héros, en balise <svg> autonome pour les pages HTML.
  function typeChipSvg(t) {
    const w = Math.max(70, Math.ceil(31 + t.length * 6.4)) + 2;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} 24" width="${w}" height="24" font-family="${FONT}">${typeChipG(t, 1, 1)}</svg>`;
  }

  // Carte de héros, format paysage (400 x 190) : portrait à gauche (emblème d'espèce + médaillon d'archétype), texte à droite.
  // h : { name, types[], hp, kw?, powerText, powerKind }
  function heroCard(h, o = {}) {
    const id = 'h' + (++GID), W = 400, H = 190, types = h.types, col = accentOf(types), sel = !!o.selected;
    const sp = types.find(isSpecies), arch = types.find(t => !isSpecies(t)), ac = arch ? typeColor(arch) : col;
    const lines = wrap(h.powerText || '', 34).slice(0, 4);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${o.width || W}" font-family="${FONT}"${h.hp <= 0 ? ' opacity=".5"' : ''}>
      <defs>
        <linearGradient id="${id}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${col}" stop-opacity=".55"/><stop offset="1" stop-color="${UI.cardDeep}"/></linearGradient>
        <radialGradient id="${id}c" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
        <clipPath id="${id}p"><rect x="10" y="10" width="140" height="170" rx="10"/></clipPath>
      </defs>
      <rect x="1.5" y="1.5" width="${W - 3}" height="${H - 3}" rx="15" fill="${UI.card}" stroke="${sel ? UI.gold : col}" stroke-opacity="${sel ? 1 : .6}" stroke-width="${sel ? 4 : 2.5}"/>
      <rect x="10" y="10" width="140" height="170" rx="10" fill="url(#${id}a)" stroke="${col}" stroke-opacity=".6"/>
      <g clip-path="url(#${id}p)" opacity=".13" stroke="${col}">${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${10 + i * 26} 10 l-60 170"/>`).join('')}</g>
      <circle cx="80" cy="84" r="56" fill="${col}" fill-opacity=".14"/><circle cx="80" cy="84" r="47" fill="none" stroke="${col}" stroke-opacity=".4" stroke-dasharray="2 5"/>
      ${sp ? iconG(sp, 36, 40, 88, col, UI.cardDeep) : ''}
      ${arch ? `<circle cx="124" cy="146" r="20" fill="${UI.cardDeep}" stroke="${ac}" stroke-width="2.5"/>${iconG(arch, 112, 134, 24, ac)}` : ''}
      <text x="168" y="34" font-size="${h.name.length > 16 ? 16 : 19}" font-weight="800" fill="${UI.text}">${esc(h.name)}</text>
      ${(() => { let x = 168; return types.map(t => { const w = Math.max(70, Math.ceil(31 + t.length * 6.4)), g = typeChipG(t, x, 44); x += w + 6; return g; }).join(''); })()}
      ${(() => { const t = h.maxhp ? `${h.hp}/${h.maxhp}` : `${h.hp}`, w = 40 + t.length * 10; return `<rect x="${388 - w}" y="12" width="${w}" height="28" rx="14" fill="${h.hp <= 0 ? '#6b2a27' : UI.hp}" stroke="${UI.cardDeep}" stroke-width="2"/>
        ${iconG('heart', 388 - w + 10, 17, 18, '#000')}<text x="${388 - w + 32}" y="32" font-size="17" font-weight="900" fill="#000">${t}</text>`; })()}
      ${h.hp <= 0 ? `<text x="168" y="${H - 14}" font-size="12" font-weight="800" fill="#ff9d8f">À TERRE : pouvoir perdu</text>` : ''}
      ${h.kw && KW_LABEL[h.kw] ? `<g><circle cx="180" cy="86" r="10" fill="${UI.cardDeep}" stroke="${UI.text}" stroke-opacity=".8"/>${iconG(KW_ICON[h.kw], 173, 79, 14, UI.text)}<text x="196" y="90" font-size="11" font-weight="700" fill="${h.kw === 'shield' ? SHIELD : UI.text}">${KW_LABEL[h.kw]}</text></g>` : ''}
      <line x1="168" y1="106" x2="388" y2="106" stroke="${col}" stroke-opacity=".3"/>
      <g font-size="11.5">${lines.map((l, i) => `<text x="168" y="${126 + i * 15}" fill="${h.powerKind === 'renfort' ? '#7ad0ff' : '#ff9d8f'}">${esc(l)}</text>`).join('')}</g>
    </svg>`;
  }

  const api = { SPECIES, SPECIES_COLOR, FAMILY_COLOR, ARCH_FAMILY, UI, typeColor, isSpecies, ICONS, KW_LABEL, KW_DESC, icon, iconG, typeChip, servantCard, equipCard, heroCard, dungeonCard, dungeonScene, typeChipSvg };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.AWGfx = api;
})(typeof window !== 'undefined' ? window : globalThis);
