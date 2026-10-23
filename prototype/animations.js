// Atlas Wanderer — animations de combat : charge d'une carte sur sa cible, projectile, impact,
// chiffres flottants, mort, apparition. S'appuie sur l'API Web Animations et sur data-uid des cartes.
'use strict';
const cardEl = uid => (uid == null ? null : document.querySelector(`[data-uid="${uid}"]`));
const centerOf = el => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, r }; };

// Texte qui monte et s'efface au-dessus d'une carte (dégâts, bonus, soin, Bouclier divin).
function floatText(el, text, color) {
  const { x, r } = centerOf(el), n = (el._fx = (el._fx || 0) + 1) - 1, T = UI.pb.speed;
  const span = document.createElement('div');
  span.textContent = text;
  span.style.cssText = `position:fixed;left:${x}px;top:${r.top + r.height * 0.35 + n * 24}px;transform:translateX(-50%);z-index:100;pointer-events:none;` +
    `font:800 24px system-ui,sans-serif;color:${color};text-shadow:0 2px 4px #000,0 0 8px #000;white-space:nowrap`;
  document.body.appendChild(span);
  const a = span.animate([{ opacity: 0, transform: 'translate(-50%,10px) scale(.6)' }, { opacity: 1, transform: 'translate(-50%,-6px) scale(1.15)', offset: .2 },
    { opacity: 1, transform: 'translate(-50%,-26px) scale(1)', offset: .7 }, { opacity: 0, transform: 'translate(-50%,-44px) scale(1)' }], { duration: Math.min(1100, T * 1.3), easing: 'ease-out' });
  a.onfinish = () => span.remove();
}

// Phase « avant l'impact » : la carte qui attaque fonce vers sa cible, ou un projectile part (À distance).
function playLunge(f) {
  const a = cardEl(f.hl.att), t = cardEl(f.hl.tgt), L = UI.pb.speed * 0.4;
  UI.pb.lunge = null;
  if (!a || !t) return;
  const ca = centerOf(a), ct = centerOf(t), dx = ct.x - ca.x, dy = ct.y - ca.y;
  a.style.position = 'relative'; a.style.zIndex = 30;
  if (f.hl.ranged) {
    a.animate([{ transform: 'scale(1)' }, { transform: 'translate(0,6px) scale(1.04)' }], { duration: L, fill: 'forwards' });
    const p = document.createElement('div');
    p.style.cssText = `position:fixed;left:${ca.x - 9}px;top:${ca.y - 9}px;width:18px;height:18px;border-radius:50%;z-index:90;pointer-events:none;` +
      'background:radial-gradient(circle,#fff,#ffd45e 45%,#ff8a2b);box-shadow:0 0 14px 6px #ffb347';
    document.body.appendChild(p);
    p.animate([{ transform: 'translate(0,0) scale(.6)' }, { transform: `translate(${dx}px,${dy}px) scale(1.1)` }], { duration: L, easing: 'ease-in' }).onfinish = () => p.remove();
  } else {
    a.animate([{ transform: 'translate(0,0) scale(1)' }, { transform: `translate(${dx * 0.8}px,${dy * 0.8}px) scale(1.1)` }], { duration: L, easing: 'cubic-bezier(.5,0,.9,.4)', fill: 'forwards' });
    UI.pb.lunge = { uid: f.hl.att, dx: dx * 0.8, dy: dy * 0.8 };
  }
}

// Phase « impact » : compare l'image précédente et l'image courante et anime les différences.
function playImpact(prev, cur) {
  const T = UI.pb.speed, flat = fr => new Map([...fr.p, ...fr.e].map(s => [s.uid, s]));
  const before = flat(prev), after = flat(cur);
  const L = UI.pb.lunge;
  if (L && cardEl(L.uid)) {          // la carte qui a chargé revient à sa place
    const el = cardEl(L.uid); el.style.position = 'relative'; el.style.zIndex = 30;
    el.animate([{ transform: `translate(${L.dx}px,${L.dy}px) scale(1.1)` }, { transform: 'translate(0,0) scale(1)' }], { duration: T * 0.3, easing: 'ease-out' });
  }
  UI.pb.lunge = null;
  after.forEach((s, uid) => {
    const el = cardEl(uid); if (!el) return;
    const o = before.get(uid);
    if (!o) {                        // invocation ou renaissance
      el.animate([{ opacity: 0, transform: 'scale(.3)' }, { opacity: 1, transform: 'scale(1.12)', offset: .6 }, { opacity: 1, transform: 'scale(1)' }], { duration: T * 0.6, easing: 'ease-out' });
      return;
    }
    const dmg = o.hp - s.hp, buffA = s.atk - o.atk, buffH = s.maxhp - o.maxhp;
    if (dmg > 0) {
      el.animate([{ transform: 'translateX(0)', filter: 'brightness(1)' }, { transform: 'translateX(-9px)', filter: 'brightness(2.2) saturate(1.5)', offset: .2 },
        { transform: 'translateX(8px)', filter: 'brightness(1.5)', offset: .45 }, { transform: 'translateX(-4px)', offset: .7 }, { transform: 'translateX(0)', filter: 'brightness(1)' }], { duration: T * 0.45 });
      floatText(el, `−${dmg}`, '#ff6b5e');
    } else if (buffA > 0 || buffH > 0) {
      el.animate([{ filter: 'brightness(1)', transform: 'scale(1)' }, { filter: 'brightness(1.7) saturate(1.4)', transform: 'scale(1.07)', offset: .4 }, { filter: 'brightness(1)', transform: 'scale(1)' }], { duration: T * 0.6 });
      floatText(el, `+${Math.max(buffA, 0)}/+${Math.max(buffH, 0)}`, '#6ee7a0');
    } else if (dmg < 0) {            // soin
      el.animate([{ filter: 'brightness(1)' }, { filter: 'brightness(1.6)', offset: .4 }, { filter: 'brightness(1)' }], { duration: T * 0.5 });
      floatText(el, `+${-dmg}`, '#6ee7a0');
    } else if (buffA < 0) {          // affaiblissement
      floatText(el, `${buffA} ATQ`, '#f0a53a');
    }
    if (o.shield && !s.shield) {     // Bouclier divin consommé
      el.animate([{ filter: 'drop-shadow(0 0 0 #6fe3ff)' }, { filter: 'drop-shadow(0 0 22px #6fe3ff) brightness(1.4)', offset: .35 }, { filter: 'drop-shadow(0 0 0 #6fe3ff)' }], { duration: T * 0.7 });
      floatText(el, 'Bouclier !', '#6fe3ff');
    }
  });
  (cur.hl.dead || []).forEach(uid => {
    const el = cardEl(uid);
    if (el) el.animate([{ opacity: 1, transform: 'scale(1) rotate(0)' }, { opacity: 0, transform: 'scale(.65) rotate(-7deg)' }], { duration: T * 0.55, fill: 'forwards', easing: 'ease-in' });
  });
}
