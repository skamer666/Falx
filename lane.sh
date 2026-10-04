#!/bin/bash
# Une voie de la file parallèle : bash lane.sh <slug>. Statuts du registre sous verrou (flock).
ST=$(cd "$(dirname "$0")" && pwd)
s=$1; LOG=$ST/work/queue-voix.log; L=$ST/work/lanes/$s.log; mkdir -p $ST/work/lanes
setst() { flock $ST/work/registry.lock python3 - "$ST" "$s" "$1" <<'PY'
import json, sys
p = sys.argv[1] + "/youtube-registry.json"; r = json.load(open(p))
r["videos"][sys.argv[2]]["status"] = sys.argv[3]; json.dump(r, open(p, "w"), ensure_ascii=False, indent=1)
PY
}
echo "$(date +%T) start $s" >> $LOG
setst rendering
if [ "$s" = avocat-ou-service-juridique ]; then bash $ST/films/film.sh "$s" > $L 2>&1
else bash $ST/produce.sh "$s" voix > $L 2>&1; fi
if grep -q "PRODUCE OK" $L; then setst rendered; echo "$(date +%T) done $s" >> $LOG
else setst failed; echo "$(date +%T) FAIL $s : $(grep -m1 'PRODUCE FAILED' $L)" >> $LOG; fi
