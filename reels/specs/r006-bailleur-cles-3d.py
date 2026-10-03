"""Reel 006 — Le bailleur entre chez toi avec ses clés (art. 257h CO, art. 186 CP). Style : figurines 3D (Three.js, rendu toon) dans un salon lausannois."""
import json

VOICE = "fr-CH-ArianeNeural"
RATE = "+10%"
USE_THREE = True

VO = ("Tu rentres chez toi à Lausanne, et ton bailleur est dans ton salon. Il a gardé un double des clés. Il a le droit ? Non. "
      "Même s'il est propriétaire, ton appartement, c'est ton domicile. "
      "Il peut seulement venir quand c'est nécessaire : pour des travaux, l'entretien, une vente ou une relocation. "
      "Et il doit te prévenir à temps, en tenant compte de tes intérêts. "
      "S'il entre sans ton accord, ça peut même être une violation de domicile, une infraction pénale. "
      "Article 257h du Code des obligations, et article 186 du Code pénal. Envoie ça à un ami locataire. Thrax Legal, lien en bio.")

META = {
    "id": "r006-bailleur-cles-3d",
    "music": "bounce",
    "caption": ("🔑 Ton bailleur a un double des clés… est-ce qu'il peut entrer quand il veut ? Non.\n\n"
                "• Le locataire doit tolérer les travaux nécessaires et permettre les visites nécessaires à l'entretien, à la vente ou à une relocation (art. 257h al. 1 et 2 CO).\n"
                "• Le bailleur doit annoncer ces travaux et visites à temps et tenir compte des intérêts du locataire (art. 257h al. 3 CO).\n"
                "• Entrer dans un logement contre la volonté de l'occupant peut constituer une violation de domicile, poursuivie sur plainte (art. 186 CP).\n"
                "• En cas d'urgence réelle (par ex. une fuite d'eau), la situation peut être différente.\n\n"
                "📤 Envoie ça à un ami locataire. Une question sur ton bail ? Thrax Legal, lien en bio.\n\n"
                "#locataire #bail #appartement #suisse #lausanne #genève #suisseromande #logement #proprietaire"),
    "yt_title": "Ton bailleur entre chez toi avec ses clés ? En Suisse, il n'a pas le droit #shorts",
    "tiktok_title": "Ton bailleur entre chez toi avec un double des clés : il a le droit ?",
    "tags": ["bail", "locataire", "art. 257h CO", "violation de domicile", "Lausanne"],
    "genome": {"style": "figurines-3d-toon", "palette": "salon-chaud/bleu/rouge", "hook": "situation choc + question",
               "format": "scene-3d + cartes", "topic": "logement/acces-bailleur", "mascot": "bailleur-3d + locataire-3d",
               "voice": "fr-CH-ArianeNeural", "captions": "classique", "music": "bounce", "length": "~35s"},
    "cover_t": 2.6,
}

CSS = """
#root { background:#efe6d8; }
#gl { position:absolute; left:0; top:0; width:1080px; height:1920px; }
.card { position:absolute; left:70px; right:70px; top:190px; min-height:420px; background:#fffdf8; color:#1d1d1f; border-radius:44px;
        box-shadow: 0 24px 60px rgba(40,25,10,0.28); display:flex; flex-direction:column; align-items:center; justify-content:center;
        text-align:center; padding:44px 50px; gap:18px; }
.card .k { font-size:40px; font-weight:800; color:#8a7a66; }
.card .v { font-size:96px; font-weight:900; letter-spacing:-0.04em; line-height:1.0; }
.card .s { font-size:52px; font-weight:800; line-height:1.15; }
.red { color:#d62828; } .blue { color:#1d4ed8; }
.chips { display:flex; flex-wrap:wrap; justify-content:center; gap:16px; }
.chips span { font-size:44px; font-weight:800; background:#eef2ff; color:#1d4ed8; border-radius:999px; padding:12px 28px; }
.alarm { position:absolute; inset:0; background: radial-gradient(ellipse at 50% 60%, rgba(214,40,40,0) 40%, rgba(214,40,40,0.45) 100%); opacity:0; }
.brand { font-size: 112px; font-weight: 900; letter-spacing: -0.05em; }
.brand span { color:#d62828; }
.cap { top: 1530px; font-size: 72px; }
"""


