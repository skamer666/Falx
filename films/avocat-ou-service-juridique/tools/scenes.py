"""The film, scene by scene: voice-over line (the user's script) + invented visual, timed on the line."""
from kit import CHECK_SVG, CURSOR_SVG, Ctx, box, ibox, icon, words

SCENES = []


def scene(vo, section=None, dur=None):
    def deco(fn):
        SCENES.append({"vo": vo, "build": fn, "section": section, "dur": dur})
        return fn
    return deco


# ---------------------------------------------------------------- reusable pieces
def notif(ic, title, sub, x, y, at, w=600):
    inner = (f'<div class="row" style="gap:24px;padding:26px 30px">{ibox(ic, 68, 34)}'
             f'<div><div class="h4" style="font-size:30px">{title}</div><div class="sm" style="margin-top:6px">{sub}</div></div></div>')
    return box(inner, x, y, w, None, "card", "rise", at, dx=70)


PHONE_ICON = icon("phone", 58, extra='style="stroke:#0a0a0b;stroke-width:2"')


def phone(x, y, at=-1, call_at=None, dim=None, out=None, label="Cabinet d’avocats"):
    w, h = 440, 760
    pulse = ""
    if call_at is not None:
        pulse = box("", w / 2 - 66, 560, 132, 132, "", "pulse", call_at,
                    style="border-radius:50%;border:2px solid #f5f5f7")
    inner = (
        f'<div class="ab" style="left:{w / 2 - 70}px;top:40px;width:140px;height:28px;border-radius:14px;background:#050506"></div>'
        f'<div class="ab c" style="left:0;top:140px;width:{w}px">'
        f'<div style="margin:0 auto;width:150px;height:150px;border-radius:50%;border:1px solid rgba(245,245,247,.2);'
        f'background:rgba(245,245,247,.05);display:flex;align-items:center;justify-content:center">{icon("scale", 72)}</div>'
        f'<div class="h4" style="margin-top:34px;font-size:34px">{label}</div>'
        f'<div class="sm" style="margin-top:10px">Mobile</div></div>'
        + pulse +
        f'<div class="ab" style="left:{w / 2 - 66}px;top:560px;width:132px;height:132px;border-radius:50%;background:#f5f5f7;'
        f'display:flex;align-items:center;justify-content:center">{PHONE_ICON}</div>'
    )
    kw = {}
    if dim is not None:
        kw["dim"] = dim
    if out is not None:
        kw["out"] = out
    return box(inner, x, y, w, h, "card", "rise", at, style="border-radius:64px;overflow:hidden", **kw)


def cursor(path, click="", at=None):
    return (f'<div class="ab cursor" style="left:0;top:0" data-fx="cursor" data-at="0" '
            f'data-path="{path}" data-click="{click}">{CURSOR_SVG}</div>')


def section_header(c, n, title, sub):
    return (box(f'<div class="big-outline">{n}</div>', 200, 250, None, None, "", "fade", c.a(c.words[0]) - 0.4, d=0.8)
            + box("", 200, 610, 1520, 1, "rule", "width", c.times[0], d=1.0)
            + words(title, 200, 650, 1500, "h1", c.times[0] + 0.1)
            + box(f'<div class="p">{sub}</div>', 200, 770, 1500, None, "", "rise", c.times[0] + 0.5))


def timer_card(x, y, at, rate=60, stop=1e9, label="Temps facturé"):
    inner = (
        f'<div class="row" style="padding:40px 46px 0;gap:30px">'
        f'<div style="position:relative;width:150px;height:150px;border-radius:50%;border:2px solid rgba(245,245,247,.35)">'
        f'<div class="ab" style="left:73px;top:22px;width:4px;height:54px;border-radius:2px;background:#f5f5f7;transform-origin:2px 53px" '
        f'data-fx="spin" data-at="{at}" data-speed="{rate * 6}" data-stop="{stop}"></div>'
        f'<div class="ab" style="left:72px;top:38px;width:6px;height:38px;border-radius:3px;background:rgba(245,245,247,.6);transform-origin:3px 37px" '
        f'data-fx="spin" data-at="{at}" data-speed="{rate / 10}" data-stop="{stop}"></div>'
        f'<div class="ab" style="left:68px;top:68px;width:14px;height:14px;border-radius:50%;background:#f5f5f7"></div></div>'
        f'<div><div class="kick">{label}</div>'
        f'<div style="font-size:84px;font-weight:600;letter-spacing:-0.02em;font-variant-numeric:tabular-nums;margin-top:8px" '
        f'data-fx="timer" data-at="{at}" data-rate="{rate}" data-stop="{stop}">00:00:00</div></div></div>'
    )
    return inner


def table(c_or_none, rows, shown, times):
    """Comparison table; rows[i] = (label, avocat, thrax). shown = rows visible from frame 0."""
    x0, xa, xb, w = 200, 520, 1110, 1520
    out = [box("", x0, 250, w, 1, "rule", "width", -1)]
    out.append(box('<div class="row" style="gap:16px">' + ibox("scale", 56, 30) + '<span class="h4">Avocat</span></div>', xa, 168, 540, None, "", "rise", -1))
    out.append(box('<div class="row" style="gap:16px">' + '<img src="assets/img/crest-alpha.png" style="width:52px;height:54px;object-fit:contain">'
                   + '<span class="h4">Thrax Legal</span></div>', xb, 168, 600, None, "", "rise", -1))
    for i, (lab, a_, b_) in enumerate(rows[:shown + len(times)]):
        y = 270 + i * 128
        if i < shown:
            ta = tb = tl = -1
        else:
            tl, ta, tb = times[i - shown]
        out.append(box(f'<div class="kick" style="color:rgba(245,245,247,.6);font-size:21px">{lab}</div>', x0, y + 46, 300, None, "", "rise", tl))
        out.append(box(f'<div class="p" style="color:rgba(245,245,247,.72);font-size:30px">{a_}</div>', xa, y + 30, 540, 90, "", "rise", ta,
                       style="display:flex;align-items:center"))
        out.append(box(f'<div class="card hi" style="padding:0 28px;height:100%;display:flex;align-items:center;border-radius:18px">'
                       f'<span style="font-size:30px;font-weight:600">{b_}</span></div>', xb - 28, y + 18, 638, 104, "", "rise", tb))
        out.append(box("", x0, y + 128, w, 1, "rule", "width", tl if tl < 0 else tl + 0.1, d=0.8))
    return "".join(out)


