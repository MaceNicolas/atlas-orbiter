# Nouvelles idées

Légende : une mention **(à valider)** marque une déduction de rédaction non confirmée explicitement. Une mention **(ouvert)** marque un point volontairement non tranché.

## 1. Contexte

- Jeu de **gestion de guilde** dans un univers de **space opera**.
- Boucle principale : l'**exploration de donjon** avec deux héros. Les héros sont des membres de la guilde, ce sont eux que le joueur fait progresser.
- Contrainte de design : on doit pouvoir enchaîner des **centaines de parties** sans que le fond du jeu soit totalement modifié. Les choix faits pendant une partie ne servent donc pas de progression durable : ils restent propres à cette partie.

## 2. Vocabulaire

- **Partie** : une exploration de donjon, du premier combat à la victoire ou à la défaite.
- **Héros** : membre de la guilde, au nombre de deux par partie. Commandant hors plateau, il ne combat pas.
- **Boss** : l'adversaire unique d'un donjon. Il représente le donjon.
- **Serviteur** : élément posé sur le plateau, qui combat. Les serviteurs du joueur représentent les héros, ceux du Boss représentent le donjon.
- **Plateau** : zone où les serviteurs de deux camps se font face, alignés de gauche à droite. Il n'y a pas de lignes. Il contient au maximum **7 serviteurs par camp**.
- **Camp** : ensemble des serviteurs d'un même côté du plateau.
- **Salle** : une étape du donjon, qui correspond à un combat contre les serviteurs du Boss.
- **Renfort** : phase entre deux combats où le joueur fait deux choix : un serviteur et un équipement.
- **Équipement** : bonus qu'on équipe sur un serviteur du plateau. Il est lié aux types (section 11).
- **PV** : points de vie.
- **Rang d'un serviteur** : valeur numérique qui sert aux dégâts de fin de combat (voir section 6).
- **Rang d'un héros** : niveau de progression permanent du héros, environ 5 rangs (voir section 10). Ce n'est pas le même rang que celui d'un serviteur.

## 3. Déroulement d'une partie

1. Le joueur choisit **deux héros** de la guilde et un **donjon**.
2. Chaque héros apporte son **serviteur de départ** : le joueur commence avec **deux serviteurs** sur son plateau.
3. Le donjon est une suite de **salles**. Les premières sont **petites** : deux ou trois serviteurs ennemis.
4. Dans chaque salle, un **combat** oppose le plateau du joueur au plateau du Boss.
5. Après chaque combat, un **renfort** : sans monnaie, le joueur fait **deux choix** :
   - **un serviteur** parmi plusieurs ;
   - **un équipement** parmi plusieurs, à équiper sur un serviteur du plateau.
6. La partie se termine :
   - **victoire** : les PV du Boss tombent à 0 ;
   - **défaite** : les PV des deux héros sont à 0.

- Les serviteurs ennemis peuvent être **différents à chaque salle** : il n'y a pas de retour des serviteurs ennemis morts, chaque salle a sa propre composition.
- **Entre deux combats** : les serviteurs du joueur morts reviennent pour le combat suivant, et les PV du Boss ne se soignent pas.

À préciser (ouvert) : montée en taille des salles, longueur d'un donjon, nombre de serviteurs et d'équipements proposés en renfort, et le nombre exact de serviteurs ennemis par salle.

## 4. Serviteurs

- Un serviteur a : une **attaque**, des **PV**, un **rang**, des **mots-clés** et un ou deux **types** (section 11).
- Le rang d'un serviteur vaut les **dégâts** qu'il inflige à la fin d'un combat gagné par son camp (section 6). Exemple : rang 4 = 4 dégâts, rang 2 = 2 dégâts.
- Un serviteur a une ou plusieurs **compétences**. Chaque compétence est soit **de combat** (active pendant un combat), soit **de renfort** (active pendant la phase de renfort), **jamais les deux**.
- Un serviteur peut porter des **équipements** (section 8). Ouvert : nombre d'équipements par serviteur, et ce qu'ils deviennent si le serviteur meurt ou est remplacé.
- Le plateau est plein à 7 : en renfort, le joueur peut **remplacer** un de ses serviteurs par le nouveau, **sans coût**.
- Certains donjons pourraient avoir d'autres contraintes de plateau (ouvert).

