#!/bin/bash
# Preview a reel without rendering: voice + build + music + lint + snapshots. usage: bash preview.sh <id> "t1,t2,..."
set -uo pipefail
HERE=$(cd "$(dirname "$0")" && pwd); ID=$1; AT=$2; WK=$HERE/work/$ID
rm -rf "${WK:?}"; mkdir -p "$WK"; cp "$HERE/../template/hyperframes.json" "$HERE/../template/package.json" "$WK/"
python3 "$HERE/voice.py" "$WK" "$HERE/specs/$ID.py" | tail -1 || exit 1
python3 "$HERE/build.py" "$WK" "$HERE/specs/$ID.py" || exit 1
python3 "$HERE/music.py" "$WK" | tail -1
(cd "$WK" && npx --yes hyperframes@0.8.103 lint 2>&1 | tail -1 && npx --yes hyperframes@0.8.103 snapshot --at "$AT" --no-end -o snaps . >/dev/null 2>&1)
python3 - "$WK/snaps" <<'PY'
import glob, sys
from PIL import Image
fs = sorted(glob.glob(sys.argv[1] + "/frame-*.png"))
ims = [Image.open(f).convert("RGB").resize((270, 480)) for f in fs]
n = len(ims); cols = min(5, n); rows = (n + cols - 1) // cols
o = Image.new("RGB", (270 * cols, 480 * rows), (255, 255, 255))
for i, im in enumerate(ims): o.paste(im, ((i % cols) * 270, (i // cols) * 480))
o.save(sys.argv[1] + "/sheet.png"); print("sheet", sys.argv[1] + "/sheet.png")
PY
