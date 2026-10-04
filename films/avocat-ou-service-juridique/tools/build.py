"""Generate the whole project from tools/scenes.py: timing, scene compositions, bg, chrome, index,
SFX cue list, plus the voice-over cue sheet and transcript for the user."""
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import kit  # noqa: E402
from kit import Ctx  # noqa: E402
from scenes import SCENES  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VO_DIR = os.path.join(ROOT, "assets", "vo")
if os.path.exists(os.path.join(VO_DIR, "times.json")):
    kit.VOICE.update(json.load(open(os.path.join(VO_DIR, "times.json"))))
OV = 0.45  # crossfade overlap between consecutive scenes
W, H = 1920, 1080


def tc(t):
    m, s = divmod(t, 60)
    return f"{int(m)}:{s:05.2f}"


def write_voice(built, total):
    """Lay every scene's take at its scene start + VLEAD into one voice track."""
    import numpy as np
    import soundfile as sf
    sr = 48000
    track = np.zeros(int((total + 0.5) * sr), dtype=np.float32)
    for sid, sc, c, html, start, dur, slot in built:
        if not c.voiced:
            continue
        y, _ = sf.read(os.path.join(VO_DIR, kit.VOICE[sc["vo"]]["file"]), dtype="float32")
        i = int(round((start + kit.VLEAD) * sr))
        n = min(len(y), len(track) - i)
        track[i:i + n] += y[:n]
    os.makedirs(os.path.join(ROOT, "assets/audio"), exist_ok=True)
    sf.write(os.path.join(ROOT, "assets/audio/vo.wav"), np.stack([track, track], 1), sr, subtype="PCM_16")


def main():
    timing = {"scenes": {}, "chrome": [], "overlap": OV}
    cursor = 0.0
    built = []
    for i, sc in enumerate(SCENES):
        sid = f"sc{i + 1:02d}"
        c = Ctx(sc["vo"]) if sc["vo"] else Ctx("")
        dur = sc["dur"] or round(c.end + (kit.VTAIL if c.voiced else 0.7), 3)
        html = sc["build"](c)
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
    timing["chromeShow"] = timing["scenes"]["sc05"]["start"]
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
    css = open(os.path.join(ROOT, "tools/engine.css")).read()
    hosts = []
    for sid, sc, c, html, start, dur, slot in built:
        tr = 1 + timing["scenes"][sid]["index"] % 2
        hosts.append(f'<div id="{sid}" data-composition-id="{sid}" data-composition-src="compositions/scenes/{sid}.html" '
                     f'data-start="{start:.4f}" data-duration="{slot:.4f}" data-track-index="{tr}" data-track-kind="graphics" '
                     f'data-width="{W}" data-height="{H}"></div>')
    if kit.VOICE:
        write_voice(built, total)
    audio = []
    for aid, f, tr in (("music", "assets/audio/music.wav", 10), ("sfx", "assets/audio/sfx.wav", 11),
                       ("vo", "assets/audio/vo.wav", 12)):
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
    lines = ["# Feuille de calage — « Avocat ou service juridique externalisé ? »", "",
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
    words_n = sum(len(v["text"].split()) for v in vo)
    print(f"{len(built)} scenes, total {tc(total)} ({total:.1f}s), {words_n} words, {len(cues)} sfx cues")


if __name__ == "__main__":
    main()
