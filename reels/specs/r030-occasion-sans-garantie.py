"""Reel 030 — « Vendue sans garantie » : voiture d'occasion achetée à Sion, moteur qui lâche 2 jours après (histoire fictive).
Règles vérifiées : le vendeur garantit l'absence de défauts (art. 197 CO) ; une clause qui supprime la garantie est nulle
si le vendeur a frauduleusement dissimulé le défaut (art. 199 CO) ; défaut caché : aviser le vendeur dès sa découverte
(art. 201 al. 3 CO) ; l'acheteur peut demander l'annulation de la vente ou une réduction du prix (art. 205 CO).
Technique jamais utilisée : fausse annonce en ligne générique (sans marque réelle) qui se transforme en dossier de preuve,
diagnostic du garagiste, tampon « NULLE ». Voix suisse Fabrice."""
import json

VOICE = "fr-CH-FabriceNeural"
RATE = "+12%"
GAP_SENT = 0.18
TAIL = 1.8
CAP_MAX = 3

VO = ("Tu achètes une voiture d'occasion à Sion pour six mille francs. Dans l'annonce : vendue sans garantie. "
      "Deux jours plus tard, le moteur lâche. "
      "Le garagiste te dit : ce problème existait depuis des mois, et quelqu'un a débranché le voyant. "
      "Tu ne peux rien faire ? Faux. "
      "En Suisse, la clause sans garantie est nulle si le vendeur t'a caché le défaut exprès. "
      "Ce que tu fais tout de suite. Un : le garagiste met son diagnostic par écrit. "
      "Deux : tu préviens le vendeur immédiatement, par écrit. Trois : tu gardes une capture de l'annonce. "
      "Ensuite, tu peux demander une baisse du prix, ou annuler la vente. "
      "Article cent nonante-neuf du Code des obligations. Envoie ça à quelqu'un qui cherche une voiture.")

META = {
    "id": "r030-occasion-sans-garantie",
    "music": "drive",
    "music_gain": -6,
    "caption": ("🚗 Voiture d'occasion achetée à Sion, « vendue sans garantie », moteur mort 2 jours après. Tu ne peux rien faire ? "
                "Pas si vite. (histoire fictive)\n\n"
                "En Suisse, le vendeur répond des défauts de la chose (art. 197 CO). La clause « sans garantie » est valable en "
                "principe, MAIS elle est nulle si le vendeur a frauduleusement caché le défaut (art. 199 CO), par exemple un voyant "
                "débranché ou un problème connu passé sous silence.\n\n"
                "✅ Tout de suite :\n1️⃣ Diagnostic écrit d'un garagiste.\n2️⃣ Avis immédiat et écrit au vendeur dès la découverte "
                "du défaut (art. 201 al. 3 CO).\n3️⃣ Capture de l'annonce et des messages échangés.\n\n"
                "Ensuite : annulation de la vente ou réduction du prix (art. 205 CO). La preuve que le vendeur savait est souvent "
                "le point difficile : garde tout.\n\n"
                "📤 Envoie ça à quelqu'un qui cherche une voiture. Thrax Legal, le juridique à prix fixe en Suisse romande. Lien en bio.\n\n"
                "#voituredoccasion #occasion #garantie #voiture #sion #valais #lausanne #geneve #vaud #fribourg #suisseromande"),
    "yt_title": "Voiture d'occasion « sans garantie » : pas toujours ! #shorts",
    "tiktok_title": "Voiture d'occasion « sans garantie » à Sion : pas si vite 🚗",
    "tags": ["voiture d'occasion", "garantie", "art. 199 CO", "vente", "Sion"],
    "genome": {"style": "fausse-annonce-en-ligne + dossier de preuve (2D)", "palette": "blanc appli / orange annonce / rouge alerte",
               "hook": "histoire + perte chiffrée + ville (6000 CHF, moteur mort)", "format": "histoire + verdict + 3 réflexes",
               "topic": "achat/voiture-occasion", "mascot": "aucun (UI d'annonce, rapport de garage)",
               "voice": "fr-CH-FabriceNeural", "captions": "blanc contour noir, mot actif orange", "music": "drive", "length": "~38s"},
}

