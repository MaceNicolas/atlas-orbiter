# Nouvelles idées

## Contexte

- Jeu de **gestion de guilde** dans un univers de **space opera**.
- Boucle principale : une forme d'**exploration de donjon** avec des héros, assez proche du champ de bataille de Hearthstone.

## Pistes (pas forcément conservées)

- Dans l'exploration de donjon, au lieu du héros unique de Hearthstone, le joueur s'appuie sur **deux héros** tirés du pool de héros membres de la guilde.
- Ce sont ces héros que l'on fait progresser.

## Boucle principale

- Pas d'aubergiste. À la place, après chaque combat, une **phase de taverne** inspirée de Hearthstone.
- Pas de monnaie : le joueur choisit parmi **X cartes** proposées.
- À chaque phase, il ne peut faire **qu'un seul choix**.

## Contrainte de design

- Comme dans Hearthstone, on doit pouvoir enchaîner des **centaines de parties** sans que le fond du jeu soit totalement modifié.
- Les choix de la phase de taverne ne servent donc pas de progression durable : ils restent propres à une partie.

## Pistes retenues pour la progression des héros

Principe commun : la progression augmente la **variété** et le **choix**, pas la puissance brute.

- **Les types pilotent la taverne** : les deux héros choisis, et leurs types, pondèrent les cartes proposées à la taverne. La progression oriente les builds possibles sans augmenter les stats. Idée déjà imaginée par moi (à l'origine avec les éléments, abandonnés).
- **Progression en largeur** : un héros qui progresse débloque de nouvelles options (sorts, variantes de pouvoir, cartes ajoutées au pool) au lieu de stats plus fortes. On équipe un nombre limité de ces options avant le donjon.
- **Bibelots** : comme dans le champ de bataille de Hearthstone, chaque héros pourrait avoir, en plus de son pouvoir, un bibelot qui change la façon de jouer d'une partie à l'autre.
  - **Force pilotée par l'énergie** : l'usage d'un bibelot requiert une forme d'énergie acquise à chaque **niveau au cours de la partie** (pas de niveau permanent du héros). L'énergie repart de zéro à chaque partie, et les bibelots les plus forts n'arrivent donc que tard.
  - Aucun lien spécifique avec l'Activation pour le moment (l'Activation de Hearthstone coûte de l'or, qui n'existe pas ici).
  - À préciser : l'énergie est-elle un plafond de budget (somme des coûts des bibelots équipés) ou une ressource consommée ? Un bibelot fort tardif doit rester intéressant face à un bibelot faible pris tôt.

## Montée de niveau des héros (direction retenue)

- À chaque niveau, le joueur fait un **choix parmi plusieurs propositions aléatoires**. Pas d'arbre de talents prédéfini : ce sont des éléments de personnalisation.
- **Une catégorie par choix** : toutes les propositions d'un même tirage sont de la même catégorie, par exemple variantes de pouvoir, bibelots ou recettes d'artisanat.
- **Artisanat lié à la taverne** : une liste de recettes d'artisanat fait partie des choses que le héros peut choisir.
- **3 relances** par tirage. Des passifs pourraient permettre d'avoir plus de choix.
- **Petite montée en puissance assumée** : pour que ce soit satisfaisant et permette d'affronter des donjons inaccessibles auparavant. Cela nuance le principe « variété plutôt que puissance brute » (à garder modérée).
- **Rangs** : les héros ont environ 5 rangs. Le rang 1 est acquis d'office. Atteindre le rang 2 demande quatre ou cinq niveaux, puis un peu plus à chaque rang suivant. Le plafond de niveau correspond au dernier rang.
- **Donjons procéduraux** : la difficulté proposée s'adapte au rang des héros emmenés. Par exemple, des héros de rang 1 et 2 peuvent accéder à des donjons de difficulté 3, alors que deux héros de rang 3 se voient proposer des donjons à la difficulté adaptée. Des donjons procéduraux (pas entièrement fixes) permettent cette adaptation.
- À préciser, volontairement laissé ouvert : ce que change concrètement un rang, quel rang compte pour la difficulté du donjon (moyenne, plus haut, plus bas) et le nombre total de niveaux.
- **Plafond de niveau** : oui.
- **Objectif** : un attachement aux héros par leur construction.
- Reporté à plus tard : les poids du tirage, et la possibilité de recommencer (reroll) un mauvais choix déjà fait.

## Types (remplacent les éléments)