ROWS = [
    ("Facturation", "Au temps passé, en général", "Abonnement à prix fixe"),
    ("Coût", "Selon le temps nécessaire", "Connu d’avance, chaque mois"),
    ("Contact", "Sur rendez-vous", "En ligne, réponse écrite"),
    ("Tribunaux", "Vous représente et plaide", "Ne plaide pas"),
    ("Confidentialité", "Secret professionnel légal", "Confidentialité contractuelle"),
]


def columns(left_items, right_items, lt, rt, dim_all=None):
    out = []
    for i, (title, ic, xs, items, times) in enumerate((("Avocat", "scale", 200, left_items, lt), ("Thrax Legal", None, 990, right_items, rt))):
        head = ibox(ic, 64, 34) if ic else '<img src="assets/img/crest-alpha.png" style="width:60px;height:62px;object-fit:contain">'
        out.append(box("", xs, 160, 730, 780, "card", "fade", -1, **({"dim": dim_all} if dim_all else {})))
        out.append(box(f'<div class="row" style="gap:20px">{head}<span class="h3">{title}</span></div>', xs + 48, 200, 640, None, "", "rise", -1,
                       **({"dim": dim_all} if dim_all else {})))
        out.append(box("", xs + 48, 300, 634, 1, "rule", "width", -1))
        for j, (txt, t) in enumerate(zip(items, times)):
            kw = {"dim": dim_all} if dim_all else {}
            out.append(box(f'<div class="row" style="gap:20px;align-items:flex-start"><div class="chk" style="margin-top:2px">{CHECK_SVG}</div>'
                           f'<div style="font-size:31px;font-weight:500;line-height:1.25">{txt}</div></div>',
                           xs + 48, 336 + j * 112, 640, None, "", "check", t, **kw))
    return "".join(out)


def browser(x, y, w, h, at, url_at, body, url="thrax-legal.ch/fr/contact"):
    bar = (f'<div class="row" style="height:72px;padding:0 28px;gap:12px;border-bottom:1px solid rgba(245,245,247,.1)">'
           f'<span style="width:14px;height:14px;border-radius:50%;background:rgba(245,245,247,.25)"></span>'
           f'<span style="width:14px;height:14px;border-radius:50%;background:rgba(245,245,247,.25)"></span>'
           f'<span style="width:14px;height:14px;border-radius:50%;background:rgba(245,245,247,.25)"></span>'
           f'<div class="row" style="margin-left:24px;flex:1;height:44px;border-radius:12px;background:rgba(245,245,247,.06);padding:0 18px;gap:12px">'
           f'{icon("lock", 22)}<span style="font-size:22px;color:rgba(245,245,247,.8)" data-fx="type" data-at="{url_at}" data-cps="30">{url}</span></div></div>')
    return box(bar + body, x, y, w, h, "card", "rise", at, style="overflow:hidden")


# ---------------------------------------------------------------- 1. Accroche
@scene("Vous avez une question juridique. Un contrat à signer, un client qui ne paie pas, un employé qui conteste son licenciement.")
def _(c):
    return (words("Vous avez une question juridique.", 200, 370, 860, "h1", c.a("Vous"))
            + notif("doc", "Un contrat à signer", "Contrat fournisseur · avant vendredi", 1120, 250, c.a("Un contrat"))
            + notif("receipt", "Un client qui ne paie pas", "Facture 2026-041 · échue depuis 58 jours", 1120, 430, c.a("un client"))
            + notif("brief", "Un licenciement contesté", "Courrier reçu ce matin", 1120, 610, c.a("un employé")))


@scene("Votre premier réflexe : appeler un avocat.")
def _(c):
    t0 = c.a("Votre")
    return (words("Votre premier réflexe :", 200, 380, 900, "h2 mute", t0)
            + words("appeler un avocat.", 200, 470, 900, "h1", c.a("appeler"))
            + phone(1200, 160, at=t0 - 0.2, call_at=c.a("avocat"))
            + cursor(f"{c.times[-1] - 0.6},1720,980;{c.end + 0.6},1440,790"))


@scene("Puis vous hésitez. Combien ça va coûter ? Est-ce que ça vaut vraiment le coup pour une simple question ?")
def _(c):
    t1, t2 = c.a("Combien"), c.a("Est-ce")
    return (phone(1200, 160, at=-1, call_at=0)
            + words("Puis vous hésitez.", 200, 260, 900, "h1", c.a("Puis"))
            + box(f'<div class="chip" style="font-size:32px;padding:20px 32px">{icon("question", 34)}Combien ça va coûter ?</div>', 200, 470, None, None, "", "rise", t1, dx=-60)
            + box(f'<div class="chip" style="font-size:32px;padding:20px 32px">{icon("question", 34)}Ça vaut le coup pour une simple question ?</div>', 200, 590, None, None, "", "rise", t2, dx=-60)
            + cursor(f"0,1440,790;{t1},1380,840;{t1 + 1.2},1520,760;{t2 + 0.4},1400,860;{c.end},1460,800"))


@scene("Et finalement, vous n’appelez personne. Vous signez quand même, vous attendez, vous improvisez.")
def _(c):
    t0 = c.a("vous")
    ta, tb, tc = c.a("Vous signez"), c.a("vous attendez"), c.a("vous improvisez")
    return (phone(1200, 160, at=-1, out=t0 + 0.2)
            + cursor(f"0,1460,800;{t0 + 0.6},2050,1200")
            + words("Vous n’appelez personne.", 200, 200, 1500, "h2 mute", t0, out=ta - 0.3)
            + words("Vous signez.", 200, 260, 1500, "h0", ta)
            + words("Vous attendez.", 200, 420, 1500, "h0", tb)
            + words("Vous improvisez.", 200, 580, 1500, "h0", tc))


