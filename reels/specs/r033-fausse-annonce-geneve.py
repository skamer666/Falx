"""Reel 033 — « Fausse annonce d'appart à Genève » : Léa (personnage IA, avatar HeyGen + voix ElevenLabs fournis par le
propriétaire), montage façon Douyin : triple accroche (Jet d'eau + fausse annonce + bandeau jaune + voix), histoire en « tu »,
b-roll réels libres de droits toutes les 2-4 s (Mixkit, licence gratuite ; Jet d'eau : Wikimedia Commons CC0), cartes
« preuves » (annonce, messages, virement, alarmes, garantie, photos copiées), zooms en jump cut, sous-titres blancs à contour
avec mots clés en jaune, arrêt sur image + disque rayé sur « Attends », musique coupée sur les temps forts.
Voix ralentie à 95 % et pauses entre les phrases (media/r033/prep.py), lèvres et voix restent synchronisées.
Faits : signaux d'alerte des polices cantonales (FR, VD) ; garantie de loyer sur un compte au nom du locataire (art. 257e CO).
Histoire fictive (« tu », Marc) : marquée « exemple fictif » à l'écran et dans la légende."""
import json

SOURCE_AUDIO = "media/r033/avatar-rt.mp4"
SOURCE_WORDS = "media/r033/words.json"
B = ["jet", "cherche", "ecrit", "londres", "avion", "porte", "cles", "paie", "alarme", "suisse", "banque", "bridge", "famille", "signe", "potes"]
ASSETS = ["media/r033/avatar-rt.mp4", "media/r033/annonce.jpg"] + [f"media/r033/b_{n}.mp4" for n in B]
VO = ""
TAIL = 1.1
CAP_MAX = 4

# b-roll plein écran : (nom, début, fin, texte géant ou "")
BROLL = [("jet", 0.0, 1.30, ""), ("cherche", 5.62, 7.6, "3 MOIS 😩"), ("ecrit", 7.6, 8.66, ""),
         ("londres", 13.92, 15.26, "🇬🇧 LONDRES"), ("avion", 15.26, 16.92, ""), ("porte", 17.62, 18.78, "PAS DE VISITE 🔒"),
         ("cles", 19.56, 20.76, "🔑 PAR LA POSTE"), ("paie", 22.56, 24.42, ""), ("alarme", 26.2, 28.42, "3 ALARMES 🚨"),
         ("suisse", 32.74, 33.66, ""), ("banque", 35.2, 37.02, ""), ("bridge", 37.02, 38.32, "❌ PAS CHEZ MARC"),
         ("famille", 40.9, 43.02, "DES VRAIS GENS DEDANS 😳"), ("signe", 45.9, 47.48, ""), ("potes", 47.66, 49.12, "")]
# plans sur Léa : (début, zoom) — jump cuts ; ("push", début, fin, z0, z1) pour une poussée lente
SHOTS = [(0.0, 1.18), (1.3, 1.18), (3.0, 1.0), (8.66, 1.0), (9.19, 1.12), (11.8, 1.24), (12.76, 1.04), (16.92, 1.16),
         (18.78, 1.0), (20.76, 1.1), (24.42, 1.04), (24.83, 1.4), (25.96, 1.12), (28.42, 1.0), (33.66, 1.16), (38.32, 1.04),
         (39.6, 1.0), (43.02, 1.12), (44.7, 1.0), (45.27, 1.22), (47.48, 1.06), (49.12, 1.12)]
PUSH = (38.32, 39.6, 1.04, 1.34)
GRAY = (24.83, 25.96)

