"""Reel 009 — Malade pendant les premiers mois : le salaire est-il dû ? (art. 324a CO). Style : tableau blanc dessiné au feutre. Histoire fictive signalée."""
VOICE = "fr-FR-DeniseNeural"
RATE = "+10%"

VO = ("Malade deux semaines, et son patron refuse de le payer. Marc travaille depuis quatre mois dans une entreprise à Neuchâtel. "
      "Une grosse grippe, deux semaines d'arrêt, certificat médical à l'appui. Son patron lui dit : ces jours-là ne seront pas payés. "
      "Faux. En Suisse, si ton contrat dure depuis plus de trois mois et que tu es malade sans faute de ta part, "
      "ton employeur doit continuer à te payer. Au minimum trois semaines pendant la première année de service. "
      "Ensuite, plus longtemps, selon ton ancienneté. Beaucoup d'entreprises ont aussi une assurance perte de gain, "
      "qui doit offrir au moins autant. Marc ne repartira donc pas les mains vides. Article 324a du Code des obligations. "
      "Envoie ça à quelqu'un qui est en arrêt maladie. Thrax Legal, lien en bio.")

META = {
    "id": "r009-maladie-tableau-blanc",
    "music": "lofi",
    "caption": ("Malade après 4 mois dans un nouveau job, et ton patron refuse de te payer ? (histoire fictive, situation courante) 🤒\n\n"
                "En Suisse, si les rapports de travail ont duré plus de 3 mois (ou ont été conclus pour plus de 3 mois) et que tu es "
                "empêché de travailler sans faute de ta part, l'employeur doit payer le salaire pour un temps limité : au moins "
                "3 semaines la 1re année de service, puis plus longtemps selon l'ancienneté (art. 324a CO).\n\n"
                "Un accord écrit, un contrat-type ou une CCT peut remplacer cette règle par une assurance perte de gain, "
                "à condition qu'elle offre des prestations au moins équivalentes "
                "(art. 324a al. 4 CO).\n\n"
                "📤 Envoie ça à quelqu'un en arrêt maladie. Une question ? Thrax Legal, lien en bio.\n\n"
                "#arretmaladie #salaire #travail #suisse #neuchatel #lausanne #genève #suisseromande #droitdutravail"),
    "yt_title": "Malade après 4 mois de travail : ton patron doit-il te payer ? (Suisse) #shorts",
    "tiktok_title": "Malade et pas payé par ton patron ? En Suisse, c'est faux",
    "tags": ["arrêt maladie", "salaire", "droit du travail suisse", "art. 324a CO", "Neuchâtel"],
    "genome": {"style": "tableau-blanc-dessine", "palette": "blanc/feutres noir-rouge-bleu", "hook": "injustice-chiffree",
               "format": "histoire-fictive-twist", "topic": "travail/salaire-maladie", "mascot": "bonhomme-baton-marc",
               "voice": "fr-FR-DeniseNeural", "captions": "feutre-noir", "music": "lofi", "length": "~35s"},
    "cover_t": 1.6,
}

K, R_, B, G = "#1d1d1f", "#d62828", "#1d4ed8", "#059669"

CSS = """
#root { background: #f6f6f2; color: #1d1d1f; }
.board { position:absolute; left:24px; top:24px; right:24px; bottom:24px; border-radius: 18px; border: 14px solid #c9ccd1; box-shadow: inset 0 0 80px rgba(0,0,0,0.05); background:
  radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.9), rgba(246,246,242,0) 60%), #f6f6f2; }
.tray { position:absolute; left:120px; right:120px; top:1700px; height:40px; border-radius: 10px; background:#b8bcc2; }
.pen { position:absolute; top:1672px; width:150px; height:30px; border-radius: 15px; }
.fict { position:absolute; left:0; right:0; top:110px; text-align:center; }
.fict span { display:inline-block; font-size: 32px; font-weight: 700; color:#6b6b6b; border: 3px dashed #9a9a9a; border-radius: 12px; padding: 8px 18px; }
.hand { font-family: "Caveat", cursive; font-weight: 700; }
.lbl { position:absolute; font-size: 78px; }
svg.d path, svg.d circle, svg.d rect, svg.d line, svg.d polyline { fill:none; stroke-linecap:round; stroke-linejoin:round; }
.chip { display:inline-block; font-size: 60px; font-weight: 900; padding: 16px 34px; border: 7px solid #1d1d1f; border-radius: 20px; transform: rotate(-3deg); }
.brand { font-size: 112px; font-weight: 900; letter-spacing: -0.05em; }
.brand span { color:#d62828; }
.cap { top: 1270px; font-size: 70px; }
.cap .cw { color:#1d1d1f; -webkit-text-stroke: 0; }
.cap .cw.now { color:#d62828; transform: scale(1.06); }
"""


