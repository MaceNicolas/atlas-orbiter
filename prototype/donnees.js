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
// Le Boss joue trois plateaux indépendants, renforcés chaque salle comme un joueur (moteur.js).
// malus : Datacrons en moins par salle (1 = toujours un de moins, 0.5 = un de moins une fois sur deux).
const BOSS_BOARDS = [{ malus: 1 }, { malus: 0.5 }, { malus: 0 }];

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
    summon: `invoque une sonde ${k.a}/${k.h} à sa droite`,
    buffAdjacent: `${bf} aux alliés adjacents`
  }[k.fx];
  return `${TRIG[k.t]} : ${d}`;
}

// Types (documentation/types/) : espèces = ce qu'est le serviteur, archétypes = comment il se joue.
// Une seule famille de types pour les règles. Chaque serviteur a une espèce et un archétype obligatoire.
// Félin : espèce possible, sans nom (provisoire).
const SPECIES = ['Alien', 'Elk', 'Dwork', 'Droïde', 'Félin'];   // Alien : espèce générique, par défaut
const ARCHETYPES = ['Pilote', 'Ingénieur', 'Médecin', 'Sécurité', 'Explorateur', 'Artilleur', 'Renseignement', 'Roboticien', 'Xénobiologiste', 'Diplomate'];
const ALL_TYPES = [...SPECIES, ...ARCHETYPES];

