#!/bin/bash
# Film autonome (tools/ propres) avec voix Vivienne : bash films/film.sh avocat-ou-service-juridique
set -uo pipefail
ST=$(cd "$(dirname "$0")/.." && pwd)
slug=${1:?slug}
SRC=$ST/films/$slug; WK=$ST/work/$slug; BIN=$ST/work/_out/$slug
HF="npx --yes hyperframes@0.8.103"
die() { echo "PRODUCE FAILED $slug: $*"; exit 1; }
rm -rf "$WK" "$BIN"; mkdir -p "$BIN"; cp -r "$SRC" "$WK"; mkdir -p "$WK/renders" "$WK/assets/audio"
python3 "$ST/engine/voice.py" "$WK" "$WK/tools/scenes.py" > "$WK/voice.log" 2>&1 || die "voix"
(cd "$WK" && python3 tools/build.py && python3 tools/audio.py > audio.log 2>&1 && python3 tools/build.py) || die "build"
(cd "$WK" && $HF lint > lint.log 2>&1); grep -qE "(^|[^0-9])0 errors" "$WK/lint.log" || die "lint"
ok=0
for try in 1 2 3; do
  (cd "$WK" && $HF render --skill=faceless-explainer --fps 60 --workers ${HF_WORKERS:-4} --quality high --output renders/render.mp4 > renders/render.log 2>&1)
  grep -q "rendered in" "$WK/renders/render.log" && { ok=1; break; }; sleep 20
done
[ $ok = 1 ] || die "render"
ffmpeg -loglevel error -y -i "$WK/renders/render.mp4" -c:v libx264 -preset slow -crf 21 -tune animation -pix_fmt yuv420p -movflags +faststart -af loudnorm=I=-14:TP=-1.5:LRA=11 -c:a aac -b:a 160k -ar 48000 "$BIN/$slug.mp4" || die "encodage"
cp "$WK/assets/timing.json" "$SRC/timing.json"
rm -rf "$WK"
echo "PRODUCE OK $slug mp4=$BIN/$slug.mp4"
