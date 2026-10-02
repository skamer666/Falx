# Reels Thrax Legal : ligne éditoriale et routine

Moteur : `reels/` (voix Edge TTS fr-CH-FabriceNeural +12 %, blancs coupés ; personnage en costume avec pin's suisse ;
sous-titres mot à mot ; musique et bruitages procéduraux). Produire un Reel : `bash reels/produce.sh reels/specs/<id>.py`.
Un spec = `VO`, `META` (légende, titre YouTube, tags, génome, cover_t), `CSS`, `body(w)`, éventuellement `SCRIPT`.

## Public

Le spectateur type ne connaît RIEN au droit. Il scrolle. Il reste seulement si c'est passionnant.
Retour du propriétaire sur les 2 pilotes : « trop technique, c'est chiant ». Donc :

1. **La Suisse dès la première phrase**, avec une ville : Genève, Lausanne, Neuchâtel, Fribourg, Sion, Bienne…
2. **Une histoire, pas un cours** : « Tu trouves un portefeuille à Genève… », « Imagine : tu bosses à Lausanne… ».
   Une situation du quotidien, des enjeux concrets (argent, logement, travail, voisins, achats, voiture, vacances).
3. **Hook en 1 seconde** : dilemme (« Tu fais quoi ? »), perte d'argent chiffrée, mythe à casser (« … non ? Eh bien non. »).
4. **Boucle ouverte + twist** : « Mais le plus fou, c'est ça. » ; garder la meilleure info pour les 70 % du Reel.
5. **Zéro jargon** : pas de « congé », « sûretés », « prétention » sans traduction. Le numéro d'article arrive à la fin, une seule fois.
6. **Chiffres concrets** : francs, jours, années, pourcentages, un calcul simple.
7. **CTA court** : partager à quelqu'un (« Envoie ça à… »), « Thrax Legal, lien en bio ».

## Vérité (non négociable)

- Uniquement des règles de droit suisse vérifiées, article exact à l'écran et dans la légende ; nuances importantes dans la légende.
- Une histoire inventée est présentée comme telle (« Imagine », « Tu… »), jamais comme un fait réel.
- Jamais « juriste » ni « avocat » pour Thrax Legal ou le personnage ; aucune promesse de résultat ni de représentation.
- Pas de chiffre « de pratique » présenté comme loi (dire « en pratique, on parle souvent de… »).

## Exploration / exploitation

Chaque Reel a un génome (`META.genome` : style, palette, hook, format, sujet, personnage, sous-titres, musique, durée),
consigné dans `reels/registry.json` avec les stats Metricool.

- Tant qu'aucun Reel n'a atteint ~10 000 vues : 4-5 Reels/jour aux génomes tous très différents (styles visuels jamais répétés deux jours de suite).
- Un Reel ≥ 3× la médiane des vues (48 h) : 2 créneaux/jour deviennent des mutations (même style/format, sujet ou hook différent).
- Un Reel ≥ 10 000 vues : 3-4 créneaux/jour en mutations de ce génome, le reste en exploration.
- Comparer à 48 h et 7 j : vues, partages, enregistrements, temps de visionnage moyen.

## Publication

Médias sur la branche orpheline `reels-media` (commits « [skip ci] », jamais Cloudflare) :
`https://raw.githubusercontent.com/skamer666/Falx/reels-media/<id>.mp4`. Garder seulement les médias récents.
Metricool : blogId 7198804, fuseau Europe/Brussels ; Instagram REEL (showReelOnFeed), Facebook REEL, YouTube short
(public, madeForKids false, catégorie EDUCATION) ; isAiGenerated false ; meilleurs horaires via getBestTimeToPostByNetwork.