def body(w):
    T = {"bailleur": w.a("et ton bailleur"), "garde": w.a("Il a gardé"), "droit": w.a("Il a le droit"), "non": w.a("Non."),
         "meme": w.a("Même s'il"), "domicile": w.a("c'est ton domicile"), "seul": w.a("Il peut seulement"),
         "travaux": w.a("pour des travaux"), "entretien": w.a("l'entretien,"), "vente": w.a("une vente"),
         "reloc": w.a("une relocation."), "prev": w.a("Et il doit"), "interets": w.a("en tenant compte"),
         "accord": w.a("S'il entre"), "violation": w.a("une violation"), "infraction": w.a("une infraction"),
         "art": w.a("Article 257h"), "envoie": w.a("Envoie ça"), "thrax": w.a("Thrax Legal,"), "total": w.total}
    globals()["PUNCH"] = [T["non"], T["violation"]]
    globals()["SCRIPT"] = SCRIPT_T.replace("__T__", json.dumps(T))
    C = lambda a, b: f'data-fx="pop" data-at="{a:.3f}" data-out="{b - 0.3:.3f}"'
    return f"""
<canvas id="gl" width="1080" height="1920"></canvas>
<div class="alarm" id="alarm"></div>

<div class="card" {C(0.2, T['non'])}>
  <div class="k">📍 Lausanne, 19 h</div>
  <div class="s">Ton bailleur… <span class="red">dans ton salon</span></div>
  <div class="s blue" data-fx="rise" data-at="{T['garde']:.3f}">avec un double des clés 🔑</div>
  <div class="v" data-fx="stamp" data-rot="0" data-at="{T['droit']:.3f}">Il a le droit ?</div>
</div>

<div class="card" {C(T['non'], T['seul'])}>
  <div class="v red" style="font-size:190px" data-fx="stamp" data-rot="-6" data-at="{T['non']:.3f}">NON.</div>
  <div class="s" data-fx="rise" data-at="{T['domicile']:.3f}">ton appart = <span class="red">ton domicile</span></div>
  <div class="k" data-fx="rise" data-at="{T['meme'] + 0.2:.3f}">même s'il est propriétaire</div>
</div>

<div class="card" {C(T['seul'], T['prev'])}>
  <div class="k">il peut venir seulement si c'est</div>
  <div class="v">nécessaire</div>
  <div class="chips">
    <span data-fx="pop" data-at="{T['travaux'] + 0.2:.3f}">🔧 travaux</span>
    <span data-fx="pop" data-at="{T['entretien']:.3f}">🧰 entretien</span>
    <span data-fx="pop" data-at="{T['vente']:.3f}">🏷️ vente</span>
    <span data-fx="pop" data-at="{T['reloc']:.3f}">🔑 relocation</span>
  </div>
</div>

<div class="card" {C(T['prev'], T['accord'])}>
  <div class="v" style="font-size:150px" data-fx="pop" data-at="{T['prev']:.3f}">📅</div>
  <div class="s">il doit te <span class="blue">prévenir à temps</span></div>
  <div class="k" data-fx="rise" data-at="{T['interets']:.3f}">et tenir compte de tes intérêts</div>
</div>

<div class="card" {C(T['accord'], T['art'])} style="background:#2a0b0b;color:#fff">
  <div class="k" style="color:#ffb4b4">🚨 il entre sans ton accord ?</div>
  <div class="v" style="font-size:84px" data-fx="stamp" data-rot="-3" data-at="{T['violation']:.3f}">violation de domicile</div>
  <div class="s" style="color:#ffb4b4" data-fx="rise" data-at="{T['infraction']:.3f}">possible · infraction pénale</div>
</div>

<div class="card" {C(T['art'], T['envoie'])}>
  <div class="k">la loi</div>
  <div class="v" style="font-size:88px">Art. 257h CO</div>
  <div class="v red" style="font-size:88px" data-fx="rise" data-at="{T['art'] + 1.4:.3f}">Art. 186 CP</div>
</div>

<div class="card" data-fx="pop" data-at="{T['envoie']:.3f}">
  <div class="s">📤 Envoie ça à un ami locataire</div>
  <div class="brand" data-fx="zoom" data-at="{T['thrax']:.3f}">Thrax <span>Legal</span></div>
  <div class="k" data-fx="rise" data-at="{T['thrax'] + 0.4:.3f}">lien en bio</div>
</div>
"""


