"""Voice-over for a service video: one Vivienne take per scene, with real word times.

usage: python3 engine/voice.py <work_dir> <spec.py>
Writes <work>/assets/vo/scNN.wav (trimmed, normalised) and <work>/assets/vo/times.json:
{ "<scene vo text>": {"times": [...], "ends": [...], "dur": s} } where times are seconds from the
start of the trimmed take, one entry per vo.split() word. kit.Ctx then uses these instead of its
estimate, so every reveal lands on the word and each scene lasts exactly as long as its sentence.
"""
import asyncio
import difflib
import importlib.util
import json
import os
import re
import subprocess
import sys

import numpy as np
import soundfile as sf

SHARED = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, SHARED)
from kit import norm  # noqa: E402

VOICE = os.environ.get("TX_VOICE", "fr-FR-VivienneMultilingualNeural")
RATE = os.environ.get("TX_RATE", "+10%")
SR = 48000
SAY = [  # spoken forms for what the voice reads badly
    (r"thrax-legal\.ch", "thrax tiret legal point c h"),
    (r"\bnLPD\b", "n L P D"), (r"\bLPD\b", "L P D"), (r"\bLP\b", "L P"), (r"\bCO\b", "C O"), (r"\bCC\b", "C C"),
    (r"\bCCT\b", "C C T"), (r"\bTVA\b", "T V A"), (r"\bPME\b", "P M E"), (r"\bCHF\b", "francs"),
    (r"\bAI\b", "A I"), (r"\bIA\b", "I A"), (r"\bRH\b", "R H"), (r"\bCGV\b", "C G V"), (r"\bAPG\b", "A P G"),
    (r"\bAVS\b", "A V S"), (r"\bRGPD\b", "R G P D"), (r"\bCRM\b", "C R M"), (r"\bSIA\b", "S I A"),
    (r"\bss\b", "et suivants"), (r"\bart\.", "article"), (r"\bal\.", "alinéa"),
]


def spoken(text):
    for a, b in SAY:
        text = re.sub(a, b, text)
    return text


async def _tts(text, mp3):
    os.environ.setdefault("SSL_CERT_FILE", "/root/.ccr/ca-bundle.crt")
    proxy = os.environ.get("HTTPS_PROXY") or os.environ.get("https_proxy")
    com = edge_tts.Communicate(text, VOICE, rate=RATE, boundary="WordBoundary", proxy=proxy)
    marks = []
    with open(mp3, "wb") as f:
        async for ch in com.stream():
            if ch["type"] == "audio":
                f.write(ch["data"])
            elif ch["type"] == "WordBoundary":
                marks.append((ch["text"], ch["offset"] / 1e7, (ch["offset"] + ch["duration"]) / 1e7))
    return marks


def tts(text, mp3):
    for k in range(5):
        try:
            marks = asyncio.run(_tts(text, mp3))
            if marks:
                return marks
        except Exception as e:  # network hiccup
            print("retry", k, repr(e)[:90])
    raise RuntimeError("tts failed: " + text[:60])


def load(path):
    pcm = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", path, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(pcm, dtype=np.float32).copy()


def align(words, marks):
    """Map each written word to a (start, end) using the TTS word marks (diff on normalised tokens)."""
    wn = [norm(w) for w in words]
    mn = [norm(m[0]) for m in marks]
    times, ends = [None] * len(words), [None] * len(words)
    sm = difflib.SequenceMatcher(None, wn, mn, autojunk=False)
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "equal":
            for k in range(i2 - i1):
                times[i1 + k], ends[i1 + k] = marks[j1 + k][1], marks[j1 + k][2]
        elif tag == "replace" and j2 > j1:
            # e.g. "CO" -> "C" "O": spread the written words over the spoken span.
            a, b = marks[j1][1], marks[j2 - 1][2]
            n = i2 - i1
            for k in range(n):
                times[i1 + k] = a + (b - a) * k / n
                ends[i1 + k] = a + (b - a) * (k + 1) / n
    # Fill words the voice did not mark (punctuation-only tokens, dashes) from their neighbours.
    for i in range(len(words)):
        if times[i] is None:
            prev = next((ends[j] for j in range(i - 1, -1, -1) if ends[j] is not None), 0.0)
            times[i] = ends[i] = prev
    return times, ends


def main():
    work, spec_path = os.path.abspath(sys.argv[1]), os.path.abspath(sys.argv[2])
    if os.path.basename(spec_path) == "scenes.py":  # stand-alone film with its own tools/ (scenes.py + kit.py)
        sys.path.insert(0, os.path.dirname(spec_path))
        sys.modules.pop("kit", None)
        import scenes
        all_scenes = scenes.SCENES
    else:
        spec = importlib.util.spec_from_file_location("spec", spec_path)
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        import tpl
        all_scenes = tpl.SCENES
    out = os.path.join(work, "assets", "vo")
    os.makedirs(out, exist_ok=True)
    data = {}
    for i, sc in enumerate(all_scenes):
        vo = sc["vo"]
        if not vo or vo in data:
            continue
        mp3 = os.path.join(out, f"sc{i + 1:02d}.mp3")
        marks = tts(spoken(vo), mp3)
        y = load(mp3)
        lead = max(0.0, marks[0][1] - 0.03)  # cut the take's own leading silence
        y = y[int(lead * SR):]
        tail = max(m[2] for m in marks) - lead + 0.12
        y = y[:int(tail * SR)]
        y = y / (np.abs(y).max() or 1) * 0.89
        sf.write(os.path.join(out, f"sc{i + 1:02d}.wav"), y, SR, subtype="PCM_16")
        os.remove(mp3)
        marks = [(t, a - lead, b - lead) for t, a, b in marks]
        times, ends = align(vo.split(), marks)
        data[vo] = {"file": f"sc{i + 1:02d}.wav", "times": [round(x, 3) for x in times],
                    "ends": [round(x, 3) for x in ends], "dur": round(len(y) / SR, 3)}
        print(f"sc{i + 1:02d} {len(y) / SR:5.2f}s  {vo[:70]}")
    json.dump(data, open(os.path.join(out, "times.json"), "w"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    import edge_tts  # noqa: E402
    main()
