"""Blocks specific to the service videos (one video per fixed-price service on thrax-legal.ch).

Rules for every service video (see ROUTINE.md):
- no voice: the voice-over is recorded later by hand from feuille-de-calage.md;
- no price, no delivery time, no volume: they live on the website and may change;
- never call Thrax Legal or its founder « juriste » or « avocat ».
"""
from kit import box, ibox, icon, words
from tpl import kick

SITE = "https://thrax-legal.ch"

TAGLINE = {
    "particuliers": "Le juridique à prix fixe, jamais à l’heure.",
    "entreprises": "Votre service juridique externalisé, à prix fixe.",
}


def page_url(audience, slug):
    return f"{SITE}/fr/{audience}/{slug}"


def service_cta(audience, slug, name):
    """Order call to action. The voice line MUST contain « Commandez » and « Le lien »."""
    def b(c):
        t0, t1, tl = c.times[0], c.a("Commandez"), c.a("Le lien")
        url = f"thrax-legal.ch/fr/{audience}/{slug}"
        bar = (f'<div class="row" style="height:72px;padding:0 28px;gap:12px;border-bottom:1px solid rgba(245,245,247,.1)">'
               + "".join('<span style="width:14px;height:14px;border-radius:50%;background:rgba(245,245,247,.25)"></span>' for _ in range(3))
               + f'<div class="row" style="margin-left:24px;flex:1;height:44px;border-radius:12px;background:rgba(245,245,247,.06);padding:0 18px;gap:12px;overflow:hidden">'
               f'{icon("lock", 22)}<span style="font-size:20px;white-space:nowrap;color:rgba(245,245,247,.8)" data-fx="type" data-at="{t0 + 0.2}" data-cps="45">{url}</span></div></div>')
        page = (f'<div style="padding:44px 52px"><div class="kick">Prestation à prix fixe</div>'
                f'<div class="h3" style="margin-top:14px;font-size:44px;line-height:1.1">{name}</div>'
                + "".join(f'<div class="line" style="width:{w}%;margin-top:18px"></div>' for w in (88, 72, 80))
                + f'<div class="row" style="margin-top:34px;gap:14px"><div class="chip" style="font-size:22px">{icon("lock", 24)}Prix fixe</div>'
                f'<div class="chip" style="font-size:22px">{icon("doc", 24)}Par écrit</div></div>'
                f'<div class="btn" style="margin-top:36px" data-fx="pop" data-at="{t1 + 0.6}">Commander</div></div>')
        return (words("Commandez en ligne.", 200, 280, 700, "h1", t1)
                + box('<div class="p" style="font-size:34px">Le prix est fixé avant de commencer.</div>', 200, 520, 680, None, "", "rise", t1 + 0.5)
                + box(f'<div class="chip inv" style="font-size:26px">{icon("link", 28, extra="style=stroke:#0a0a0b")}Lien en description</div>',
                      200, 660, None, None, "", "pop", tl)
                + box(bar + page, 960, 170, 760, 740, "card", "rise", t0, dx=90))
    return b


def end_service(audience):
    """Closing card (no voice-over: register it with S("", None, dur=5.0))."""
    def b(c):
        return (box('<img src="assets/img/crest-alpha.png" style="width:300px;height:313px;object-fit:contain">', 810, 170, None, None, "", "pop", 0.2)
                + box('<div class="h1">Thrax <span class="mute">Legal</span></div>', 0, 530, 1920, None, "c", "rise", 0.5)
                + box(f'<div class="p" style="font-size:32px">{TAGLINE[audience]}</div>', 0, 650, 1920, None, "c", "rise", 0.7)
                + box('<div class="chip inv" style="font-size:30px">thrax-legal.ch</div>', 0, 740, 1920, None, "c", "pop", 1.0)
                + box('<div class="sm" style="font-size:19px">Informations générales — ne remplace pas un conseil personnalisé. '
                      'Thrax Legal n’est pas un cabinet d’avocats.</div>', 0, 900, 1920, None, "c", "fade", 1.3))
    return b


def promise(audience):
    """Four trust cards. The voice line MUST contain « prix fixe », « par écrit », « recherché » and « un avocat »."""
    def b(c):
        items = [
            ("lock", "Prix fixe", "Annoncé avant de commencer, jamais à l’heure", c.a("prix fixe")),
            ("doc", "Par écrit", "Un document clair, prêt à envoyer", c.a("par écrit")),
            ("search", "Recherché", "Chaque dossier est analysé, jamais improvisé", c.a("recherché")),
            ("scale", "Honnête", "Si un avocat est nécessaire, on vous le dit", c.a("un avocat")),
        ]
        t0 = c.times[0]
        out = kick("Pourquoi Thrax Legal", 200, 160, t0 - 0.1) + words("Sérieux, clair, sans surprise.", 200, 200, 1520, "h2", t0)
        w = (1520 - 3 * 32) / 4
        for i, (ic, tl, sb, an) in enumerate(items):
            inner = (f'<div style="padding:38px">{ibox(ic, 80, 42)}<div class="h4" style="margin-top:40px;font-size:34px">{tl}</div>'
                     f'<div class="p" style="margin-top:12px;font-size:25px">{sb}</div></div>')
            out += box(inner, 200 + i * (w + 32), 360, w, 470, "card" + (" hi" if i == 0 else ""), "rise", an, dy=70)
        return out
    return b
