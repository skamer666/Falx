"""Music bed + sound effects + final mix for a reel (all procedural, no licensed audio).

usage: python3 music.py <work_dir>   (needs assets/vo.wav, assets/reel.json written by build.py)
Writes assets/mix.wav (voice + music + sfx, mastered around -14 LUFS).
"""
import json
import os
import sys

import numpy as np
import pyloudnorm as pyln
import soundfile as sf
from scipy.signal import butter, fftconvolve, sosfilt

SR = 48000
WORK = os.path.abspath(sys.argv[1])
CFG = json.load(open(os.path.join(WORK, "assets/reel.json")))
TOTAL = CFG["total"]
N = int(TOTAL * SR)
rng = np.random.default_rng(CFG.get("seed", 7))
meter = pyln.Meter(SR)


def lp(x, fc, o=2): return sosfilt(butter(o, min(fc, SR / 2 - 100), "low", fs=SR, output="sos"), x)
def hp(x, fc, o=2): return sosfilt(butter(o, fc, "high", fs=SR, output="sos"), x)
def bp(x, lo, hi, o=2): return sosfilt(butter(o, [lo, hi], "band", fs=SR, output="sos"), x)
def tt(d): return np.arange(int(d * SR)) / SR
def mtof(m): return 440.0 * 2 ** ((m - 69) / 12)


def add(buf, sig, t0, pan=0.0, gain=1.0):
    i0 = int(round(t0 * SR))
    if sig.ndim == 1:
        sig = np.stack([sig * np.sqrt(0.5 * (1 - pan)), sig * np.sqrt(0.5 * (1 + pan))], 1) * np.sqrt(2)
    s0 = max(0, -i0); i0 = max(0, i0)
    n = min(len(sig) - s0, len(buf) - i0)
    if n > 0:
        buf[i0:i0 + n] += sig[s0:s0 + n] * gain


def reverb(buf, wet=0.25, dur=1.8, decay=3.0):
    r = np.random.default_rng(3); t = tt(dur)
    ir = np.stack([r.standard_normal(len(t)), r.standard_normal(len(t))], 1) * np.exp(-t * decay)[:, None]
    ir /= np.sqrt((ir ** 2).sum(0).mean())
    out = np.zeros_like(buf)
    for c in range(2):
        out[:, c] = fftconvolve(buf[:, c], ir[:, c])[: len(buf)]
    return buf + out * wet


def saw(f, t, harm=16):
    k = np.arange(1, harm + 1)[:, None]
    return (np.sin(2 * np.pi * f * k * t[None, :]) / k).sum(0) * 0.6


def kick(gain=0.6):
    t = tt(0.35); f = 45 + 110 * np.exp(-t * 35)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9) * gain


def snare(gain=0.3):
    t = tt(0.22)
    return (bp(rng.standard_normal(len(t)), 1200, 6000) * np.exp(-t * 22) + np.sin(2 * np.pi * 190 * t) * np.exp(-t * 30) * 0.5) * gain


def hat(gain=0.1, open_=False):
    t = tt(0.25 if open_ else 0.05)
    return hp(rng.standard_normal(len(t)), 8000) * np.exp(-t * (14 if open_ else 90)) * gain


PRESETS = {
    "drive":   dict(bpm=124, chords=[(45, [57, 60, 64]), (41, [57, 60, 65]), (48, [55, 60, 64]), (43, [55, 59, 62])], groove="four", cut=2200),
    "tension": dict(bpm=96,  chords=[(40, [52, 55, 59]), (40, [52, 55, 60]), (38, [50, 53, 57]), (39, [51, 55, 58])], groove="heart", cut=900),
    "lofi":    dict(bpm=84,  chords=[(38, [53, 57, 60, 64]), (43, [53, 57, 59, 64]), (36, [52, 55, 59, 62]), (45, [52, 55, 60, 64])], groove="lofi", cut=1400),
    "epic":    dict(bpm=100, chords=[(41, [53, 57, 60]), (43, [55, 59, 62]), (45, [57, 60, 64]), (40, [55, 59, 64])], groove="epic", cut=2600),
    "bounce":  dict(bpm=112, chords=[(48, [60, 64, 67]), (45, [60, 64, 69]), (41, [60, 65, 69]), (43, [59, 62, 67])], groove="bounce", cut=3000),
}


