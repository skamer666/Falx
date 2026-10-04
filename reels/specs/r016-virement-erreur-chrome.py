"""Reel 016 — 3000 francs reçus par erreur : tu les gardes ? (art. 62 CO, art. 141bis CP).
Style : 3D « verre et chrome premium » (MeshPhysicalMaterial, carte d'environnement studio, tone mapping filmique, halo
lumineux), téléphone en verre noir, pièces d'or à croix suisse, menottes chromées. Voix Vivienne. Format dilemme (notre meilleur hook)."""
import json

VOICE = "fr-FR-VivienneMultilingualNeural"
RATE = "+10%"
USE_THREE = True

VO = ("Trois mille francs tombent sur ton compte, à Genève. Par erreur. Tu les gardes ? "
      "Tu te dis : c'est la banque qui s'est trompée, pas moi. "
      "Sauf qu'en Suisse, l'argent reçu sans raison doit être rendu. "
      "Et voilà le piège : si tu le dépenses en sachant qu'il n'est pas à toi, ce n'est plus juste une dette. "
      "Ça peut devenir une infraction pénale. Jusqu'à trois ans de prison, ou une peine pécuniaire. "
      "Le bon réflexe : tu ne touches à rien, et tu préviens ta banque, par écrit. "
      "Article 62 du Code des obligations, et article 141 bis du Code pénal. "
      "Enregistre cette vidéo. Thrax Legal, lien en bio.")

META = {
    "id": "r016-virement-erreur-chrome",
    "music": "tension",
    "caption": ("💸 3000 francs arrivent sur ton compte à Genève, par erreur. Tu les gardes ?\n\n"
                "En Suisse, celui qui s'enrichit sans cause légitime aux dépens d'autrui doit restituer (art. 62 CO) : "
                "la banque ou l'expéditeur peut te réclamer le montant.\n\n"
                "Et si tu dépenses cet argent en sachant qu'il n'est pas à toi, tu risques une poursuite pénale pour "
                "utilisation sans droit de valeurs patrimoniales (art. 141bis CP) : jusqu'à 3 ans de peine privative de liberté "
                "ou une peine pécuniaire. L'infraction est poursuivie sur plainte et suppose l'intention de s'enrichir.\n\n"
                "✅ Le bon réflexe : ne touche à rien et préviens ta banque par écrit (garde une trace).\n\n"
                "🔖 Enregistre cette vidéo. Une question ? Thrax Legal, lien en bio.\n\n"
                "#argent #banque #virement #erreur #genève #lausanne #suisse #suisseromande #droitsuisse #lesaviezvous"),
    "yt_title": "3000 CHF reçus par erreur sur ton compte : tu les gardes ? (Suisse) #shorts",
    "tiktok_title": "3000 francs reçus par erreur sur ton compte : tu les gardes ? (Suisse)",
    "tags": ["virement par erreur", "art. 141bis CP", "art. 62 CO", "banque", "Genève"],
    "genome": {"style": "3d-verre-chrome-premium", "palette": "noir/or/rouge/vert", "hook": "dilemme argent + ville",
               "format": "dilemme + piege + bon reflexe", "topic": "argent/banque", "mascot": "objets 3D (telephone, pieces, menottes)",
               "voice": "fr-FR-VivienneMultilingualNeural", "captions": "blanc-contour-or", "music": "tension", "length": "~38s"},
    "cover_t": 1.6,
}