@scene("Dans cette vidéo, je vous explique la différence entre un avocat et un service juridique externalisé. Ce que chacun fait, ce que chacun ne fait pas, combien ça coûte, et comment savoir lequel il vous faut.")
def _(c):
    t0 = c.a("Dans")
    th = c.a("différence")
    items = [("01", "Ce que chacun fait", c.a("Ce que chacun fait")), ("02", "Ce que chacun ne fait pas", c.a("ce que chacun ne")),
             ("03", "Combien ça coûte", c.a("combien")), ("04", "Comment choisir", c.a("comment savoir"))]
    out = (box('<div class="kick">Guide Thrax Legal</div>', 200, 200, None, None, "", "rise", t0)
           + words("Avocat ou service juridique externalisé ?", 200, 250, 1260, "h1", th, st=0.08)
           + box("", 200, 500, 1520, 1, "rule", "width", th + 0.6, d=1.2))
    for i, (n, txt, t) in enumerate(items):
        out += box(f'<div style="padding:34px 32px"><div class="num">{n}</div><div class="h4" style="margin-top:22px;font-size:30px">{txt}</div></div>',
                   200 + i * 392, 560, 360, 230, "card", "rise", t)
    return out


@scene("Et je vais être honnête : il y a des situations où il vous faut un avocat, et je vais vous dire lesquelles.")
def _(c):
    return (box(ibox("shield", 96, 52), 912, 210, None, None, "", "pop", c.a("honnête"))
            + words("Parfois, il vous faut un avocat.", 160, 380, 1600, "h1", c.a("il y a"), align="center")
            + box('<div class="chip" style="font-size:30px">Et on vous dit quand.</div>', 0, 560, 1920, None, "c", "rise", c.a("je vais vous")))


# ---------------------------------------------------------------- 2. L'avocat
@scene("Commençons par l’avocat. Un avocat inscrit au barreau a trois atouts que personne d’autre n’a.", section="01 · L’avocat")
def _(c):
    t0 = c.times[0]
    big = (f'<svg width="380" height="380" viewBox="0 0 24 24" class="ic" style="stroke-width:0.55">'
           f'<path pathLength="1" data-fx="draw" data-at="{t0 + 0.2}" data-d="1.8" d="{__import__("kit").I["scale"]}"/></svg>')
    return (box(f'<div class="big-outline">01</div>', 200, 210, None, None, "", "fade", t0 - 0.3, d=0.8)
            + words("L’avocat", 200, 470, 900, "h0", t0 + 0.1)
            + box('<div class="p">Inscrit au barreau.</div>', 200, 640, 800, None, "", "rise", c.a("inscrit"))
            + box('<div class="chip" style="font-size:30px">Trois atouts exclusifs</div>', 200, 720, None, None, "", "rise", c.a("trois"))
            + box(big, 1230, 290, 380, 380, "", None))


@scene("Un : il peut vous représenter et plaider devant les tribunaux. Deux : il est soumis au secret professionnel prévu par la loi, l’un des plus forts du droit suisse. Trois : il est soumis à une surveillance et à des règles professionnelles strictes.", section="01 · L’avocat")
def _(c):
    cards = [("court", "01", "Représenter et plaider", "devant les tribunaux", c.a("Un")),
             ("lock", "02", "Secret professionnel", "prévu par la loi", c.a("Deux")),
             ("shield", "03", "Surveillance", "et règles professionnelles strictes", c.a("Trois"))]
    out = box('<div class="kick">Les atouts de l’avocat</div>', 200, 190, None, None, "", "rise", 0.1)
    for i, (ic, n, t1, t2, t) in enumerate(cards):
        out += box(f'<div style="padding:44px 40px">{ibox(ic, 96, 50)}<div class="num" style="margin-top:56px">{n}</div>'
                   f'<div class="h3" style="margin-top:14px;font-size:40px">{t1}</div><div class="p" style="margin-top:12px">{t2}</div></div>',
                   200 + i * 520, 260, 480, 560, "card", "rise", t)
    return out


@scene("Pour un procès, une affaire pénale, un litige à fort enjeu ou une négociation très conflictuelle, c’est l’avocat qu’il vous faut. Point.", section="01 · L’avocat")
def _(c):
    items = [("Un procès", c.a("un procès")), ("Une affaire pénale", c.a("une affaire")), ("Un litige à fort enjeu", c.a("un litige")),
             ("Une négociation très conflictuelle", c.a("une négociation"))]
    out = box('<div class="kick">Quand il vous faut un avocat</div>', 200, 190, None, None, "", "rise", 0.1)
    for i, (txt, t) in enumerate(items):
        out += box(f'<div class="row"><div class="chk">{CHECK_SVG}</div><div class="h3" style="font-size:46px">{txt}</div></div>',
                   200, 280 + i * 130, 900, None, "", "check", t)
    ts = c.a("c’est l’avocat")
    out += box(f'<div class="card hi" style="width:440px;height:440px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px">'
               f'{icon("scale", 120)}<div class="stampbox" style="font-size:40px">Avocat</div></div>', 1260, 270, None, None, "", "stamp", ts, rot=-6)
    return out


@scene("Son travail est généralement facturé au temps passé, avec un taux horaire qui se compte le plus souvent en centaines de francs. C’est logique : c’est un travail sur mesure, souvent complexe.", section="01 · L’avocat")
def _(c):
    t0 = c.a("facturé")
    return (box(timer_card(0, 0, t0, rate=90), 200, 300, 760, 300, "card", "rise", c.times[0])
            + words("Facturé au temps passé.", 1060, 280, 680, "h2", t0)
            + box('<div class="chip" style="font-size:27px;white-space:normal;line-height:1.3">Taux horaire : le plus souvent en centaines de francs</div>',
                  1060, 470, 660, None, "", "rise", c.a("taux"))
            + box(f'<div class="row" style="gap:18px">{icon("check", 36)}<span class="p" style="color:#f5f5f7">Logique : un travail sur mesure, souvent complexe.</span></div>',
                  1060, 640, 660, None, "", "rise", c.a("C’est logique")))


