"""Generate the whole project from tools/scenes.py: timing, scene compositions, bg, chrome, index,
SFX cue list, plus the voice-over cue sheet and transcript for the user."""
import json
import os
import re
import sys

import importlib.util
import shutil

SHARED = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, SHARED)
from kit import Ctx  # noqa: E402
import tpl  # noqa: E402

ROOT = os.path.abspath(sys.argv[1])
_spec = importlib.util.spec_from_file_location("spec", os.path.abspath(sys.argv[2]))
SPEC = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(SPEC)
SCENES = tpl.SCENES
META = SPEC.META


def sync_shared():
    """Copy the shared runtime into the project (renders only read files inside it)."""
    for d in ("fonts", "vendor", "img"):
        shutil.copytree(os.path.join(SHARED, d), os.path.join(ROOT, "assets", d), dirs_exist_ok=True)
    for f in ("lib.js", "engine.js"):
        shutil.copy(os.path.join(SHARED, f), os.path.join(ROOT, "assets", f))
    os.makedirs(os.path.join(ROOT, "compositions"), exist_ok=True)
    for f in ("bg.html", "chrome.html"):
        shutil.copy(os.path.join(SHARED, f), os.path.join(ROOT, "compositions", f))
OV = 0.3  # crossfade overlap between consecutive scenes
W, H = 1920, 1080


def tc(t):
    m, s = divmod(t, 60)
    return f"{int(m)}:{s:05.2f}"


def main():
    sync_shared()
    timing = {"scenes": {}, "chrome": [], "overlap": OV}
    cursor = 0.0
    built = []
    for i, sc in enumerate(SCENES):
        sid = f"sc{i + 1:02d}"
        c = Ctx(sc["vo"]) if sc["vo"] else Ctx("")
        dur = sc["dur"] or round(c.end + 0.7, 3)
        html = sc["build"](c)
        # Never leave a scene empty while the voice reaches its first anchor: the earliest
        # element(s) appear right away (text may lead the voice, never lag behind an empty frame).
        ats = [float(x) for x in re.findall(r'data-at="([\d.]+)"', html)]
        if ats and c.words:
            first = min(ats)
            if first > c.times[0] + 0.5:
                html = html.replace(f'data-at="{first}"', f'data-at="{round(c.times[0] + 0.05, 3)}"')
        last = i == len(SCENES) - 1
        slot = dur if last else dur + OV
        timing["scenes"][sid] = {"index": i, "start": round(cursor, 4), "dur": dur, "slot": round(slot, 4), "last": last}
        built.append((sid, sc, c, html, cursor, dur, slot))
        cursor += dur
    total = round(cursor, 3)
    timing["total"] = total

    # Chrome: section label changes + visible window (from the agenda scene to the end card).
    sec = None
    for sid, sc, *_ in built:
        if sc["section"] != sec:
            sec = sc["section"]
            timing["chrome"].append({"t": timing["scenes"][sid]["start"], "label": sec or ""})
    timing["chromeShow"] = timing["scenes"][f"sc{META.get('chrome_from', 2):02d}"]["start"]
    timing["chromeHide"] = timing["scenes"][built[-1][0]]["start"]

    os.makedirs(os.path.join(ROOT, "compositions/scenes"), exist_ok=True)
    for f in os.listdir(os.path.join(ROOT, "compositions/scenes")):
        os.remove(os.path.join(ROOT, "compositions/scenes", f))
    for sid, sc, c, html, start, dur, slot in built:
        doc = f"""<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <template>
      <div id="root" data-composition-id="{sid}" data-width="{W}" data-height="{H}">
        <div class="scn" id="{sid}-s"><div class="cam" id="{sid}-c">{html}</div></div>
      </div>
      <script>TXE.mount("{sid}");</script>
    </template>
  </body>
</html>
"""
        open(os.path.join(ROOT, f"compositions/scenes/{sid}.html"), "w").write(doc)

    # SFX cues straight from the markup: every timed reveal gets a sound matched to its motion.
    kinds = {"rise": "tick", "check": "tick", "pop": "pop", "stamp": "stamp", "count": "count", "draw": "draw",
             "words": None, "width": None, "height": "swell", "type": "type", "cursor": None}
    cues = []
    for sid, sc, c, html, start, dur, slot in built:
        cues.append({"t": round(start, 4), "k": "whoosh", "g": 0.6 if start > 0 else 0})
        for m in re.finditer(r'data-fx="(\w+)" data-at="(-?[\d.]+)"', html):
            fx, at = m.group(1), float(m.group(2))
            k = kinds.get(fx)
            if k and at >= 0.15 and at < dur:
                cues.append({"t": round(start + at, 4), "k": k, "g": 1})
        for m in re.finditer(r'data-click="([\d.;]+)"', html):
            for tcl in m.group(1).split(";"):
                if tcl:
                    cues.append({"t": round(start + float(tcl), 4), "k": "click", "g": 1})
    cues.sort(key=lambda x: x["t"])
    json.dump(cues, open(os.path.join(ROOT, "assets/sfx-cues.json"), "w"))

    vo = []
    for sid, sc, c, html, start, dur, slot in built:
        if sc["vo"]:
            vo.append({"scene": sid, "start": round(start + c.times[0], 3), "end": round(start + c.end, 3), "text": sc["vo"], "section": sc["section"]})
    timing["vo"] = vo
    json.dump(timing, open(os.path.join(ROOT, "assets/timing.json"), "w"), ensure_ascii=False, indent=1)
    open(os.path.join(ROOT, "assets/timing.js"), "w").write("window.TIMING = " + json.dumps(timing, ensure_ascii=False) + ";\n")

    # Index.
    css = open(os.path.join(SHARED, "engine.css")).read()
    hosts = []
    for sid, sc, c, html, start, dur, slot in built:
        tr = 1 + timing["scenes"][sid]["index"] % 2
        hosts.append(f'<div id="{sid}" data-composition-id="{sid}" data-composition-src="compositions/scenes/{sid}.html" '
                     f'data-start="{start:.4f}" data-duration="{slot:.4f}" data-track-index="{tr}" data-track-kind="graphics" '
                     f'data-width="{W}" data-height="{H}"></div>')
    audio = []
    for aid, f, tr in (("music", "assets/audio/music.wav", 10), ("sfx", "assets/audio/sfx.wav", 11)):
        if os.path.exists(os.path.join(ROOT, f)):
            audio.append(f'<audio id="{aid}" src="{f}" data-start="0" data-duration="{total:.3f}" data-track-index="{tr}" data-volume="1"></audio>')
    ind = "\n      "
    index = f"""<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width={W}, height={H}">
    <script src="assets/vendor/gsap.min.js"></script>
    <script src="assets/timing.js"></script>
    <script src="assets/lib.js"></script>
    <script src="assets/engine.js"></script>
    <style>
{css}
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="{total:.3f}" data-width="{W}" data-height="{H}">
      <div id="bg" data-composition-id="bg" data-composition-src="compositions/bg.html" data-start="0" data-duration="{total:.3f}" data-track-index="0" data-track-kind="graphics" data-width="{W}" data-height="{H}"></div>
      {ind.join(hosts)}
      <div id="chrome" data-composition-id="chrome" data-composition-src="compositions/chrome.html" data-start="0" data-duration="{total:.3f}" data-track-index="3" data-track-kind="graphics" data-width="{W}" data-height="{H}"></div>
      {ind.join(audio)}
    </div>
    <script>
      const tl = gsap.timeline({{ paused: true }});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
"""
    open(os.path.join(ROOT, "index.html"), "w").write(index)

    # Deliverables for the voice-over: cue sheet + plain transcript.
    lines = [f"# Feuille de calage — « {META['title']} »", "",
             f"Durée totale de la vidéo : {tc(total)}", "",
             "Chaque passage commence au timecode indiqué. La « fin visée » est le moment où les animations",
             "du passage sont terminées ; tu peux finir un peu avant, mais évite de déborder sur le passage suivant.", ""]
    cur = None
    for v in vo:
        if v["section"] != cur:
            cur = v["section"]
            lines += ["", f"## {cur or 'Accroche'}", ""]
        lines.append(f"**{tc(v['start'])} → {tc(v['end'])}**  ")
        lines.append(v["text"])
        lines.append("")
    open(os.path.join(ROOT, "feuille-de-calage.md"), "w").write("\n".join(lines))
    open(os.path.join(ROOT, "transcription-youtube.txt"), "w").write("\n\n".join(v["text"] for v in vo) + "\n")
    write_youtube(timing, total)
    words_n = sum(len(v["text"].split()) for v in vo)
    print(f"{len(built)} scenes, total {tc(total)} ({total:.1f}s), {words_n} words, {len(cues)} sfx cues")


