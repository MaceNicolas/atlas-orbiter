// Atlas Wanderer — données : constantes, types, serviteurs, équipements, héros, donjons (contenu provisoire).
'use strict';
// =====================================================================
// DONNÉES — tout ce qui n'est pas dans NEW_IDEAS.md est PROVISOIRE
// (contenu, chiffres, types). Les règles, elles, suivent NEW_IDEAS.md.
// =====================================================================
const MAX_BOARD = 7;          // règle : plateau à 7
const MAX_LEVEL = 5;          // ouvert : niveau max de renfort (provisoire)
const PROPOSALS = 3;          // ouvert : nombre X de propositions (provisoire)
const FATIGUE_START = 30;     // ouvert : seuil de l'usure (provisoire)
const HAND_MAX = 7;           // main : 7 emplacements (serviteurs et équipements confondus)
// Datacrons gagnés à chaque renfort, selon la salle (provisoire) ; au-delà, la dernière valeur.
const INCOME = [3, 3, 4, 3, 5, 3, 4, 4, 5, 4, 4, 5, 4, 5, 5, 4, 5, 5, 5, 5];
const incomeFor = room => INCOME[Math.min(room, INCOME.length) - 1];
// Difficulté (provisoire) : nombre d'ennemis = startCount + salle / countStep (max 7) ;
// rang max des ennemis = 1 + salle / rankStep ; à partir de la salle bonusFrom,
// ils gagnent +1/+1 toutes les bonusStep salles.
const ENEMY = { startCount: 2, countStep: 2, rankStep: 2, bonusFrom: 4, bonusStep: 2 };

const KW = { prov: 'Provocation', shield: 'Bouclier divin', poison: 'Poison', rebirth: 'Renaissance', ranged: 'À distance' };
const TRIG = {
  startCombat: 'Début de combat', deathrattle: "Râle d'agonie", endCombat: 'Fin de combat',
  battlecry: 'Cri de guerre', startRenfort: 'Début de renfort', endRenfort: 'Fin de renfort'
};
// Règle : une compétence est soit de combat, soit de renfort, jamais les deux.
const TRIG_KIND = { startCombat: 'combat', deathrattle: 'combat', endCombat: 'combat', battlecry: 'renfort', startRenfort: 'renfort', endRenfort: 'renfort' };

let UID = 0;
const uid = () => ++UID;
const rand = n => Math.floor(Math.random() * n);
const pick = a => a[rand(a.length)];

const sk = (t, fx, a = 0, h = 0, n = 0) => ({ t, fx, a, h, n });
function skDesc(k) {
  const bf = `+${k.a}/+${k.h}`;
  const d = {
    buffSelf: `${bf} à lui-même`,
    buffAllies: `${bf} aux autres alliés`,
    buffRandomAlly: `${bf} à un allié aléatoire`,
    buffLeftmost: `${bf} à l'allié le plus à gauche`,
    dmgRandomEnemy: `${k.n} dégâts à un ennemi aléatoire`,
    debuffRandomEnemy: `retire ${k.n} ATQ à un ennemi aléatoire`,
    buffEquippedAlly: `${bf} à un allié équipé`,
    buffPerType: `${bf} par type différent dans votre équipe (max 3)`,
    summon: `invoque un automate ${k.a}/${k.h} à sa droite`
  }[k.fx];
  return `${TRIG[k.t]} : ${d}`;
}

// Types (documentation/types/) : espèces = ce qu'est le serviteur, archétypes = comment il se joue.
// Une seule famille de types pour les règles. Félin : espèce possible, sans nom (provisoire).
const SPECIES = ['Elk', 'Dwork', 'Droïde', 'Félin'];
const ARCHETYPES = ['Pilote', 'Ingénieur', 'Médecin', 'Sécurité', 'Explorateur', 'Artilleur', 'Renseignement', 'Roboticien', 'Xénobiologiste'];
const ALL_TYPES = [...SPECIES, ...ARCHETYPES];

