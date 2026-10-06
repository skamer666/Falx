"""Reel 029 — « L'héritage piégé » : un parent meurt et laisse 80'000 CHF de dettes (situation imaginaire, Fribourg).
Règles vérifiées : les héritiers acquièrent l'actif et le passif (art. 560 CC), ils peuvent répudier (art. 566 CC) dans les
3 mois dès qu'ils ont connu le décès (art. 567 CC), par déclaration orale ou écrite à l'autorité compétente (art. 570 CC),
mais ne le peuvent plus s'ils se sont immiscés dans la succession ou ont soustrait des biens (art. 571 al. 2 CC).
Style jamais utilisé : 3D pâte à modeler (claymation : matière mate avec empreintes, léger « bouillonnement » image par image
à 12 i/s, ombres douces, couleurs pastel). Voix Vivienne."""
import json

VOICE = "fr-FR-VivienneMultilingualNeural"
RATE = "+8%"
GAP_SENT = 0.2
USE_THREE = True
TAIL = 1.8
CAP_MAX = 3

VO = ("À Fribourg, ton père meurt et il te laisse quatre-vingt mille francs de dettes. Tu dois les payer ? Pas forcément. "
      "Mais tu as trois mois, et un seul geste peut tout faire basculer. "
      "En Suisse, quand tu hérites, tu prends tout : les biens, et les dettes. Sauf si tu répudies la succession. "
      "Une déclaration, écrite ou orale, à l'autorité du dernier domicile de ton père, souvent la justice de paix. "
      "Tu as trois mois depuis que tu as appris le décès. "
      "Et maintenant, le piège. Si pendant ce temps tu prends sa voiture, tu vides son compte, ou tu vends ses meubles, "
      "tu ne peux plus répudier. Les dettes sont pour toi. "
      "Alors pendant trois mois, tu ne touches à rien. "
      "Articles cinq cent soixante-six et cinq cent septante et un du Code civil. Enregistre ça. On ne sait jamais.")

META = {
    "id": "r029-heritage-dettes-pate",
    "music": "lofi",
    "music_gain": -5,
    "caption": ("🧩 Ton père meurt et te laisse 80'000 francs de dettes : tu dois payer ? Pas forcément. (situation imaginaire)\n\n"
                "En Suisse, les héritiers reprennent les biens ET les dettes (art. 560 CC). Mais chaque héritier peut répudier "
                "la succession (art. 566 CC), par une déclaration orale ou écrite à l'autorité compétente du dernier domicile du "
                "défunt (art. 570 CC), souvent la justice de paix en Suisse romande.\n\n"
                "⏳ Délai : 3 mois dès que tu as connu le décès (art. 567 CC). Le délai peut être prolongé pour de justes motifs (art. 576 CC).\n\n"
                "⚠️ Le piège : celui qui s'immisce dans la succession (il fait autre chose que de la simple administration, il "
                "prend ou vend des biens) ne peut plus répudier (art. 571 al. 2 CC). Les actes urgents de simple administration "
                "restent possibles ; en cas de doute, renseigne-toi avant d'agir.\n"
                "ℹ️ Si le défunt était notoirement insolvable, la répudiation est présumée (art. 566 al. 2 CC). Autre option : "
                "le bénéfice d'inventaire, à demander dans le mois (art. 580 CC).\n\n"
                "🔖 Enregistre ça. Thrax Legal, le juridique à prix fixe en Suisse romande. Lien en bio.\n\n"
                "#heritage #succession #dettes #famille #fribourg #lausanne #geneve #vaud #valais #neuchatel #suisseromande"),
    "yt_title": "Héritage : 80'000 CHF de dettes ? Le geste qui te piège #shorts",
    "tiktok_title": "Ton père te laisse 80'000 CHF de dettes : ne touche à rien 3 mois",
    "tags": ["héritage", "répudiation", "art. 566 CC", "art. 571 CC", "Fribourg"],
    "genome": {"style": "3d-pate-a-modeler-claymation", "palette": "pastel menthe / argile corail / ocre",
               "hook": "perte chiffrée familiale + ville (80'000 CHF de dettes)", "format": "histoire + délai + piège + règle d'or",
               "topic": "succession/dettes", "mascot": "personnage en pâte à modeler",
               "voice": "fr-FR-VivienneMultilingualNeural", "captions": "noir contour crème, mot actif corail", "music": "lofi", "length": "~45s"},
}