## 5. Héros et Boss

### Héros

- Chaque héros a des **PV propres**, un ou plusieurs **pouvoirs**, **deux types** différents et un **serviteur de départ**.
- Il ne participe pas au combat, il reste hors plateau. Il ne subit des dégâts qu'en fin de combat perdu (section 6).
- **Configuration** : un héros est configuré avec **3 éléments**, choisis parmi :
  - des **mots-clés de héros** (par exemple Provocation, Bouclier divin) ;
  - un **pouvoir spécifique** (ou une variante de pouvoir) ;
  - des **points de vie** (variantes) ;
  - un **pouvoir de renfort** ;
  - un **bibelot** (section 10) ;
  - son **serviteur de départ**.
  - Un élément obligatoire n'est pas certain ; la version **libre** est favorisée pour le moment (ouvert).
- **Pouvoirs de héros** : ils peuvent agir pendant le combat, au début ou à la fin du combat, ou au début ou à la fin du renfort.
- Si un héros meurt (PV à 0), l'autre **continue le donjon seul**, **sans** bénéficier des pouvoirs du héros mort. Les effets d'une mort sur la difficulté ou les récompenses sont ouverts.

### Boss

- Un **seul Boss par donjon**. Il a des **PV** (les PV du donjon) et des **pouvoirs** qui affectent le donjon.
- Le Boss n'est pas sur le plateau : ses serviteurs le représentent dans chaque salle.
- Pouvoirs variés, passifs ou sorts. Exemples : empêcher d'infliger moins de 5 points de dégâts ; soigner les serviteurs de 2 points après chaque attaque.
- Comme ceux des héros, ses pouvoirs peuvent agir pendant le combat, au début ou à la fin du combat, au début ou à la fin du renfort.

## 6. Combat

### Principes

- Le combat est **automatique** : le joueur ne fait aucune action pendant qu'il se déroule.
- **Pas de limite de tours** : les deux camps doivent s'éliminer. Aucune mécanique ne doit pouvoir aboutir à un combat impossible à gagner ou sans fin.
- **Riposte systématique** : un serviteur attaqué qui survit inflige ses propres dégâts à l'attaquant. Seule exception : le mot-clé **À distance**.

### Déroulement

1. **Début de combat** : les effets « Début de combat » se déclenchent, d'abord ceux du joueur, puis ceux du Boss.
2. **Premier camp** : celui qui a **le plus de serviteurs** commence. En cas d'égalité, le **joueur** commence.
3. **Alternance** : les camps attaquent à tour de rôle, un serviteur par attaque.
   - Dans un camp, les serviteurs attaquent **de gauche à droite**, puis on reprend à gauche après le dernier.
   - Quand un serviteur meurt, le suivant dans l'ordre attaque à sa place : le tour du camp n'est pas sauté.
4. **Cible** : tirée **au hasard** parmi les serviteurs adverses ; s'il y en a avec **Provocation**, uniquement parmi ceux-là. Ce choix de ciblage est **ouvert** : d'autres règles pourront être étudiées plus tard, le hasard est la règle par défaut.
5. **Résolution d'une attaque** :
   1. l'attaquant inflige des dégâts égaux à son attaque à la cible ;
   2. **en même temps**, la cible riposte avec sa propre attaque, sauf si l'attaquant a **À distance**. Deux serviteurs peuvent donc se tuer mutuellement ;
   3. Bouclier divin et Poison s'appliquent à chacun des deux échanges de dégâts. Un Bouclier divin est donc aussi perdu en recevant une riposte ;
   4. les morts sont constatées, puis les Râles d'agonie se déclenchent, celui de l'attaquant d'abord, puis celui de la cible.
