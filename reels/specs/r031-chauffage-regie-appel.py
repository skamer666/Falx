"""Reel 031 — « Le chauffage » : dialogue fictif entre une locataire de Neuchâtel et sa régie. Le chauffage est en panne,
la régie renvoie « après les fêtes » ; la locataire répond avec les bons outils : délai écrit et annonce de consignation
des loyers (art. 259g CO), réduction du loyer depuis que le bailleur connaît le défaut (art. 259d CO). Règle d'or : ne
jamais arrêter de payer, consigner. Technique jamais utilisée : écran d'appel en split-screen + thermomètre qui chute +
givre qui envahit l'écran. Deux voix : Vivienne (locataire) et Henri (régie)."""
import json

VOICES = {"loc": ("fr-FR-VivienneMultilingualNeural", "+8%"), "reg": ("fr-FR-HenriNeural", "+6%")}
GAP = 0.22
LINES = [
    ("loc", "Allô, ici votre locataire de Neuchâtel ! Le chauffage est en panne depuis deux semaines, il fait quinze degrés chez moi."),
    ("reg", "Oui, c'est noté. Le chauffagiste passera après les fêtes."),
    ("loc", "Après les fêtes ? Très bien. Alors je vous l'écris noir sur blanc.", 0.35),
    ("loc", "Je vous fixe par écrit un délai de dix jours pour réparer."),
    ("loc", "Sans réparation, je consignerai mes loyers auprès de l'office désigné par le canton."),
    ("loc", "Et je demande une baisse de loyer depuis le jour où vous avez été prévenus."),
    ("reg", "Euh… Le chauffagiste passe demain matin.", 0.6),
    ("loc", "Retiens bien : tu n'arrêtes jamais de payer, tu consignes. Code des obligations, article deux cent cinquante-neuf. "
            "Enregistre ça avant l'hiver.", 0.5),
]
TAIL = 1.8
CAP_MAX = 3

META = {
    "id": "r031-chauffage-regie-appel",
    "music": "tension",
    "music_gain": -9,
    "vo_chain": True,
    "caption": ("🥶 Chauffage en panne à Neuchâtel et la régie dit « après les fêtes » ? Voilà quoi répondre. (dialogue fictif)\n\n"
                "1️⃣ Réduction de loyer : tu peux exiger une baisse proportionnelle au défaut, depuis le moment où le bailleur "
                "en a eu connaissance jusqu'à la réparation (art. 259d CO). Signale toujours le défaut par écrit.\n"
                "2️⃣ Consignation : fixe au bailleur, PAR ÉCRIT, un délai raisonnable pour réparer, en annonçant qu'à défaut tu "
                "consigneras les loyers à échoir auprès de l'office désigné par le canton (art. 259g CO).\n"
                "⚠️ Ensuite, tu dois saisir l'autorité de conciliation dans les 30 jours qui suivent l'échéance du premier loyer "
                "consigné, sinon les loyers reviennent au bailleur (art. 259h CO). Et tu n'arrêtes jamais de payer : consigner, "
                "c'est payer à l'office.\n"
                "ℹ️ Le délai « raisonnable » dépend de l'urgence : un chauffage en hiver est plus urgent qu'un store cassé.\n\n"
                "🔖 Enregistre avant l'hiver. Thrax Legal, le juridique à prix fixe en Suisse romande. Lien en bio.\n\n"
                "#chauffage #locataire #regie #bail #loyer #neuchatel #lausanne #geneve #vaud #fribourg #suisseromande"),
    "yt_title": "Chauffage en panne : quoi répondre à ta régie #shorts",
    "tiktok_title": "Chauffage en panne à Neuchâtel ? Réponds ça à ta régie 🥶",
    "tags": ["chauffage", "défaut", "art. 259g CO", "consignation", "Neuchâtel"],
    "genome": {"style": "split-screen appel téléphonique + thermomètre + givre (2D)", "palette": "bleu glacier / gris régie / rouge alerte",
               "hook": "phrase à dire (format répartie) + ville + chiffre (15 degrés)", "format": "dialogue fictif 2 voix + règle d'or",
               "topic": "logement/defaut-chauffage", "mascot": "aucun (écrans d'appel)",
               "voice": "Vivienne + fr-FR-HenriNeural", "captions": "blanc contour bleu nuit, mot actif cyan", "music": "tension", "length": "~35s"},
}

