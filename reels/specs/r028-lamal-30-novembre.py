"""Reel 028 — « 30 novembre » : changer de caisse maladie après l'annonce de la nouvelle prime (art. 7 al. 2 LAMal :
préavis d'un mois pour la fin du mois qui précède la nouvelle prime, donc lettre reçue au plus tard le 30 novembre),
la caisse de base doit accepter tout le monde (art. 4 al. 2 LAMal), l'ancienne affiliation ne prend fin qu'une fois la
nouvelle caisse confirmée (art. 7 al. 5 LAMal) ; piège : la complémentaire (LCA) peut refuser. Style jamais utilisé :
bureau en papier kraft, enveloppe de prime, calendrier qui s'arrache, lettre tapée à la machine. Voix suisse Ariane
(première fois, test d'ancrage romand)."""
import json

VOICE = "fr-CH-ArianeNeural"
RATE = "+8%"
GAP_SENT = 0.2
TAIL = 1.8
CAP_MAX = 3

VO = ("Ta prime d'assurance maladie augmente en janvier à Lausanne ? Tu as jusqu'au trente novembre pour partir. "
      "Et presque personne ne le fait correctement. "
      "Pour l'assurance de base, quand ta caisse t'annonce une nouvelle prime, tu peux la quitter pour le trente et un décembre, "
      "avec un mois de préavis. Donc ta lettre doit arriver chez elle au plus tard le trente novembre. Pas partir. Arriver. "
      "Alors poste-la en recommandé, une semaine avant. "
      "Ta nouvelle caisse doit t'accepter pour l'assurance de base, même si tu es malade. "
      "Mais attention au piège : ta complémentaire, elle, peut te refuser. Ne la résilie jamais avant d'être accepté ailleurs. "
      "Une phrase suffit : je résilie mon assurance obligatoire des soins pour le trente et un décembre. "
      "Article sept de la loi sur l'assurance maladie. Enregistre ça, et envoie-le à ta famille.")

META = {
    "id": "r028-lamal-30-novembre",
    "music": "bounce",
    "music_gain": -6,
    "caption": ("📮 Ta prime d'assurance maladie augmente en janvier ? Pour l'assurance de base, tu as jusqu'au 30 novembre.\n\n"
                "Quand ta caisse t'annonce une nouvelle prime, tu peux changer d'assureur pour la fin du mois qui précède "
                "l'entrée en vigueur de la nouvelle prime, avec un préavis d'un mois (art. 7 al. 2 LAMal). Pour une prime qui change "
                "le 1er janvier : ta lettre doit ARRIVER chez la caisse au plus tard le 30 novembre. Poste-la en recommandé, "
                "une semaine avant.\n\n"
                "✅ Pour l'assurance de base, la nouvelle caisse doit accepter toute personne tenue de s'assurer dans son rayon "
                "d'activité, sans questionnaire de santé (art. 4 al. 2 LAMal). Ton ancienne affiliation ne prend fin que lorsque "
                "la nouvelle caisse a confirmé qu'elle t'assure (art. 7 al. 5 LAMal).\n"
                "⚠️ Les assurances complémentaires suivent d'autres règles : la caisse peut te refuser ou poser des réserves. "
                "Ne résilie pas ta complémentaire avant d'avoir été accepté ailleurs.\n"
                "ℹ️ Franchise à option ou modèle alternatif (médecin de famille, HMO, télémédecine) : vérifie les conditions "
                "de ton contrat.\n\n"
                "✍️ Modèle : « Je résilie mon assurance obligatoire des soins pour le 31 décembre 2026. » + nom, date de "
                "naissance, numéro d'assuré, signature.\n\n"
                "🔖 Enregistre et envoie à ta famille. Thrax Legal, le juridique à prix fixe en Suisse romande. Lien en bio.\n\n"
                "#assurancemaladie #lamal #primes2027 #caissemaladie #lausanne #geneve #vaud #valais #fribourg #neuchatel "
                "#suisseromande"),
    "yt_title": "Assurance maladie : ta lettre doit arriver avant le 30 novembre #shorts",
    "tiktok_title": "Caisse maladie : ta lettre doit ARRIVER avant le 30 novembre 📮",
    "tags": ["assurance maladie", "LAMal", "art. 7 LAMal", "30 novembre", "Lausanne"],
    "genome": {"style": "bureau-papier-kraft + lettre tapée à la machine (2D)", "palette": "kraft / crème / rouge suisse",
               "hook": "perte chiffrée implicite + délai + ville", "format": "délai à garder + piège + phrase exacte",
               "topic": "assurance-maladie", "mascot": "aucun (objets : enveloppe, calendrier, lettre)",
               "voice": "fr-CH-ArianeNeural", "captions": "noir sur crème, mot actif rouge", "music": "bounce", "length": "~45s"},
}

