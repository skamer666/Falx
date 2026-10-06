"""Reel 032 — « 4 règles que ta régie espère que tu ignores » : avatar HeyGen fourni par le propriétaire, monté comme la
référence HeyGen (récap d'actu) :
- avatar détouré : la tête dépasse du cadre vidéo et passe DEVANT le texte / l'image placés derrière elle ;
- b-roll photoréaliste (Gemini 3 Pro Image) dans une bande 16:9 entre deux dégradés lilas, avec léger zoom ;
- texte tapé en direct en dégradé sur fond blanc, écran de téléphone, petits sous-titres en pastille grise.
Règles vérifiées : hausse de loyer sans formule officielle nulle (art. 269d al. 2 CO) ; garantie max. 3 mois de loyer
(art. 257e al. 2 CO) ; visites annoncées à temps (art. 257h al. 3 CO) ; défaut = réduction de loyer (art. 259d CO).
Avatar et voix générés par IA (HeyGen, offre gratuite : logo HeyGen conservé à l'écran)."""
import json

SOURCE_AUDIO = "media/r032/avatar.mp4"
SOURCE_WORDS = "media/r032/words.json"
ASSETS = ["media/r032/avatar-hd.mp4", "media/r032/avatar-cut.webm", "media/r032/heygen-mark.png",
          "media/r032/b1.jpg", "media/r032/b2.jpg", "media/r032/b3.jpg", "media/r032/b4.jpg", "media/r032/b5.jpg"]
VO = ""
TAIL = 0.6
CAP_MAX = 3

# Avatar geometry: avatar-hd.mp4 is 1440x808; shown at scale S, shifted so the man is centred; the frame edge (Y0) cuts
# through his forehead, and the cut-out copy above Y0 lets the head stand in front of whatever is behind it.
S = 1.42
VW, VH = round(1440 * S), round(808 * S)
VX = -471          # left offset of the scaled video (man's face centred at x≈540)
CUT_IN = 235       # how far into the scaled video the frame edge sits (px from the video's top)
Y0 = 1010          # screen y of the frame edge

META = {
    "id": "r032-regie-4-regles-avatar",
    "music": "bounce",
    "music_gain": -12,
    "caption": ("🏠 Locataire à Lausanne ? 4 règles que ta régie espère que tu ignores.\n\n"
                "1️⃣ Une hausse de loyer doit être notifiée sur la formule officielle agréée par le canton, et motivée. "
                "Sinon, elle est nulle (art. 269d CO).\n"
                "2️⃣ Garantie de loyer pour un logement : 3 mois de loyer maximum (art. 257e al. 2 CO).\n"
                "3️⃣ Tu dois tolérer les visites nécessaires (entretien, vente, relocation), mais la régie doit les annoncer à "
                "temps et tenir compte de tes intérêts (art. 257h CO).\n"
                "4️⃣ Chauffage en panne ou autre défaut : tu peux exiger une réduction de loyer proportionnelle, depuis que "
                "la régie est au courant jusqu'à la réparation (art. 259d CO). Signale-le par écrit.\n\n"
                "🔖 Enregistre et envoie à ton coloc. Thrax Legal, le juridique à prix fixe en Suisse romande. Lien en bio.\n\n"
                "Avatar, voix et images générés par IA.\n\n"
                "#locataire #regie #bail #loyer #lausanne #geneve #vaud #fribourg #neuchatel #valais #suisseromande"),
    "yt_title": "Locataire : 4 règles que ta régie espère que tu ignores #shorts",
    "tiktok_title": "Locataire à Lausanne : 4 règles que ta régie espère que tu ignores 🏠",
    "tags": ["locataire", "régie", "bail", "art. 269d CO", "Lausanne"],
    "genome": {"style": "avatar HeyGen détouré + texte derrière la tête + b-roll photo IA (montage récap d'actu)",
               "palette": "blanc / lilas / photo chaude", "hook": "« ils espèrent que tu ne sais pas » + ville",
               "format": "liste 4 règles", "topic": "logement/régie", "mascot": "avatar IA HeyGen (homme en costume)",
               "voice": "heygen", "captions": "pastille grise", "music": "bounce", "length": "~27s", "ai_generated": True},
}

