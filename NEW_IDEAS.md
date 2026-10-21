# Nouvelles idées

Légende : une mention **(à valider)** marque une déduction de rédaction non confirmée explicitement. Une mention **(ouvert)** marque un point volontairement non tranché. Les idées écartées sont regroupées en section 13, avec la raison quand on la connaît.

## 1. Contexte

- Jeu de **gestion d'un équipage de vaisseau** dans un univers de **space opera**. Le joueur gère un équipage et son vaisseau plus qu'une guilde à proprement parler.
- Boucle principale : l'**exploration de donjon** avec deux héros. Les héros sont des membres de l'équipage, ses **lieutenants** : ce sont eux que le joueur fait progresser.
- Contrainte de design : on doit pouvoir enchaîner des **centaines de parties** sans que le fond du jeu soit totalement modifié. Les choix faits pendant une partie ne servent donc pas de progression durable : ils restent propres à cette partie.
- La **progression du vaisseau** est l'un des **deux grands axes de progression durable** du jeu, avec celle des héros (section 10). Elle permet d'affronter des **missions plus diversifiées et plus dangereuses** (section 12), sans changer le principe du jeu.

## 2. Vocabulaire

- **Partie** : une exploration de donjon, du premier combat à la victoire ou à la défaite.
- **Équipage** : l'ensemble des membres du vaisseau que gère le joueur.
- **Vaisseau** : le lieu et l'outil de gestion de l'équipage (section 12).
- **Héros** : lieutenant de l'équipage, au nombre de deux par partie. Commandant hors plateau, il ne combat pas.
- **Boss** : l'adversaire unique d'un donjon. Il représente le donjon.
- **Serviteur** : élément posé sur le plateau, qui combat. Les serviteurs du joueur représentent les héros, ceux du Boss représentent le donjon.
- **Plateau** : zone où les serviteurs de deux camps se font face, alignés de gauche à droite. Il n'y a pas de lignes. Il contient au maximum **7 serviteurs par camp**.
- **Camp** : ensemble des serviteurs d'un même côté du plateau.
- **Salle** : une étape du donjon, qui correspond à un combat contre les serviteurs du Boss.
- **Renfort** : phase qui précède chaque combat, y compris le premier, où le joueur fait deux choix : un serviteur et un équipement.
- **Équipement** : bonus cumulatif qu'on équipe sur un serviteur du plateau, avec un **rang** comme les serviteurs (section 8).
- **PV** : points de vie.
- **Rang d'un serviteur** : valeur numérique qui sert aux dégâts de fin de combat (voir section 6).
- **Rang d'un héros** : niveau de progression permanent du héros, environ 5 rangs (voir section 10). Ce n'est pas le même rang que celui d'un serviteur.

## 3. Déroulement d'une partie

1. Le joueur choisit **deux héros** de l'équipage et un **donjon**.
2. Chaque héros apporte son **serviteur de départ** : le joueur commence avec **deux serviteurs** sur son plateau.
3. Le donjon est une suite de **salles**. Les premières sont **petites** : deux ou trois serviteurs ennemis.
4. Chaque salle commence par un **renfort**, **y compris la première** : le donjon débute donc par un renfort. Le joueur fait **deux choix gratuits** (la monnaie sert à aller plus loin, section 8) :
   - **un serviteur** parmi plusieurs ;
   - **un équipement** parmi plusieurs, à équiper sur un serviteur du plateau.
5. Puis un **combat** oppose le plateau du joueur au plateau du Boss.
6. La partie se termine :
   - **victoire** : les PV du Boss tombent à 0 ;
   - **défaite** : les PV des deux héros sont à 0.

- Les serviteurs ennemis peuvent être **différents à chaque salle** : il n'y a pas de retour des serviteurs ennemis morts, chaque salle a sa propre composition.
- **Début de donjon** : commencer par un renfort donne au joueur un premier choix avant tout combat.
- **Entre deux combats** : les serviteurs du joueur morts reviennent pour le combat suivant, et les PV du Boss ne se soignent pas.