CSS = """
#root { background:#d8c3a0; color:#1d1d1f; }
#stage { background:
  radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.25), rgba(0,0,0,0) 60%),
  repeating-linear-gradient(8deg, rgba(120,80,30,0.05) 0 3px, rgba(0,0,0,0) 3px 9px), #d8c3a0; }
.brand { position:absolute; left:0; right:0; top:84px; text-align:center; font-size:26px; font-weight:800; letter-spacing:0.16em; color:#7a6243; }
.chflag { position:relative; display:inline-block; width:var(--s); height:var(--s); background:#d52b1e; border-radius:calc(var(--s) * 0.08); vertical-align:-6px; margin-right:12px; }
.chflag::before, .chflag::after { content:""; position:absolute; background:#fff; left:50%; top:50%; transform:translate(-50%,-50%); }
.chflag::before { width:62.5%; height:18.75%; } .chflag::after { width:18.75%; height:62.5%; }
.sc { position:absolute; left:60px; right:60px; top:200px; height:1180px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:34px; text-align:center; }
.env { position:relative; width:820px; height:480px; background:#fbf6ea; border-radius:14px; box-shadow:0 30px 60px rgba(60,40,10,0.35);
       display:flex; flex-direction:column; justify-content:center; align-items:center; gap:14px; }
.env::before { content:""; position:absolute; left:0; right:0; top:0; height:200px; background:linear-gradient(160deg, transparent 49.5%, #eadfc6 50%) left/50% 100% no-repeat,
       linear-gradient(200deg, transparent 49.5%, #eadfc6 50%) right/50% 100% no-repeat; border-radius:14px 14px 0 0; }
.env .lb { position:relative; font-size:34px; font-weight:800; letter-spacing:0.12em; color:#8a7350; }
.env .pr { position:relative; font-size:96px; font-weight:900; letter-spacing:-0.03em; }
.env .pr b { color:#d52b1e; }
.env .ex { position:relative; font-size:26px; font-weight:700; color:#8a7350; }
.cal { width:520px; background:#fff; border-radius:24px; overflow:hidden; box-shadow:0 26px 50px rgba(60,40,10,0.3); }
.cal .m { background:#d52b1e; color:#fff; font-size:64px; font-weight:900; letter-spacing:0.1em; padding:14px 0; }
.cal .d { font-size:300px; font-weight:900; line-height:1; letter-spacing:-0.05em; padding:10px 0 26px; }
.big { font-size:96px; font-weight:900; letter-spacing:-0.035em; line-height:0.98; }
.big.r { color:#d52b1e; }
.mid { font-size:60px; font-weight:900; letter-spacing:-0.02em; line-height:1.08; }
.sm { font-size:40px; font-weight:700; color:#5a4a33; line-height:1.2; }
.stamp { display:inline-block; border:10px solid #d52b1e; color:#d52b1e; border-radius:22px; padding:12px 34px; font-size:92px; font-weight:900;
         letter-spacing:0.02em; background:rgba(255,255,255,0.35); }
.row { display:flex; align-items:center; gap:26px; background:#fbf6ea; border-radius:26px; padding:26px 34px; width:900px; text-align:left;
       box-shadow:0 16px 34px rgba(60,40,10,0.22); }
.row .i { font-size:80px; } .row .t { font-size:46px; font-weight:900; line-height:1.1; } .row .t small { display:block; font-size:32px; font-weight:700; color:#6d5a3d; }
.row.bad { border:6px solid #d52b1e; }
.paper { width:900px; min-height:640px; background:#fffdf6; box-shadow:0 30px 60px rgba(60,40,10,0.35); border-radius:6px; padding:56px 60px; text-align:left;
         background-image: repeating-linear-gradient(transparent 0 63px, rgba(80,120,200,0.18) 63px 65px); }
.paper .hd { font-family:"Playfair Display"; font-size:40px; font-weight:700; color:#6d5a3d; margin-bottom:26px; }
.paper .tx { font-family:"Playfair Display"; font-size:56px; font-weight:700; line-height:1.15; color:#1d1d1f; min-height:270px; }
.paper .sig { font-family:"Caveat"; font-size:90px; color:#1f3d8a; margin-top:24px; transform:rotate(-4deg); display:inline-block; }
.chip { display:inline-block; background:#1d1d1f; color:#fff; font-size:46px; font-weight:900; border-radius:18px; padding:12px 30px; }
.brandend { font-size:110px; font-weight:900; letter-spacing:-0.05em; } .brandend span { color:#d52b1e; }
.cap { top: 1470px; font-size: 66px; }
.cap .cw { -webkit-text-stroke: 12px #fbf6ea; color:#1d1d1f; }
.cap .cw.now { color:#d52b1e; }
"""