CSS = f"""
#root {{ background:#ffffff; color:#1a1824; }}
#stage {{ background:#ffffff; }}
.behind {{ position:absolute; left:0; right:0; top:0; height:{Y0}px; display:flex; align-items:flex-end; justify-content:center; padding-bottom:78px; z-index:2; }}
.behind .bt {{ font-size:172px; font-weight:900; letter-spacing:-0.05em; line-height:0.9; text-align:center;
              background:linear-gradient(90deg,#2b2738,#6b5bd6 55%,#2b2738); -webkit-background-clip:text; background-clip:text; color:transparent; }}
.behind .bt.r {{ background:linear-gradient(90deg,#c0261b,#ff5a4a,#c0261b); -webkit-background-clip:text; background-clip:text; }}
.behind .bt.g {{ background:linear-gradient(90deg,#127a49,#2fd38a,#127a49); -webkit-background-clip:text; background-clip:text; }}
.behind .bt {{ display:flex; flex-direction:column-reverse; align-items:center; }}
.behind .bt small {{ display:block; font-size:62px; letter-spacing:-0.02em; margin-bottom:14px; }}
.behind.photo {{ padding:0; align-items:stretch; overflow:hidden; }}
.behind.photo img {{ width:100%; height:100%; object-fit:cover; }}
.emoji3d {{ font-size:300px; line-height:1; filter: drop-shadow(0 30px 40px rgba(60,40,120,0.35)); }}
#avrect {{ position:absolute; left:0; top:{Y0}px; width:1080px; height:{1920 - Y0}px; overflow:hidden; z-index:3; }}
#avcutw {{ position:absolute; left:0; top:0; width:1080px; height:{Y0 + 2}px; overflow:hidden; z-index:4; }}
#avrect video, #avcutw video {{ position:absolute; left:{VX}px; width:{VW}px; height:{VH}px; }}
#avrect video {{ top:{-CUT_IN}px; }}
#avcutw video {{ top:{Y0 - CUT_IN}px; }}
#mark {{ position:absolute; right:24px; bottom:330px; width:110px; opacity:0.6; z-index:5; }}
.ai {{ position:absolute; left:24px; bottom:334px; font-size:22px; font-weight:700; color:#fff; background:rgba(0,0,0,0.35); border-radius:999px; padding:4px 14px; z-index:5; }}
.full {{ position:absolute; inset:0; z-index:10; background:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:40px; }}
.band {{ background: linear-gradient(180deg, #f7f2ff 0%, #e6d6ff 26%, #ffffff 34%, #ffffff 66%, #d9c2ff 74%, #9a5cff 100%); }}
.band .ph {{ width:1080px; height:608px; overflow:hidden; }}
.band .ph img {{ width:100%; height:100%; object-fit:cover; transform-origin:50% 50%; }}
.typed {{ font-size:112px; font-weight:800; letter-spacing:-0.035em;
          background:linear-gradient(90deg,#3a2f6b,#7c4dff,#2aa6a0); -webkit-background-clip:text; background-clip:text; color:transparent; }}
.cursor {{ display:inline-block; width:7px; height:110px; background:#7c4dff; vertical-align:-14px; margin-left:6px; }}
.phone {{ width:600px; height:1180px; border-radius:90px; background:#f4f2f8; border:16px solid #15131c; position:relative; overflow:hidden;
          box-shadow:0 40px 90px rgba(40,20,80,0.35); }}
.phone .isl {{ position:absolute; left:50%; top:22px; width:180px; height:50px; border-radius:30px; background:#15131c; transform:translateX(-50%); }}
.phone .clock {{ margin-top:150px; text-align:center; font-size:150px; font-weight:300; color:#2a2633; letter-spacing:-0.04em; }}
.phone .date {{ text-align:center; font-size:34px; font-weight:600; color:#6d6880; }}
.notif {{ margin:60px 26px 0; background:rgba(255,255,255,0.97); border-radius:36px; padding:24px 26px; display:flex; gap:20px;
          box-shadow:0 16px 40px rgba(40,20,80,0.18); }}
.notif .ic {{ width:84px; height:84px; border-radius:22px; background:#7c4dff; flex:none; display:flex; align-items:center; justify-content:center; font-size:48px; }}
.notif .tx {{ font-size:32px; font-weight:800; line-height:1.2; text-align:left; }} .notif .tx small {{ display:block; font-size:28px; font-weight:600; color:#4a4558; }}
.over {{ position:absolute; left:40px; right:40px; display:flex; justify-content:center; z-index:12; }}
.chip {{ display:inline-block; font-size:54px; font-weight:900; border-radius:22px; padding:14px 30px; background:#1a1824; color:#fff; box-shadow:0 14px 30px rgba(0,0,0,0.2); }}
.chip.r {{ background:#e5372a; }} .chip.g {{ background:#1fa463; }} .chip.w {{ background:#fff; color:#1a1824; }}
.count {{ position:absolute; right:36px; top:60px; z-index:30; font-size:34px; font-weight:900; color:#fff; background:#1a1824; border-radius:16px; padding:8px 18px; }}
.brand {{ font-size:120px; font-weight:900; letter-spacing:-0.05em; color:#1a1824; }} .brand span {{ color:#e5372a; }}
.cap {{ top: 1470px; width:auto; max-width:900px; font-size:44px; font-weight:800; background:rgba(55,52,66,0.80); border-radius:14px; padding:10px 22px; z-index:40; }}
.cap .cw {{ -webkit-text-stroke:0; color:#fff; margin:0 0.05em; }}
.cap .cw.now {{ color:#fff; transform:none; }}
"""