const S = (name, rank, atk, hp, types, kw = [], skill = null) => ({ name, rank, atk, hp, types, kw, skill });
const SERVANTS = [
  // Pilote : ouverture, rythme (le plus à gauche attaque en premier)
  S('Apprenti pilote', 1, 2, 3, ['Pilote'], [], sk('startCombat', 'buffLeftmost', 1, 0)),
  S('Pilote de chasse', 2, 3, 3, ['Pilote'], [], sk('startCombat', 'buffLeftmost', 2, 0)),
  S('As de la passerelle', 3, 4, 4, ['Pilote'], [], sk('startCombat', 'buffLeftmost', 2, 1)),
  S('Commandant de vol', 4, 5, 6, ['Pilote'], [], sk('startCombat', 'buffAllies', 1, 0)),
  S('Maître d\'escadre', 5, 6, 8, ['Pilote'], [], sk('startCombat', 'buffLeftmost', 4, 2)),
  // Ingénieur : renforcer via les équipements, Bouclier divin
  S('Mécano', 1, 1, 3, ['Ingénieur'], [], sk('startCombat', 'buffEquippedAlly', 1, 0)),
  S('Technicien', 2, 2, 4, ['Ingénieur'], [], sk('endRenfort', 'buffRandomAlly', 1, 1)),
  S('Spécialiste des systèmes', 3, 2, 5, ['Ingénieur'], ['shield'], sk('startCombat', 'buffEquippedAlly', 2, 0)),
  S('Chef mécanicien', 4, 4, 7, ['Ingénieur'], [], sk('startCombat', 'buffEquippedAlly', 2, 2)),
  S('Ingénieur en chef', 5, 5, 9, ['Ingénieur'], ['shield'], sk('startCombat', 'buffAllies', 1, 1)),
  // Médecin : prévention des dégâts, PV
  S('Infirmier', 1, 1, 3, ['Médecin'], [], sk('endRenfort', 'buffRandomAlly', 0, 2)),
  S('Médecin de terrain', 2, 2, 4, ['Médecin'], [], sk('startCombat', 'buffRandomAlly', 0, 3)),
  S('Chirurgien', 3, 3, 5, ['Médecin'], [], sk('startCombat', 'buffAllies', 0, 2)),
  S('Médecin-chef', 4, 4, 7, ['Médecin'], [], sk('deathrattle', 'buffAllies', 1, 2)),
  S('Praticien légendaire', 5, 5, 9, ['Médecin'], [], sk('startCombat', 'buffAllies', 1, 3)),
  // Sécurité : Provocation, Bouclier divin
  S('Vigile', 1, 1, 4, ['Sécurité'], ['prov']),
  S('Garde d\'abordage', 2, 2, 5, ['Sécurité'], ['prov']),
  S('Sergent de sécurité', 3, 3, 6, ['Sécurité'], ['prov'], sk('startCombat', 'buffSelf', 0, 2)),
  S('Chef de la sécurité', 4, 4, 8, ['Sécurité'], ['prov', 'shield']),
  S('Commandant de bord', 5, 6, 11, ['Sécurité'], ['prov', 'shield'], sk('startCombat', 'buffAllies', 0, 2)),
  // Explorateur : À distance, récompense de la diversité de types
  S('Éclaireur', 1, 2, 2, ['Explorateur'], ['ranged']),
  S('Sondeur planétaire', 2, 2, 4, ['Explorateur'], [], sk('startCombat', 'buffPerType', 1, 0)),
  S('Cartographe', 3, 3, 5, ['Explorateur'], ['ranged'], sk('startCombat', 'buffPerType', 1, 0)),
  S('Chasseur de reliques', 4, 4, 6, ['Explorateur'], ['ranged'], sk('startCombat', 'buffPerType', 1, 1)),
  S('Grand explorateur', 5, 6, 7, ['Explorateur'], ['ranged'], sk('startCombat', 'buffPerType', 1, 1)),
  // Artilleur : À distance, dégâts directs
  S('Tireur', 1, 3, 2, ['Artilleur'], ['ranged']),
  S('Canonnier', 2, 3, 3, ['Artilleur'], ['ranged']),
  S('Tireur d\'élite', 3, 4, 4, ['Artilleur'], ['ranged'], sk('startCombat', 'buffSelf', 1, 0)),
  S('Maître-artilleur', 4, 5, 5, ['Artilleur'], ['ranged'], sk('startCombat', 'dmgRandomEnemy', 0, 0, 3)),
  S('Bombardier', 5, 7, 7, ['Artilleur'], ['ranged'], sk('startCombat', 'dmgRandomEnemy', 0, 0, 4)),
  // Renseignement : affaiblir l'adversaire
  S('Agent', 1, 2, 2, ['Renseignement'], [], sk('startCombat', 'debuffRandomEnemy', 0, 0, 1)),
  S('Intrus réseau', 2, 2, 3, ['Renseignement'], [], sk('startCombat', 'debuffRandomEnemy', 0, 0, 2)),
  S('Saboteur', 3, 3, 4, ['Renseignement'], [], sk('startCombat', 'debuffRandomEnemy', 0, 0, 3)),
  S('Maître espion', 4, 4, 6, ['Renseignement'], [], sk('startCombat', 'debuffRandomEnemy', 0, 0, 4)),
  S('Spectre', 5, 6, 6, ['Renseignement'], [], sk('startCombat', 'debuffRandomEnemy', 0, 0, 5)),
  // Roboticien : invoquer des automates
  S('Opérateur de sonde', 1, 1, 2, ['Roboticien'], [], sk('startCombat', 'summon', 1, 1)),
  S('Opérateur d\'essaim', 2, 2, 3, ['Roboticien'], [], sk('startCombat', 'summon', 1, 1)),
  S('Chef d\'atelier', 3, 2, 5, ['Roboticien'], [], sk('startCombat', 'summon', 2, 2)),
  S('Maître des automates', 4, 3, 6, ['Roboticien'], [], sk('startCombat', 'summon', 3, 3)),
  S('Architecte d\'essaim', 5, 4, 8, ['Roboticien'], [], sk('startCombat', 'summon', 4, 4)),
  // Xénobiologiste : Poison, Renaissance, effets de mort
  S('Assistant de labo', 1, 2, 2, ['Xénobiologiste'], [], sk('deathrattle', 'buffRandomAlly', 1, 1)),
  S('Spécialiste des organismes', 2, 1, 3, ['Xénobiologiste'], ['poison']),
  S('Symbiote', 3, 3, 5, ['Xénobiologiste'], ['rebirth']),
  S('Généticien', 4, 4, 6, ['Xénobiologiste'], ['poison'], sk('deathrattle', 'buffAllies', 1, 1)),
  S('Maître des mutations', 5, 6, 8, ['Xénobiologiste'], ['poison', 'rebirth'], sk('startCombat', 'dmgRandomEnemy', 0, 0, 3)),
  // Espèce + archétype (contenu provisoire : les fiches d'espèces n'ont pas encore de section « Dans le jeu »)
  S('Aviateur elk', 2, 3, 3, ['Elk', 'Pilote'], [], sk('startCombat', 'buffLeftmost', 1, 0)),
  S('Éclaireur elk', 3, 3, 5, ['Elk', 'Explorateur'], ['ranged']),
  S('Corsaire elk', 4, 5, 5, ['Elk', 'Artilleur'], ['ranged'], sk('startCombat', 'buffSelf', 1, 0)),
  S('Mineur dwork', 2, 2, 5, ['Dwork', 'Ingénieur'], [], sk('endRenfort', 'buffSelf', 0, 1)),
  S('Gardien de chantier', 3, 3, 8, ['Dwork', 'Sécurité'], ['prov']),
  S('Forgeron dwork', 4, 4, 8, ['Dwork', 'Ingénieur'], ['shield'], sk('startCombat', 'buffEquippedAlly', 2, 0)),
  S('Droïde de maintenance', 2, 2, 4, ['Droïde', 'Ingénieur'], [], sk('endRenfort', 'buffRandomAlly', 0, 2)),
  S('Droïde infirmier', 3, 2, 5, ['Droïde', 'Médecin'], [], sk('startCombat', 'buffAllies', 0, 2)),
  S('Droïde de combat', 4, 4, 7, ['Droïde', 'Sécurité'], ['prov'], sk('deathrattle', 'buffAllies', 1, 0)),
  S('Rôdeur félin', 2, 3, 2, ['Félin', 'Renseignement'], [], sk('startCombat', 'debuffRandomEnemy', 0, 0, 1)),
  S('Pisteur félin', 3, 3, 4, ['Félin', 'Explorateur'], ['ranged']),
  S('Pilote félin', 4, 5, 4, ['Félin', 'Pilote'], ['shield'], sk('startCombat', 'buffLeftmost', 2, 0))
];