# ---------------------------------------------------------------- 3. Le quotidien
@scene("Mais regardez les besoins juridiques d’une PME au quotidien.", section="02 · Le quotidien d’une PME")
def _(c):
    return section_header(c, "02", "Le quotidien d’une PME", "Les besoins juridiques, semaine après semaine.")


@scene("Relire un contrat avant de le signer. Rédiger des conditions générales. Envoyer une mise en demeure. Préparer un contrat de travail. Vérifier une clause de bail. Se mettre en conformité avec la loi sur la protection des données. Répondre à la question : « est-ce que j’ai le droit de faire ça ? »", section="02 · Le quotidien d’une PME")
def _(c):
    rows = [("doc", "Relire un contrat avant de le signer", "Relire"), ("pen", "Rédiger des conditions générales", "Rédiger"),
            ("mail", "Envoyer une mise en demeure", "Envoyer"), ("brief", "Préparer un contrat de travail", "Préparer"),
            ("home", "Vérifier une clause de bail", "Vérifier"), ("data", "Se conformer à la protection des données", "Se mettre"),
            ("question", "« Est-ce que j’ai le droit de faire ça ? »", "Répondre")]
    out = box(f'<div class="row" style="padding:30px 44px;gap:18px;border-bottom:1px solid rgba(245,245,247,.1)">{icon("cal", 34)}'
              f'<span class="h4">À traiter cette semaine</span></div>', 460, 140, 1000, 800, "card", "rise", 0.0)
    for i, (ic, txt, anchor) in enumerate(rows):
        t = c.a(anchor)
        out += box(f'<div class="row" style="gap:24px">{ibox(ic, 58, 30)}<span style="font-size:31px;font-weight:500">{txt}</span></div>',
                   508, 250 + i * 94, 900, None, "", "rise", t, dx=40)
    return out


@scene("La plupart de ces besoins ne finiront jamais devant un juge. Ils demandent de la rigueur, de la recherche et une réponse claire. Pas une plaidoirie.", section="02 · Le quotidien d’une PME")
def _(c):
    t0 = c.a("jamais")
    out = words("Jamais devant un juge.", 200, 230, 1500, "h0", t0 - 0.2)
    for i, (txt, a) in enumerate((("Rigueur", "rigueur"), ("Recherche", "recherche"), ("Réponse claire", "réponse"))):
        out += box(f'<div class="chip inv" style="font-size:38px;padding:22px 40px">{txt}</div>', 200 + i * 400, 500, None, None, "", "pop", c.a(a))
    tp = c.a("Pas")
    out += words("Pas une plaidoirie.", 200, 680, 1500, "h2 mute", tp)
    out += box("", 200, 722, 560, 4, "", "width", tp + 0.7, d=0.45, style="background:#f5f5f7;transform-origin:0 50%")
    return out


@scene("Et c’est là que la facturation à l’heure pose un problème. Pas parce qu’elle serait injuste, mais parce qu’elle vous fait hésiter.", section="02 · Le quotidien d’une PME")
def _(c):
    t0 = c.a("facturation")
    return (box('<div class="kick">Le vrai problème de la facturation à l’heure</div>', 200, 230, None, None, "", "rise", t0)
            + words("Pas parce qu’elle serait injuste.", 200, 300, 1500, "h2 mute", c.a("Pas"))
            + words("Parce qu’elle vous fait hésiter.", 200, 420, 1500, "h0", c.a("mais") + 0.2, st=0.07)
            + box(icon("clock", 64), 200, 760, None, None, "", "rise", t0 + 0.3))


@scene("Quand chaque question a un coût que vous ne connaissez pas d’avance, vous posez moins de questions. Vous attendez que le problème grossisse.", section="02 · Le quotidien d’une PME")
def _(c):
    t1, t2 = c.a("vous posez"), c.a("Vous attendez")
    d = "M0 380 C 300 378, 520 372, 700 352 S 1050 260, 1180 150 S 1330 20, 1380 0"
    chart = (f'<svg width="1400" height="400" viewBox="0 0 1400 400" style="overflow:visible">'
             f'<path d="M0 400 H1400" stroke="rgba(245,245,247,.25)" stroke-width="2"/>'
             f'<path d="M0 0 V400" stroke="rgba(245,245,247,.25)" stroke-width="2"/>'
             f'<path d="{d}" fill="none" stroke="#f5f5f7" stroke-width="5" stroke-linecap="round" pathLength="1" data-fx="draw" data-at="{t2 - 0.2}" data-d="{c.end - t2 + 0.2}"/></svg>')
    return (words("Coût inconnu ?", 200, 170, 900, "h2", c.a("Quand"))
            + words("On pose moins de questions.", 200, 250, 1200, "h2 mute", t1)
            + box(f'<div class="card" style="padding:50px 60px 70px">{chart}</div>', 200, 360, 1520, 560, "", "rise", c.times[0] + 0.4)
            + box('<div class="chip" style="font-size:24px">Question non posée</div>', 250, 670, None, None, "", "pop", t1 + 0.3)
            + box('<div class="chip inv" style="font-size:26px">Le problème grossit</div>', 1250, 420, None, None, "", "pop", c.e("grossisse") - 0.1)
            + box('<div class="sm">Temps</div>', 1600, 860, None, None, "", "fade", t2))