def body(w):
    T = {k: w.a(p) for k, p in {
        "regie": "Ta régie espère", "un": "Un :", "formulaire": "formulaire officiel",
        "nulle": "Elle est nulle.", "deux": "Deux :", "garantie": "Ta garantie", "maximum": "maximum,",
        "franc": "pas un franc", "trois": "Trois :", "debarquer": "débarquer", "veut": "quand elle veut.", "prevenir": "Elle doit te prévenir",
        "quatre": "Et quatre :", "chauffage": "Ton chauffage", "droit": "Tu as droit", "enregistre": "Enregistre ça"}.items()}
    T["total"] = w.total
    T["full"] = [(T["un"], T["formulaire"]), (T["formulaire"], T["nulle"] - 0.25), (T["deux"], T["maximum"]), (T["trois"], T["veut"]),
                 (T["quatre"], T["droit"])]
    T["cuts"] = sorted({0.0, T["regie"], T["un"], T["formulaire"], T["nulle"] - 0.25, T["deux"], T["maximum"], T["franc"], T["trois"],
                        T["veut"], T["prevenir"], T["quatre"], T["droit"], T["enregistre"]})
    V = lambda a, b: f'data-fx="none" data-at="{a:.3f}" data-out="{b - 0.08:.3f}"'
    META["cover_t"] = round(T["regie"] + 0.9, 2)
    globals()["SCRIPT"] = SCRIPT_T.replace("__T__", json.dumps(T))
    globals()["SFX"] = [{"t": c, "k": "whoosh"} for c in T["cuts"][1:]] + [{"t": T["nulle"], "k": "stamp"},
                       {"t": T["debarquer"], "k": "impact"}, {"t": T["un"] + 0.1, "k": "type"}, {"t": T["un"] + 0.7, "k": "type"}]
    return f"""
<div class="behind" {V(0.0, T['regie'])}><div class="emoji3d" data-fx="pop" data-at="0.05">🏠</div></div>
<div class="behind photo" {V(T['regie'], T['un'])}><img src="assets/b1.jpg" alt="" id="kb1"></div>
<div class="behind" {V(T['nulle'] - 0.25, T['deux'])}><div class="bt r" data-fx="stamp" data-rot="0" data-at="{T['nulle']:.3f}">NULLE<small>sans formule officielle</small></div></div>
<div class="behind" {V(T['maximum'], T['franc'])}><div class="bt" data-fx="zoom" data-at="{T['maximum']:.3f}">3 MOIS<small>maximum</small></div></div>
<div class="behind" {V(T['franc'], T['trois'])}><div class="bt r" data-fx="pop" data-at="{T['franc']:.3f}">+0 CHF<small>pas un franc de plus</small></div></div>
<div class="behind photo" {V(T['veut'], T['prevenir'])}><img src="assets/b4.jpg" alt="" id="kb4"></div>
<div class="behind" {V(T['prevenir'], T['quatre'])}><div class="bt g" data-fx="pop" data-at="{T['prevenir']:.3f}">À TEMPS ✓<small>visite annoncée</small></div></div>
<div class="behind" {V(T['droit'], T['enregistre'])}><div class="bt g" data-fx="drop" data-at="{T['droit']:.3f}">↓ LOYER<small>baisse de loyer</small></div></div>
<div class="behind" style="padding-bottom:150px" data-fx="none" data-at="{T['enregistre']:.3f}"><div style="text-align:center"><div class="emoji3d" style="font-size:200px" data-fx="pop" data-at="{T['enregistre']:.3f}">🔖</div>
  <div class="brand" data-fx="zoom" data-at="{T['enregistre'] + 0.8:.3f}">Thrax <span>Legal</span></div></div></div>

<div id="avrect"><video class="clip" id="v1" src="assets/avatar-hd.mp4" data-start="0" data-duration="{w.total:.3f}" data-track-index="1" muted playsinline></video></div>
<div id="avcutw"><video class="clip" id="v2" src="assets/avatar-cut.webm" data-start="0" data-duration="{w.total:.3f}" data-track-index="2" muted playsinline></video></div>
<img id="mark" src="assets/heygen-mark.png" alt=""><div class="ai" id="ai">Avatar IA</div>
<div class="count" id="count" style="opacity:0"></div>

<div class="full" {V(T['un'], T['formulaire'])}><div><span class="typed" data-fx="type" data-at="{T['un'] + 0.1:.3f}" data-cps="15">Hausse de loyer</span><span class="cursor"></span></div></div>
<div class="full band" {V(T['formulaire'], T['nulle'] - 0.25)}><div class="ph"><img src="assets/b2.jpg" alt="" id="kb2"></div></div>
<div class="full band" {V(T['deux'], T['maximum'])}><div class="ph"><img src="assets/b3.jpg" alt="" id="kb3"></div></div>
<div class="over" style="top:380px" data-fx="pop" data-at="{T['garantie'] + 0.2:.3f}" data-out="{T['maximum'] - 0.1:.3f}"><div class="chip w">🔐 Garantie de loyer</div></div>
<div class="full" style="background:linear-gradient(180deg,#f7f2ff,#e2d3ff)" {V(T['trois'], T['veut'])}>
  <div class="phone" data-fx="rise" data-at="{T['trois']:.3f}"><div class="isl"></div><div class="clock">07:58</div><div class="date">samedi 14 novembre</div>
    <div class="notif" data-fx="drop" data-at="{T['trois'] + 0.5:.3f}"><div class="ic">🔑</div><div class="tx">Régie · Lausanne<small>On passe chez vous dans 10 minutes, on a les clés.</small></div></div></div>
</div>
<div class="over" style="top:1180px" data-fx="stamp" data-rot="-5" data-at="{T['debarquer']:.3f}" data-out="{T['veut'] - 0.1:.3f}"><div class="chip r">❌ pas quand elle veut</div></div>
<div class="full band" {V(T['quatre'], T['droit'])}><div class="ph"><img src="assets/b5.jpg" alt="" id="kb5"></div></div>
<div class="over" style="top:400px" data-fx="pop" data-at="{T['chauffage'] + 0.3:.3f}" data-out="{T['droit'] - 0.1:.3f}"><div class="chip w">🥶 Chauffage en panne</div></div>
"""


