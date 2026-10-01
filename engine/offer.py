"""The Thrax Legal blocks shared by every guide video: mid-roll and the closing offer + call to action.
No prices, plan names, volumes or response times: those live on the website and may change."""
from kit import box, ibox, icon, words
from tpl import S, brand, cta, end, lst, orient, process, subscribe, subscription


def midroll(vo1, head, vo2, step1, step2, section, icons=("receipt", "mail"), chip_at=None):
    """Two quick beats: the question, then what we do about it."""
    def b1(c):
        t0 = c.times[0]
        return (box('<img src="assets/img/crest-alpha.png" style="width:150px;height:156px;object-fit:contain">', 200, 230, None, None, "", "pop", t0)
                + box('<div class="kick">Thrax Legal</div>', 380, 290, None, None, "", "rise", t0 + 0.1)
                + box('<div class="h4">Service juridique externalisé</div>', 380, 330, None, None, "", "rise", t0 + 0.2)
                + words(head, 200, 470, 1520, "h1", t0 + 0.2)
                + box('<div class="chip inv" style="font-size:28px">C’est exactement ce qu’on traite pour nos abonnés</div>', 200, 720, None, None, "", "pop",
                      c.a(chip_at) if chip_at else t0 + 1.2))

    def b2(c):
        t1, t2, t3 = c.times[0], c.a(step2[1]), c.a("Le lien")
        card = lambda ic, txt, inv: (f'<div style="padding:44px;display:flex;flex-direction:column;gap:30px">{ibox(ic, 110, 58, inv=inv)}'
                                     f'<div class="h3" style="font-size:44px">{txt}</div></div>')
        return (box(card(icons[0], step1[0], False), 200, 260, 660, 420, "card", "rise", t1, dx=-80)
                + box(icon("arrow", 70), 925, 430, None, None, "", "pop", t2 - 0.2)
                + box(card(icons[1], step2[0], True), 1060, 260, 660, 420, "card hi", "rise", t2, dx=80)
                + box(f'<div class="chip inv" style="font-size:28px">{icon("link", 30, extra="style=stroke:#0a0a0b")}Lien dans la description</div>', 200, 760, None, None, "", "pop", t3))
    S(vo1, section)(b1)
    S(vo2, section)(b2)


def brand_intro():
    def b(c):
        t0 = c.times[0]
        return (box('<img src="assets/img/crest-alpha.png" style="width:280px;height:292px;object-fit:contain">', 820, 150, None, None, "", "pop", t0)
                + box('<div class="h0 c">Thrax <span class="mute">Legal</span></div>', 0, 470, 1920, None, "c", "rise", c.a("Thrax Legal existe"))
                + words("Un service juridique externalisé, pour les indépendants et les PME de Suisse romande.", 260, 660, 1400, "h3", c.a("un service"), align="center"))
    return b


def offer_block(section, intro_vo, intro_head, intro_items, what_vo, what_items, guide_label, intro_mode="cross", intro_kicker="Faire seul ?"):
    S(intro_vo, section)(lst(intro_kicker, intro_head, intro_items, mode=intro_mode))
    S("C’est exactement pour ça que Thrax Legal existe : un service juridique externalisé, pour les indépendants et les PME de Suisse romande.", section)(brand_intro())
    S(what_vo, section)(brand("Ce qu’on fait pour vous :", what_items))
    S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez une réponse claire, par écrit.", section)(process())
    S("Pas de facture à l’heure qui grimpe : c’est un abonnement mensuel, à prix fixe. Le détail des formules est sur le site.", section)(subscription())
    S("Et si votre dossier exige un avocat, par exemple pour aller au tribunal, on vous le dit clairement et on vous oriente.", section)(orient())
    S("Vous voulez savoir si c’est fait pour vous ? Demandez à être rappelé gratuitement sur thrax-legal.ch. Le lien est dans la description, avec le guide complet de cette vidéo.",
      section)(cta(guide_label))
    S("Et si cette vidéo vous a été utile, abonnez-vous : on publie régulièrement des guides juridiques pour les entrepreneurs de Suisse romande.", section)(subscribe())
    S("", None, dur=6.0)(end())
