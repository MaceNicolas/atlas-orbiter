# Nouvelles idées

## Contexte

- Jeu de **gestion de guilde** dans un univers de **space opera**.
- Boucle principale : une forme d'**exploration de donjon** avec des héros, assez proche du champ de bataille de Hearthstone.

## Pistes (pas forcément conservées)

- **Boucle à 5 éléments**, comme décrit dans `OLD_IDEAS.md`.
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

- **Les éléments pilotent la taverne** : les deux héros choisis, et leur maîtrise de chaque élément, pondèrent les cartes proposées à la taverne. La progression oriente les builds possibles sans augmenter les stats. Idée déjà imaginée par moi.
- **Progression en largeur** : un héros qui progresse débloque de nouvelles options (sorts, variantes de pouvoir, cartes ajoutées au pool) au lieu de stats plus fortes. On équipe un nombre limité de ces options avant le donjon.
- **Bibelots** : comme dans le champ de bataille de Hearthstone, chaque héros pourrait avoir, en plus de son pouvoir, un bibelot qui change la façon de jouer d'une partie à l'autre.

## Éléments et dominance en combat (à tester)

Sans dominance, les éléments n'auraient plus de raison d'être et il faudrait définir autrement les types de serviteurs (familles sans rapport avec les éléments, comme dans Battlegrounds). On teste donc la dominance d'abord.

- **Roue à 5 éléments** : chaque élément en bat un, perd contre un autre, et est neutre face aux deux derniers. L'avantage espéré face à un ennemi aléatoire est nul.
- **Dominance par attaque** : on compare l'élément de l'attaquant et celui de sa cible, serviteur contre serviteur. Les vagues ennemies sont mixtes, donc aucun élément ne contre tout.
- **Bonus modéré** : par exemple +25 % de dégâts avec l'avantage, −25 % avec le désavantage. Il oriente le combat sans le décider seul.
- **Tension synergie / dominance** : les cartes du même élément se renforcent entre elles (pousse vers le mono-élément), la dominance expose le mono-élément (pousse vers le mixte). Le dilemme spécialiser ou diversifier est l'intérêt du système.
- **Information lisible** : l'élément ou la composition du prochain combat est annoncé avant la taverne, pour que le joueur s'adapte par choix et non par hasard.
- **Points à surveiller** : builds mono trop forts ou trop faibles, ennemis trop prévisibles. Réglables via le pourcentage et la composition des vagues.

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

- **Provocation** : les ennemis doivent attaquer ce serviteur en premier. Les éléments ne priment jamais sur la provocation : la dominance ne fait que modifier les dégâts, elle ne change pas la cible.
- **Bouclier divin** : annule la première source de dégâts reçue. Il est toujours pleinement efficace, même face à un attaquant qui a l'avantage élémentaire.
- **Venimeux / Poison** : détruit tout serviteur qu'il blesse. À affiner : le venin s'applique-t-il toujours, ou seulement si les dégâts infligés sont supérieurs à 0 (cas d'un fort désavantage élémentaire) ?
- **Renaissance** (réincarnation) : le serviteur revient une fois avec 1 point de vie après sa mort. À affiner avec les autres mots-clés.

## Problématique actuelle

Je ne vois pas du tout comment gérer la **progression façon RPG des héros**, et plus précisément comment **intégrer cette mécanique de progression dans un jeu qui ressemble à Hearthstone**.