META = {
    "id": "r033-fausse-annonce-geneve",
    "music": "tension",
    "music_gain": -3,
    "mute": [[24.8, 25.95], [39.0, 39.85]],
    "caption": ("🏠 Fausse annonce d'appart à Genève ou Lausanne : les signaux à connaître avant de payer quoi que ce soit.\n\n"
                "🚨 Loyer trop beau pour le quartier\n🚨 « Propriétaire » à l'étranger, pas de visite possible\n"
                "🚨 Argent demandé avant la visite (virement, carte prépayée, lien de « réservation »)\n"
                "🚨 Photos copiées d'une vraie annonce (fais une recherche d'image inversée)\n\n"
                "En Suisse, la garantie de loyer est déposée sur un compte bancaire au nom du locataire (art. 257e CO).\n"
                "Déjà payé ? Porte plainte à la police cantonale.\n\n"
                "📤 Envoie ça à quelqu'un qui cherche un appart.\n\n"
                "Histoire fictive (« Marc » n'existe pas). Léa est un personnage IA, voix générée par IA. "
                "Images : Mixkit, Wikimedia Commons (CC0).\n\n"
                "#geneve #lausanne #appartement #arnaque #suisseromande"),
    "yt_title": "Fausse annonce d'appart à Genève : ne paie surtout rien #shorts",
    "tiktok_title": "Fausse annonce d'appart à Genève : ne paie surtout rien 🚨",
    "tags": ["arnaque", "appartement", "Genève", "garantie de loyer", "art. 257e CO"],
    "genome": {"style": "avatar IA face cam + b-roll réels libres de droits + cartes preuves (montage Douyin)",
               "palette": "blanc / jaune / rouge alerte", "hook": "triple : Jet d'eau + fausse annonce tamponnée + bandeau + « surtout, paie rien »",
               "format": "histoire en « tu » + 3 alarmes + révélation", "topic": "logement/arnaque", "mascot": "Léa (avatar IA HeyGen)",
               "voice": "ElevenLabs (via HeyGen), ralentie 95 % + pauses", "captions": "blanc contour noir, mots clés jaunes",
               "music": "tension + coupures", "length": "~51s", "ai_generated": True},
}

