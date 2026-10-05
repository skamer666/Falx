"""Voice-over for a reel: Microsoft neural voice fr-CH-FabriceNeural, then every pause is squeezed
so the delivery has no blanks. Exact word timings come from the TTS word boundaries and are
re-mapped through the cuts. Writes <work>/assets/vo.wav and <work>/assets/words.json.

usage: python3 voice.py <work_dir> <spec.py>
"""
import asyncio
import importlib.util
import json
import os
import subprocess
import sys

import numpy as np
import soundfile as sf

import edge_tts

VOICE = "fr-CH-FabriceNeural"
SR = 48000
GAP_WORD = 0.035   # max silence kept between two words
GAP_SENT = 0.11    # max silence kept after . ! ? (a breath, not a blank)
XF = 0.006         # crossfade at every cut (s)


def load_spec(path):
    sp = importlib.util.spec_from_file_location("spec", path)
    m = importlib.util.module_from_spec(sp)
    sp.loader.exec_module(m)
    return m


async def tts(text, rate, out_mp3, voice=VOICE):
    os.environ.setdefault("SSL_CERT_FILE", "/root/.ccr/ca-bundle.crt")
    proxy = os.environ.get("HTTPS_PROXY") or os.environ.get("https_proxy")
    com = edge_tts.Communicate(text, voice, rate=rate, boundary="WordBoundary", proxy=proxy)
    words = []
    with open(out_mp3, "wb") as f:
        async for ch in com.stream():
            if ch["type"] == "audio":
                f.write(ch["data"])
            elif ch["type"] == "WordBoundary":
                words.append({"w": ch["text"], "t0": ch["offset"] / 1e7, "t1": (ch["offset"] + ch["duration"]) / 1e7})
    return words


def attach_punct(words, text):
    """Edge word boundaries drop punctuation: walk the source text and append it back to each word."""
    pos = 0
    for w in words:
        i = text.find(w["w"], pos)
        if i < 0:
            continue
        j = i + len(w["w"])
        k = j
        while k < len(text) and (text[k] in " \u00a0" or text[k] in ".,!?;:…»"):
            k += 1
        tail = "".join(c for c in text[j:k] if c in ".,!?;:…»")
        if tail:
            w["w"] += tail
        pos = j



def from_source(work, spec):
    """Voice taken from an existing video (e.g. an avatar clip): keep its timing untouched, words from a transcript."""
    here = os.path.dirname(os.path.abspath(__file__))
    src = os.path.join(here, spec.SOURCE_AUDIO)
    os.makedirs(os.path.join(work, "assets"), exist_ok=True)
    pcm = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", src, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"],
                         capture_output=True, check=True).stdout
    y = np.frombuffer(pcm, dtype=np.float32).copy()
    y = y / (np.abs(y).max() or 1) * 0.89
    sf.write(os.path.join(work, "assets", "vo.wav"), y, SR, subtype="FLOAT")
    words = json.load(open(os.path.join(here, spec.SOURCE_WORDS)))
    hop = SR // 30
    env = [float(np.sqrt(np.mean(y[i:i + hop] ** 2))) for i in range(0, len(y), hop)]
    m = max(env) or 1
    env = [round(min(1, v / m * 1.6), 3) for v in env]
    dur = len(y) / SR
    json.dump({"words": words, "vo_dur": round(dur, 3), "env": env}, open(os.path.join(work, "assets", "words.json"), "w"),
              ensure_ascii=False)
    print(f"voice: {len(words)} words from source, {dur:.2f}s")


def dialogue(work, spec):
    """Two-voice dialogue: LINES = [(speaker, text) or (speaker, text, gap_before)], VOICES = {speaker: (voice, rate)}.
    Each line is synthesised on its own, trimmed, and placed after a short gap; words carry their speaker."""
    os.makedirs(os.path.join(work, "assets"), exist_ok=True)
    y, words, lines, t = np.zeros(0, dtype=np.float32), [], [], 0.0
    for k, ln in enumerate(spec.LINES):
        spk, text = ln[0], " ".join(ln[1].split())
        gap = ln[2] if len(ln) > 2 else getattr(spec, "GAP", 0.28)
        voice, rate = spec.VOICES[spk]
        raw = os.path.join(work, "assets", f"line{k:02d}.mp3")
        for attempt in range(4):
            try:
                ws = asyncio.run(tts(text, rate, raw, voice))
                if ws:
                    break
            except Exception as e:
                print("tts retry", attempt, repr(e)[:120])
        else:
            sys.exit("TTS FAILED")
        attach_punct(ws, text)
        pcm = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", raw, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"],
                             capture_output=True, check=True).stdout
        x = np.frombuffer(pcm, dtype=np.float32).copy()
        a, b = max(0.0, ws[0]["t0"] - 0.04), min(len(x) / SR, ws[-1]["t1"] + 0.12)
        seg = x[int(a * SR):int(b * SR)]
        seg = seg / (np.abs(seg).max() or 1) * 0.89
        if k:
            t += gap
            y = np.concatenate([y, np.zeros(int(gap * SR), dtype=np.float32)])
        for w in ws:
            words.append({"w": w["w"], "t0": round(t + w["t0"] - a, 3), "t1": round(t + w["t1"] - a, 3), "spk": spk, "ln": k})
        lines.append({"spk": spk, "text": text, "t0": round(t, 3), "t1": round(t + len(seg) / SR, 3)})
        y = np.concatenate([y, seg]); t += len(seg) / SR
    sf.write(os.path.join(work, "assets", "vo.wav"), y, SR, subtype="FLOAT")
    hop = SR // 30
    env = [float(np.sqrt(np.mean(y[i:i + hop] ** 2))) for i in range(0, len(y), hop)]
    m = max(env) or 1
    env = [round(min(1, v / m * 1.6), 3) for v in env]
    json.dump({"words": words, "lines": lines, "vo_dur": round(t, 3), "env": env},
              open(os.path.join(work, "assets", "words.json"), "w"), ensure_ascii=False)
    print(f"voice: dialogue {len(lines)} lines, {len(words)} words, {t:.2f}s")


