#!/bin/bash
# Produit UNE vidéo de service : bash produce.sh <slug>
# Entrée : specs/services/<slug>.py   Sorties : livraisons/<slug>/ (textes + miniature, versionnés)
#                                              work/_out/<slug>/ (MP4 + musique, NON versionnés : à envoyer avec SendUserFile)
set -uo pipefail
ST=$(cd "$(dirname "$0")" && pwd)
slug=${1:?slug}
SPEC=$ST/specs/services/$slug.py
WK=$ST/work/$slug
OUT=$ST/livraisons/$slug
BIN=$ST/work/_out/$slug
HF="npx --yes hyperframes@0.8.103"
die() { echo "PRODUCE FAILED $slug: $*"; exit 1; }
[ -f "$SPEC" ] || die "spec absente"
rm -rf "$WK" "$BIN"; mkdir -p "$WK" "$OUT" "$BIN"
cp "$ST"/template/* "$WK"/
cd "$ST"
python3 engine/build.py "$WK" "$SPEC" || die "build"
python3 engine/audio.py "$WK" > "$WK/audio.log" 2>&1 || die "audio: $(tail -3 $WK/audio.log)"
python3 engine/build.py "$WK" "$SPEC" > "$WK/build.log" || die "build 2"
cat "$WK/build.log"
dur=$(python3 -c "import json;print(json.load(open('$WK/assets/timing.json'))['total'])")
python3 - "$dur" <<'PY' || die "durée hors limites (55 à 150 s) : $dur"
import sys; d = float(sys.argv[1]); sys.exit(0 if 55 <= d <= 150 else 1)
PY
# Aucune voix : seuls music.wav et sfx.wav sont autorisés dans assets/audio.
extra=$(ls "$WK/assets/audio" | grep -v -E '^(music|sfx)\.wav$' || true)
[ -z "$extra" ] || die "fichier audio inattendu : $extra"
(cd "$WK" && $HF lint > lint.log 2>&1)
grep -qE "(^|[^0-9])0 errors" "$WK/lint.log" || { tail -20 "$WK/lint.log"; die "lint"; }
ok=0
for try in 1 2 3; do
  (cd "$WK" && $HF render --skill=faceless-explainer --fps 60 --workers 4 --quality high --output renders/render.mp4 > renders/render.log 2>&1)
  grep -q "rendered in" "$WK/renders/render.log" && { ok=1; break; }
  echo "render échoué (essai $try)"; tail -5 "$WK/renders/render.log"; sleep 20
done
[ $ok = 1 ] || die "render"
enc() { ffmpeg -loglevel error -y -i "$WK/renders/render.mp4" -c:v libx264 -preset slow -crf "$1" -tune animation -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 160k "$BIN/$slug.mp4"; }
enc 21 || die "encodage"
size=$(stat -c %s "$BIN/$slug.mp4")
[ "$size" -gt 29000000 ] && { enc 26 || die "encodage 2"; size=$(stat -c %s "$BIN/$slug.mp4"); }
[ "$size" -gt 29000000 ] && { enc 30 || die "encodage 3"; size=$(stat -c %s "$BIN/$slug.mp4"); }
[ "$size" -gt 29000000 ] && die "MP4 trop lourd ($size octets)"
ffmpeg -loglevel error -y -i "$WK/assets/audio/music.wav" -i "$WK/assets/audio/sfx.wav" -filter_complex "[0][1]amix=inputs=2:normalize=0" -c:a aac -b:a 192k "$BIN/$slug-musique-et-effets.m4a" || die "musique"
python3 engine/thumb.py "$WK" "$SPEC" >/dev/null || die "miniature html"
node engine/shot.mjs "$WK/thumb.html" "$OUT/miniature.png" || die "miniature png"
cp "$WK/feuille-de-calage.md" "$WK/youtube.md" "$WK/transcription-youtube.txt" "$OUT/"
# Contrôles finaux
ffprobe -v error -show_entries stream=codec_type -of csv=p=0 "$BIN/$slug.mp4" | grep -q video || die "MP4 sans image"
mp4dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$BIN/$slug.mp4")
cp "$WK/assets/timing.json" "$OUT/timing.json"
rm -rf "$WK"  # libère le disque (le rendu brut pèse plusieurs centaines de Mo)
echo "PRODUCE OK $slug duration=$mp4dur size=$size mp4=$BIN/$slug.mp4 m4a=$BIN/$slug-musique-et-effets.m4a png=$OUT/miniature.png"