CSS = """
#root { background: linear-gradient(#cfeee3 0%, #f6e7cf 62%, #f2d9b8 100%); color:#1d1d1f; }
#gl { position:absolute; left:0; top:0; width:1080px; height:1920px; }
.brand { position:absolute; left:0; right:0; top:84px; text-align:center; font-size:26px; font-weight:800; letter-spacing:0.16em; color:#5b6f66; z-index:3; }
.tag { position:absolute; left:0; right:0; top:134px; text-align:center; z-index:3; }
.tag span { display:inline-block; font-size:26px; font-weight:700; color:#3e4c46; background:rgba(255,255,255,0.75); border-radius:40px; padding:8px 22px; }
.top { position:absolute; left:40px; right:40px; top:210px; text-align:center; z-index:3; }
.clay { display:inline-block; font-size:122px; font-weight:900; letter-spacing:-0.04em; line-height:0.95; color:#e2553f;
        text-shadow: 0 6px 0 #b23b29, 0 14px 24px rgba(90,40,20,0.35); }
.clay.g { color:#3f8f6b; text-shadow: 0 6px 0 #2a6b4e, 0 14px 24px rgba(20,60,40,0.3); }
.clay.d { color:#2b2b33; text-shadow: 0 6px 0 #101016, 0 14px 24px rgba(0,0,0,0.3); }
.pill { display:inline-block; margin-top:18px; font-size:44px; font-weight:800; background:#fffaf0; border-radius:26px; padding:12px 30px;
        box-shadow: 0 8px 0 rgba(150,110,70,0.35); }
.end { position:absolute; left:60px; right:60px; top:300px; text-align:center; z-index:3; }
.end .b { font-size:118px; font-weight:900; letter-spacing:-0.05em; } .end .b span { color:#e2553f; }
.chflag { position:relative; display:inline-block; width:var(--s); height:var(--s); background:#d52b1e; border-radius:calc(var(--s) * 0.08); vertical-align:-6px; margin-right:12px; }
.chflag::before, .chflag::after { content:""; position:absolute; background:#fff; left:50%; top:50%; transform:translate(-50%,-50%); }
.chflag::before { width:62.5%; height:18.75%; } .chflag::after { width:18.75%; height:62.5%; }
.cap { top: 1500px; font-size: 70px; }
.cap .cw { -webkit-text-stroke: 13px #fff6e6; color:#1d1d1f; }
.cap .cw.now { color:#e2553f; }
"""


