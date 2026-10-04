#!/bin/bash
# File de production « voix » : rend chaque vidéo (prestations, puis guides, puis comparaison) qui n'a pas encore son MP4.
# bash queue-voix.sh [slug ...]   — sans argument : tout ce qui reste d'après youtube-registry.json
ST=$(cd "$(dirname "$0")" && pwd)
LOG=$ST/work/queue-voix.log; mkdir -p $ST/work
slugs=("$@")
if [ ${#slugs[@]} = 0 ]; then
  mapfile -t slugs < <(python3 - "$ST" <<'PY'
import json, os, sys
st = sys.argv[1]
reg = json.load(open(os.path.join(st, "youtube-registry.json")))
for k, v in reg["videos"].items():
    if v.get("status") == "todo":
        print(k)
PY
)
fi
for s in "${slugs[@]}"; do
  st=$(python3 -c "import json,sys;print(json.load(open('$ST/youtube-registry.json'))['videos']['$s']['status'])")
  if [ "$st" != todo ]; then echo "$(date +%T) skip $s ($st)" >> $LOG; continue; fi
  echo "$(date +%T) start $s" >> $LOG
  if [ "$s" = avocat-ou-service-juridique ]; then bash $ST/films/film.sh "$s" >> $LOG 2>&1
  else bash $ST/produce.sh "$s" voix >> $LOG 2>&1; fi
  if tail -1 $LOG | grep -q "PRODUCE OK"; then
    python3 - "$ST" "$s" <<'PY'
import json, sys
p = sys.argv[1] + "/youtube-registry.json"; r = json.load(open(p))
r["videos"][sys.argv[2]]["status"] = "rendered"; json.dump(r, open(p, "w"), ensure_ascii=False, indent=1)
PY
    echo "$(date +%T) done $s" >> $LOG
  else echo "$(date +%T) FAIL $s" >> $LOG; fi
done
echo "$(date +%T) QUEUE DONE" >> $LOG