SCRIPT_T = r"""
(function(){
  var T = __T__;
  function cl(v){ return Math.max(0, Math.min(1, v)); }
  var rect = document.getElementById('avrect'), cutw = document.getElementById('avcutw'), mark = document.getElementById('mark'), ai = document.getElementById('ai');
  var count = document.getElementById('count');
  var kb = ['kb1','kb2','kb3','kb4','kb5'].map(function(id){ return document.getElementById(id); });
  var marks = [[T.un, '1/4'], [T.deux, '2/4'], [T.trois, '3/4'], [T.quatre, '4/4'], [T.enregistre, '']];
  R.on(function(t){
    var inFull = T.full.some(function(f){ return t >= f[0] && t < f[1]; });
    var vis = inFull ? 0 : 1;
    [rect, cutw, mark, ai].forEach(function(e){ e.style.opacity = vis; });
    var k = 0; for (var i = 0; i < T.cuts.length; i++) if (t >= T.cuts[i]) k = i;
    var dt = t - T.cuts[k], z = (k % 2 ? 1.06 : 1.0) * (1 + 0.02 * cl(dt / 3)), b = 1 + 0.035 * Math.exp(-dt * 10) * Math.cos(dt * 22);
    var tf = 'scale(' + (z * b).toFixed(4) + ')';
    rect.style.transformOrigin = '50% 0px'; cutw.style.transformOrigin = '50% __Y0__px';
    rect.style.transform = tf; cutw.style.transform = tf;
    var c = ''; marks.forEach(function(m){ if (t >= m[0]) c = m[1]; }); count.textContent = c; count.style.opacity = c ? 1 : 0;
    kb.forEach(function(im, i){ if (im) im.style.transform = 'scale(' + (1.04 + 0.08 * cl(((t + i * 7) % 6) / 6)).toFixed(4) + ')'; });
  });
})();
""".replace("__Y0__", str(Y0))
