#!/bin/bash
# File de production « voix » en parallèle (5 vidéos à la fois par défaut) : bash queue-voix.sh
# Rend toutes les vidéos « todo » du registre ; chaque voie passe la sienne en rendering → rendered (ou failed).
ST=$(cd "$(dirname "$0")" && pwd)
N=${LANES:-5}
export HF_WORKERS=${HF_WORKERS:-1}  # 4 cœurs : 1 navigateur de rendu par voie
mkdir -p $ST/work
python3 -c "
import json
for k, v in json.load(open('$ST/youtube-registry.json'))['videos'].items():
    if v.get('status') == 'todo': print(k)
" | xargs -P $N -I{} bash $ST/lane.sh {}
echo "$(date +%T) QUEUE DONE" >> $ST/work/queue-voix.log