// skill : effet d'équipement, déclenché sur le serviteur qui le porte. Effet de renfort = permanent,
// effet de combat = valable pour le combat seulement.
const E = (name, rank, atk, hp, kw = null, type = null, skill = null) => ({ name, rank, atk, hp, kw, type, skill });
const EQUIPS = [
  E('Plaque d\'acier', 1, 0, 2), E('Lame vibrante', 1, 2, 0), E('Module d\'attaque', 1, 1, 1),
  E('Balise de combat', 2, 0, 2, 'prov', 'Sécurité'), E('Bouclier à champ', 2, 0, 1, 'shield', 'Ingénieur'),
  E('Cartouches perforantes', 2, 2, 1, null, 'Artilleur'), E('Blindage', 2, 1, 3),
  E('Châssis d\'automate', 2, 1, 2, null, 'Roboticien'),
  E('Dose de neurotoxine', 3, 1, 0, 'poison', 'Xénobiologiste'), E('Canon longue portée', 3, 2, 0, 'ranged', 'Artilleur'),
  E('Implant neural', 3, 2, 2), E('Réacteur surchargé', 3, 3, 1, null, 'Ingénieur'),
  E('Brouilleur', 3, 2, 1, null, 'Renseignement'), E('Sonde d\'analyse', 3, 1, 2, 'ranged', 'Explorateur'),
  E('Nano-régénérateur', 4, 1, 2, 'rebirth', 'Médecin'), E('Armure de siège', 4, 2, 5, 'prov', 'Sécurité'),
  E('Module de saut', 4, 4, 2, null, 'Pilote'),
  E('Cœur de réacteur', 5, 4, 4), E('Aura divine', 5, 3, 3, 'shield'),
  // Équipements à effet
  E('Adrénaline', 1, 0, 1, null, null, sk('startCombat', 'buffSelf', 1, 1)),
  E('Module de croissance', 2, 0, 1, null, null, sk('startRenfort', 'buffSelf', 1, 0)),
  E('Stimulants de choc', 2, 0, 0, null, null, sk('startCombat', 'buffSelf', 2, 1)),
  E('Nano-ruche', 3, 0, 1, null, 'Xénobiologiste', sk('endRenfort', 'buffSelf', 1, 1)),
  E('Charge de rupture', 3, 1, 0, null, 'Artilleur', sk('deathrattle', 'dmgRandomEnemy', 0, 0, 3)),
  E('Injecteur de combat', 3, 1, 1, null, 'Médecin', sk('startCombat', 'buffSelf', 3, 2)),
  E('Matrice évolutive', 4, 0, 2, null, 'Ingénieur', sk('startRenfort', 'buffSelf', 2, 2)),
  E('Balise de commandement', 4, 0, 2, null, 'Pilote', sk('startCombat', 'buffAllies', 1, 1))
];

