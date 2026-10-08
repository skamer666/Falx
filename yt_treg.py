"""Upload the next YouTube service/guide videos through treg (connected YouTube account), one at a time.
usage: python3 yt_treg.py [max]   -> uploads up to <max> 'rendered' videos, records youtube_id, stops at the first refusal.
Owner rule (8 oct.): while YouTube refuses (uploadLimitExceeded), try only once a day; once an upload goes
through again, resume every hourly pass until the next refusal. State in work/yt_block.json."""
import datetime as dt, fcntl, json, os, subprocess, sys
import requests

sys.path.insert(0, "/tmp/studio/reels/pub")
import treg_pub as T  # noqa: E402

ST = "/tmp/studio"
MAX = int(sys.argv[1]) if len(sys.argv) > 1 else 1
BLOCK = f"{ST}/work/yt_block.json"
RETRY_H = 23.5  # hourly routine: the pass ~24 h after a refusal gets the day's single attempt
now = dt.datetime.now(dt.timezone.utc)

if os.path.exists(BLOCK):
    since = dt.datetime.fromisoformat(json.load(open(BLOCK))["refused_at"])
    if now - since < dt.timedelta(hours=RETRY_H):
        nxt = since + dt.timedelta(hours=RETRY_H)
        print("BLOCKED", f"dernier refus {since:%d.%m %H:%M} UTC, prochain essai après {nxt:%d.%m %H:%M} UTC"); sys.exit(0)


def registry(update=None):
    with open(f"{ST}/work/registry.lock", "w") as lk:
        fcntl.flock(lk, fcntl.LOCK_EX)
        r = json.load(open(f"{ST}/youtube-registry.json"))
        if update:
            update(r["videos"])
            json.dump(r, open(f"{ST}/youtube-registry.json", "w"), ensure_ascii=False, indent=1)
        return r["videos"]


done = 0
while done < MAX:
    V = registry()
    todo = [k for k, v in V.items() if v["status"] == "rendered"]
    if not todo:
        print("NOTHING LEFT"); break
    k = todo[0]
    m = json.loads(subprocess.check_output(["python3", f"{ST}/yt_meta.py", k], cwd=ST))
    mp4 = f"{ST}/work/_out/{k}/{k}.mp4"
    if not os.path.exists(mp4):
        sub = "services" if V[k]["kind"] == "service" else "guides"
        url = f"https://raw.githubusercontent.com/skamer666/Falx/reels-media/youtube/{sub}/{k}.mp4"
        os.makedirs(os.path.dirname(mp4), exist_ok=True)
        with requests.get(url, stream=True, timeout=300) as r:
            r.raise_for_status()
            with open(mp4, "wb") as f:
                for ch in r.iter_content(1 << 20):
                    f.write(ch)
    try:
        res = T.youtube(mp4, m["title"], m["description"], m["tags"])
    except Exception as e:
        print("REFUSED", k, str(e)[:400])
        if "uploadLimitExceeded" in str(e):
            json.dump({"refused_at": now.isoformat(), "slug": k}, open(BLOCK, "w"))
        break
    if os.path.exists(BLOCK):
        os.remove(BLOCK)
    vid = res.get("id")
    registry(lambda VV: VV[k].update(status="uploaded", youtube_id=vid, note=f"uploadé via treg le {now:%d.%m.%Y}"))
    print("UPLOADED", k, f"https://www.youtube.com/watch?v={vid}", flush=True)
    done += 1