CSS = """
#root { background:#eef0f3; color:#15171c; }
.brand { position:absolute; left:0; right:0; top:84px; text-align:center; font-size:26px; font-weight:800; letter-spacing:0.16em; color:#7b808c; }
.chflag { position:relative; display:inline-block; width:var(--s); height:var(--s); background:#d52b1e; border-radius:calc(var(--s) * 0.08); vertical-align:-6px; margin-right:12px; }
.chflag::before, .chflag::after { content:""; position:absolute; background:#fff; left:50%; top:50%; transform:translate(-50%,-50%); }
.chflag::before { width:62.5%; height:18.75%; } .chflag::after { width:18.75%; height:62.5%; }
.phone { position:absolute; left:110px; top:170px; width:860px; height:1200px; background:#fff; border-radius:56px; overflow:hidden;
         box-shadow:0 40px 90px rgba(20,25,40,0.28); border:14px solid #15171c; }
.bar { height:110px; background:#ff7a1a; color:#fff; display:flex; align-items:center; padding:0 40px; gap:18px; font-size:40px; font-weight:900; }
.bar small { font-size:26px; font-weight:700; opacity:0.85; margin-left:auto; }
.pic { position:relative; height:430px; background:linear-gradient(#bfe2ff, #e8f4ff 60%, #c9ccd3 60%, #b7bbc4); overflow:hidden; }
.car { position:absolute; left:150px; top:170px; width:560px; height:220px; }
.smoke { position:absolute; left:200px; top:60px; width:220px; height:220px; border-radius:50%; background:radial-gradient(rgba(70,70,80,0.75), rgba(70,70,80,0)); opacity:0; }
.info { padding:30px 40px; }
.info .t { font-size:46px; font-weight:900; line-height:1.1; }
.info .p { font-size:64px; font-weight:900; color:#ff7a1a; margin:14px 0; }
.info .l { font-size:30px; font-weight:700; color:#6b7180; }
.clause { position:relative; display:inline-block; margin-top:24px; font-size:40px; font-weight:900; background:#fff4e8; border:4px solid #ff7a1a;
          border-radius:18px; padding:12px 22px; }
.nulle { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%) rotate(-10deg); font-size:84px; font-weight:900; color:#e0261b;
         border:10px solid #e0261b; border-radius:20px; padding:4px 26px; background:rgba(255,255,255,0.85); white-space:nowrap; }
.layer { position:absolute; left:80px; right:80px; top:300px; color:#fff; display:flex; flex-direction:column; align-items:center; gap:30px; text-align:center; z-index:6; }
.big { font-size:110px; font-weight:900; letter-spacing:-0.04em; line-height:0.95; }
.big.r { color:#ff4a3d; } .big.g { color:#3ddc84; }
.card { color:#15171c; background:#fff; border-radius:30px; padding:34px 40px; box-shadow:0 26px 60px rgba(20,25,40,0.25); text-align:left; width:900px; }
.card .h { font-size:30px; font-weight:900; letter-spacing:0.12em; color:#6b7180; margin-bottom:14px; }
.card .x { font-size:46px; font-weight:800; line-height:1.2; }
.card .x b { color:#e0261b; }
.step { display:flex; gap:24px; align-items:center; background:#fff; border-radius:26px; padding:24px 30px; width:900px; text-align:left;
        box-shadow:0 18px 40px rgba(20,25,40,0.18); }
.step .n { flex:none; width:84px; height:84px; border-radius:50%; background:#ff7a1a; color:#fff; font-size:50px; font-weight:900; display:flex; align-items:center; justify-content:center; }
.step { color:#15171c; } .step .s { font-size:46px; font-weight:900; line-height:1.1; } .step .s small { display:block; font-size:30px; font-weight:700; color:#6b7180; }
.dim { position:absolute; inset:0; background:rgba(10,12,18,0.97); opacity:0; z-index:5; }
.chip { display:inline-block; background:#fff; color:#15171c; font-size:46px; font-weight:900; border-radius:18px; padding:12px 30px; }
.brandend { font-size:110px; font-weight:900; letter-spacing:-0.05em; } .brandend span { color:#ff7a1a; }
.cap { top: 1460px; font-size: 70px; }
.cap .cw { -webkit-text-stroke: 13px #15171c; color:#fff; }
.cap .cw.now { color:#ffb23e; }
"""