@scene("Et une erreur évitée coûte toujours moins cher qu’une erreur réparée.", section="02 · Le quotidien d’une PME")
def _(c):
    t1, t2 = c.a("erreur évitée"), c.a("erreur réparée")
    return (box('<div class="kick">Prévenir ou réparer</div>', 200, 190, None, None, "", "rise", 0.1)
            + box("", 520, 760 - 90, 300, 90, "", "height", t1, d=0.6, style="background:rgba(245,245,247,.35);border-radius:14px 14px 0 0;transform-origin:50% 100%")
            + box("", 1100, 760 - 520, 300, 520, "", "height", t2, d=1.0, style="background:#f5f5f7;border-radius:14px 14px 0 0;transform-origin:50% 100%")
            + box("", 360, 760, 1200, 2, "rule", "width", 0.1, d=0.8)
            + box('<div class="h3 c">Erreur évitée</div>', 420, 790, 500, None, "c", "rise", t1)
            + box('<div class="h3 c">Erreur réparée</div>', 1000, 790, 500, None, "c", "rise", t2))


@scene("Une clause de non-concurrence mal rédigée. Une mise en demeure envoyée au mauvais moment. Des CGV qui ne s’appliquent pas.", section="02 · Le quotidien d’une PME")
def _(c):
    docs = [("Clause de non-concurrence", "mal rédigée", "Contestable", c.a("Une clause")),
            ("Mise en demeure", "envoyée au mauvais moment", "Trop tard", c.a("Une mise")),
            ("Conditions générales", "jamais acceptées", "Sans effet", c.a("Des CGV"))]
    out = ""
    for i, (t1, t2, stamp, t) in enumerate(docs):
        x = 200 + i * 520
        lines = "".join(f'<div class="line" style="width:{w}%;margin-top:22px"></div>' for w in (92, 78, 86, 64, 88, 52))
        out += box(f'<div style="padding:44px 40px">{ibox("doc", 64, 34)}<div class="h4" style="margin-top:34px">{t1}</div>'
                   f'<div class="p" style="margin-top:6px">{t2}</div><div style="margin-top:18px">{lines}</div></div>',
                   x, 210, 480, 620, "card", "rise", t)
        out += box(f'<div class="stampbox" style="background:rgba(10,10,11,.85)">{stamp}</div>', x + 120, 640, None, None, "", "stamp", t + 1.1, rot=-9)
    return out


@scene("Ce sont des erreurs qui coûtent des milliers de francs, et qui se seraient réglées en une question.", section="02 · Le quotidien d’une PME")
def _(c):
    return (words("Des milliers de francs.", 200, 330, 640, "h1 mute", c.a("des milliers"))
            + box("", 959, 260, 2, 420, "", "height", c.a("des milliers") + 0.5, d=0.7, style="background:rgba(245,245,247,.25);transform-origin:50% 0")
            + words("Ou une seule question.", 1060, 330, 700, "h1", c.a("une question") - 0.3))


# ---------------------------------------------------------------- 4. Le service juridique externalisé
@scene("Un service juridique externalisé, c’est un service qui s’occupe des questions juridiques de votre entreprise, sans que vous ayez à embaucher. Vous y faites appel quand vous en avez besoin.", section="03 · Le service juridique externalisé")
def _(c):
    t0 = c.times[0]
    tw, ts, tq = c.a("questions juridiques"), c.a("sans que"), c.a("Vous y faites")
    return (box('<div class="kick">03 · Le service juridique externalisé</div>', 200, 180, None, None, "", "rise", t0)
            + words("Un service juridique pour votre entreprise.", 200, 230, 1520, "h1", t0 + 0.1)
            + box(f'<div style="padding:40px;text-align:center">{ibox("building", 110, 58)}<div class="h4" style="margin-top:24px">Votre entreprise</div></div>',
                  260, 470, 400, 330, "card", "rise", tw)
            + box('<div style="padding:40px;text-align:center"><img src="assets/img/crest-alpha.png" style="width:110px;height:114px;object-fit:contain">'
                  '<div class="h4" style="margin-top:20px">Thrax Legal</div></div>', 1260, 470, 400, 330, "card hi", "rise", tw + 0.4)
            + box("", 680, 634, 560, 3, "", "width", tw + 0.6, d=0.8, style="background:#f5f5f7")
            + box('<div class="chip">Sans embauche</div>', 760, 540, None, None, "", "pop", ts)
            + box('<div class="chip inv">Quand vous en avez besoin</div>', 690, 680, None, None, "", "pop", tq))