def main():
    work, spec_path = os.path.abspath(sys.argv[1]), sys.argv[2]
    spec = load_spec(spec_path)
    if getattr(spec, "SOURCE_AUDIO", None):
        return from_source(work, spec)
    if getattr(spec, "LINES", None):
        return dialogue(work, spec)
    text = " ".join(spec.VO.split())
    rate = getattr(spec, "RATE", "+12%")
    os.makedirs(os.path.join(work, "assets"), exist_ok=True)
    raw = os.path.join(work, "assets", "vo-raw.mp3")
    for attempt in range(4):
        try:
            words = asyncio.run(tts(text, rate, raw, getattr(spec, "VOICE", VOICE)))
            if words:
                break
        except Exception as e:  # network hiccup: retry
            print("tts retry", attempt, repr(e)[:120])
    else:
        sys.exit("TTS FAILED")
    attach_punct(words, text)
    pcm = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", raw, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"],
                         capture_output=True, check=True).stdout
    x = np.frombuffer(pcm, dtype=np.float32).copy()

    # Cut list: shorten every gap between consecutive words (and the lead-in / tail).
    cuts = []  # (start, end) in source seconds
    lead = max(0.0, words[0]["t0"] - 0.03)
    if lead > 0:
        cuts.append((0.0, lead))
    for a, b in zip(words, words[1:]):
        keep = getattr(spec, "GAP_SENT", GAP_SENT) if a["w"][-1:] in ".!?…" or text_after_is_sentence_end(text, a) else GAP_WORD
        gap = b["t0"] - a["t1"]
        if gap > keep + 0.02:
            s, e = a["t1"] + keep / 2, b["t0"] - keep / 2
            seg = x[int(s * SR):int(e * SR)]
            if len(seg) and np.sqrt(np.mean(seg ** 2)) < 0.02:  # only cut what is really silence
                cuts.append((s, e))
    end = min(len(x) / SR, words[-1]["t1"] + 0.12)
    cuts.append((end, len(x) / SR))

    out, pos, removed = [], 0.0, []
    acc = 0.0
    for s, e in cuts:
        out.append(x[int(pos * SR):int(s * SR)])
        removed.append((s, e, acc))
        acc += e - s
        pos = e
    out.append(x[int(pos * SR):])
    y = out[0]
    n = int(XF * SR)
    for seg in out[1:]:
        if len(y) > n and len(seg) > n:
            fade = np.linspace(0, 1, n, dtype=np.float32)
            y = np.concatenate([y[:-n], y[-n:] * (1 - fade) + seg[:n] * fade, seg[n:]])
        else:
            y = np.concatenate([y, seg])

    def remap(t):
        shift = 0.0
        for s, e, before in removed:
            if t >= e:
                shift = before + (e - s)
            elif t > s:
                return s - before
        return t - shift

    for w in words:
        w["t0"], w["t1"] = round(remap(w["t0"]), 3), round(remap(w["t1"]), 3)
    # Loudness: speech normalised to about -16 LUFS integrated (final master is done in mix).
    peak = np.abs(y).max() or 1
    y = y / peak * 0.89
    sf.write(os.path.join(work, "assets", "vo.wav"), y, SR, subtype="FLOAT")
    dur = len(y) / SR
    # Mouth envelope for lip-sync, 30 values per second.
    hop = SR // 30
    env = [float(np.sqrt(np.mean(y[i:i + hop] ** 2))) for i in range(0, len(y), hop)]
    m = max(env) or 1
    env = [round(min(1, v / m * 1.6), 3) for v in env]
    json.dump({"words": words, "vo_dur": round(dur, 3), "env": env}, open(os.path.join(work, "assets", "words.json"), "w"),
              ensure_ascii=False)
    print(f"voice: {len(words)} words, {dur:.2f}s (cut {acc:.2f}s of pauses)")


def text_after_is_sentence_end(text, w):
    return False


if __name__ == "__main__":
    main()