SCRIPT_T = r"""
(function(){
  var T0 = __T__;
  var T = THREE, cv = document.getElementById('gl'), alarm = document.getElementById('alarm');
  var r = new T.WebGLRenderer({canvas: cv, antialias: true, preserveDrawingBuffer: true});
  r.setSize(1080, 1920, false); r.shadowMap.enabled = true; r.shadowMap.type = T.PCFSoftShadowMap;
  var sc = new T.Scene(); sc.background = new T.Color('#efe6d8');
  var cam = new T.PerspectiveCamera(40, 1080 / 1920, 0.1, 100);
  sc.add(new T.HemisphereLight('#fff6e8', '#8a7560', 1.3));
  var sun = new T.DirectionalLight('#fff1dc', 2.0); sun.position.set(3, 8, 6); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048); sun.shadow.camera.left = -6; sun.shadow.camera.right = 6; sun.shadow.camera.top = 6; sun.shadow.camera.bottom = -6; sc.add(sun);
  var redL = new T.PointLight('#ff2a2a', 0, 14), blueL = new T.PointLight('#2a5bff', 0, 14);
  redL.position.set(-2.5, 4, 2); blueL.position.set(2.5, 4, 2); sc.add(redL); sc.add(blueL);
  function toon(c){ return new T.MeshToonMaterial({color: c}); }
  function std(c, m, ro){ return new T.MeshStandardMaterial({color: c, metalness: m || 0, roughness: ro === undefined ? 0.6 : ro}); }
  function box(w, h, d, m, x, y, z, parent){ var o = new T.Mesh(new T.BoxGeometry(w, h, d), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; (parent || sc).add(o); return o; }
  // Room
  var floor = new T.Mesh(new T.PlaneGeometry(30, 30), toon('#c99a6b')); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; sc.add(floor);
  for (var i = -6; i <= 6; i++) box(0.03, 0.005, 30, toon('#b0855a'), i * 0.9, 0.003, 12);
  box(14, 9, 0.2, toon('#f3ead9'), 0, 4.5, -3.2);
  box(14, 0.25, 0.1, toon('#d8c9b0'), 0, 0.12, -3.05);
  // Door (open)
  box(1.4, 2.7, 0.12, toon('#6b4a2f'), -1.9, 1.35, -3.08);
  box(1.15, 2.5, 0.05, toon('#3b2a1c'), -1.9, 1.25, -3.0);
  var door = new T.Group(); door.position.set(-2.47, 0, -2.95); sc.add(door);
  box(1.1, 2.45, 0.08, toon('#8b5e3c'), 0.55, 1.23, 0, door); door.rotation.y = -1.2;
  // Window with lake view
  box(1.9, 1.5, 0.1, toon('#ffffff'), 1.3, 3.0, -3.08);
  box(1.7, 0.7, 0.05, toon('#9fd3f2'), 1.3, 3.38, -3.02);
  box(1.7, 0.6, 0.05, toon('#3d8cc4'), 1.3, 2.62, -3.02);
  [[0.75, 0.5], [1.25, 0.65], [1.8, 0.45]].forEach(function(m){ var c = new T.Mesh(new T.ConeGeometry(0.32, m[1], 4), toon('#7d8fa3')); c.position.set(m[0], 2.9 + m[1] / 2, -3.0); sc.add(c);
    var s = new T.Mesh(new T.ConeGeometry(0.12, m[1] * 0.35, 4), toon('#ffffff')); s.position.set(m[0], 2.9 + m[1] - m[1] * 0.17, -2.98); sc.add(s); });
  box(0.06, 1.5, 0.06, toon('#ffffff'), 1.3, 3.0, -2.98);
  // Sofa
  var sofa = toon('#3d6b8c');
  box(2.6, 0.5, 1.0, sofa, 1.5, 0.45, -2.3); box(2.6, 0.9, 0.3, sofa, 1.5, 1.05, -2.75);
  box(0.3, 0.75, 1.0, sofa, 0.35, 0.6, -2.3); box(0.3, 0.75, 1.0, sofa, 2.65, 0.6, -2.3);
  box(0.6, 0.45, 0.2, toon('#e9b44c'), 0.9, 0.95, -2.5);
  // Lamp + plant
  var lp = new T.Mesh(new T.CylinderGeometry(0.04, 0.04, 2.2, 12), std('#333333', 0.6, 0.4)); lp.position.set(-0.4, 1.1, -2.6); sc.add(lp);
  var sh = new T.Mesh(new T.ConeGeometry(0.4, 0.5, 24, 1, true), new T.MeshStandardMaterial({color: '#fff2c4', emissive: '#ffcf6b', emissiveIntensity: 0.6, side: T.DoubleSide})); sh.position.set(-0.4, 2.3, -2.6); sc.add(sh);
  var pot = new T.Mesh(new T.CylinderGeometry(0.25, 0.2, 0.45, 16), toon('#c1502e')); pot.position.set(2.9, 0.22, -0.8); pot.castShadow = true; sc.add(pot);
  for (var i = 0; i < 6; i++) { var lf = new T.Mesh(new T.SphereGeometry(0.22, 12, 8), toon('#3f8f4a')); lf.scale.set(0.6, 1.4, 0.6); lf.position.set(2.9 + Math.cos(i) * 0.15, 0.75 + (i % 3) * 0.12, -0.8 + Math.sin(i) * 0.15); lf.rotation.z = Math.cos(i * 2) * 0.5; sc.add(lf); }
  var rug = new T.Mesh(new T.CircleGeometry(1.6, 48), toon('#d9cfc0')); rug.rotation.x = -Math.PI / 2; rug.position.set(0, 0.01, -0.4); rug.receiveShadow = true; sc.add(rug);
  // Figurines
  function fig(o){
    var g = new T.Group(); sc.add(g);
    function cap(rad, len, m){ var x = new T.Mesh(new T.CapsuleGeometry(rad, len, 6, 16), m); x.castShadow = true; return x; }
    function limb(px, py, rad, len, m){ var p = new T.Group(); p.position.set(px, py, 0); var x = cap(rad, len, m); x.position.y = -(len / 2 + rad * 0.6); p.add(x); g.add(p); return p; }
    var legL = limb(-0.2, 1.0, 0.17, 0.62, toon(o.legs)), legR = limb(0.2, 1.0, 0.17, 0.62, toon(o.legs));
    var torso = cap(0.42, 0.62, toon(o.top)); torso.position.y = 1.55; g.add(torso);
    var armL = limb(-0.55, 1.95, 0.12, 0.55, toon(o.top)), armR = limb(0.55, 1.95, 0.12, 0.55, toon(o.top));
    var head = new T.Group(); head.position.y = 2.58; g.add(head);
    var hd = new T.Mesh(new T.SphereGeometry(0.42, 32, 24), toon(o.skin)); hd.castShadow = true; head.add(hd);
    var hair = new T.Mesh(new T.SphereGeometry(0.44, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.42), toon(o.hair)); hair.rotation.x = -0.25; head.add(hair);
    [-0.15, 0.15].forEach(function(x){ var e = new T.Mesh(new T.SphereGeometry(0.055, 12, 8), toon('#141414')); e.position.set(x, 0.04, 0.39); head.add(e); });
    var mouth = box(0.16, 0.04, 0.03, toon('#7a2a22'), 0, -0.16, 0.4, head);
    if (o.mustache) box(0.3, 0.07, 0.05, toon(o.hair), 0, -0.08, 0.41, head);
    if (o.glasses) [-0.15, 0.15].forEach(function(x){ var gl = new T.Mesh(new T.TorusGeometry(0.1, 0.018, 8, 20), std('#222222', 0.5, 0.3)); gl.position.set(x, 0.04, 0.41); head.add(gl); });
    return {g: g, legL: legL, legR: legR, armL: armL, armR: armR, head: head, mouth: mouth};
  }
  var ten = fig({top: '#2fa36b', legs: '#2c3e66', skin: '#f1c7a5', hair: '#5a3825'});
  var lan = fig({top: '#b08d57', legs: '#5b5048', skin: '#e8b996', hair: '#c9c9c9', mustache: true, glasses: true});
  // Big golden key in landlord's raised hand
  var key = new T.Group(); var gold = std('#e8b64c', 0.85, 0.25);
  var bow = new T.Mesh(new T.TorusGeometry(0.2, 0.07, 12, 32), gold); bow.position.y = 0.42; key.add(bow);
  var shaft = new T.Mesh(new T.BoxGeometry(0.09, 0.7, 0.09), gold); key.add(shaft);
  [[-0.2, 0.1], [-0.32, 0.14]].forEach(function(b){ var tt = new T.Mesh(new T.BoxGeometry(b[1], 0.07, 0.09), gold); tt.position.set(b[1] / 2 + 0.04, b[0], 0); key.add(tt); });
  key.traverse(function(m){ m.castShadow = true; }); sc.add(key);
  // Exclamation above tenant
  var ex = new T.Group(); var exm = toon('#d62828');
  var exb = new T.Mesh(new T.BoxGeometry(0.14, 0.45, 0.14), exm); exb.position.y = 0.3; ex.add(exb);
  var exd = new T.Mesh(new T.SphereGeometry(0.09, 12, 8), exm); ex.add(exd); sc.add(ex);
  function cl(v){ return Math.max(0, Math.min(1, v)); }
  function eo(v){ v = cl(v); return 1 - Math.pow(1 - v, 3); }
  function lerp(a, b, u){ return a + (b - a) * u; }
  R.on(function(t){
    // Camera: dolly in, gentle orbit; closer during the violation beat
    var u = eo(t / 2.2), close = eo((t - T0.accord) / 0.8) * (1 - eo((t - T0.art) / 0.8));
    cam.position.set(Math.sin(t * 0.35) * 0.5 + lerp(0, 0.3, u), lerp(4.2, 3.3, u) - close * 0.3, lerp(16, 12.6, u) - close * 1.6);
    cam.lookAt(0, 1.85 - close * 0.15, 0);
    // Tenant walks in through the door
    var wu = cl(t / 1.5), walking = t < 1.5;
    ten.g.position.set(lerp(-1.9, -1.0, eo(wu)), 0, lerp(-2.7, 0.5, eo(wu)));
    ten.g.rotation.y = walking ? 0.15 : lerp(0.15, 0.75, eo((t - 1.5) / 0.4));
    var sw = walking ? Math.sin(t * 11) * 0.55 : 0;
    ten.legL.rotation.x = sw; ten.legR.rotation.x = -sw; ten.armL.rotation.x = -sw * 0.8; ten.armR.rotation.x = sw * 0.8;
    var shock = t > 1.2 && t < T0.non + 0.4;
    if (shock) { ten.armL.rotation.z = -0.9; ten.armR.rotation.z = 0.9; ten.armL.rotation.x = ten.armR.rotation.x = -0.4; }
    else if (t >= T0.non + 0.4 && t < T0.envoie) { ten.armL.rotation.z = lerp(-0.9, 0.35, eo((t - T0.non - 0.4) / 0.4)); ten.armR.rotation.z = -0.25; }
    else { ten.armL.rotation.z = 0; ten.armR.rotation.z = 0; }
    if (t >= T0.envoie) { ten.armR.rotation.z = 2.6 + Math.sin(t * 9) * 0.25; }
    ten.head.position.y = 2.58 + (shock ? Math.abs(Math.sin(t * 8)) * 0.04 : 0);
    ten.mouth.scale.set(shock ? 0.7 : 1, shock ? 4 : 1, 1);
    // Exclamation mark
    var es = t > 1.0 && t < T0.non + 0.3 ? eo((t - 1.0) / 0.25) : (t > T0.accord && t < T0.art ? eo((t - T0.accord) / 0.25) : 0);
    ex.scale.setScalar(Math.max(0.001, es)); ex.position.set(ten.g.position.x - 0.7, 2.75 + Math.sin(t * 6) * 0.06, ten.g.position.z + 0.2);
    // Landlord: shows the key, then gets told off, then leaves
    var leave = eo((t - T0.envoie - 0.2) / 2.2);
    lan.g.position.set(lerp(1.0, -1.9, leave), 0, lerp(-0.1, -2.8, leave));
    lan.g.rotation.y = leave > 0 && leave < 1 ? lerp(-0.4, -2.6, eo((t - T0.envoie - 0.2) / 0.4)) : -0.4;
    var lsw = leave > 0 && leave < 1 ? Math.sin(t * 11) * 0.5 : 0;
    lan.legL.rotation.x = lsw; lan.legR.rotation.x = -lsw;
    var proud = t < T0.non;
    lan.armR.rotation.x = 0; lan.armR.rotation.z = proud ? 2.3 + Math.sin(t * 3) * 0.12 : lerp(2.3, 0.15, eo((t - T0.non) / 0.5));
    lan.armL.rotation.x = 0; lan.armL.rotation.z = proud ? -0.2 : -0.5;
    lan.head.rotation.x = proud ? -0.1 : lerp(-0.1, 0.25, eo((t - T0.non) / 0.5));
    lan.mouth.scale.set(proud ? 1.6 : 0.8, proud ? 2 : 1, 1);
    // Key: in hand, then confiscated (flies to the tenant)
    lan.armR.updateMatrixWorld(true);
    var hand = new T.Vector3(0, -0.95, 0.1).applyMatrix4(lan.armR.matrixWorld);
    var fly = eo((t - T0.non - 0.1) / 0.7);
    var tgt = new T.Vector3(ten.g.position.x + 0.45, 1.6, ten.g.position.z + 0.35);
    key.position.set(lerp(hand.x, tgt.x, fly), lerp(hand.y, tgt.y, fly) + Math.sin(fly * Math.PI) * 1.2, lerp(hand.z, tgt.z, fly));
    key.rotation.set(0, t * 2.2, fly * 0.8); key.scale.setScalar(lerp(1.5, 0.9, fly));
    // Alarm lights during the violation beat
    var al = t >= T0.accord && t < T0.art ? 1 : 0;
    var ph = Math.sin(t * 9);
    redL.intensity = al * (ph > 0 ? 60 : 8); blueL.intensity = al * (ph > 0 ? 8 : 60);
    alarm.style.opacity = al * (0.55 + 0.45 * Math.max(0, ph));
    // Door swings closed when the landlord has left
    door.rotation.y = lerp(-1.2, -0.05, eo((t - T0.envoie - 2.0) / 0.5));
    r.render(sc, cam);
  });
})();
"""
PUNCH = []
SFX = []
TAIL = 2.0
CAP_MAX = 3