À préciser (ouvert) : montée en taille des salles, longueur d'un donjon, nombre de serviteurs et d'équipements proposés en renfort, et le nombre exact de serviteurs ennemis par salle.

## 4. Serviteurs

- Un serviteur a : une **attaque**, des **PV**, un **rang**, des **mots-clés** et un ou deux **types** (section 11).
- Le rang d'un serviteur vaut les **dégâts** qu'il inflige à la fin d'un combat gagné par son camp (section 6). Exemple : rang 4 = 4 dégâts, rang 2 = 2 dégâts.
- Un serviteur a une ou plusieurs **compétences**. Chaque compétence est soit **de combat** (active pendant un combat), soit **de renfort** (active pendant la phase de renfort), **jamais les deux**.
- Un serviteur peut porter des **équipements** (section 8). Si le serviteur est **remplacé** par un autre, ses équipements sont **perdus** : le joueur ne les récupère pas. Ouvert : nombre maximum d'équipements par serviteur.
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

### Quêtes de héros

- Un héros peut avoir une **quête** à accomplir pendant un donjon. Si elle est accomplie, elle débloque un **avantage**.
- Les quêtes sont pensées d'abord pour les **héros explorateurs** (archétype Explorateur, `documentation/types/archetypes.md`), mais elles peuvent être valables pour **d'autres héros**.
- Une quête pourrait être l'un des **éléments de configuration** du héros (voir ci-dessus) **(à valider)**.
- Les objectifs sont **simples** : des **compteurs** qui progressent **après chaque combat** (une « vague » correspond à une salle, section 2). Exemples de ce qu'on compterait : le nombre de serviteurs survivants, le nombre d'ennemis tués, le nombre de salles affrontées.
- Ouvert :
  - la valeur à atteindre et le palier qui débloque l'avantage (seuil unique ou plusieurs paliers) ;
  - le moment où la quête est annoncée, et si la progression est visible pendant la partie ;
  - la remise à zéro du compteur en cas de défaite d'un combat ;
  - la nature de l'avantage : effet **limité à la partie en cours**, ou récompense **durable** pour le héros. Le principe de la section 1 (les choix d'une partie ne servent pas de progression durable) pousse vers la première option **(à valider)** ;
  - le coût d'échec : la quête non accomplie ne doit rien retirer, pour ne pas devenir une obligation ;
  - le lien avec les quêtes personnelles du Mess (section 12) et avec l'attachement aux héros (section 10).

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

- Avant chaque combat, **un renfort**. À chaque renfort, le joueur fait **deux choix gratuits**, systématiquement (la monnaie, voir plus bas, sert à aller plus loin) :
  1. **un serviteur** parmi plusieurs ;
  2. **un équipement** parmi plusieurs, à équiper sur un serviteur du plateau.
- Les serviteurs et les équipements proposés sont tirés d'un **pool** lié aux **5 types** de la partie (section 11).
- Un serviteur proposé a ses compétences déjà définies, de combat ou de renfort (section 4). Intérêt visé : des dilemmes (garder un serviteur avec sa compétence de combat, ou en prendre un avec une compétence de renfort).
- Si le plateau est plein, le joueur peut remplacer un serviteur sans coût.
- Une **recette d'artisanat** (section 10) lie des éléments du renfort ; son fonctionnement est à préciser.
- **Équipements** :
  - Un équipement a un **rang**, qui reflète la **puissance de ses bonus** : un équipement de rang élevé est plus puissant.
  - Ce sont des **bonus cumulatifs** : plusieurs équipements s'additionnent sur un même serviteur.
  - Ils apportent surtout des **statistiques** et des **mots-clés supplémentaires**.
  - Si le serviteur meurt en combat, l'équipement **n'est pas perdu** : le serviteur revient au combat suivant (section 3) avec ses équipements.
  - Ils sont **liés aux types** par le pool (section 11), mais **dans la grande majorité des cas, ils ne sont pas limités à un type** : on peut les équiper sur n'importe quel serviteur.
