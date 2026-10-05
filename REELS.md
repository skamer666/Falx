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

## Banque de hooks (recherche du 4 oct. + nos stats)

Règles : la 1re phrase dure moins de 1,5 s, contient « tu » + un enjeu concret (argent, logement, boulot) + une ville suisse ;
un seul point par Reel ; l'image de la 1re seconde doit déjà bouger (objet qui tombe, message qui arrive, tampon).
Le signal le plus fort pour le contenu juridique est l'enregistrement : donner quelque chose à garder (phrase exacte à dire,
check-list, délai) et alterner les CTA « Enregistre » / « Envoie ça à… ».

Formules à faire tourner (une différente par Reel, noter la formule dans META.genome.hook) :
1. Dilemme : « Tu trouves 2000 francs à Genève. Tu fais quoi ? » (notre meilleur Reel à ce jour).
2. Perte chiffrée : « Tu offres peut-être 6000 francs par an à ton patron. »
3. « Ils espèrent que tu ne sais pas ça » : « Ton bailleur à Lausanne espère que tu ne connais pas cette règle. »
4. Phrase à dire (format Law by Mike / Erika Kullberg) : « Ton patron te dit X ? Réponds-lui exactement ça. »
5. Ce qu'il ne faut jamais faire : « 3 choses à ne jamais signer quand tu loues un appart en Suisse. »
6. Appel à une identité : « Si tu es frontalier / locataire à Genève / en période d'essai, écoute ça. »
7. POV : « POV : ton patron te vire par WhatsApp. »
8. Affirmation choc vraie : « Ton bailleur n'a pas le droit d'entrer chez toi, même avec ses clés. »
9. « C'est légal ? » + verdict immédiat : « Payer tes vacances au lieu de te les laisser prendre ? Interdit. »
10. Réaction à l'actu suisse (20 minutes, Watson, RTS) : « Tu as vu l'histoire de… ? Voilà ce que dit la loi. »
À éviter : commencer par une citation de mythe entre guillemets (Reel « achat en ligne » : 3 s de visionnage moyen),
un logo, du contexte avant l'enjeu, un nom de ville seul suivi d'un point.

## Créativité : tout peut changer (consigne du propriétaire)

« Sois beaucoup plus créatif. Tu peux totalement tout refaire. » Rien n'est figé d'un Reel à l'autre :
- **Personnage** : l'homme en costume avec le pin's suisse n'est plus obligatoire. Nouveaux personnages, figurines 3D,
  marionnettes, objets qui parlent (une lettre de licenciement, une facture, une clé d'appartement), animaux…
- **Voix** : changer de voix, de ton, de rythme ; dialogues à plusieurs voix (`VOICE` par spec).
  Voix disponibles : fr-CH-FabriceNeural, fr-CH-ArianeNeural, fr-FR-RemyMultilingualNeural, fr-FR-HenriNeural,
  fr-FR-DeniseNeural, fr-FR-EloiseNeural, fr-FR-VivienneMultilingualNeural, fr-BE-GerardNeural, fr-BE-CharlineNeural,
  fr-CA-ThierryNeural, fr-CA-AntoineNeural, fr-CA-JeanNeural, fr-CA-SylvieNeural.
- **Technique** : 2D, 3D (`USE_THREE = True` charge Three.js ; dessiner dans `R.on(t)` avec `preserveDrawingBuffer`),
  papier découpé, faux écran de téléphone, faux JT, jeu vidéo rétro, documentaire, ASMR, POV, sketch, quiz…
- **Voix validée par le propriétaire** : fr-FR-VivienneMultilingualNeural (RATE +10 %), utilisée sur r011 (chat des colocs) : « excellente ». À utiliser en priorité, sur au moins 1 à 2 Reels par jour, tout en continuant à varier les styles visuels.
- **3D (demande du propriétaire : « plus de styles 3D différents »)** : au moins 1 Reel 3D par jour, et jamais deux fois le même rendu 3D d'affilée. Menu à faire tourner (Three.js, `USE_THREE = True`) :
  1. pâte à modeler / claymation (formes arrondies, MeshStandardMaterial rugueux, légers tremblements image par image) ;
  2. low-poly (flatShading, couleurs pastel, ville suisse stylisée : Jet d'eau, cathédrale de Lausanne…) ;
  3. diorama isométrique miniature (caméra orthographique, appartement/bureau en coupe, effet tilt-shift) ;
  4. voxel / cubes façon jeu de construction ;
  5. néon synthwave (fond nuit, grille au sol, émissifs, brouillard) ;
  6. typographie 3D (mots extrudés qui tombent, se cassent, s'empilent) ;
  7. papier 3D / origami (plans pliés, ombres douces) ;
  8. verre et chrome « premium » (MeshPhysicalMaterial, reflets, objet héros : clé, facture, contrat) ;
  9. figurines toon (déjà utilisé le 3 oct., r006) ;
  10. caméra embarquée / travelling à travers une scène (POV qui avance dans un couloir d'immeuble, une rue).
- **Polices disponibles** : Schibsted Grotesk (défaut), Caveat (manuscrit, tableau blanc), Press Start 2P (pixel ; pas de majuscules accentuées É/È, écrire sans accent en capitales). Musiques : drive, tension, lofi, epic, bounce, chip (8 bits).
- **Narration** : histoires de clients, sketchs, débats, « POV », compte à rebours, enquête.
  Une histoire de client est TOUJOURS fictive (Thrax Legal n'en publie pas de vraies) et l'écran le dit
  (« histoire fictive inspirée de situations courantes ») : pas de faux témoignage, pas de faux avis.
- Chaque jour : au moins 1 Reel avec une technique ou un personnage jamais utilisé avant.

## Contrôle de la prononciation (incident du 4 oct.)

- Ne jamais commencer par un nom de ville seul suivi d'un point (« Lausanne. ») : la voix multilingue l'a lu à l'anglaise. Écrire une phrase : « À Lausanne, tu… », « Sion, minuit » seulement avec une voix suisse (fr-CH).
- Écrire les années et les nombres sensibles en toutes lettres si besoin (« deux mille dix-neuf »).
- Après chaque rendu : transcrire les 4 premières secondes de `work/<id>/assets/vo.wav` (faster-whisper small, fr) et réécouter mentalement le hook ; corriger la phrase ou changer de voix si un mot est déformé.

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
**Consigne du propriétaire (5 oct.) : plus de Reels sur YouTube tant que toutes les vidéos YouTube de prestations/guides ne sont pas en ligne** (youtube-registry.json sans « rendered » ni « todo ») : le quota d'upload de la chaîne leur est réservé.
Metricool : blogId 7198804, fuseau Europe/Brussels ; Instagram REEL (showReelOnFeed), Facebook REEL, [YouTube short : suspendu, voir consigne]
(public, madeForKids false, catégorie EDUCATION) ; TikTok (tiktokData.title OBLIGATOIRE, ≤ 90 car., PUBLIC_TO_EVERYONE, isAigc false) ;
isAiGenerated false ; une seule publication Metricool avec les 4 réseaux ; meilleurs horaires via getBestTimeToPostByNetwork.
