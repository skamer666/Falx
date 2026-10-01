"""Shared building blocks: reading-time estimator, anchors, HTML helpers, icons."""
import re

LEAD = 0.55  # silence before the first word of a scene
TAIL = 0.7  # breathing room after the last word
VOWELS = re.compile(r"[aeiouyàâäéèêëîïôöùûüœæ]+", re.I)


def syllables(w):
    core = re.sub(r"[^\wÀ-ÿ'’-]", "", w.lower())
    if re.fullmatch(r"[\d’'.,]+", core):
        return 3
    n = len(VOWELS.findall(core))
    if n > 1 and re.search(r"(e|es)$", core):
        n -= 1
    return max(1, n)


def norm(w):
    return re.sub(r"[^\wÀ-ÿ'’-]", "", w.lower()).replace("’", "'")


class Ctx:
    """Estimated word times for one scene's voice-over line, plus forward-searching anchors."""

    def __init__(self, vo):
        self.vo = vo
        self.words = vo.split()
        self.times, self.ends = [], []
        t = LEAD
        for w in self.words:
            self.times.append(round(t, 3))
            t += 0.07 + 0.19 * syllables(w)
            self.ends.append(round(t, 3))
            if w.endswith((".", "?", "!", "…")):
                t += 0.45
            elif w.endswith((",", ":", ";")) or w in ("—", "–"):
                t += 0.2
        self.end = self.ends[-1] if self.words else 0
        self.cursor = 0
        self.normed = [norm(w) for w in self.words]

    def _find(self, phrase):
        target = [norm(w) for w in phrase.split()]
        n = len(target)
        for start in (self.cursor, 0):
            for i in range(start, len(self.words) - n + 1):
                if self.normed[i:i + n] == target:
                    self.cursor = i + 1
                    return i, n
        raise KeyError(f"anchor {phrase!r} not found in: {self.vo}")

    def a(self, phrase, off=0.0):
        i, _ = self._find(phrase)
        return round(self.times[i] + off, 3)

    def e(self, phrase, off=0.0):
        """End time of the last word of phrase."""
        i, n = self._find(phrase)
        return round(self.ends[i + n - 1] + off, 3)


def attrs(**kw):
    out = []
    for k, v in kw.items():
        if v is None:
            continue
        out.append(f'data-{k.replace("_", "-")}="{v}"')
    return " ".join(out)


def box(inner, x, y, w=None, h=None, cls="", fx="rise", at=-1, style="", **kw):
    st = f"left:{x}px;top:{y}px;"
    if w is not None:
        st += f"width:{w}px;"
    if h is not None:
        st += f"height:{h}px;"
    a = attrs(fx=fx, at=at, **kw) if fx else ""
    return f'<div class="ab {cls}" style="{st}{style}" {a}>{inner}</div>'


def words(text, x, y, w=None, cls="h1", at=0.0, st=0.035, align="left", style="", **kw):
    s = f"left:{x}px;top:{y}px;" + (f"width:{w}px;" if w else "") + f"text-align:{align};" + style
    return f'<div class="ab {cls}" style="{s}" {attrs(fx="words", at=at, st=st, **kw)}>{text}</div>'


I = {
    "phone": "M6.5 3h3.2l1.8 4.6-2.3 1.4a11 11 0 0 0 5.8 5.8l1.4-2.3 4.6 1.8v3.2a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3z",
    "scale": "M12 3v17M7.5 20.5h9M4.5 7h15M12 4.5l-7.5 2.5M12 4.5l7.5 2.5M4.5 7l-2.8 6.5a3 3 0 0 0 5.6 0L4.5 7zM19.5 7l-2.8 6.5a3 3 0 0 0 5.6 0L19.5 7z",
    "court": "M3 9.5h18M5 9.5v8M9.7 9.5v8M14.3 9.5v8M19 9.5v8M2.5 20.5h19M3.5 18h17M12 3l9 4.5H3L12 3z",
    "lock": "M6 10.5h12v10H6zM8.5 10.5V7.8a3.5 3.5 0 0 1 7 0v2.7M12 14.5v2.5",
    "shield": "M12 3l7.5 3v5.6c0 4.6-3.2 7.8-7.5 9.2-4.3-1.4-7.5-4.6-7.5-9.2V6L12 3zM8.8 12l2.3 2.3 4.3-4.6",
    "doc": "M6 2.5h8.5l4.5 4.5v14.5H6zM14.5 2.5V7H19M9 12h7M9 15.5h7M9 19h4.5",
    "clock": "M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18zM12 7v5.2l3.3 2",
    "check": "M5 12.5l4.5 4.5L19 7",
    "cross": "M6.5 6.5l11 11M17.5 6.5l-11 11",
    "mail": "M3 5.5h18v13H3zM3.5 6.5L12 12.5l8.5-6",
    "building": "M4 21V5.5L12 3v18M12 9h8v12M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2M2.5 21h19",
    "chat": "M4 4.5h16v11.5H9.5L4 20.5z",
    "search": "M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 1 0 0-13zM20 20l-4.6-4.6",
    "pen": "M4 20l1-4.2L15.6 5.2a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8L8.2 19zM13.5 7.3l3.2 3.2",
    "arrow": "M4 12h16M14 6l6 6-6 6",
    "down": "M12 4v16M6 14l6 6 6-6",
    "data": "M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
    "home": "M3 20.5h18M5 20.5V9.5l7-6 7 6v11M9.8 20.5v-5.5h4.4v5.5",
    "receipt": "M5.5 2.5h13v19l-2.6-1.7-2.2 1.7-1.7-1.7-1.7 1.7-2.2-1.7-2.6 1.7zM9 8h6M9 11.5h6M9 15h3.5",
    "brief": "M3 7.5h18v12.5H3zM8.5 7.5V4.5h7v3M3 12.5h18M10.5 12.5v2h3v-2",
    "gavel": "M13.5 3.5l7 7M10.5 6.5l7 7M12 5l-5 5M15 8l-5 5M3.5 20.5l7.5-7.5M2.5 22h9",
    "question": "M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18zM9.4 9.2a2.7 2.7 0 1 1 3.8 2.5c-.7.3-1.2.9-1.2 1.7v.6M12 17v.2",
    "user": "M12 3.5a4 4 0 1 0 0 8 4 4 0 1 0 0-8zM4.5 20.5c.8-3.8 3.8-6 7.5-6s6.7 2.2 7.5 6",
    "cal": "M3.5 5.5h17v15h-17zM3.5 10h17M8 3v4M16 3v4",
    "spark": "M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8",
    "play": "M7 4.5v15l12-7.5z",
    "stop": "M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18zM5.6 5.6l12.8 12.8",
    "link": "M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2",
}


def icon(name, size=40, cls="ic", extra=""):
    return (f'<svg class="{cls}" width="{size}" height="{size}" viewBox="0 0 24 24" {extra}>'
            f'<path d="{I[name]}"/></svg>')


def ibox(name, size=72, isz=38, inv=False):
    return (f'<div class="ico{" inv" if inv else ""}" style="width:{size}px;height:{size}px;'
            f'border-radius:{int(size * 0.28)}px">{icon(name, isz)}</div>')


CHECK_SVG = '<svg viewBox="0 0 24 24"><path class="chk-path" pathLength="1" d="M5 12.5l4.5 4.5L19 7"/></svg>'
CURSOR_SVG = '<svg viewBox="0 0 24 24"><path d="M5 2.5l14 10.2-6.3 1 3.6 6.6-2.6 1.4-3.6-6.6L5 19.5z"/></svg>'