- **Niveau de renfort** : le renfort a un **niveau**, qui commence à 1 au début de la partie. Il détermine le **rang** des **serviteurs** et des **équipements** proposés : plus le niveau est élevé, plus on peut obtenir des serviteurs et des équipements de rang élevé.
  - À chaque renfort, le joueur peut **ne pas prendre** le serviteur ou **ne pas prendre** l'équipement, pour faire monter son niveau de renfort à la place. Dans ce système, le coût d'une amélioration est le **nombre de choix auxquels on renonce**. Ouvert : ce système est à confirmer ou à remplacer par la monnaie (voir « Monnaie et relances »).
  - Chaque choix auquel on renonce (serviteur ou équipement, au choix du joueur) compte pour **une** amélioration.
  - **Coût** : plus le niveau est élevé, plus il faut renoncer de fois.
    - niveau 1 vers 2 : 2 renoncements ;
    - niveau 2 vers 3 : 3 renoncements ;
    - niveau 3 vers 4 : 4 renoncements, et ainsi de suite (niveau N vers N+1 : N+1 renoncements).
  - Les renoncements **s'accumulent** d'un renfort à l'autre.
  - **Rangs proposés** : le rang maximum des serviteurs et des équipements proposés est égal au **niveau de renfort**. Les rangs inférieurs restent possibles.
  - Le niveau de renfort et les renoncements accumulés sont **propres à la partie** : ils ne sont pas conservés ensuite.
  - Ouvert : le niveau maximum.
- Ouvert : le nombre de serviteurs et d'équipements proposés.
- **Fusion de trois serviteurs identiques (serviteur doré)**, reprise des Champs de bataille de Hearthstone :
  - Quand le joueur possède **trois serviteurs identiques**, sur le plateau ou dans sa **main** (concept dont on reparlera), ils **fusionnent automatiquement** en un **serviteur doré**.
  - Le serviteur doré reprend **toutes leurs statistiques**, et sa **compétence est plus puissante** que celle du serviteur de base.
  - Ensuite, le joueur choisit **un serviteur parmi trois**, d'un **niveau supérieur au niveau de renfort actuel** **(à valider : rang égal au niveau de renfort + 1)**. Cela dépasse le rang maximum normalement proposé (voir ci-dessous), ce qui fait de la fusion une récompense.
  - Ouvert :
    - le calcul des statistiques : somme des trois serviteurs, avec leurs bonus et équipements, ou statistiques de base multipliées ;
    - le sort des **équipements** des trois serviteurs (cumul, conservation, perte) ;
    - la nature exacte de la compétence « plus puissante » : valeurs doublées, ou effet différent, serviteur par serviteur ;
    - le moment du choix de la récompense : immédiat, ou au prochain renfort ;
    - ce qui compte comme « identique » (même serviteur, indépendamment des statistiques et équipements) ;
    - le nom du serviteur fusionné (« doré » est provisoire) ;
    - l'interaction avec le plateau plein : la fusion libère deux places, et le serviteur de remplacement est proposé comme un renfort ;
    - la distinction avec le mot-clé **Magnétisme** (section 7), qui parle aussi de fusion.