6. **Renaissance** : un serviteur qui renaît revient toujours **le plus à droite possible** de son camp. Il attaque après tous les serviteurs déjà présents.
   - **Plateau plein** : si un effet (Râle d'agonie, Renaissance) doit ajouter un serviteur alors que son camp en compte déjà 7, le serviteur n'apparaît pas.
7. **Fin** : dès qu'un camp est vide, le combat est terminé.
   - Les serviteurs survivants de l'autre camp infligent des **dégâts de fin de combat**.
   - Les effets « Fin de combat » se déclenchent.
   - Si les deux camps sont vides au même moment : **égalité**, aucun dégât.

### Dégâts de fin de combat

- **Le joueur gagne** : la somme des rangs de ses survivants est retirée aux PV du **Boss**.
- **Le joueur perd** : chaque serviteur survivant du Boss inflige à un héros des dégâts égaux à son rang, **un serviteur après l'autre**.
  - Si **un seul héros** a Provocation (et est vivant), tous les coups le visent.
  - Si **aucun** ou **les deux** héros ont Provocation, le Boss choisit la cible de chaque coup.
  - **Bouclier divin** d'un héros : annule le **premier coup reçu** (le coup d'un serviteur entier), puis disparaît.
  - Un héros à 0 PV ne peut plus être ciblé.

### Usure (nom provisoire)

- Si un combat s'éternise, **avant chaque attaque d'un serviteur**, des dégâts de **plus en plus importants** sont infligés à **tous les serviteurs** présents sur le plateau, des deux camps (les héros ne sont pas touchés). Cela garantit la fin du combat.
- Ouvert : seuil de déclenchement, progression des dégâts, interaction avec soins, Renaissance et Bouclier divin.

## 7. Mots-clés

### Mots-clés de combat

- **Provocation** : tant qu'au moins un serviteur adverse l'a, les attaques adverses ne peuvent viser que les serviteurs avec Provocation.
- **Bouclier divin** : annule la **première source de dégâts** reçue, puis disparaît.
- **Poison** : détruit tout serviteur auquel il **inflige réellement des dégâts**. Si les dégâts sont nuls (attaque à 0) ou absorbés par un Bouclier divin, le Poison ne s'applique pas.
- **Renaissance** : après sa première mort, le serviteur revient **une fois** avec **1 PV**. À affiner avec les autres mots-clés.
- **À distance** : l'attaquant ne subit **pas de riposte**.

### Déclencheurs

- **Cri de guerre** : quand le serviteur est ajouté au plateau, en renfort, au choix du joueur.
- **Râle d'agonie** : quand le serviteur meurt.
- **Début de combat** : au début du combat.
- **Fin de combat** : à la fin du combat.
- **Début de renfort** : à l'ouverture du renfort.
- **Fin de renfort** : à la fermeture du renfort.
- **Vengeance X** : déclenché après la mort de X alliés (ouvert : compteur cumulé sur le combat ou à chaque série de X morts).
- **Magnétisme** : le serviteur fusionne avec un allié d'un certain type (ouvert : moment, permanence et résultat de la fusion).

Les quatre déclencheurs de début et de fin sont gardés pour le moment, même si leurs nuances sont à préciser.

### Mots-clés à coût

- **Activation (X)** : le serviteur n'effectue son action que si le joueur **paie X**. X n'est pas de la monnaie classique (ressource à définir).
- **Vampirisme (X)** : même principe, mais X est payé en **PV**.
- D'autres variantes sont possibles, avec une autre ressource de coût.
- Ces mots-clés ne fonctionnent que pendant le **renfort**, jamais pendant le combat.
- Ouvert : le joueur choisit-il d'activer, ou est-ce automatique ? Les noms sont provisoires.

## 8. Renfort

- Après chaque combat, **un renfort**, sans monnaie. À chaque renfort, le joueur fait **deux choix** :
  1. **un serviteur** parmi plusieurs ;
  2. **un équipement** parmi plusieurs, à équiper sur un serviteur du plateau.