def body(w):
    T = {k: w.a(p) for k, p in {
        "trente": "jusqu'au trente novembre", "presque": "Et presque personne", "base": "Pour l'assurance de base,",
        "quitter": "tu peux la quitter", "preavis": "avec un mois de préavis.", "donc": "Donc ta lettre",
        "pas": "Pas partir.", "arriver": "Arriver.", "recommande": "Alors poste-la", "nouvelle": "Ta nouvelle caisse",
        "malade": "même si tu es malade.", "piege": "Mais attention au piège", "compl": "ta complémentaire, elle,",
        "jamais": "Ne la résilie jamais", "phrase": "Une phrase suffit", "resilie": "je résilie mon assurance",
        "article": "Article sept", "enregistre": "Enregistre ça,"}.items()}
    O = lambda a, b: f'data-at="{a:.3f}" data-out="{b - 0.25:.3f}"'
    META["cover_t"] = round(T["trente"] + 0.6, 2)
    globals()["PUNCH"] = [T["trente"], T["arriver"], T["piege"]]
    globals()["SFX"] = [{"t": T["resilie"], "k": "type"}, {"t": T["resilie"] + 1.2, "k": "type"}, {"t": T["resilie"] + 2.4, "k": "type"}]
    return f"""
<div class="brand"><span class="chflag" style="--s:30px"></span>ASSURANCE MALADIE · SUISSE ROMANDE</div>

<div class="sc" data-fx="drop" {O(0.05, T['presque'])}>
  <div class="env"><div class="lb">NOUVELLE PRIME 2027</div><div class="pr" data-fx="stamp" data-rot="-3" data-at="0.5">+ <b>CHF 47.–</b>/mois</div><div class="ex">(exemple)</div></div>
  <div class="mid" data-fx="rise" data-at="{T['trente'] - 0.4:.3f}">Tu as jusqu'au…</div>
</div>
<div class="sc" data-fx="zoom" {O(T['presque'], T['base'])}>
  <div class="cal"><div class="m">NOVEMBRE</div><div class="d">30</div></div>
  <div class="mid">et presque personne<br>ne le fait <span style="color:#d52b1e">correctement</span></div>
</div>
<div class="sc" data-fx="rise" {O(T['base'], T['donc'])}>
  <div class="sm">Assurance de base · nouvelle prime annoncée</div>
  <div class="big" data-fx="pop" data-at="{T['quitter']:.3f}">Tu pars le<br><span style="color:#d52b1e">31 décembre</span></div>
  <div class="chip" data-fx="stamp" data-rot="-2" data-at="{T['preavis'] - 0.4:.3f}">préavis : 1 mois</div>
</div>
<div class="sc" data-fx="drop" {O(T['donc'], T['recommande'])}>
  <div class="cal" style="width:420px"><div class="m" style="font-size:52px">NOVEMBRE</div><div class="d" style="font-size:230px">30</div></div>
  <div class="mid">ta lettre doit être <span style="color:#d52b1e">reçue</span></div>
  <div class="stamp" data-fx="stamp" data-rot="-6" data-at="{T['arriver']:.3f}">ARRIVER ≠ PARTIR</div>
</div>
<div class="sc" data-fx="pop" {O(T['recommande'], T['nouvelle'])}>
  <div class="big">📮 Recommandé</div>
  <div class="sm">une semaine avant le 30</div>
</div>
<div class="sc" data-fx="rise" {O(T['nouvelle'], T['phrase'])}>
  <div class="row" data-fx="rise" data-at="{T['nouvelle']:.3f}"><div class="i">✅</div><div class="t">Assurance de base<small>la nouvelle caisse doit t'accepter, même malade</small></div></div>
  <div class="row bad" data-fx="rise" data-at="{T['compl']:.3f}"><div class="i">⚠️</div><div class="t">Complémentaire<small>elle peut te refuser</small></div></div>
  <div class="mid" data-fx="pop" data-at="{T['jamais']:.3f}">Ne la résilie <span style="color:#d52b1e">jamais</span><br>avant d'être accepté ailleurs</div>
</div>
<div class="sc" data-fx="drop" {O(T['phrase'], T['article'])}>
  <div class="paper"><div class="hd">Lausanne, le 20 novembre 2026 · Recommandé</div>
    <div class="tx" data-fx="type" data-at="{T['resilie']:.3f}" data-cps="24">Je résilie mon assurance obligatoire des soins pour le 31 décembre 2026.</div>
    <div class="sig" data-fx="fade" data-at="{T['resilie'] + 3.2:.3f}">Ta signature</div></div>
</div>
<div class="sc" data-fx="pop" data-at="{T['article']:.3f}">
  <div class="chip" data-fx="stamp" data-rot="-3" data-at="{T['article']:.3f}">art. 7 LAMal</div>
  <div class="mid" data-fx="rise" data-at="{T['enregistre']:.3f}">🔖 Enregistre · envoie à ta famille</div>
  <div class="brandend" data-fx="zoom" data-at="{T['enregistre'] + 1.0:.3f}">Thrax <span>Legal</span></div>
</div>
"""
