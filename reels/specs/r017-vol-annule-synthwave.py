"""Reel 017 — Vol annulé au départ de Genève : indemnisation en argent (règlement (CE) 261/2004, applicable en Suisse
via l'accord bilatéral sur le transport aérien). Style : 3D néon « synthwave » (grille au sol qui défile, soleil rayé,
avion filaire néon, pièces en euros), panneau des départs. Voix Henri (jamais utilisée)."""
import json

VOICE = "fr-FR-HenriNeural"
RATE = "+12%"
USE_THREE = True

VO = ("Ton vol de Genève à Barcelone est annulé la veille. La compagnie t'offre un bon de cinquante francs. Tu acceptes ? "
      "Attends. Si ton vol est annulé moins de quatorze jours avant le départ, tu peux avoir droit à une indemnisation en argent. "
      "Deux cent cinquante euros pour un vol de moins de mille cinq cents kilomètres, et jusqu'à six cents euros pour un long-courrier. "
      "En plus du remboursement ou d'un autre vol. "
      "Le bon, tu peux le refuser : l'indemnisation se paie en argent, sauf si tu acceptes un bon par écrit. "
      "Seule exception : des circonstances extraordinaires, comme une tempête. "
      "Et oui, cette règle européenne s'applique aussi au départ de la Suisse. "
      "Règlement européen 261. Enregistre ça avant tes vacances. Thrax Legal, lien en bio.")

META = {
    "id": "r017-vol-annule-synthwave",
    "music": "drive",
    "caption": ("✈️ Ton vol Genève–Barcelone annulé la veille, et on t'offre un bon de 50 francs ? Attends avant d'accepter.\n\n"
                "Le règlement (CE) 261/2004 s'applique aussi aux vols au départ de la Suisse (accord bilatéral Suisse–UE sur le transport aérien). "
                "Si ton vol est annulé moins de 14 jours avant le départ, tu peux avoir droit à une indemnisation : 250 € jusqu'à 1500 km, "
                "400 € entre 1500 et 3500 km (et pour les vols intra-UE de plus de 1500 km), 600 € au-delà, en plus du remboursement "
                "ou d'un réacheminement (art. 5 et 7). Elle peut être réduite si on te propose un autre vol qui arrive peu après l'horaire prévu.\n\n"
                "Elle se paie en argent ; un bon d'achat seulement si tu l'acceptes par écrit (art. 7 al. 3). "
                "Pas d'indemnisation en cas de circonstances extraordinaires (météo, sûreté…).\n\n"
                "🔖 Enregistre avant tes vacances. Une question ? Thrax Legal, lien en bio.\n\n"
                "#vol #avion #volannule #vacances #genève #aeroport #suisse #suisseromande #voyage #lesaviezvous"),
    "yt_title": "Vol annulé au départ de Genève : jusqu'à 600 € d'indemnisation #shorts",
    "tiktok_title": "Vol annulé depuis Genève : refuse le bon de 50 francs ✈️",
    "tags": ["vol annulé", "règlement 261/2004", "indemnisation", "aéroport de Genève", "voyage"],
    "genome": {"style": "3d-neon-synthwave", "palette": "violet/magenta/cyan/orange", "hook": "ville + offre piège (bon 50 CHF)",
               "format": "dilemme + montant + exception", "topic": "voyage/vol-annule", "mascot": "avion filaire 3D",
               "voice": "fr-FR-HenriNeural", "captions": "blanc-contour-magenta", "music": "drive", "length": "~33s"},
    "cover_t": 1.4,
}

