"""Reel 015 — État des lieux de sortie : usure normale et vérification immédiate (art. 267, 267a CO).
Style : diorama 3D isométrique miniature (caméra orthographique, low-poly, effet tilt-shift), voix Vivienne."""
import json

VOICE = "fr-FR-VivienneMultilingualNeural"
RATE = "+10%"
USE_THREE = True

VO = ("Lausanne. Tu rends ton appart après huit ans, et ton bailleur te réclame mille cinq cents francs pour tout repeindre. "
      "Tu dois payer ? Pas forcément. En Suisse, tu dois rendre l'appartement dans l'état qui résulte d'un usage normal. "
      "L'usure normale, comme une peinture qui a vieilli en huit ans, ce n'est pas à toi de la payer. Seuls les vrais dégâts sont pour toi. "
      "Et le détail que presque personne ne connaît : à la remise des clés, le bailleur doit vérifier l'appartement "
      "et te signaler tout de suite les défauts. S'il ne le fait pas, tu es libéré, sauf pour les défauts qu'on ne pouvait pas voir. "
      "Articles 267 et 267a du Code des obligations. Envoie ça à quelqu'un qui déménage. Thrax Legal, lien en bio.")

META = {
    "id": "r015-etat-des-lieux-diorama",
    "music": "bounce",
    "caption": ("🏠 Tu rends ton appart à Lausanne après 8 ans et on te réclame 1500 francs pour tout repeindre ?\n\n"
                "En Suisse, tu dois restituer le logement dans l'état qui résulte d'un usage conforme au contrat (art. 267 al. 1 CO) : "
                "l'usure normale n'est pas à ta charge, seuls les dégâts qui dépassent un usage normal le sont.\n\n"
                "À la restitution, le bailleur doit vérifier l'état du logement et t'aviser immédiatement des défauts dont tu réponds. "
                "S'il ne le fait pas, tu es libéré, sauf pour les défauts qui ne pouvaient pas être découverts par un examen usuel (art. 267a CO).\n\n"
                "📤 Envoie ça à quelqu'un qui déménage. Une question sur ton état des lieux ? Thrax Legal, lien en bio.\n\n"
                "#etatdeslieux #demenagement #locataire #bail #lausanne #genève #suisse #suisseromande #appartement"),
    "yt_title": "État des lieux : 1500 CHF pour repeindre après 8 ans ? (Suisse) #shorts",
    "tiktok_title": "On te réclame 1500 CHF pour repeindre ton appart ? (Suisse)",
    "tags": ["état des lieux", "usure normale", "art. 267a CO", "déménagement", "Lausanne"],
    "genome": {"style": "3d-diorama-isometrique-tilt-shift", "palette": "pastel/bois/jaune", "hook": "ville + somme réclamée",
               "format": "situation + regle + secret", "topic": "logement/etat-des-lieux", "mascot": "figurines-miniatures",
               "voice": "fr-FR-VivienneMultilingualNeural", "captions": "blanc-contour-jaune", "music": "bounce", "length": "~40s"},
    "cover_t": 3.2,
}

CSS = """
#root { background: linear-gradient(#f7e9d7 0%, #f3d9c6 45%, #e8cdb8 100%); color:#1d1d1f; }
#gl { position:absolute; left:0; top:0; width:1080px; height:1920px; }
.tilt { position:absolute; left:0; right:0; height:420px; backdrop-filter: blur(7px); -webkit-backdrop-filter: blur(7px); pointer-events:none; }
.tilt.t { top:0; -webkit-mask-image: linear-gradient(#000 30%, transparent); mask-image: linear-gradient(#000 30%, transparent); }
.tilt.b { bottom:0; -webkit-mask-image: linear-gradient(transparent, #000 70%); mask-image: linear-gradient(transparent, #000 70%); }
.card { position:absolute; left:80px; right:80px; top:150px; background:rgba(255,255,255,0.92); border-radius:40px; padding:34px 44px;
        box-shadow:0 30px 70px rgba(80,40,10,0.25); text-align:center; display:flex; flex-direction:column; gap:12px; align-items:center; }
.k { font-size:40px; font-weight:800; color:#8a6a4f; }
.v { font-size:96px; font-weight:900; letter-spacing:-0.04em; line-height:1; }
.s { font-size:54px; font-weight:800; line-height:1.12; }
.red { color:#dc2626; } .grn { color:#16a34a; } .hl { background:#ffe14d; padding:0 12px; border-radius:10px; }
.pill { position:absolute; left:0; right:0; text-align:center; }
.pill span { display:inline-block; background:#1d1d1f; color:#fff; font-size:46px; font-weight:900; border-radius:999px; padding:14px 34px; }
.chip { display:inline-block; background:#1d1d1f; color:#ffe14d; font-size:80px; font-weight:900; border-radius:24px; padding:12px 34px; }
.brand { font-size:120px; font-weight:900; letter-spacing:-0.05em; }
.brand span { color:#dc2626; }
.cap { top: 1490px; font-size: 76px; }
.cap .cw { -webkit-text-stroke: 14px #3b2412; }
.cap .cw.now { color:#ffe14d; }
"""


