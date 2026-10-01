"""Scene templates for the guide videos. Every template returns a builder(c) that lays out one scene and
times each reveal on a phrase of that scene's voice-over line (anchors are phrases or seconds)."""
from kit import CHECK_SVG, CURSOR_SVG, I, box, ibox, icon, words

SCENES = []


def S(vo, section=None, dur=None):
    """Register a scene: S(vo, section)(template(...))."""
    def reg(builder):
        SCENES.append({"vo": vo, "build": builder, "section": section, "dur": dur})
        return builder
    return reg


def A(c, x, off=0.0):
    if x is None:
        return None
    if isinstance(x, (int, float)):
        return round(x + off, 3)
    return c.a(x, off)


def kick(text, x, y, at, **kw):
    return box(f'<div class="kick">{text}</div>', x, y, None, None, "", "rise", at, dy=20, **kw)


CROSS_SVG = '<svg viewBox="0 0 24 24"><path class="chk-path" pathLength="1" d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></svg>'
LINE_H = {"h0": 150, "h1": 104, "h2": 80, "h3": 58, "h4": 44, "p": 42}


# ---------------------------------------------------------------- text-led
def section(n, title, sub=None, size="h0"):
    def b(c):
        t0 = c.times[0] if c.words else 0.2
        out = (box(f'<div class="big-outline">{n}</div>', 200, 200, None, None, "", "pop", t0 - 0.3)
               + box("", 200, 610, 1520, 1, "rule", "width", t0, d=0.5)
               + words(title, 200, 470 if size == "h0" else 500, 1520, size, t0 + 0.05))
        if sub:
            out += box(f'<div class="p" style="font-size:32px">{sub}</div>', 200, 650, 1520, None, "", "rise", t0 + 0.35)
        return out
    return b


def title(kicker, text, sub=None, chips=(), a_text=None, a_sub=None, size="h1"):
    """Hook / title card. chips = [(label, anchor)]."""
    def b(c):
        t0 = A(c, a_text) if a_text is not None else c.times[0]
        out = kick(kicker, 200, 220, t0 - 0.1) + words(text, 200, 270, 1520, size, t0)
        y = 270 + 2 * LINE_H[size] + 40
        if sub:
            out += box(f'<div class="p" style="font-size:34px">{sub}</div>', 200, y, 1400, None, "", "rise",
                       A(c, a_sub) if a_sub is not None else t0 + 0.5)
            y += 110
        x = 200
        for lab, an in chips:
            out += box(f'<div class="chip" style="font-size:28px">{lab}</div>', x, y, None, None, "", "pop", A(c, an))
            x += 40 + int(len(lab) * 15.5 + 60)
        return out
    return b


def statement(lines):
    """Kinetic stack. lines = [(text, anchor, cls)] with cls in h0/h1/h2/h3 (+ ' mute')."""
    def b(c):
        hs = [LINE_H[cls.split()[0]] * (2 if len(txt) > {"h0": 22, "h1": 32, "h2": 44, "h3": 64}[cls.split()[0]] else 1) for txt, _, cls in lines]
        y = 560 - sum(hs) // 2
        out = ""
        for (txt, an, cls), h in zip(lines, hs):
            out += words(txt, 200, y, 1520, cls, A(c, an))
            y += h + 10
        return out
    return b


