"""Procedural music bed + SFX for a film whose voice-over will be recorded later.

The music is mixed low enough (about -27 LUFS) that a voice at -16 LUFS can be laid on top without
remixing. Writes assets/audio/music.wav and assets/audio/sfx.wav (stereo 48 kHz), seeded and
deterministic, plus renders/musique-seule.wav at a louder, standalone level.
"""
import json
import os

import numpy as np
import pyloudnorm as pyln
import soundfile as sf
from scipy.signal import butter, fftconvolve, sosfilt

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SR = 48000
T = json.load(open(os.path.join(ROOT, "assets/timing.json")))
CUES = json.load(open(os.path.join(ROOT, "assets/sfx-cues.json")))
TOTAL = T["total"]
N = int(round(TOTAL * SR))
BPM = 92
BEAT = 60 / BPM
rng = np.random.default_rng(92)
meter = pyln.Meter(SR)


def lp(x, fc, order=2):
    return sosfilt(butter(order, min(fc, SR / 2 - 100), "low", fs=SR, output="sos"), x)


def hp(x, fc, order=2):
    return sosfilt(butter(order, fc, "high", fs=SR, output="sos"), x)


def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], "band", fs=SR, output="sos"), x)


def tt(d):
    return np.arange(int(d * SR)) / SR


