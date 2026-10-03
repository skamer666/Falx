"""Reel 010 — Licencié par WhatsApp (art. 335 CO). Style : avatar réaliste HeyGen détouré, fond animé qui change
à chaque partie, typographie géante derrière le sujet, flashs/whips, faux téléphone WhatsApp, échos, sous-titres
surligneur. Voix et image : la vidéo source (aucune coupe, synchro labiale intacte)."""
import json

SOURCE_AUDIO = "media/r010-avatar.mp4"
SOURCE_WORDS = "media/r010-words.json"
ASSETS = ["media/r010-cut.webm", "media/r010-cut-e1.webm", "media/r010-cut-e2.webm"]
VO = ""

META = {
    "id": "r010-licencie-whatsapp-avatar",
    "music": "drive",
    "music_gain": -1,
    "caption": ("Viré par WhatsApp à Genève : c'est valable ? 📱\n\n"
                "En Suisse, la loi n'impose pas de forme pour un licenciement : un message peut suffire, sauf si ton contrat "
                "ou ta convention collective exige l'écrit. Le délai de congé s'applique quand même.\n\n"
                "Ce que presque personne ne sait : tu peux exiger que ton employeur motive le licenciement par écrit, et il doit le faire "
                "(art. 335 al. 2 CO). C'est utile pour savoir si le licenciement pourrait être abusif (art. 336 CO).\n\n"
                "📤 Envoie ça à quelqu'un qui a un patron un peu… spécial. Une question ? Thrax Legal, lien en bio.\n\n"
                "Avatar et voix générés par IA.\n\n"
                "#licenciement #whatsapp #travail #suisse #genève #lausanne #suisseromande #droitdutravail #patron"),
    "yt_title": "Viré par WhatsApp en Suisse : c'est valable ? (art. 335 CO) #shorts",
    "tiktok_title": "Viré par WhatsApp en Suisse : c'est valable ?",
    "tags": ["licenciement", "WhatsApp", "droit du travail suisse", "art. 335 CO", "Genève"],
    "genome": {"style": "avatar-detoure + typo-geante-derriere + fonds-animes", "palette": "change-par-partie",
               "hook": "situation choc + ville", "format": "mythe-vs-regle + secret", "topic": "travail/licenciement-forme",
               "mascot": "avatar-ia-realiste (HeyGen)", "voice": "heygen", "captions": "surligneur-jaune",
               "music": "drive", "length": "~36s", "ai_generated": True},
    "cover_t": 2.4,
}

CSS = """
#root { background:#07070b; color:#fff; }
.bg { position:absolute; inset:0; }
.grain { position:absolute; inset:-200px; opacity:0.10; mix-blend-mode:overlay; pointer-events:none; }
.giant { position:absolute; left:0; white-space:nowrap; font-weight:900; letter-spacing:-0.06em; line-height:0.86; opacity:0; will-change:transform; }
.giant.r1 { top:520px; font-size:400px; }
.giant.r2 { top:880px; font-size:400px; color:transparent; -webkit-text-stroke:5px rgba(255,255,255,0.55); }
.av { position:absolute; left:-110px; top:640px; width:1300px; height:1300px; transform-origin:650px 420px; will-change:transform; }
.av video { width:1300px; height:1300px; display:block; }
.echo { position:absolute; left:0; top:640px; width:1300px; height:1300px; opacity:0; filter: grayscale(1) brightness(1.4); }
.echo video { width:1300px; height:1300px; display:block; }
.flash { position:absolute; inset:0; background:#fff; opacity:0; pointer-events:none; }
.prog { position:absolute; left:0; top:0; height:10px; width:1080px; background:#ff2d55; transform-origin:0 50%; z-index:60; }
.ai { position:absolute; left:40px; top:40px; font-size:26px; font-weight:700; color:rgba(255,255,255,0.75); border:2px solid rgba(255,255,255,0.35); border-radius:999px; padding:6px 16px; z-index:60; }
.pin { position:absolute; right:40px; top:40px; font-size:32px; font-weight:800; color:#111; background:#fff; border-radius:999px; padding:6px 22px; z-index:60; }
.card { position:absolute; left:60px; right:60px; top:130px; display:flex; flex-direction:column; align-items:center; text-align:center; gap:12px; z-index:40; }
.t1 { font-size:84px; font-weight:900; letter-spacing:-0.035em; line-height:1.0; text-shadow: 0 8px 30px rgba(0,0,0,0.45); }
.t2 { font-size:50px; font-weight:800; line-height:1.1; color:rgba(255,255,255,0.9); text-shadow: 0 6px 20px rgba(0,0,0,0.45); }
.hl { background:#ffe14d; color:#0a0a0a; padding:0 14px; border-radius:12px; text-shadow:none; }
.stamp { display:inline-block; border:10px solid currentColor; border-radius:24px; padding:4px 36px; }
.phone { position:absolute; right:70px; top:200px; width:470px; height:560px; border-radius:56px; background:#0b141a; border:10px solid #1f2c33;
         box-shadow: 0 40px 90px rgba(0,0,0,0.6); overflow:hidden; z-index:45; transform: perspective(1400px) rotateY(-14deg) rotateZ(4deg); }
.phone .hd { background:#1f2c33; color:#e9edef; font-size:30px; font-weight:800; padding:26px 26px 18px; }
.phone .hd small { display:block; font-size:20px; font-weight:600; color:#8696a0; }
.bub { margin:16px 18px 0; background:#202c33; color:#e9edef; border-radius:0 20px 20px 20px; padding:14px 20px 10px; font-size:31px; font-weight:600; line-height:1.18; width:fit-content; max-width:400px; }
.bub em { display:block; text-align:right; font-style:normal; font-size:18px; color:#8696a0; margin-top:4px; }
.chip { display:inline-block; background:#fff; color:#0a0a0a; font-size:86px; font-weight:900; border-radius:24px; padding:12px 38px; }
.brand { font-size:140px; font-weight:900; letter-spacing:-0.05em; }
.brand span { color:#ff2d55; }
.cap { top: 1440px; font-size: 74px; z-index:55; }
.cap .cw { color:#fff; -webkit-text-stroke:0; text-shadow: 0 5px 18px rgba(0,0,0,0.7), 0 0 2px #000; text-transform:uppercase; font-weight:900; }
.cap .cw.now { color:#0a0a0a; background:#ffe14d; border-radius:12px; padding:0 10px; text-shadow:none; transform: scale(1.06) rotate(-2deg); }
"""

