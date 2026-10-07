"""Assemble a reel project from its spec: index.html (1080x1920), timing, sfx cues, post texts.

usage: python3 build.py <work_dir> <spec.py>     (after voice.py)
Spec module provides:
  VO      the full voice-over text (one take, no blanks)
  META    dict: id, title, caption, yt_title, tags, music (preset), genome {...}
  CSS     reel-specific CSS
  body(w) -> HTML (elements with data-fx and GLOBAL data-at times; use w.a("phrase"), w.e("phrase"))
  SCRIPT  optional JS (use R.on(t => …) for custom animation)
  TAIL    seconds after the last word (default 1.4)
"""
import importlib.util
import json
import os
import re
import shutil
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import mascot  # noqa: E402

W_, H_ = 1080, 1920


def norm(w):
    return re.sub(r"[^\wÀ-ÿ'’-]", "", w.lower()).replace("’", "'")


class Words:
    def __init__(self, data):
        self.words = data["words"]
        self.vo_dur = data["vo_dur"]
        self.lines = data.get("lines", [])
        self.normed = [norm(w["w"]) for w in self.words]
        self.cursor = 0

    def _find(self, phrase):
        target = [t for t in (norm(x) for x in phrase.split()) if t]
        n = len(target)
        for start in (self.cursor, 0):
            for i in range(start, len(self.words) - n + 1):
                if self.normed[i:i + n] == target:
                    self.cursor = i + 1
                    return i, n
        raise KeyError(f"anchor {phrase!r} not found in VO")

    def a(self, phrase, off=0.0):
        i, _ = self._find(phrase)
        return round(self.words[i]["t0"] + off, 3)

    def e(self, phrase, off=0.0):
        i, n = self._find(phrase)
        return round(self.words[i + n - 1]["t1"] + off, 3)

    def reset(self):
        self.cursor = 0


BASE_CSS = """
@font-face { font-family: "Schibsted Grotesk"; font-weight: 400 900; src: url("assets/fonts/schibsted-grotesk-1789676e.woff2") format("woff2"); }
@font-face { font-family: "Schibsted Grotesk"; font-weight: 400 900; src: url("assets/fonts/schibsted-grotesk-8ba7d713.woff2") format("woff2"); unicode-range: U+0100-02BA, U+1E00-1E9F, U+2020, U+20A0-20C0; }
@font-face { font-family: "Caveat"; font-weight: 400 700; src: url("assets/fonts/caveat.ttf") format("truetype"); }
@font-face { font-family: "Playfair Display"; font-weight: 400 900; src: url("assets/fonts/playfair.ttf") format("truetype"); }
@font-face { font-family: "Press Start 2P"; font-weight: 400; src: url("assets/fonts/pressstart2p.ttf") format("truetype"); }
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 1080px; height: 1920px; overflow: hidden; background: #0a0a0b; }
#root { position: relative; width: 1080px; height: 1920px; overflow: hidden; font-family: "Schibsted Grotesk", sans-serif; color: #f5f5f7; }
#stage { position: absolute; inset: 0; transform-origin: 50% 45%; }
.ab { position: absolute; }
.c { text-align: center; }
.txw { display: inline-block; overflow: hidden; vertical-align: top; padding: 0.06em 0.02em 0.14em; margin: -0.06em -0.02em -0.14em; }
.txwi, .txc { display: inline-block; will-change: transform; }
.cap { position: absolute; left: 50%; top: 1240px; width: 960px; text-align: center; transform: translate(-50%, 0);
  font-size: 82px; font-weight: 800; line-height: 1.05; letter-spacing: -0.02em; z-index: 50; }
.cap .cw { display: inline-block; margin: 0 0.09em; color: #fff; -webkit-text-stroke: 14px #0a0a0b; paint-order: stroke fill; transition: none; }
.cap .cw.now { color: #ffd60a; transform: scale(1.08); }
"""


