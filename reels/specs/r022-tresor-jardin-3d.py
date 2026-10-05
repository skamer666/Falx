"""Reel 022 — Le trésor du jardin : à qui appartient un trésor trouvé en Suisse ? (art. 723 et 724 CC ; art. 137 ch. 2 CP).
DA (nouvelle) : « aventure cinéma » en 3D. Coupe de terrain avec ses couches, pelle qui frappe, veine d'or qui plonge
jusqu'à un coffre ; le couvercle s'ouvre, un geyser de pièces jaillit vers la caméra, puis les pièces deviennent romaines
et partent vers l'écusson vaudois ; gyrophares pour la plainte. Triple hook (image + curiosité + enjeu) et une relance
toutes les 2 à 3 s. Voix Vivienne (préférée du propriétaire)."""
import json

VOICE = "fr-FR-VivienneMultilingualNeural"
RATE = "+10%"
USE_THREE = True

VO = ("Ta pelle vient de taper sur quelque chose, dans un jardin à Lausanne. Un vieux coffre, enterré depuis des siècles, et rempli de pièces d'or. "
      "Il y en a pour cent mille francs. Alors, il est à qui ? "
      "Si le jardin est à toi, il est à toi. Mais si tu es locataire ? Là, tout change. "
      "Le trésor appartient au propriétaire du terrain, pas à celui qui le trouve. "
      "Mais toi, tu n'es pas perdant : la loi te donne droit à une récompense. Jusqu'à la moitié. "
      "Et maintenant, le plus fou. Si ce sont des pièces romaines, elles ne sont ni à toi, ni au propriétaire. "
      "Elles appartiennent au canton. Rassure-toi, tu as quand même droit à une récompense. "
      "Et ce n'est pas un film : en Argovie, un agriculteur a trouvé plus de quatre mille pièces romaines dans son verger. "
      "Et si tu gardes tout en secret ? Là, c'est toi qui risques une plainte pénale. "
      "Donc tu déclares, et tu demandes ta récompense. Article sept cent vingt-trois, et article sept cent vingt-quatre, du Code civil. "
      "Envoie ça à quelqu'un qui rêve de trouver un trésor.")

META = {
    "id": "r022-tresor-jardin-3d",
    "music": "epic",
    "caption": ("⛏️ Tu trouves un coffre rempli d'or enterré dans un jardin à Lausanne. Il est à qui ? (situation imaginaire)\n\n"
                "Un trésor, c'est une chose de valeur enfouie ou cachée depuis longtemps, qui n'a plus de propriétaire. "
                "Il appartient au propriétaire du terrain (ou de l'objet) où il a été découvert. "
                "Celui qui le trouve a droit à une rémunération équitable, au maximum la moitié de sa valeur (art. 723 CC).\n\n"
                "🏛️ Antiquités et curiosités naturelles sans propriétaire et d'un intérêt scientifique considérable (des pièces romaines, par exemple) : "
                "elles appartiennent au canton. Celui qui les trouve (et, pour un trésor, le propriétaire du terrain) a droit à une rémunération équitable, "
                "au maximum la valeur de la chose (art. 724 CC).\n\n"
                "🎬 Histoire vraie : en 2015, à Ueken (Argovie), un agriculteur a découvert plus de 4000 pièces romaines dans son verger.\n\n"
                "🚨 Garder une trouvaille pour soi peut constituer une appropriation illégitime, poursuivie sur plainte (art. 137 CP). "
                "Attention : de l'argent caché récemment (par exemple par un ancien occupant) n'est pas un trésor, il a encore un propriétaire ou des héritiers. "
                "En pratique, la recherche au détecteur de métaux est souvent soumise à autorisation cantonale.\n\n"
                "📤 Envoie ça à quelqu'un qui rêve de trouver un trésor. Une question ? Thrax Legal, lien en bio.\n\n"
                "#tresor #or #lausanne #vaud #argovie #romains #archeologie #suisse #suisseromande #lesaviezvous #droit"),
    "yt_title": "Tu trouves un trésor dans ton jardin en Suisse : il est à qui ? #shorts",
    "tiktok_title": "Tu trouves 100'000 CHF en or dans un jardin à Lausanne. Il est à qui ? 🪙",
    "first_comment": "Toi, tu le déclares ou tu le gardes ? 👇",
    "tags": ["trésor", "art. 723 CC", "art. 724 CC", "pièces romaines", "Lausanne"],
    "genome": {"style": "3d-aventure-cinema-coupe-de-terrain", "palette": "noir terre/or fondu/vert vaudois/rouge-bleu gyrophare",
               "hook": "triple : pelle qui frappe + « ta pelle tape sur ça » + 100'000 CHF « il est à qui ? »",
               "format": "chasse au trésor + 4 retournements + histoire vraie + relance toutes les 2-3 s", "topic": "propriété/trésor",
               "mascot": "coffre 3D + pions toi/propriétaire", "voice": "fr-FR-VivienneMultilingualNeural",
               "captions": "blanc-contour-brun", "music": "epic", "length": "~45s"},
    "cover_t": 3.2,
}