CSS = """
#root { background:#0b0b0d; }
#avw { position:absolute; inset:0; overflow:hidden; z-index:1; }
#av { position:absolute; left:0; top:0; width:1080px; height:1920px; object-fit:cover; transform-origin:540px 600px; }
.br { position:absolute; inset:0; overflow:hidden; z-index:5; opacity:0; }
.br video { position:absolute; inset:0; width:1080px; height:1920px; object-fit:cover; transform-origin:50% 50%; }
.big { position:absolute; left:40px; right:40px; top:300px; text-align:center; z-index:6; font-size:118px; font-weight:900; line-height:1;
  letter-spacing:-0.03em; color:#fff; -webkit-text-stroke:16px #0b0b0d; paint-order:stroke fill; }
.big.y { color:#ffd60a; }
.flash { position:absolute; inset:0; background:#fff; z-index:40; opacity:0; pointer-events:none; }
.band { position:absolute; left:0; right:0; margin:0 auto; width:max-content; top:150px; z-index:30; white-space:nowrap; background:#ffd60a; color:#0b0b0d;
  font-size:56px; font-weight:900; letter-spacing:-0.02em; padding:16px 30px 18px; border-radius:14px; box-shadow:0 14px 40px rgba(0,0,0,.35); }
.lbl { position:absolute; left:28px; top:40px; z-index:60; font-size:26px; font-weight:700; color:#fff; background:rgba(0,0,0,.42);
  border-radius:999px; padding:6px 16px; }
.card { position:absolute; left:90px; width:900px; z-index:20; background:#fff; color:#141418; border-radius:34px; overflow:hidden;
  box-shadow:0 30px 80px rgba(0,0,0,.45); }
.fict { position:absolute; right:22px; top:22px; z-index:3; font-size:24px; font-weight:800; color:#fff; background:rgba(20,20,24,.72);
  border-radius:999px; padding:6px 16px; letter-spacing:.02em; }
.ad img { display:block; width:900px; height:560px; object-fit:cover; }
.ad .bd { padding:26px 34px 34px; }
.ad .t1 { font-size:46px; font-weight:800; letter-spacing:-0.02em; }
.ad .t2 { font-size:38px; font-weight:600; color:#4a4a55; margin-top:8px; }
.ad .pr { font-size:76px; font-weight:900; letter-spacing:-0.03em; margin-top:14px; }
.ad .pr small { font-size:36px; font-weight:700; color:#6a6a75; }
.ad .tags { margin-top:14px; font-size:30px; font-weight:600; color:#6a6a75; }
.hl { border-radius:10px; padding:0 8px; margin:0 -8px; }
.stamp { position:absolute; z-index:25; font-size:150px; font-weight:900; color:#e5221b; border:14px solid #e5221b; border-radius:24px;
  padding:0 34px; letter-spacing:.02em; background:rgba(255,255,255,.12); }
.chat { background:#efeae2; }
.chat .hd { display:flex; align-items:center; gap:22px; background:#1f2c34; color:#fff; padding:26px 30px; }
.chat .av { width:84px; height:84px; border-radius:50%; background:#8b7bd8; display:flex; align-items:center; justify-content:center;
  font-size:44px; font-weight:800; }
.chat .nm { font-size:40px; font-weight:800; } .chat .st { font-size:28px; color:#9fb3bd; }
.chat .ms { padding:26px 26px 34px; display:flex; flex-direction:column; gap:18px; min-height:420px; }
.bub { max-width:720px; font-size:38px; line-height:1.22; padding:18px 24px 14px; border-radius:24px; box-shadow:0 2px 2px rgba(0,0,0,.08); }
.bub small { display:block; text-align:right; font-size:22px; color:#7b8a92; margin-top:4px; }
.bub.me { align-self:flex-end; background:#d9fdd3; border-top-right-radius:6px; }
.bub.him { align-self:flex-start; background:#fff; border-top-left-radius:6px; }
.pay .hd2 { background:#14141a; color:#fff; padding:26px 34px; font-size:40px; font-weight:800; display:flex; justify-content:space-between; }
.pay .row { display:flex; justify-content:space-between; padding:20px 34px; font-size:34px; border-bottom:2px solid #ececf1; }
.pay .row b { font-weight:800; }
.pay .amt { padding:26px 34px 6px; font-size:96px; font-weight:900; letter-spacing:-0.03em; }
.pay .btn { margin:26px 34px 34px; height:110px; border-radius:22px; background:#2b6ef3; color:#fff; font-size:46px; font-weight:800;
  display:flex; align-items:center; justify-content:center; position:relative; }
.pay .ok { position:absolute; inset:0; border-radius:22px; background:#1fa463; display:flex; align-items:center; justify-content:center; }
.alr { padding:30px 34px 36px; }
.alr .h { font-size:52px; font-weight:900; letter-spacing:-0.02em; margin-bottom:12px; }
.alr .r { display:flex; align-items:center; gap:22px; font-size:46px; font-weight:800; padding:18px 0; border-top:2px solid #f0f0f4; }
.alr .r span { font-size:58px; } .alr .r em { font-style:normal; color:#e5221b; }
.law { padding:34px; }
.law .h { font-size:64px; font-weight:900; } .law .p { font-size:62px; font-weight:800; margin-top:18px; line-height:1.15; }
.law .p b { color:#1fa463; }
.pill { display:inline-block; margin-top:26px; font-size:40px; font-weight:800; background:#14141a; color:#fff; border-radius:999px; padding:8px 22px; }
.cmp { padding:24px; display:grid; grid-template-columns:1fr 64px 1fr; align-items:center; gap:8px; }
.cmp img { width:100%; height:420px; object-fit:cover; border-radius:18px; display:block; }
.cmp .c { font-size:32px; font-weight:800; text-align:center; margin-top:10px; }
.cmp .eq { font-size:80px; font-weight:900; text-align:center; color:#e5221b; }
.chip { position:absolute; left:0; right:0; margin:0 auto; width:max-content; z-index:22; white-space:nowrap; font-size:52px; font-weight:900;
  border-radius:20px; padding:14px 30px; background:#fff; color:#141418; box-shadow:0 16px 40px rgba(0,0,0,.35); }
.chip.r { background:#e5221b; color:#fff; } .chip.y { background:#ffd60a; color:#141418; } .chip.g { background:#1fa463; color:#fff; }
.share { position:absolute; left:0; right:0; margin:0 auto; width:max-content; top:150px; z-index:32; white-space:nowrap; display:flex; align-items:center; gap:18px;
  background:#fff; color:#141418; font-size:46px; font-weight:900; border-radius:999px; padding:18px 34px; box-shadow:0 16px 40px rgba(0,0,0,.35); }
.share i { font-style:normal; width:70px; height:70px; border-radius:50%; background:#2b6ef3; color:#fff; display:flex; align-items:center;
  justify-content:center; font-size:40px; }
.cap { top:1300px; width:1000px; font-size:76px; font-weight:900; }
.cap .cw { -webkit-text-stroke:15px #0b0b0d; }
.cap .cw.now { color:#fff; transform:none; }
.cap .cw.k { color:#ffd60a; }
"""


