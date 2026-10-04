#!/bin/bash
# Prépare l'upload YouTube des vidéos « rendered » données : contrôle, planche d'images, hébergement reels-media, métadonnées.
# bash yt_prep.sh <slug> [slug ...]   → planches dans work/check/<slug>.png, JSON des métadonnées sur la sortie
ST=$(cd "$(dirname "$0")" && pwd); RM=/tmp/reels-media
mkdir -p $ST/work/check; cd $RM && git pull -q --rebase origin reels-media
for s in "$@"; do
  F=$ST/work/_out/$s/$s.mp4
  kind=$(python3 -c "import json;print(json.load(open('$ST/youtube-registry.json'))['videos']['$s']['kind'])")
  sub=services; [ "$kind" != service ] && sub=guides
  d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 $F)
  l=$(ffmpeg -hide_banner -i $F -af ebur128 -f null - 2>&1 | grep -E "^\s+I:" | tail -1 | awk '{print $2}')
  echo "CHECK $s dur=$d lufs=$l" >&2
  ffmpeg -loglevel error -y -i $F -vf "fps=6/$d,scale=480:-1,tile=3x2" -frames:v 1 $ST/work/check/$s.png
  mkdir -p $RM/youtube/$sub; cp $F $RM/youtube/$sub/$s.mp4; git -C $RM add youtube/$sub/$s.mp4
done
git -C $RM commit -qm "YouTube : $* (voix) [skip ci]

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01KpDw9AxaNKEm24Rv3GPyWP" && git -C $RM push -q origin reels-media
for s in "$@"; do
  kind=$(python3 -c "import json;print(json.load(open('$ST/youtube-registry.json'))['videos']['$s']['kind'])"); sub=services; [ "$kind" != service ] && sub=guides
  u=https://raw.githubusercontent.com/skamer666/Falx/reels-media/youtube/$sub/$s.mp4
  c=$(curl -s -o /dev/null -w "%{http_code}" -I $u); echo "HOST $s $c $u" >&2
  python3 $ST/yt_meta.py $s
done
