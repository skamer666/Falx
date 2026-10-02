/* Reel runtime: one global clock t (seconds). Everything is a pure function of t (seekable).
   - [data-fx] elements: same vocabulary as the film engine (rise, pop, stamp, words, draw, width,
     count, type, pulse, float…) with GLOBAL times in data-at / data-out.
   - #cap: word-by-word captions driven by window.REEL.words.
   - .mascot[data-talk]: mouth follows the voice envelope, eyes blink, head bobs; arm poses from
     data-arml / data-armr = "t:deg;t:deg" (spring-interpolated).
   - R.on(fn): custom per-reel animation hooks, fn(t). R.punch(t): camera punch times.          */
(function () {
  const TX = window.TX, E = TX.ease, P = TX.p, RE = window.REEL;
  const num = (el, k, d) => (el.dataset[k] !== undefined ? parseFloat(el.dataset[k]) : d);
  const hooks = [];
  const R = (window.R = { on: (f) => hooks.push(f), hits: [], t: 0,
    at: (i) => RE.words[i].t0, env: (t) => { const i = Math.floor(t * 30); return t < 0 || t > RE.vo_dur ? 0 : RE.env[Math.min(i, RE.env.length - 1)] || 0; } });

  function prep(el) {
    const fx = el.dataset.fx;
    const a = num(el, "at", 0);
    const s = { el, fx, a, d: num(el, "d", 0.6), out: num(el, "out", NaN), dx: num(el, "dx", 0), dy: num(el, "dy", 60),
      base: el.style.transform || "" };
    if (fx === "words") { s.inners = TX.words(el); const st = num(el, "st", 0.04); s.times = s.inners.map((_, i) => a + i * st); }
    else if (fx === "count") { s.from = num(el, "from", 0); s.to = num(el, "to", 0); s.pre = el.dataset.pre || ""; s.suf = el.dataset.suf || ""; }
    else if (fx === "type") { s.text = el.textContent; s.cps = num(el, "cps", 30); el.textContent = ""; }
    return s;
  }
  function apply(s, t) {
    const el = s.el, a = s.a;
    let o = 1, x = 0, y = 0, sc = 1, rot = num(el, "rot", 0) * 0;
    switch (s.fx) {
      case "rise": { const k = TX.step(t - a, 0.75, 3.4); o = P(t, a, a + 0.12); x = s.dx * (1 - k); y = (s.dx ? 0 : s.dy) * (1 - k); break; }
      case "drop": { const k = TX.step(t - a, 0.55, 2.8); o = P(t, a, a + 0.06); y = -900 * (1 - k); break; }
      case "fade": o = E.outCubic(P(t, a, a + s.d)); break;
      case "pop": { const k = TX.step(t - a, 0.5, 3.4); o = P(t, a, a + 0.06); sc = Math.max(0, 0.3 + 0.7 * k); break; }
      case "zoom": { const k = TX.step(t - a, 0.6, 2.6); o = P(t, a, a + 0.05); sc = 3 - 2 * k; break; }
      case "stamp": { const k = TX.step(t - a, 0.45, 4.2); o = P(t, a, a + 0.05); sc = 2.2 - 1.2 * k; rot = num(el, "rot", -8); break; }
      case "spinin": { const k = TX.step(t - a, 0.6, 2.4); o = P(t, a, a + 0.08); rot = -180 * (1 - k); sc = k; break; }
      case "words": TX.revealWords(s.inners, s.times, t, { zeta: 0.7, freq: 3.6 }); break;
      case "draw": TX.draw(el, E.inOutCubic(P(t, a, a + s.d))); o = t >= a ? 1 : 0; break;
      case "width": el.style.transform = `${s.base} scaleX(${E.outQuart(P(t, a, a + s.d))})`; o = t >= a ? 1 : 0; break;
      case "height": el.style.transform = `${s.base} scaleY(${E.outQuart(P(t, a, a + s.d))})`; o = t >= a ? 1 : 0; break;
      case "count": { const u = E.outCubic(P(t, a, a + s.d)); el.textContent = s.pre + Math.round(TX.lerp(s.from, s.to, u)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'") + s.suf; o = P(t, a, a + 0.1); break; }
      case "type": el.textContent = TX.typed(s.text, t, a, s.cps); o = t >= a ? 1 : 0; break;
      case "pulse": { const ph = (((t - a) % 1.2) + 1.2) % 1.2 / 1.2; sc = 1 + 0.06 * Math.sin(ph * Math.PI * 2); o = t >= a ? 1 : 0; break; }
      case "float": y = Math.sin((t + a) * 1.6) * 14; o = t >= a ? 1 : 0; break;
      case "shake": { const k = Math.exp(-(t - a) * 6) * (t >= a ? 1 : 0); x = Math.sin(t * 90) * 18 * k; o = t >= a ? 1 : 0; break; }
      case "none": o = t >= a ? 1 : 0; break;
    }
    if (!isNaN(s.out)) { const u = E.inCubic(P(t, s.out, s.out + 0.25)); o *= 1 - u; sc *= 1 - 0.15 * u; }
    if (!["width", "height", "words", "draw", "type"].includes(s.fx))
      el.style.transform = `${s.base} translate3d(${x}px,${y}px,0) rotate(${rot}deg) scale(${sc})`;
    if (s.fx !== "words") el.style.opacity = Math.max(0, Math.min(1, o));
    else if (!isNaN(s.out)) el.style.opacity = 1 - E.inCubic(P(t, s.out, s.out + 0.25));
  }

  // Captions: chunks of up to N words, broken on punctuation; active word highlighted.
  function capChunks(maxW) {
    const ws = RE.words, out = [];
    let cur = [];
    ws.forEach((w, i) => {
      cur.push(i);
      const end = /[.,!?;:…]$/.test(w.w) || cur.length >= maxW || (ws[i + 1] && ws[i + 1].t0 - w.t1 > 0.25);
      if (end) { out.push(cur); cur = []; }
    });
    if (cur.length) out.push(cur);
    return out.map((idx) => ({ idx, t0: ws[idx[0]].t0, t1: ws[idx[idx.length - 1]].t1 }));
  }
  function capInit(el) {
    const chunks = capChunks(num(el, "max", 3));
    const hide = (el.dataset.hide || "").split(";").filter(Boolean).map((r) => r.split(",").map(parseFloat));
    return { el, chunks, hide, last: -2 };
  }
  function capRender(c, t) {
    let k = -1;
    for (let i = 0; i < c.chunks.length; i++) if (t >= c.chunks[i].t0 - 0.05) k = i;
    if (k >= 0 && t > c.chunks[k].t1 + 0.6 && (k === c.chunks.length - 1)) k = -1;
    const hidden = c.hide.some(([a, b]) => t >= a && t < b);
    if (k !== c.last) {
      c.last = k;
      c.el.innerHTML = k < 0 ? "" : c.chunks[k].idx.map((i) => `<span class="cw" data-i="${i}">${RE.words[i].w.replace(/([^\s])([?!:;»])$/, "$1 $2")}</span>`).join(" ");
      c.spans = Array.from(c.el.querySelectorAll(".cw"));
    }
    c.el.style.opacity = hidden ? 0 : 1;
    if (k < 0) return;
    const ch = c.chunks[k];
    const pop = TX.step(t - ch.t0 + 0.05, 0.55, 4);
    c.el.style.transform = `translate(-50%,0) scale(${0.85 + 0.15 * pop})`;
    c.spans.forEach((sp) => {
      const w = RE.words[+sp.dataset.i];
      sp.classList.toggle("on", t >= w.t0 - 0.02);
      sp.classList.toggle("now", t >= w.t0 - 0.02 && t < w.t1 + 0.05);
    });
  }

  function keys(str) { return (str || "").split(";").filter(Boolean).map((p) => p.split(":").map(parseFloat)); }
  function mascotInit(el) {
    const id = el.id;
    return { el, head: document.getElementById(id + "-h"), eyes: document.getElementById(id + "-e"), mo: document.getElementById(id + "-mo"),
      mc: document.getElementById(id + "-mc"), al: document.getElementById(id + "-al"), ar: document.getElementById(id + "-ar"),
      bl: document.getElementById(id + "-bl"), br: document.getElementById(id + "-br"),
      kl: keys(el.dataset.arml), kr: keys(el.dataset.armr), kb: keys(el.dataset.brow), talk: el.dataset.talk !== undefined,
      seed: (id.charCodeAt(id.length - 1) || 1) * 0.37 };
  }
  function springKeys(k, t, def) { if (!k.length) return def; return TX.spring(t, [[-1, k[0][1]], ...k], 0.6, 1.6); }
  function mascotRender(m, t) {
    const e = m.talk ? R.env(t) : 0;
    const open = Math.min(1, e * 1.25);
    if (m.mo) { m.mo.style.transform = `scaleY(${0.05 + open})`; m.mo.style.opacity = open > 0.08 ? 1 : 0; }
    if (m.mc) m.mc.style.opacity = open > 0.08 ? 0 : 1;
    const bt = (t + m.seed) % 3.3;
    const blink = bt < 0.12 ? 1 - Math.sin((bt / 0.12) * Math.PI) : 1;
    if (m.eyes) m.eyes.style.transform = `scaleY(${Math.max(0.08, blink)})`;
    if (m.head) m.head.style.transform = `rotate(${Math.sin(t * 2.1 + m.seed) * 2.2 + e * 3}deg) translateY(${-e * 6}px)`;
    if (m.al) m.al.style.transform = `rotate(${springKeys(m.kl, t, 0)}deg)`;
    if (m.ar) m.ar.style.transform = `rotate(${springKeys(m.kr, t, 0)}deg)`;
    const b = springKeys(m.kb, t, 0);
    if (m.bl) m.bl.style.transform = `translateY(${-b}px) rotate(${-b * 0.4}deg)`;
    if (m.br) m.br.style.transform = `translateY(${-b}px) rotate(${b * 0.4}deg)`;
  }

  R.start = function () {
  const items = Array.from(document.querySelectorAll("[data-fx]")).map(prep);
  const caps = Array.from(document.querySelectorAll(".cap")).map(capInit);
  const mascots = Array.from(document.querySelectorAll(".mascot")).map(mascotInit);
  const stage = document.getElementById("stage");
  const punches = (stage && stage.dataset.punch ? stage.dataset.punch.split(";").filter(Boolean).map(parseFloat) : []);

  function render(t) {
    R.t = t;
    let p = 0;
    punches.forEach((h) => { if (t >= h) p += Math.exp(-(t - h) * 9) * (1 - Math.exp(-(t - h) * 50)); });
    if (stage) stage.style.transform = `scale(${1 + 0.035 * Math.min(1, p)})`;
    items.forEach((s) => apply(s, t));
    mascots.forEach((m) => mascotRender(m, t));
    hooks.forEach((f) => f(t));
    caps.forEach((c) => capRender(c, t));
  }
  const clock = { t: 0 };
  const tl = gsap.timeline({ paused: true });
  tl.to(clock, { t: RE.total, duration: RE.total, ease: "none" }, 0);
  tl.eventCallback("onUpdate", () => render(clock.t));
  window.__timelines = window.__timelines || {};
  window.__timelines["main"] = tl;
  render(0);
  return tl;
  };
})();