SEGS = [  # start anchor, giant words row1 / row2, background, glow
    ("imagine", "VIRÉ · VIRÉ · VIRÉ · ", "WHATSAPP · WHATSAPP · ", "radial-gradient(circle at 50% 38%, #3a0a14 0%, #12040a 55%, #050306 100%)", "#ff2d55"),
    ("valable", "SI. SI. SI. SI. SI. ", "VALABLE · VALABLE · ", "radial-gradient(circle at 50% 40%, #0c5a35 0%, #052616 55%, #020a06 100%)", "#2ee88a"),
    ("suisse", "SANS PAPIER · ", "SUISSE · SUISSE · ", "radial-gradient(circle at 50% 40%, #e3001b 0%, #a30014 60%, #5a000b 100%)", "#ffffff"),
    ("voila", "SECRET · SECRET · ", "PERSONNE NE SAIT · ", "radial-gradient(circle at 50% 40%, #3b1d7a 0%, #170a33 60%, #07030f 100%)", "#a78bfa"),
    ("exiger", "PAR ÉCRIT · ", "LES MOTIFS · LES MOTIFS · ", "radial-gradient(circle at 50% 40%, #6b5300 0%, #2a2000 60%, #0c0900 100%)", "#ffe14d"),
    ("oblige", "OBLIGÉ · OBLIGÉ · ", "ABUSIF ? · ABUSIF ? · ", "radial-gradient(circle at 50% 40%, #7a0010 0%, #2b0006 60%, #0a0002 100%)", "#ff2d55"),
    ("art", "ART. 335 · ART. 335 · ", "CODE DES OBLIGATIONS · ", "radial-gradient(circle at 50% 40%, #2a2a33 0%, #111116 60%, #050507 100%)", "#ffffff"),
    ("envoie", "THRAX LEGAL · ", "ENVOIE ÇA · ENVOIE ÇA · ", "radial-gradient(circle at 50% 40%, #1b2a6b 0%, #0b1030 60%, #04050f 100%)", "#7aa2ff"),
]
FRAMING = {"imagine": (1.0, 0), "valable": (1.18, -30), "suisse": (0.94, 0), "voila": (1.0, 0),
           "exiger": (1.12, 20), "oblige": (1.26, 0), "art": (0.96, 0), "envoie": (1.06, 0)}


SUF = {0: "", 1: "-e1", 2: "-e2"}