def stat(kicker, value, label, a_value, suffix="", prefix="", law=None, a_label=None, a_law=None, side=None, a_side=None):
    """Huge counted number + label + legal reference chip (+ optional side note)."""
    def b(c):
        tv = A(c, a_value)
        num = (f'<div class="row" style="align-items:baseline;gap:18px">'
               + (f'<span style="font-size:110px;font-weight:600;color:rgba(245,245,247,.5)">{prefix}</span>' if prefix else "")
               + f'<span style="font-size:260px;font-weight:700;letter-spacing:-0.06em;line-height:0.9" data-fx="count" data-at="{tv}" data-d="0.55" data-from="0" data-to="{value}">{value}</span>'
               + (f'<span style="font-size:110px;font-weight:600;letter-spacing:-0.04em" data-fx="rise" data-at="{tv + 0.3}">{suffix}</span>' if suffix else "")
               + '</div>')
        w = 900 if side else 1520
        out = kick(kicker, 200, 190, tv - 0.2) + box(num, 200, 250, None, None, "", "pop", tv)
        out += words(label, 200, 560, w, "h2", A(c, a_label) if a_label is not None else tv + 0.5)
        if law:
            out += box(f'<div class="chip">{icon("scale", 30)}{law}</div>', 200, 760, None, None, "", "pop",
                       A(c, a_law) if a_law is not None else tv + 0.9)
        if side:
            out += box(f'<div style="padding:44px">{ibox("question", 72, 38)}<div class="p" style="margin-top:28px;color:#f5f5f7;font-size:31px">{side}</div></div>',
                       1180, 250, 540, None, "card", "rise", A(c, a_side), dx=80)
        return out
    return b