def mtof(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def add(buf, sig, t0, pan=0.0, gain=1.0):
    i0 = int(round(t0 * SR))
    if sig.ndim == 1:
        sig = np.stack([sig * np.sqrt(0.5 * (1 - pan)), sig * np.sqrt(0.5 * (1 + pan))], 1) * np.sqrt(2)
    s0 = max(0, -i0)
    i0 = max(0, i0)
    n = min(len(sig) - s0, len(buf) - i0)
    if n > 0:
        buf[i0:i0 + n] += sig[s0:s0 + n] * gain


def reverb(buf, wet=0.25, dur=2.2, decay=2.6, seed=3):
    r = np.random.default_rng(seed)
    t = tt(dur)
    ir = np.stack([r.standard_normal(len(t)), r.standard_normal(len(t))], 1) * np.exp(-t * decay)[:, None]
    ir[:, 0] = lp(ir[:, 0], 5000)
    ir[:, 1] = lp(ir[:, 1], 5000)
    ir /= np.sqrt((ir ** 2).sum(0).mean())
    out = np.zeros_like(buf)
    for c in range(2):
        out[:, c] = fftconvolve(buf[:, c], ir[:, c])[: len(buf)]
    return buf + out * wet


def saw(f, t, harm=20):
    k = np.arange(1, harm + 1)[:, None]
    return (np.sin(2 * np.pi * f * k * t[None, :]) / k).sum(0) * 0.6


# Am9 – Fmaj7 – C/E – G6 : calm, confident, unresolved enough to loop for minutes.
CHORDS = [(45, [57, 60, 64, 71]), (41, [57, 60, 64, 65]), (40, [55, 60, 64, 67]), (43, [55, 59, 62, 64])]


def section_energy():
    """0 = intro/outro (pad only), 1 = body (pulse), 2 = offer/CTA (fuller)."""
    starts = {c["label"]: c["t"] for c in T["chrome"]}
    marks = sorted(starts.values())
    offer = starts.get("06 · L’abonnement", TOTAL)
    first_section = marks[1] if len(marks) > 1 else 0
    end_card = T["chromeHide"]

    def e(t):
        if t < first_section - 2 * BEAT or t >= end_card:
            return 0
        return 2 if t >= offer else 1
    return e, end_card


def music():
    L = np.zeros((N + SR * 3, 2))
    energy, end_card = section_energy()
    bar = 4 * BEAT
    bars = int(np.ceil(TOTAL / bar)) + 1
    for b in range(bars):
        t0 = b * bar
        if t0 >= TOTAL:
            break
        last = t0 + bar >= end_card + bar
        dur = bar + 0.6
        t = tt(dur)
        root, notes = CHORDS[b % 4]
        st = np.zeros((len(t), 2))
        for m in notes:
            f = mtof(m)
            st[:, 0] += saw(f * 1.003, t) + 0.4 * saw(f * 0.5, t, 10)
            st[:, 1] += saw(f * 0.997, t) + 0.4 * saw(f * 0.5 * 1.002, t, 10)
        env = np.minimum(1, t / 0.6) * np.clip((dur - t) / 0.6, 0, 1)
        e = energy(t0)
        cut = (900, 1500, 2200)[e]
        st[:, 0] = lp(st[:, 0], cut, 4) * env
        st[:, 1] = lp(st[:, 1], cut, 4) * env
        add(L, st * 0.05, t0)
        # Sub bass: soft quarter pulses in the body.
        if e >= 1:
            for q in range(4):
                tb = t0 + q * BEAT
                tq = tt(BEAT * 0.9)
                s = np.sin(2 * np.pi * mtof(root) * tq) * np.minimum(1, tq / 0.01) * np.exp(-tq * 2.6)
                add(L, s * (0.16 if e == 1 else 0.2), tb)
        if last:
            break

    drums = np.zeros_like(L)
    beats = int(TOTAL / BEAT)
    for b in range(beats):
        tb = b * BEAT
        e = energy(tb)
        if e == 0:
            continue
        if b % 2 == 0:
            t = tt(0.4)
            f = 46 + 70 * np.exp(-t * 30)
            k = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 8)
            add(drums, k * (0.42 if e == 1 else 0.55), tb)
        for h in (0.5,) if e == 1 else (0.25, 0.5, 0.75):
            t = tt(0.05)
            hat = hp(rng.standard_normal(len(t)), 8000) * np.exp(-t * 80) * 0.12
            add(drums, hat * (1 if h == 0.5 else 0.5), tb + h * BEAT, pan=0.3)
        if e == 2 and b % 4 == 2:
            t = tt(0.25)
            clap = bp(rng.standard_normal(len(t)), 900, 3000) * np.exp(-t * 24) * 0.22
            add(drums, clap, tb)

    # Plucked arpeggio from the offer onwards.
    arp = np.zeros_like(L)
    for s16 in range(int(TOTAL / (BEAT / 2))):
        tb = s16 * BEAT / 2
        if energy(tb) < 2:
            continue
        root, notes = CHORDS[int(tb // bar) % 4]
        m = [notes[0] + 12, notes[2] + 12, notes[1] + 12, notes[3] + 12][s16 % 4]
        t = tt(0.4)
        f = mtof(m)
        s = (np.sin(2 * np.pi * f * t) + 0.3 * np.sin(4 * np.pi * f * t)) * np.exp(-t * 12)
        add(arp, s * 0.045, tb, pan=0.3 if s16 % 2 else -0.3)

    L = reverb(L + arp, 0.3) + drums
    L = L[:N]
    tend = np.arange(N) / SR
    fade = np.minimum(1, tend / 2.0) * np.clip((TOTAL - tend) / 3.0, 0, 1) ** 1.5
    return L * fade[:, None]


def env_ad(t, a, d):
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-np.maximum(t - a, 0) / d)


def sfx_make(kind, r):
    if kind in ("tick", "count"):
        t = tt(0.06)
        f = (3000 if kind == "tick" else 2400) + 300 * r.random()
        s = np.sin(2 * np.pi * f * t) * np.exp(-t * 120) + hp(r.standard_normal(len(t)), 5000) * np.exp(-t * 400) * 0.25
        return s * 0.28, 0.002
    if kind == "click":
        t = tt(0.12)
        s = bp(r.standard_normal(len(t)), 1500, 6000) * np.exp(-t * 260) + np.sin(2 * np.pi * 900 * t) * np.exp(-t * 90) * 0.4
        return s * 0.6, 0.003
    if kind == "pop":
        t = tt(0.16)
        f = 260 + 700 * np.exp(-t * 40)
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * env_ad(t, 0.004, 0.05) * 0.6, 0.008
    if kind == "stamp":
        t = tt(0.4)
        s = np.sin(2 * np.pi * np.cumsum(120 + 180 * np.exp(-t * 50)) / SR) * np.exp(-t * 16)
        s += bp(r.standard_normal(len(t)), 600, 3500) * np.exp(-t * 60) * 0.7
        return s * 0.7, 0.004
    if kind == "type":
        t = tt(0.05)
        s = hp(r.standard_normal(len(t)), 2500) * np.exp(-t * 180) * 0.5
        return s * 0.4, 0.002
    if kind == "draw":
        t = tt(0.6)
        n = bp(r.standard_normal(len(t)), 2500, 7000)
        return n * (0.6 + 0.4 * np.sin(2 * np.pi * 14 * t)) * env_ad(t, 0.08, 0.3) * 0.1, 0.06
    if kind in ("whoosh", "swell"):
        dur, pk = (0.6, 0.33) if kind == "whoosh" else (0.7, 0.55)
        t = tt(dur)
        n = r.standard_normal(len(t))
        out = np.zeros(len(t))
        for i in range(0, len(t), 1200):
            x = t[i] / pk if t[i] < pk else 1 - (t[i] - pk) / (dur - pk)
            fc = 300 + 3600 * max(0, x) ** 1.5
            out[i:i + 1200] = bp(n[i:i + 1200], fc * 0.55, min(fc * 1.6, 20000), 1)
        envl = np.where(t < pk, (t / pk) ** 2.2, np.exp(-(t - pk) / 0.12))
        return out * envl * (0.55 if kind == "whoosh" else 0.35), pk
    raise ValueError(kind)


def sfx():
    buf = np.zeros((N + SR, 2))
    r = np.random.default_rng(7)
    last = {}
    for c in CUES:
        if c["g"] <= 0:
            continue
        if c["k"] in last and c["t"] - last[c["k"]] < 0.09:
            continue
        last[c["k"]] = c["t"]
        s, pk = sfx_make(c["k"], r)
        add(buf, s, c["t"] - pk, pan=float(np.clip(r.normal(0, 0.2), -0.4, 0.4)), gain=c["g"])
    return reverb(buf, 0.15, 1.2, 4.0)[:N]


def norm_to(x, lufs):
    return x * 10 ** ((lufs - meter.integrated_loudness(x)) / 20)


def main():
    os.makedirs(os.path.join(ROOT, "assets/audio"), exist_ok=True)
    os.makedirs(os.path.join(ROOT, "renders"), exist_ok=True)
    m = music()
    fx = sfx()
    sf.write(os.path.join(ROOT, "renders/musique-seule.wav"), norm_to(m, -18).astype(np.float32), SR, subtype="FLOAT")
    m_bed = norm_to(m, -27)
    fx_bed = norm_to(fx, -30)
    sf.write(os.path.join(ROOT, "assets/audio/music.wav"), m_bed.astype(np.float32), SR, subtype="FLOAT")
    sf.write(os.path.join(ROOT, "assets/audio/sfx.wav"), fx_bed.astype(np.float32), SR, subtype="FLOAT")
    mix = m_bed + fx_bed
    print(f"music {meter.integrated_loudness(m_bed):.1f} LUFS | sfx {meter.integrated_loudness(fx_bed):.1f} | "
          f"bed {meter.integrated_loudness(mix):.1f} LUFS, peak {20 * np.log10(np.abs(mix).max()):.1f} dBFS")


if __name__ == "__main__":
    main()