const S = (name, rank, atk, hp, types, kw = [], skill = null) => ({ name, rank, atk, hp, types, kw, skill });
const SERVANTS = [
  // Pilote : ouverture, rythme (le plus à gauche attaque en premier)
  S('Apprenti pilote', 1, 2, 3, ['Elk', 'Pilote'], [], sk('startCombat', 'buffLeftmost', 1, 0)),
  S('Pilote de chasse', 2, 3, 3, ['Alien', 'Pilote'], [], sk('startCombat', 'buffLeftmost', 2, 0)),
  S('As de la passerelle', 3, 4, 4, ['Dwork', 'Pilote'], [], sk('startCombat', 'buffLeftmost', 2, 1)),
  S('Commandant de vol', 4, 5, 6, ['Alien', 'Pilote'], [], sk('startCombat', 'buffAllies', 1, 0)),
  S('Maître d\'escadre', 5, 6, 8, ['Droïde', 'Pilote'], [], sk('startCombat', 'buffLeftmost', 4, 2)),
  // Ingénieur : renforcer via les équipements, Bouclier divin
  S('Mécano', 1, 1, 3, ['Alien', 'Ingénieur'], [], sk('startCombat', 'buffEquippedAlly', 1, 0)),
  S('Technicien', 2, 2, 4, ['Droïde', 'Ingénieur'], [], sk('endRenfort', 'buffRandomAlly', 1, 1)),
  S('Spécialiste des systèmes', 3, 2, 5, ['Alien', 'Ingénieur'], ['shield'], sk('startCombat', 'buffEquippedAlly', 2, 0)),
  S('Chef mécanicien', 4, 4, 7, ['Félin', 'Ingénieur'], [], sk('startCombat', 'buffEquippedAlly', 2, 2)),
  S('Ingénieur en chef', 5, 5, 9, ['Alien', 'Ingénieur'], ['shield'], sk('startCombat', 'buffAllies', 1, 1)),
  // Médecin : prévention des dégâts, PV
  S('Infirmier', 1, 1, 3, ['Félin', 'Médecin'], [], sk('endRenfort', 'buffRandomAlly', 0, 2)),
  S('Médecin de terrain', 2, 2, 4, ['Alien', 'Médecin'], [], sk('startCombat', 'buffRandomAlly', 0, 3)),
  S('Chirurgien', 3, 3, 5, ['Elk', 'Médecin'], [], sk('startCombat', 'buffAllies', 0, 2)),
  S('Médecin-chef', 4, 4, 7, ['Alien', 'Médecin'], [], sk('deathrattle', 'buffAllies', 1, 2)),
  S('Praticien légendaire', 5, 5, 9, ['Dwork', 'Médecin'], [], sk('startCombat', 'buffAllies', 1, 3)),
  // Sécurité : Provocation, Bouclier divin
  S('Vigile', 1, 1, 4, ['Alien', 'Sécurité'], ['prov']),
  S('Garde d\'abordage', 2, 2, 5, ['Dwork', 'Sécurité'], ['prov']),
  S('Sergent de sécurité', 3, 3, 6, ['Alien', 'Sécurité'], ['prov'], sk('startCombat', 'buffSelf', 0, 2)),
  S('Chef de la sécurité', 4, 4, 8, ['Droïde', 'Sécurité'], ['prov', 'shield']),
  S('Commandant de bord', 5, 6, 11, ['Alien', 'Sécurité'], ['prov', 'shield'], sk('startCombat', 'buffAllies', 0, 2)),
  // Explorateur : À distance, récompense de la diversité de types
  S('Éclaireur', 1, 2, 2, ['Droïde', 'Explorateur'], ['ranged']),
  S('Sondeur planétaire', 2, 2, 4, ['Alien', 'Explorateur'], [], sk('startCombat', 'buffPerType', 1, 0)),
  S('Cartographe', 3, 3, 5, ['Félin', 'Explorateur'], ['ranged'], sk('startCombat', 'buffPerType', 1, 0)),
  S('Chasseur de reliques', 4, 4, 6, ['Alien', 'Explorateur'], ['ranged'], sk('startCombat', 'buffPerType', 1, 1)),
  S('Grand explorateur', 5, 6, 7, ['Elk', 'Explorateur'], ['ranged'], sk('startCombat', 'buffPerType', 1, 1)),
  // Artilleur : À distance, dégâts directs
  S('Tireur', 1, 3, 2, ['Alien', 'Artilleur'], ['ranged']),
  S('Canonnier', 2, 3, 3, ['Elk', 'Artilleur'], ['ranged']),
  S('Tireur d\'élite', 3, 4, 4, ['Alien', 'Artilleur'], ['ranged'], sk('startCombat', 'buffSelf', 1, 0)),
  S('Maître-artilleur', 4, 5, 5, ['Dwork', 'Artilleur'], ['ranged'], sk('startCombat', 'dmgRandomEnemy', 0, 0, 3)),
  S('Bombardier', 5, 7, 7, ['Alien', 'Artilleur'], ['ranged'], sk('startCombat', 'dmgRandomEnemy', 0, 0, 4)),
  // Renseignement : affaiblir l'adversaire
  S('Agent', 1, 2, 2, ['Dwork', 'Renseignement'], [], sk('startCombat', 'debuffRandomEnemy', 0, 0, 1)),
  S('Intrus réseau', 2, 2, 3, ['Alien', 'Renseignement'], [], sk('startCombat', 'debuffRandomEnemy', 0, 0, 2)),
  S('Saboteur', 3, 3, 4, ['Droïde', 'Renseignement'], [], sk('startCombat', 'debuffRandomEnemy', 0, 0, 3)),
  S('Maître espion', 4, 4, 6, ['Alien', 'Renseignement'], [], sk('startCombat', 'debuffRandomEnemy', 0, 0, 4)),
  S('Spectre', 5, 6, 6, ['Félin', 'Renseignement'], [], sk('startCombat', 'debuffRandomEnemy', 0, 0, 5)),
  // Roboticien : invoquer des sondes
  S('Opérateur de sonde', 1, 1, 2, ['Alien', 'Roboticien'], [], sk('startCombat', 'summon', 1, 1)),
  S('Opérateur d\'essaim', 2, 2, 3, ['Félin', 'Roboticien'], [], sk('startCombat', 'summon', 1, 1)),
  S('Chef d\'atelier', 3, 2, 5, ['Alien', 'Roboticien'], [], sk('startCombat', 'summon', 2, 2)),
  S('Maître des sondes', 4, 3, 6, ['Elk', 'Roboticien'], [], sk('startCombat', 'summon', 3, 3)),
  S('Architecte d\'essaim', 5, 4, 8, ['Alien', 'Roboticien'], [], sk('startCombat', 'summon', 4, 4)),
  // Xénobiologiste : Poison, Renaissance, effets de mort
  S('Assistant de labo', 1, 2, 2, ['Elk', 'Xénobiologiste'], [], sk('deathrattle', 'buffRandomAlly', 1, 1)),
  S('Spécialiste des organismes', 2, 1, 3, ['Alien', 'Xénobiologiste'], ['poison']),
  S('Symbiote', 3, 3, 5, ['Dwork', 'Xénobiologiste'], ['rebirth']),
  S('Généticien', 4, 4, 6, ['Alien', 'Xénobiologiste'], ['poison'], sk('deathrattle', 'buffAllies', 1, 1)),
  S('Maître des mutations', 5, 6, 8, ['Droïde', 'Xénobiologiste'], ['poison', 'rebirth'], sk('startCombat', 'dmgRandomEnemy', 0, 0, 3)),
  // Diplomate : bonus aux alliés adjacents
  S('Attaché de liaison', 1, 1, 4, ['Alien', 'Diplomate'], [], sk('startCombat', 'buffAdjacent', 1, 0)),
  S('Officier de liaison', 2, 1, 5, ['Droïde', 'Diplomate'], [], sk('startCombat', 'buffAdjacent', 1, 1)),
  S('Négociateur', 3, 2, 6, ['Alien', 'Diplomate'], [], sk('startCombat', 'buffAdjacent', 2, 1)),
  S('Ambassadeur', 4, 3, 7, ['Félin', 'Diplomate'], [], sk('startCombat', 'buffAdjacent', 2, 2)),
  S('Grand diplomate', 5, 4, 9, ['Alien', 'Diplomate'], [], sk('startCombat', 'buffAdjacent', 3, 3)),
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
// mod : modificateur d'invocation { probeA, probeH, text } (bonus donné aux sondes invoquées par le porteur).
const E = (name, rank, atk, hp, kw = null, type = null, skill = null, mod = null) => ({ name, rank, atk, hp, kw, type, skill, mod });
const EQUIPS = [
  E('Plaque d\'acier', 1, 0, 2), E('Lame vibrante', 1, 2, 0), E('Module d\'attaque', 1, 1, 1),
  E('Balise de combat', 2, 0, 2, 'prov', 'Sécurité'), E('Bouclier à champ', 2, 0, 1, 'shield', 'Ingénieur'),
  E('Cartouches perforantes', 2, 2, 1, null, 'Artilleur'), E('Blindage', 2, 1, 3),
  E('Châssis de sonde', 2, 1, 2, null, 'Roboticien'),
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
  E('Balise de commandement', 4, 0, 2, null, 'Pilote', sk('startCombat', 'buffAllies', 1, 1)),
  E('Chargeur de sondes', 3, 0, 1, null, 'Roboticien', null, { probeA: 1, probeH: 1, text: 'Sondes invoquées : +1/+1' })
];

// Chaque héros a deux types : ici une espèce et un archétype (rien ne l'impose).
const HEROES = {
  vex:   { id: 'vex', name: 'Capitaine Vex', types: ['Elk', 'Pilote'], hp: 30, kw: 'prov',
           power: sk('startCombat', 'buffLeftmost', 2, 0) },
  brokk: { id: 'brokk', name: 'Brokk', types: ['Dwork', 'Ingénieur'], hp: 34, kw: null,
           power: sk('endRenfort', 'buffRandomAlly', 1, 1) },
  z9:    { id: 'z9', name: 'Z-9', types: ['Droïde', 'Roboticien'], hp: 26, kw: 'shield',
           power: sk('startRenfort', 'buffRandomAlly', 1, 0) },
  reyes: { id: 'reyes', name: 'Amirale Reyes', types: ['Alien', 'Diplomate'], hp: 32, kw: null,
           power: sk('startCombat', 'buffAllies', 1, 0) },
  ilya:  { id: 'ilya', name: 'Dr Ilya', types: ['Félin', 'Xénobiologiste'], hp: 28, kw: 'shield',
           power: sk('startCombat', 'dmgRandomEnemy', 0, 0, 2) }
};

const DUNGEONS = {
  nid: { id: 'nid', name: 'Le Nid de la Reine', type: 'Xénobiologiste', boss: { name: 'La Reine-Mère', hp: 250, power: 'regen',
         desc: 'Régénération : après chaque attaque, ses serviteurs récupèrent 2 PV (jusqu\'à leur maximum).' } },
  omega: { id: 'omega', name: 'Station Oméga', type: 'Droïde', boss: { name: 'Intelligence Oméga', hp: 200, power: 'surge',
         desc: 'Surcharge : au début de chaque combat, ses serviteurs gagnent +1/+1 par tranche de trois salles déjà franchies.' } },
  cite: { id: 'cite', name: 'La Cité des Profondeurs', type: 'Renseignement', boss: { name: 'L\'Oracle Souterrain', hp: 220, power: 'frenzy',
         desc: 'Écho : chaque fois qu\'un de ses serviteurs attaque, il gagne +1 ATQ jusqu\'à la fin du combat.' } },
  forge: { id: 'forge', name: 'La Forge de Brasier-Roc', type: 'Artilleur', boss: { name: 'Maître-Forgeron Grumm', hp: 220, power: 'plate',
         desc: 'Blindage : au début de chaque combat, ses serviteurs gagnent +0/+3 PV.' } }
};
