"""python3 yt_next.py [<slug> <youtube_id>] : note l'upload réussi puis affiche les paramètres Zapier de la prochaine vidéo « rendered »."""
import fcntl, json, subprocess, sys
ST = '/tmp/studio'
with open(f'{ST}/work/registry.lock', 'w') as lk:
    fcntl.flock(lk, fcntl.LOCK_EX)
    r = json.load(open(f'{ST}/youtube-registry.json')); V = r['videos']
    if len(sys.argv) == 3:
        V[sys.argv[1]].update(status='uploaded', youtube_id=sys.argv[2], note='Zapier 5 oct.')
        json.dump(r, open(f'{ST}/youtube-registry.json', 'w'), ensure_ascii=False, indent=1)
R = [k for k, v in V.items() if v['status'] == 'rendered']
print('reste', len(R))
if R:
    k = R[0]; m = json.loads(subprocess.check_output(['python3', f'{ST}/yt_meta.py', k], cwd=ST))
    sub = 'services' if V[k]['kind'] == 'service' else 'guides'
    print(k); print(json.dumps({"title": m['title'], "description": m['description'],
        "video": f"https://raw.githubusercontent.com/skamer666/Falx/reels-media/youtube/{sub}/{k}.mp4", "privacy_status": "public",
        "tags": m['tags'], "category_id": "27", "default_language": "fr", "default_audio_language": "fr", "made_for_kids": False,
        "notify_subscribers": False, "embeddable": True, "public_stats_viewable": True, "license": "youtube"}, ensure_ascii=False))
