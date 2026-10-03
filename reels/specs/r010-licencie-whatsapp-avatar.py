"""Reel 010 — Licencié par WhatsApp (art. 335 CO). Style : avatar réaliste HeyGen face caméra + montage moderne
(jump cuts / zooms par phrase, faux message WhatsApp, typo cinétique, sous-titres mot à mot). Voix et image : la vidéo source."""
import json

SOURCE_AUDIO = "media/r010-avatar.mp4"
SOURCE_WORDS = "media/r010-words.json"
ASSETS = ["media/r010-avatar.mp4"]
VO = ""

META = {
    "id": "r010-licencie-whatsapp-avatar",
    "music": "drive",
    "music_gain": -2,
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
    "genome": {"style": "avatar-realiste-face-camera + montage-moderne", "palette": "blanc/noir/rouge/vert-whatsapp",
               "hook": "situation choc + ville", "format": "mythe-vs-regle + secret", "topic": "travail/licenciement-forme",
               "mascot": "avatar-ia-realiste (HeyGen)", "voice": "heygen", "captions": "blanc-contour-noir",
               "music": "drive", "length": "~36s", "ai_generated": True},
    "cover_t": 2.2,
}

CSS = """
#root { background:#ffffff; color:#111; }
.av { position:absolute; left:-60px; top:720px; width:1200px; height:1200px; transform-origin: 600px 290px; }
.av video { width:1200px; height:1200px; display:block; }
.prog { position:absolute; left:0; top:0; height:10px; width:1080px; background:#e3001b; transform-origin:0 50%; }
.ai { position:absolute; left:40px; top:40px; font-size:26px; font-weight:700; color:#8a8a8a; border:2px solid #d6d6d6; border-radius:999px; padding:6px 16px; }
.pin { position:absolute; right:40px; top:40px; font-size:30px; font-weight:800; color:#111; background:#f2f2f2; border-radius:999px; padding:6px 20px; }
.zone { position:absolute; left:50px; right:50px; top:130px; height:560px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:14px; }
.big { font-size:124px; font-weight:900; letter-spacing:-0.045em; line-height:0.98; }
.mid { font-size:74px; font-weight:900; letter-spacing:-0.03em; line-height:1.05; }
.sm { font-size:46px; font-weight:700; color:#555; }
.mk { background: linear-gradient(transparent 55%, #ffe14d 55%); padding: 0 6px; }
.red { color:#e3001b; } .grn { color:#16a34a; }
.stamp { display:inline-block; border:9px solid currentColor; border-radius:22px; padding:6px 34px; }
.wa { width:900px; background:#efeae2; border-radius:34px; box-shadow:0 30px 70px rgba(0,0,0,0.22); overflow:hidden; text-align:left; }
.wa .hd { background:#075e54; color:#fff; font-size:34px; font-weight:800; padding:20px 28px; display:flex; align-items:center; gap:18px; }
.wa .hd i { width:58px; height:58px; border-radius:50%; background:#cfd8dc; display:inline-flex; align-items:center; justify-content:center; font-style:normal; font-size:34px; }
.wa .hd small { display:block; font-size:22px; font-weight:600; opacity:0.8; }
.wa .msg { margin:26px 28px 30px; background:#fff; border-radius:0 22px 22px 22px; padding:20px 26px 14px; font-size:46px; font-weight:600; line-height:1.2; max-width:700px; box-shadow:0 2px 2px rgba(0,0,0,0.08); }
.wa .msg em { display:block; text-align:right; font-style:normal; font-size:22px; color:#8a8a8a; margin-top:6px; }
.chip { display:inline-block; background:#111; color:#fff; font-size:76px; font-weight:900; border-radius:22px; padding:14px 34px; }
.brand { font-size:132px; font-weight:900; letter-spacing:-0.05em; }
.brand span { color:#e3001b; }
.cap { top: 1330px; font-size: 76px; }
.cap .cw.now { color:#ffd60a; }
"""