def write_youtube(timing, total):
    chapters = ["0:00 " + META["chapter0"]]
    for ch in timing["chrome"]:
        if ch["label"] and ch["t"] > 1:
            m, s_ = divmod(int(ch["t"]), 60)
            chapters.append(f"{m}:{s_:02d} " + ch["label"].split("·", 1)[-1].strip())
    links = META.get("links") or [("Le guide complet", META["guide_url"]),
                                  ("Être rappelé gratuitement", "https://thrax-legal.ch/fr/contact")]
    footer = META.get("footer") or ("Thrax Legal, service juridique externalisé à prix fixe pour les indépendants et les PME de Suisse romande. "
                                    "Thrax Legal n’est pas une étude d’avocats et ne représente pas ses clients devant les tribunaux.")
    md = [f"# YouTube — « {META['title']} »", "", "## Titre", META["yt_title"], "", "## Description", "",
          META["yt_intro"], "",
          *[f"👉 {label} : {url}" for label, url in links], "",
          "Chapitres", *chapters, "",
          footer,
          "Informations générales : cette vidéo ne remplace pas un conseil adapté à votre situation.", "",
          "## Tags", ", ".join(META["tags"]), "",
          "## Réglages", "- Langue : français. Sous-titres : importer `transcription-youtube.txt` (synchronisation automatique).",
          "- Écran de fin (dernières secondes) : vidéo « Avocat ou service juridique externalisé ? » + bouton S’abonner.",
          f"- Fiche info : ajouter le lien « {links[0][0]} ».", f"- Durée : {tc(total)}"]
    open(os.path.join(ROOT, "youtube.md"), "w").write("\n".join(md) + "\n")


if __name__ == "__main__":
    main()