- **Monnaie et relances** : pour que les fusions restent possibles, une **monnaie unique** est retenue **pour le moment**. Constat : avec 3 propositions et un choix par renfort, les fusions sont rares, et d'autant plus que le rang monte (le pool s'élargit avec le niveau de renfort). Les fusions se feraient surtout sur les bas rangs, ce qui est jugé logique, la récompense du doré compensant. Le sort des **renoncements** pour monter de niveau est **à trancher** : la monnaie pourrait les remplacer.
  - **Une même monnaie** pour les serviteurs et pour les équipements (et non une par catégorie), pour garder des arbitrages entre relancer, acheter et monter de niveau. Elle pourrait être thématisée : crédits, butin, énergie du vaisseau.
  - **Deux choix gratuits à chaque renfort, systématiquement** : un serviteur et un équipement. La monnaie sert à **aller plus loin** : relancer, monter de niveau, et peut-être acheter un choix supplémentaire (ouvert).
  - **Relance d'une seule ligne, au choix du joueur** : dépenser de la monnaie relance soit les serviteurs, soit les équipements, jamais les deux à la fois. Le prix de base est le même.
  - **Prix** : le prix d'un serviteur ou d'un équipement suit son **rang**. Les **héros** peuvent modifier les prix (par type, par catégorie, ou sur la relance), de même que certains archétypes (Diplomate, Ingénieur, Explorateur, Renseignement : voir `documentation/types/archetypes.md`). Un **prix minimal de 1** évite les achats gratuits quand les réductions se cumulent.
  - **Relance ciblée sur un type** : par défaut, les propositions viennent au hasard des 5 types de la partie, sans frais. Une relance ciblée sur un type précis coûte **plus** qu'une relance normale (par exemple 2 contre 1), sans être une taxe systématique. Les héros peuvent réduire ce coût pour leurs propres types. Pour les équipements, un ciblage par catégorie ou par rang est préférable à un ciblage par type, car ils sont presque tous utilisables par n'importe quel serviteur.
  - Le prix du ciblage règle aussi la **fréquence des fusions** : cibler un type réduit beaucoup le nombre de serviteurs possibles.
  - **Seconde ressource, d'une autre nature** : l'énergie des bibelots (section 10) et le coût d'**Activation (X)** (section 7). Elle sert à activer et non à acheter. Définir la ressource d'Activation y serait lié.
  - **Main** : le joueur peut garder des serviteurs dans une **main**, ce qui permet de conserver des paires en attente avant une fusion. Idée jugée très bonne, concept à développer.
  - Ouvert : revenu (fixe par salle, croissant, ou lié au résultat du combat) ; coût de la relance et du niveau ; vente d'un serviteur ; taille de la main et son lien avec les 7 places du plateau ; possibilité d'acheter un choix supplémentaire ; nombre d'exemplaires par serviteur et taille du pool par rang ; nombre de propositions (3 à 5) ; fréquence de fusion visée ; sort des renoncements.
- **Drones** : concept **distinct des droïdes** (type, section 11). Un drone est un outil, pas un être autonome : il existe seulement comme **type d'équipement** ou comme **pouvoir spécifique**. Il peut aussi être utilisé par des ennemis dans certains donjons.
  - Ouvert : famille d'équipements, ou pouvoir (de héros, de serviteur) ; ce qu'un drone apporte concrètement.

## 9. Information avant les donjons et les combats

- **Salle du vaisseau** : elle donne des informations sur les donjons à explorer. L'améliorer donne plus d'informations (par exemple le type apporté par le donjon, la composition des salles).
- Certains **pouvoirs de renfort** ou **héros** pourraient donner des informations sur les prochains combats.
- Ouvert : quelles informations exactement, et à quels niveaux de la salle ou de quels pouvoirs.
- La salle du vaisseau fait partie de la gestion du vaisseau (section 12).

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

Détail dans `documentation/types/` : `types.md` (sommaire), `archetypes.md` et `especes/especes.md`.

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
- Les **espèces** sont des types, de nature « espèce » : **Elk** et **Dwork** (fiches dans `documentation/types/especes/`), et **Droïde**.
- Type possible : une espèce de **félins humanoïdes**, **sans nom pour le moment** (images dans `inspiration/cat/`). Fiche non rédigée.
- **Droïde** est un **type**. Les droïdes peuvent être des héros (lieutenants), de simples membres d'équipage ou des ennemis dans certains donjons. Un droïde est un être autonome, avec une identité, à ne pas confondre avec un **drone** (section 8).
- Ouvert : la liste des types, et le cas où les deux héros partagent un type (moins de 5 types).

## 12. Gestion du vaisseau et de l'équipage

Le joueur ne dirige pas une guilde mais l'**équipage d'un vaisseau**. Cette couche encadre la boucle de donjon et ajoute une dimension de **personnalisation des héros**.

### Équipage

