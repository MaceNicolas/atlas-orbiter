# Reprise — RPG space opera

Session de design du 13 octobre 2026. Ce document complète (et modifie sur certains points) le document de concept initial du 11 octobre 2026 ("Système de jeu — RPG space opera"). Il récapitule les décisions prises ce soir et pointe ce qu'il reste à trancher.

## 1. Les éléments : simplification radicale

**Décision validée** : on abandonne entièrement le cycle d'engendrement (le pentagone) et l'idée des deux cycles superposés (pentagone + étoile). Les cinq éléments ne servent plus qu'à une seule chose : une roue de dominance qui donne un bonus de dégâts.

**La roue de dominance** (qui bat qui), à retenir comme une simple roue, sans la déduire d'un pentagone :

```
Eau → Feu → Métal → Bio → Terre → Eau
```

(Eau bat Feu, Feu bat Métal, Métal bat Bio, Bio bat Terre, Terre bat Eau.)

Un héros/sort dont l'élément bat celui de la cible fait plus de dégâts. S'ajoute un petit bonus (~10 %) quand un héros lance un sort de son propre élément.

**Important** : ce bonus de dominance s'applique au **total des dégâts infligés**, que l'attaque tire sa puissance de l'Attaque physique ou de l'Attaque élémentaire (voir section 2). La distinction physique/élémentaire ne sert qu'à déterminer quelle stat calcule le dégât de base et quelle défense l'encaisse — pas si le bonus élémentaire s'applique.

### Ce qui disparaît avec l'engendrement (et qu'il faudra remplacer)

- Les recharges réduites en chaînant les sorts dans l'ordre élémentaire → les recharges redeviennent des valeurs fixes, sans interaction entre elles.
- Les soins/buffs renforcés sur l'élément suivant → un soin/buff soigne pareil pour tout le monde, ou garde seulement un petit bonus "même élément" (en miroir du bonus de dégâts).
- La chasse aux essences en chaîne ("l'essence Terre améliore le Métal") → **remplacement proposé et validé** : l'essence d'un élément améliore directement l'équipement de ce même élément (pas de chaîne).
- Les boss nourris par des sbires de l'élément qui les engendre (choix tactique "couper l'approvisionnement vs frapper la faiblesse") → ce levier disparaît tel quel ; les sbires n'ont plus besoin d'avoir un élément lié au boss. Pas de remplacement discuté, le joueur a dit que ça ne l'embêtait pas.

## 2. Les stats du héros : refonte complète

**Décision validée** : on abandonne le modèle "Vie, Attaque, Défense, Élément" (4 choses) du document initial.

Un héros est maintenant défini par :
- un **élément fixe** (sert uniquement à la roue de dominance, cf. section 1)
- une **arme fixe** (type d'arme, donne le rôle et le sort signature, comme dans le doc initial)
- **six stats primaires** qui déterminent six caractéristiques finales

### Les six caractéristiques finales (dérivées)

- Vie
- Initiative (résout une question ouverte du doc initial : pas de jauge ATB, tri par Initiative décroissante à chaque round — tour par tour strict)
- Attaque physique (sert uniquement à l'action de repli / attaque de base quand tous les sorts sont en recharge)
- Défense physique
- Attaque élémentaire (sert à tous les sorts actifs de l'équipement, puisque chaque gemme colore son sort d'un élément)
- Défense élémentaire

### Les six stats primaires

Chaque stat primaire a un effet fort sur sa caractéristique "attitrée" et un effet léger sur une autre caractéristique. Dernière table discutée (version "deux triangles", voir ouverture ci-dessous) :

| Stat | Effet fort | Effet léger |
|---|---|---|
| **Vigueur** | Vie ↑↑ | Attaque physique ↑ |
| **Puissance** | Attaque physique ↑↑ | Défense physique ↑ |
| **Endurance** | Défense physique ↑↑ | Vie ↑ |
| **Réflexes** | Initiative ↑↑ | Attaque élémentaire ↑ |
| **Affinité** | Attaque élémentaire ↑↑ | Défense élémentaire ↑ |
| **Résilience** | Défense élémentaire ↑↑ | Initiative ↑ |

Cette table forme deux triangles fermés indépendants :
- **Triangle "corps"** : Vigueur → Puissance → Endurance → Vigueur (Vie, Attaque physique, Défense physique)
- **Triangle "élémentaire"** : Réflexes → Affinité → Résilience → Réflexes (Initiative, Attaque élémentaire, Défense élémentaire)

### 🔴 Point à trancher à la reprise

Le choix de la structure du "qui donne un effet léger à qui" n'est **pas figé**. On a établi que mathématiquement, si on veut que chaque caractéristique reçoive exactement un effet léger (couverture complète) sans qu'aucune stat ne se booste elle-même, il n'existe que 4 topologies possibles (partitions de 6 en parts ≥ 2) :

1. **Roue unique à 6** — toutes les stats s'enchaînent en un seul cycle (écarté : trop similaire à la roue des éléments, effet "de roue total" jugé too much)
2. **Boucle à 4 + un miroir isolé** (4+2) — pas encore exploré en détail
3. **Deux triangles fermés** (3+3) — c'est la table ci-dessus, actuellement la plus aboutie
4. **Trois miroirs indépendants** (2+2+2) — évoqué mais pas exploré ; pourrait être un principe de design assumé (chaque stat a "sa" stat complémentaire) plutôt qu'un hasard bizarre

Le joueur n'a pas tranché entre ces options ce soir ("je ne vais pas trancher cela ce soir"). **À la reprise : décider entre 3+3, 4+2 ou 2+2+2**, et si besoin retravailler les justifications thématiques des liens légers en conséquence.

## 3. Ce qui n'a pas bougé / reste ouvert depuis le document initial

Toutes les questions ouvertes du document du 11 octobre restent valables et n'ont pas été retouchées ce soir, à l'exception de l'initiative/ATB (résolu, voir section 2) :

- Soins et usure : comment empêcher un soigneur de tout régénérer après chaque combat.
- Gemmes inutilisables : recyclage hors du donjon.
- Noms définitifs des emplacements d'armure (casque, torse, jambes ou équivalents space opera).
- Armes au-delà des huit premières, gemmes rares uniques.
- Taille de la réserve de héros recrutables.
- Donjons à élément dominant.
- Tous les chiffres : durées de recharge, bonus de domination, nombre de chasses par poids, charges du médikit.

Le reste du document initial (équipement, gemmes secondaires, armes et leurs 160 gemmes, butin, exploration) n'a pas été remis en question et reste tel quel.