def body(w):
    T = {k: w.a(p) for k, p in {
        "dettes": "quatre-vingt mille francs", "payer": "Tu dois les payer", "pas": "Pas forcément.", "trois": "Mais tu as trois mois,",
        "geste": "un seul geste", "suisse": "En Suisse,", "biens": "les biens,", "etdettes": "et les dettes.", "sauf": "Sauf si tu répudies",
        "decl": "Une déclaration,", "paix": "la justice de paix.", "delai": "Tu as trois mois depuis", "piege": "Et maintenant, le piège.",
        "voiture": "tu prends sa voiture,", "compte": "tu vides son compte,", "meubles": "tu vends ses meubles,", "plus": "tu ne peux plus répudier.",
        "pourtoi": "Les dettes sont pour toi.", "rien": "Alors pendant trois mois,", "touches": "tu ne touches à rien.",
        "articles": "Articles cinq cent", "enregistre": "Enregistre ça."}.items()}
    T["total"] = w.total
    O = lambda a, b: f'data-at="{a:.3f}" data-out="{b - 0.25:.3f}"'
    META["cover_t"] = round(T["dettes"] + 1.2, 2)
    globals()["PUNCH"] = [T["dettes"] + 0.4, T["piege"], T["plus"]]
    globals()["SFX"] = [{"t": T["dettes"] + 0.2, "k": "impact"}, {"t": T["piege"], "k": "riser"}, {"t": T["plus"], "k": "impact"},
                        {"t": T["sauf"] + 0.5, "k": "whoosh"}, {"t": T["voiture"], "k": "pop"}]
    globals()["SCRIPT"] = SCRIPT_T.replace("__T__", json.dumps(T))
    return f"""
<canvas id="gl" width="1080" height="1920"></canvas>
<div class="brand"><span class="chflag" style="--s:30px"></span>THRAX LEGAL · HÉRITAGE</div>
<div class="tag" data-fx="fade" data-at="0.05" data-out="{T['suisse'] - 0.3:.3f}"><span>📍 Fribourg · situation imaginaire</span></div>

<div class="top" data-fx="stamp" data-rot="-4" {O(T['dettes'], T['pas'])}><div class="clay">−80'000 CHF</div><div class="pill">de dettes en héritage</div></div>
<div class="top" data-fx="pop" {O(T['pas'], T['suisse'])}><div class="clay g">Pas forcément.</div>
  <div class="pill" data-fx="rise" data-at="{T['trois']:.3f}">⏳ 3 mois · 1 geste qui piège</div></div>
<div class="top" data-fx="pop" {O(T['suisse'], T['sauf'])}><div class="clay d" style="font-size:96px">Tu hérites de TOUT</div>
  <div class="pill" data-fx="rise" data-at="{T['biens']:.3f}">💰 les biens <b data-fx="pop" data-at="{T['etdettes']:.3f}" style="color:#e2553f">+ 📩 les dettes</b></div></div>
<div class="top" data-fx="stamp" data-rot="-3" {O(T['sauf'], T['piege'])}><div class="clay g">RÉPUDIER</div>
  <div class="pill" data-fx="rise" data-at="{T['decl']:.3f}">déclaration écrite ou orale</div><br>
  <div class="pill" data-fx="rise" data-at="{T['paix'] - 0.8:.3f}">⚖️ justice de paix</div><br>
  <div class="pill" data-fx="rise" data-at="{T['delai']:.3f}">⏳ 3 mois dès le décès connu</div></div>
<div class="top" data-fx="pop" {O(T['piege'], T['plus'])}><div class="clay">LE PIÈGE</div>
  <div class="pill" data-fx="rise" data-at="{T['voiture']:.3f}">🚗 prendre sa voiture</div><br>
  <div class="pill" data-fx="rise" data-at="{T['compte']:.3f}">🏦 vider son compte</div><br>
  <div class="pill" data-fx="rise" data-at="{T['meubles']:.3f}">🛋️ vendre ses meubles</div></div>
<div class="top" data-fx="stamp" data-rot="-5" {O(T['plus'], T['rien'])}><div class="clay">TROP TARD</div><div class="pill">les dettes sont pour toi</div></div>
<div class="top" data-fx="pop" {O(T['rien'], T['articles'])}><div class="clay g" style="font-size:104px">3 mois :<br>ne touche à rien</div></div>
<div class="end" data-fx="drop" data-at="{T['articles']:.3f}">
  <div class="pill">art. 566 et 571 CC</div>
  <div class="clay d" style="font-size:72px;margin-top:30px" data-fx="rise" data-at="{T['enregistre']:.3f}">🔖 Enregistre ça</div>
  <div class="b" data-fx="zoom" data-at="{T['enregistre'] + 0.9:.3f}">Thrax <span>Legal</span></div>
</div>
"""