- Les serviteurs et les équipements proposés sont tirés d'un **pool** lié aux **5 types** de la partie (section 11).
- Un serviteur proposé a ses compétences déjà définies, de combat ou de renfort (section 4). Intérêt visé : des dilemmes (garder un serviteur avec sa compétence de combat, ou en prendre un avec une compétence de renfort).
- Si le plateau est plein, le joueur peut remplacer un serviteur sans coût.
- Une **recette d'artisanat** (section 10) lie des éléments du renfort ; son fonctionnement est à préciser.
- Ouvert : le nombre de serviteurs et d'équipements proposés, la nature des équipements et leur lien avec les types.

## 9. Information avant les donjons et les combats

- **Salle du vaisseau** : elle donne des informations sur les donjons à explorer. L'améliorer donne plus d'informations (par exemple le type apporté par le donjon, la composition des salles).
- Certains **pouvoirs de renfort** ou **héros** pourraient donner des informations sur les prochains combats.
- Ouvert : quelles informations exactement, et à quels niveaux de la salle ou de quels pouvoirs.

## 10. Progression des héros

Principe commun : la progression augmente la **variété** et le **choix**, avec une **petite montée en puissance** assumée et modérée, pour permettre d'affronter des donjons auparavant inaccessibles.

- **Montée de niveau** : à chaque niveau, le joueur choisit **un élément parmi plusieurs propositions aléatoires**. Pas d'arbre de talents prédéfini.
  - **Une catégorie par tirage** : toutes les propositions d'un même tirage sont de la même catégorie (variantes de pouvoir, bibelots, recettes d'artisanat, etc.).
  - **3 relances** par tirage. Des passifs pourraient donner plus de choix.
  - **Plafond de niveau** : oui, égal au dernier rang.
  - Reporté : les poids du tirage, et la possibilité de refaire un choix déjà effectué.
- **Rangs de héros** : environ 5. Le rang 1 est acquis d'office. Le rang 2 demande quatre ou cinq niveaux, puis un peu plus à chaque rang suivant. Ouvert : ce que change concrètement un rang et le nombre total de niveaux.
- **Progression en largeur** : un héros débloque de nouvelles options (sorts, variantes de pouvoir, serviteurs ajoutés au pool) plutôt que des statistiques plus fortes. Le nombre d'options équipées avant le donjon est limité (voir les 3 éléments, section 5).
- **Bibelots** : en plus de son pouvoir, un héros peut avoir un bibelot qui change la façon de jouer d'une partie à l'autre.
  - **Force pilotée par l'énergie** : l'usage d'un bibelot demande une énergie acquise à chaque **niveau au cours de la partie** (pas de niveau permanent). Elle repart de zéro à chaque partie, donc les bibelots les plus forts n'arrivent que tard.
  - Ouvert : l'énergie est-elle un plafond de budget (somme des coûts des bibelots équipés) ou une ressource consommée ? Un bibelot fort tardif doit rester intéressant face à un bibelot faible pris tôt.
- **Donjons procéduraux** : la difficulté proposée s'adapte au rang des héros emmenés. Exemple : des héros de rang 1 et 2 peuvent accéder à des donjons de difficulté 3. Ouvert : quel rang compte (moyenne, plus haut, plus bas).
- **Objectif** : l'attachement aux héros par leur construction.

## 11. Types

- Il n'y a **pas de dominance** entre types. Une autre source de tension reste à trouver (ennemis qui punissent une composition, capacités qui se contrent).
- Une **seule famille de types**, sans distinction de règle entre espèce et archétype. Deux natures sont gardées en tête pour créer le contenu :
  - nature **espèce** (ce qu'est le serviteur) ;
  - nature **archétype** (comment il se joue).
  Un héros aurait volontiers un type de chaque nature, mais rien ne l'impose.
- Chaque **héros** a **deux types** différents.
- Chaque **serviteur** a **un ou deux types**. Un serviteur peut avoir un type absent chez les héros (« invité ») : il apparaît alors par son autre type.
- Deux héros apportent jusqu'à 4 types, et chaque **donjon** apporte **un type** : **5 types** pour une partie.
- Le pool de serviteurs et d'équipements du renfort est lié à ces 5 types.
- Chaque type a une **thématique** : certains mots-clés sont plus présents dans certains types.
- Ouvert : la liste des types, et le cas où les deux héros partagent un type (moins de 5 types).