def body(w):
    T = {k: w.a(p) for k, p in {
        "rends": "Tu rends ton appart", "reclame": "te réclame", "repeindre": "pour tout repeindre.", "payer": "Tu dois payer",
        "pas": "Pas forcément.", "suisse": "En Suisse,", "normal": "d'un usage normal.", "usure": "L'usure normale,",
        "peinture": "comme une peinture", "pastoi": "ce n'est pas à toi", "vrais": "Seuls les vrais dégâts", "detail": "Et le détail",
        "cles": "à la remise des clés,", "verifier": "le bailleur doit vérifier", "signaler": "et te signaler", "sinon": "S'il ne le fait pas,",
        "libere": "tu es libéré,", "sauf": "sauf pour les défauts", "art": "Articles", "envoie": "Envoie ça", "thrax": "Thrax Legal,"}.items()}
    T["total"] = w.total
    globals()["PUNCH"] = [T["reclame"], T["detail"], T["libere"]]
    globals()["SCRIPT"] = SCRIPT_T.replace("__T__", json.dumps(T))
    O = lambda a, b: f'data-at="{a:.3f}" data-out="{b - 0.25:.3f}"'
    return f"""
<canvas id="gl" width="1080" height="1920"></canvas>
<div class="tilt t"></div><div class="tilt b"></div>
<div class="pill" style="top:70px" data-fx="pop" {O(0.1, T['suisse'])}><span>📍 Lausanne · fin du bail</span></div>

<div class="card" data-fx="drop" {O(T['reclame'], T['suisse'])}>
  <div class="k">Le bailleur te réclame</div>
  <div class="v red" data-fx="count" data-from="0" data-to="1500" data-suf=" CHF" data-d="0.8" data-at="{T['reclame'] + 0.2:.3f}">0 CHF</div>
  <div class="s">pour repeindre 🎨 après 8 ans</div>
  <div class="s" data-fx="stamp" data-rot="-4" data-at="{T['pas']:.3f}" style="font-size:64px">Pas forcément.</div>
</div>

<div class="card" data-fx="drop" {O(T['suisse'], T['detail'])}>
  <div class="k">🇨🇭 La règle</div>
  <div class="s">rendre l'appart dans l'état d'un <span class="hl">usage normal</span></div>
  <div class="s grn" data-fx="rise" data-at="{T['usure']:.3f}">usure normale → pas pour toi ✅</div>
  <div class="s red" data-fx="rise" data-at="{T['vrais']:.3f}">vrais dégâts → pour toi ⚠️</div>
</div>

<div class="card" data-fx="drop" {O(T['detail'], T['art'])}>
  <div class="k">🤫 Le détail que presque personne ne connaît</div>
  <div class="s" data-fx="rise" data-at="{T['cles']:.3f}">🔑 À la remise des clés, il doit vérifier…</div>
  <div class="v" style="font-size:80px" data-fx="stamp" data-rot="-3" data-at="{T['signaler'] + 0.4:.3f}">… et signaler <span class="hl">TOUT DE SUITE</span> ⏱️</div>
  <div class="s grn" data-fx="pop" data-at="{T['libere']:.3f}">Sinon → tu es libéré 🎉</div>
  <div class="k" data-fx="rise" data-at="{T['sauf']:.3f}">sauf défauts invisibles à l'examen</div>
</div>

<div class="pill" style="top:300px" data-fx="stamp" data-rot="-3" {O(T['art'], T['envoie'])}><span class="chip">Art. 267 + 267a CO</span></div>
<div class="card" data-fx="drop" data-at="{T['envoie']:.3f}">
  <div class="s">📤 Envoie ça à quelqu'un qui déménage</div>
  <div class="brand" data-fx="zoom" data-at="{T['thrax']:.3f}">Thrax <span>Legal</span></div>
</div>
"""