def body(w):
    T = {k: w.a(p) for k, p in {
        "imagine": "Imagine,", "patron": "ton patron te vire", "wa": "WhatsApp.", "simple": "Un simple message,",
        "valable": "c'est pas valable.", "eh": "Eh bien,", "si": "si.", "suisse": "En Suisse,", "papier": "sur papier,",
        "sauf": "sauf si", "voila": "Mais voilà", "personne": "presque personne", "exiger": "Tu peux exiger",
        "ecrit": "par écrit,", "oblige": "Et il est obligé", "changer": "ça peut tout changer", "abusif": "abusif.",
        "art": "Article 335", "envoie": "Envoie ça", "special": "un peu spécial.", "thrax": "Thrax Legal,"}.items()}
    T["imagine"] = 0.0
    T["valable"] -= 0.35
    T["total"] = w.total
    T["segs"] = [{"t": T[k], "bg": bg, "glow": gl, "s": FRAMING[k][0], "x": FRAMING[k][1]} for k, _, _, bg, gl in SEGS]
    globals()["SCRIPT"] = SCRIPT_T.replace("__T__", json.dumps(T))
    globals()["SFX"] = [{"t": s["t"], "k": "whoosh"} for s in T["segs"][1:]] + [{"t": T["si"], "k": "impact"}, {"t": T["oblige"] + 0.3, "k": "impact"}]
    giants = "".join(
        f'<div class="giant r1" id="g1_{i}">{r1 * 4}</div><div class="giant r2" id="g2_{i}">{r2 * 4}</div>'
        for i, (_, r1, r2, _, _) in enumerate(SEGS))
    vid = lambda i, cls: (f'<div class="{cls}" id="{cls}{i}"><video id="v_{cls}{i}" class="clip" src="assets/r010-cut{SUF[i]}.webm" data-start="0" '
                          f'data-duration="{w.total:.3f}" data-track-index="{i}" muted playsinline></video></div>')
    C = lambda a, b: f'data-fx="none" data-at="{a:.3f}" data-out="{b - 0.2:.3f}"'
    return f"""
<div class="bg" id="bg"></div>
{giants}
{vid(1, 'echo')}{vid(2, 'echo')}
{vid(0, 'av')}
<div class="grain" id="grain"></div>
<div class="prog" id="prog"></div>
<div class="ai">Avatar IA</div>
<div class="pin" data-fx="pop" data-at="0.4" data-out="{T['valable'] - 0.2:.3f}">📍 Genève</div>

<div class="card" {C(0.0, T['valable'])} style="left:50px;right:auto;width:520px;align-items:flex-start;text-align:left;top:230px">
  <div class="t1" data-fx="rise" data-at="0.15">Ton patron<br>te vire…</div>
  <div class="t1" data-fx="rise" data-at="{T['wa'] - 0.2:.3f}"><span class="hl">par WhatsApp</span></div>
</div>
<div class="phone" data-fx="rise" data-dx="500" data-at="{T['patron']:.3f}" data-out="{T['valable'] - 0.2:.3f}">
  <div class="hd">👔 Patron<small>en ligne</small></div>
  <div class="bub" data-fx="pop" data-at="{T['patron'] + 0.5:.3f}">Salut.<em>18:41</em></div>
  <div class="bub" data-fx="pop" data-at="{T['wa'] - 0.1:.3f}">Pas besoin de revenir lundi.<em>18:42</em></div>
  <div class="bub" data-fx="pop" data-at="{T['simple'] + 0.2:.3f}">T'es viré. 👋<em>18:42 ✓✓</em></div>
</div>

<div class="card" {C(T['valable'], T['suisse'])}>
  <div class="t2" data-fx="rise" data-at="{T['valable']:.3f}">« Ça, c'est pas valable »</div>
  <div class="t1" style="font-size:190px;color:#2ee88a" data-fx="stamp" data-rot="-7" data-at="{T['si']:.3f}"><span class="stamp">SI.</span></div>
</div>

<div class="card" {C(T['suisse'], T['voila'])}>
  <div class="t2" data-fx="rise" data-at="{T['suisse']:.3f}">🇨🇭 En Suisse, un licenciement</div>
  <div class="t1" data-fx="rise" data-at="{T['suisse'] + 0.45:.3f}">pas besoin d'être<br><span class="hl">sur papier</span></div>
  <div class="t2" data-fx="rise" data-at="{T['sauf']:.3f}">sauf si ton contrat ou ta CCT l'exige</div>
</div>

<div class="card" {C(T['voila'], T['exiger'])}>
  <div class="t1" style="font-size:120px" data-fx="pop" data-at="{T['voila']:.3f}">🤫</div>
  <div class="t1" data-fx="words" data-at="{T['voila'] + 0.15:.3f}" data-st="0.07">Ce que presque <span class="hl">personne</span> ne sait</div>
</div>

<div class="card" {C(T['exiger'], T['oblige'])}>
  <div class="t2" data-fx="rise" data-at="{T['exiger']:.3f}">tu peux exiger</div>
  <div class="t1" style="font-size:120px" data-fx="zoom" data-at="{T['exiger'] + 0.35:.3f}">les motifs</div>
  <div class="t1" data-fx="rise" data-at="{T['ecrit']:.3f}"><span class="hl">par écrit ✍️</span></div>
</div>

<div class="card" {C(T['oblige'], T['art'])}>
  <div class="t1" style="font-size:112px;color:#ff2d55" data-fx="stamp" data-rot="-5" data-at="{T['oblige'] + 0.3:.3f}"><span class="stamp">IL EST OBLIGÉ</span></div>
  <div class="t1" data-fx="rise" data-at="{T['changer']:.3f}">→ licenciement <span class="hl">abusif</span> ?</div>
</div>

<div class="card" {C(T['art'], T['envoie'])}>
  <div class="t2">la loi</div>
  <div class="chip" data-fx="stamp" data-rot="-3" data-at="{T['art'] + 0.1:.3f}">Art. 335 al. 2 CO</div>
  <div class="t2" data-fx="rise" data-at="{T['art'] + 0.6:.3f}">Code des obligations</div>
</div>

<div class="card" data-fx="none" data-at="{T['envoie']:.3f}">
  <div class="t1" data-fx="rise" data-at="{T['envoie']:.3f}">📤 Envoie ça à quelqu'un<br>qui a un patron… <span class="hl">spécial</span></div>
  <div class="brand" data-fx="zoom" data-at="{T['thrax']:.3f}">Thrax <span>Legal</span></div>
</div>
<div class="flash" id="flash"></div>
"""