def music(preset):
    P = PRESETS[preset]
    beat = 60 / P["bpm"]; bar = 4 * beat
    L = np.zeros((N + SR * 2, 2)); D = np.zeros_like(L)
    for b in range(int(TOTAL / bar) + 1):
        t0 = b * bar; root, notes = P["chords"][b % 4]; t = tt(bar + 0.3)
        pad = np.zeros((len(t), 2))
        for m in notes:
            pad[:, 0] += saw(mtof(m) * 1.004, t); pad[:, 1] += saw(mtof(m) * 0.996, t)
        env = np.minimum(1, t / 0.08) * np.clip((bar + 0.3 - t) / 0.3, 0, 1)
        for c in range(2):
            pad[:, c] = lp(pad[:, c], P["cut"], 4) * env
        add(L, pad * 0.035, t0)
        for q in range(8 if P["groove"] in ("four", "bounce") else 4):
            step = bar / (8 if P["groove"] in ("four", "bounce") else 4)
            tq = tt(step * 0.9)
            bass = np.sin(2 * np.pi * mtof(root) * tq) + 0.3 * np.sin(4 * np.pi * mtof(root) * tq)
            add(L, bass * np.minimum(1, tq / 0.005) * np.exp(-tq * 5) * 0.16, t0 + q * step)
    nb = int(TOTAL / beat) + 1
    g = P["groove"]
    for i in range(nb):
        tb = i * beat
        if g == "four":
            add(D, kick(0.55), tb); add(D, hat(0.09), tb + beat / 2, 0.3)
            if i % 2: add(D, snare(0.22), tb)
        elif g == "heart":
            if i % 2 == 0: add(D, kick(0.5), tb); add(D, kick(0.32), tb + 0.22)
            add(D, hat(0.05), tb, -0.2)
        elif g == "lofi":
            if i % 4 in (0, 2) or i % 8 == 7: add(D, kick(0.45), tb)
            if i % 2: add(D, snare(0.2), tb)
            add(D, hat(0.06), tb, 0.2); add(D, hat(0.04), tb + beat * 0.62, -0.2)
        elif g == "epic":
            if i % 4 == 0: add(D, kick(0.7), tb)
            if i % 4 == 2: add(D, snare(0.3), tb)
            add(D, hat(0.05), tb + beat / 2)
        elif g == "bounce":
            if i % 2 == 0 or i % 8 == 7: add(D, kick(0.5), tb)
            if i % 2: add(D, snare(0.24), tb)
            for h in (0, 0.5): add(D, hat(0.07), tb + h * beat, 0.25 if h else -0.25)
    if g == "lofi":
        L += rng.standard_normal(L.shape) * 0.004  # vinyl hiss
    out = reverb(L, 0.25) + D
    out = out[:N]
    t = np.arange(N) / SR
    fade = np.minimum(1, t / 0.3) * np.clip((TOTAL - t) / 1.2, 0, 1)
    return out * fade[:, None]


