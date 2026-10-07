"""r033 : ralentit la vidéo avatar (voix + lèvres ensemble) et insère des pauses entre les phrases.
Sortie : avatar-rt.mp4 (1080x1920, 30 i/s) + words.json (temps recalés, texte corrigé, mots clés)."""
import json, os, subprocess, re
D = os.path.dirname(os.path.abspath(__file__))
SPEED = 0.95
raw = json.load(open(os.path.join(D, "words_raw.json")))
# 1) fusionner les élisions découpées par whisper (« t » + « 'écris »)
W = []
for w in raw:
    if W and w["w"].startswith("'"):
        W[-1]["w"] += w["w"]; W[-1]["e"] = w["e"]
    else:
        W.append(dict(w))
# 2) corrections de texte (sous-titres)
FIX = {"périen.": "paie rien.", "plein": "Plain", "palais,": "palais,", "1400": "1 400", "viens": "vires", "ont": "auraient",
       "du": "dû", "t'as": "t'as", "copiés.": "copiées.", "visites,": "visite,"}
for i, w in enumerate(W):
    if w["w"] in FIX: w["w"] = FIX[w["w"]]
for i, w in enumerate(W):
    if w["w"] == "Plain" and W[i + 1]["w"] == "palais,":
        w["w"] = "Plainpalais,"; w["e"] = W[i + 1]["e"]; W[i + 1]["drop"] = 1
    if w["w"] == "t'as" and W[i + 1]["w"] == "garantie":
        w["w"] = "ta"
W = [w for w in W if not w.get("drop")]
# 3) pauses après certains mots (index du mot -> secondes)
PAUSE = {"rien.": .32, "balles.": .28, "cherches.": .12, "direct.": .3, "minutes.": .18, "sympa.": .2, "Londres.": .3,
         "bon.": .12, "visite,": .3, "clés.": .25, "sérieux.": .1, "réglé.": .45, "Attends,": .55, "sonner.": .28,
         "prix,": .22, "l'étranger": .22, "visite.": .42, "loyer.": .08, "?": .55, "photos.": .32, "dedans.": .22,
         "copiées.": .45, "signé.": .3}
seen_londres = 0
cuts = []
for i, w in enumerate(W[:-1]):
    key = w["w"]
    if key == "Londres.":
        seen_londres += 1
        g = .3 if seen_londres == 1 else .45
    else:
        g = PAUSE.get(key)
    if g:
        c = round(max(w["e"] + 0.03, (w["e"] + W[i + 1]["s"]) / 2), 3)
        cuts.append((i, c, g))
src = os.path.join(D, "avatar.mp4")
dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", src], capture_output=True, text=True).stdout)
bounds = [0.0] + [c for _, c, _ in cuts] + [dur]
gaps = [g for _, _, g in cuts] + [0.0]
os.makedirs(os.path.join(D, "seg"), exist_ok=True)
lst, t_new, seg_map = [], 0.0, []
for k in range(len(bounds) - 1):
    a, b, g = bounds[k], bounds[k + 1], gaps[k]
    out = os.path.join(D, "seg", f"s{k:02d}.mp4")
    vf = f"trim={a}:{b},setpts=(PTS-STARTPTS)/{SPEED},scale=1080:1920:flags=lanczos,fps=30,tpad=stop_mode=clone:stop_duration={g}"
    af = f"atrim={a}:{b},asetpts=PTS-STARTPTS,atempo={SPEED},apad=pad_dur={g}"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-vf", vf, "-af", af, "-c:v", "libx264", "-crf", "16", "-preset", "medium",
                    "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", out], check=True)
    seg_dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", out], capture_output=True, text=True).stdout)
    seg_map.append((a, b, t_new))
    lst.append(f"file '{out}'")
    t_new += seg_dur
open(os.path.join(D, "seg", "list.txt"), "w").write("\n".join(lst))
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", os.path.join(D, "seg", "list.txt"), "-c", "copy",
                os.path.join(D, "avatar-rt.mp4")], check=True)
def remap(t):
    for a, b, off in seg_map:
        if t <= b + 1e-6: return round(off + (max(t, a) - a) / SPEED, 3)
    return round(seg_map[-1][2] + (t - seg_map[-1][0]) / SPEED, 3)
KEY = {"genève,", "rien.", "plainpalais,", "1", "400", "balles.", "3", "mois", "5", "minutes.", "marc", "londres.", "suisse", "visite,",
       "clés.", "caution", "attends,", "alarmes", "prix,", "l'étranger", "l'argent", "avant", "compte", "bancaire", "nom,", "pire", "photos.",
       "vrais", "gens", "copiées.", "franc", "visité", "signé.", "pote"}
out = []
for w in W:
    o = {"w": w["w"], "t0": remap(w["s"]), "t1": remap(w["e"])}
    if re.sub(r"[^\wÀ-ÿ']", "", w["w"].lower()) in {re.sub(r"[^\wÀ-ÿ']", "", k) for k in KEY}: o["k"] = 1
    out.append(o)
json.dump(out, open(os.path.join(D, "words.json"), "w"), ensure_ascii=False)
print("total", round(t_new, 2), "s ;", len(cuts), "pauses ;", " ".join(x["w"] for x in out))