SCRIPT_T = r"""
(function(){
  var T = __T__, TH = THREE;
  var cv = document.getElementById('gl');
  var r = new TH.WebGLRenderer({canvas: cv, antialias: true, preserveDrawingBuffer: true, alpha: true});
  r.setSize(1080, 1920, false); r.setClearColor(0x000000, 0); r.shadowMap.enabled = true; r.shadowMap.type = TH.PCFSoftShadowMap;
  var sc = new TH.Scene();
  var H = 15, cam = new TH.OrthographicCamera(-H * 0.5625 / 2, H * 0.5625 / 2, H / 2, -H / 2, 0.1, 100);
  sc.add(new TH.HemisphereLight('#fff7ea', '#b9a28a', 1.5));
  var sun = new TH.DirectionalLight('#fff0dc', 2.2); sun.position.set(6, 12, 8); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048); ['left', 'bottom'].forEach(function(k){ sun.shadow.camera[k] = -8; }); ['right', 'top'].forEach(function(k){ sun.shadow.camera[k] = 8; });
  sc.add(sun);
  function M(c, opt){ var o = {color: c, roughness: 0.8, flatShading: true}; for (var k in (opt || {})) o[k] = opt[k]; return new TH.MeshStandardMaterial(o); }
  var world = new TH.Group(); sc.add(world);
  var parts = [];  // [object, drop start time, target y]
  function add(mesh, x, y, z, t0, parent){ mesh.position.set(x, y, z); mesh.castShadow = mesh.receiveShadow = true; (parent || world).add(mesh); parts.push([mesh, t0, y]); return mesh; }
  function box(w, h, d, m, x, y, z, t0, parent){ return add(new TH.Mesh(new TH.BoxGeometry(w, h, d), m), x, y, z, t0, parent); }
  // Slab, floor planks, walls
  box(6.4, 0.5, 6.4, M('#8b6a4e'), 0, -0.25, 0, 0.0);
  var planks = M('#d9b48a'); for (var i = 0; i < 8; i++) box(0.76, 0.06, 6, planks, -2.65 + i * 0.76, 0.03, 0, 0.05 + i * 0.03);
  var wallM = M('#f4efe6'), wall2 = M('#e9e1d3');
  var back = box(6, 3.2, 0.2, wallM, 0, 1.6, -3.0, 0.3), left = box(0.2, 3.2, 6, wall2, -3.0, 1.6, 0, 0.35);
  // Window + picture + door outline
  box(1.6, 1.1, 0.06, M('#9fd3f2', {roughness: 0.2}), 1.2, 1.9, -2.88, 0.5); box(1.7, 0.08, 0.1, M('#ffffff'), 1.2, 1.3, -2.85, 0.5);
  box(0.9, 0.7, 0.05, M('#e76f51'), -1.2, 2.0, -2.88, 0.55);
  box(0.05, 2.2, 1.0, M('#a0764f'), -2.88, 1.1, 1.6, 0.55);
  // Furniture
  var sofa = M('#4f7cac'); box(2.2, 0.45, 0.9, sofa, 0.6, 0.35, -2.2, 0.7); box(2.2, 0.7, 0.25, sofa, 0.6, 0.75, -2.62, 0.72);
  box(0.25, 0.6, 0.9, sofa, -0.45, 0.45, -2.2, 0.74); box(0.25, 0.6, 0.9, sofa, 1.65, 0.45, -2.2, 0.74);
  var rug = add(new TH.Mesh(new TH.CylinderGeometry(1.3, 1.3, 0.03, 24), M('#e9c46a')), 0.4, 0.07, -0.6, 0.8);
  box(1.2, 0.08, 0.7, M('#7a5232'), 0.4, 0.5, -0.6, 0.85); [-0.15, 0.95].forEach(function(x){ [-0.85, -0.35].forEach(function(z){ box(0.07, 0.42, 0.07, M('#7a5232'), x, 0.26, z, 0.85); }); });
  var pot = add(new TH.Mesh(new TH.CylinderGeometry(0.25, 0.2, 0.45, 8), M('#c1502e')), 2.4, 0.25, 1.9, 0.9);
  var leaves = add(new TH.Mesh(new TH.IcosahedronGeometry(0.45, 0), M('#3f8f4a')), 2.4, 0.85, 1.9, 0.95);
  box(0.9, 1.6, 0.5, M('#c9b79c'), -2.5, 0.8, -2.4, 0.9);
  // Wear marks (normal wear) and a real hole (real damage)
  var wearM = M('#cfc3ad'), marks = [];
  [[-0.6, 1.2], [0.3, 0.6], [2.0, 0.9]].forEach(function(p, i){ var m = box(0.55, 0.3, 0.02, wearM, p[0], p[1], -2.89, 1.0 + i * 0.05); marks.push(m); });
  var hole = box(0.45, 0.45, 0.02, M('#3a2a1e'), -2.89, 1.4, -0.6, 1.1); hole.rotation.y = Math.PI / 2;
  hole.scale.setScalar(0.001);
  // Rings that highlight marks
  function ring(c){ var g = new TH.Mesh(new TH.TorusGeometry(0.45, 0.05, 8, 32), new TH.MeshBasicMaterial({color: c, transparent: true})); world.add(g); return g; }
  var rings = marks.map(function(m){ var g = ring('#f5c518'); g.position.set(m.position.x, m.position.y, -2.84); return g; });
  var holeRing = ring('#dc2626'); holeRing.position.set(-2.84, 1.4, -0.6); holeRing.rotation.y = Math.PI / 2;
  // Paint bucket + roller
  var bucket = new TH.Group(); world.add(bucket);
  var b1 = new TH.Mesh(new TH.CylinderGeometry(0.32, 0.28, 0.5, 12), M('#e5e7eb')); b1.position.y = 0.25; b1.castShadow = true; bucket.add(b1);
  var b2 = new TH.Mesh(new TH.CylinderGeometry(0.3, 0.3, 0.04, 12), M('#dc2626')); b2.position.y = 0.5; bucket.add(b2);
  bucket.position.set(1.8, 0, 0.9);
  // Figurines: tenant + landlord with clipboard
  function fig(top, skin){ var g = new TH.Group(); world.add(g);
    var bd = new TH.Mesh(new TH.CapsuleGeometry(0.22, 0.45, 4, 8), M(top)); bd.position.y = 0.55; bd.castShadow = true; g.add(bd);
    var hd = new TH.Mesh(new TH.SphereGeometry(0.2, 12, 8), M(skin)); hd.position.y = 1.08; hd.castShadow = true; g.add(hd); return g; }
  var ten = fig('#2fa36b', '#f1c7a5'), lan = fig('#8a6d4a', '#e8b996'); ten.scale.setScalar(1.45); lan.scale.setScalar(1.45);
  var clip = new TH.Mesh(new TH.BoxGeometry(0.3, 0.4, 0.04), M('#f8fafc')); clip.position.set(0.25, 0.65, 0.2); lan.add(clip);
  ten.position.set(-0.9, 0.06, 1.2);
  // Golden key
  var key = new TH.Group(), gold = new TH.MeshStandardMaterial({color: '#e8b64c', metalness: 0.85, roughness: 0.25});
  var kb = new TH.Mesh(new TH.TorusGeometry(0.22, 0.07, 10, 24), gold); kb.position.y = 0.45; key.add(kb);
  key.add(new TH.Mesh(new TH.BoxGeometry(0.09, 0.7, 0.09), gold));
  var kt = new TH.Mesh(new TH.BoxGeometry(0.2, 0.08, 0.09), gold); kt.position.set(0.12, -0.25, 0); key.add(kt);
  world.add(key);
  // Confetti for "tu es libéré"
  var conf = [], cols = ['#f5c518', '#16a34a', '#dc2626', '#4f7cac', '#e76f51'];
  for (var i = 0; i < 70; i++) { var c = new TH.Mesh(new TH.PlaneGeometry(0.12, 0.2), new TH.MeshBasicMaterial({color: cols[i % 5], side: TH.DoubleSide})); world.add(c);
    conf.push([c, (i * 37 % 60) / 10 - 3, (i * 53 % 60) / 10 - 3, 1 + (i % 7) * 0.4]); }
  function cl(v){ return Math.max(0, Math.min(1, v)); }
  function bounce(u){ u = cl(u); var n1 = 7.5625, d1 = 2.75;
    if (u < 1 / d1) return n1 * u * u; if (u < 2 / d1) return n1 * (u -= 1.5 / d1) * u + 0.75; if (u < 2.5 / d1) return n1 * (u -= 2.25 / d1) * u + 0.9375; return n1 * (u -= 2.625 / d1) * u + 0.984375; }
  function eo(u){ u = cl(u); return 1 - Math.pow(1 - u, 3); }
  R.on(function(t){
    // Build-up: every piece drops in with a bounce.
    parts.forEach(function(p){ var u = bounce((t - p[1]) / 0.55); p[0].position.y = p[2] + (1 - u) * 6; p[0].visible = t >= p[1] - 0.01; });
    // Isometric camera orbit + zoom per beat.
    var ang = 0.78 + Math.sin(t * 0.35) * 0.3;
    cam.position.set(Math.sin(ang) * 14, 11, Math.cos(ang) * 14); cam.lookAt(0, 0.6, 0);
    var z = 1.08; if (t > T.usure && t < T.detail) z = 1.08 + 0.3 * eo((t - T.usure) / 0.6); if (t >= T.cles && t < T.art) z = 1.08 + 0.2 * eo((t - T.cles) / 0.6);
    cam.zoom = z; cam.updateProjectionMatrix();
    world.position.y = -2.2;  // diorama sits in the lower half, cards above
    // Bucket appears on "repeindre"; jiggles.
    var bs = t >= T.repeindre - 0.3 && t < T.suisse ? eo((t - T.repeindre + 0.3) / 0.4) : 0;
    bucket.scale.setScalar(Math.max(0.001, bs)); bucket.rotation.z = Math.sin(t * 9) * 0.06 * bs;
    // Wear highlight then real damage.
    var wr = t >= T.usure && t < T.detail ? 1 : 0;
    rings.forEach(function(g, i){ var s = wr * (0.9 + 0.15 * Math.sin(t * 6 + i)); g.scale.setScalar(Math.max(0.001, s)); g.material.opacity = wr; });
    var hs = t >= T.vrais - 0.2 ? eo((t - T.vrais + 0.2) / 0.3) : 0; hole.scale.setScalar(Math.max(0.001, hs));
    var hr = t >= T.vrais && t < T.detail ? 1 : 0; holeRing.scale.setScalar(Math.max(0.001, hr * (0.9 + 0.15 * Math.sin(t * 8)))); holeRing.material.opacity = hr;
    // Tenant idles; landlord walks in on the "detail" beat and inspects.
    ten.position.y = 0.06 + Math.abs(Math.sin(t * 3)) * 0.03; ten.rotation.y = 0.6;
    var lw = eo((t - T.detail) / 1.2); lan.visible = t >= T.detail;
    lan.position.set(-2.4 + 2.2 * lw, 0.06 + (lw < 1 ? Math.abs(Math.sin(t * 10)) * 0.06 : 0), 2.2 - 1.4 * lw); lan.rotation.y = -0.8 + (t > T.libere ? Math.sin(t * 6) * 0.4 : 0);
    // Key hovers over the tenant during the hand-over.
    var ks = t >= T.cles && t < T.art ? eo((t - T.cles) / 0.5) : 0;
    key.scale.setScalar(Math.max(0.001, ks * 1.4)); key.position.set(-0.4, 2.6 + Math.sin(t * 2.5) * 0.15, 1.0); key.rotation.y = t * 2.4;
    // Confetti when freed.
    conf.forEach(function(c, i){ var u = t - T.libere; var on = u > 0 && t < T.art;
      c[0].visible = on; if (!on) return; c[0].position.set(c[1], 6 - ((u * c[3] * 1.6 + i * 0.13) % 6.5), c[2]); c[0].rotation.set(u * 4 + i, u * 3, 0); });
    r.render(sc, cam);
  });
})();
"""
PUNCH = []
SFX = []
TAIL = 1.8
CAP_MAX = 3