- Les héros sont les **lieutenants** de l'équipage.
- Les **droïdes** (type, section 11) peuvent être lieutenants ou simples membres d'équipage, comme les autres types.
- À valider : un membre d'équipage a une **identité propre** (espèce, histoire), ce qui prolonge l'objectif d'**attachement** de la section 10 et se prête aux fiches d'espèces du dossier `documentation/types/especes/`.

### Le vaisseau

- Le vaisseau est le **lieu de gestion** entre deux parties. La **salle du vaisseau** (section 9) en est un premier élément.
- Ouvert : ce que le joueur gère exactement dans le vaisseau (équipage, recrutement, informations sur les donjons), et le lien avec la progression des héros (section 10).

### Modules (brainstorm)

- **Vocabulaire (ouvert)** : « salle » désigne déjà une étape de donjon (section 2). Pour les parties du vaisseau, « module » ou « pont » est à choisir. « Module » est utilisé ci-dessous à titre provisoire.
- **Principe (à valider)** : chaque module améliore un axe, et ses améliorations élargissent (options, accès, informations) plutôt que de gonfler les chiffres, comme pour les héros (section 10).

**Décidé**
- **Laboratoire** : présent obligatoirement, **rôle à définir**. Pistes : ajouter des serviteurs au pool, débloquer des types, étudier les Boss, choisir ce que le vaisseau étudie.
- **Simulateur** : un **bac à sable** où le joueur compose des plateaux avec les serviteurs et les pouvoirs de son choix, juste pour le plaisir. Il n'a **aucun rôle dans la progression**. À garder pour la fin.

**Pistes (à valider)**

| Module | Rôle envisagé |
|---|---|
| Salle des cartes (actuelle « salle du vaisseau », section 9) | Informations sur les donjons : type, puis composition des salles, puis le Boss. |
| Propulsion | Portée du vaisseau : donjons plus lointains, plus variés et plus dangereux. |
| Quartiers de l'équipage | Taille de l'équipage. |
| Atelier | Artisanat : recettes et pool d'équipements (sections 8 et 10). |
| Mess | Hub narratif : histoires et quêtes personnelles des membres d'équipage (idée d'auberge de `OLD_IDEAS.md`). |
| Infirmerie | Adoucir les conséquences de la mort d'un héros (section 5). |
| Soute / Armurerie | Nombre de bibelots stockables ou équipables avant un donjon. |
| Recrutement / Communications | Arrivée de nouveaux membres d'équipage. |

- Socle minimal envisagé : Salle des cartes, Propulsion, Quartiers de l'équipage, Atelier, Laboratoire.
- Ouvert :
  - qui porte la **montée de niveau** des héros, maintenant que le Simulateur n'a plus ce rôle ;
  - la **ressource** qui fait progresser le vaisseau (la monnaie, section 8) ;
  - les **prérequis** entre modules, et leurs niveaux ;
  - la limite entre puissance et variété.
- Le **vaisseau progresse de façon durable**, d'une partie à l'autre, comme les héros (section 10). Cette progression ne contredit pas la contrainte de la section 1 : ce qui reste exclu, ce sont les choix faits *pendant* une partie qui seraient conservés ensuite.
- Principe à garder : la progression du vaisseau **ne change pas le principe du jeu**. Elle élargit ou ajuste, sans transformer le fond d'une partie.
- Ouvert : ce qui progresse (modules, informations, capacité d'équipage, etc.), le rythme, et la part de puissance contre la part de variété (comme pour les héros, section 10).

## 13. Idées abandonnées

Ces idées ne sont plus d'actualité. On garde la raison de l'abandon pour ne pas les reproposer sans y repenser.

| Idée | Raison de l'abandon |
|---|---|
| **Assistant lié à chaque héros** : chaque héros aurait été systématiquement assisté d'un membre de l'équipage, choisi par le joueur en plus de la configuration du héros. | Le donjon commence maintenant par un **renfort** (section 3), qui donne au joueur un premier choix avant tout combat. L'assistant devenait inutile, et il alourdissait la configuration du héros. Ce qu'il devait apporter n'avait jamais été tranché. |