// Chaque héros a deux types : ici une espèce et un archétype (rien ne l'impose).
const HEROES = {
  vex:   { id: 'vex', name: 'Capitaine Vex', types: ['Elk', 'Pilote'], hp: 30, kw: 'prov',
           power: sk('startCombat', 'buffLeftmost', 2, 0) },
  brokk: { id: 'brokk', name: 'Brokk', types: ['Dwork', 'Ingénieur'], hp: 34, kw: null,
           power: sk('endRenfort', 'buffRandomAlly', 1, 1) },
  z9:    { id: 'z9', name: 'Z-9', types: ['Droïde', 'Roboticien'], hp: 26, kw: 'shield',
           power: sk('startRenfort', 'buffRandomAlly', 1, 0) },
  ilya:  { id: 'ilya', name: 'Dr Ilya', types: ['Félin', 'Xénobiologiste'], hp: 28, kw: 'shield',
           power: sk('startCombat', 'dmgRandomEnemy', 0, 0, 2) }
};

const DUNGEONS = {
  nid: { id: 'nid', name: 'Le Nid de la Reine', type: 'Xénobiologiste', boss: { name: 'La Reine-Mère', hp: 250, power: 'regen',
         desc: 'Régénération : après chaque attaque, ses serviteurs récupèrent 2 PV (jusqu\'à leur maximum).' } },
  omega: { id: 'omega', name: 'Station Oméga', type: 'Droïde', boss: { name: 'Intelligence Oméga', hp: 200, power: 'surge',
         desc: 'Surcharge : au début de chaque combat, ses serviteurs gagnent +1/+1 par tranche de trois salles déjà franchies.' } }
};
