#!/bin/bash
# Produce one reel: bash reels/produce.sh <spec.py>   -> reels/out/<id>/<id>.mp4 + cover.jpg + post.json
set -uo pipefail
HERE=$(cd "$(dirname "$0")" && pwd)
SPEC=$(realpath "$1")
ID=$(basename "$SPEC" .py)
WK=$HERE/work/$ID
OUT=$HERE/out/$ID
HF="npx --yes hyperframes@0.8.103"
die() { echo "REEL FAILED $ID: $*"; exit 1; }
rm -rf "$WK"; mkdir -p "$WK" "$OUT"
cp "$HERE/../template/hyperframes.json" "$HERE/../template/package.json" "$WK/"
python3 "$HERE/voice.py" "$WK" "$SPEC" || die voice
python3 "$HERE/build.py" "$WK" "$SPEC" || die build
python3 "$HERE/music.py" "$WK" || die music
(cd "$WK" && $HF lint > lint.log 2>&1); grep -qE "(^|[^0-9])0 error" "$WK/lint.log" || { tail -20 "$WK/lint.log"; die lint; }
ok=0
for try in 1 2 3; do
  (cd "$WK" && $HF render --fps 30 --workers 4 --quality high --output renders/render.mp4 > render.log 2>&1)
  grep -q "rendered in" "$WK/render.log" && { ok=1; break; }
  echo "render retry $try"; tail -3 "$WK/render.log"; sleep 10
done
[ $ok = 1 ] || die render
ffmpeg -loglevel error -y -i "$WK/renders/render.mp4" -c:v libx264 -preset slow -crf 20 -tune animation -pix_fmt yuv420p \
  -r 30 -movflags +faststart -c:a aac -b:a 192k -ar 48000 "$OUT/$ID.mp4" || die encode
ct=$(python3 -c "import json;print(json.load(open('$WK/post.json'))['cover_t'])")
ffmpeg -loglevel error -y -ss "$ct" -i "$OUT/$ID.mp4" -frames:v 1 -q:v 3 "$OUT/cover.jpg" || die cover
cp "$WK/post.json" "$OUT/"
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT/$ID.mp4")
size=$(stat -c %s "$OUT/$ID.mp4")
rm -rf "$WK/renders"
echo "REEL OK $ID duration=$dur size=$size mp4=$OUT/$ID.mp4"