def body(w):
    T = {k: w.a(p) for k, p in {
        "imagine": "Imagine,", "patron": "ton patron te vire", "wa": "WhatsApp.", "simple": "Un simple message,",
        "valable": "c'est pas valable.", "eh": "Eh bien,", "si": "si.", "suisse": "En Suisse,", "papier": "sur papier,",
        "sauf": "sauf si", "voila": "Mais voilà", "personne": "presque personne", "exiger": "Tu peux exiger",
        "ecrit": "par écrit,", "oblige": "Et il est obligé", "changer": "ça peut tout changer", "abusif": "abusif.",
        "art": "Article 335", "envoie": "Envoie ça", "special": "un peu spécial.", "thrax": "Thrax Legal,"}.items()}
    T["total"] = w.total
    # Jump cuts: one framing per sentence (scale, x shift) — instant cut, then a slow push-in.
    cuts = [[0, 1.0, 0], [T["simple"], 1.22, -20], [T["eh"], 1.28, 0], [T["suisse"], 1.0, 0], [T["voila"], 1.3, 30],
            [T["exiger"], 1.12, 0], [T["oblige"], 1.28, -20], [T["art"], 1.0, 0], [T["envoie"], 1.18, 0]]
    T["cuts"] = cuts
    globals()["PUNCH"] = []
    globals()["SCRIPT"] = SCRIPT_T.replace("__T__", json.dumps(T))
    Z = lambda a, b: f'data-fx="none" data-at="{a:.3f}" data-out="{b - 0.25:.3f}"'
    return f"""
<div class="av" id="av"><video id="avvid" class="clip" src="assets/r010-avatar.mp4" data-start="0" data-duration="{w.total:.3f}" data-track-index="0" muted playsinline></video></div>
<div class="prog" id="prog"></div>
<div class="ai">Avatar IA</div>
<div class="pin" data-fx="pop" data-at="{T['imagine'] + 0.3:.3f}" data-out="{T['suisse'] - 0.2:.3f}">📍 Genève</div>

<div class="zone" {Z(0.0, T['valable'])}>
  <div class="mid" data-fx="rise" data-at="{T['imagine']:.3f}">Ton patron te vire…</div>
  <div class="wa" data-fx="pop" data-at="{T['wa'] - 0.15:.3f}">
    <div class="hd"><i>👔</i><div>Patron<small>en ligne</small></div></div>
    <div class="msg">Pas besoin de revenir lundi. T'es viré. <em>18:42 ✓✓</em></div>
  </div>
</div>

<div class="zone" {Z(T['valable'], T['suisse'])}>
  <div class="mid" data-fx="rise" data-at="{T['valable']:.3f}">« Ça, c'est <span class="mk">pas valable</span> »</div>
  <div class="big grn" data-fx="stamp" data-rot="-6" data-at="{T['si']:.3f}"><span class="stamp">SI.</span></div>
</div>

<div class="zone" {Z(T['suisse'], T['voila'])}>
  <div class="sm" data-fx="rise" data-at="{T['suisse']:.3f}">🇨🇭 En Suisse, un licenciement</div>
  <div class="mid" data-fx="rise" data-at="{T['suisse'] + 0.5:.3f}">n'a pas besoin<br>d'être <span class="mk">sur papier</span></div>
  <div class="sm" data-fx="rise" data-at="{T['sauf']:.3f}">sauf si ton <b class="red">contrat</b> ou ta <b class="red">CCT</b> l'exige</div>
</div>

<div class="zone" {Z(T['voila'], T['exiger'])}>
  <div class="big" data-fx="pop" data-at="{T['voila']:.3f}">👀</div>
  <div class="mid" data-fx="words" data-at="{T['voila'] + 0.2:.3f}" data-st="0.06">Ce que presque <span class="red">personne</span> ne sait</div>
</div>

<div class="zone" {Z(T['exiger'], T['oblige'])}>
  <div class="sm" data-fx="rise" data-at="{T['exiger']:.3f}">tu peux exiger</div>
  <div class="big" data-fx="zoom" data-at="{T['exiger'] + 0.35:.3f}">les <span class="mk">motifs</span></div>
  <div class="mid red" data-fx="rise" data-at="{T['ecrit']:.3f}">par écrit ✍️</div>
</div>

<div class="zone" {Z(T['oblige'], T['art'])}>
  <div class="big red" data-fx="stamp" data-rot="-4" data-at="{T['oblige'] + 0.3:.3f}"><span class="stamp">IL EST OBLIGÉ</span></div>
  <div class="mid" data-fx="rise" data-at="{T['changer']:.3f}">→ licenciement <span class="mk">abusif</span> ?</div>
</div>

<div class="zone" {Z(T['art'], T['envoie'])}>
  <div class="sm">la loi</div>
  <div class="chip" data-fx="stamp" data-rot="-3" data-at="{T['art'] + 0.1:.3f}">Art. 335 al. 2 CO</div>
  <div class="sm" data-fx="rise" data-at="{T['art'] + 0.6:.3f}">Code des obligations</div>
</div>

<div class="zone" data-fx="none" data-at="{T['envoie']:.3f}">
  <div class="mid" data-fx="rise" data-at="{T['envoie']:.3f}">📤 Envoie ça à quelqu'un<br>qui a un patron… <span class="mk">spécial</span></div>
  <div class="brand" data-fx="zoom" data-at="{T['thrax']:.3f}">Thrax <span>Legal</span></div>
</div>
"""


SCRIPT_T = r"""
(function(){
  var T = __T__;
  var av = document.getElementById('av'), pr = document.getElementById('prog');
  R.on(function(t){
    var c = T.cuts[0];
    for (var i = 0; i < T.cuts.length; i++) if (t >= T.cuts[i][0]) c = T.cuts[i];
    var push = 1 + Math.min(1, (t - c[0]) / 6) * 0.04;
    av.style.transform = 'translateX(' + c[2] + 'px) scale(' + (c[1] * push) + ')';
    pr.style.transform = 'scaleX(' + Math.min(1, t / T.total) + ')';
  });
})();
"""
PUNCH = []
SFX = []
TAIL = 0.0
CAP_MAX = 3