CSS = """
#root { background: radial-gradient(ellipse at 50% 42%, #1b2030 0%, #0a0c12 55%, #030406 100%); color:#fff; }
#gl { position:absolute; left:0; top:0; width:1080px; height:1920px; }
#bloom { position:absolute; left:0; top:0; width:1080px; height:1920px; filter: blur(26px) brightness(1.35) saturate(1.25);
         mix-blend-mode: screen; opacity:0.6; pointer-events:none; }
.vig { position:absolute; inset:0; background: radial-gradient(ellipse at 50% 45%, transparent 48%, rgba(0,0,0,0.72) 100%); pointer-events:none; }
.top { position:absolute; left:60px; right:60px; display:flex; flex-direction:column; align-items:center; text-align:center; gap:16px; }
.pill span { display:inline-block; background:rgba(255,255,255,0.1); border:2px solid rgba(255,255,255,0.25); color:#fff; font-size:40px;
             font-weight:800; border-radius:999px; padding:12px 30px; backdrop-filter: blur(10px); }
.glass { background:rgba(18,22,32,0.62); border:2px solid rgba(255,255,255,0.16); border-radius:44px; padding:30px 42px;
         backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); box-shadow:0 30px 80px rgba(0,0,0,0.5); }
.big { font-size:118px; font-weight:900; letter-spacing:-0.05em; line-height:0.95; }
.mid { font-size:64px; font-weight:900; letter-spacing:-0.03em; line-height:1.08; }
.sm { font-size:42px; font-weight:700; color:rgba(255,255,255,0.78); line-height:1.2; }
.gold { color:#ffd166; } .red { color:#ff4d5e; } .grn { color:#3ddc97; }
.choice { display:flex; gap:28px; justify-content:center; }
.choice div { font-size:58px; font-weight:900; border-radius:28px; padding:22px 36px; }
.keep { background:linear-gradient(#ffd166,#e09f1f); color:#1a1205; box-shadow:0 0 50px rgba(255,190,60,0.55); }
.give { background:rgba(255,255,255,0.12); border:3px solid rgba(255,255,255,0.5); }
.row { display:flex; gap:22px; align-items:center; font-size:56px; font-weight:800; text-align:left; }
.row b { flex:none; width:76px; height:76px; border-radius:50%; background:#3ddc97; color:#04140c; display:flex; align-items:center; justify-content:center; font-size:44px; }
.chip { display:inline-block; background:linear-gradient(#fff,#d9dde6); color:#0a0c12; font-size:66px; font-weight:900; border-radius:22px; padding:10px 30px; }
.brand { font-size:124px; font-weight:900; letter-spacing:-0.05em; }
.brand span { color:#ffd166; }
.cap { top: 1520px; font-size: 76px; }
.cap .cw { -webkit-text-stroke: 14px #07080c; }
.cap .cw.now { color:#ffd166; }
"""


def body(w):
    T = {k: w.a(p) for k, p in {
        "tombent": "tombent", "erreur": "Par erreur.", "gardes": "Tu les gardes", "tedis": "Tu te dis",
        "sauf": "Sauf qu'en Suisse,", "rendu": "doit être rendu.", "piege": "Et voilà le piège", "depenses": "si tu le dépenses",
        "dette": "ce n'est plus juste", "infraction": "Ça peut devenir", "trois": "Jusqu'à trois ans", "reflexe": "Le bon réflexe",
        "touches": "tu ne touches", "previens": "et tu préviens", "art": "Article", "enregistre": "Enregistre", "thrax": "Thrax Legal,"}.items()}
    T["total"] = w.total
    globals()["PUNCH"] = [T["erreur"], T["piege"], T["trois"]]
    globals()["SCRIPT"] = SCRIPT_T.replace("__T__", json.dumps(T))
    O = lambda a, b: f'data-at="{a:.3f}" data-out="{b - 0.2:.3f}"'
    return f"""
<canvas id="gl" width="1080" height="1920"></canvas>
<canvas id="bloom" width="540" height="960"></canvas>
<div class="vig"></div>

<div class="top pill" style="top:110px" data-fx="pop" {O(0.05, T['gardes'])}><span>📍 Genève · virement reçu</span></div>
<div class="top" style="top:210px" data-fx="stamp" data-rot="-4" {O(T['erreur'], T['gardes'])}><div class="big red">PAR ERREUR</div></div>
<div class="top" style="top:170px" data-fx="drop" {O(T['gardes'], T['sauf'])}>
  <div class="mid">Tu les gardes ?</div>
  <div class="choice"><div class="keep" data-fx="pop" data-at="{T['gardes'] + 0.25:.3f}">GARDER 🤑</div><div class="give" data-fx="pop" data-at="{T['gardes'] + 0.4:.3f}">RENDRE 🙄</div></div>
  <div class="sm" data-fx="rise" data-at="{T['tedis']:.3f}">« c'est la banque qui s'est trompée… »</div>
</div>
<div class="top glass" style="top:170px" data-fx="drop" {O(T['sauf'], T['piege'])}>
  <div class="sm">🇨🇭 En Suisse</div>
  <div class="mid">Argent reçu sans raison<br>= <span class="gold">à rendre</span></div>
</div>
<div class="top" style="top:150px" data-fx="stamp" data-rot="-5" {O(T['piege'], T['infraction'])}><div class="big red">LE PIÈGE ⚠️</div>
  <div class="mid" data-fx="rise" data-at="{T['depenses']:.3f}">Tu le dépenses<br>en le sachant ?</div></div>
<div class="top glass" style="top:150px" data-fx="drop" {O(T['infraction'], T['reflexe'])}>
  <div class="mid red">Infraction pénale</div>
  <div class="big" data-fx="stamp" data-rot="-3" data-at="{T['trois']:.3f}">jusqu'à <span class="red">3 ans</span></div>
  <div class="sm" data-fx="rise" data-at="{T['trois'] + 0.6:.3f}">de prison, ou une peine pécuniaire</div>
</div>
<div class="top glass" style="top:150px" data-fx="drop" {O(T['reflexe'], T['art'])}>
  <div class="mid grn">✅ Le bon réflexe</div>
  <div class="row" data-fx="rise" data-at="{T['touches']:.3f}"><b>1</b>Tu ne touches à rien ✋</div>
  <div class="row" data-fx="rise" data-at="{T['previens']:.3f}"><b>2</b>Tu préviens ta banque par écrit ✍️</div>
</div>
<div class="top" style="top:190px" data-fx="stamp" data-rot="-3" {O(T['art'], T['enregistre'])}>
  <div class="chip">Art. 62 CO</div><div class="chip" data-fx="rise" data-at="{T['art'] + 1.6:.3f}">Art. 141bis CP</div></div>
<div class="top" style="top:170px" data-fx="drop" data-at="{T['enregistre']:.3f}">
  <div class="mid">🔖 Enregistre cette vidéo</div>
  <div class="brand" data-fx="zoom" data-at="{T['thrax']:.3f}">Thrax <span>Legal</span></div>
</div>
"""