SCRIPT_T = r"""
(function(){
  var T = __T__, TH = THREE;
  var cv = document.getElementById('gl');
  var r = new TH.WebGLRenderer({canvas: cv, antialias: true, preserveDrawingBuffer: true, alpha: true});
  r.setSize(1080, 1920, false); r.setClearColor(0x000000, 0); r.outputColorSpace = TH.SRGBColorSpace;
  r.toneMapping = TH.ACESFilmicToneMapping; r.toneMappingExposure = 1.05;
  r.shadowMap.enabled = true; r.shadowMap.type = TH.PCFSoftShadowMap;
  var sc = new TH.Scene();
  var cam = new TH.PerspectiveCamera(50, 1080 / 1920, 0.1, 100);
  sc.add(new TH.HemisphereLight(0xfff4e6, 0xb9d8cc, 1.15));
  var key = new TH.DirectionalLight(0xffffff, 2.1); key.position.set(4, 9, 6); key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048); key.shadow.radius = 6; var sh = key.shadow.camera; sh.left = -7; sh.right = 7; sh.top = 7; sh.bottom = -7; sh.far = 30;
  sc.add(key);
  // Clay texture: fingerprints and dents, used as bump map on every material.
  var bc = document.createElement('canvas'); bc.width = bc.height = 512; var b = bc.getContext('2d');
  b.fillStyle = '#808080'; b.fillRect(0, 0, 512, 512);
  var seed = 7; function rnd(){ seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
  for (var i = 0; i < 260; i++) { var x = rnd() * 512, y = rnd() * 512, rr = 6 + rnd() * 26; var g = b.createRadialGradient(x, y, 0, x, y, rr);
    var v = rnd() < 0.5 ? 'rgba(40,40,40,' : 'rgba(210,210,210,'; g.addColorStop(0, v + '0.35)'); g.addColorStop(1, v + '0)'); b.fillStyle = g; b.beginPath(); b.arc(x, y, rr, 0, 7); b.fill(); }
  b.strokeStyle = 'rgba(60,60,60,0.25)'; b.lineWidth = 2;
  for (var i = 0; i < 18; i++) { var x = rnd() * 512, y = rnd() * 512; for (var k = 0; k < 6; k++) { b.beginPath(); b.ellipse(x, y, 6 + k * 4, 4 + k * 3, rnd(), 0, 7); b.stroke(); } }
  var bump = new TH.CanvasTexture(bc); bump.wrapS = bump.wrapT = TH.RepeatWrapping; bump.repeat.set(2, 2);
  function clay(c){ return new TH.MeshStandardMaterial({color: c, roughness: 0.92, metalness: 0, bumpMap: bump, bumpScale: 0.035}); }
  function add(m, p){ m.castShadow = true; m.receiveShadow = true; (p || sc).add(m); return m; }
  // Table.
  var table = new TH.Mesh(new TH.CylinderGeometry(7.5, 7.5, 0.6, 64), clay(0xf0c98f)); table.position.y = -0.3; table.receiveShadow = true; sc.add(table);
  // The character (you): capsule body, round head, eyes, little arms.
  var me = new TH.Group(); sc.add(me); me.position.set(-1.6, 0, 0.6);
  var bodyM = add(new TH.Mesh(new TH.CapsuleGeometry(0.62, 1.0, 8, 24), clay(0x4f86c6)), me); bodyM.position.y = 1.15;
  var head = add(new TH.Mesh(new TH.SphereGeometry(0.62, 32, 24), clay(0xf3c7a6)), me); head.position.y = 2.55;
  var hair = add(new TH.Mesh(new TH.SphereGeometry(0.64, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45), clay(0x5a3b2a)), me); hair.position.y = 2.6;
  var eyeM = new TH.MeshStandardMaterial({color: 0x15151a, roughness: 0.3});
  var e1 = new TH.Mesh(new TH.SphereGeometry(0.08, 16, 12), eyeM), e2 = e1.clone(); e1.position.set(-0.2, 2.62, 0.56); e2.position.set(0.2, 2.62, 0.56); me.add(e1); me.add(e2);
  var mouth = new TH.Mesh(new TH.TorusGeometry(0.12, 0.03, 8, 16, Math.PI), eyeM); mouth.position.set(0, 2.35, 0.58); me.add(mouth);
  function arm(side){ var g = new TH.Group(); g.position.set(side * 0.62, 1.75, 0); me.add(g);
    var a = add(new TH.Mesh(new TH.CapsuleGeometry(0.16, 0.7, 6, 12), clay(0x4f86c6)), g); a.position.y = -0.45; return g; }
  var aL = arm(-1), aR = arm(1);
  // Debt envelopes (red) and gold coins (assets).
  var envC = document.createElement('canvas'); envC.width = 256; envC.height = 160; var ec = envC.getContext('2d');
  ec.fillStyle = '#e2553f'; ec.fillRect(0, 0, 256, 160); ec.strokeStyle = '#a8321f'; ec.lineWidth = 8; ec.beginPath(); ec.moveTo(0, 0); ec.lineTo(128, 86); ec.lineTo(256, 0); ec.stroke();
  ec.fillStyle = '#fff6e6'; ec.font = '900 64px sans-serif'; ec.textAlign = 'center'; ec.fillText('CHF', 128, 140);
  var envT = new TH.CanvasTexture(envC); envT.colorSpace = TH.SRGBColorSpace;
  var envMat = new TH.MeshStandardMaterial({map: envT, roughness: 0.9, bumpMap: bump, bumpScale: 0.03}), envSide = clay(0xc8402c);
  var envG = new TH.BoxGeometry(0.95, 0.09, 0.62), envs = [];
  for (var i = 0; i < 26; i++) { var m = add(new TH.Mesh(envG, [envSide, envSide, envMat, envSide, envSide, envSide]));
    envs.push({m: m, x: 0.9 + (rnd() - 0.5) * 2.0, z: 0.4 + (rnd() - 0.5) * 1.6, d: i * 0.07, ry: rnd() * 3, h: 0.05 + Math.floor(i / 5) * 0.085}); }
  var coinG = new TH.CylinderGeometry(0.3, 0.3, 0.09, 28), coinM = clay(0xf2bf3a), coins = [];
  for (var i = 0; i < 12; i++) { var m = add(new TH.Mesh(coinG, coinM)); coins.push({m: m, x: -0.2 + (i % 3) * 0.08, z: -1.4 + (i % 2) * 0.06, h: 0.05 + i * 0.095}); }
  // Hourglass (3 months).
  var hg = new TH.Group(); sc.add(hg); hg.position.set(2.6, 0, -0.8);
  var wood = clay(0x9a6a43);
  add(new TH.Mesh(new TH.CylinderGeometry(0.75, 0.75, 0.18, 32), wood), hg).position.y = 0.09;
  add(new TH.Mesh(new TH.CylinderGeometry(0.75, 0.75, 0.18, 32), wood), hg).position.y = 2.6;
  for (var k = 0; k < 3; k++) { var p = add(new TH.Mesh(new TH.CylinderGeometry(0.07, 0.07, 2.4, 10), wood), hg); var a = k * 2.094; p.position.set(Math.cos(a) * 0.62, 1.35, Math.sin(a) * 0.62); }
  var glass = new TH.MeshStandardMaterial({color: 0xe8fbff, roughness: 0.15, transparent: true, opacity: 0.35});
  var g1 = new TH.Mesh(new TH.ConeGeometry(0.55, 1.15, 32, 1, true), glass); g1.position.y = 1.9; g1.rotation.x = Math.PI; hg.add(g1);
  var g2 = new TH.Mesh(new TH.ConeGeometry(0.55, 1.15, 32, 1, true), glass); g2.position.y = 0.78; hg.add(g2);
  var sandM = clay(0xf0d18a);
  var sTop = add(new TH.Mesh(new TH.ConeGeometry(0.45, 0.9, 32), sandM), hg); sTop.rotation.x = Math.PI;
  var sBot = add(new TH.Mesh(new TH.ConeGeometry(0.48, 0.9, 32), sandM), hg);
  var stream = add(new TH.Mesh(new TH.CylinderGeometry(0.03, 0.03, 1.0, 8), sandM), hg); stream.position.y = 1.3;
  // The car (the trap) and the key.
  var car = new TH.Group(); sc.add(car);
  add(new TH.Mesh(new TH.BoxGeometry(2.4, 0.6, 1.2), clay(0xd9534f)), car).position.y = 0.55;
  add(new TH.Mesh(new TH.BoxGeometry(1.3, 0.5, 1.05), clay(0xe97a6f)), car).position.set(-0.1, 1.05, 0);
  var winM = clay(0xbfe6f2); add(new TH.Mesh(new TH.BoxGeometry(1.32, 0.34, 0.9), winM), car).position.set(-0.1, 1.07, 0.09);
  [[-0.8, 0.6], [0.8, 0.6], [-0.8, -0.6], [0.8, -0.6]].forEach(function(p){ var wh = add(new TH.Mesh(new TH.CylinderGeometry(0.3, 0.3, 0.22, 24), clay(0x2b2b33)), car);
    wh.rotation.x = Math.PI / 2; wh.position.set(p[0], 0.3, p[1]); });
  var keyG = new TH.Group(); sc.add(keyG);
  add(new TH.Mesh(new TH.TorusGeometry(0.22, 0.07, 12, 24), clay(0xf2bf3a)), keyG);
  var kb = add(new TH.Mesh(new TH.BoxGeometry(0.6, 0.1, 0.06), clay(0xf2bf3a)), keyG); kb.position.x = 0.5;
  // Padlock (too late).
  var lock = new TH.Group(); sc.add(lock);
  add(new TH.Mesh(new TH.BoxGeometry(1.2, 1.0, 0.5), clay(0x2b2b33)), lock).position.y = 0.5;
  var shk = add(new TH.Mesh(new TH.TorusGeometry(0.4, 0.1, 12, 24, Math.PI), clay(0x9aa3ad)), lock); shk.position.y = 1.0;
  function cl(v){ return Math.max(0, Math.min(1, v)); }
  function eo(u){ u = cl(u); return 1 - Math.pow(1 - u, 3); }
  function ob(u){ u = cl(u); var c1 = 1.7, c3 = c1 + 1; return 1 + c3 * Math.pow(u - 1, 3) + c1 * Math.pow(u - 1, 2); }
  function hash(n){ var s = Math.sin(n * 127.1) * 43758.5453; return s - Math.floor(s); }
  var all = [];
  sc.traverse(function(o){ if (o.isMesh && o !== table) all.push({o: o, s: o.scale.clone(), r: o.rotation.clone()}); });
  R.on(function(t){
    var fr = Math.floor(t * 12);  // stop-motion boil: everything shivers at 12 fps
    all.forEach(function(a, i){ var j = hash(fr * 13.1 + i * 7.7) - 0.5, k = hash(fr * 3.7 + i * 1.3) - 0.5;
      a.o.scale.set(a.s.x * (1 + j * 0.025), a.s.y * (1 + k * 0.025), a.s.z * (1 - j * 0.02)); });
    var ts = Math.floor(t * 12) / 12;  // stepped time for stop-motion feel
    // Envelopes rain on the hook, swept away on "répudier", come back on "trop tard".
    envs.forEach(function(e, i){
      var tin = T.dettes - 0.2 + e.d, u = ts - tin, y;
      var away = ts >= T.sauf + 0.4 && ts < T.plus ? eo((ts - T.sauf - 0.4) / 0.9) : 0;
      var back = ts >= T.plus ? 1 : 0, bu = ts - T.plus - e.d * 0.5;
      if (back) { y = bu < 0 ? 9 : Math.max(e.h + 0.0, 9 - bu * 14); e.m.visible = true; e.m.position.set(-1.6 + (e.x - 0.9) * 0.9, y + 3.2 * 0, -0.1 + (e.z - 0.4)); }
      else { e.m.visible = u > 0 && away < 1; y = Math.max(e.h, 8 - u * 13); e.m.position.set(e.x + away * 7, y - away * 2, e.z); }
      e.m.rotation.set(y > e.h + 0.01 ? u * 3 : 0, e.ry, y > e.h + 0.01 ? u * 2 : 0);
    });
    // Coins appear with "les biens", slide to you, then vanish with the trap.
    var cOn = ts >= T.biens - 0.1 && ts < T.sauf + 0.4;
    coins.forEach(function(c, i){ c.m.visible = cOn; var u = eo((ts - T.biens + 0.1 - i * 0.04) / 0.4); c.m.position.set(c.x + 2.2, 4 - u * (4 - c.h), c.z); });
    // Hourglass: visible during the deadline parts; sand flows from "trois mois" to the end.
    var hOn = (ts >= T.trois && ts < T.suisse) || (ts >= T.delai && ts < T.piege) || ts >= T.rien;
    hg.visible = hOn; var flow = cl((t - T.trois) / (T.total - T.trois));
    sTop.scale.setScalar(Math.max(0.05, 1 - flow)); sTop.position.y = 1.62 + 0.25 * flow; sBot.scale.setScalar(Math.max(0.05, flow)); sBot.position.y = 0.18 + 0.4 * flow;
    var hs = hOn ? ob((ts - (ts >= T.rien ? T.rien : ts >= T.delai ? T.delai : T.trois)) / 0.4) : 0; hg.scale.setScalar(Math.max(0.001, hs));
    // Car and key: the trap.
    var cIn = ts >= T.piege && ts < T.plus + 0.6; car.visible = cIn;
    var cu = eo((ts - T.piege) / 0.6); car.position.set(6 - cu * 4.0, 0, -0.6); car.rotation.y = -0.4;
    keyG.visible = ts >= T.voiture && ts < T.plus;
    var grab = eo((ts - T.voiture - 0.3) / 0.6); keyG.position.set(1.4 - grab * 2.2, 2.2 - grab * 0.4 + Math.sin(t * 3) * 0.08, 0.6); keyG.rotation.set(0.4, t * 1.5, 0);
    lock.visible = ts >= T.plus && ts < T.rien; var ls = ob((ts - T.plus) / 0.35); lock.scale.setScalar(Math.max(0.001, ls)); lock.position.set(0.6, 0.05, 1.2); lock.rotation.y = -0.3;
    // Character acting.
    var reach = ts >= T.voiture && ts < T.plus ? eo((ts - T.voiture) / 0.5) : 0;
    var push = ts >= T.sauf && ts < T.piege ? Math.sin(cl((ts - T.sauf) / 1.2) * Math.PI) : 0;
    var hands = ts >= T.touches - 0.2 ? eo((ts - T.touches + 0.2) / 0.4) : 0;
    aR.rotation.z = 0.25 + reach * 1.2 + push * 1.3 + hands * 2.6; aL.rotation.z = -0.25 - push * 0.4 - hands * 2.6;
    aR.rotation.x = -push * 0.8 - reach * 0.6;
    var shock = (ts >= T.dettes + 0.3 && ts < T.pas) || (ts >= T.plus && ts < T.rien);
    mouth.rotation.z = shock ? 0 : Math.PI; mouth.position.y = shock ? 2.3 : 2.35;
    me.position.x = -1.6 + reach * 1.0; me.rotation.y = 0.25 + reach * 0.5 + Math.sin(ts * 2) * 0.05;
    head.position.y = 2.55 + (hash(fr) - 0.5) * 0.02;
    // Camera: slow orbit, pushes in on the trap.
    var push2 = ts >= T.piege && ts < T.rien ? eo((ts - T.piege) / 1.5) : 0;
    var ang = 0.18 + Math.sin(t * 0.25) * 0.12;
    cam.position.set(Math.sin(ang) * (14.5 - push2 * 3), 5.6 - push2 * 0.8, Math.cos(ang) * (14.5 - push2 * 3));
    cam.lookAt(0.4, 1.4, 0); cam.setViewOffset(1080, 1920, 0, -60, 1080, 1920);
    r.render(sc, cam);
  });
})();
"""