SCRIPT_T = r"""
(function(){
  var T = __T__, S = T.segs;
  var bg = document.getElementById('bg'), av = document.getElementById('av0'), fl = document.getElementById('flash');
  var pr = document.getElementById('prog'), gr = document.getElementById('grain');
  var e1 = document.getElementById('echo1'), e2 = document.getElementById('echo2');
  var vid = av.querySelector('video');
  var c = document.createElement('canvas'); c.width = c.height = 256; var x = c.getContext('2d'), im = x.createImageData(256, 256);
  var seed = 7; function rnd(){ seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
  for (var i = 0; i < im.data.length; i += 4) { var v = rnd() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; }
  x.putImageData(im, 0, 0); gr.style.backgroundImage = 'url(' + c.toDataURL() + ')';
  function eo(u){ u = Math.max(0, Math.min(1, u)); return 1 - Math.pow(1 - u, 4); }
  function back(u){ u = Math.max(0, Math.min(1, u)); var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(u - 1, 3) + c1 * Math.pow(u - 1, 2); }
  R.on(function(t){
    var k = 0; for (var i = 0; i < S.length; i++) if (t >= S[i].t) k = i;
    var s = S[k], p = S[Math.max(0, k - 1)], u = t - s.t;
    bg.style.background = s.bg;
    for (var i = 0; i < S.length; i++) {
      var a = document.getElementById('g1_' + i), b = document.getElementById('g2_' + i);
      if (i !== k) { a.style.opacity = 0; b.style.opacity = 0; continue; }
      var inn = eo(u / 0.45);
      a.style.opacity = 1; b.style.opacity = 1;
      a.style.color = s.glow;
      a.style.transform = 'translateX(' + (-(u * 160) - 200 + (1 - inn) * 900) + 'px) skewX(' + ((1 - inn) * -12) + 'deg)';
      b.style.transform = 'translateX(' + ((u * 120) - 1800 - (1 - inn) * 900) + 'px)';
    }
    var z = p.s + (s.s - p.s) * back(u / 0.5), dx = p.x + (s.x - p.x) * eo(u / 0.5);
    if (k === 0) { z = s.s; dx = s.x; }
    var punch = Math.exp(-u * 9) * 0.06 * (k > 0 ? 1 : 0);
    var fy = Math.sin(t * 1.3) * 6;
    av.style.transform = 'translate(' + dx + 'px,' + fy + 'px) scale(' + (z + punch + t * 0.002) + ')';
    vid.style.filter = 'drop-shadow(0 0 28px ' + s.glow + '66) drop-shadow(0 30px 40px rgba(0,0,0,0.55))';
    var echo = (k === 3) ? eo(u / 0.4) * (1 - eo((t - (S[4].t - 0.3)) / 0.3)) : 0;
    e1.style.opacity = echo * 0.32; e2.style.opacity = echo * 0.32;
    e1.style.transform = 'translateX(' + (-110 - 330 * echo) + 'px) scale(0.86)';
    e2.style.transform = 'translateX(' + (-110 + 330 * echo) + 'px) scale(0.86)';
    fl.style.opacity = k > 0 ? Math.max(0, 0.55 - u * 4) : 0;
    gr.style.transform = 'translate(' + (Math.floor(t * 24) * 37 % 200 - 100) + 'px,' + (Math.floor(t * 24) * 53 % 200 - 100) + 'px)';
    pr.style.transform = 'scaleX(' + Math.min(1, t / T.total) + ')';
  });
})();
"""
PUNCH = []
SFX = []
TAIL = 0.0
CAP_MAX = 3
