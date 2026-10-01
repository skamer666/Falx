# Routine « Vidéos de service Thrax Legal »

Chaque exécution produit **jusqu’à 5 vidéos**, une par prestation du site thrax-legal.ch, **sans voix**.
Le propriétaire enregistre lui-même la voix off par-dessus, à partir de la feuille de calage.

Objectif de chaque vidéo : quelqu’un qui tombe sur la page d’une prestation (par exemple
« Mise en demeure » pour entreprises) regarde la vidéo et se dit : *ils sont sérieux, c’est clair,
je commande chez eux*. Elle doit être **dynamique, rapide, très claire** et donner un vrai repère juridique.

Tout ce qu’il faut est sur la branche `video-studio` du dépôt `skamer666/Falx` :

| Fichier | Rôle |
|---|---|
| `registry.json` | Liste des 53 vidéos, statut (`todo`, `claimed`, `done`, `failed`, `blocked`) et contenu FR de chaque prestation |
| `registry.py` | Réserver / terminer / marquer en échec une vidéo (gère les exécutions en parallèle) |
| `specs/services/mise-en-demeure.py` | **Script de référence** d’une vidéo de service : à imiter |
| `engine/` | Moteur d’animation (gabarits de scènes `tpl.py`, blocs de service `service.py`, musique `audio.py`) |
| `produce.sh` | Fabrique une vidéo complète à partir de son script |
| `setup.sh` | Vérifie et installe les dépendances |
| `livraisons/<slug>/` | Textes livrés (feuille de calage, YouTube, transcription) + miniature, versionnés |

Les vidéos déjà faites **hors routine** (ne pas les refaire) : les 5 guides (facture impayée, CGV,
contrat de travail, nLPD, bail commercial), « Avocat ou service juridique externalisé ? » et la vidéo
de présentation. La routine ne fait **que** les vidéos de prestations listées dans `registry.json`.

---

## Étapes d’une exécution

### 0. Préparer

```bash
cd <racine du dépôt cloné>            # le dossier git de la session
git fetch origin video-studio claude/falx-landing-page-design-zvjcet
if [ -d /tmp/studio ]; then git -C /tmp/studio fetch origin video-studio && git -C /tmp/studio checkout --detach -f origin/video-studio; else git worktree prune; git worktree add --detach /tmp/studio origin/video-studio; fi
cd /tmp/studio
git log --oneline -1   # doit être le dernier commit de origin/video-studio
git config user.name "Thrax Video Routine"; git config user.email "routine@thrax-legal.ch"
bash setup.sh                          # doit afficher SETUP OK
RUN=$(date -u +%Y%m%dT%H%MZ)-$RANDOM
date -u +%s > /tmp/run_start
```

Si `setup.sh` échoue : ne rien réserver, terminer en expliquant ce qui manque.

### 1. Nouvelles prestations sur le site ?

Comparer les slugs du catalogue du site avec `registry.json` :

```bash
git show origin/claude/falx-landing-page-design-zvjcet:src/lib/services/catalog.ts | grep -o 'slug: "[^"]*"' | cut -d'"' -f2 | sort > /tmp/site.txt
python3 -c "import json;print('\n'.join(sorted(v['slug'] for v in json.load(open('registry.json'))['videos'])))" > /tmp/reg.txt
comm -23 /tmp/site.txt /tmp/reg.txt
```

Pour chaque slug nouveau : `python3 registry.py add <slug> <particuliers|entreprises> "<Nom>"`.

### 2. Réserver

```bash
python3 registry.py claim 5 --run $RUN
```

La commande affiche les slugs réservés, un par ligne, ou `NOTHING_LEFT`.
Si `NOTHING_LEFT` : terminer en disant que **toutes les vidéos sont faites et que la routine peut être désactivée**.

Ne jamais produire une vidéo qui n’a pas été réservée par cette exécution.

### 3. Pour chaque slug réservé, dans l’ordre

**a. Lire le contenu à jour.** Le texte de référence est celui du site (il peut avoir changé depuis le registre) :

```bash
git show origin/claude/falx-landing-page-design-zvjcet:src/content/services/fr.ts | sed -n '/"<slug>": {/,/^  },/p'
```

(Pour `testament`, la clé est `testament:` sans guillemets.) À défaut, utiliser `content` dans `registry.json`.

**b. Écrire le script** `specs/services/<slug>.py` en suivant **exactement** la structure de
`specs/services/mise-en-demeure.py` et les règles ci-dessous.

