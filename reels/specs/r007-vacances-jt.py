"""Reel 007 — Vacances payées au lieu d'être prises (art. 329a-329d CO). Style : faux journal télévisé, présentateur en costume, bandeau et défilant."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import mascot

VOICE = "fr-FR-HenriNeural"
RATE = "+10%"

VO = ("Flash info. Ton patron te propose de te payer tes vacances au lieu de te laisser partir ? "
      "En Suisse, c'est en principe interdit. Tant que tu travailles chez lui, tes vacances doivent être prises, pas payées. "
      "Le minimum légal : quatre semaines par an, et cinq jusqu'à vingt ans. Dont au moins deux semaines d'affilée. "
      "Ton patron fixe les dates, mais il doit tenir compte de tes souhaits. "
      "La seule grande exception : à la fin du contrat, les jours que tu n'as pas pu prendre sont payés. "
      "Articles 329a à 329d du Code des obligations. Partage ce flash à un collègue. Thrax Legal, lien en bio.")

META = {
    "id": "r007-vacances-jt",
    "music": "tension",
    "caption": ("FLASH INFO 📺 Ton patron veut te payer tes vacances au lieu de te laisser partir ? En Suisse, c'est en principe interdit.\n\n"
                "Pendant le contrat, les vacances ne peuvent pas être remplacées par de l'argent (art. 329d al. 2 CO). "
                "Minimum : 4 semaines par an, 5 jusqu'à 20 ans (art. 329a CO), dont au moins 2 semaines consécutives. "
                "L'employeur fixe les dates en tenant compte de tes souhaits (art. 329c CO).\n\n"
                "Exceptions : à la fin du contrat, les jours qui n'ont pas pu être pris sont payés ; et pour certains emplois "
                "à l'heure très irréguliers, l'indemnité peut être incluse dans le salaire si elle figure clairement à part.\n\n"
                "📤 Partage à un collègue. Une question ? Thrax Legal, lien en bio.\n\n"
                "#vacances #travail #salaire #suisse #lausanne #genève #suisseromande #droitdutravail #flashinfo"),
    "yt_title": "Ton patron te paie tes vacances au lieu de te laisser partir ? En Suisse, c'est interdit #shorts",
    "tiktok_title": "Vacances payées au lieu d'être prises : interdit en Suisse ?",
    "tags": ["vacances", "droit du travail suisse", "art. 329d CO", "salaire", "Suisse romande"],
    "genome": {"style": "faux-journal-tele", "palette": "bleu-nuit/rouge/blanc", "hook": "flash-info + question",
               "format": "mythe-vs-regle", "topic": "travail/vacances", "mascot": "presentateur-costume",
               "voice": "fr-FR-HenriNeural", "captions": "sous-titres-tv", "music": "tension", "length": "~35s"},
    "cover_t": 1.2,
}

CSS = """
#root { background: radial-gradient(ellipse at 50% 35%, #1b3a6b 0%, #0b1730 60%, #060b18 100%); color:#fff; }
.grid { position:absolute; inset:0; background-image: linear-gradient(rgba(255,255,255,0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.05) 2px, transparent 2px); background-size: 120px 120px; }
.ring { position:absolute; left:140px; top:330px; width:800px; height:800px; border-radius:50%; border: 3px solid rgba(255,255,255,0.10); }
.live { position:absolute; left:60px; top:150px; display:flex; gap:14px; align-items:center; font-weight:900; font-size:38px; letter-spacing:0.08em; }
.live b { background:#e3001b; padding:8px 18px; border-radius:6px; }
.live i { font-style:normal; background:rgba(255,255,255,0.12); padding:8px 18px; border-radius:6px; }
.screen { position:absolute; left:110px; top:260px; width:860px; height:560px; border-radius:22px; background: linear-gradient(160deg,#ffffff,#e8eef8); color:#0b1730; box-shadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 0 6px rgba(255,255,255,0.15); overflow:hidden; }
.panel { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding: 40px; }
.panel .k { font-size: 44px; font-weight:800; color:#53627c; text-transform:uppercase; letter-spacing:0.06em; }
.panel .v { font-size: 150px; font-weight:900; letter-spacing:-0.04em; line-height:1; }
.panel .s { font-size: 50px; font-weight:800; margin-top: 14px; }
.red { color:#e3001b; }
.desk { position:absolute; left:0; right:0; top:1544px; height:360px; background: linear-gradient(#24477f, #10224a); border-top: 8px solid #e3001b; }
.mwrap { position:absolute; left: 290px; top: 900px; }
.l3 { position:absolute; left:0; right:0; top:1330px; }
.l3 .tag { display:inline-block; margin-left:60px; background:#e3001b; font-weight:900; font-size:40px; padding:10px 22px; letter-spacing:0.05em; }
.l3 .bar { margin-top:0; margin-left:60px; margin-right:60px; background:#fff; color:#0b1730; font-weight:900; font-size:40px; padding:14px 22px; }
.ticker { position:absolute; left:0; right:0; top:1482px; height:62px; background:#0b1730; border-top:3px solid #e3001b; overflow:hidden; font-weight:800; font-size:34px; line-height:62px; white-space:nowrap; }
.ticker span { position:absolute; left:0; top:0; }
.brand { font-size: 112px; font-weight: 900; letter-spacing: -0.05em; }
.brand span { color:#e3001b; }
.cap { top: 850px; font-size: 60px; }
.cap .cw { -webkit-text-stroke: 0; color:#fff; background: rgba(0,0,0,0.72); padding: 0 10px; }
.cap .cw.now { color:#ffd400; }
"""

TICKER = "VACANCES · ART. 329d CO · 4 SEMAINES MINIMUM · 5 JUSQU'À 20 ANS · 2 SEMAINES D'AFFILÉE · THRAX LEGAL · " * 6


def body(w):
    t_patron = w.a("Ton patron te propose")
    t_suisse = w.a("En Suisse,")
    t_tant = w.a("Tant que tu")
    t_min = w.a("Le minimum")
    t_cinq = w.a("et cinq")
    t_dont = w.a("Dont au moins")
    t_dates = w.a("Ton patron fixe")
    t_souhaits = w.a("tenir compte")
    t_exc = w.a("La seule grande")
    t_fin = w.a("à la fin du contrat,")
    t_art = w.a("Articles 329a")
    t_partage = w.a("Partage ce flash")
    t_thrax = w.a("Thrax Legal,")
    m = mascot.svg("m7", "charcoal", w=500)
    talk = (f'data-talk data-arml="0:0;{t_suisse}:-120;{t_tant}:0;{t_exc}:-140;{t_art}:0;{t_thrax}:-150" '
            f'data-armr="0:0;{t_min}:30;{t_dates}:0" data-brow="0:8;{t_patron}:16;{t_suisse}:0;{t_exc}:14;{t_art}:0" class="mascot ')
    m = m.replace('class="mascot ', talk, 1)
    globals()["PUNCH"] = [t_suisse, t_exc]
    globals()["SCRIPT"] = SCRIPT_T % {"total": w.total}
    P = lambda a, b: f'data-fx="pop" data-at="{a}" data-out="{b - 0.35}"'
    return f"""
<div class="grid"></div><div class="ring"></div>
<div class="live" data-fx="fade" data-d="0.2" data-at="0"><b>● EN DIRECT</b><i>FLASH INFO</i></div>

<div class="screen" data-fx="zoom" data-at="0.15">
  <div class="panel" {P(0.2, t_suisse)}><div class="k">Ton patron propose</div><div class="v">🏖️ → 💰</div><div class="s">tes vacances… payées ?</div></div>
  <div class="panel" {P(t_suisse, t_min)}><div class="v red">INTERDIT</div><div class="s">en principe, pendant le contrat</div><div class="k" style="margin-top:22px">vacances = à prendre, pas à payer</div></div>
  <div class="panel" {P(t_min, t_dont)}><div class="k">minimum légal par an</div><div class="v">4 sem.</div><div class="s" data-fx="rise" data-at="{t_cinq}" data-out="{t_dont - 0.15}"><span class="red">5 semaines</span> jusqu'à 20 ans</div></div>
  <div class="panel" {P(t_dont, t_dates)}><div class="k">au moins</div><div class="v">2 sem.</div><div class="s">d'affilée</div></div>
  <div class="panel" {P(t_dates, t_exc)}><div class="k">les dates</div><div class="s" style="font-size:66px">Le patron décide…</div><div class="s red" style="font-size:66px" data-fx="rise" data-at="{t_souhaits}" data-out="{t_exc - 0.15}">…mais tes souhaits comptent</div></div>
  <div class="panel" {P(t_exc, t_art)}><div class="k">la grande exception</div><div class="s" style="font-size:70px">Fin du contrat</div><div class="v" style="font-size:120px" data-fx="rise" data-at="{t_fin + 0.2}" data-out="{t_art - 0.15}">= jours payés</div></div>
  <div class="panel" {P(t_art, t_partage)}><div class="k">source</div><div class="v" style="font-size:96px">Art. 329a–d</div><div class="s">Code des obligations</div></div>
  <div class="panel" data-fx="pop" data-at="{t_partage}"><div class="s">📤 Partage ce flash à un collègue</div><div class="brand" style="margin-top:30px" data-fx="zoom" data-at="{t_thrax}">Thrax <span>Legal</span></div><div class="k" data-fx="rise" data-at="{t_thrax + 0.4}">lien en bio</div></div>
</div>

<div class="mwrap" data-fx="rise" data-dy="300" data-at="0">{m}</div>
<div class="desk"></div>
<div class="l3" data-fx="rise" data-dx="-600" data-at="0.3"><span class="tag">FLASH INFO</span><div class="bar">VACANCES PAYÉES AU LIEU D'ÊTRE PRISES ?</div></div>
<div class="ticker"><span id="tick">{TICKER}</span></div>
"""


SCRIPT_T = """
(function(){
  var tk = document.getElementById('tick');
  R.on(function(t){ tk.style.transform = 'translateX(' + (-t * 180) + 'px)'; });
})();
"""
PUNCH = []
SFX = []
TAIL = 1.6
CAP_MAX = 4