CSS = """
#root { background: linear-gradient(#0b0221 0%, #2b0a4a 38%, #7a1a6e 58%, #ff7a3c 72%, #12041f 72.2%, #05010d 100%); color:#fff; }
#gl { position:absolute; left:0; top:0; width:1080px; height:1920px; }
#bloom { position:absolute; left:0; top:0; width:1080px; height:1920px; filter: blur(22px) brightness(1.5) saturate(1.4);
         mix-blend-mode: screen; opacity:0.75; pointer-events:none; }
.scan { position:absolute; inset:0; background: repeating-linear-gradient(transparent 0 3px, rgba(0,0,0,0.18) 3px 4px); pointer-events:none; }
.top { position:absolute; left:50px; right:50px; display:flex; flex-direction:column; align-items:center; text-align:center; gap:16px; }
.board { background:#0a0a12; border:4px solid #2e2e48; border-radius:24px; padding:22px 26px; box-shadow:0 0 60px rgba(255,60,200,0.35); }
.board .hd { font-size:30px; font-weight:800; color:#ffd166; letter-spacing:0.18em; text-align:left; margin-bottom:12px; }
.flap { display:flex; gap:18px; font-family:'Schibsted Grotesk'; font-size:54px; font-weight:900; }
.flap span { background:#1b1b2b; border-radius:10px; padding:6px 14px; color:#fff; box-shadow: inset 0 -4px 0 rgba(0,0,0,0.5); }
.flap .red { color:#ff3b6b; background:#2a0b15; }
.neon { font-size:110px; font-weight:900; letter-spacing:-0.04em; line-height:0.95; color:#fff;
        text-shadow: 0 0 18px #ff2bd6, 0 0 42px #ff2bd6, 0 0 80px #7a2bff; }
.neon.c { text-shadow: 0 0 18px #2bf0ff, 0 0 42px #2bf0ff, 0 0 80px #2b6bff; }
.mid { font-size:62px; font-weight:900; line-height:1.08; letter-spacing:-0.02em; }
.sm { font-size:40px; font-weight:700; color:rgba(255,255,255,0.82); line-height:1.2; }
.voucher { background:linear-gradient(135deg,#fff7d6,#ffd98a); color:#3a2200; border-radius:26px; padding:24px 40px; font-size:56px;
           font-weight:900; border:4px dashed #b07a10; transform: rotate(-3deg); }
.tiers { display:flex; flex-direction:column; gap:14px; }
.tier { display:flex; justify-content:space-between; gap:40px; font-size:52px; font-weight:800; background:rgba(10,6,30,0.72);
        border:2px solid rgba(43,240,255,0.55); border-radius:22px; padding:14px 30px; box-shadow:0 0 30px rgba(43,240,255,0.25); }
.tier b { color:#2bf0ff; }
.chip { display:inline-block; background:#fff; color:#12041f; font-size:58px; font-weight:900; border-radius:20px; padding:10px 28px; }
.brand { font-size:120px; font-weight:900; letter-spacing:-0.05em; }
.brand span { color:#ff2bd6; }
.cap { top: 1540px; font-size: 74px; }
.cap .cw { -webkit-text-stroke: 14px #12041f; }
.cap .cw.now { color:#2bf0ff; }
"""


def body(w):
    T = {k: w.a(p) for k, p in {
        "annule": "est annulé", "bon": "un bon de", "acceptes": "Tu acceptes", "attends": "Attends.",
        "quatorze": "moins de quatorze jours", "argent": "en argent.", "deux": "Deux cent cinquante", "six": "jusqu'à six cents",
        "plus": "En plus du", "refuser": "tu peux le refuser", "exception": "Seule exception", "tempete": "une tempête.",
        "suisse": "Et oui,", "reglement": "Règlement", "enregistre": "Enregistre", "thrax": "Thrax Legal,"}.items()}
    T["total"] = w.total
    globals()["PUNCH"] = [T["annule"], T["attends"], T["deux"], T["refuser"]]
    globals()["SCRIPT"] = SCRIPT_T.replace("__T__", json.dumps(T))
    O = lambda a, b: f'data-at="{a:.3f}" data-out="{b - 0.2:.3f}"'
    return f"""
<canvas id="gl" width="1080" height="1920"></canvas>
<canvas id="bloom" width="540" height="960"></canvas>
<div class="scan"></div>

<div class="top" style="top:120px" data-fx="drop" {O(0.05, T['acceptes'])}>
  <div class="board">
    <div class="hd">DÉPARTS · GENÈVE</div>
    <div class="flap"><span>07:10</span><span>BCN</span><span data-fx="type" data-at="{T['annule']:.3f}" data-cps="18" class="red">ANNULÉ</span></div>
  </div>
</div>
<div class="top" style="top:430px" data-fx="pop" {O(T['bon'], T['attends'])}><div class="voucher">🎟️ BON 50 CHF</div>
  <div class="mid" data-fx="rise" data-at="{T['acceptes']:.3f}">Tu acceptes ?</div></div>
<div class="top" style="top:150px" data-fx="stamp" data-rot="-4" {O(T['attends'], T['deux'])}>
  <div class="neon">ATTENDS.</div>
  <div class="mid" data-fx="rise" data-at="{T['quatorze']:.3f}">Annulé &lt; 14 jours avant ?</div>
  <div class="mid" data-fx="rise" data-at="{T['argent'] - 0.6:.3f}">→ indemnisation <span style="color:#2bf0ff">en argent</span></div>
</div>
<div class="top" style="top:150px" data-fx="drop" {O(T['deux'], T['refuser'])}>
  <div class="tiers">
    <div class="tier" data-fx="rise" data-at="{T['deux']:.3f}"><span>≤ 1500 km</span><b>250 €</b></div>
    <div class="tier" data-fx="rise" data-at="{T['deux'] + 1.2:.3f}"><span>1500 – 3500 km</span><b>400 €</b></div>
    <div class="tier" data-fx="rise" data-at="{T['six']:.3f}"><span>long-courrier</span><b>600 €</b></div>
  </div>
  <div class="sm" data-fx="rise" data-at="{T['plus']:.3f}">+ remboursement ou autre vol</div>
</div>
<div class="top" style="top:170px" data-fx="drop" {O(T['refuser'], T['suisse'])}>
  <div class="voucher" style="opacity:0.55">🎟️ BON 50 CHF</div>
  <div class="neon" style="font-size:96px" data-fx="stamp" data-rot="-6" data-at="{T['refuser'] + 0.3:.3f}">REFUSÉ</div>
  <div class="sm" data-fx="rise" data-at="{T['exception']:.3f}">sauf circonstances extraordinaires 🌩️</div>
</div>
<div class="top" style="top:200px" data-fx="drop" {O(T['suisse'], T['enregistre'])}>
  <div class="mid">🇨🇭 Valable aussi<br>au départ de la Suisse</div>
  <div class="chip" data-fx="stamp" data-rot="-3" data-at="{T['reglement']:.3f}">Règlement (CE) 261/2004</div>
</div>
<div class="top" style="top:190px" data-fx="drop" data-at="{T['enregistre']:.3f}">
  <div class="mid">🔖 Enregistre avant tes vacances</div>
  <div class="brand" data-fx="zoom" data-at="{T['thrax']:.3f}">Thrax <span>Legal</span></div>
</div>
"""