def body(w):
    V = lambda a, b: f'data-fx="none" data-at="{a:.3f}" data-out="{b - 0.2:.3f}"'
    P = lambda a, b, fx="pop": f'data-fx="{fx}" data-at="{a:.3f}" data-out="{b - 0.2:.3f}"'
    T = lambda a: f'data-fx="none" data-at="{a:.3f}"'
    globals()["SCRIPT"] = SCRIPT_T.replace("__CFG__", json.dumps({"broll": BROLL, "shots": SHOTS, "push": PUSH, "gray": GRAY}))
    sfx = []
    for n, a, b, txt in BROLL[1:]:
        sfx.append({"t": max(0.0, a - 0.12), "k": "whoosh"})
    sfx += [{"t": 0.62, "k": "stamp"}, {"t": 1.28, "k": "impact"}, {"t": 4.62, "k": "cash", "g": .7},
            {"t": 8.7, "k": "tick"}, {"t": 10.3, "k": "ding"}, {"t": 12.78, "k": "ding"}, {"t": 20.82, "k": "ding"}, {"t": 21.42, "k": "ding"},
            {"t": 23.92, "k": "cash"}, {"t": 24.83, "k": "scratch", "g": 1.3}, {"t": 26.25, "k": "alarm"},
            {"t": 28.55, "k": "alarm"}, {"t": 29.3, "k": "alarm"}, {"t": 30.87, "k": "alarm"}, {"t": 38.6, "k": "riser"},
            {"t": 43.76, "k": "stamp"}, {"t": 45.3, "k": "stamp"}, {"t": 48.05, "k": "pop"}]
    globals()["SFX"] = sfx
    META["cover_t"] = 0.75
    tracks = "\n".join(
        f'<div class="br" id="br_{n}"><video id="v_{n}" class="clip" src="assets/b_{n}.mp4" data-start="{a:.3f}" data-duration="{b - a + 0.05:.3f}" '
        f'data-track-index="{2 + i}" muted playsinline></video></div>'
        + (f'<div class="big{" y" if i % 2 else ""}" {P(a + 0.12, b + 0.2, "stamp")} data-rot="-3">{txt}</div>' if txt else "")
        for i, (n, a, b, txt) in enumerate(BROLL))
    return f"""
<div id="avw"><video id="av" class="clip" src="assets/avatar-rt.mp4" data-start="0" data-duration="{w.total:.3f}" data-track-index="1" muted playsinline></video></div>
{tracks}
<div class="flash" id="flash"></div>
<div class="lbl">Personnage IA</div>

<!-- 0-2.9 s : triple accroche -->
<div class="band" {V(0.0, 3.0)}>⚠️ CETTE ANNONCE EST FAUSSE</div>
<div class="card ad" style="top:330px" {P(0.05, 1.32)}><div class="fict">EXEMPLE FICTIF</div><img src="assets/annonce.jpg" alt="">
  <div class="bd"><div class="t1">Appartement 4 pièces</div><div class="t2">📍 Plainpalais, Genève</div>
  <div class="pr">CHF 1'400.– <small>/ mois</small></div><div class="tags">Libre de suite · 92 m² · balcon</div></div></div>
<div class="stamp" style="left:250px;top:560px" data-fx="stamp" data-rot="-12" data-at="0.62" data-out="1.12">FAUSSE</div>

<!-- 3.0-5.6 s : l'annonce, ligne par ligne -->
<div class="card ad" style="top:180px" {P(3.0, 5.62)}><div class="fict">EXEMPLE FICTIF</div><img src="assets/annonce.jpg" alt="" style="height:470px">
  <div class="bd"><div class="t1"><span class="hl" id="h1">Appartement 4 pièces</span></div><div class="t2"><span class="hl" id="h2">📍 Plainpalais, Genève</span></div>
  <div class="pr"><span class="hl" id="h3">CHF 1'400.–</span> <small>/ mois</small></div></div></div>

<!-- 8.7-13.9 s : les messages -->
<div class="card chat" style="top:170px" {P(8.66, 13.92, "rise")}><div class="fict">EXEMPLE FICTIF</div>
  <div class="hd"><div class="av">M</div><div><div class="nm">Marc · propriétaire</div><div class="st">en ligne</div></div></div>
  <div class="ms"><div class="bub me" {T(8.7)}>Bonjour ! Le 4 pièces à Plainpalais est encore libre ?<small>21:04 ✓✓</small></div>
    <div class="bub him" data-fx="pop" data-at="10.3">Bonjour 😊 Oui, toujours libre !<small>21:09</small></div>
    <div class="bub him" data-fx="pop" data-at="12.78">Je m'appelle Marc. Je vis à Londres pour le travail 🇬🇧<small>21:09</small></div></div></div>
<div class="chip y" style="top:1130px" {P(10.7, 11.75)}>⏱️ 5 minutes</div>

<!-- 20.8-22.5 s : la suite des messages -->
<div class="card chat" style="top:170px" {P(20.76, 22.56, "rise")}><div class="fict">EXEMPLE FICTIF</div>
  <div class="hd"><div class="av">M</div><div><div class="nm">Marc · propriétaire</div><div class="st">en ligne</div></div></div>
  <div class="ms"><div class="bub him" {T(20.78)}>Je vous envoie les clés par la poste 🔑<small>21:12</small></div>
    <div class="bub him" data-fx="pop" data-at="21.42">Juste pour être sûr que vous êtes sérieux : la caution d'abord 🙏<small>21:12</small></div></div></div>

<!-- 22.6-24.4 s : le virement -->
<div class="card pay" style="top:300px" {P(22.68, 24.42)}><div class="fict" style="top:26px">EXEMPLE FICTIF</div>
  <div class="hd2"><span>Virement</span></div><div class="amt">CHF 2'800.–</div>
  <div class="row"><span>À</span><b>Marc S. · Londres</b></div><div class="row"><span>IBAN</span><b>GB29 •••• •••• 4821</b></div>
  <div class="row"><span>Motif</span><b>Caution Plainpalais</b></div>
  <div class="btn">Confirmer<div class="ok" {T(23.9)}>✓ Envoyé</div></div></div>

<!-- 24.8 s : « Attends » -->
<div class="chip r" style="top:300px;font-size:96px" data-fx="stamp" data-rot="-6" data-at="24.85" data-out="25.8">✋ STOP</div>

<!-- 28.5-32.7 s : les 3 alarmes -->
<div class="card alr" style="top:190px" {P(28.45, 32.74, "rise")}><div class="h">Les 3 alarmes</div>
  <div class="r" data-fx="pop" data-at="28.55"><span>🚨</span>Le prix : <em>trop beau</em></div>
  <div class="r" data-fx="pop" data-at="29.3"><span>🚨</span>Le proprio : <em>à l'étranger</em></div>
  <div class="r" data-fx="pop" data-at="30.87"><span>🚨</span>L'argent : <em>AVANT la visite</em></div></div>

<!-- 33.7-37.0 s : la garantie de loyer -->
<div class="chip" style="top:200px" {P(33.8, 35.2)}>🔐 Garantie de loyer</div>
<div class="card law" style="top:250px" {P(35.25, 37.02, "rise")}><div class="h">🔐 Garantie de loyer</div>
  <div class="p">→ sur un compte bancaire<br><b>à TON nom</b></div><div class="pill">art. 257e CO</div></div>

<!-- 38.3-40.9 s : le pire -->
<div class="band" style="background:#e5221b;color:#fff" {P(38.62, 40.0, "stamp")} data-rot="-2">LE PIRE ? 👀</div>
<div class="card ad" style="top:300px" {P(40.0, 40.92)}><div class="fict">EXEMPLE FICTIF</div><img src="assets/annonce.jpg" alt="">
  <div class="bd"><div class="t1">📸 Les photos de l'annonce…</div></div></div>

<!-- 43.0-44.7 s : copiées -->
<div class="card" style="top:300px" {P(43.05, 44.72)}><div class="cmp">
  <div><img src="assets/annonce.jpg" alt=""><div class="c">L'annonce de « Marc »</div></div><div class="eq">=</div>
  <div><img src="assets/annonce.jpg" alt=""><div class="c">Un vrai appart, déjà loué</div></div></div></div>
<div class="stamp" style="left:215px;top:430px;font-size:110px" data-fx="stamp" data-rot="-10" data-at="43.76" data-out="44.62">COPIÉES</div>

<!-- 45.3-47.5 s : la règle -->
<div class="chip r" style="top:260px;font-size:78px" {P(45.3, 45.92, "stamp")} data-rot="-4">❌ PAS UN FRANC</div>
<div class="chip g" style="top:300px;font-size:64px" {P(46.1, 47.5, "pop")}>✅ visite + ✅ signature</div>

<!-- 47.7 s → fin : partage -->
<div class="share" data-fx="pop" data-at="48.05"><i>➤</i>Envoie ça à ton pote qui cherche</div>
"""