**c. Produire :**

```bash
bash produce.sh <slug> 2>&1 | tail -30
```

La dernière ligne est `PRODUCE OK …` (chemins du MP4, de la musique et de la miniature) ou `PRODUCE FAILED <slug>: <raison>`.
En cas d’échec du build (souvent une ancre absente de la voix off, voir les règles) : corriger le script
et relancer, **2 corrections au maximum**. Ensuite : `python3 registry.py fail <slug> --run $RUN --reason "<raison>"`
et passer à la vidéo suivante.

**d. Contrôle visuel obligatoire** avant de livrer : extraire 8 images et les regarder une par une.

```bash
S=<slug>; mkdir -p /tmp/frames/$S; D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 work/_out/$S/$S.mp4)
for i in 1 2 3 4 5 6 7 8; do t=$(python3 -c "print(round($D*$i/9,2))"); ffmpeg -loglevel error -y -ss $t -i work/_out/$S/$S.mp4 -frames:v 1 -vf scale=960:-1 /tmp/frames/$S/f$i.jpg; done
```

Regarder chaque image (outil de lecture d’image) et vérifier : aucun texte coupé, aucun chevauchement,
aucun écran vide plus d’une seconde, l’orthographe, la miniature `livraisons/<slug>/miniature.png`
lisible (texte qui ne touche pas l’écusson ni le drapeau). S’il y a un défaut : raccourcir les textes
concernés dans le script et relancer `produce.sh` **une** fois.

**e. Livrer au propriétaire** avec l’outil d’envoi de fichiers (statut `proactive`), en un seul envoi :
le MP4, la miniature, la musique seule (`.m4a`), `feuille-de-calage.md` et `youtube.md`. Légende :
`« <Nom> » (<particuliers|entreprises>) : vidéo sans voix, <durée>. Page : <url>`.

**f. Enregistrer :**

```bash
python3 registry.py done <slug> --run $RUN --duration <durée en secondes>
```

Cette commande versionne aussi le script et `livraisons/<slug>/` sur la branche `video-studio`.

**g. Temps.** Avant de commencer une nouvelle vidéo : si plus de 50 minutes se sont écoulées depuis
le début (`$(( $(date -u +%s) - $(cat /tmp/run_start) ))` > 3000), libérer les vidéos réservées non
commencées (`python3 registry.py release <slug>`) et terminer.

### 4. Terminer

Message final court, en français : vidéos livrées (nom, durée), échecs éventuels avec la raison,
nombre de vidéos restantes (`python3 registry.py status | head -1`).

---

## Règles de contenu (impératives)

1. **Aucune voix.** Ne jamais générer de voix de synthèse ni de piste vocale. `produce.sh` refuse
   tout fichier audio autre que `music.wav` et `sfx.wav`.
2. **Aucun prix, aucun délai, aucun volume** dans la vidéo, la voix off, la miniature ou la description
   YouTube (pas de « 149 CHF », « sous 48 h », « 24 h », « 5 dossiers »…). Seule formule autorisée :
   « prix fixe, annoncé avant de commencer ».
3. **Jamais « juriste » ni « avocat »** pour désigner Thrax Legal ou son fondateur. Autorisé :
   « si un avocat est nécessaire, on vous le dit ». Thrax Legal n’est pas un cabinet d’avocats et ne
   représente personne devant un tribunal : ne jamais promettre de représentation, de plaidoirie ou de
   résultat (« vous allez gagner »).
4. **Exactitude juridique.** N’utiliser que les règles, articles et montants présents dans le texte de la
   prestation (`note`, `faq`, `intro`). Ne rien inventer. Un article cité doit figurer tel quel dans ce texte.
5. **Ton.** Vouvoiement, phrases courtes, concret, rassurant, professionnel. Pour les particuliers face à
   un employeur ou un bailleur : ferme mais jamais agressif ni insultant envers l’autre partie.
6. **SEO.** Le nom de la prestation (ou son mot-clé principal) apparaît dans la première phrase de la
   voix off, dans `title`, `yt_title` (≤ 100 caractères, mot-clé en premier) et les `tags` (8 à 12).
7. **Durée** : 70 à 100 secondes, soit 150 à 210 mots de voix off au total (le moteur estime 2,45 mots
   par seconde). `produce.sh` refuse moins de 55 s ou plus de 150 s.

## Structure obligatoire (9 scènes, comme la référence)