def lst(kicker, head, items, mode="check", a_head=None, start=1):
    """items = [(text, anchor)] or [(text, anchor, note)]. mode: check | cross | num | dot."""
    def b(c):
        th = A(c, a_head) if a_head is not None else (c.times[0] if c.words else 0.2)
        out = kick(kicker, 200, 160, th - 0.1) + words(head, 200, 200, 1520, "h2", th)
        n = len(items)
        two = n > 6
        rows = (n + 1) // 2 if two else n
        step = min(124, int(580 / max(1, rows)))
        top = 320 if len(head) <= 44 else 400
        y0 = int(top + (940 - top - rows * step) / 2)
        for i, it in enumerate(items):
            txt, an = it[0], it[1]
            note = it[2] if len(it) > 2 else None
            col, row = (i // rows, i % rows) if two else (0, i)
            x = 200 + col * 780
            y = y0 + row * step
            if mode == "num":
                badge = f'<div class="ico inv" style="width:52px;height:52px;border-radius:50%;font-size:24px;font-weight:700;color:#0a0a0b">{i + start}</div>'
            elif mode == "dot":
                badge = '<div style="width:16px;height:16px;border-radius:50%;background:#f5f5f7;margin:0 18px"></div>'
            else:
                badge = f'<div class="chk">{CROSS_SVG if mode == "cross" else CHECK_SVG}</div>'
            fs = 31 if two else (40 if rows <= 4 else 36)
            nt = f'<span class="chip" style="font-size:20px;padding:8px 16px;margin-left:10px">{note}</span>' if note else ""
            out += box(f'<div class="row" style="gap:22px">{badge}<span style="font-size:{fs}px;font-weight:500;line-height:1.2">{txt}</span>{nt}</div>',
                       x, y, 760 if two else 1520, None, "", "check", A(c, an))
        return out
    return b


def steps(kicker, head, items, a_head=None):
    """Horizontal process. items = [(label, sub, anchor)]."""
    def b(c):
        th = A(c, a_head) if a_head is not None else c.times[0]
        n = len(items)
        xs = [260 + i * (1400 / (n - 1)) for i in range(n)] if n > 1 else [960]
        out = kick(kicker, 200, 160, th - 0.1) + words(head, 200, 200, 1520, "h2", th)
        out += box("", xs[0], 516, xs[-1] - xs[0], 3, "", "width", -1, style="background:rgba(245,245,247,.16)")
        prev_t = None
        for i, (lab, sub, an) in enumerate(items):
            t = A(c, an)
            if i > 0:
                out += box("", xs[i - 1], 516, xs[i] - xs[i - 1], 3, "", "width", max(prev_t, t - 0.35), d=0.35, style="background:#f5f5f7")
            out += box(f'<div style="width:96px;height:96px;border-radius:50%;background:#f5f5f7;color:#0a0a0b;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:700">{i + 1}</div>',
                       xs[i] - 48, 470, None, None, "", "pop", t)
            w = min(300, int(1400 / max(1, n - 1)) - 20) if n > 1 else 600
            out += box(f'<div class="h4 c" style="font-size:30px">{lab}</div>' + (f'<div class="sm c" style="margin-top:10px">{sub}</div>' if sub else ""),
                       xs[i] - w / 2, 600, w, None, "", "rise", t + 0.08)
            prev_t = t
        return out
    return b


def compare(kicker, head, left, right, a_head=None):
    """left/right = (title, icon, [(text, anchor)], mark) — mark 'check' or 'cross'; icon 'crest' uses the logo."""
    def b(c):
        th = A(c, a_head) if a_head is not None else c.times[0]
        out = kick(kicker, 200, 150, th - 0.1) + words(head, 200, 190, 1520, "h2", th)
        for k, col in enumerate((left, right)):
            tl, ic, its = col[:3]
            mk = CROSS_SVG if len(col) > 3 and col[3] == "cross" else CHECK_SVG
            x = 200 + k * 790
            head_ic = ('<img src="assets/img/crest-alpha.png" style="width:56px;height:58px;object-fit:contain">' if ic == "crest" else ibox(ic, 60, 32))
            t_first = min([A(c, an) for _, an in its] or [th]) - 0.3
            out += box(f'<div class="row" style="padding:30px 40px;gap:18px;border-bottom:1px solid rgba(245,245,247,.1)">{head_ic}<span class="h3" style="font-size:40px">{tl}</span></div>',
                       x, 300, 730, 640, "card" + (" hi" if k else ""), "rise", max(th, t_first) if k else th + 0.1, dx=60 if k else -60)
            for j, (txt, an) in enumerate(its):
                out += box(f'<div class="row" style="gap:18px;align-items:flex-start"><div class="chk" style="margin-top:2px">{mk}</div>'
                           f'<div style="font-size:30px;font-weight:500;line-height:1.25">{txt}</div></div>',
                           x + 40, 440 + j * 100, 650, None, "", "check", A(c, an))
        return out
    return b


def table(kicker, head, cols, rows, a_head=None, first_w=380):
    """cols = header labels (2 or 3); rows = [(cells, anchor)] — cells has len(cols) entries."""
    def b(c):
        th = A(c, a_head) if a_head is not None else c.times[0]
        out = kick(kicker, 200, 150, th - 0.1) + words(head, 200, 190, 1520, "h2", th)
        n = len(cols)
        rest = (1520 - first_w) / (n - 1)
        xs = [200] + [200 + first_w + i * rest for i in range(n - 1)]
        ws = [first_w - 30] + [rest - 30] * (n - 1)
        for i, h in enumerate(cols):
            out += box(f'<div class="kick" style="color:rgba(245,245,247,.75)">{h}</div>', xs[i], 320, ws[i], None, "", "rise", th + 0.1)
        out += box("", 200, 368, 1520, 2, "rule", "width", th + 0.1, d=0.5)
        rh = min(150, int(540 / max(1, len(rows))))
        for r, (cells, an) in enumerate(rows):
            t = A(c, an)
            y = 384 + r * rh + 10
            for i, cell in enumerate(cells):
                style = "font-size:34px;font-weight:600" if i == 0 else ("font-size:34px;font-weight:600;color:#f5f5f7" if i == n - 1 else "font-size:32px;color:rgba(245,245,247,.75)")
                out += box(f'<div style="{style};line-height:1.25">{cell}</div>', xs[i], y + 24, ws[i], None, "", "rise", t + 0.06 * i, dx=30)
            out += box("", 200, y + rh - 2, 1520, 1, "rule", "width", t, d=0.5)
        return out
    return b


def doc(kicker, head, sub, doc_title, fields, stamp=None, a_head=None, doc_icon="mail"):
    """Left: message. Right: a document whose fields light up on cue. fields = [(label, value, anchor)]."""
    def b(c):
        th = A(c, a_head) if a_head is not None else c.times[0]
        out = kick(kicker, 200, 220, th - 0.1) + words(head, 200, 260, 700, "h2", th)
        if sub:
            out += box(f'<div class="p">{sub}</div>', 200, 520, 680, None, "", "rise", th + 0.6)
        inner = (f'<div style="padding:40px 46px"><div class="row" style="gap:16px">{icon(doc_icon, 32)}'
                 f'<span class="kick" style="color:rgba(245,245,247,.75)">{doc_title}</span></div>'
                 + "".join(f'<div class="line" style="width:{w}%;margin-top:16px"></div>' for w in (60, 42)) + '</div>')
        out += box(inner, 1000, 150, 720, 790, "card", "rise", th - 0.15, dx=90)
        n = len(fields)
        step = min(118, int(500 / max(1, n)))
        for i, (lab, val, an) in enumerate(fields):
            t = A(c, an)
            y = 330 + i * step
            out += box("", 1040, y - 8, 640, step - 14, "", "width", t, d=0.3, style="background:rgba(245,245,247,.08);border-radius:12px")
            out += box(f'<div class="flabel" style="margin-bottom:4px">{lab}</div><div style="font-size:27px;font-weight:600;line-height:1.2">{val}</div>',
                       1062, y, 600, None, "", "rise", t + 0.05, dx=30)
        if stamp:
            sw = len(stamp[0]) * 21 + 60
            out += box(f'<div class="stampbox" style="background:rgba(10,10,11,.9);white-space:nowrap">{stamp[0]}</div>', min(1300, 1690 - sw), 830, None, None, "", "stamp", A(c, stamp[1]), rot=-6)
        return out
    return b


def cards(kicker, head, items, a_head=None):
    """items = [(icon, title, sub, anchor)] — 2 to 6 cards."""
    def b(c):
        th = A(c, a_head) if a_head is not None else c.times[0]
        out = kick(kicker, 200, 160, th - 0.1) + words(head, 200, 200, 1520, "h2", th)
        n = len(items)
        cols = n if n <= 4 else 3
        rows = 1 if n <= 4 else 2
        gap = 36
        w = (1520 - (cols - 1) * gap) / cols
        h = 480 if rows == 1 else 270
        y0 = 360 if len(head) <= 44 else 420
        if rows == 2:
            y0 = 330
        for i, (ic, tl, sb, an) in enumerate(items):
            x = 200 + (i % cols) * (w + gap)
            y = y0 + (i // cols) * (h + 28)
            pad = 40 if rows == 1 else 30
            inner = (f'<div style="padding:{pad}px">{ibox(ic, 80 if rows == 1 else 60, 42 if rows == 1 else 32)}'
                     f'<div class="h4" style="margin-top:{44 if rows == 1 else 22}px;font-size:{32 if rows == 1 else 28}px">{tl}</div>'
                     + (f'<div class="p" style="margin-top:10px;font-size:{27 if rows == 1 else 23}px">{sb}</div>' if sb else "") + '</div>')
            out += box(inner, x, y, w, h, "card", "rise", A(c, an), dy=70)
        return out
    return b


def ruler(kicker, head, maxv, marks, a_head=None, note=None):
    """Deadline axis. marks = [(value, value_label, label, anchor)] in ascending order."""
    def b(c):
        th = A(c, a_head) if a_head is not None else c.times[0]
        out = kick(kicker, 200, 160, th - 0.1) + words(head, 200, 200, 1520, "h2", th)
        X = lambda v: 200 + 1520 * v / maxv
        out += box("", 200, 598, 1520, 4, "", "width", th + 0.1, d=0.6, style="background:rgba(245,245,247,.18);border-radius:2px")
        prev = 0
        for i, (v, vlab, lab, an) in enumerate(marks):
            t = A(c, an)
            out += box("", X(prev), 596, max(2, X(v) - X(prev)), 8, "", "width", t - 0.1, d=0.45, style="background:#f5f5f7;border-radius:4px")
            out += box("", X(v) - 12, 588, 24, 24, "", "pop", t + 0.3, style="border-radius:50%;background:#f5f5f7;box-shadow:0 0 0 8px rgba(245,245,247,.15)")
            up = i % 2 == 0
            txt_w = 340
            xl = min(max(X(v) - txt_w / 2, 200), 1720 - txt_w)
            out += box(f'<div class="c"><div style="font-size:54px;font-weight:700;letter-spacing:-0.03em">{vlab}</div></div>',
                       xl, 470 if up else 650, txt_w, None, "", "rise", t + 0.3, dy=30 if up else -30)
            out += box(f'<div class="p c" style="color:#f5f5f7;font-size:27px">{lab}</div>', xl, 380 if up else 730, txt_w, None, "", "rise", t + 0.4)
            prev = v
        if note:
            out += box(f'<div class="chip inv" style="font-size:26px">{icon("spark", 28, extra="style=stroke:#0a0a0b")}{note[0]}</div>', 200, 860, None, None, "", "pop", A(c, note[1]))
        return out
    return b


def law(ref, text, a_ref=None, a_text=None, note=None, a_note=None):
    """A legal rule, framed: article chip + the rule in plain words."""
    def b(c):
        tr = A(c, a_ref) if a_ref is not None else c.times[0]
        tt = A(c, a_text) if a_text is not None else tr + 0.3
        out = box(f'<div class="chip inv" style="font-size:28px">{icon("scale", 30, extra="style=stroke:#0a0a0b")}{ref}</div>', 200, 250, None, None, "", "pop", tr)
        out += words(text, 200, 360, 1520, "h1", tt)
        if note:
            out += box(f'<div class="row" style="gap:18px">{ibox("spark", 60, 30)}<span class="p" style="color:#f5f5f7;font-size:32px">{note}</span></div>',
                       200, 760, 1520, None, "", "rise", A(c, a_note) if a_note is not None else tt + 1.0)
        return out
    return b


def warn(text, sub=None, a_text=None, a_sub=None, label="Erreur fréquente"):
    """Inverted, high-contrast card: the visual 'alarm' beat."""
    def b(c):
        t = A(c, a_text) if a_text is not None else c.times[0]
        inner = (f'<div style="padding:70px 80px"><div class="row" style="gap:16px">'
                 f'<div style="width:56px;height:56px;border-radius:50%;background:#0a0a0b;display:flex;align-items:center;justify-content:center">'
                 f'{icon("spark", 30)}</div><span class="kick" style="color:rgba(10,10,11,.6)">{label}</span></div>'
                 f'<div style="margin-top:40px;font-size:66px;font-weight:600;letter-spacing:-0.03em;line-height:1.1;color:#0a0a0b">{text}</div>'
                 + (f'<div style="margin-top:30px;font-size:31px;line-height:1.4;color:rgba(10,10,11,.7)" data-fx="rise" data-at="{A(c, a_sub) if a_sub is not None else t + 1.2}">{sub}</div>' if sub else "")
                 + '</div>')
        return box(inner, 200, 200, 1520, None, "card inv", "pop", t - 0.1, style="border-radius:34px")
    return b


def qa(question, answer, a_q=None, a_a=None):
    def b(c):
        tq = A(c, a_q) if a_q is not None else c.times[0]
        out = box(ibox("question", 84, 46, inv=True), 200, 230, None, None, "", "pop", tq)
        out += words(question, 320, 236, 1400, "h2", tq + 0.05)
        out += box(f'<div class="card" style="padding:40px 48px"><div class="p" style="color:#f5f5f7;font-size:34px;line-height:1.45">{answer}</div></div>',
                   200, 470, 1520, None, "", "rise", A(c, a_a) if a_a is not None else tq + 1.2, dy=60)
        return out
    return b


# ---------------------------------------------------------------- Thrax Legal blocks
def brand(head, items, a_head=None):
    """Crest + promise + what we do (items = [(icon, label, anchor)])."""
    def b(c):
        th = A(c, a_head) if a_head is not None else c.times[0]
        out = (box('<img src="assets/img/crest-alpha.png" style="width:300px;height:313px;object-fit:contain">', 200, 200, None, None, "", "pop", th)
               + box('<div class="h2">Thrax <span class="mute">Legal</span></div>', 200, 540, None, None, "", "rise", th + 0.2)
               + box(f'<div class="p" style="width:520px">{head}</div>', 200, 630, 520, None, "", "rise", th + 0.4))
        n = len(items)
        for i, (ic, lab, an) in enumerate(items):
            x = 780 + (i % 2) * 480
            y = 180 + (i // 2) * (200 if n > 4 else 250)
            out += box(f'<div class="row" style="padding:0 34px;height:100%;gap:24px">{ibox(ic, 70, 36)}<span class="h4" style="font-size:29px">{lab}</span></div>',
                       x, y, 450, 170 if n > 4 else 210, "card", "rise", A(c, an), dx=60)
        return out
    return b


def process():
    """How a request is handled: three cards, no promises of delay or price."""
    def b(c):
        t1, t2, t3 = c.a("Vous décrivez"), c.a("Chaque dossier"), c.a("Et vous recevez")
        li = "".join(f'<div class="row" style="gap:14px;margin-top:20px" data-fx="check" data-at="{t2 + 0.3 + k * 0.3}">'
                     f'<div class="chk" style="width:38px;height:38px">{CHECK_SVG}</div><span style="font-size:26px">{w}</span></div>'
                     for k, w in enumerate(("Analyse", "Recherche juridique", "Rédaction", "Relecture")))
        cards_ = [
            (f'<div style="padding:40px"><div class="num">01</div><div class="h4" style="margin-top:14px">Vous décrivez votre situation</div>'
             f'<div class="field" style="margin-top:34px;height:150px;align-items:flex-start;padding-top:18px;font-size:22px;line-height:1.4;white-space:normal">'
             f'<span data-fx="type" data-at="{t1 + 0.4}" data-cps="40">Bonjour, j’ai une question sur…</span></div>'
             f'<div class="btn" style="margin-top:26px;height:58px;font-size:22px">Envoyer</div></div>', t1),
            (f'<div style="padding:40px"><div class="num">02</div><div class="h4" style="margin-top:14px">Analysé et recherché</div>{li}'
             f'<div class="chip" style="margin-top:30px;font-size:22px">Jamais improvisé</div></div>', t2),
            (f'<div style="padding:40px"><div class="num">03</div><div class="h4" style="margin-top:14px">Réponse écrite</div>'
             f'<div style="margin-top:44px;display:flex;justify-content:center">{ibox("doc", 150, 80, inv=True)}</div>'
             f'<div class="h4 c" style="margin-top:34px">Une réponse claire</div><div class="p c" style="margin-top:6px">par écrit</div></div>', t3),
        ]
        out = ""
        for i, (inner, t) in enumerate(cards_):
            out += box(inner, 200 + i * 520, 200, 480, 640, "card" + (" hi" if i == 2 else ""), "rise", t, dx=80)
            if i:
                out += box(icon("arrow", 44), 694 + (i - 1) * 520, 500, None, None, "", "rise", t - 0.25, dx=-30)
        return out
    return b


def subscription():
    """Fixed-price subscription, no figures: details live on the website."""
    def b(c):
        t0 = c.a("Pas de facture")
        cs = [("cal", "Abonnement mensuel", "Un montant connu, chaque mois", c.a("abonnement mensuel")),
              ("lock", "Prix fixe", "Jamais facturé à l’heure", c.a("à prix fixe")),
              ("link", "Le détail sur le site", "thrax-legal.ch", c.a("Le détail"))]
        out = kick("L’abonnement Thrax Legal", 200, 170, t0) + words("Pas de compteur qui tourne.", 200, 210, 1520, "h1", t0 + 0.1)
        for i, (ic, t1, t2, t) in enumerate(cs):
            out += box(f'<div style="padding:44px 40px">{ibox(ic, 96, 50)}<div class="h3" style="margin-top:44px;font-size:40px">{t1}</div>'
                       f'<div class="p" style="margin-top:10px">{t2}</div></div>', 200 + i * 520, 400, 480, 400, "card" + (" hi" if i == 1 else ""), "rise", t, dy=70)
        return out
    return b


def orient():
    def b(c):
        t0, t1 = c.a("Et si"), c.a("on vous le dit")
        return (words("Besoin d’un avocat ?", 200, 260, 1520, "h1 mute", t0)
                + words("On vous le dit, et on vous oriente.", 200, 380, 1520, "h1", t1)
                + box(f'<div class="row" style="gap:30px">{ibox("pen", 110, 58)}{icon("arrow", 60)}{ibox("scale", 110, 58, inv=True)}</div>',
                      200, 640, None, None, "", "rise", t1 + 0.5))
    return b


FORM_FIELDS = (("Nom", "Claire Dubois"), ("Entreprise", "Atelier Dubois Sàrl"), ("Téléphone", "079 123 45 67"))


def cta(guide_label):
    def b(c):
        t0, t1 = c.times[0], c.a("Demandez")
        f = ""
        for k, (lab, val) in enumerate(FORM_FIELDS):
            f += (f'<div style="margin-top:{22 if k else 0}px"><div class="flabel">{lab}</div><div class="field">'
                  f'<span data-fx="type" data-at="{t1 + 0.3 + k * 0.6}" data-cps="30">{val}</span></div></div>')
        body = (f'<div class="row" style="height:72px;padding:0 28px;gap:12px;border-bottom:1px solid rgba(245,245,247,.1)">'
                + "".join('<span style="width:14px;height:14px;border-radius:50%;background:rgba(245,245,247,.25)"></span>' for _ in range(3))
                + f'<div class="row" style="margin-left:24px;flex:1;height:44px;border-radius:12px;background:rgba(245,245,247,.06);padding:0 18px;gap:12px">'
                f'{icon("lock", 22)}<span style="font-size:22px;color:rgba(245,245,247,.8)" data-fx="type" data-at="{t0 + 0.3}" data-cps="40">thrax-legal.ch/fr/contact</span></div></div>'
                f'<div style="padding:44px 56px"><div class="kick">Contact</div><div class="h3" style="margin-top:12px">Être rappelé gratuitement</div>'
                f'<div style="margin-top:34px">{f}</div><div class="btn" style="margin-top:34px">Être rappelé</div></div>')
        tl = c.a("Le lien")
        return (words("Pas encore sûr ?", 200, 260, 740, "h1", t0)
                + words("Demandez à être rappelé, gratuitement.", 200, 400, 660, "h2 mute", t1)
                + box(f'<div class="chip inv" style="font-size:24px">{icon("link", 26, extra="style=stroke:#0a0a0b")}Lien et guide complet en description</div>',
                      200, 640, None, None, "", "pop", tl)
                + box(f'<div class="chip" style="font-size:24px">{icon("doc", 26)}{guide_label}</div>', 200, 730, None, None, "", "rise", tl + 0.4)
                + box(body, 960, 160, 760, 760, "card", "rise", t0 + 0.1, dx=90))
    return b


def subscribe():
    def b(c):
        t0 = c.times[0]
        return (words("Cette vidéo vous a été utile ?", 160, 330, 1600, "h1", t0, align="center")
                + box('<div class="btn" style="height:84px;font-size:32px;padding:0 48px">S’abonner</div>', 0, 520, 1920, None, "c", "pop", c.a("abonnez-vous"))
                + box('<div class="p c" style="font-size:30px">Des guides juridiques pour les entrepreneurs de Suisse romande</div>', 0, 660, 1920, None, "c", "rise", c.a("on publie")))
    return b


def end():
    def b(c):
        return (box('<img src="assets/img/crest-alpha.png" style="width:300px;height:313px;object-fit:contain">', 810, 170, None, None, "", "pop", 0.2)
                + box('<div class="h1">Thrax <span class="mute">Legal</span></div>', 0, 530, 1920, None, "c", "rise", 0.5)
                + box('<div class="p" style="font-size:32px">Votre service juridique externalisé, à prix fixe.</div>', 0, 650, 1920, None, "c", "rise", 0.7)
                + box('<div class="chip inv" style="font-size:30px">thrax-legal.ch</div>', 0, 740, 1920, None, "c", "pop", 1.0)
                + box('<div class="sm" style="font-size:19px">Informations générales — ne remplace pas un conseil personnalisé.</div>', 0, 900, 1920, None, "c", "fade", 1.3))
    return b