SCRIPT_T = r"""
(function(){
  var T = __T__, TH = THREE;
  var cv = document.getElementById('gl'), bl = document.getElementById('bloom'), bx = bl.getContext('2d');
  var r = new TH.WebGLRenderer({canvas: cv, antialias: true, preserveDrawingBuffer: true, alpha: true});
  r.setSize(1080, 1920, false); r.setClearColor(0x000000, 0);
  r.toneMapping = TH.ACESFilmicToneMapping; r.toneMappingExposure = 1.05; r.outputColorSpace = TH.SRGBColorSpace;
  r.shadowMap.enabled = true; r.shadowMap.type = TH.PCFSoftShadowMap;
  var sc = new TH.Scene();
  sc.fog = new TH.Fog(0x07080c, 16, 34);
  var cam = new TH.PerspectiveCamera(28, 1080 / 1920, 0.1, 100);

  // Studio environment: dark room with soft-box panels, prefiltered for glossy reflections.
  var env = new TH.Scene();
  env.add(new TH.Mesh(new TH.BoxGeometry(30, 30, 30), new TH.MeshBasicMaterial({color: 0x050608, side: TH.BackSide})));
  function panel(w, h, c, x, y, z, ry, rx){ var m = new TH.Mesh(new TH.PlaneGeometry(w, h), new TH.MeshBasicMaterial({color: c, side: TH.DoubleSide}));
    m.position.set(x, y, z); m.rotation.set(rx || 0, ry || 0, 0); env.add(m); }
  panel(14, 4, 0xffffff, 0, 13, 0, 0, Math.PI / 2); panel(4, 12, 0xfff1d6, -13, 3, 2, Math.PI / 2); panel(4, 12, 0xd6e6ff, 13, 3, -2, -Math.PI / 2);
  panel(16, 2, 0xffffff, 0, 4, -13, 0); panel(2, 8, 0xffd9a0, 6, 2, 13, Math.PI);
  var pm = new TH.PMREMGenerator(r); sc.environment = pm.fromScene(env, 0.035).texture;

  var key = new TH.SpotLight(0xffffff, 260, 40, 0.5, 0.6, 1.6); key.position.set(4, 11, 7); key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0004; sc.add(key); sc.add(key.target);
  var rim = new TH.PointLight(0xffb14a, 60, 20, 2); rim.position.set(-4, 3, -4); sc.add(rim);
  var fill = new TH.HemisphereLight(0x9fb6ff, 0x0a0b10, 0.35); sc.add(fill);

  // Glossy dark floor.
  var floor = new TH.Mesh(new TH.CircleGeometry(30, 64), new TH.MeshStandardMaterial({color: 0x040507, metalness: 0, roughness: 0.6, envMapIntensity: 0.04}));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; sc.add(floor);

  // Phone: black glass slab with a live screen texture.
  function rrect(w, h, rad){ var s = new TH.Shape(), x = -w / 2, y = -h / 2;
    s.moveTo(x + rad, y); s.lineTo(x + w - rad, y); s.quadraticCurveTo(x + w, y, x + w, y + rad); s.lineTo(x + w, y + h - rad);
    s.quadraticCurveTo(x + w, y + h, x + w - rad, y + h); s.lineTo(x + rad, y + h); s.quadraticCurveTo(x, y + h, x, y + h - rad);
    s.lineTo(x, y + rad); s.quadraticCurveTo(x, y, x + rad, y); return s; }
  var phone = new TH.Group(); sc.add(phone); phone.scale.setScalar(0.7);
  var body = new TH.Mesh(new TH.ExtrudeGeometry(rrect(2.3, 4.7, 0.42), {depth: 0.16, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 6, curveSegments: 24}),
    new TH.MeshPhysicalMaterial({color: 0x0c0d10, metalness: 0.4, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.05}));
  body.position.z = -0.08; body.castShadow = true; phone.add(body);
  var frame = new TH.Mesh(new TH.ExtrudeGeometry(rrect(2.38, 4.78, 0.45), {depth: 0.12, bevelEnabled: false, curveSegments: 24}),
    new TH.MeshPhysicalMaterial({color: 0xb9bcc4, metalness: 1, roughness: 0.18})); frame.position.z = -0.06; phone.add(frame);
  var scr = document.createElement('canvas'); scr.width = 460; scr.height = 940; var sx = scr.getContext('2d');
  var stex = new TH.CanvasTexture(scr); stex.colorSpace = TH.SRGBColorSpace;
  var screen = new TH.Mesh(new TH.ShapeGeometry(rrect(2.14, 4.54, 0.34), 24), new TH.MeshBasicMaterial({map: stex, toneMapped: false}));
  // ShapeGeometry UVs follow the shape coordinates: remap to 0..1.
  (function(){ var uv = screen.geometry.attributes.uv, p = screen.geometry.attributes.position;
    for (var i = 0; i < uv.count; i++) uv.setXY(i, (p.getX(i) + 1.07) / 2.14, (p.getY(i) + 2.27) / 4.54); uv.needsUpdate = true; })();
  screen.position.z = 0.15; phone.add(screen);
  function rr(x, y, w, h, rad, c){ sx.fillStyle = c; sx.beginPath(); sx.moveTo(x + rad, y); sx.arcTo(x + w, y, x + w, y + h, rad); sx.arcTo(x + w, y + h, x, y + h, rad);
    sx.arcTo(x, y + h, x, y, rad); sx.arcTo(x, y, x + w, y, rad); sx.fill(); }
  var mode = '';
  function drawScreen(m, u){
    var g = sx.createLinearGradient(0, 0, 0, 940);
    if (m === 'alert') { g.addColorStop(0, '#2a0b10'); g.addColorStop(1, '#09090c'); } else if (m === 'ok') { g.addColorStop(0, '#062418'); g.addColorStop(1, '#07090b'); }
    else { g.addColorStop(0, '#13213f'); g.addColorStop(1, '#07080d'); }
    sx.fillStyle = g; sx.fillRect(0, 0, 460, 940);
    sx.fillStyle = 'rgba(255,255,255,0.85)'; sx.font = '700 30px sans-serif'; sx.textAlign = 'center'; sx.fillText('09:41', 230, 70);
    if (m === 'ok') {
      rr(30, 250, 400, 330, 34, 'rgba(255,255,255,0.1)');
      sx.fillStyle = '#3ddc97'; sx.font = '800 30px sans-serif'; sx.textAlign = 'left'; sx.fillText('Message à ta banque', 60, 305);
      sx.fillStyle = '#fff'; sx.font = '600 30px sans-serif';
      ['Bonjour, j\'ai reçu', '3\'000 CHF par erreur', 'sur mon compte.', 'Merci de les récupérer.'].forEach(function(l, i){ sx.fillText(l, 60, 360 + i * 46); });
      sx.fillStyle = '#3ddc97'; sx.font = '800 120px sans-serif'; sx.textAlign = 'center'; sx.fillText('✓', 230, 760);
    } else {
      sx.fillStyle = m === 'alert' ? '#ff4d5e' : 'rgba(255,255,255,0.7)'; sx.font = '700 32px sans-serif'; sx.fillText(m === 'alert' ? 'Pas à toi' : 'Compte privé', 230, 300);
      var v = Math.round(3000 * u); sx.fillStyle = m === 'alert' ? '#ff4d5e' : '#ffd166'; sx.font = '900 118px sans-serif';
      sx.fillText('+' + String(v).replace(/\B(?=(\d{3})+(?!\d))/g, "'"), 230, 430); sx.font = '800 56px sans-serif'; sx.fillText('CHF', 230, 505);
      rr(40, 600, 380, 120, 30, 'rgba(255,255,255,0.1)');
      sx.fillStyle = '#fff'; sx.font = '700 28px sans-serif'; sx.textAlign = 'left'; sx.fillText('Crédit reçu', 70, 650);
      sx.fillStyle = 'rgba(255,255,255,0.6)'; sx.font = '600 24px sans-serif'; sx.fillText('Expéditeur inconnu', 70, 690);
    }
    stex.needsUpdate = true;
  }

  // Gold coins with an embossed Swiss cross.
  var fc = document.createElement('canvas'); fc.width = fc.height = 256; var fx = fc.getContext('2d');
  var gg = fx.createRadialGradient(100, 90, 10, 128, 128, 140); gg.addColorStop(0, '#fff1b8'); gg.addColorStop(0.55, '#f2c45a'); gg.addColorStop(1, '#a8761c');
  fx.fillStyle = gg; fx.fillRect(0, 0, 256, 256);
  fx.strokeStyle = 'rgba(120,80,10,0.55)'; fx.lineWidth = 10; fx.beginPath(); fx.arc(128, 128, 112, 0, Math.PI * 2); fx.stroke();
  fx.fillStyle = '#c9302c'; fx.beginPath(); fx.arc(128, 128, 62, 0, Math.PI * 2); fx.fill();
  fx.fillStyle = '#fff'; fx.fillRect(116, 92, 24, 72); fx.fillRect(92, 116, 72, 24);
  var ftex = new TH.CanvasTexture(fc); ftex.colorSpace = TH.SRGBColorSpace;
  var goldM = new TH.MeshPhysicalMaterial({color: 0xf2c45a, metalness: 1, roughness: 0.22, clearcoat: 0.6});
  var faceM = new TH.MeshPhysicalMaterial({map: ftex, metalness: 0.75, roughness: 0.28, clearcoat: 0.8});
  var coinG = new TH.CylinderGeometry(0.42, 0.42, 0.08, 48);
  var coins = [], N = 34;
  for (var i = 0; i < N; i++) {
    var c = new TH.Group(); var d = new TH.Mesh(coinG, [goldM, faceM, faceM]); d.castShadow = true; c.add(d);
    sc.add(c);
    var col = i % 4, lvl = Math.floor(i / 4), side = col < 2 ? -1 : 1;
    var px = side * (1.35 + (col % 2) * 0.9) + Math.sin(i * 7.1) * 0.06, pz = 1.4 + (col % 2 ? -0.35 : 0.35);
    coins.push({g: c, t0: T.tombent + 0.12 + i * 0.07, px: px, py: 0.06 + lvl * 0.085, pz: pz, sp: 4 + (i * 13 % 7), ph: i * 0.9,
                back: T.rendu - 0.35 + (N - i) * 0.02});
  }

  // Chrome handcuffs.
  var chrome = new TH.MeshPhysicalMaterial({color: 0xe8ebf0, metalness: 1, roughness: 0.07, clearcoat: 1});
  var cuffs = new TH.Group(); sc.add(cuffs);
  [-1, 1].forEach(function(s){ var ring = new TH.Mesh(new TH.TorusGeometry(0.62, 0.11, 24, 72), chrome); ring.position.x = s * 1.15; ring.castShadow = true; cuffs.add(ring);
    var hinge = new TH.Mesh(new TH.BoxGeometry(0.3, 0.42, 0.22), new TH.MeshPhysicalMaterial({color: 0x8a8f99, metalness: 1, roughness: 0.3})); hinge.position.x = s * 0.5; cuffs.add(hinge); });
  for (var k = 0; k < 3; k++) { var l = new TH.Mesh(new TH.TorusGeometry(0.13, 0.04, 12, 24), chrome); l.position.x = -0.22 + k * 0.22; l.rotation.y = k % 2 ? Math.PI / 2 : 0; cuffs.add(l); }

  // Floating dust bokeh.
  var dc = document.createElement('canvas'); dc.width = dc.height = 64; var dx = dc.getContext('2d');
  var rg = dx.createRadialGradient(32, 32, 0, 32, 32, 32); rg.addColorStop(0, 'rgba(255,255,255,1)'); rg.addColorStop(1, 'rgba(255,255,255,0)'); dx.fillStyle = rg; dx.fillRect(0, 0, 64, 64);
  var pos = []; for (var i = 0; i < 160; i++) pos.push((i * 37 % 100) / 100 * 14 - 7, (i * 61 % 100) / 100 * 9, (i * 23 % 100) / 100 * 10 - 6);
  var pg = new TH.BufferGeometry(); pg.setAttribute('position', new TH.Float32BufferAttribute(pos, 3));
  var dust = new TH.Points(pg, new TH.PointsMaterial({size: 0.09, map: new TH.CanvasTexture(dc), transparent: true, depthWrite: false, blending: TH.AdditiveBlending, color: 0xffe2a8}));
  sc.add(dust);

  function cl(v){ return Math.max(0, Math.min(1, v)); }
  function eo(u){ u = cl(u); return 1 - Math.pow(1 - u, 3); }
  function eio(u){ u = cl(u); return u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; }
  function bounce(u){ u = cl(u); var n1 = 7.5625, d1 = 2.75;
    if (u < 1 / d1) return n1 * u * u; if (u < 2 / d1) return n1 * (u -= 1.5 / d1) * u + 0.75; if (u < 2.5 / d1) return n1 * (u -= 2.25 / d1) * u + 0.9375; return n1 * (u -= 2.625 / d1) * u + 0.984375; }
  var cRed = new TH.Color(0xff2b3d), cWarm = new TH.Color(0xffb14a), cGreen = new TH.Color(0x2fe39a), cW = new TH.Color(0xffffff), tmp = new TH.Color();

  R.on(function(t){
    // Mood: warm gold → red (the trap) → green (the right move).
    var red = cl((t - T.piege + 0.2) / 0.35) * (1 - cl((t - T.reflexe + 0.1) / 0.4));
    var grn = cl((t - T.reflexe + 0.1) / 0.4) * (1 - cl((t - T.enregistre) / 0.5));
    rim.color.copy(cWarm).lerp(cRed, red).lerp(cGreen, grn); rim.intensity = 60 + 140 * red + 60 * grn;
    key.color.copy(cW).lerp(tmp.set(0xffd0d4), red * 0.6); key.intensity = 260 - 90 * red;

    // Phone: rises at the start, hovers, screen counts up, flips to alert / ok.
    var pin = eo(t / 0.7), back = t > T.piege - 0.3 && t < T.reflexe - 0.2 ? eio((t - T.piege + 0.3) / 0.6) : (t >= T.reflexe - 0.2 ? 1 - eio((t - T.reflexe + 0.2) / 0.7) : 0);
    phone.position.set(0, 2.1 + Math.sin(t * 1.6) * 0.05 + (1 - pin) * -2.2 + back * 0.1, -0.2 - back * 2.6);
    phone.rotation.set(-0.12 + Math.sin(t * 0.9) * 0.04, Math.sin(t * 0.7) * 0.22 + (1 - pin) * 0.9, Math.sin(t * 1.1) * 0.03);
    var m = t >= T.reflexe ? 'ok' : (t >= T.piege ? 'alert' : 'cash');
    var u = m === 'cash' ? eo((t - T.tombent) / 1.0) : 1;
    if (u > 0.985) u = 1; var key2 = m + Math.round(3000 * u); if (key2 !== mode) { mode = key2; drawScreen(m, u); }

    // Coins burst out of the screen, pile up, then fly back on "doit être rendu".
    coins.forEach(function(c, i){
      var g = c.g, ta = (t - c.t0) / 0.75;
      if (t < c.t0) { g.visible = false; return; } g.visible = true;
      var sx0 = 0, sy0 = phone.position.y, sz0 = phone.position.z + 0.3;
      if (t < c.back) {
        var a = cl(ta), x = sx0 + (c.px - sx0) * eo(a), z = sz0 + (c.pz - sz0) * eo(a);
        var y = a < 1 ? sy0 + (c.py - sy0) * a + Math.sin(a * Math.PI) * 1.6 : c.py;
        if (a >= 1) y = c.py + (1 - bounce((t - c.t0 - 0.75) / 0.35)) * 0.25;
        g.position.set(x, y, z);
        var spin = (1 - eo(a)) * c.sp; g.rotation.set(Math.PI / 2 * (1 - eo(a)) + spin * t * 0.3 + (a >= 1 ? 0 : c.ph), t * spin * 0.2, 0);
        if (a >= 1) g.rotation.set(Math.sin(i) * 0.06, i * 0.7, 0);
        g.scale.setScalar(0.4 + 0.6 * eo(a * 2));
      } else {
        var b = cl((t - c.back) / 0.55), bx0 = c.px, by0 = c.py, bz0 = c.pz;
        g.position.set(bx0 + (0 - bx0) * eio(b), by0 + (sy0 - by0) * b + Math.sin(b * Math.PI) * 1.4, bz0 + (sz0 - bz0) * eio(b));
        g.rotation.set(b * 6, b * 4 + i, 0); g.scale.setScalar(Math.max(0.001, 1 - eio(b) * 0.9)); g.visible = b < 1;
      }
    });

    // Handcuffs slam down on "le piège", turn slowly, leave on "le bon réflexe".
    var ci = t >= T.piege - 0.05 && t < T.reflexe + 0.4;
    cuffs.visible = ci;
    if (ci) { var dd = bounce((t - T.piege + 0.05) / 0.7), out = cl((t - T.reflexe) / 0.4);
      cuffs.position.set(0, 0.95 + (1 - dd) * 7 + out * 6, 1.4); cuffs.rotation.set(-0.35 + (1 - dd) * 1.2, t * 0.6, 0.12);
      var sq = t >= T.trois ? 1 + 0.12 * Math.exp(-(t - T.trois) * 6) : 1; cuffs.scale.setScalar(1.0 * sq); }

    // Camera: slow dolly-in, punch on beats, gentle orbit.
    var push = eio(t / 3.2), orbit = Math.sin(t * 0.25) * 0.35, shake = 0;
    [T.erreur, T.piege, T.trois].forEach(function(h){ if (t >= h) shake += Math.exp(-(t - h) * 9) * 0.12; });
    var dist = 20.5 - 2.5 * push - 1.5 * red + (t > T.enregistre ? eo((t - T.enregistre) / 1.2) * 2.5 : 0);
    cam.position.set(Math.sin(orbit) * dist + Math.sin(t * 40) * shake, 4.2 + Math.cos(t * 33) * shake, Math.cos(orbit) * dist);
    cam.lookAt(0, 1.75, 0.2);
    dust.rotation.y = t * 0.03; dust.position.y = Math.sin(t * 0.4) * 0.15;

    r.render(sc, cam);
    bx.clearRect(0, 0, 540, 960); bx.drawImage(cv, 0, 0, 540, 960);
  });
})();
"""
PUNCH = []
SFX = []
TAIL = 1.8
CAP_MAX = 3