def main():
    work, spec_path = os.path.abspath(sys.argv[1]), sys.argv[2]
    sp = importlib.util.spec_from_file_location("spec", spec_path)
    spec = importlib.util.module_from_spec(sp)
    sp.loader.exec_module(spec)
    data = json.load(open(os.path.join(work, "assets/words.json")))
    w = Words(data)
    tail = getattr(spec, "TAIL", 1.4)
    total = round(data["vo_dur"] + tail, 3)
    w.total = total
    body = spec.body(w)
    for d in ("fonts", "vendor"):
        shutil.copytree(os.path.join(HERE, d), os.path.join(work, "assets", d), dirs_exist_ok=True)
    for f in ("lib.js", "reel.js"):
        shutil.copy(os.path.join(HERE, f), os.path.join(work, "assets", f))
    for f in getattr(spec, "ASSETS", []):
        shutil.copy(os.path.join(HERE, f), os.path.join(work, "assets", os.path.basename(f)))
    reel = {"words": data["words"], "env": data["env"], "vo_dur": data["vo_dur"], "total": total}
    open(os.path.join(work, "assets/reel-data.js"), "w").write("window.REEL = " + json.dumps(reel, ensure_ascii=False) + ";\n")

    # SFX cues from the markup (+ explicit data-sfx overrides, + spec.SFX list).
    kinds = {"pop": "pop", "stamp": "stamp", "zoom": "impact", "drop": "impact", "rise": "whoosh", "spinin": "whoosh",
             "count": "tick", "type": "type", "shake": "buzz"}
    cues = []
    for m in re.finditer(r'<[^>]*data-fx="(\w+)"[^>]*>', body):
        tag = m.group(0)
        at = re.search(r'data-at="(-?[\d.]+)"', tag)
        if not at:
            continue
        sx = re.search(r'data-sfx="(\w*)"', tag)
        k = sx.group(1) if sx else kinds.get(m.group(1))
        if k and float(at.group(1)) >= 0.05:
            cues.append({"t": float(at.group(1)), "k": k})
    cues += getattr(spec, "SFX", [])
    cues.sort(key=lambda c: c["t"])
    META = spec.META
    json.dump({"total": total, "music": META.get("music", "drive"), "music_gain": META.get("music_gain", 0),
               "sfx": cues, "seed": abs(hash(META["id"])) % 1000, "room": META.get("room", 0), "vo_chain": META.get("vo_chain", False), "mute": META.get("mute", [])},
              open(os.path.join(work, "assets/reel.json"), "w"))

    css = BASE_CSS + mascot.CSS + getattr(spec, "CSS", "")
    script = getattr(spec, "SCRIPT", "")
    index = f"""<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width={W_}, height={H_}">
    <script src="assets/vendor/gsap.min.js"></script>{'<script src="assets/vendor/three.min.js"></script>' if getattr(spec, "USE_THREE", False) else ""}
    <script src="assets/reel-data.js"></script>
    <script src="assets/lib.js"></script>
    <script src="assets/reel.js"></script>
    <style>{css}</style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="{total:.3f}" data-width="{W_}" data-height="{H_}">
      <div id="stage" data-punch="{';'.join(str(x) for x in getattr(spec, 'PUNCH', []))}">
{body}
      </div>
      <div class="cap" id="cap" data-max="{getattr(spec, 'CAP_MAX', 3)}" data-hide="{getattr(spec, 'CAP_HIDE', '')}"></div>
      <audio id="mix" src="assets/mix.wav" data-start="0" data-duration="{total:.3f}" data-track-index="10" data-volume="1"></audio>
    </div>
    <script>
{script}
      window.__timelines = window.__timelines || {{}};
      window.__timelines["main"] = R.start();
    </script>
  </body>
</html>
"""
    open(os.path.join(work, "index.html"), "w").write(index)
    post = {"id": META["id"], "caption": META["caption"], "yt_title": META["yt_title"], "tags": META.get("tags", []),
            "genome": META.get("genome", {}), "total": total, "cover_t": META.get("cover_t", 0.6)}
    json.dump(post, open(os.path.join(work, "post.json"), "w"), ensure_ascii=False, indent=1)
    print(f"build: {total:.1f}s, {len(cues)} sfx cues")


if __name__ == "__main__":
    main()