CAR_SVG = """<svg class="car" viewBox="0 0 560 220"><g fill="none" stroke="#15171c" stroke-width="6" stroke-linejoin="round">
<path d="M40 150 Q40 110 90 104 L170 96 Q220 40 300 38 L380 40 Q430 44 470 100 L520 110 Q540 116 540 150 L540 168 L40 168 Z" fill="#3a6fd8"/>
<path d="M190 98 Q228 56 296 54 L300 98 Z" fill="#cfe9ff"/><path d="M318 54 L378 56 Q412 62 440 98 L318 98 Z" fill="#cfe9ff"/>
<circle cx="140" cy="168" r="40" fill="#2a2d36"/><circle cx="140" cy="168" r="16" fill="#c9ccd3"/>
<circle cx="440" cy="168" r="40" fill="#2a2d36"/><circle cx="440" cy="168" r="16" fill="#c9ccd3"/>
<rect x="500" y="120" width="30" height="14" rx="4" fill="#ffd34d"/></g></svg>"""


def body(w):
    T = {k: w.a(p) for k, p in {
        "annonce": "Dans l'annonce", "sans": "vendue sans garantie.", "deux": "Deux jours plus tard,", "moteur": "le moteur lâche.",
        "garagiste": "Le garagiste te dit", "voyant": "a débranché le voyant.", "rien": "Tu ne peux rien faire", "faux": "Faux.",
        "suisse": "En Suisse, la clause", "nulle": "est nulle", "cache": "t'a caché le défaut", "fais": "Ce que tu fais",
        "un": "Un :", "deuxx": "Deux :", "trois": "Trois :", "ensuite": "Ensuite,", "article": "Article cent", "envoie": "Envoie ça"}.items()}
    T["total"] = w.total
    O = lambda a, b: f'data-at="{a:.3f}" data-out="{b - 0.25:.3f}"'
    META["cover_t"] = round(T["moteur"] + 0.4, 2)
    globals()["PUNCH"] = [T["moteur"], T["faux"], T["nulle"]]
    globals()["SFX"] = [{"t": T["moteur"], "k": "impact"}, {"t": T["moteur"] + 0.1, "k": "buzz"}, {"t": T["faux"], "k": "stamp"}]
    globals()["SCRIPT"] = SCRIPT_T.replace("__T__", json.dumps(T))
    return f"""
<div class="brand"><span class="chflag" style="--s:30px"></span>THRAX LEGAL · HISTOIRE FICTIVE</div>
<div class="phone" id="phone">
  <div class="bar">🔎 Annonces · Valais <small>Sion</small></div>
  <div class="pic" id="pic">{CAR_SVG}<div class="smoke" id="smoke"></div><div class="smoke" id="smoke2" style="left:300px;top:30px"></div></div>
  <div class="info">
    <div class="t">Citadine 2014 · 128'000 km</div>
    <div class="p" data-fx="count" data-from="0" data-to="6000" data-pre="CHF " data-suf=".–" data-at="0.2" data-d="0.9">CHF 6'000.–</div>
    <div class="l">Expertisée · moteur impeccable · photos sur demande</div>
    <div class="clause" id="clause" data-fx="pop" data-at="{T['annonce']:.3f}">⚠️ Vendue en l'état, sans garantie
      <div class="nulle" data-fx="stamp" data-rot="-10" data-at="{T['nulle']:.3f}">NULLE</div></div>
  </div>
</div>
<div class="dim" id="dim"></div>
<div class="layer" data-fx="stamp" data-rot="-4" {O(T['moteur'], T['garagiste'])}><div class="big r">💥 2 jours après</div><div class="big" style="font-size:70px">moteur mort</div></div>
<div class="layer" data-fx="drop" {O(T['garagiste'], T['rien'])}>
  <div class="card"><div class="h">🔧 DIAGNOSTIC DU GARAGE</div>
    <div class="x">Défaut présent <b>depuis des mois</b></div>
    <div class="x" data-fx="rise" data-at="{T['voyant'] - 0.8:.3f}">Voyant moteur <b>débranché</b> 🔌</div></div>
</div>
<div class="layer" data-fx="pop" {O(T['rien'], T['suisse'])}><div class="big" style="font-size:80px">Tu ne peux rien faire ?</div>
  <div class="big r" data-fx="stamp" data-rot="-6" data-at="{T['faux']:.3f}">FAUX.</div></div>
<div class="layer" data-fx="rise" {O(T['fais'], T['ensuite'])}>
  <div class="big" style="font-size:72px">Tout de suite :</div>
  <div class="step" data-fx="rise" data-at="{T['un']:.3f}"><div class="n">1</div><div class="s">Diagnostic écrit<small>par le garagiste</small></div></div>
  <div class="step" data-fx="rise" data-at="{T['deuxx']:.3f}"><div class="n">2</div><div class="s">Préviens le vendeur<small>immédiatement, par écrit</small></div></div>
  <div class="step" data-fx="rise" data-at="{T['trois']:.3f}"><div class="n">3</div><div class="s">Capture de l'annonce<small>et des messages</small></div></div>
</div>
<div class="layer" data-fx="pop" {O(T['ensuite'], T['article'])}>
  <div class="big g" style="font-size:86px">💸 Baisse du prix</div><div class="big" style="font-size:60px">ou</div><div class="big g" style="font-size:86px">↩️ Vente annulée</div></div>
<div class="layer" data-fx="drop" data-at="{T['article']:.3f}">
  <div class="chip">art. 199 CO</div>
  <div class="big" style="font-size:62px" data-fx="rise" data-at="{T['envoie']:.3f}">📤 Envoie ça à quelqu'un<br>qui cherche une voiture</div>
  <div class="brandend" data-fx="zoom" data-at="{T['envoie'] + 1.2:.3f}">Thrax <span>Legal</span></div>
</div>
"""