SCRIPT_T = r"""
(function(){
  var C = __CFG__;
  function cl(v){ return Math.max(0, Math.min(1, v)); }
  var av = document.getElementById('av'), flash = document.getElementById('flash');
  var br = C.broll.map(function(b){ var el = document.getElementById('br_' + b[0]); return {el: el, v: el.querySelector('video'), a: b[1], b: b[2]}; });
  var hl = [['h1', 3.03, 3.75], ['h2', 3.79, 4.58], ['h3', 4.61, 5.6]].map(function(h){ return {el: document.getElementById(h[0]), a: h[1], b: h[2]}; });
  R.on(function(t){
    // b-roll : coupes franches + petit coup de zoom à l'entrée
    var cut = -9;
    br.forEach(function(x){
      var on = t >= x.a && t < x.b; x.el.style.opacity = on ? 1 : 0;
      if (on) { var d = t - x.a; x.v.style.transform = 'scale(' + (1.12 - 0.1 * (1 - Math.exp(-d * 5)) + 0.03 * d / 3).toFixed(4) + ')'; }
      if (t >= x.a && t - x.a < 0.12) cut = t - x.a;
    });
    // Léa : jump cuts (zoom différent à chaque phrase) + légère dérive, poussée lente sur « le pire »
    var k = 0; for (var i = 0; i < C.shots.length; i++) if (t >= C.shots[i][0]) k = i;
    var s0 = C.shots[k][0], z = C.shots[k][1], d = t - s0;
    var sc = z * (1 + 0.022 * cl(d / 3)) * (1 + 0.03 * Math.exp(-d * 9) * (d < 0.4 ? 1 : 0));
    var p = C.push; if (t >= p[0] && t < p[1]) sc = p[2] + (p[3] - p[2]) * Math.pow(cl((t - p[0]) / (p[1] - p[0])), 1.4);
    av.style.transform = 'scale(' + sc.toFixed(4) + ')';
    var g = C.gray, gr = (t >= g[0] && t < g[1]) ? 1 : 0;
    av.style.filter = gr ? 'grayscale(1) contrast(1.15)' : 'none';
    // flash blanc très bref sur les coupes fortes
    var fl = 0; [1.30, 24.83, 40.9].forEach(function(h){ if (t >= h && t < h + 0.12) fl = 0.55 * (1 - (t - h) / 0.12); });
    flash.style.opacity = fl.toFixed(3);
    // surligneur jaune sur l'annonce
    hl.forEach(function(h){ if (h.el) h.el.style.background = (t >= h.a) ? 'rgba(255,214,10,' + (t < h.b ? 1 : 0.45) + ')' : 'transparent'; });
  });
})();
"""
