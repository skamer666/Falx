/* Shared, deterministic motion helpers. Every function is a pure function of time. */
(function () {
  if (window.TX) return;
  const TX = {};
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  TX.clamp = clamp;
  TX.lerp = (a, b, t) => a + (b - a) * t;
  TX.p = (t, a, b) => {
    if (!isFinite(a)) return a < 0 ? 1 : 0;
    if (b <= a) return t >= a ? 1 : 0;
    return clamp((t - a) / (b - a));
  };
  TX.ease = {
    outCubic: (x) => 1 - Math.pow(1 - x, 3),
    outQuart: (x) => 1 - Math.pow(1 - x, 4),
    outExpo: (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)),
    inCubic: (x) => x * x * x,
    inQuart: (x) => x * x * x * x,
    inExpo: (x) => (x <= 0 ? 0 : Math.pow(2, 10 * x - 10)),
    inOutCubic: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
    inOutSine: (x) => -(Math.cos(Math.PI * x) - 1) / 2,
    inOutExpo: (x) =>
      x <= 0 ? 0 : x >= 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2,
  };

  // Closed-form damped-spring step response (0 -> 1). zeta < 1 gives a light overshoot.
  TX.step = (dt, zeta = 0.72, freq = 2.2) => {
    if (dt <= 0) return 0;
    const w = 2 * Math.PI * freq;
    if (zeta < 1) {
      const wd = w * Math.sqrt(1 - zeta * zeta);
      return 1 - Math.exp(-zeta * w * dt) * (Math.cos(wd * dt) + ((zeta * w) / wd) * Math.sin(wd * dt));
    }
    return 1 - Math.exp(-w * dt) * (1 + w * dt);
  };
  // Sum of step responses, one per target change: keys = [[t0, v0], [t1, v1], ...].
  TX.spring = (t, keys, zeta, freq) => {
    let v = keys[0][1];
    for (let i = 1; i < keys.length; i++) v += (keys[i][1] - keys[i - 1][1]) * TX.step(t - keys[i][0], zeta, freq);
    return v;
  };

  TX.rng = (seed) => {
    let a = seed >>> 0;
    return () => {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  TX.tf = (o) => {
    let s = `translate3d(${o.x || 0}px,${o.y || 0}px,${o.z || 0}px)`;
    if (o.rx) s += ` rotateX(${o.rx}deg)`;
    if (o.ry) s += ` rotateY(${o.ry}deg)`;
    if (o.r) s += ` rotate(${o.r}deg)`;
    if (o.s !== undefined) s += ` scale(${o.s})`;
    if (o.sx !== undefined) s += ` scaleX(${o.sx})`;
    if (o.sy !== undefined) s += ` scaleY(${o.sy})`;
    return s;
  };
  TX.set = (el, o) => {
    el.style.transform = TX.tf(o);
    if (o.o !== undefined) el.style.opacity = clamp(o.o);
  };

  // Split an element's text into masked words: <span.txw><span.txwi>word</span></span>
  TX.words = (el) => {
    // French punctuation (« ? », « : », « ! », « ; », « » ») stays glued to the previous word: never alone on a line.
    const parts = el.textContent.trim().replace(/\s+([?!:;»%])/g, "\u00a0$1").replace(/«\s+/g, "«\u00a0").split(/[ \t\r\n]+/);
    el.textContent = "";
    return parts.map((w, i) => {
      const outer = document.createElement("span");
      outer.className = "txw";
      const inner = document.createElement("span");
      inner.className = "txwi";
      inner.textContent = w;
      outer.appendChild(inner);
      el.appendChild(outer);
      if (i < parts.length - 1) el.appendChild(document.createTextNode(" "));
      return inner;
    });
  };
  TX.chars = (el) => {
    const s = el.textContent;
    el.textContent = "";
    return Array.from(s).map((c) => {
      const span = document.createElement("span");
      span.className = "txc";
      span.textContent = c === " " ? " " : c;
      el.appendChild(span);
      return span;
    });
  };

  // Mask reveal: each word rises from under a cut line at its own time.
  TX.revealWords = (inners, times, t, opts = {}) => {
    const z = opts.zeta ?? 0.78;
    const f = opts.freq ?? 2.6;
    const out = opts.out;
    inners.forEach((el, i) => {
      const ti = times[Math.min(i, times.length - 1)];
      let y = 112 * (1 - TX.step(t - ti, z, f));
      let gone = false;
      if (out !== undefined) {
        y -= 112 * TX.ease.inCubic(TX.p(t, out + i * 0.02, out + i * 0.02 + 0.28));
        gone = t > out + i * 0.02 + 0.3;
      }
      el.style.transform = `translate3d(0,${y}%,0)`;
      el.style.opacity = t < ti - 0.01 || gone ? 0 : 1;
    });
  };

  // Word rotator: one masked line per entry; letters roll up in, then roll out upward.
  TX.rotator = (el, entries) => {
    el.textContent = "";
    const lines = entries.map((e) => {
      const line = document.createElement("span");
      line.className = "txrot-line";
      const chars = Array.from(e.text).map((c) => {
        const s = document.createElement("span");
        s.className = "txc";
        s.textContent = c === " " ? " " : c;
        line.appendChild(s);
        return s;
      });
      el.appendChild(line);
      return { line, chars, e };
    });
    return (t) => {
      lines.forEach(({ chars, e }) => {
        const n = chars.length;
        chars.forEach((c, i) => {
          const tin = e.in + i * (e.stagger ?? 0.022);
          const tout = e.out === undefined ? 1e9 : e.out + i * (e.outStagger ?? 0.01);
          let y = 105 * (1 - TX.step(t - tin, 0.8, 2.8));
          y -= 105 * TX.ease.inCubic(TX.p(t, tout, tout + 0.18));
          const rot = -60 * (1 - TX.step(t - tin, 0.8, 2.8)) + 60 * TX.ease.inCubic(TX.p(t, tout, tout + 0.18));
          c.style.transform = `translate3d(0,${y}%,0) rotateX(${rot}deg)`;
          c.style.opacity = t < tin - 0.01 || t > tout + 0.2 ? 0 : 1;
        });
      });
    };
  };

  // Border beam on an SVG shape with pathLength="1": a bright dash travels the outline.
  TX.beam = (shape, phase, len = 0.14) => {
    shape.style.strokeDasharray = `${len} ${1 - len}`;
    shape.style.strokeDashoffset = `${-(((phase % 1) + 1) % 1)}`;
  };
  // Draw-on stroke for a shape with pathLength="1".
  TX.draw = (shape, p) => {
    shape.style.strokeDasharray = "1 1";
    shape.style.strokeDashoffset = `${1 - clamp(p)}`;
  };

  // Layout-free text measurement: scenes are display:none until their slot, so DOM metrics read 0.
  const mctx = document.createElement("canvas").getContext("2d");
  TX.measure = (text, font, letterSpacing = 0) => {
    mctx.font = font;
    mctx.letterSpacing = letterSpacing + "px";
    return mctx.measureText(text.replace(/ /g, " ")).width;
  };

  // Whip-pan shared by both sides of a cut: rel = time relative to the cut. Peak speed on the cut.
  TX.WHIP = 2200;
  TX.whipU = (rel, half = 0.26) => TX.ease.inOutExpo(TX.p(rel, -half, half));

  // Deterministic typing: first n characters of text at time t.
  TX.typed = (text, t, t0, cps) => text.slice(0, Math.max(0, Math.floor((t - t0) * cps)));

  // Global SFX cue registry (absolute seconds), read back by the audio tools.
  TX.cue = (sceneId, list) => {
    const S = window.TIMING.scenes[sceneId];
    window.__sfxCues = (window.__sfxCues || []).filter((c) => c.scene !== sceneId);
    list.forEach((c) => window.__sfxCues.push({ scene: sceneId, t: +(S.start + c.t).toFixed(4), k: c.k, g: c.g ?? 1 }));
  };

  window.TX = TX;
})();