SCRIPT_T = r"""
(function(){
  var T = __T__, TH = THREE;
  var cv = document.getElementById('gl'), bl = document.getElementById('bloom'), bx = bl.getContext('2d');
  var r = new TH.WebGLRenderer({canvas: cv, antialias: true, preserveDrawingBuffer: true, alpha: true});
  r.setSize(1080, 1920, false); r.setClearColor(0x000000, 0); r.toneMapping = TH.ACESFilmicToneMapping; r.outputColorSpace = TH.SRGBColorSpace;
  var sc = new TH.Scene(); sc.fog = new TH.Fog(0x12041f, 14, 60);
  var cam = new TH.PerspectiveCamera(50, 1080 / 1920, 0.1, 200);
  // Neon grid floor (two sets of lines so it can scroll seamlessly).
  var grid = new TH.Group(); sc.add(grid);
  var gm = new TH.LineBasicMaterial({color: 0xff2bd6, transparent: true, opacity: 0.9});
  var pts = [];
  for (var x = -30; x <= 30; x += 2) { pts.push(x, 0, -80, x, 0, 10); }
  for (var z = -80; z <= 10; z += 2) { pts.push(-30, 0, z, 30, 0, z); }
  var gg = new TH.BufferGeometry(); gg.setAttribute('position', new TH.Float32BufferAttribute(pts, 3));
  grid.add(new TH.LineSegments(gg, gm));
  var floor = new TH.Mesh(new TH.PlaneGeometry(80, 120), new TH.MeshBasicMaterial({color: 0x0b0216}));
  floor.rotation.x = -Math.PI / 2; floor.position.set(0, -0.02, -30); sc.add(floor);
  // Striped retro sun.
  var sc2 = document.createElement('canvas'); sc2.width = sc2.height = 512; var s = sc2.getContext('2d');
  var sg = s.createLinearGradient(0, 0, 0, 512); sg.addColorStop(0, '#ffe66b'); sg.addColorStop(0.55, '#ff7a3c'); sg.addColorStop(1, '#ff2bd6');
  s.fillStyle = sg; s.beginPath(); s.arc(256, 256, 250, 0, Math.PI * 2); s.fill();
  s.globalCompositeOperation = 'destination-out';
  for (var i = 0; i < 7; i++) { var y = 300 + i * 30; s.fillRect(0, y, 512, 6 + i * 2.2); }
  var sun = new TH.Mesh(new TH.PlaneGeometry(26, 26), new TH.MeshBasicMaterial({map: new TH.CanvasTexture(sc2), transparent: true, fog: false}));
  sun.position.set(0, 6, -70); sc.add(sun);
  // Wireframe neon plane: fuselage, wings, tail.
  var plane = new TH.Group(); sc.add(plane);
  function neonMesh(geo, c){ var g = new TH.Group();
    g.add(new TH.Mesh(geo, new TH.MeshBasicMaterial({color: 0x0a0618})));
    g.add(new TH.LineSegments(new TH.EdgesGeometry(geo, 20), new TH.LineBasicMaterial({color: c}))); return g; }
  var fus = neonMesh(new TH.CylinderGeometry(0.42, 0.3, 5.2, 10), 0x2bf0ff); fus.rotation.x = Math.PI / 2; plane.add(fus);
  var nose = neonMesh(new TH.ConeGeometry(0.42, 1.1, 10), 0x2bf0ff); nose.rotation.x = -Math.PI / 2; nose.position.z = -3.15; plane.add(nose);
  var wing = neonMesh(new TH.BoxGeometry(6.4, 0.08, 1.2), 0xff2bd6); wing.position.z = -0.2; plane.add(wing);
  var tailw = neonMesh(new TH.BoxGeometry(2.2, 0.06, 0.6), 0xff2bd6); tailw.position.z = 2.3; plane.add(tailw);
  var fin = neonMesh(new TH.BoxGeometry(0.06, 1.1, 0.8), 0xff2bd6); fin.position.set(0, 0.55, 2.3); plane.add(fin);
  // Red X when cancelled.
  var xg = new TH.Group(); sc.add(xg);
  [1, -1].forEach(function(sg){ var b = new TH.Mesh(new TH.BoxGeometry(5.5, 0.5, 0.2), new TH.MeshBasicMaterial({color: 0xff3b6b})); b.rotation.z = sg * Math.PI / 4; xg.add(b); });
  // Euro coins.
  var ec = document.createElement('canvas'); ec.width = ec.height = 256; var e = ec.getContext('2d');
  var eg = e.createRadialGradient(100, 90, 10, 128, 128, 140); eg.addColorStop(0, '#fff6c2'); eg.addColorStop(0.6, '#f2c45a'); eg.addColorStop(1, '#a8761c');
  e.fillStyle = eg; e.fillRect(0, 0, 256, 256); e.fillStyle = '#5a3a06'; e.font = '900 170px sans-serif'; e.textAlign = 'center'; e.textBaseline = 'middle'; e.fillText('€', 128, 136);
  var et = new TH.CanvasTexture(ec); et.colorSpace = TH.SRGBColorSpace;
  var cg = new TH.CylinderGeometry(0.55, 0.55, 0.1, 40), sideM = new TH.MeshBasicMaterial({color: 0xd9a53a}), faceM = new TH.MeshBasicMaterial({map: et});
  var coins = [];
  for (var i = 0; i < 28; i++) { var c = new TH.Mesh(cg, [sideM, faceM, faceM]); sc.add(c);
    coins.push({m: c, x: ((i * 37) % 100) / 100 * 9 - 4.5, z: ((i * 61) % 100) / 100 * 7 - 16, d: (i % 9) * 0.12, sp: 2 + i % 5}); }
  function cl(v){ return Math.max(0, Math.min(1, v)); }
  function eo(u){ u = cl(u); return 1 - Math.pow(1 - u, 3); }
  R.on(function(t){
    var speed = t < T.annule ? 9 : (t < T.attends ? 9 * (1 - eo((t - T.annule) / 0.8)) : 4);
    grid.position.z = (t * speed) % 2;
    // Plane: cruising, then stalls and drops on "annulé", comes back for the money.
    var fall = t >= T.annule && t < T.attends ? eo((t - T.annule) / 1.0) : 0;
    var back = t >= T.attends ? eo((t - T.attends) / 1.2) : 0;
    plane.position.set(Math.sin(t * 0.8) * 0.6, 3.2 - fall * 3.6 + back * 0.4 * (1 - fall), -8 - fall * 2);
    plane.rotation.set(-0.08 + fall * 0.9, Math.sin(t * 0.6) * 0.25, Math.sin(t * 1.4) * 0.12 + fall * 0.8);
    var xs = t >= T.annule + 0.2 && t < T.attends ? eo((t - T.annule - 0.2) / 0.25) : 0;
    xg.scale.setScalar(Math.max(0.001, xs)); xg.position.set(0, 2.4, -7); xg.rotation.y = Math.sin(t * 3) * 0.1;
    // Coins rain on the amounts.
    coins.forEach(function(c, i){ var t0 = T.deux - 0.3 + c.d; var u = t - t0; var on = u > 0 && t < T.refuser;
      c.m.visible = on; if (!on) return;
      c.m.position.set(c.x, Math.max(0.06, 9 - u * 7.5), c.z); var land = 9 - u * 7.5 <= 0.06;
      c.m.rotation.set(land ? 0 : u * c.sp, u * 1.3, land ? 0 : u * 2); });
    sun.material.opacity = 0.9 + 0.1 * Math.sin(t * 2);
    var push = eo(t / 4);
    cam.position.set(Math.sin(t * 0.3) * 0.8, 2.6 + Math.sin(t * 0.5) * 0.15, 6 - push * 1.2); cam.lookAt(0, 2.2, -12);
    r.render(sc, cam);
    bx.clearRect(0, 0, 540, 960); bx.drawImage(cv, 0, 0, 540, 960);
  });
})();
"""
PUNCH = []
SFX = []
TAIL = 1.8
CAP_MAX = 3