- Univers space opera : les **éléments sont abandonnés** (roue de dominance, bonus ±25 %, maîtrise élémentaire).
- Une **seule famille de types**, qui remplace à la fois les éléments et la distinction espèce / archétype envisagée un moment. Les types ne sont pas séparés en deux familles dans la règle.
- **Deux natures de types, à garder en tête** (sans différence de règle) :
  - des types de nature **espèce** (ce qu'est la carte) ;
  - des types de nature **archétype** (comment elle se joue).
  Cela sert à garder l'idée de départ pour la création du contenu : un héros aurait volontiers un type de chaque nature, mais rien ne l'impose.
- Chaque **héros a deux types** différents.
- Chaque **carte a un ou deux types**. Une carte peut avoir un type absent chez les héros (« invitée »), qui arrive alors par son autre type.
- Avec **deux héros par donjon**, on obtient jusqu'à 4 types. Chaque **donjon** ajoute un type spécifique. Cela fait **5 types par taverne**, comme les 5 types de serviteurs d'une partie de Battlegrounds.
- Le pool de cartes proposées à la taverne est lié à ces 5 types : le choix des héros et le donjon orientent donc les builds possibles.
- **Thématique** : chaque type a une thématique. Certaines mécaniques (mots-clés) sont beaucoup plus présentes dans certains types, ce qui leur donne une identité.
- Pas de dominance entre types pour le moment. Une autre source de tension reste à trouver (ennemis qui punissent une composition, capacités qui se contrent), à voir plus tard.
- À préciser :
  - la liste des types ;
  - le cas où les deux héros partagent un type (moins de 5 types) : volontairement laissé ouvert pour le moment ;
  - le détail de l'information sur les donjons et sur les prochains combats (voir ci-dessous).

### Information avant les donjons et les combats

- **Salle du vaisseau** : une salle permet d'obtenir des informations sur les donjons à explorer. L'améliorer donne plus d'informations (par exemple le type apporté par le donjon, la composition des vagues).
- **Pouvoirs de taverne et héros** : certains pouvoirs de taverne, ou certains héros, pourraient donner des informations sur les prochains combats.
- À préciser : quelles informations exactement, et à quels niveaux de la salle ou de quels pouvoirs.

## Mots-clés (point en cours)

### Déclencheurs retenus pour le moment

- **Cri de guerre** : quand la carte est jouée.
- **Râle d'agonie** : quand le serviteur meurt.
- **Début de combat** : au lancement du combat.
- **Fin de combat** : à la fin du combat.
- **Début de taverne** : à l'ouverture de la phase de taverne.
- **Fin de taverne** : à la fermeture de la phase de taverne.
- **Vengeance X** : après la mort de X alliés.
- **Magnétisme** : fusion avec un allié d'un certain type.

Les quatre déclencheurs de début et de fin (combat, taverne) sont gardés pour le moment, même si leurs nuances sont à préciser.

### Choix en deux temps pendant la taverne (direction retenue)

- **Premier temps** : choisir une unité parmi plusieurs. Chacune a une compétence de combat déjà définie.
- **Second temps** : choisir la compétence de taverne à lui associer.
- Intérêt visé : des dilemmes du genre « garder cette unité avec ce pouvoir actif alors qu'elle n'a que ce pouvoir de taverne, ou l'inverse ».
- À préciser : quelles compétences de taverne sont proposées au second temps, et si l'association est définitive.

### Mots-clés à coût (famille « Activation »)

- **Activation (X)** : il faut payer X pour que le serviteur effectue son action. On ne précise pas ce que représente X, qui n'est pas de la monnaie classique.
- **Vampirisme (X)** : même principe, mais X est payé avec de la vie.
- Autres variantes possibles : un même schéma avec une ressource de coût différente à chaque fois.
- **Uniquement pendant la taverne** : l'activation (et le vampirisme) ne fonctionne que pendant la phase de taverne, pas pendant le combat.
- Les noms « Activation » et « Vampirisme » sont gardés pour le moment (« Vampirisme » désigne le vol de vie dans Hearthstone, ce qui peut prêter à confusion).
- À préciser : si c'est le joueur qui choisit d'activer, ou si c'est automatique.

### Mots-clés de combat

- **Provocation** : les ennemis doivent attaquer ce serviteur en premier.
- **Bouclier divin** : annule la première source de dégâts reçue.
- **Venimeux / Poison** : détruit tout serviteur qu'il blesse. À affiner : le venin s'applique-t-il toujours, ou seulement si les dégâts infligés sont supérieurs à 0 ?
- **Renaissance** (réincarnation) : le serviteur revient une fois avec 1 point de vie après sa mort. À affiner avec les autres mots-clés.

## Problématique actuelle

Je ne vois pas du tout comment gérer la **progression façon RPG des héros**, et plus précisément comment **intégrer cette mécanique de progression dans un jeu qui ressemble à Hearthstone**.