def P(d, c, w, at, dur=0.6, extra=""):
    return f'<path d="{d}" stroke="{c}" stroke-width="{w}" pathLength="1" data-fx="draw" data-d="{dur}" data-at="{at:.3f}" {extra}/>'


def stick(x, y, at, c=K, smile=None, tie=False):
    """Bonhomme bâton dessiné au feutre ; tête à (x, y)."""
    s = [f'<circle cx="{x}" cy="{y}" r="55" stroke="{c}" stroke-width="10" pathLength="1" data-fx="draw" data-d="0.5" data-at="{at:.3f}"/>',
         P(f"M{x} {y+55} L{x} {y+250}", c, 10, at + 0.3, 0.3),
         P(f"M{x} {y+110} L{x-90} {y+190} M{x} {y+110} L{x+90} {y+190}", c, 10, at + 0.45, 0.35),
         P(f"M{x} {y+250} L{x-70} {y+390} M{x} {y+250} L{x+70} {y+390}", c, 10, at + 0.6, 0.35),
         f'<circle cx="{x-20}" cy="{y-10}" r="6" fill="{c}" data-fx="fade" data-d="0.1" data-at="{at+0.5:.3f}"/>',
         f'<circle cx="{x+20}" cy="{y-10}" r="6" fill="{c}" data-fx="fade" data-d="0.1" data-at="{at+0.5:.3f}"/>']
    mouth = {"sad": f"M{x-22} {y+30} Q{x} {y+12} {x+22} {y+30}", "happy": f"M{x-24} {y+18} Q{x} {y+40} {x+24} {y+18}",
             "flat": f"M{x-20} {y+24} L{x+20} {y+24}"}[smile or "flat"]
    s.append(P(mouth, c, 8, at + 0.55, 0.2))
    if tie:
        s.append(P(f"M{x} {y+60} L{x-14} {y+120} L{x} {y+150} L{x+14} {y+120} Z", R_, 7, at + 0.7, 0.3))
    return "".join(s)


