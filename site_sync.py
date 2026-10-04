"""Écrit <site>/src/lib/videos-data.ts depuis youtube-registry.json et crée les affiches auto-hébergées.
usage: python3 site_sync.py /home/user/Falx"""
import json, os, sys
from PIL import Image

ST = os.path.dirname(os.path.abspath(__file__))
SITE = sys.argv[1]
reg = json.load(open(f"{ST}/youtube-registry.json"))
svc, gd, cmp_ = {}, {}, None
for slug, v in sorted(reg["videos"].items()):
    if not v.get("youtube_id") or v["kind"] == "presentation":
        continue
    src = next((p for p in (f"{ST}/livraisons/{slug}/miniature.png", f"{ST}/films/{slug}/miniature.png") if os.path.exists(p)), None)
    sub = {"service": "services", "guide": "guides", "comparison": "guides"}[v["kind"]]
    rel = f"/media/video/{sub}/{slug}.webp"
    dst = SITE + "/public" + rel
    if src and not os.path.exists(dst):
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        Image.open(src).convert("RGB").resize((1280, 720), Image.LANCZOS).save(dst, "WEBP", quality=80)
    if not os.path.exists(dst):
        print("affiche manquante, vidéo ignorée :", slug); continue
    entry = {"id": v["youtube_id"], "poster": rel}
    if v["kind"] == "service":
        svc[v["site_key"]] = entry
    elif v["kind"] == "guide":
        gd[v["site_key"]] = entry
    else:
        cmp_ = entry
    v["status"] = "on_site"
pres = reg["videos"].get("presentation-thrax-legal", {})
fmt = lambda d: "{\n" + "".join(f'  "{k}": {{ id: "{e["id"]}", poster: "{e["poster"]}" }},\n' for k, e in d.items()) + "}"
out = f'''// Généré par video-studio/site_sync.py depuis youtube-registry.json — ne pas modifier à la main.
import type {{ SiteVideo }} from "./videos";

export const SERVICE_VIDEO_DATA: Record<string, SiteVideo> = {fmt(svc)};

export const GUIDE_VIDEO_DATA: Record<string, SiteVideo> = {fmt(gd)};

export const COMPARISON_VIDEO_DATA: SiteVideo | null = {f'{{ id: "{cmp_["id"]}", poster: "{cmp_["poster"]}" }}' if cmp_ else "null"};

export const PRESENTATION_VIDEO_ID = "{pres.get("site_id") or "2A64ZshrWSQ"}";
'''
open(f"{SITE}/src/lib/videos-data.ts", "w").write(out)
json.dump(reg, open(f"{ST}/youtube-registry.json", "w"), ensure_ascii=False, indent=1)
print(f"site : {len(svc)} prestations, {len(gd)} guides, comparaison {'oui' if cmp_ else 'non'}")