CSS = """
#root { background:#0d1726; color:#fff; }
#stage { background: radial-gradient(ellipse at 50% 30%, #1b3354, #0d1726 70%); }
.brand { position:absolute; left:0; right:0; top:84px; text-align:center; font-size:26px; font-weight:800; letter-spacing:0.16em; color:#8fb4de; z-index:4; }
.chflag { position:relative; display:inline-block; width:var(--s); height:var(--s); background:#d52b1e; border-radius:calc(var(--s) * 0.08); vertical-align:-6px; margin-right:12px; }
.chflag::before, .chflag::after { content:""; position:absolute; background:#fff; left:50%; top:50%; transform:translate(-50%,-50%); }
.chflag::before { width:62.5%; height:18.75%; } .chflag::after { width:18.75%; height:62.5%; }
.tag { position:absolute; left:0; right:0; top:132px; text-align:center; z-index:4; }
.tag span { display:inline-block; font-size:26px; font-weight:700; color:#cfe3ff; background:rgba(255,255,255,0.12); border-radius:40px; padding:8px 22px; }
.panel { position:absolute; left:70px; right:250px; height:420px; border-radius:40px; padding:36px 200px 36px 40px; display:flex; flex-direction:column; gap:12px;
         box-shadow:0 30px 60px rgba(0,0,0,0.35); }
#pl { top:200px; background:linear-gradient(135deg,#2f6db5,#1d4f8f); }
#pr { top:660px; background:linear-gradient(135deg,#5b6372,#3d4452); }
.panel .who { font-size:34px; font-weight:800; letter-spacing:0.1em; opacity:0.85; }
.panel .nm { font-size:64px; font-weight:900; letter-spacing:-0.02em; }
.panel .st { font-size:32px; font-weight:700; opacity:0.8; }
.wave { display:flex; gap:10px; align-items:center; height:90px; margin-top:auto; }
.wave i { display:block; width:16px; border-radius:8px; background:#fff; height:12px; }
.avatar { position:absolute; right:36px; top:36px; width:140px; height:140px; border-radius:50%; background:rgba(255,255,255,0.18);
          display:flex; align-items:center; justify-content:center; font-size:84px; }
.thermo { position:absolute; right:70px; top:200px; width:140px; height:880px; border-radius:70px; background:rgba(255,255,255,0.1); z-index:2; }
.thermo .tube { position:absolute; left:50px; top:40px; width:40px; height:700px; border-radius:20px; background:rgba(255,255,255,0.15); overflow:hidden; }
.thermo .liq { position:absolute; left:0; right:0; bottom:0; background:linear-gradient(#ff6b5b,#ff3b2f); }
.thermo .bulb { position:absolute; left:20px; bottom:30px; width:100px; height:100px; border-radius:50%; background:#ff3b2f; }
.thermo .deg { position:absolute; left:-20px; right:-20px; top:-70px; text-align:center; font-size:56px; font-weight:900; }
.frost { position:absolute; inset:0; pointer-events:none; z-index:3; opacity:0;
         background: radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0) 45%, rgba(210,235,255,0.55) 100%); }
.ov { position:absolute; left:60px; right:60px; top:1110px; display:flex; flex-direction:column; align-items:center; gap:16px; text-align:center; z-index:5; }
.pill { display:inline-block; background:#fff; color:#0d1726; font-size:52px; font-weight:900; border-radius:26px; padding:16px 34px; box-shadow:0 16px 40px rgba(0,0,0,0.35); }
.pill.r { background:#ff3b2f; color:#fff; } .pill.c { background:#5fe1ff; color:#0d1726; }
.end { position:absolute; left:60px; right:60px; top:260px; text-align:center; z-index:6; display:flex; flex-direction:column; gap:26px; align-items:center; }
.end .big { font-size:96px; font-weight:900; letter-spacing:-0.04em; line-height:1; }
.end .b { font-size:110px; font-weight:900; letter-spacing:-0.05em; } .end .b span { color:#5fe1ff; }
.endbg { position:absolute; inset:0; background:#0d1726; opacity:0; z-index:5; }
.cap { top: 1500px; font-size: 68px; }
.cap .cw { -webkit-text-stroke: 13px #0d1726; color:#fff; }
.cap .cw.now { color:#5fe1ff; }
"""


