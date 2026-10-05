#!/bin/bash
# Met à l'abri sur GitHub (branche reels-media) tous les MP4 « rendered » pas encore hébergés, par lots de 8.
ST=$(cd "$(dirname "$0")" && pwd); RM=/tmp/reels-media
cd $RM && git pull -q --rebase origin reels-media
mapfile -t todo < <(python3 - "$ST" "$RM" <<'PY'
import json, os, sys
st, rm = sys.argv[1], sys.argv[2]
for k, v in json.load(open(st + "/youtube-registry.json"))["videos"].items():
    if v["status"] != "rendered": continue
    sub = "services" if v["kind"] == "service" else "guides"
    if os.path.exists(f"{st}/work/_out/{k}/{k}.mp4") and not os.path.exists(f"{rm}/youtube/{sub}/{k}.mp4"):
        print(f"{k} {sub}")
PY
)
n=0; batch=()
flush() { [ ${#batch[@]} = 0 ] && return; git -C $RM commit -qm "YouTube (en attente d'upload) : ${batch[*]} [skip ci]

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01KpDw9AxaNKEm24Rv3GPyWP" && git -C $RM push -q origin reels-media && echo "pushed ${#batch[@]}"; batch=(); }
for line in "${todo[@]}"; do
  set -- $line; mkdir -p $RM/youtube/$2; cp $ST/work/_out/$1/$1.mp4 $RM/youtube/$2/$1.mp4; git -C $RM add youtube/$2/$1.mp4; batch+=("$1")
  [ ${#batch[@]} -ge 8 ] && flush
done
flush
echo "total hébergés : $(ls $RM/youtube/services $RM/youtube/guides 2>/dev/null | grep -c mp4)"