CSS = """
#root { background: radial-gradient(ellipse at 50% 55%, #2a1708 0%, #120a04 55%, #050302 100%); color:#fff; }
#gl { position:absolute; left:0; top:0; width:1080px; height:1920px; }
#bloom { position:absolute; left:0; top:0; width:1080px; height:1920px; filter: blur(20px) brightness(1.25) contrast(1.5) saturate(1.3);
         mix-blend-mode: screen; opacity:0.42; pointer-events:none; }
.vig { position:absolute; inset:0; background: radial-gradient(ellipse at 50% 50%, transparent 52%, rgba(0,0,0,0.72) 100%); pointer-events:none; }
.flash { position:absolute; inset:0; background:#fff3c4; pointer-events:none; }
.top { position:absolute; left:50px; right:50px; display:flex; flex-direction:column; align-items:center; text-align:center; gap:14px; }
.gold { background: linear-gradient(180deg, #fff6c8 0%, #ffd463 38%, #d48a12 70%, #ffe9a1 100%); -webkit-background-clip:text; background-clip:text;
        color:transparent; filter: drop-shadow(0 6px 0 #3a1f02) drop-shadow(0 0 30px rgba(255,190,60,0.55)); }
.xl { font-size:150px; font-weight:900; letter-spacing:-0.05em; line-height:0.9; }
.big { font-size:112px; font-weight:900; letter-spacing:-0.045em; line-height:0.95; }
.mid { font-size:64px; font-weight:900; line-height:1.06; letter-spacing:-0.02em; text-shadow: 0 4px 0 #000, 0 0 26px rgba(0,0,0,0.9); }
.sm { font-size:40px; font-weight:800; color:#f3dcae; text-shadow: 0 3px 12px #000; }
.red { color:#ff3b4f; text-shadow: 0 0 30px rgba(255,40,60,0.7), 0 6px 0 #2a0005; }
.grn { color:#5dff9d; }
.tag { font-size:28px; font-weight:800; color:#e9d6b0; border:2px dashed rgba(233,214,176,0.6); border-radius:12px; padding:6px 16px; background:rgba(0,0,0,0.45); }
.lbl { position:absolute; left:0; top:0; font-size:42px; font-weight:900; padding:8px 20px; border-radius:16px; white-space:nowrap;
       background:rgba(10,6,2,0.78); border:3px solid #ffd463; color:#ffe9a1; transform: translate(-50%, -100%); }
.chip { display:inline-block; background:#ffd463; color:#1a0d02; font-size:66px; font-weight:900; border-radius:20px; padding:10px 30px;
        box-shadow: 0 0 40px rgba(255,200,80,0.6); }
.brand { font-size:120px; font-weight:900; letter-spacing:-0.05em; }
.brand span { color:#ffd463; }
.cap { top: 1560px; font-size: 76px; }
.cap .cw { -webkit-text-stroke: 14px #1a0d02; }
.cap .cw.now { color:#ffd463; }
"""


def body(w):
    T = {k: w.a(p) for k, p in {
        "pelle": "Ta pelle", "ca": "quelque chose,", "coffre": "Un vieux coffre", "lausanne": "dans un jardin", "or": "et rempli",
        "cent": "Il y en a", "qui": "Alors, il est à qui ?", "toi": "Si le jardin", "loc": "Mais si tu es locataire", "change": "Là, tout change.",
        "prop": "Le trésor appartient", "pas": "pas à celui", "perd": "Mais toi,", "recomp": "droit à une récompense.", "moitie": "Jusqu'à la moitié.",
        "fou": "Et maintenant,", "romaines": "Si ce sont des pièces romaines,", "ni": "elles ne sont ni", "canton": "Elles appartiennent au canton.",
        "rassure": "Rassure-toi,", "film": "Et ce n'est pas un film", "argovie": "en Argovie,", "quatre": "plus de quatre mille", "verger": "dans son verger.",
        "secret": "Et si tu gardes", "plainte": "une plainte pénale.", "donc": "Donc tu déclares,", "art": "Article sept cent vingt-trois,",
        "envoie": "Envoie ça", "tresor": "trouver un trésor."}.items()}
    T["total"] = w.total
    T["hit"] = max(0.28, T["ca"] - 0.05)
    globals()["PUNCH"] = [T["hit"], T["qui"], T["change"], T["fou"], T["plainte"]]
    globals()["SFX"] = [{"t": T["hit"], "k": "impact"}, {"t": T["hit"] + 0.02, "k": "stamp"}, {"t": T["coffre"] - 0.6, "k": "riser"},
                        {"t": T["or"], "k": "impact"}, {"t": T["cent"], "k": "cash"}, {"t": T["moitie"], "k": "cash"},
                        {"t": T["fou"] - 1.0, "k": "riser"}, {"t": T["fou"], "k": "impact"}, {"t": T["canton"], "k": "impact"},
                        {"t": T["film"] - 0.8, "k": "riser"}, {"t": T["plainte"], "k": "buzz"}, {"t": T["donc"], "k": "ding"}]
    globals()["SCRIPT"] = SCRIPT_T.replace("__T__", json.dumps(T))
    O = lambda a, b: f'data-at="{a:.3f}" data-out="{b - 0.15:.3f}"'
    return f"""
<canvas id="gl" width="1080" height="1920"></canvas>
<canvas id="bloom" width="540" height="960"></canvas>
<div class="vig"></div>
<div class="flash" id="flash" style="opacity:0"></div>
<div class="lbl" id="lblYou" style="opacity:0">🙋 TOI</div>
<div class="lbl" id="lblOwner" style="opacity:0">🏠 PROPRIÉTAIRE</div>

<div class="top" style="top:40px" data-fx="fade" data-d="0.2" {O(T['lausanne'], T['qui'])}><div class="tag">situation imaginaire</div></div>
<div class="top" style="top:170px" data-fx="pop" {O(0.05, T['hit'])}><div class="mid">😳 Ta pelle vient<br>de toucher…</div></div>
<div class="top" style="top:150px" data-fx="stamp" data-rot="-7" {O(T['hit'], T['coffre'])}><div class="xl gold">CLANG !</div>
  <div class="mid" data-fx="rise" data-at="{T['hit'] + 0.25:.3f}">⛏️ …c'est quoi, ça ?</div></div>
<div class="top" style="top:130px" data-fx="drop" {O(T['coffre'], T['cent'])}>
  <div class="mid">Un coffre enterré<br>depuis des siècles</div>
  <div class="sm">📍 dans un jardin à Lausanne</div>
  <div class="big gold" data-fx="stamp" data-rot="-4" data-at="{T['or']:.3f}">REMPLI D'OR</div>
</div>
<div class="top" style="top:120px" data-fx="drop" {O(T['cent'], T['toi'])}>
  <div class="xl gold" data-fx="count" data-from="0" data-to="100000" data-suf=" CHF" data-d="1.0" data-at="{T['cent']:.3f}" style="font-size:132px">0</div>
  <div class="big" data-fx="stamp" data-rot="-5" data-at="{T['qui']:.3f}">IL EST À QUI ? 🤔</div>
</div>
<div class="top" style="top:140px" data-fx="drop" {O(T['toi'], T['loc'])}>
  <div class="mid">Ton jardin ?</div><div class="big grn" data-fx="stamp" data-rot="-4" data-at="{T['toi'] + 0.8:.3f}">À TOI ✅</div>
</div>
<div class="top" style="top:140px" data-fx="drop" {O(T['loc'], T['perd'])}>
  <div class="mid">Locataire ? 😬</div>
  <div class="big red" data-fx="stamp" data-rot="-4" data-at="{T['change']:.3f}">TOUT CHANGE</div>
  <div class="mid" style="font-size:54px" data-fx="rise" data-at="{T['prop']:.3f}">→ au <span class="gold">propriétaire</span> du terrain</div>
</div>
<div class="top" style="top:140px" data-fx="drop" {O(T['perd'], T['fou'])}>
  <div class="mid">Toi ? Une récompense 🎁</div>
  <div class="xl gold" data-fx="stamp" data-rot="-4" data-at="{T['moitie']:.3f}">jusqu'à 50 %</div>
</div>
<div class="top" style="top:520px" data-fx="stamp" data-rot="-6" {O(T['fou'], T['romaines'])}><div class="xl red">⚠️ LE PLUS<br>FOU 👇</div></div>
<div class="top" style="top:130px" data-fx="drop" {O(T['romaines'], T['rassure'])}>
  <div class="mid">🏛️ Des pièces romaines ?</div>
  <div class="mid" style="font-size:52px" data-fx="rise" data-at="{T['ni']:.3f}">ni à toi ❌ ni au propriétaire ❌</div>
  <div class="big gold" data-fx="stamp" data-rot="-4" data-at="{T['canton']:.3f}">→ AU CANTON</div>
</div>
<div class="top" style="top:150px" data-fx="drop" {O(T['rassure'], T['film'])}>
  <div class="mid">Toi : récompense quand même ✅</div>
</div>
<div class="top" style="top:120px" data-fx="drop" {O(T['film'], T['secret'])}>
  <div class="big red" data-fx="stamp" data-rot="-5" data-at="{T['film']:.3f}">🎬 PAS UN FILM</div>
  <div class="sm" data-fx="rise" data-at="{T['argovie']:.3f}">📍 Argovie · dans un verger</div>
  <div class="xl gold" data-fx="count" data-from="0" data-to="4166" data-d="1.3" data-at="{T['quatre']:.3f}">0</div>
  <div class="mid" style="font-size:50px" data-fx="rise" data-at="{T['quatre'] + 0.6:.3f}">pièces romaines trouvées</div>
</div>
<div class="top" style="top:150px" data-fx="drop" {O(T['secret'], T['donc'])}>
  <div class="mid">🤫 Tu gardes tout en secret ?</div>
  <div class="big red" data-fx="stamp" data-rot="-6" data-at="{T['plainte'] - 0.4:.3f}">🚨 PLAINTE<br>PÉNALE</div>
</div>
<div class="top" style="top:150px" data-fx="drop" {O(T['donc'], T['envoie'])}>
  <div class="mid">✅ Tu déclares</div>
  <div class="mid gold" data-fx="rise" data-at="{T['donc'] + 0.7:.3f}">🎁 tu demandes ta récompense</div>
  <div class="chip" data-fx="stamp" data-rot="-3" data-at="{T['art']:.3f}">Art. 723 + 724 CC</div>
</div>
<div class="top" style="top:150px" data-fx="drop" data-at="{T['envoie']:.3f}">
  <div class="mid">📤 Envoie ça à quelqu'un<br>qui rêve d'un trésor</div>
  <div class="brand" data-fx="zoom" data-at="{T['envoie'] + 1.0:.3f}">Thrax <span>Legal</span></div>
</div>
"""