def sfx_make(kind):
    r = rng
    if kind == "pop":
        t = tt(0.15); f = 300 + 900 * np.exp(-t * 40)
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.minimum(1, t / 0.003) * np.exp(-t * 22) * 0.6
    if kind == "tick":
        t = tt(0.05); return np.sin(2 * np.pi * 3200 * t) * np.exp(-t * 130) * 0.35
    if kind == "whoosh":
        t = tt(0.45); n = bp(r.standard_normal(len(t)), 500, 6000)
        return n * np.sin(np.pi * t / 0.45) ** 2 * 0.35
    if kind == "impact":
        t = tt(1.2); s = np.sin(2 * np.pi * np.cumsum(38 + 90 * np.exp(-t * 18)) / SR) * np.exp(-t * 4)
        s += lp(r.standard_normal(len(t)), 2500) * np.exp(-t * 12) * 0.5
        return s * 0.9
    if kind == "stamp":
        t = tt(0.4); s = np.sin(2 * np.pi * np.cumsum(110 + 200 * np.exp(-t * 50)) / SR) * np.exp(-t * 15)
        return (s + bp(r.standard_normal(len(t)), 600, 3500) * np.exp(-t * 50) * 0.6) * 0.75
    if kind == "type":
        out = np.zeros(int(0.5 * SR))
        for k in range(8):
            t = tt(0.03); i = int(k * 0.06 * SR)
            out[i:i + len(t)] += hp(r.standard_normal(len(t)), 2500) * np.exp(-t * 200) * 0.4
        return out
    if kind == "riser":
        t = tt(1.0); n = bp(r.standard_normal(len(t)), 800, 9000)
        return n * (t / 1.0) ** 2 * 0.35
    if kind == "ding":
        t = tt(0.9); return (np.sin(2 * np.pi * 1318 * t) + 0.5 * np.sin(2 * np.pi * 2637 * t)) * np.exp(-t * 5) * 0.25
    if kind == "buzz":
        t = tt(0.4); return np.sign(np.sin(2 * np.pi * 110 * t)) * np.exp(-t * 6) * 0.18
    if kind == "cash":
        t = tt(0.5); return (np.sin(2 * np.pi * 2093 * t) + np.sin(2 * np.pi * 2637 * t)) * np.exp(-t * 9) * 0.25
    raise ValueError(kind)


def main():
    vo, sr = sf.read(os.path.join(WORK, "assets/vo.wav"), dtype="float32")
    assert sr == SR
    vo2 = np.zeros((N, 2)); off = int(CFG.get("vo_start", 0) * SR)
    n = min(len(vo), N - off); vo2[off:off + n, 0] = vo[:n]; vo2[off:off + n, 1] = vo[:n]
    m = music(CFG.get("music", "drive"))
    # Duck the music under the voice.
    env = np.convolve(np.abs(vo2[:, 0]), np.ones(2400) / 2400, mode="same")
    duck = 1 - 0.5 * np.clip(env / (env.max() or 1) * 4, 0, 1)
    duck = np.convolve(duck, np.ones(4800) / 4800, mode="same")
    fx = np.zeros((N + SR * 2, 2)); last = {}
    for c in CFG.get("sfx", []):
        if c["k"] in last and c["t"] - last[c["k"]] < 0.08: continue
        last[c["k"]] = c["t"]
        add(fx, sfx_make(c["k"]), c["t"], pan=float(np.clip(rng.normal(0, 0.2), -0.4, 0.4)), gain=c.get("g", 1))
    fx = fx[:N]

    def norm(x, lufs):
        l = meter.integrated_loudness(x)
        return x * 10 ** ((lufs - l) / 20) if np.isfinite(l) else x
    mix = norm(vo2, -15) + norm(m, -27 + CFG.get("music_gain", 0)) * duck[:, None] + norm(fx, -26)
    from scipy.ndimage import maximum_filter1d, uniform_filter1d
    thr = 10 ** (-1.5 / 20)
    for _ in range(4):  # normalise, then lookahead peak limiter, repeat until both hold
        mix = norm(mix, -14)
        env = maximum_filter1d(np.abs(mix).max(1), size=int(SR * 0.006))
        g = np.minimum(1.0, thr / np.maximum(env, 1e-9))
        g = np.minimum(g, uniform_filter1d(g, size=int(SR * 0.004)))
        g = uniform_filter1d(maximum_filter1d(-g, int(SR * 0.004)) * -1, size=int(SR * 0.004))
        mix = mix * g[:, None]
    mix = np.clip(mix, -thr, thr)
    sf.write(os.path.join(WORK, "assets/mix.wav"), mix.astype(np.float32), SR, subtype="FLOAT")
    print(f"mix {meter.integrated_loudness(mix):.1f} LUFS, peak {20 * np.log10(np.abs(mix).max()):.1f} dBFS, music={CFG.get('music')}")


if __name__ == "__main__":
    main()
