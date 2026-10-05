"""Publish a reel through treg (Instagram Reel, TikTok, YouTube) using the team's connected accounts.
usage: python3 treg_pub.py <mp4> <post.json> <public_mp4_url> [ig,tt,yt]"""
import json, os, sys, time
import requests

CFG = json.load(open(os.path.expanduser("~/.treg/config.json")))
H = {"X-Treg-Token": CFG["token"], "X-Treg-Org": CFG.get("active_org") or "thrax-legal"}
V = "/root/.ccr/ca-bundle.crt" if os.path.exists("/root/.ccr/ca-bundle.crt") else True
IG_USER = "17841475597906539"


def call(eid, method="GET", params=None, body=None, raw=False):
    r = requests.request(method, f"https://treg.to/call/{eid}", params=params or {}, json=body, headers=H, verify=V, timeout=180)
    if raw:
        return r
    try:
        d = r.json()
    except Exception:
        d = {"text": r.text[:500]}
    if r.status_code >= 400:
        raise RuntimeError(f"{eid} HTTP {r.status_code}: {json.dumps(d)[:600]}")
    return d


def instagram(mp4_url, caption, cover_ms):
    c = call("instagram.instagram.media.container.create", "POST",
             {"ig_user_id": IG_USER, "media_type": "REELS", "video_url": mp4_url, "caption": caption[:2200], "thumb_offset": cover_ms})
    cid = c["id"]
    for _ in range(60):
        s = call("instagram.instagram.media.container.status", "GET", {"ig_container_id": cid, "fields": "status_code,status"})
        if s.get("status_code") == "FINISHED":
            break
        if s.get("status_code") in ("ERROR", "EXPIRED"):
            raise RuntimeError(f"instagram container {s}")
        time.sleep(10)
    p = call("instagram.instagram.post.publish", "POST", {"ig_user_id": IG_USER, "creation_id": cid})
    return {"id": p.get("id")}


def tiktok(mp4, title, cover_ms):
    size = os.path.getsize(mp4)
    if size <= 64 * 1024 * 1024:
        chunk, n = size, 1
    else:
        chunk = 10 * 1024 * 1024; n = size // chunk
    d = call("tiktok.tiktok.video.publish.init", "POST", body={
        "post_info": {"title": title[:2200], "privacy_level": "PUBLIC_TO_EVERYONE", "disable_comment": False, "disable_duet": False,
                      "disable_stitch": False, "video_cover_timestamp_ms": cover_ms, "is_aigc": False,
                      "brand_content_toggle": False, "brand_organic_toggle": False},
        "source_info": {"source": "FILE_UPLOAD", "video_size": size, "chunk_size": chunk, "total_chunk_count": n}})
    pid, url = d["data"]["publish_id"], d["data"]["upload_url"]
    with open(mp4, "rb") as f:
        for i in range(n):
            start = i * chunk
            end = size - 1 if i == n - 1 else start + chunk - 1
            f.seek(start); part = f.read(end - start + 1)
            r = requests.put(url, data=part, headers={"Content-Type": "video/mp4", "Content-Range": f"bytes {start}-{end}/{size}",
                                                      "Content-Length": str(len(part))}, verify=V, timeout=600)
            if r.status_code not in (200, 201, 206):
                raise RuntimeError(f"tiktok upload chunk {i}: {r.status_code} {r.text[:300]}")
    st = None
    for _ in range(40):
        s = call("tiktok.tiktok.publish.status", "POST", body={"publish_id": pid})
        st = (s.get("data") or {}).get("status")
        if st == "PUBLISH_COMPLETE":
            return {"publish_id": pid, "post_ids": (s.get("data") or {}).get("publicaly_available_post_id")}
        if st == "FAILED":
            raise RuntimeError(f"tiktok publish failed: {s}")
        time.sleep(10)
    return {"publish_id": pid, "status": st}


def youtube(mp4, title, description, tags):
    r = call("youtube.youtube.video.upload", "POST", {"part": "snippet,status", "uploadType": "resumable", "notifySubscribers": "false"},
             {"snippet": {"title": title[:100], "description": description[:5000], "tags": tags, "categoryId": "27",
                          "defaultLanguage": "fr", "defaultAudioLanguage": "fr"},
              "status": {"privacyStatus": "public", "selfDeclaredMadeForKids": False}}, raw=True)
    loc = r.headers.get("Location") or r.headers.get("location")
    if r.status_code >= 400 or not loc:
        raise RuntimeError(f"youtube init {r.status_code}: {r.text[:500]}")
    with open(mp4, "rb") as f:
        up = requests.put(loc, data=f, headers={"Content-Type": "video/mp4"}, verify=V, timeout=900)
    if up.status_code >= 400:
        raise RuntimeError(f"youtube upload {up.status_code}: {up.text[:500]}")
    return {"id": up.json().get("id")}


if __name__ == "__main__":
    mp4, post, url = sys.argv[1], json.load(open(sys.argv[2])), sys.argv[3]
    which = (sys.argv[4] if len(sys.argv) > 4 else "ig,tt,yt").split(",")
    cover = int(float(post.get("cover_t", 0.5)) * 1000)
    out = {}
    for k, fn in (("ig", lambda: instagram(url, post["caption"], cover)), ("tt", lambda: tiktok(mp4, post["caption"], cover)),
                  ("yt", lambda: youtube(mp4, post["yt_title"], post["caption"], post.get("tags", [])))):
        if k in which:
            try:
                out[k] = fn()
            except Exception as e:
                out[k] = {"error": str(e)[:700]}
            print(k, json.dumps(out[k], ensure_ascii=False), flush=True)
    print("RESULT", json.dumps(out, ensure_ascii=False))
