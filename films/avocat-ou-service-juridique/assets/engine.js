/* Declarative scene animator. Every element carrying data-fx is animated as a pure function of
   scene time, so any frame can be seeked. Attributes:
     data-fx    rise | fade | pop | words | draw | width | height | stamp | count | type | timer |
                spin | pulse | check | float | cursor | none
     data-at    reveal time (s, scene-relative); negative = visible from the first frame
     data-d     duration for draw/width/height/count/type (s)
     data-out   time the element leaves (fade + lift)
     data-dim   time the element dims to data-dimo (default 0.32)
     data-dx / data-dy   entrance offset (px)                                                     */
(function () {
  if (window.TXE) return;
  const TX = window.TX;
  const E = TX.ease;
  const P = TX.p;
  const num = (el, k, d) => (el.dataset[k] !== undefined ? parseFloat(el.dataset[k]) : d);

  function prep(el) {
    const fx = el.dataset.fx;
    const a = num(el, "at", 0);
    const s = { el, fx, a, d: num(el, "d", 0.6), out: num(el, "out", NaN), dim: num(el, "dim", NaN),
      dimo: num(el, "dimo", 0.32), dx: num(el, "dx", 0), dy: num(el, "dy", 34), base: el.style.transform || "" };
    if (fx === "words") {
      s.inners = TX.words(el);
      const st = num(el, "st", 0.055);
      s.times = s.inners.map((_, i) => a + i * st);
    } else if (fx === "count") {
      s.from = num(el, "from", 0);
      s.to = num(el, "to", 0);
      s.pre = el.dataset.pre || "";
      s.suf = el.dataset.suf || "";
    } else if (fx === "type") {
      s.text = el.textContent;
      s.cps = num(el, "cps", 26);
      el.textContent = "";
    } else if (fx === "timer") {
      s.rate = num(el, "rate", 60);
      s.stop = num(el, "stop", 1e9);
      s.base0 = num(el, "base", 0);
    } else if (fx === "spin") {
      s.speed = num(el, "speed", 360);
      s.stop = num(el, "stop", 1e9);
    } else if (fx === "check") {
      s.path = el.querySelector(".chk-path");
    } else if (fx === "cursor") {
      // data-path="t,x,y;t,x,y" — positions in the parent's coordinates; data-click="t;t"
      s.keys = el.dataset.path.split(";").map((k) => k.split(",").map(parseFloat));
      s.clicks = (el.dataset.click || "").split(";").filter(Boolean).map(parseFloat);
    }
    return s;
  }

  const fmt = (v) => Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");

  function interp(keys, t, k) {
    if (t <= keys[0][0]) return keys[0][k];
    for (let i = 1; i < keys.length; i++) {
      if (t <= keys[i][0]) {
        const u = E.inOutCubic(P(t, keys[i - 1][0], keys[i][0]));
        return TX.lerp(keys[i - 1][k], keys[i][k], u);
      }
    }
    return keys[keys.length - 1][k];
  }

  function apply(s, t) {
    const el = s.el;
    const a = s.a;
    let o = 1;
    let x = 0, y = 0, sc = 1, rot = 0;
    const visible = a < 0 || t >= a - 0.001;
    switch (s.fx) {
      case "rise": {
        const k = a < 0 ? 1 : TX.step(t - a, 0.78, 2.3);
        o = a < 0 ? 1 : P(t, a, a + 0.28);
        x = s.dx * (1 - k);
        y = s.dy * (1 - k) * (s.dx ? 0 : 1);
        break;
      }
      case "fade":
        o = a < 0 ? 1 : E.outCubic(P(t, a, a + s.d));
        break;
      case "pop": {
        const k = a < 0 ? 1 : TX.step(t - a, 0.6, 2.5);
        o = a < 0 ? 1 : P(t, a, a + 0.12);
        sc = 0.72 + 0.28 * k;
        break;
      }
      case "stamp": {
        const k = a < 0 ? 1 : TX.step(t - a, 0.52, 3.2);
        o = a < 0 ? 1 : P(t, a, a + 0.07);
        sc = 1.9 - 0.9 * k;
        rot = num(el, "rot", -8);
        break;
      }
      case "words":
        TX.revealWords(s.inners, a < 0 ? s.times.map(() => -1) : s.times, t);
        break;
      case "draw":
        TX.draw(el, a < 0 ? 1 : E.inOutCubic(P(t, a, a + s.d)));
        o = visible ? 1 : 0;
        break;
      case "width":
        el.style.transform = `${s.base} scaleX(${a < 0 ? 1 : E.outQuart(P(t, a, a + s.d))})`;
        o = visible ? 1 : 0;
        break;
      case "height":
        el.style.transform = `${s.base} scaleY(${a < 0 ? 1 : E.outQuart(P(t, a, a + s.d))})`;
        o = visible ? 1 : 0;
        break;
      case "count": {
        const u = a < 0 ? 1 : E.outCubic(P(t, a, a + s.d));
        el.textContent = s.pre + fmt(TX.lerp(s.from, s.to, u)) + s.suf;
        o = a < 0 ? 1 : P(t, a, a + 0.15);
        break;
      }
      case "type":
        el.textContent = a < 0 ? s.text : TX.typed(s.text, t, a, s.cps);
        o = visible ? 1 : 0;
        break;
      case "timer": {
        const run = Math.max(0, Math.min(t, s.stop) - Math.max(a, 0));
        const v = Math.floor(s.base0 + run * s.rate);
        const hh = String(Math.floor(v / 3600)).padStart(2, "0");
        const mm = String(Math.floor(v / 60) % 60).padStart(2, "0");
        const ss = String(v % 60).padStart(2, "0");
        el.textContent = `${hh}:${mm}:${ss}`;
        break;
      }
      case "spin":
        rot = (Math.max(0, Math.min(t, s.stop) - Math.max(a, 0))) * s.speed;
        break;
      case "pulse": {
        const ph = ((t - a) % 1.4) / 1.4;
        o = t < a ? 0 : 0.55 * (1 - ph);
        sc = 1 + 0.7 * E.outCubic(ph);
        break;
      }
      case "check": {
        const k = a < 0 ? 1 : TX.step(t - a, 0.78, 2.3);
        o = a < 0 ? 1 : P(t, a, a + 0.28);
        y = 26 * (1 - k);
        if (s.path) TX.draw(s.path, a < 0 ? 1 : E.outCubic(P(t, a + 0.18, a + 0.5)));
        break;
      }
      case "float":
        y = Math.sin((t + a) * 1.3) * 8;
        break;
      case "cursor": {
        x = interp(s.keys, t, 1);
        y = interp(s.keys, t, 2);
        let c = 0;
        s.clicks.forEach((tc) => {
          c = Math.max(c, 1 - Math.abs(t - tc) / 0.12);
        });
        sc = 1 - 0.18 * Math.max(0, c);
        o = P(t, s.keys[0][0] - 0.2, s.keys[0][0] + 0.1);
        break;
      }
      default:
        break;
    }
    if (!isNaN(s.dim)) o *= 1 - (1 - s.dimo) * E.inOutCubic(P(t, s.dim, s.dim + 0.45));
    if (!isNaN(s.out)) {
      const u = E.inCubic(P(t, s.out, s.out + 0.35));
      o *= 1 - u;
      y -= 26 * u;
    }
    if (s.fx !== "width" && s.fx !== "height" && s.fx !== "words" && s.fx !== "draw" && s.fx !== "type" && s.fx !== "timer") {
      el.style.transform = `${s.base} translate3d(${x}px,${y}px,0) rotate(${rot}deg) scale(${sc})`;
    }
    if (s.fx !== "words") el.style.opacity = Math.max(0, Math.min(1, o));
    if (s.fx === "words" && (!isNaN(s.out) || !isNaN(s.dim))) el.style.opacity = Math.max(0, Math.min(1, o));
  }

  window.TXE = {
    mount(id) {
      const S = window.TIMING.scenes[id];
      const wrap = document.getElementById(id + "-s");
      const cam = document.getElementById(id + "-c");
      const dir = S.index % 2 ? -1 : 1;
      const go = () => {
        const items = Array.from(wrap.querySelectorAll("[data-fx]")).map(prep);
        const render = (t) => {
          const u = t / S.dur;
          const enter = S.index === 0 ? 1 : E.outCubic(P(t, 0, 0.45));
          const exit = S.last ? 0 : E.inCubic(P(t, S.dur - 0.05, S.slot));
          cam.style.transform =
            `translate3d(${dir * 18 * (u - 0.5)}px, ${-22 * exit + 18 * (1 - enter)}px, 0) scale(${1 + 0.03 * E.inOutSine(Math.min(1, u))})`;
          wrap.style.opacity = enter * (1 - exit);
          items.forEach((s) => apply(s, t));
        };
        const clock = { t: 0 };
        const tl = gsap.timeline({ paused: true });
        tl.to(clock, { t: S.slot, duration: S.slot, ease: "none" }, 0);
        tl.eventCallback("onUpdate", () => render(clock.t));
        render(0);
        window.__timelines[id] = tl;
      };
      document.fonts.load('600 64px "Schibsted Grotesk"').then(go, go);
    },
  };
})();