| # | Scène | Gabarit | Contenu |
|---|---|---|---|
| 1 | Accroche | `title(kicker, question, chips=[…])` | Le problème du client en une question ; kicker « Particuliers · <Nom> » ou « Entreprises · <Nom> » ; 2 à 4 puces courtes |
| 2 | L’enjeu | `warn(texte, sub=…, a_sub=…, label="Le risque")` | Ce que coûte le fait d’attendre ou de mal faire |
| 3 | La règle | `law(ref, texte, a_text=…, note=…, a_note=…)` (ou `stat`, `ruler` pour un délai) | La règle clé tirée de `note`, avec l’article exact |
| 4 | Le bon document | `doc(...)` ou `lst(...)` ou `cards(...)` | Ce qu’un bon document contient / ce qu’on vérifie |
| 5 | Ce qu’on fait | `brand(titre, [(icône, libellé, ancre)] × 4)` | Les éléments de « Ce qui est inclus », reformulés en 2 à 4 mots |
| 6 | Comment ça marche | `process()` | Voix off qui contient **exactement** « Vous décrivez », « Chaque dossier » et « Et vous recevez » |
| 7 | Pourquoi nous | `promise(AUDIENCE)` | Voix off qui contient **exactement** « prix fixe », « par écrit », « recherché » et « un avocat » |
| 8 | Commander | `service_cta(AUDIENCE, SLUG, NAME)` | Voix off qui contient **exactement** « Commandez » et « Le lien » |
| 9 | Fin | `S("", None, dur=5.0)(end_service(AUDIENCE))` | Sans voix |

Sections (bandeau en haut de l’écran) : `"01 · Le problème"` pour les scènes 2–3, `"02 · La solution"`
pour 4–7, `"03 · Commander"` pour 8. La scène 1 n’a pas de section.

### Ancres

Chaque `a_…`, chaque ancre de puce et d’élément est un **morceau de phrase qui doit figurer tel quel**
dans la voix off de la même scène (casse et ponctuation ignorées, mots dans le même ordre).
Une ancre absente fait échouer le build. Mettre les ancres dans l’ordre où elles sont prononcées.

### Longueurs maximales (sinon le texte déborde)

- `title` : question ≤ 60 caractères ; puces ≤ 14 caractères chacune.
- `warn` : texte ≤ 70 caractères ; `sub` ≤ 80.
- `law` : `ref` ≤ 24 ; texte ≤ 75 ; `note` ≤ 90.
- `doc` : titre ≤ 32 ; 3 champs, valeur ≤ 40 ; tampon ≤ 22.
- `lst` : 3 à 5 lignes ≤ 45 caractères. `cards` : 3 ou 4 cartes, titre ≤ 22, sous-titre ≤ 45.
- `brand` : titre ≤ 45 ; 4 libellés ≤ 22.
- `NAME` (affiché dans la page du navigateur) : ≤ 40 caractères, sinon une version courte.

Icônes disponibles : phone scale court lock shield doc clock check cross mail building chat search pen
arrow down data home receipt brief gavel question user cal spark play stop link.

### META (obligatoire)

```python
AUDIENCE = "particuliers" | "entreprises"
SLUG = "<slug exact du site>"
NAME = "<nom de la prestation, ≤ 40 caractères>"
META = {
    "title": "...",                     # titre de la vidéo
    "yt_title": "...",                  # ≤ 100 caractères, mot-clé en premier
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers|entreprises", "https://thrax-legal.ch/fr/<audience>")],
              # + ("Le guide complet", <url du guide>) si registry.json indique un guide
    "yt_intro": "...",                  # 2 à 3 phrases riches en mots-clés, sans prix ni délai
    "tags": [...],                      # 8 à 12
    "thumb": ("Ligne 1", "ligne 2 ?", "Puce"),   # ≤ 10 car., ≤ 12 car., ≤ 32 car.
    "chrome_from": 2,
    "footer": "...",                    # particuliers : « Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux. »
                                        # entreprises : texte de la référence
}
```

## Interdits

- Ne pas modifier `engine/`, `produce.sh`, `registry.py` ni les vidéos déjà `done`.
- Ne pousser **que** sur la branche `video-studio` (les commandes de `registry.py` le font). Ne jamais
  toucher aux branches du site ni ouvrir de pull request.
- Ne jamais versionner de MP4, de WAV ni le dossier `work/` (déjà ignoré par `.gitignore`).