def body(w):
    t_marc = w.a("Marc travaille")
    t_grippe = w.a("Une grosse grippe,")
    t_cert = w.a("certificat médical")
    t_patron = w.a("Son patron lui dit")
    t_faux = w.a("Faux.")
    t_suisse = w.a("En Suisse,")
    t_trois_mois = w.a("plus de trois mois")
    t_sans_faute = w.a("sans faute")
    t_doit = w.a("ton employeur doit")
    t_min = w.a("Au minimum")
    t_ensuite = w.a("Ensuite,")
    t_assur = w.a("Beaucoup d'entreprises")
    t_autant = w.a("au moins autant.")
    t_marc2 = w.a("Marc ne repartira")
    t_art = w.a("Article 324a")
    t_envoie = w.a("Envoie")
    t_thrax = w.a("Thrax Legal,")
    o = lambda a: f'data-out="{a - 0.2:.3f}"'
    globals()["PUNCH"] = [t_faux, t_marc2]
    return f"""
<div class="board"></div>
<div class="tray"></div>
<div class="pen" style="left:200px;background:{K}"></div><div class="pen" style="left:380px;background:{R_}"></div><div class="pen" style="left:560px;background:{B}"></div>
<div class="fict" data-fx="fade" data-d="0.2" data-at="0" data-out="{t_art - 0.2:.3f}"><span>Histoire fictive inspirée de situations courantes</span></div>

<!-- SCENE 1 : Marc, malade, patron -->
<div class="ab" style="left:0;top:230px;width:1080px;height:950px" data-fx="none" data-at="0" {o(t_suisse)}>
  <svg class="d" width="1080" height="950" viewBox="0 0 1080 950">
    {stick(250, 260, 0.15, K, "flat")}
    <!-- thermomètre -->
    {P("M400 300 L400 520", R_, 18, 0.5, 0.4)}
    <circle cx="400" cy="545" r="30" stroke="{R_}" stroke-width="10" pathLength="1" data-fx="draw" data-d="0.3" data-at="0.8"/>
    {P("M372 300 A28 28 0 0 1 428 300 L428 520 M372 300 L372 520", K, 7, 0.55, 0.4)}
    <!-- calendrier 4 mois -->
    {P("M620 120 L1000 120 L1000 400 L620 400 Z", B, 9, t_marc, 0.5)}
    {P("M620 190 L1000 190", B, 9, t_marc + 0.3, 0.2)}
    {P("M650 250 l30 30 l50 -60 M745 250 l30 30 l50 -60 M840 250 l30 30 l50 -60 M650 330 l30 30 l50 -60", G, 9, t_marc + 0.5, 0.8)}
    <!-- certificat -->
    {P("M650 470 L860 470 L860 720 L650 720 Z", K, 8, t_cert - 0.1, 0.4)}
    {P("M700 530 L810 530 M700 580 L810 580 M700 630 L780 630", K, 6, t_cert + 0.2, 0.4)}
    {P("M820 650 m-25 0 l50 0 m-25 -25 l0 50", R_, 9, t_cert + 0.5, 0.2)}
    <!-- patron -->
    {stick(250, 260, t_patron, "rgba(0,0,0,0)")}
  </svg>
  <div class="lbl hand" style="left:180px;top:690px" data-fx="rise" data-at="{t_marc:.3f}">Marc</div>
  <div class="lbl hand" style="left:640px;top:20px;color:{B}" data-fx="rise" data-at="{t_marc + 0.3:.3f}">4 mois</div>
  <div class="lbl hand" style="left:350px;top:660px;color:{R_};font-size:66px" data-fx="rise" data-at="{t_grippe:.3f}">2 semaines</div>
</div>

<div class="ab" style="left:0;top:230px;width:1080px;height:950px" data-fx="fade" data-d="0.1" data-at="{t_patron - 0.05:.3f}" {o(t_suisse)}>
  <svg class="d" width="1080" height="950" viewBox="0 0 1080 950">
    <rect x="40" y="0" width="1000" height="950" style="fill:#f6f6f2;stroke:none"/>
    {stick(300, 300, t_patron, K, "flat", tie=True)}
    {P("M430 140 Q430 60 560 60 L940 60 Q1020 60 1020 140 L1020 260 Q1020 330 940 330 L560 330 L470 400 L500 330 Q430 330 430 260 Z", K, 8, t_patron + 0.2, 0.6)}
    {P("M480 40 L1040 360 M1040 40 L480 360", R_, 16, t_faux, 0.35)}
  </svg>
  <div class="lbl hand" style="left:450px;top:140px;width:580px;text-align:center;font-size:84px" data-fx="fade" data-d="0.2" data-at="{t_patron + 0.6:.3f}">« Pas payé ! »</div>
  <div class="lbl" style="left:540px;top:620px;font-size:150px;font-weight:900;color:{R_}" data-fx="stamp" data-rot="-8" data-at="{t_faux:.3f}">FAUX</div>
</div>

<!-- SCENE 2 : la règle -->
<div class="ab" style="left:0;top:230px;width:1080px;height:950px" data-fx="none" data-at="{t_suisse:.3f}" {o(t_assur)}>
  <svg class="d" width="1080" height="950" viewBox="0 0 1080 950">
    {P("M80 300 L1000 300 M960 270 L1000 300 L960 330", K, 10, t_suisse + 0.1, 0.7)}
    {P("M380 260 L380 340", R_, 12, t_trois_mois, 0.2)}
    {P("M120 520 L340 520 L340 640 L120 640 Z", B, 9, t_min, 0.5)}
    {P("M520 640 L520 560 L680 560 L680 480 L840 480 L840 400 L1000 400", G, 10, t_ensuite, 0.8)}
  </svg>
  <div class="lbl hand" style="left:300px;top:150px;color:{R_};font-size:68px" data-fx="rise" data-at="{t_trois_mois:.3f}">3 mois</div>
  <div class="lbl hand" style="left:430px;top:330px;font-size:63px" data-fx="rise" data-at="{t_sans_faute:.3f}">malade sans faute</div>
  <div class="lbl hand" style="left:80px;top:40px;font-size:73px;color:{G}" data-fx="rise" data-at="{t_doit:.3f}">→ l'employeur paie 💰</div>
  <div class="lbl hand" style="left:140px;top:540px;color:{B};font-size:73px" data-fx="pop" data-at="{t_min + 0.3:.3f}">3 sem.</div>
  <div class="lbl hand" style="left:100px;top:650px;font-size:49px" data-fx="rise" data-at="{t_min + 0.6:.3f}">minimum, 1re année</div>
  <div class="lbl hand" style="left:470px;top:700px;font-size:54px;color:{G}" data-fx="rise" data-at="{t_ensuite + 0.4:.3f}">puis + selon l'ancienneté</div>
</div>

<!-- SCENE 3 : assurance + Marc content -->
<div class="ab" style="left:0;top:230px;width:1080px;height:950px" data-fx="none" data-at="{t_assur:.3f}" {o(t_art)}>
  <svg class="d" width="1080" height="950" viewBox="0 0 1080 950">
    {P("M140 330 Q330 80 520 330 Q470 290 425 330 Q380 290 330 330 Q285 290 235 330 Q190 290 140 330 Z", B, 10, t_assur, 0.7)}
    {P("M330 330 L330 520 Q330 560 290 560", K, 10, t_assur + 0.5, 0.4)}
    {stick(790, 260, t_marc2, K, "happy")}
    {P("M640 640 m-40 0 a40 16 0 1 0 80 0 a40 16 0 1 0 -80 0 M640 610 m-40 0 a40 16 0 1 0 80 0 a40 16 0 1 0 -80 0", "#b45309", 8, t_marc2 + 0.6, 0.5)}
  </svg>
  <div class="lbl hand" style="left:90px;top:610px;width:600px;font-size:59px;color:{B}" data-fx="rise" data-at="{t_assur + 0.4:.3f}">assurance perte de gain</div>
  <div class="lbl hand" style="left:90px;top:790px;width:520px;font-size:54px" data-fx="rise" data-at="{t_autant - 0.4:.3f}">= au moins autant</div>
  <div class="lbl hand" style="left:700px;top:700px;font-size:73px;color:{G}" data-fx="pop" data-at="{t_marc2 + 0.8:.3f}">✓ payé</div>
</div>

<!-- ARTICLE + CTA -->
<div class="ab c" style="left:0;top:500px;width:1080px" data-fx="stamp" data-rot="-3" data-at="{t_art + 0.1:.3f}" {o(t_envoie)}><span class="chip">Art. 324a CO</span></div>
<div class="ab c hand" style="left:60px;top:300px;width:960px;font-size:72px" data-fx="words" data-at="{t_envoie:.3f}" data-st="0.05">Envoie ça à quelqu'un en <span style="color:{R_}">arrêt maladie</span></div>
<div class="ab brand c" style="left:0;top:640px;width:1080px" data-fx="zoom" data-at="{t_thrax:.3f}">Thrax <span>Legal</span></div>
<div class="ab c" style="left:0;top:790px;width:1080px;font-size:50px;font-weight:800" data-fx="rise" data-at="{t_thrax + 0.5:.3f}">lien en bio ↗</div>
"""


PUNCH = []
SFX = []
TAIL = 1.6
CAP_MAX = 3