SCRIPT_T = r"""
(function(){
  var T = __T__, TH = THREE;
  var cv = document.getElementById('gl'), bl = document.getElementById('bloom'), bx = bl.getContext('2d');
  var flash = document.getElementById('flash'), lblYou = document.getElementById('lblYou'), lblOwner = document.getElementById('lblOwner');
  var r = new TH.WebGLRenderer({canvas: cv, antialias: true, preserveDrawingBuffer: true, alpha: true});
  r.setSize(1080, 1920, false); r.setClearColor(0x000000, 0);
  r.toneMapping = TH.ACESFilmicToneMapping; r.toneMappingExposure = 0.95; r.outputColorSpace = TH.SRGBColorSpace;
  var sc = new TH.Scene(); sc.fog = new TH.Fog(0x0b0603, 12, 30);
  var cam = new TH.PerspectiveCamera(40, 1080 / 1920, 0.05, 120);
  function rnd(i, k){ var x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x); }
  function cl(v){ return Math.max(0, Math.min(1, v)); }
  function eo(u){ u = cl(u); return 1 - Math.pow(1 - u, 3); }
  function eio(u){ u = cl(u); return u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; }
  function tex(w, h, draw){ var c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
    var t = new TH.CanvasTexture(c); t.colorSpace = TH.SRGBColorSpace; t.anisotropy = 8; return t; }

  // Warm "treasure cave" environment for golden reflections.
  var env = new TH.Scene();
  env.add(new TH.Mesh(new TH.BoxGeometry(30, 30, 30), new TH.MeshBasicMaterial({color: 0x0a0503, side: TH.BackSide})));
  function panel(w, h, c, x, y, z, ry, rx){ var m = new TH.Mesh(new TH.PlaneGeometry(w, h), new TH.MeshBasicMaterial({color: c, side: TH.DoubleSide}));
    m.position.set(x, y, z); m.rotation.set(rx || 0, ry || 0, 0); env.add(m); }
  panel(14, 5, 0xffe2a8, 0, 13, 0, 0, Math.PI / 2); panel(4, 12, 0xffb45a, -13, 3, 2, Math.PI / 2); panel(4, 12, 0x8fb4ff, 13, 3, -2, -Math.PI / 2);
  panel(16, 3, 0xfff1d0, 0, 4, 13, Math.PI);
  var pm = new TH.PMREMGenerator(r); sc.environment = pm.fromScene(env, 0.04).texture;

  var hemi = new TH.HemisphereLight(0xffd9a0, 0x120802, 0.55); sc.add(hemi);
  var key = new TH.SpotLight(0xffe6b8, 320, 40, 0.55, 0.7, 1.6); key.position.set(3, 9, 7); sc.add(key); sc.add(key.target);
  var rim = new TH.PointLight(0x6f9dff, 40, 18, 2); rim.position.set(-4, 4, -3); sc.add(rim);
  var face = new TH.DirectionalLight(0xffd9a8, 1.1); face.position.set(3, 9, 12); sc.add(face);
  var glow = new TH.PointLight(0xffb43a, 0, 9, 1.6); glow.position.set(0, 1.9, 0.2); sc.add(glow);
  var copR = new TH.PointLight(0xff1830, 0, 14, 1.5), copB = new TH.PointLight(0x2050ff, 0, 14, 1.5); sc.add(copR); sc.add(copB);

  // Cut-away block of earth with its strata (the camera travels down its face).
  var strata = tex(512, 1024, function(g, w, h){
    var bands = [[0, 0.035, '#3f7a2a'], [0.035, 0.06, '#2b4a19'], [0.06, 0.22, '#4a2c16'], [0.22, 0.34, '#6b4220'], [0.34, 0.47, '#3a2412'],
                 [0.47, 0.6, '#7a5a34'], [0.6, 0.74, '#2f1d0e'], [0.74, 0.86, '#57391c'], [0.86, 1, '#1f1309']];
    bands.forEach(function(b){ g.fillStyle = b[2]; g.fillRect(0, b[0] * h, w, (b[1] - b[0]) * h + 2); });
    for (var i = 0; i < 2600; i++) { var y = rnd(i, 1) * h, x = rnd(i, 2) * w, s = 1 + rnd(i, 3) * 3;
      g.fillStyle = 'rgba(' + (rnd(i, 4) > 0.5 ? '255,230,190' : '0,0,0') + ',' + (0.05 + rnd(i, 5) * 0.12) + ')'; g.fillRect(x, y, s, s); }
    for (var i = 0; i < 45; i++) { var y = (0.1 + rnd(i, 6) * 0.85) * h, x = rnd(i, 7) * w, rr = 5 + rnd(i, 8) * 16;
      g.fillStyle = 'rgba(' + Math.floor(55 + rnd(i, 9) * 35) + ',' + Math.floor(45 + rnd(i, 9) * 30) + ',' + Math.floor(38 + rnd(i, 9) * 25) + ',0.9)';
      g.beginPath(); g.ellipse(x, y, rr, rr * 0.7, rnd(i, 10) * 3, 0, Math.PI * 2); g.fill(); }
    g.strokeStyle = 'rgba(30,18,8,0.7)'; g.lineWidth = 3;
    for (var i = 0; i < 18; i++) { var x = rnd(i, 11) * w; g.beginPath(); g.moveTo(x, 0.04 * h);
      for (var k = 1; k < 8; k++) g.lineTo(x + (rnd(i, k + 20) - 0.5) * 50, (0.04 + k * 0.03) * h); g.stroke(); }
  });
  var dark = new TH.MeshStandardMaterial({color: 0x24160a, roughness: 1});
  var earth = new TH.Mesh(new TH.BoxGeometry(16, 12, 8), [dark, dark, new TH.MeshStandardMaterial({color: 0x3f7a2a, roughness: 1}), dark,
    new TH.MeshStandardMaterial({map: strata, roughness: 1, envMapIntensity: 0.2}), dark]);
  earth.position.set(0, 6, -5.2); sc.add(earth);
  var floorTex = tex(512, 512, function(g, w, h){ g.fillStyle = '#2a190b'; g.fillRect(0, 0, w, h);
    for (var i = 0; i < 4000; i++) { g.fillStyle = 'rgba(' + (rnd(i, 30) > 0.5 ? '255,220,170' : '0,0,0') + ',' + (0.04 + rnd(i, 31) * 0.1) + ')';
      g.fillRect(rnd(i, 32) * w, rnd(i, 33) * h, 2 + rnd(i, 34) * 3, 2 + rnd(i, 34) * 3); } });
  floorTex.wrapS = floorTex.wrapT = TH.RepeatWrapping; floorTex.repeat.set(6, 6);
  var floor = new TH.Mesh(new TH.PlaneGeometry(60, 60), new TH.MeshStandardMaterial({map: floorTex, roughness: 0.95, envMapIntensity: 0.15}));
  floor.rotation.x = -Math.PI / 2; floor.position.z = 8; sc.add(floor);

  // Golden vein: charges from the shovel down to the chest after the hit.
  var vein = new TH.Mesh(new TH.BoxGeometry(0.07, 1, 0.07), new TH.MeshBasicMaterial({color: 0xffc04a, transparent: true, blending: TH.AdditiveBlending, depthWrite: false}));
  sc.add(vein);

  // Shovel.
  var shovel = new TH.Group(); sc.add(shovel);
  var wood = new TH.MeshStandardMaterial({color: 0x8a5a2b, roughness: 0.7});
  var steel = new TH.MeshPhysicalMaterial({color: 0xc9ced6, metalness: 1, roughness: 0.25, clearcoat: 0.5});
  var handle = new TH.Mesh(new TH.CylinderGeometry(0.055, 0.06, 2.4, 14), wood); handle.position.y = 1.55; shovel.add(handle);
  var grip = new TH.Mesh(new TH.TorusGeometry(0.16, 0.035, 10, 24), wood); grip.position.y = 2.8; shovel.add(grip);
  var bs = new TH.Shape(); bs.moveTo(-0.32, 0.35); bs.lineTo(0.32, 0.35); bs.quadraticCurveTo(0.34, -0.25, 0, -0.42); bs.quadraticCurveTo(-0.34, -0.25, -0.32, 0.35);
  var blade = new TH.Mesh(new TH.ExtrudeGeometry(bs, {depth: 0.03, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.012, bevelSegments: 2}), steel);
  blade.position.set(0, 0, -0.015); shovel.add(blade);

  // Sparks at the impact.
  var NS = 90, spG = new TH.BufferGeometry(), spP = new Float32Array(NS * 3); spG.setAttribute('position', new TH.BufferAttribute(spP, 3));
  var sparks = new TH.Points(spG, new TH.PointsMaterial({color: 0xffd27a, size: 0.07, transparent: true, blending: TH.AdditiveBlending, depthWrite: false}));
  sc.add(sparks);

  // Chest.
  var plank = tex(512, 256, function(g, w, h){ for (var i = 0; i < 6; i++) { var y = i * h / 6;
      g.fillStyle = ['#6b3d1a', '#5c3315', '#74431d', '#633818', '#6e3f1b', '#583014'][i]; g.fillRect(0, y, w, h / 6);
      g.fillStyle = 'rgba(0,0,0,0.45)'; g.fillRect(0, y, w, 4);
      for (var k = 0; k < 40; k++) { g.fillStyle = 'rgba(0,0,0,' + (0.05 + rnd(i * 40 + k, 40) * 0.12) + ')';
        g.fillRect(rnd(i * 40 + k, 41) * w, y + rnd(i * 40 + k, 42) * h / 6, 40 + rnd(i * 40 + k, 43) * 120, 2); } } });
  var woodM = new TH.MeshStandardMaterial({map: plank, roughness: 0.8, envMapIntensity: 0.3});
  var brass = new TH.MeshPhysicalMaterial({color: 0xd9a441, metalness: 1, roughness: 0.32, clearcoat: 0.4});
  var chest = new TH.Group(); sc.add(chest);
  var cb = new TH.Mesh(new TH.BoxGeometry(2.4, 1.3, 1.6), woodM); cb.position.y = 0.65; chest.add(cb);
  [-0.85, 0.85].forEach(function(x){ var b = new TH.Mesh(new TH.BoxGeometry(0.16, 1.34, 1.64), brass); b.position.set(x, 0.65, 0); chest.add(b); });
  var rimB = new TH.Mesh(new TH.BoxGeometry(2.44, 0.12, 1.64), brass); rimB.position.y = 1.26; chest.add(rimB);
  var lock = new TH.Mesh(new TH.BoxGeometry(0.34, 0.42, 0.06), brass); lock.position.set(0, 1.05, 0.82); chest.add(lock);
  var lidP = new TH.Group(); lidP.position.set(0, 1.32, -0.8); chest.add(lidP);
  var lidG = new TH.CylinderGeometry(0.8, 0.8, 2.4, 32, 1, false, 0, Math.PI);
  var lid = new TH.Mesh(lidG, woodM); lid.rotation.z = Math.PI / 2; lid.scale.set(0.55, 1, 1); lid.position.z = 0.8; lidP.add(lid);
  [-0.85, 0.85].forEach(function(x){ var b = new TH.Mesh(new TH.CylinderGeometry(0.82, 0.82, 0.16, 32, 1, false, 0, Math.PI), brass);
    b.rotation.z = Math.PI / 2; b.scale.set(0.56, 1, 1); b.position.set(x, 0, 0.8); lidP.add(b); });
  var heap = new TH.Mesh(new TH.SphereGeometry(1, 32, 16), new TH.MeshPhysicalMaterial({color: 0xffc24d, metalness: 1, roughness: 0.28, emissive: 0x6a3a00, emissiveIntensity: 0.4}));
  heap.scale.set(1.1, 0.22, 0.72); heap.position.y = 1.2; chest.add(heap);
  var hot = new TH.Mesh(new TH.PlaneGeometry(2.2, 1.4), new TH.MeshBasicMaterial({color: 0xffc85a, transparent: true, opacity: 0, blending: TH.AdditiveBlending, depthWrite: false}));
  hot.rotation.x = -Math.PI / 2; hot.position.y = 1.47; chest.add(hot);
  // God rays.
  var rays = [];
  for (var i = 0; i < 5; i++) { var g = new TH.CylinderGeometry(0.25 + i * 0.12, 0.05, 7, 24, 1, true);
    var m = new TH.Mesh(g, new TH.MeshBasicMaterial({color: 0xffc860, transparent: true, opacity: 0, blending: TH.AdditiveBlending, depthWrite: false, side: TH.DoubleSide}));
    m.position.set((i - 2) * 0.22, 4.9, 0); m.rotation.z = (i - 2) * 0.09; sc.add(m); rays.push(m); }

  // Coins: antique gold face, then Roman bronze face.
  var goldFace = tex(256, 256, function(g, w, h){ var gr = g.createRadialGradient(100, 90, 10, 128, 128, 150);
    gr.addColorStop(0, '#fff3b8'); gr.addColorStop(0.55, '#f1bf47'); gr.addColorStop(1, '#a8700f'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
    g.strokeStyle = '#7a4d06'; g.lineWidth = 8; g.beginPath(); g.arc(128, 128, 104, 0, Math.PI * 2); g.stroke();
    for (var i = 0; i < 36; i++) { var a = i / 36 * Math.PI * 2; g.fillStyle = '#7a4d06'; g.beginPath(); g.arc(128 + Math.cos(a) * 116, 128 + Math.sin(a) * 116, 4, 0, 7); g.fill(); }
    g.fillStyle = '#7a4d06'; g.beginPath(); for (var i = 0; i < 10; i++) { var a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? 30 : 70;
      g.lineTo(128 + Math.cos(a) * rr, 128 + Math.sin(a) * rr); } g.closePath(); g.fill(); });
  var romanFace = tex(256, 256, function(g, w, h){ var gr = g.createRadialGradient(100, 90, 10, 128, 128, 150);
    gr.addColorStop(0, '#f6d9a8'); gr.addColorStop(0.55, '#c88a46'); gr.addColorStop(1, '#6e3f16'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
    g.fillStyle = '#4a2608'; g.font = '900 30px serif'; g.textAlign = 'center';
    var txt = 'IMP·CAES·AVG·'; for (var i = 0; i < txt.length * 2; i++) { var a = -Math.PI * 0.95 + i * 0.25;
      g.save(); g.translate(128 + Math.cos(a) * 100, 128 + Math.sin(a) * 100); g.rotate(a + Math.PI / 2); g.fillText(txt[i % txt.length], 0, 10); g.restore(); }
    g.beginPath(); g.ellipse(132, 128, 46, 56, 0, 0, Math.PI * 2); g.fill();
    g.beginPath(); g.moveTo(90, 120); g.lineTo(70, 136); g.lineTo(92, 142); g.fill();
    g.strokeStyle = '#2f7a2a'; g.lineWidth = 7; for (var i = 0; i < 6; i++) { g.beginPath(); g.ellipse(120 + i * 10, 80 + i * 2, 12, 5, -0.6, 0, 7); g.stroke(); } });
  var coinSide = new TH.MeshPhysicalMaterial({color: 0xe0a83a, metalness: 1, roughness: 0.3});
  var coinFace = new TH.MeshPhysicalMaterial({map: goldFace, metalness: 0.85, roughness: 0.3, clearcoat: 0.7});
  var coinG = new TH.CylinderGeometry(0.2, 0.2, 0.035, 32);
  var dummy = new TH.Object3D();
  var NE = 200, erupt = new TH.InstancedMesh(coinG, [coinSide, coinFace, coinFace], NE); sc.add(erupt);
  var EP = [];
  for (var i = 0; i < NE; i++) {
    var vx = (rnd(i, 50) - 0.5) * 3.4, vy = 4.6 + rnd(i, 51) * 3.4, vz = 0.6 + rnd(i, 52) * 2.8, y0 = 1.45;
    var ul = (vy + Math.sqrt(vy * vy + 2 * 9.8 * (y0 - 0.02))) / 9.8;
    EP.push({t0: T.cent - 0.25 + rnd(i, 53) * 0.7, vx: vx, vy: vy, vz: vz, ul: ul, s: [rnd(i, 54) * 14, rnd(i, 55) * 9, rnd(i, 56) * 14],
             lx: vx * ul, lz: vz * ul, ry: rnd(i, 57) * 6.28, tg: [(rnd(i, 58) - 0.5) * 2.0, 2.3 + rnd(i, 59) * 2.6, -0.5 + rnd(i, 60) * 0.3]});
  }
  erupt.frustumCulled = false;
  var NF = 70, flow = new TH.InstancedMesh(coinG, [coinSide, coinFace, coinFace], NF); sc.add(flow);
  var NR = 160, rain = new TH.InstancedMesh(coinG, [coinSide, coinFace, coinFace], NR); sc.add(rain);
  flow.frustumCulled = false; rain.frustumCulled = false;

  // Owner's house and "you" pawn.
  var house = new TH.Group(); sc.add(house); house.position.set(1.95, 0, 1.1);
  var wall = new TH.Mesh(new TH.BoxGeometry(1.1, 0.85, 0.9), new TH.MeshStandardMaterial({color: 0xf1e3c8, roughness: 0.6})); wall.position.y = 0.43; house.add(wall);
  var roof = new TH.Mesh(new TH.ConeGeometry(0.92, 0.6, 4), new TH.MeshStandardMaterial({color: 0xb43a22, roughness: 0.5})); roof.position.y = 1.15; roof.rotation.y = Math.PI / 4; house.add(roof);
  var door = new TH.Mesh(new TH.BoxGeometry(0.24, 0.42, 0.02), new TH.MeshStandardMaterial({color: 0x5a3316})); door.position.set(0, 0.21, 0.46); house.add(door);
  var pawn = new TH.Group(); sc.add(pawn); pawn.position.set(-1.95, 0, 1.2);
  var pearl = new TH.MeshPhysicalMaterial({color: 0xf6f1ea, roughness: 0.25, clearcoat: 1, sheen: 1, sheenColor: new TH.Color(0xffd27a)});
  var pb = new TH.Mesh(new TH.CylinderGeometry(0.22, 0.42, 0.9, 32), pearl); pb.position.y = 0.45; pawn.add(pb);
  var ph = new TH.Mesh(new TH.SphereGeometry(0.28, 32, 16), pearl); ph.position.y = 1.15; pawn.add(ph);

  // Canton of Vaud shield.
  var sh = new TH.Shape(); sh.moveTo(-1.2, 1.5); sh.lineTo(1.2, 1.5); sh.lineTo(1.2, 0); sh.quadraticCurveTo(1.15, -1.1, 0, -1.6); sh.quadraticCurveTo(-1.15, -1.1, -1.2, 0); sh.lineTo(-1.2, 1.5);
  var vaud = tex(512, 640, function(g, w, h){ g.fillStyle = '#ffffff'; g.fillRect(0, 0, w, h / 2); g.fillStyle = '#1f8a3b'; g.fillRect(0, h / 2, w, h / 2);
    g.fillStyle = '#d8a520'; g.font = '900 64px sans-serif'; g.textAlign = 'center'; g.fillText('LIBERTÉ', w / 2, h * 0.22); g.fillText('ET PATRIE', w / 2, h * 0.36); });
  vaud.repeat.set(1 / 2.4, 1 / 3.2); vaud.offset.set(0.5, 0.5);
  var shield = new TH.Mesh(new TH.ExtrudeGeometry(sh, {depth: 0.18, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.08, bevelSegments: 4, curveSegments: 24}),
    [new TH.MeshPhysicalMaterial({map: vaud, roughness: 0.35, clearcoat: 1}), brass]);
  shield.position.set(0, 3.5, -0.9); sc.add(shield);

  // Floating gold dust.
  var ND = 500, dG = new TH.BufferGeometry(), dP = new Float32Array(ND * 3);
  for (var i = 0; i < ND; i++) { dP[i * 3] = (rnd(i, 70) - 0.5) * 10; dP[i * 3 + 1] = rnd(i, 71) * 7; dP[i * 3 + 2] = (rnd(i, 72) - 0.5) * 8 + 1; }
  dG.setAttribute('position', new TH.BufferAttribute(dP, 3));
  var dust = new TH.Points(dG, new TH.PointsMaterial({color: 0xffd27a, size: 0.035, transparent: true, opacity: 0.8, blending: TH.AdditiveBlending, depthWrite: false}));
  sc.add(dust);

  // Camera keys: [time, pos, look, fov].
  var K = [
    [0, [1.8, 13.5, 6.4], [0.3, 12.3, 0], 42],
    [T.coffre - 0.2, [0.7, 2.9, 6.4], [0, 1.0, 0], 40],
    [T.or - 0.1, [0, 2.3, 4.3], [0, 1.3, 0], 40],
    [T.qui, [0, 2.9, 6.8], [0, 1.6, 0], 40],
    [T.loc, [0, 3.2, 9.6], [0, 1.5, 0.6], 50],
    [T.fou, [0.5, 1.7, 3.6], [0, 1.4, 0], 38],
    [T.romaines + 0.4, [0, 1.6, 8.2], [0, 2.4, 0], 46],
    [T.film, [0, 6.8, 11.5], [0, 1.6, 0], 46],
    [T.secret, [-2.4, 1.3, 5.0], [0, 1.0, 0], 42],
    [T.donc, [0, 2.4, 6.2], [0, 1.4, 0], 40]
  ];
  var dur = [0.01, 1.7, 0.6, 0.6, 0.9, 0.45, 0.9, 1.0, 0.8, 0.9];
  var pa = new TH.Vector3(), pb2 = new TH.Vector3(), la = new TH.Vector3(), lb = new TH.Vector3(), V = new TH.Vector3();
  function camAt(t){
    var i = 0; while (i + 1 < K.length && t >= K[i + 1][0]) i++;
    var cur = K[i], prev = K[Math.max(0, i - 1)];
    var u = i === 0 ? 1 : eio((t - cur[0]) / dur[i]);
    pa.fromArray(prev[1]); pb2.fromArray(cur[1]); la.fromArray(prev[2]); lb.fromArray(cur[2]);
    if (i === 0) { pa.copy(pb2); la.copy(lb); }
    cam.position.lerpVectors(pa, pb2, u); V.lerpVectors(la, lb, u);
    cam.fov = prev[3] + (cur[3] - prev[3]) * u;
    // slow orbit + handheld drift
    var orb = Math.sin(t * 0.35) * 0.5; cam.position.x += orb; cam.position.y += Math.sin(t * 1.7) * 0.03;
    // impact shakes
    [T.hit, T.or, T.fou, T.canton, T.plainte].forEach(function(s){ var d = t - s; if (d > 0 && d < 0.45) {
      var k = (1 - d / 0.45) * 0.12; cam.position.x += Math.sin(d * 90) * k; cam.position.y += Math.cos(d * 77) * k; } });
    cam.updateProjectionMatrix(); cam.lookAt(V);
  }
  function label(el, obj, y, a){ V.copy(obj.position); V.y += y; V.project(cam);
    el.style.left = Math.max(190, Math.min(890, (V.x + 1) / 2 * 1080)).toFixed(1) + 'px'; el.style.top = ((1 - V.y) / 2 * 1920).toFixed(1) + 'px'; el.style.opacity = a; }

  R.on(function(t){
    camAt(t);
    // Shovel strike and sparks.
    var down = eo(t / Math.max(0.2, T.hit)), bounce = t > T.hit ? Math.exp(-(t - T.hit) * 6) * Math.sin((t - T.hit) * 40) * 0.06 : 0;
    shovel.position.set(0.5, 12.0 + 0.36 + (1 - down) * 1.6 + bounce, 0.35); shovel.rotation.set(-0.25 + (1 - down) * 0.5, 0.4, 0.12);
    shovel.visible = t < T.coffre + 1.2;
    var sd = t - T.hit;
    for (var i = 0; i < NS; i++) { var a = rnd(i, 80) * 6.28, sp = 1.2 + rnd(i, 81) * 2.4, up = 1 + rnd(i, 82) * 2.2;
      var u = sd > 0 ? sd : 0; spP[i * 3] = 0.5 + Math.cos(a) * sp * u; spP[i * 3 + 1] = 12.0 + up * u - 4.9 * u * u; spP[i * 3 + 2] = 0.35 + Math.sin(a) * sp * u * 0.6 + 0.3 * u; }
    spG.attributes.position.needsUpdate = true; sparks.material.opacity = sd > 0 ? Math.max(0, 1 - sd / 0.7) : 0;
    // Golden vein shooting down.
    var vu = eo((t - T.hit - 0.1) / 1.1), vlen = 11.6 * vu;
    vein.scale.y = Math.max(0.001, vlen); vein.position.set(0.3, 12.0 - vlen / 2, -1.12);
    vein.material.opacity = t > T.hit ? (t < T.or + 0.5 ? 1 : Math.max(0, 1 - (t - T.or - 0.5) / 0.6)) : 0;
    // Lid: opens on "Rempli d'or", closes for the secret, reopens when declared.
    var open = eo((t - T.or + 0.12) / 0.55);
    if (t > T.secret) open *= 1 - eo((t - T.secret) / 0.5);
    if (t > T.donc) open = Math.max(open, 0.7 * eo((t - T.donc) / 0.6));
    lidP.rotation.x = -1.95 * open;
    var gl = open * (t > T.secret && t < T.donc ? 0.15 : 1) * (1 + 0.15 * Math.sin(t * 9));
    glow.intensity = 24 * gl; hot.material.opacity = 0.45 * gl; heap.material.emissiveIntensity = 0.25 + 0.6 * gl;
    rays.forEach(function(m, i){ m.material.opacity = 0.025 * gl * (0.75 + 0.25 * Math.sin(t * 2 + i)); });
    // Coin geyser, then the coins fly into the canton shield.
    var roman = t >= T.romaines;
    coinFace.map = roman ? romanFace : goldFace; coinSide.color.setHex(roman ? 0xb8783a : 0xe0a83a);
    for (var i = 0; i < NE; i++) { var p = EP[i], u = t - p.t0, x, y, z, rx, ry, rz, s = 1;
      if (u <= 0) { s = 0; x = 0; y = 1.4; z = 0; rx = ry = rz = 0; }
      else if (u < p.ul) { x = p.vx * u; y = 1.45 + p.vy * u - 4.9 * u * u; z = p.vz * u; rx = u * p.s[0]; ry = u * p.s[1]; rz = u * p.s[2]; }
      else { x = p.lx; y = 0.02; z = p.lz; rx = 0; ry = p.ry; rz = 0; }
      var fly = eio((t - T.canton + 0.1 - i * 0.004) / 0.9);
      if (fly > 0) { x += (p.tg[0] - x) * fly; y += (p.tg[1] + 0.9 - y) * fly; z += (p.tg[2] - z) * fly; rx = fly * 1.57; s = 1 - fly * 0.9; }
      if (t > T.film) s = 0;
      dummy.position.set(x, y, z); dummy.rotation.set(rx, ry, rz); dummy.scale.setScalar(s); dummy.updateMatrix(); erupt.setMatrixAt(i, dummy.matrix); }
    erupt.instanceMatrix.needsUpdate = true;
    // Stream of coins: to the owner's house, and half of it to "you" after "jusqu'à la moitié".
    var fOn = t > T.prop && t < T.fou;
    for (var i = 0; i < NF; i++) { var per = 1.1, u = (((t - T.prop) + i * per / NF) % per) / per, toYou = (i % 2 === 1) && t > T.moitie - 0.2;
      var tx = toYou ? -1.95 : 1.95, ty = toYou ? 1.5 : 1.3, tz = toYou ? 1.2 : 1.1;
      var cx = tx * 0.5, cy = 3.6, cz = 0.6, a = 1 - u;
      dummy.position.set(a * a * 0 + 2 * a * u * cx + u * u * tx, a * a * 1.5 + 2 * a * u * cy + u * u * ty, a * a * 0.1 + 2 * a * u * cz + u * u * tz);
      dummy.rotation.set(u * 9 + i, u * 5, 0); dummy.scale.setScalar(fOn ? Math.sin(Math.PI * u) * 1.1 : 0); dummy.updateMatrix(); flow.setMatrixAt(i, dummy.matrix); }
    flow.instanceMatrix.needsUpdate = true;
    // Rain of 4000+ Roman coins for the true story.
    for (var i = 0; i < NR; i++) { var u = t - (T.argovie - 0.2 + rnd(i, 90) * 1.8), on = u > 0 && t < T.secret;
      var y = 9 - u * (5 + rnd(i, 91) * 3); y = Math.max(0.02 + (i % 6) * 0.035, y);
      dummy.position.set((rnd(i, 92) - 0.5) * 6, y, (rnd(i, 93) - 0.5) * 5 + 3); dummy.rotation.set(u * 7 * (y > 0.3 ? 1 : 0), rnd(i, 94) * 6, 0);
      dummy.scale.setScalar(on ? 1.6 : 0); dummy.updateMatrix(); rain.setMatrixAt(i, dummy.matrix); }
    rain.instanceMatrix.needsUpdate = true;
    // House and pawn pop in for the tenant twist, leave for the Roman twist.
    var hs = eo((t - T.loc) / 0.5) * (1 - eo((t - T.romaines) / 0.4));
    house.scale.setScalar(Math.max(0.001, hs)); pawn.scale.setScalar(Math.max(0.001, hs * (1 + (t > T.moitie && t < T.fou ? 0.08 * Math.sin(t * 12) : 0))));
    house.rotation.y = -0.35 + Math.sin(t * 0.8) * 0.08; pawn.rotation.y = Math.sin(t) * 0.3;
    label(lblOwner, house, 1.7, hs > 0.6 ? Math.min(1, (t - T.prop) * 3) : 0);
    label(lblYou, pawn, 1.7, hs > 0.6 ? Math.min(1, (t - T.perd) * 3) : 0);
    // Shield rises for the canton, spins slowly.
    var ss = eo((t - T.canton + 0.2) / 0.6) * (1 - eo((t - T.film) / 0.5));
    shield.scale.setScalar(Math.max(0.001, ss)); shield.rotation.y = Math.sin(t * 1.1) * 0.35; shield.position.y = 3.3 + Math.sin(t * 2) * 0.08;
    // Police lights for the secret.
    var cop = t > T.secret + 0.6 && t < T.donc ? 1 : 0, ph = (t * 4) % 2 < 1;
    copR.intensity = cop * (ph ? 120 : 10); copB.intensity = cop * (ph ? 10 : 120);
    copR.position.set(Math.cos(t * 5) * 3, 2.5, Math.sin(t * 5) * 3 + 1); copB.position.set(-Math.cos(t * 5) * 3, 2.5, -Math.sin(t * 5) * 3 + 1);
    key.intensity = cop ? 60 : 260; hemi.intensity = cop ? 0.15 : 0.55;
    // Dust drift.
    dust.rotation.y = t * 0.04; dust.position.y = Math.sin(t * 0.5) * 0.1;
    // White flashes on the big beats.
    var fl = 0; [T.or, T.fou, T.canton].forEach(function(s){ var d = t - s; if (d > -0.02 && d < 0.35) fl = Math.max(fl, 1 - d / 0.35); });
    flash.style.opacity = (fl * 0.55).toFixed(3);
    r.render(sc, cam);
    bx.clearRect(0, 0, 540, 960); bx.drawImage(cv, 0, 0, 540, 960);
  });
})();
"""
PUNCH = []
SFX = []
TAIL = 2.0
CAP_MAX = 3
