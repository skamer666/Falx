# Routine « Vidéos YouTube avec voix off »

But : chaque vidéo YouTube de Thrax Legal (53 prestations, 5 guides, la comparaison « Avocat ou service juridique », la présentation) existe avec la voix off Vivienne, **calée sur la parole** (aucun temps mort), est publiée sur la chaîne Thrax Legal et intégrée à la bonne page du site.

Le registre `youtube-registry.json` fait foi. Statuts : `todo` → `rendered` → `uploaded` → `on_site`.

## Production (automatique, en arrière-plan)

- `bash queue-voix.sh` rend **2 vidéos à la fois** (`LANES=2`, `HF_WORKERS=2` ; à 5 en parallèle sur 4 cœurs, Chrome ne démarrait plus) toutes les vidéos `todo`. Chaque voie (`lane.sh`) passe la sienne en `rendering` puis `rendered` ou `failed` ; le registre est écrit sous `flock work/registry.lock`. Journal : `work/queue-voix.log`, détail par vidéo : `work/lanes/<slug>.log`.
- Si la file ne tourne plus (`pgrep -f "lane.s[h]"` vide), les vidéos restées en `rendering` repassent en `todo` avant de relancer.
- **Toujours lancer la file comme tâche Bash suivie par la session** (`run_in_background: true`, timeout 7200000), jamais avec `nohup` : le conteneur est recyclé quand la session est inactive et tue les processus détachés (constaté deux fois le 4 oct.).
- Prestations et guides : `bash produce.sh <slug> voix`.
  - `engine/voice.py` génère une prise par scène (fr-FR-VivienneMultilingualNeural, +10 %, edge-tts avec proxy) avec les temps réels de chaque mot.
  - `kit.Ctx` utilise ces temps au lieu de l'estimation : chaque apparition tombe sur son mot, chaque scène dure sa phrase plus 0,42 s (0,28 s avant le premier mot).
  - La piste `assets/audio/vo.wav` est mixée avec la musique et les effets ; l'encodage est normalisé à −14 LUFS.
- Comparaison : `bash films/film.sh avocat-ou-service-juridique` (film autonome avec son propre `tools/`, même principe).
- Prononciation : les sigles sont épelés via la table `SAY` de `engine/voice.py` (CO, CC, LP, nLPD, CGV, AVS, AI, etc.) et `thrax-legal.ch` est lu « thrax tiret legal point c h ». Ajouter toute nouvelle abréviation à cette table.
- Ne jamais modifier `produce.sh` ou `queue-voix.sh` pendant qu'ils tournent : bash relit le script en cours d'exécution.

## Mise à l'abri (à chaque passage, même si YouTube bloque)

`bash stash_media.sh` pousse sur la branche `reels-media` (par lots de 8) tous les MP4 `rendered` pas encore hébergés. Les vidéos survivent ainsi à un recyclage du conteneur. Les textes (livraisons/) et le registre sont committés sur `video-studio`. Consigne du propriétaire (5 oct.) : continuer à fabriquer et garder les vidéos de côté, même quand l'upload est bloqué.

## Publication (à chaque passage de la routine, toutes les heures)

Pour chaque vidéo `rendered` :

1. Hébergement : copier `work/_out/<slug>/<slug>.mp4` dans la branche `reels-media`, sous `youtube/services/` (prestations) ou `youtube/guides/` (guides et comparaison). Committer avec « [skip ci] », puis pousser. L'URL raw.githubusercontent doit répondre 200.
2. Métadonnées : `python3 yt_meta.py <slug>` donne le titre, la description et les tags.
   - Source : `livraisons/<slug>/youtube.md`, ou `films/<slug>/youtube.md` pour la comparaison.
   - Les chapitres doivent correspondre au **nouveau** minutage (`timing.json`), sinon les retirer.
3. Upload via Zapier, YouTube `upload_video` (selected_api `YouTubeV4CLIAPI`) avec :
   - `privacy_status` public, `category_id` 27, `default_language` et `default_audio_language` fr ;
   - `made_for_kids` false, `notify_subscribers` false, `embeddable` true, `license` youtube ;
   - **pas de miniature** : la chaîne n'est pas vérifiée et l'upload de miniature échoue.

   Noter l'`id` renvoyé dans le registre et passer la vidéo en `uploaded`.
4. Site : `python3 site_sync.py /home/user/Falx`.
   - Le script crée l'affiche auto-hébergée (`public/media/video/{services,guides}/<slug>.webp`, depuis `miniature.png`), régénère `src/lib/videos-data.ts` et passe les vidéos en `on_site`.
   - Ensuite : `npx tsc --noEmit`, `npx eslint` sur les fichiers touchés, puis `npm run build`.
   - Committer sur `claude/intelligent-knuth-4by8ds` et pousser aussi sur `claude/falx-landing-page-design-zvjcet` : Workers Builds déploie.
5. Committer le registre sur `video-studio`.

Uploads **un par un**, jamais en parallèle. Zapier a renvoyé « This action has been throttled without retry » dès le 2e upload simultané le 4 oct. `bash yt_prep.sh <slug>…` fait le contrôle, l'hébergement et sort les métadonnées.

Limite constatée le 4 oct. : après une dizaine de mises en ligne sur la chaîne dans la journée (Shorts Metricool compris), tous les uploads sont refusés (« throttled without retry »), alors que les lectures marchent. C'est probablement la limite journalière d'une chaîne non vérifiée par téléphone. Tenter **un seul** upload par passage ; s'il est refusé, s'arrêter jusqu'au passage suivant.

Si YouTube ou Zapier refuse un upload (quota journalier, limite de tâches), s'arrêter là et reprendre au passage suivant ; ne pas réessayer en boucle.

## Metricool : ne pas l'utiliser pour ces vidéos

Le 5 oct., 2 vidéos (avertissement-employe, baisse-de-loyer) ont été publiées via Metricool alors que Zapier restait bloqué.
Dès la 3e, Metricool a répondu « You have reached your Metricool account limit », et cette limite a aussi fait échouer le Reel r018 de 12h15 sur les 4 réseaux.
Le quota Metricool est réservé aux Reels : passer uniquement par Zapier pour les vidéos de prestations.

## treg (depuis le 5 oct.) : voie d'upload principale

Le compte YouTube Thrax Legal est relié à treg (équipe thrax-legal, CLI `treg` installée dans ~/.local/bin, identifiants dans ~/.treg/config.json).
`python3 yt_treg.py <n>` envoie jusqu'à n vidéos « rendered » (MP4 local ou repris de reels-media), note l'id et s'arrête au premier refus.
YouTube plafonne la chaîne (non vérifiée par téléphone) : le 5 oct., refus `uploadLimitExceeded` après 2 envois via treg (plus les envois du matin).
Tenter `python3 yt_treg.py 3` à chaque passage ; si treg n'est plus connecté (conteneur neuf), réinstaller la CLI et se reconnecter, sinon garder Zapier en secours.

## Contenu

Les textes des vidéos ne changent pas : ce sont ceux des specs déjà validées (aucun prix, délai ni volume ; jamais « juriste » ni « avocat » pour Thrax ; vouvoiement). Les vidéos sont en français. Sur les pages DE, EN et IT, une mention « vidéo en français » s'affiche sous le lecteur.