SCRIPT_T = r"""
(function(){
  var T = __T__;
  function cl(v){ return Math.max(0, Math.min(1, v)); }
  var dim = document.getElementById('dim'), phone = document.getElementById('phone'), s1 = document.getElementById('smoke'), s2 = document.getElementById('smoke2');
  R.on(function(t){
    // The listing stays visible behind everything; it dims while an overlay explains, and comes back for the "NULLE" stamp.
    var over = (t >= T.moteur && t < T.suisse) || t >= T.fais;
    var back = t >= T.suisse && t < T.fais;
    dim.style.opacity = (over ? 0.85 : 0).toFixed(2);
    var shake = t >= T.moteur && t < T.moteur + 0.6 ? Math.sin(t * 80) * 14 * (1 - (t - T.moteur) / 0.6) : 0;
    var zoom = back ? 1 + 0.12 * cl((t - T.suisse) / 0.6) : 1;
    var inn = 1 - Math.pow(1 - cl(t / 0.45), 3);
    phone.style.transform = 'translate(' + shake.toFixed(1) + 'px,' + ((1 - inn) * 260).toFixed(1) + 'px) scale(' + zoom.toFixed(3) + ')';
    phone.style.transformOrigin = '50% 85%';
    var sm = t >= T.moteur ? cl((t - T.moteur) / 0.8) : 0;
    [s1, s2].forEach(function(s, i){ var u = ((t - T.moteur) * 0.8 + i * 0.5) % 1; s.style.opacity = (sm * (1 - u) * 0.9).toFixed(3);
      s.style.transform = 'translateY(' + (-u * 120).toFixed(1) + 'px) scale(' + (0.6 + u * 1.2).toFixed(3) + ')'; });
  });
})();
"""