def body(w):
    L = w.lines
    T = {k: w.a(p) for k, p in {
        "panne": "en panne", "quinze": "quinze degrés", "fetes": "après les fêtes.", "noir": "noir sur blanc.", "delai": "un délai de dix jours",
        "consigne": "je consignerai mes loyers", "baisse": "une baisse de loyer", "demain": "passe demain matin.", "retiens": "Retiens bien",
        "jamais": "tu n'arrêtes jamais", "articles": "Code des obligations,", "enregistre": "Enregistre ça"}.items()}
    T["lines"] = [[l["spk"], l["t0"], l["t1"]] for l in L]
    T["total"] = w.total
    O = lambda a, b: f'data-at="{a:.3f}" data-out="{b - 0.25:.3f}"'
    META["cover_t"] = round(T["quinze"] + 0.5, 2)
    globals()["PUNCH"] = [T["noir"], T["demain"]]
    globals()["SFX"] = [{"t": 0.05, "k": "ding"}, {"t": T["demain"], "k": "ding"}, {"t": T["consigne"], "k": "stamp"}]
    globals()["SCRIPT"] = SCRIPT_T.replace("__T__", json.dumps(T))
    bars = "".join("<i></i>" for _ in range(14))
    return f"""
<div class="brand"><span class="chflag" style="--s:30px"></span>THRAX LEGAL · LOGEMENT</div>
<div class="tag" id="tag"><span>📍 Neuchâtel · dialogue fictif</span></div>
<div class="panel" id="pl"><div class="who">📞 APPEL EN COURS</div><div class="nm">Locataire</div><div class="st">Neuchâtel · 3e étage</div>
  <div class="avatar">🥶</div><div class="wave" id="wl">{bars}</div></div>
<div class="panel" id="pr"><div class="who">RÉGIE IMMOBILIÈRE</div><div class="nm">Service technique</div><div class="st" id="hold">« Votre appel est important… »</div>
  <div class="avatar">🏢</div><div class="wave" id="wr">{bars}</div></div>
<div class="thermo"><div class="deg" id="deg">21°</div><div class="tube"><div class="liq" id="liq"></div></div><div class="bulb"></div></div>
<div class="frost" id="frost"></div>

<div class="ov" data-fx="stamp" data-rot="-3" {O(T['quinze'], T['fetes'])}><div class="pill c">❄️ 15 °C depuis 2 semaines</div></div>
<div class="ov" data-fx="pop" {O(T['fetes'], T['noir'])}><div class="pill r">« après les fêtes » 🙄</div></div>
<div class="ov" data-fx="pop" {O(T['delai'], T['retiens'])}>
  <div class="pill" data-fx="rise" data-at="{T['delai']:.3f}">✍️ délai écrit : 10 jours</div>
  <div class="pill" data-fx="rise" data-at="{T['consigne']:.3f}">🏦 sinon : loyers consignés</div>
  <div class="pill c" data-fx="rise" data-at="{T['baisse']:.3f}">📉 baisse de loyer</div>
</div>
<div class="endbg" id="endbg"></div>
<div class="end" data-fx="drop" data-at="{T['retiens']:.3f}">
  <div class="big">Tu n'arrêtes <span style="color:#ff3b2f">jamais</span><br>de payer.</div>
  <div class="big" style="color:#5fe1ff" data-fx="stamp" data-rot="-4" data-at="{T['jamais'] + 1.2:.3f}">Tu consignes.</div>
  <div class="pill" data-fx="rise" data-at="{T['articles']:.3f}">art. 259d et 259g CO</div>
  <div class="b" data-fx="zoom" data-at="{T['enregistre']:.3f}">Thrax <span>Legal</span></div>
</div>
"""


SCRIPT_T = r"""
(function(){
  var T = __T__;
  function cl(v){ return Math.max(0, Math.min(1, v)); }
  var pl = document.getElementById('pl'), pr = document.getElementById('pr');
  var wl = Array.prototype.slice.call(document.querySelectorAll('#wl i')), wr = Array.prototype.slice.call(document.querySelectorAll('#wr i'));
  var liq = document.getElementById('liq'), deg = document.getElementById('deg'), frost = document.getElementById('frost');
  var hold = document.getElementById('hold'), tag = document.getElementById('tag'), endbg = document.getElementById('endbg');
  function speaker(t){ for (var i = 0; i < T.lines.length; i++) { var l = T.lines[i]; if (t >= l[1] - 0.05 && t <= l[2] + 0.05) return l[0]; } return ''; }
  R.on(function(t){
    var s = speaker(t), e = R.env(t);
    [[pl, wl, 'loc'], [pr, wr, 'reg']].forEach(function(p){
      var on = s === p[2];
      p[0].style.transform = 'scale(' + (on ? 1.02 : 0.97) + ')'; p[0].style.opacity = on ? 1 : 0.62;
      p[1].forEach(function(b, i){ var h = on ? 12 + e * 70 * (0.45 + 0.55 * Math.abs(Math.sin(t * 9 + i * 1.7))) : 12; b.style.height = h.toFixed(1) + 'px'; });
    });
    // Temperature falls from 21 to 15 on the hook, recovers when the régie gives in.
    var fix = t >= T.demain ? cl((t - T.demain) / 1.5) : 0;
    var temp = 21 - 6 * cl((t - 0.3) / (T.quinze + 0.8 - 0.3)) + 6 * fix;
    liq.style.height = (((temp - 10) / 15) * 100).toFixed(1) + '%';
    deg.textContent = Math.round(temp) + '°';
    frost.style.opacity = (cl((t - 0.5) / 3) * (1 - fix) * 0.55).toFixed(3);
    hold.textContent = t >= T.demain ? '« On arrive demain. »' : (t >= T.fetes - 1.5 ? '« Après les fêtes. »' : '« Votre appel est important… »');
    tag.style.opacity = (1 - cl((t - T.noir) / 0.4)).toFixed(3);
    endbg.style.opacity = (cl((t - T.retiens) / 0.4) * 0.92).toFixed(3);
  });
})();
"""