@scene("Chez Thrax Legal, on s’occupe exactement de ce quotidien juridique : contrats, conditions générales, droit du travail, recouvrement de factures, protection des données, baux commerciaux.", section="03 · Le service juridique externalisé")
def _(c):
    t0 = c.a("Chez")
    tiles = [("doc", "Contrats", "contrats"), ("pen", "Conditions générales", "conditions"), ("brief", "Droit du travail", "droit"),
             ("receipt", "Recouvrement", "recouvrement"), ("data", "Protection des données", "protection"), ("home", "Baux commerciaux", "baux")]
    out = (box('<img src="assets/img/crest-alpha.png" style="width:330px;height:344px;object-fit:contain">', 200, 220, None, None, "", "pop", t0)
           + box('<div class="h2">Thrax <span class="mute">Legal</span></div>', 200, 600, None, None, "", "rise", t0 + 0.3)
           + box('<div class="p">Votre quotidien juridique.</div>', 200, 690, 520, None, "", "rise", c.a("quotidien")))
    for i, (ic, txt, a) in enumerate(tiles):
        x = 760 + (i % 2) * 490
        y = 200 + (i // 2) * 230
        out += box(f'<div class="row" style="padding:0 36px;height:100%;gap:26px">{ibox(ic, 80, 42)}<span class="h4">{txt}</span></div>',
                   x, y, 460, 200, "card", "rise", c.a(a))
    return out


@scene("Concrètement, vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Puis vous recevez une réponse claire, par écrit.", section="03 · Le service juridique externalisé")
def _(c):
    t1, t2, t3 = c.a("vous décrivez"), c.a("Chaque"), c.a("Puis vous recevez")
    s1 = (f'<div style="padding:40px"><div class="num">01</div><div class="h4" style="margin-top:14px">Vous décrivez votre situation</div>'
          f'<div class="flabel" style="margin-top:34px">Votre situation</div>'
          f'<div class="field" style="height:150px;align-items:flex-start;padding-top:18px;font-size:22px;line-height:1.4;white-space:normal">'
          f'<span data-fx="type" data-at="{t1 + 0.6}" data-cps="24">Mon client refuse de payer une facture de 4 860 francs depuis deux mois…</span></div>'
          f'<div class="btn" style="margin-top:26px;height:58px;font-size:22px">Envoyer</div></div>')
    li = "".join(f'<div class="row" style="gap:14px;margin-top:22px" data-fx="check" data-at="{t2 + 0.5 + k * 0.45}">'
                 f'<div class="chk" style="width:38px;height:38px">{CHECK_SVG}</div><span style="font-size:26px">{w}</span></div>'
                 for k, w in enumerate(("Analyse", "Recherche juridique", "Rédaction", "Relecture")))
    s2 = (f'<div style="padding:40px"><div class="num">02</div><div class="h4" style="margin-top:14px">Analysé et recherché</div>'
          f'<div style="margin-top:20px">{li}</div><div class="chip" style="margin-top:34px;font-size:22px">Jamais improvisé</div></div>')
    s3 = (f'<div style="padding:40px"><div class="num">03</div><div class="h4" style="margin-top:14px">Réponse écrite</div>'
          f'<div style="margin-top:44px;display:flex;justify-content:center">{ibox("doc", 150, 80, inv=True)}</div>'
          f'<div class="h4 c" style="margin-top:34px">Une réponse claire</div><div class="p c" style="margin-top:6px">par écrit</div></div>')
    return (box(s1, 200, 220, 480, 600, "card", "rise", t1)
            + box(icon("arrow", 44), 694, 500, None, None, "", "rise", t2 - 0.3, dx=-30)
            + box(s2, 720, 220, 480, 600, "card", "rise", t2)
            + box(icon("arrow", 44), 1214, 500, None, None, "", "rise", t3 - 0.3, dx=-30)
            + box(s3, 1240, 220, 480, 600, "card hi", "rise", t3))


@scene("Et tout reste par écrit : vous savez exactement ce qui a été dit et pourquoi.", section="03 · Le service juridique externalisé")
def _(c):
    t0 = c.a("tout")
    ls = [f'<div class="line" style="width:{w}%;margin-top:20px;background:rgba(245,245,247,.2)" data-fx="width" data-at="{t0 + 0.4 + k * 0.28}" data-d="0.5"></div>'
          for k, w in enumerate((94, 88, 97, 70, 90, 84, 60))]
    doc = (f'<div style="padding:46px 50px"><div class="row" style="gap:18px">{icon("doc", 34)}<span class="kick" style="color:rgba(245,245,247,.75)">Votre dossier · Réponse écrite</span></div>'
           f'<div class="h4" style="margin-top:30px">Ce que dit le droit</div>{"".join(ls[:4])}'
           f'<div class="h4" style="margin-top:34px">Ce que nous recommandons, et pourquoi</div>{"".join(ls[4:])}</div>')
    return (words("Tout reste par écrit.", 200, 330, 700, "h1", t0)
            + box('<div class="p">Ce qui a été dit, et pourquoi.</div>', 200, 560, 700, None, "", "rise", c.a("vous savez"))
            + box(doc, 1000, 170, 720, 760, "card", "rise", t0 - 0.2))


# ---------------------------------------------------------------- 5. Comparaison
@scene("Mettons les deux côte à côte.", section="04 · Comparaison")
def _(c):
    t0 = c.times[0]
    return (box('<div class="big-outline">04</div>', 200, 210, None, None, "", "fade", t0 - 0.3, d=0.8)
            + words("Côte à côte.", 200, 470, 900, "h0", t0 + 0.1)
            + box(f'<div class="card" style="padding:36px 44px;display:flex;gap:22px;align-items:center">{ibox("scale", 76, 40)}<span class="h3">Avocat</span></div>',
                  1080, 300, 560, None, "", "rise", t0 + 0.3, dx=80)
            + box(f'<div class="card hi" style="padding:36px 44px;display:flex;gap:22px;align-items:center">'
                  f'<img src="assets/img/crest-alpha.png" style="width:76px;height:78px;object-fit:contain"><span class="h3">Thrax Legal</span></div>',
                  1080, 500, 560, None, "", "rise", t0 + 0.6, dx=80))


@scene("La facturation : l’avocat facture en général au temps passé. Thrax Legal fonctionne par abonnement à prix fixe. Le coût : chez l’avocat, il dépend du temps nécessaire. Chez Thrax Legal, vous le connaissez à l’avance, chaque mois. Le contact : rendez-vous d’un côté. En ligne de l’autre, avec une réponse écrite.", section="04 · Comparaison")
def _(c):
    times = [(c.a("La facturation"), c.a("l’avocat facture"), c.a("Thrax Legal fonctionne")),
             (c.a("Le coût"), c.a("chez l’avocat"), c.a("Chez Thrax")),
             (c.a("Le contact"), c.a("rendez-vous"), c.a("En ligne"))]
    return table(c, ROWS, 0, times)


@scene("Les tribunaux : l’avocat vous représente. Thrax Legal ne plaide pas. La confidentialité : l’avocat est soumis au secret professionnel légal. Chez Thrax Legal, vos informations sont protégées par une obligation de confidentialité contractuelle.", section="04 · Comparaison")
def _(c):
    times = [(c.a("Les tribunaux"), c.a("l’avocat vous"), c.a("Thrax Legal ne")),
             (c.a("La confidentialité"), c.a("l’avocat est"), c.a("Chez Thrax"))]
    return table(c, ROWS, 3, times)


@scene("Vous le voyez : ce ne sont pas des concurrents. Ce sont deux outils pour deux besoins différents.", section="04 · Comparaison")
def _(c):
    t1 = c.a("Ce sont")
    return (words("Pas des concurrents.", 200, 180, 1500, "h2 mute", c.a("ce ne"))
            + words("Deux outils. Deux besoins.", 200, 260, 1500, "h1", t1)
            + box(f'<div style="padding:44px">{ibox("scale", 90, 48)}<div class="h3" style="margin-top:34px">Avocat</div>'
                  f'<div class="p" style="margin-top:10px">Le tribunal, le pénal, les conflits à fort enjeu.</div></div>', 200, 450, 740, 420, "card", "rise", c.a("deux outils"))
            + box(f'<div style="padding:44px"><img src="assets/img/crest-alpha.png" style="width:90px;height:94px;object-fit:contain">'
                  f'<div class="h3" style="margin-top:30px">Thrax Legal</div>'
                  f'<div class="p" style="margin-top:10px">Le quotidien juridique, à prix fixe.</div></div>', 980, 450, 740, 420, "card hi", "rise", c.a("deux besoins")))


# ---------------------------------------------------------------- 6. Comment choisir
@scene("Alors, comment choisir ? Une règle simple.", section="05 · Comment choisir")
def _(c):
    t0 = c.times[0]
    return (box('<div class="big-outline">05</div>', 200, 210, None, None, "", "fade", t0 - 0.3, d=0.8)
            + words("Comment choisir ?", 200, 470, 1500, "h0", c.a("comment"))
            + box('<div class="chip inv" style="font-size:30px">Une règle simple</div>', 200, 660, None, None, "", "pop", c.a("Une")))


LEFT = ["Vous allez au tribunal", "Vous êtes visé par une procédure pénale", "L’enjeu est très important et le conflit déjà ouvert"]
RIGHT = ["Prévenir les problèmes", "Rédiger, relire", "Envoyer les bonnes lettres au bon moment", "Obtenir des réponses claires", "Sans regarder le compteur"]


@scene("Prenez un avocat si vous allez au tribunal, si vous êtes visé par une procédure pénale, ou si l’enjeu est très important et le conflit déjà ouvert.", section="05 · Comment choisir")
def _(c):
    lt = [c.a("vous allez"), c.a("vous êtes"), c.a("l’enjeu")]
    return columns(LEFT, [], lt, [])


@scene("Faites appel à un service juridique externalisé pour tout le reste : prévenir les problèmes, rédiger, relire, envoyer les bonnes lettres au bon moment et obtenir des réponses claires sans regarder le compteur.", section="05 · Comment choisir")
def _(c):
    rt = [c.a("prévenir"), c.a("rédiger"), c.a("envoyer"), c.a("obtenir"), c.a("sans regarder")]
    return columns(LEFT, RIGHT, [-1, -1, -1], rt)


@scene("Et si votre dossier dépasse ce qu’on peut faire, on vous le dit clairement et on vous oriente vers un avocat. Sans vous faire perdre de temps.", section="05 · Comment choisir")
def _(c):
    t0, t1 = c.a("dépasse"), c.a("on vous oriente")
    arc = (f'<svg width="1000" height="200" viewBox="0 0 1000 200" style="overflow:visible">'
           f'<path d="M940 190 C 820 20, 180 20, 60 190" fill="none" stroke="#f5f5f7" stroke-width="4" stroke-linecap="round" '
           f'pathLength="1" data-fx="draw" data-at="{t1 - 0.2}" data-d="1.1"/>'
           f'<path d="M60 190 l -6 -30 M60 190 l 28 -12" fill="none" stroke="#f5f5f7" stroke-width="4" stroke-linecap="round" data-fx="fade" data-at="{t1 + 0.8}" data-d="0.2"/></svg>')
    return (columns(LEFT, RIGHT, [-1] * 3, [-1] * 5, dim_all=t0)
            + box(arc, 460, 110, 1000, 200, "", None)
            + box('<div class="chip inv" style="font-size:30px;padding:18px 34px">On vous oriente vers un avocat</div>', 0, 470, 1920, None, "c", "pop", t1 + 0.4)
            + box('<div class="chip" style="font-size:28px">Sans perdre de temps</div>', 0, 580, 1920, None, "c", "rise", c.a("Sans")))


# ---------------------------------------------------------------- 7. L'abonnement
@scene("Thrax Legal fonctionne par abonnement mensuel, à prix fixe. Il existe plusieurs formules, selon le volume de votre entreprise. Vous trouverez le détail sur thrax-legal.ch.", section="06 · L’abonnement")
def _(c):
    t0 = c.a("Thrax")
    cards = [("cal", "Abonnement mensuel", "Un montant connu, chaque mois", c.a("abonnement")),
             ("lock", "Prix fixe", "Jamais facturé à l’heure", c.a("à prix")),
             ("building", "Selon votre volume", "Plusieurs formules", c.a("Il existe"))]
    out = (box('<div class="kick">L’abonnement Thrax Legal</div>', 200, 170, None, None, "", "rise", t0)
           + words("Un prix fixe. Pas de compteur.", 200, 220, 1520, "h1", t0 + 0.2))
    for i, (ic, t1, t2, t) in enumerate(cards):
        out += box(f'<div style="padding:44px 40px">{ibox(ic, 96, 50)}<div class="h3" style="margin-top:44px;font-size:40px">{t1}</div>'
                   f'<div class="p" style="margin-top:10px">{t2}</div></div>', 200 + i * 520, 400, 480, 380, "card" + (" hi" if i == 1 else ""), "rise", t)
    out += box(f'<div class="chip inv" style="font-size:28px">{icon("link", 30, extra="style=stroke:#0a0a0b")}Le détail des formules sur thrax-legal.ch</div>',
               200, 830, None, None, "", "pop", c.a("Vous trouverez"))
    return out


@scene("Pas de facture surprise. Juste un interlocuteur à qui poser vos questions, avant qu’elles deviennent des problèmes.", section="06 · L’abonnement")
def _(c):
    t1, t3 = c.a("Pas de facture"), c.a("Juste")
    t2 = t1 + 1.0
    return (box(timer_card(0, 0, 0, rate=90, stop=t2 + 0.3, label="Compteur"), 200, 200, 760, 300, "card", "rise", -1, dim=t2 + 0.3)
            + box("", 240, 350, 680, 5, "", "width", t2 + 0.3, d=0.4, style="background:#f5f5f7;transform-origin:0 50%;transform:rotate(-6deg)")
            + words("Pas de facture surprise.", 1060, 220, 680, "h3", t1)
            + words("Un interlocuteur, avant que vos questions deviennent des problèmes.", 200, 600, 1520, "h1", t3, st=0.06))


# ---------------------------------------------------------------- 8. Appel à l'action
FORM_FIELDS = (("Nom", "Claire Dubois"), ("Entreprise", "Atelier Dubois Sàrl"), ("Téléphone", "079 123 45 67"))


def form_body(t_type, t_click, done_at):
    f = ""
    for k, (lab, val) in enumerate(FORM_FIELDS):
        f += (f'<div style="margin-top:{22 if k else 0}px"><div class="flabel">{lab}</div><div class="field">'
              f'<span data-fx="type" data-at="{t_type + k * 0.9 if t_type >= 0 else -1}" data-cps="22">{val}</span></div></div>')
    body = (f'<div style="padding:44px 56px"><div class="kick">Contact</div><div class="h3" style="margin-top:12px">Être rappelé gratuitement</div>'
            f'<div style="margin-top:34px">{f}</div><div class="btn" style="margin-top:34px">Être rappelé</div></div>')
    done = box(f'<div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;background:#141416">'
               f'<div class="ico inv" style="width:110px;height:110px;border-radius:50%">{icon("check", 60)}</div>'
               f'<div class="h3">Merci, on vous rappelle.</div><div class="p">Sans engagement.</div></div>', 0, 72, 860, 688, "", "fade", done_at, d=0.4)
    return body + done


@scene("Vous ne savez pas encore si c’est fait pour vous ? Demandez à être rappelé gratuitement sur thrax-legal.ch.", section="07 · Être rappelé")
def _(c):
    t0, t1 = c.a("Vous"), c.a("Demandez")
    return (words("Pas encore sûr ?", 200, 300, 700, "h1", t0)
            + words("Demandez à être rappelé, gratuitement.", 200, 430, 680, "h2 mute", t1)
            + browser(860, 170, 860, 760, t0 + 0.2, t0 + 0.5, form_body(t1 + 0.3, 99, 99))
            + cursor(f"{t1 + 2.4},1700,980;{c.end - 0.3},1060,790", click=f"{c.end - 0.2}"))


@scene("C’est sans engagement : on regarde ensemble vos besoins, et on vous dit honnêtement si Thrax Legal vous convient, ou s’il vous faut plutôt un avocat.", section="07 · Être rappelé")
def _(c):
    items = [("Sans engagement", c.a("sans engagement")), ("On regarde ensemble vos besoins", c.a("on regarde")),
             ("On vous dit honnêtement si c’est pour vous", c.a("on vous dit"))]
    out = browser(860, 170, 860, 760, -1, -1, form_body(-1, -1, 0.15)) + cursor(f"0,1060,790;1.0,2050,1200")
    for i, (txt, t) in enumerate(items):
        out += box(f'<div class="row" style="align-items:flex-start"><div class="chk">{CHECK_SVG}</div><div class="h4" style="font-size:36px">{txt}</div></div>',
                   200, 300 + i * 150, 600, None, "", "check", t)
    return out


@scene("Le lien est dans la description.", section="07 · Être rappelé")
def _(c):
    t0 = c.times[0]
    return (words("Le lien est dans la description.", 160, 330, 1600, "h1", t0, align="center")
            + box(f'<div class="chip inv" style="font-size:34px;padding:22px 40px">{icon("link", 34, extra="style=stroke:#0a0a0b")}thrax-legal.ch/fr/contact</div>',
                  0, 520, 1920, None, "c", "pop", t0 + 0.6)
            + box(icon("down", 70), 925, 700, None, None, "", "float", 0)
            )


@scene("Et si vous voulez aller plus loin, on a préparé des guides complets sur les contrats de travail, les CGV, les factures impayées, la protection des données et les baux commerciaux. Ils sont aussi en lien sous la vidéo.", section="07 · Être rappelé")
def _(c):
    t0 = c.a("des guides")
    g = [("brief", "Contrat de travail", "contrats"), ("pen", "CGV en Suisse", "CGV"), ("receipt", "Factures impayées", "factures"),
         ("data", "Protection des données", "protection"), ("home", "Bail commercial", "baux")]
    out = (box('<div class="kick">Les guides Thrax Legal</div>', 200, 200, None, None, "", "rise", t0)
           + words("Allez plus loin.", 200, 250, 1500, "h1", c.a("Et si")))
    for i, (ic, txt, a) in enumerate(g):
        out += box(f'<div style="padding:34px 30px">{ibox(ic, 70, 36)}<div class="h4" style="margin-top:80px;font-size:29px">{txt}</div>'
                   f'<div class="sm" style="margin-top:10px">Guide complet</div></div>', 200 + i * 308, 430, 284, 380, "card", "rise", c.a(a))
    out += box('<div class="chip" style="font-size:26px">En lien sous la vidéo</div>', 200, 850, None, None, "", "rise", c.a("Ils sont"))
    return out


@scene("", section=None, dur=7.0)
def _(c):
    return (box('<img src="assets/img/crest-alpha.png" style="width:300px;height:313px;object-fit:contain">', 810, 170, None, None, "", "pop", 0.3)
            + box('<div class="h1">Thrax <span class="mute">Legal</span></div>', 0, 530, 1920, None, "c", "rise", 0.8)
            + box('<div class="p" style="font-size:32px">Votre service juridique externalisé, à prix fixe.</div>', 0, 650, 1920, None, "c", "rise", 1.1)
            + box('<div class="chip inv" style="font-size:30px">thrax-legal.ch</div>', 0, 740, 1920, None, "c", "pop", 1.5)
            + box('<div class="sm" style="font-size:19px">Informations générales — ne remplace pas un conseil personnalisé.</div>', 0, 900, 1920, None, "c", "fade", 2.0))
