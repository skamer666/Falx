"""Reel 024 — « 23:47 » : mini-thriller en 3D. Léa (Lausanne) reçoit un commandement de payer de 8'400 CHF d'une société
qu'elle ne connaît pas ; elle appelle Marc, de Thrax Legal, qui retourne la situation en trois révélations vraies :
(1) en Suisse, n'importe qui peut lancer une poursuite sans prouver sa créance ; (2) le jour de réception ne compte pas
dans le délai d'opposition de 10 jours (art. 74 et 31 LP) ; (3) une phrase suffit, sans motif (art. 75 LP), à remettre à
la poste au plus tard le dernier jour (art. 32 LP), et dans trois mois elle peut demander que la poursuite ne figure plus
sur son extrait si rien n'a été lancé (art. 8a al. 3 let. d LP). Chute : « la plupart des gens paient, juste pour avoir
la paix ». Montage alterné cuisine / bureau, inserts (commandement, calendrier, écran), DOF + bloom + grain.
Histoire fictive, affichée comme telle. Marc n'est présenté ni comme avocat ni comme juriste."""
import json

USE_THREE = True
ASSETS = ["media/crest-dark-256.png"]
VOICES = {"lea": ("fr-FR-VivienneMultilingualNeural", "+8%"), "marc": ("fr-CH-FabriceNeural", "+12%")}
GAP = 0.2
LINES = [
    ("lea", "Marc, je viens de recevoir un commandement de payer. Huit mille quatre cents francs !"),
    ("marc", "De qui ?"),
    ("lea", "D'une société que je ne connais même pas !"),
    ("marc", "En Suisse, n'importe qui peut poursuivre n'importe qui. Sans preuve."),
    ("lea", "Quoi ?"),
    ("marc", "Tu l'as reçu quand ?"),
    ("lea", "Le quatre. J'avais dix jours… on est le treize. C'est fichu."),
    ("marc", "Non. Le jour où tu l'as reçu ne compte pas. Tu as jusqu'à demain.", 0.45),
    ("lea", "Et je dois prouver que je ne leur dois rien ?"),
    ("marc", "Non. Une seule phrase suffit : je fais opposition."),
    ("marc", "Tu la postes demain, et c'est à eux d'aller devant le juge.", 0.25),
    ("lea", "Et ça restera sur mon extrait des poursuites ?"),
    ("marc", "Dans trois mois, s'ils n'ont rien lancé, tu demandes qu'elle n'y apparaisse plus."),
    ("lea", "Pourquoi personne ne sait ça ?"),
    ("marc", "Parce que la plupart des gens paient. Juste pour avoir la paix.", 0.55),
]

META = {
    "id": "r024-commandement-thriller",
    "music": "tension",
    "music_gain": -8,
    "room": -32,
    "vo_chain": True,
    "caption": ("📩 23:47. Un commandement de payer de 8'400 francs, d'une société que tu ne connais pas. (histoire fictive)\n\n"
                "1️⃣ En Suisse, l'office des poursuites ne vérifie pas si la dette existe : n'importe qui peut lancer une poursuite.\n"
                "2️⃣ Tu as 10 jours pour faire opposition (art. 74 LP). Le jour où tu reçois le commandement ne compte pas (art. 31 LP). "
                "Si le dernier jour tombe un samedi, un dimanche ou un jour férié, le délai passe au jour ouvrable suivant.\n"
                "3️⃣ Pas besoin de motiver l'opposition (art. 75 LP) : « Je fais opposition » suffit, par écrit à l'office ou directement à la personne "
                "qui te remet le commandement. Par la poste, elle doit être remise au plus tard le dernier jour (art. 32 LP).\n"
                "4️⃣ Ensuite, c'est au créancier de saisir le juge pour faire lever l'opposition.\n"
                "5️⃣ Trois mois après la notification, si aucune procédure n'a été introduite, tu peux demander que la poursuite ne soit plus "
                "communiquée aux tiers (art. 8a al. 3 let. d LP).\n\n"
                "⚠️ Si tu dois vraiment l'argent, l'opposition ne fait que retarder les choses (et peut coûter plus cher).\n\n"
                "Thrax Legal, le juridique à prix fixe en Suisse romande. Lien en bio.\n\n"
                "#poursuite #commandementdepayer #opposition #lausanne #suisse #suisseromande #argent #droit #lesaviezvous"),
    "yt_title": "23:47 : un commandement de payer de 8'400 CHF… d'une société inconnue #shorts",
    "tiktok_title": "Commandement de payer d'une société inconnue ? Ne paie pas tout de suite 😳",
    "first_comment": "Tu savais que n'importe qui pouvait te poursuivre sans preuve ? 👇",
    "tags": ["commandement de payer", "opposition", "art. 74 LP", "poursuite", "Lausanne"],
    "genome": {"style": "3d-thriller-nuit-montage-alterne (personnages lisses, DOF, bloom, grain)",
               "palette": "cuisine ambre / bureau bleu nuit / rouge alerte", "hook": "23:47 + 8'400 CHF + société inconnue",
               "format": "appel téléphonique, 3 révélations, chute", "topic": "argent/poursuite",
               "mascot": "Léa (indépendante) + Marc (Thrax Legal)", "voice": "Vivienne + Fabrice",
               "captions": "phrase, bande 31-43 %", "music": "tension (bas) + ambiance", "length": "~45s"},
    "cover_t": 0.0,
}

CSS = """
#root { background: #000; color:#fff; }
#gl { position:absolute; left:0; top:0; width:1080px; height:1920px; }
.cap { display:none; }
#subwrap { position:absolute; left:0; right:0; top:600px; height:224px; display:flex; align-items:center; justify-content:center; pointer-events:none;
           background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,0,0,0.25), rgba(0,0,0,0)); }
#sub { max-width:900px; text-align:center; font-size:58px; font-weight:700; line-height:1.16; color:#f6f4f0; text-wrap: balance;
       text-shadow: 0 2px 20px rgba(0,0,0,.8), 0 1px 4px rgba(0,0,0,.7); }
#sub.m { color:#cfe3ff; }
#tag { position:absolute; left:0; right:0; top:70px; display:flex; flex-direction:column; align-items:center; gap:12px; pointer-events:none; }
#tag .t { font-size:64px; font-weight:800; letter-spacing:0.04em; color:#ff5a4f; text-shadow:0 0 30px rgba(255,60,50,0.6); font-variant-numeric: tabular-nums; }
#tag .p { font-size:34px; font-weight:700; color:#e9e3d8; text-shadow:0 2px 10px #000; }
#tag .f { font-size:26px; font-weight:700; color:#cfc6b8; border:2px dashed rgba(207,198,184,0.6); border-radius:10px; padding:4px 14px; }
#who { position:absolute; left:60px; top:1530px; font-size:34px; font-weight:800; color:#fff; padding:8px 18px; border-left:6px solid #9cc4ff;
       background:rgba(0,0,0,0.45); pointer-events:none; }
#endc { position:absolute; inset:0; background:#050608; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; opacity:0; }
#endc img { width:220px; height:220px; border-radius:50%; box-shadow:0 0 60px rgba(160,190,255,0.25); }
#endc .b { font-size:112px; font-weight:900; letter-spacing:-0.05em; }
#endc .s { font-size:42px; font-weight:700; color:#d9d3c8; }
#endc .l { font-size:28px; font-weight:600; color:#8f8a82; margin-top:24px; }
#crest { position:absolute; width:1px; height:1px; opacity:0; }
"""

# Shot per line: [shot, (word index in the line, insert shot), ...]
CUTS = [
    ("leaHook", [(9, "paper")]),
    ("marcIntro", []),
    ("leaCU", []),
    ("marcCU", []),
    ("leaECU", []),
    ("marcMed", []),
    ("leaWide", [(3, "cal")]),
    ("marcCU2", [(10, "calRed")]),
    ("leaCU2", []),
    ("marcType", [(5, "screen")]),
    ("marcWide", []),
    ("leaMed", []),
    ("marcCU", []),
    ("leaCU", []),
    ("marcEnd", [(-1, "leaReact")]),
]


def chunks(words, lines):
    out = []
    for k, ln in enumerate(lines):
        ws = [w for w in words if w.get("ln") == k]
        cur = []
        for i, w in enumerate(ws):
            cur.append(w)
            txt = " ".join(x["w"] for x in cur)
            nxt = ws[i + 1] if i + 1 < len(ws) else None
            gap = (nxt["t0"] - w["t1"]) if nxt else 9
            end = w["w"][-1:] in ".?!…:" and len(txt) > 14
            long_ = nxt and len(txt + " " + nxt["w"]) > 44 and (w["w"][-1:] in ",;" or len(txt) > 28)
            if not nxt or end or gap > 0.5 or long_:
                out.append({"t0": cur[0]["t0"] - 0.03, "t1": cur[-1]["t1"] + (0.42 if not nxt else 0.32), "text": txt, "spk": ln["spk"]})
                cur = []
    for i in range(len(out)):
        if i + 1 < len(out):
            out[i]["t1"] = min(max(out[i]["t1"], out[i]["t0"] + 0.7), out[i + 1]["t0"] - 0.03)
    out[0]["t0"] = 0.0
    return out


def body(w):
    L = w.lines
    words = w.words
    cuts = []
    for k, (shot, ins) in enumerate(CUTS):
        cuts.append([max(0.0, L[k]["t0"] - 0.02), shot])
        lw = [x for x in words if x.get("ln") == k]
        for wi, s in ins:
            cuts.append([L[k]["t1"] + 0.1 if wi < 0 else lw[min(wi, len(lw) - 1)]["t0"] - 0.02, s])
    end = round(L[-1]["t1"] + 0.95, 3)
    T = {"lines": [[l["t0"], l["t1"], l["spk"]] for l in L], "cuts": cuts, "end": end, "subs": chunks(words, L),
         "typeT": [x for x in words if x.get("ln") == 9][5]["t0"], "red": [x for x in words if x.get("ln") == 7][10]["t0"]}
    globals()["SCRIPT"] = SCRIPT_T.replace("__T__", json.dumps(T, ensure_ascii=False))
    globals()["SFX"] = [{"t": T["red"] + 0.1, "k": "stamp", "g": 0.6}, {"t": end, "k": "impact", "g": 0.5}]
    return """
<canvas id="gl" width="1080" height="1920"></canvas>
<img id="crest" src="assets/crest-dark-256.png" alt="">
<div id="tag"><div class="t">23:47</div><div class="p">📍 Lausanne</div><div class="f">histoire fictive</div></div>
<div id="who"></div>
<div id="subwrap"><div id="sub"></div></div>
<div id="endc"><img src="assets/crest-dark-256.png" alt=""><div class="b">Thrax Legal</div>
  <div class="s">Le juridique à prix fixe, en Suisse romande</div>
  <div class="l">Histoire fictive · art. 31, 32, 74, 75 et 8a LP</div></div>
"""


SCRIPT_T = r"""
(function(){
  var T = __T__, TH = THREE, RE = window.REEL, W = 1080, H = 1920;
  var cv = document.getElementById('gl'), subEl = document.getElementById('sub'), tagEl = document.getElementById('tag'),
      whoEl = document.getElementById('who'), endEl = document.getElementById('endc');
  var r = new TH.WebGLRenderer({canvas: cv, antialias: false, preserveDrawingBuffer: true});
  r.setPixelRatio(1); r.setSize(W, H, false); r.toneMapping = TH.NoToneMapping; r.outputColorSpace = TH.LinearSRGBColorSpace;
  r.shadowMap.enabled = true; r.shadowMap.type = TH.PCFSoftShadowMap;
  var sc = new TH.Scene(); sc.background = new TH.Color(0x020306); sc.fog = new TH.Fog(0x020306, 7, 22);
  var cam = new TH.PerspectiveCamera(30, W / H, 0.05, 60);

  // ---------- post chain ----------
  var depthTex = new TH.DepthTexture(W, H); depthTex.type = TH.UnsignedIntType;
  var rtScene = new TH.WebGLRenderTarget(W, H, {type: TH.HalfFloatType, samples: 4, depthTexture: depthTex});
  function RT(w, h){ return new TH.WebGLRenderTarget(w, h, {type: TH.HalfFloatType}); }
  var rtDof = RT(W, H), b1 = RT(W / 4, H / 4), b1b = RT(W / 4, H / 4), b2 = RT(W / 8, H / 8), b2b = RT(W / 8, H / 8);
  var quad = new TH.Mesh(new TH.PlaneGeometry(2, 2)); quad.frustumCulled = false;
  var qs = new TH.Scene(); qs.add(quad); var qc = new TH.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  function pass(m, tgt){ quad.material = m; r.setRenderTarget(tgt); r.render(qs, qc); }
  var VERT = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }';
  function SM(u, fs){ return new TH.ShaderMaterial({uniforms: u, vertexShader: VERT, fragmentShader: fs, depthTest: false, depthWrite: false}); }
  var dofM = SM({tColor: {value: rtScene.texture}, tDepth: {value: depthTex}, uRes: {value: new TH.Vector2(W, H)}, uNear: {value: cam.near},
    uFar: {value: cam.far}, uFocus: {value: 2}, uAperture: {value: 30}, uMaxCoc: {value: 20}}, [
    'uniform sampler2D tColor, tDepth; uniform vec2 uRes; uniform float uNear, uFar, uFocus, uAperture, uMaxCoc; varying vec2 vUv;',
    'float lin(float d){ float z = d * 2. - 1.; return 2. * uNear * uFar / (uFar + uNear - z * (uFar - uNear)); }',
    'float cocOf(float z){ return min(uMaxCoc, uAperture * abs(1. / uFocus - 1. / z)); }',
    'void main(){ float z0 = lin(texture2D(tDepth, vUv).x); float c0 = cocOf(z0);',
    '  vec3 acc = texture2D(tColor, vUv).rgb / max(c0 * c0, 1.0); float ws = 1.0 / max(c0 * c0, 1.0);',
    '  for (int i = 0; i < 36; i++) { float fi = float(i) + 0.5; float rr = sqrt(fi / 36.0); float a = fi * 2.39996323;',
    '    vec2 off = vec2(cos(a), sin(a)) * rr * uMaxCoc; float dist = length(off); vec2 uv = vUv + off / uRes;',
    '    float zs = lin(texture2D(tDepth, uv).x); float cs = cocOf(zs); float eff = (zs > z0) ? min(cs, c0) : cs;',
    '    float w = smoothstep(dist - 1.0, dist + 1.0, eff) / max(eff * eff, 1.0);',
    '    vec3 s = texture2D(tColor, uv).rgb; float lum = dot(s, vec3(0.3, 0.5, 0.2)); w *= 1.0 + 1.6 * clamp(lum - 0.8, 0.0, 6.0);',
    '    acc += s * w; ws += w; }',
    '  gl_FragColor = vec4(acc / ws, 1.0); }'].join('\n'));
  var brightM = SM({tColor: {value: null}}, 'uniform sampler2D tColor; varying vec2 vUv; void main(){ vec3 c = texture2D(tColor, vUv).rgb; float m = max(c.r, max(c.g, c.b)); gl_FragColor = vec4(c * clamp((m - 1.6) / max(m, 1e-3), 0., 1.), 1.); }');
  var blurM = SM({tColor: {value: null}, uDir: {value: new TH.Vector2()}}, [
    'uniform sampler2D tColor; uniform vec2 uDir; varying vec2 vUv;',
    'void main(){ float w[7]; w[0]=0.2270; w[1]=0.1946; w[2]=0.1216; w[3]=0.0540; w[4]=0.0162; w[5]=0.0054; w[6]=0.0016;',
    '  vec3 c = texture2D(tColor, vUv).rgb * w[0];',
    '  for (int i = 1; i < 7; i++) { vec2 o = uDir * float(i) * 1.6; c += (texture2D(tColor, vUv + o).rgb + texture2D(tColor, vUv - o).rgb) * w[i]; }',
    '  gl_FragColor = vec4(c, 1.); }'].join('\n'));
  var compM = SM({tColor: {value: rtDof.texture}, tB1: {value: b1.texture}, tB2: {value: b2.texture}, uTime: {value: 0}, uTint: {value: new TH.Vector3(1, 1, 1)}}, [
    'uniform sampler2D tColor, tB1, tB2; uniform float uTime; uniform vec3 uTint; varying vec2 vUv;',
    'vec3 aces(vec3 x){ return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0., 1.); }',
    'float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }',
    'void main(){ vec2 d = vUv - 0.5; float ca = 0.004 * dot(d, d);',
    '  vec3 col = vec3(texture2D(tColor, vUv + d * ca).r, texture2D(tColor, vUv).g, texture2D(tColor, vUv - d * ca).b);',
    '  col += 0.36 * texture2D(tB1, vUv).rgb + 0.55 * texture2D(tB2, vUv).rgb;',
    '  col = aces(col * 1.1) * uTint; col = pow(col, vec3(1.0 / 2.2));',
    '  float v = smoothstep(0.95, 0.3, length(d * vec2(1.0, 0.72))); col *= mix(0.66, 1.0, v);',
    '  col += (hash(vUv * vec2(1080., 1920.) + fract(uTime * 7.31)) - 0.5) * 0.03;',
    '  gl_FragColor = vec4(col, 1.); }'].join('\n'));
  function post(t){
    pass(dofM, rtDof);
    brightM.uniforms.tColor.value = rtDof.texture; pass(brightM, b1);
    function blur(src, dst, w, h, dx, dy){ blurM.uniforms.tColor.value = src.texture; blurM.uniforms.uDir.value.set(dx / w, dy / h); pass(blurM, dst); }
    blur(b1, b1b, W / 4, H / 4, 1, 0); blur(b1b, b1, W / 4, H / 4, 0, 1);
    blurM.uniforms.tColor.value = b1.texture; blurM.uniforms.uDir.value.set(0, 0); pass(blurM, b2);
    for (var k = 0; k < 2; k++) { blur(b2, b2b, W / 8, H / 8, 1, 0); blur(b2b, b2, W / 8, H / 8, 0, 1); }
    compM.uniforms.uTime.value = t; pass(compM, null);
  }

  // ---------- helpers ----------
  function rnd(i, k){ var x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x); }
  function cl(v){ return Math.max(0, Math.min(1, v)); }
  function ss(x){ x = cl(x); return x * x * x * (x * (x * 6 - 15) + 10); }
  function S(c, o){ return new TH.MeshStandardMaterial(Object.assign({color: c, roughness: 0.62}, o || {})); }
  function F(c, o){ return new TH.MeshStandardMaterial(Object.assign({color: c, roughness: 0.8, flatShading: true}, o || {})); }
  function mesh(g, m, x, y, z, p){ var o = new TH.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; (p || sc).add(o); return o; }
  var V3 = function(a){ return new TH.Vector3(a[0], a[1], a[2]); };
  function seg(a, b, r0, m, p){ var A = V3(a), B = V3(b), L = A.distanceTo(B);
    var o = mesh(new TH.CapsuleGeometry(r0, Math.max(0.001, L), 6, 14), m, 0, 0, 0, p); o.position.copy(A).add(B).multiplyScalar(0.5);
    o.quaternion.setFromUnitVectors(new TH.Vector3(0, 1, 0), B.clone().sub(A).normalize()); return o; }
  function canvasTex(w, h){ var c = document.createElement('canvas'); c.width = w; c.height = h; var t = new TH.CanvasTexture(c); t.colorSpace = TH.SRGBColorSpace; t.anisotropy = 8; return {c: c, g: c.getContext('2d'), t: t}; }
  function glowTex(c0){ var o = canvasTex(64, 64), g = o.g, gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, c0); gr.addColorStop(0.4, c0); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64); o.t.needsUpdate = true; return o.t; }
  function envAt(t){ var i = t * 30, i0 = Math.max(0, Math.min(RE.env.length - 1, Math.floor(i))), i1 = Math.min(RE.env.length - 1, i0 + 1), f = i - Math.floor(i);
    return t < 0 || t > RE.vo_dur ? 0 : (RE.env[i0] || 0) * (1 - f) + (RE.env[i1] || 0) * f; }
  function envAvg(t, w){ var s = 0; for (var k = 0; k < 6; k++) s += envAt(t - w / 2 + w * k / 5); return s / 6; }
  var warm = glowTex('rgba(255,210,150,1)'), cool = glowTex('rgba(150,190,255,1)');
  function bokeh(cx, cz, n, seed, wfrac){ for (var i = 0; i < n; i++) { var sm = new TH.SpriteMaterial({map: rnd(i, seed) < wfrac ? warm : cool, transparent: true,
      depthWrite: false, fog: false, opacity: 0.35 + rnd(i, seed + 1) * 0.6, blending: TH.AdditiveBlending}); sm.color.setScalar(1.7);
    var sp = new TH.Sprite(sm), z = cz - 1 - rnd(i, seed + 2) * 8, s = 0.05 + rnd(i, seed + 3) * 0.1 + (cz - z) * 0.012;
    sp.position.set(cx + (rnd(i, seed + 4) - 0.5) * 9, 0.3 + rnd(i, seed + 5) * 4.5, z); sp.scale.set(s, s, 1); sc.add(sp); } }

  // ---------- characters ----------
  function makeHead(o){
    var h = new TH.Group(), skin = S(o.skin, {roughness: 0.82, emissive: o.skin, emissiveIntensity: 0.14});
    mesh(new TH.SphereGeometry(0.2, 48, 36), skin, 0, 0, 0, h).scale.set(0.95, 1.04, 0.97);
    mesh(new TH.SphereGeometry(0.155, 40, 28), skin, 0, -0.075, 0.035, h).scale.set(0.97, 0.86, 0.95);
    [-1, 1].forEach(function(s){ mesh(new TH.SphereGeometry(0.042, 16, 12), skin, s * 0.186, -0.01, -0.005, h).scale.set(0.45, 1, 0.8);
      var ck = new TH.Mesh(new TH.CircleGeometry(0.032, 20), new TH.MeshStandardMaterial({color: o.cheek, roughness: 0.9, transparent: true, opacity: 0.45})); ck.position.set(s * 0.11, -0.048, 0.163); ck.rotation.y = s * 0.55; h.add(ck); });
    mesh(new TH.SphereGeometry(0.026, 20, 14), skin, 0, -0.022, 0.197, h).scale.set(0.9, 0.95, 1.0);
    var eyes = [], lids = [], brows = [];
    var eyeM = S(0x0b0b0e, {roughness: 0.18});
    [-1, 1].forEach(function(s){
      var e = new TH.Group(); e.position.set(s * 0.07, 0.03, 0.172); h.add(e);
      var ball = mesh(new TH.SphereGeometry(0.026, 24, 18), eyeM, 0, 0, 0, e); ball.scale.set(0.8, 1.15, 0.45);
      var hl = new TH.Mesh(new TH.SphereGeometry(0.0062, 10, 8), new TH.MeshBasicMaterial({color: 0xffffff})); hl.position.set(0.006, 0.01, 0.011); e.add(hl);
      var b = mesh(new TH.CapsuleGeometry(0.0075, 0.042, 4, 8), S(o.brow, {roughness: 0.9}), s * 0.072, 0.088, 0.178, h); b.rotation.z = Math.PI / 2 - s * 0.08;
      eyes.push(e); lids.push(e); brows.push(b); });
    var mouth = new TH.Group(); mouth.position.set(0, -0.095, 0.178); h.add(mouth);
    var inner = mesh(new TH.SphereGeometry(0.022, 20, 12), S(0x3a1212, {roughness: 0.6}), 0, 0, 0, mouth); inner.scale.set(1.35, 0.18, 0.45);
    h.traverse(function(m){ if (m.isMesh) { m.receiveShadow = false; m.castShadow = false; } });
    return {g: h, eyes: eyes, lids: lids, brows: brows, inner: inner, skin: skin, mouth: mouth};
  }
  function talk(hd, open){ hd.inner.scale.y = 0.18 + open * 0.95; hd.inner.scale.x = 1.35 - open * 0.25; }
  function blink(hd, t, ph){ var c = ((t + ph) % 3.9); var b = c < 0.07 ? c / 0.07 : c < 0.15 ? 1 - (c - 0.07) / 0.08 : 0;
    hd.eyes.forEach(function(e){ e.scale.y = 1 - 0.88 * b; }); }

  // Léa: cream knit sweater, chestnut hair with a loose bun, phone at the right ear.
  var lea = new TH.Group(); sc.add(lea);
  (function(){
    var sw = S(0xd9c8ae, {roughness: 0.95}), skin = S(0xdcae92, {roughness: 0.8}), hair = S(0x2e1a0e, {roughness: 0.85}), jeans = S(0x2f3f5c, {roughness: 0.85});
    mesh(new TH.CapsuleGeometry(0.17, 0.12, 8, 16), jeans, 0, 0.56, 0.0, lea).scale.set(1.25, 1, 1.05);
    [-1, 1].forEach(function(s){ seg([s * 0.1, 0.53, 0.05], [s * 0.11, 0.52, 0.42], 0.075, jeans, lea); seg([s * 0.11, 0.52, 0.42], [s * 0.11, 0.08, 0.46], 0.062, jeans, lea);
      mesh(new TH.CapsuleGeometry(0.05, 0.1, 6, 10), S(0x1e1e22), s * 0.11, 0.05, 0.52, lea).rotation.x = Math.PI / 2; });
    var torso = mesh(new TH.CapsuleGeometry(0.19, 0.3, 10, 20), sw, 0, 0.88, 0, lea); torso.scale.set(1.12, 1, 0.82);
    mesh(new TH.TorusGeometry(0.085, 0.035, 10, 20), sw, 0, 1.1, 0, lea).rotation.x = Math.PI / 2;
    mesh(new TH.CylinderGeometry(0.055, 0.06, 0.1, 14), skin, 0, 1.15, 0, lea);
    // left arm: hand resting on the table near the paper
    seg([-0.21, 1.03, 0], [-0.25, 0.8, 0.12], 0.06, sw, lea); seg([-0.25, 0.8, 0.12], [-0.13, 0.785, 0.38], 0.052, sw, lea);
    var lh = new TH.Group(); lh.position.set(-0.11, 0.775, 0.45); lea.add(lh);
    mesh(new TH.SphereGeometry(0.045, 16, 12), skin, 0, 0, 0, lh).scale.set(1, 0.45, 1.2);
    for (var f = 0; f < 4; f++) seg([-0.03 + f * 0.02, 0, 0.04], [-0.032 + f * 0.021, -0.008, 0.075], 0.009, skin, lh);
    // right arm: phone at the ear
    seg([0.21, 1.03, 0], [0.31, 0.8, 0.1], 0.06, sw, lea); seg([0.31, 0.8, 0.1], [0.215, 1.2, 0.05], 0.052, sw, lea);
    var rh = new TH.Group(); rh.position.set(0.2, 1.25, 0.045); lea.add(rh);
    mesh(new TH.SphereGeometry(0.043, 16, 12), skin, 0, 0, 0, rh).scale.set(0.5, 1.15, 1);
    var phone = mesh(new TH.BoxGeometry(0.012, 0.15, 0.074), S(0x15161a, {roughness: 0.25, metalness: 0.4}), 0.004, 0.06, 0.045, rh); phone.rotation.x = -0.35;
    window.__leaHead = makeHead({skin: 0xdcae92, lip: 0xc0706a, cheek: 0xe48a7a, iris: 0x5a3a1e, brow: 0x3a2010});
    var hd = window.__leaHead; hd.g.position.set(0, 1.36, 0.0); lea.add(hd.g);
    mesh(new TH.SphereGeometry(0.218, 48, 20, 0, Math.PI * 2, 0, Math.PI * 0.36), hair, 0, 0.0, -0.008, hd.g).scale.set(0.98, 1.08, 1.03);
    mesh(new TH.SphereGeometry(0.214, 48, 24, Math.PI, Math.PI, 0, Math.PI * 0.78), hair, 0, 0.0, -0.01, hd.g).scale.set(1.0, 1.05, 1.05);
    var bang = mesh(new TH.SphereGeometry(0.12, 28, 16), hair, -0.05, 0.165, 0.115, hd.g); bang.scale.set(1.3, 0.38, 0.6); bang.rotation.z = 0.28;
    var bang2 = mesh(new TH.SphereGeometry(0.09, 24, 14), hair, 0.1, 0.165, 0.1, hd.g); bang2.scale.set(1.0, 0.4, 0.55); bang2.rotation.z = -0.45;
    [-1, 1].forEach(function(s){ var lock = mesh(new TH.CapsuleGeometry(0.07, 0.2, 10, 16), hair, s * 0.175, -0.08, -0.03, hd.g); lock.rotation.z = s * 0.12; lock.scale.set(0.75, 1, 1.1); });
    mesh(new TH.SphereGeometry(0.09, 24, 16), hair, 0.0, 0.14, -0.19, hd.g);
  })();
  var LH = window.__leaHead;

  // Marc (Thrax Legal): white shirt, sleeves rolled, beard, square glasses, earbud.
  var marc = new TH.Group(); marc.position.set(30, 0, 0); sc.add(marc);
  (function(){
    var sh = S(0xdfe3ea, {roughness: 0.85}), skin = S(0xc99474, {roughness: 0.55}), hair = S(0x2b1c12, {roughness: 0.8}), pants = S(0x26282e, {roughness: 0.85});
    mesh(new TH.CapsuleGeometry(0.18, 0.12, 8, 16), pants, 0, 0.56, 0, marc).scale.set(1.25, 1, 1.05);
    [-1, 1].forEach(function(s){ seg([s * 0.11, 0.53, 0.05], [s * 0.12, 0.52, 0.44], 0.08, pants, marc); seg([s * 0.12, 0.52, 0.44], [s * 0.12, 0.08, 0.48], 0.065, pants, marc); });
    var torso = mesh(new TH.CapsuleGeometry(0.21, 0.32, 10, 20), sh, 0, 0.9, 0, marc); torso.scale.set(1.15, 1, 0.8);
    [-1, 1].forEach(function(s){ var c = mesh(new TH.BoxGeometry(0.09, 0.045, 0.015), sh, s * 0.05, 1.13, 0.1, marc); c.rotation.set(0.5, 0, s * 0.5); });
    mesh(new TH.CylinderGeometry(0.06, 0.065, 0.1, 14), skin, 0, 1.17, 0, marc);
    [-1, 1].forEach(function(s){
      seg([s * 0.23, 1.06, 0], [s * 0.3, 0.83, 0.15], 0.066, sh, marc);
      mesh(new TH.TorusGeometry(0.058, 0.02, 8, 16), sh, s * 0.3, 0.83, 0.15, marc).rotation.set(0.6, 0, s * 0.4);
      seg([s * 0.3, 0.83, 0.15], [s * 0.15, 0.79, 0.42], 0.05, skin, marc);
      var hnd = new TH.Group(); hnd.position.set(s * 0.13, 0.785, 0.48); marc.add(hnd); hnd.name = 'hand' + s;
      mesh(new TH.SphereGeometry(0.046, 16, 12), skin, 0, 0, 0, hnd).scale.set(1, 0.42, 1.2);
      for (var f = 0; f < 4; f++) { var fg = seg([-0.03 + f * 0.02, 0, 0.04], [-0.032 + f * 0.021, -0.01, 0.075], 0.0095, skin, hnd); fg.name = 'f'; }
    });
    window.__marcHead = makeHead({skin: 0xc99474, lip: 0xa86058, cheek: 0xc97a66, iris: 0x3b5a7a, brow: 0x24170e});
    var hd = window.__marcHead; hd.g.position.set(0, 1.39, 0); marc.add(hd.g);
    mesh(new TH.SphereGeometry(0.212, 48, 20, 0, Math.PI * 2, 0, Math.PI * 0.32), hair, 0, 0.012, -0.008, hd.g).scale.set(0.98, 1.05, 1.03);
    mesh(new TH.SphereGeometry(0.212, 48, 24, Math.PI, Math.PI, 0, Math.PI * 0.62), hair, 0, 0.0, -0.01, hd.g).scale.set(1.0, 1.03, 1.03);
    var bm = S(0x2e2016, {roughness: 0.95});
    var beard = mesh(new TH.SphereGeometry(0.162, 40, 24, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5), bm, 0, -0.055, 0.03, hd.g); beard.scale.set(1.0, 1.05, 1.0);
    var must = mesh(new TH.CapsuleGeometry(0.012, 0.05, 4, 10), bm, 0, -0.072, 0.188, hd.g); must.rotation.z = Math.PI / 2;
    hd.mouth.position.set(0, -0.1, 0.19);
    var gm = S(0x1a1a1c, {roughness: 0.3, metalness: 0.5});
    [-1, 1].forEach(function(s){ var ring = mesh(new TH.TorusGeometry(0.05, 0.006, 6, 4), gm, s * 0.068, 0.03, 0.2, hd.g); ring.rotation.z = Math.PI / 4; ring.scale.set(1.15, 0.85, 1);
      seg([s * 0.11, 0.035, 0.19], [s * 0.19, 0.035, 0.02], 0.004, gm, hd.g); });
    seg([-0.022, 0.035, 0.205], [0.022, 0.035, 0.205], 0.004, gm, hd.g);
    mesh(new TH.CapsuleGeometry(0.009, 0.02, 4, 8), S(0xffffff, {roughness: 0.3}), 0.188, -0.03, 0.02, hd.g);
  })();
  var MH = window.__marcHead;

  // ---------- kitchen (Léa) ----------
  var kLamp = new TH.PointLight(0xffa860, 4.2, 5, 1.8); kLamp.position.set(0.05, 1.85, 0.45); kLamp.castShadow = true; kLamp.shadow.mapSize.set(1024, 1024); sc.add(kLamp);
  var kKey = new TH.SpotLight(0xffd2a8, 4, 8, 0.6, 0.9, 1.5); kKey.position.set(1.4, 2.1, 2.2); kKey.target.position.set(0, 1.3, 0); sc.add(kKey); sc.add(kKey.target);
  var kRim = new TH.SpotLight(0x86a6ff, 10, 7, 0.7, 0.8, 1.5); kRim.position.set(-1.2, 2.2, -1.6); kRim.target.position.set(0, 1.25, 0); sc.add(kRim); sc.add(kRim.target);
  var kFill = new TH.PointLight(0x5a78c8, 0.8, 6, 2); kFill.position.set(-1.5, 1.4, 1.5); sc.add(kFill);
  var phoneL = new TH.PointLight(0x9fd0ff, 0.25, 0.6, 2); phoneL.position.set(0.15, 1.33, 0.14); sc.add(phoneL);
  sc.add(new TH.HemisphereLight(0x3b4f80, 0x120c08, 0.3));
  var kBounce = new TH.PointLight(0xffc89a, 1.3, 2.2, 2); kBounce.position.set(0.1, 0.95, 0.75); sc.add(kBounce);
  var oBounce = new TH.PointLight(0xdfe8ff, 1.1, 2.2, 2); oBounce.position.set(30.1, 0.95, 0.8); sc.add(oBounce);
  mesh(new TH.PlaneGeometry(8, 8), F(0x3a2a1c, {roughness: 0.9}), 0, 0, 0).rotation.x = -Math.PI / 2;
  var wallM = S(0x2c2a2e, {roughness: 0.95});
  mesh(new TH.BoxGeometry(1.2, 3, 0.1), wallM, -1.3, 1.5, -1.6); mesh(new TH.BoxGeometry(1.2, 3, 0.1), wallM, 1.3, 1.5, -1.6);
  mesh(new TH.BoxGeometry(1.4, 0.95, 0.1), wallM, 0, 0.475, -1.6); mesh(new TH.BoxGeometry(1.4, 0.6, 0.1), wallM, 0, 2.7, -1.6);
  mesh(new TH.BoxGeometry(1.44, 0.06, 0.2), S(0xd8d2c6), 0, 0.97, -1.56);
  bokeh(0, -2, 140, 11, 0.7);
  var tbl = S(0x8a6a4a, {roughness: 0.5});
  mesh(new TH.CylinderGeometry(0.62, 0.62, 0.04, 48), tbl, 0, 0.74, 0.55); mesh(new TH.CylinderGeometry(0.05, 0.08, 0.72, 12), tbl, 0, 0.36, 0.55);
  var chair = S(0x2a2420, {roughness: 0.7});
  mesh(new TH.BoxGeometry(0.46, 0.05, 0.44), chair, 0, 0.45, -0.02); mesh(new TH.BoxGeometry(0.46, 0.6, 0.05), chair, 0, 0.78, -0.24).rotation.x = -0.08;
  var mug = mesh(new TH.CylinderGeometry(0.045, 0.04, 0.1, 20), S(0xb8463c), 0.3, 0.81, 0.62);
  mesh(new TH.TorusGeometry(0.028, 0.008, 8, 14, Math.PI), S(0xb8463c), 0.345, 0.81, 0.62).rotation.z = -Math.PI / 2;
  var shadeK = mesh(new TH.ConeGeometry(0.22, 0.2, 28, 1, true), S(0x1c1c1c, {side: TH.DoubleSide, emissive: 0xffa860, emissiveIntensity: 0.15}), 0.05, 1.98, 0.45);
  var bulbK = new TH.Mesh(new TH.SphereGeometry(0.045, 16, 12), new TH.MeshBasicMaterial({color: 0xffd09a})); bulbK.material.color.multiplyScalar(6); bulbK.position.set(0.05, 1.9, 0.45); sc.add(bulbK);
  seg([0.05, 2.08, 0.45], [0.05, 3.0, 0.45], 0.006, S(0x111111));
  // the commandement de payer on the table
  var pc = canvasTex(512, 720), g = pc.g;
  g.fillStyle = '#f7f4ee'; g.fillRect(0, 0, 512, 720); g.fillStyle = '#c0362c'; g.fillRect(0, 0, 512, 70);
  g.fillStyle = '#fff'; g.font = '800 30px sans-serif'; g.fillText('OFFICE DES POURSUITES', 26, 46);
  g.fillStyle = '#1a1a1a'; g.font = '900 46px sans-serif'; g.fillText('COMMANDEMENT', 26, 140); g.fillText('DE PAYER', 26, 192);
  g.font = '600 22px sans-serif'; g.fillStyle = '#555'; g.fillText('Poursuite n° 2026-04812', 26, 240);
  g.fillText('Créancier :', 26, 300); g.fillStyle = '#111'; g.fillRect(150, 280, 250, 28);
  g.fillStyle = '#555'; g.fillText('Débitrice : Léa M., Lausanne', 26, 345);
  g.fillStyle = '#1a1a1a'; g.font = '900 64px sans-serif'; g.fillText("CHF 8'400.—", 26, 450);
  g.font = '600 20px sans-serif'; g.fillStyle = '#666';
  ['Opposition : dans les 10 jours', 'dès la notification.'].forEach(function(s, i){ g.fillText(s, 26, 520 + i * 28); });
  for (var i = 0; i < 6; i++) { g.fillStyle = '#ddd'; g.fillRect(26, 600 + i * 18, 300 + rnd(i, 3) * 160, 6); }
  pc.t.needsUpdate = true;
  var paper = mesh(new TH.PlaneGeometry(0.21, 0.296), new TH.MeshStandardMaterial({map: pc.t, roughness: 0.85}), 0.06, 0.762, 0.48); paper.rotation.set(-Math.PI / 2, 0, 0.22);
  // oven clock 23:47 and the wall calendar
  var ck = canvasTex(256, 96); ck.g.fillStyle = '#050505'; ck.g.fillRect(0, 0, 256, 96); ck.g.fillStyle = '#3cff8a'; ck.g.font = '700 70px monospace'; ck.g.textAlign = 'center'; ck.g.fillText('23:47', 128, 72); ck.t.needsUpdate = true;
  mesh(new TH.BoxGeometry(0.62, 0.62, 0.5), S(0x2b2c30, {metalness: 0.4, roughness: 0.4}), -1.35, 1.05, -1.3);
  var clockM = new TH.MeshBasicMaterial({map: ck.t}); clockM.color.setScalar(1.6);
  var clock = new TH.Mesh(new TH.PlaneGeometry(0.2, 0.075), clockM); clock.position.set(-1.35, 1.28, -1.044); sc.add(clock);
  var cal = canvasTex(512, 600), calMesh = mesh(new TH.PlaneGeometry(0.42, 0.49), new TH.MeshStandardMaterial({map: cal.t, roughness: 0.9}), 1.15, 1.55, -1.545);
  var calState = -1;
  function drawCal(p){ var g = cal.g; g.fillStyle = '#f5f1e8'; g.fillRect(0, 0, 512, 600); g.fillStyle = '#c0362c'; g.fillRect(0, 0, 512, 90);
    g.fillStyle = '#fff'; g.font = '900 52px sans-serif'; g.textAlign = 'center'; g.fillText('OCTOBRE', 256, 64);
    var x0 = 30, y0 = 140, cw = 64, ch = 78; g.font = '700 22px sans-serif'; g.fillStyle = '#888';
    ['L', 'M', 'M', 'J', 'V', 'S', 'D'].forEach(function(d, i){ g.fillText(d, x0 + cw * i + cw / 2, y0 - 14); });
    for (var d = 1; d <= 31; d++) { var idx = d + 2, cx = x0 + (idx % 7) * cw + cw / 2, cy = y0 + Math.floor(idx / 7) * ch + 46;
      g.fillStyle = d === 13 ? '#1a1a1a' : '#333'; g.font = (d === 13 ? '900 ' : '600 ') + '34px sans-serif'; g.fillText(String(d), cx, cy);
      if (d >= 4 && d <= 12) { g.strokeStyle = 'rgba(30,30,30,0.55)'; g.lineWidth = 4; g.beginPath(); g.moveTo(cx - 20, cy - 32); g.lineTo(cx + 20, cy + 6); g.moveTo(cx + 20, cy - 32); g.lineTo(cx - 20, cy + 6); g.stroke(); }
      if (d === 4) { g.fillStyle = '#c0362c'; g.font = '800 15px sans-serif'; g.fillText('reçu', cx, cy + 22); }
      if (d === 14 && p > 0) { g.strokeStyle = '#e0261c'; g.lineWidth = 7; g.beginPath(); g.arc(cx, cy - 12, 30, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2.1 * p); g.stroke(); } }
    cal.t.needsUpdate = true; }
  drawCal(0);
  // ---------- office (Marc) ----------
  var oKey = new TH.SpotLight(0xdbe6ff, 4.5, 8, 0.6, 0.9, 1.5); oKey.position.set(31.3, 2.2, 2.1); oKey.target.position.set(30, 1.3, 0); sc.add(oKey); sc.add(oKey.target);
  var oLamp = new TH.PointLight(0xffb070, 3, 4, 1.8); oLamp.position.set(29.35, 1.25, 0.55); oLamp.castShadow = true; oLamp.shadow.mapSize.set(1024, 1024); sc.add(oLamp);
  var oRim = new TH.SpotLight(0xffc890, 8, 7, 0.7, 0.8, 1.5); oRim.position.set(31.0, 2.3, -1.6); oRim.target.position.set(30, 1.3, 0); sc.add(oRim); sc.add(oRim.target);
  var monL = new TH.PointLight(0xbfdcff, 1.1, 1.4, 2); monL.position.set(30.35, 1.1, 0.55); sc.add(monL);
  mesh(new TH.PlaneGeometry(8, 8), F(0x24262c, {roughness: 0.95}), 30, 0, 0).rotation.x = -Math.PI / 2;
  var wallO = S(0x1d2230, {roughness: 0.95});
  mesh(new TH.BoxGeometry(2.0, 3, 0.1), wallO, 29.0, 1.5, -1.6); mesh(new TH.BoxGeometry(1.2, 0.95, 0.1), wallO, 30.6, 0.475, -1.6);
  mesh(new TH.BoxGeometry(1.2, 0.6, 0.1), wallO, 30.6, 2.7, -1.6); mesh(new TH.BoxGeometry(1.2, 3, 0.1), wallO, 31.8, 1.5, -1.6);
  bokeh(30.6, -2, 120, 31, 0.45);
  for (var i = 0; i < 26; i++) { var sm = new TH.SpriteMaterial({map: warm, transparent: true, depthWrite: false, fog: false, opacity: 0.6, blending: TH.AdditiveBlending}); sm.color.setScalar(2);
    var sp = new TH.Sprite(sm); sp.position.set(29.9 + i * 0.07 + rnd(i, 3) * 0.05, 0.98 + rnd(i, 4) * 0.05, -6 - rnd(i, 5) * 2); sp.scale.setScalar(0.05); sc.add(sp); }   // lake shore lights
  var desk = S(0x6a4a32, {roughness: 0.5});
  mesh(new TH.BoxGeometry(1.7, 0.05, 0.8), desk, 30, 0.74, 0.55); [-0.8, 0.8].forEach(function(x){ mesh(new TH.BoxGeometry(0.05, 0.72, 0.75), desk, 30 + x, 0.36, 0.55); });
  mesh(new TH.BoxGeometry(0.46, 0.05, 0.44), chair, 30, 0.45, -0.02); mesh(new TH.BoxGeometry(0.5, 0.75, 0.06), chair, 30, 0.85, -0.25).rotation.x = -0.1;
  mesh(new TH.BoxGeometry(0.44, 0.015, 0.14), S(0x2a2a2e, {roughness: 0.4}), 30, 0.773, 0.5);
  var mon = new TH.Group(); mon.position.set(30.5, 0.765, 0.64); mon.rotation.y = Math.PI + 0.5; sc.add(mon);
  mesh(new TH.BoxGeometry(0.6, 0.36, 0.025), S(0x1a1a1e, {roughness: 0.3, metalness: 0.3}), 0, 0.33, 0, mon);
  mesh(new TH.BoxGeometry(0.05, 0.18, 0.03), S(0x2a2a2e), 0, 0.09, -0.03, mon); mesh(new TH.BoxGeometry(0.2, 0.012, 0.14), S(0x2a2a2e), 0, 0.006, -0.03, mon);
  var scrC = canvasTex(640, 384), scrM = new TH.MeshBasicMaterial({map: scrC.t}); scrM.color.setScalar(1.25);
  var scr = new TH.Mesh(new TH.PlaneGeometry(0.56, 0.32), scrM); scr.position.set(0, 0.33, 0.0135); mon.add(scr);
  var typed = -1;
  function drawScreen(n){ var g = scrC.g, txt = 'Je fais opposition.'; g.fillStyle = '#f4f6fa'; g.fillRect(0, 0, 640, 384); g.fillStyle = '#dfe6f0'; g.fillRect(0, 0, 640, 36);
    g.fillStyle = '#1b2a44'; g.font = '700 22px sans-serif'; g.fillText('Opposition – poursuite n° 2026-04812', 30, 92);
    g.fillStyle = '#9aa4b2'; for (var i = 0; i < 3; i++) g.fillRect(30, 120 + i * 18, 380 - i * 60, 7);
    g.fillStyle = '#0c0c0c'; g.font = '800 54px sans-serif'; var s = txt.slice(0, n), a = s.slice(0, 8), b = s.slice(8);
    var x0 = 320 - g.measureText('opposition.').width / 2; g.fillText(a, x0, 250); g.fillText(b, x0, 320);
    var w = g.measureText(b.length ? b : a).width; g.fillStyle = '#2a6df4'; g.fillRect(x0 + 4 + w, b.length ? 276 : 206, 5, 54);
    scrC.t.needsUpdate = true; }
  drawScreen(0);
  mesh(new TH.CylinderGeometry(0.1, 0.12, 0.03, 20), S(0x1a1a1a), 29.35, 0.78, 0.6); seg([29.35, 0.78, 0.6], [29.42, 1.18, 0.58], 0.012, S(0x1a1a1a));
  mesh(new TH.ConeGeometry(0.12, 0.14, 24, 1, true), S(0x1a1a1a, {side: TH.DoubleSide}), 29.48, 1.22, 0.58).rotation.z = -0.9;
  var crC = canvasTex(256, 256); crC.g.fillStyle = '#111'; crC.g.fillRect(0, 0, 256, 256);
  mesh(new TH.BoxGeometry(0.54, 0.54, 0.04), S(0x1a1a1a, {roughness: 0.4}), 29.25, 1.62, -1.53);
  var crestPic = new TH.Mesh(new TH.PlaneGeometry(0.46, 0.46), new TH.MeshStandardMaterial({map: crC.t, roughness: 0.6})); crestPic.position.set(29.25, 1.62, -1.505); sc.add(crestPic);
  var omug = mesh(new TH.CylinderGeometry(0.045, 0.04, 0.1, 20), S(0xf0f0f0), 29.72, 0.815, 0.68);
  for (var i = 0; i < 7; i++) mesh(new TH.BoxGeometry(0.06, 0.3 + rnd(i, 7) * 0.06, 0.24), S([0x2b4a7a, 0x7a2b2b, 0x2b5a3a, 0xc9a24a][i % 4], {roughness: 0.7}), 28.4 + i * 0.07, 1.25, -1.4);
  mesh(new TH.BoxGeometry(0.7, 0.03, 0.3), desk, 28.6, 1.08, -1.4);
  var crestDone = false;
  function drawCrest(){ var im = document.getElementById('crest'); if (crestDone || !im || !im.complete || !im.naturalWidth) return;
    crC.g.drawImage(im, 0, 0, 256, 256); crC.t.needsUpdate = true; crestDone = true; }

  // ---------- anchors & shots ----------
  var A = {};
  function anchors(){ sc.updateMatrixWorld(true);
    A.LH = LH.g.getWorldPosition(new TH.Vector3()); A.MH = MH.g.getWorldPosition(new TH.Vector3());
    A.PAPER = paper.getWorldPosition(new TH.Vector3()); A.CAL = calMesh.getWorldPosition(new TH.Vector3()); A.SCR = scr.getWorldPosition(new TH.Vector3());
    A.CLOCK = clock.getWorldPosition(new TH.Vector3()); }
  // [pos anchor, offset], [look anchor, offset], fov, push, focus anchor, aperture, view shift (+ = content up)
  var SH = {
    leaHook:   [['LH', [0.6, -0.02, 1.75]], ['LH', [0.0, -0.12, 0]], 30, 0.1, 'LH', 26, 0.18],
    paper:    [['PAPER', [0.05, 0.5, 0.3]], ['PAPER', [0, 0, 0.01]], 34, 0.12, 'PAPER', 34, 0.2],
    marcIntro: [['MH', [0.2, 0.1, 2.7]], ['MH', [-0.25, -0.15, 0]], 32, 0.08, 'MH', 16, 0.1],
    leaCU:     [['LH', [-0.5, -0.02, 1.45]], ['LH', [0, -0.1, 0]], 28, 0.07, 'LH', 30, 0.2],
    marcCU:    [['MH', [0.45, -0.02, 1.45]], ['MH', [0, -0.1, 0]], 28, 0.07, 'MH', 30, 0.2],
    leaECU:    [['LH', [0.15, 0.0, 1.25]], ['LH', [0, -0.03, 0]], 26, 0.06, 'LH', 36, 0.24],
    marcMed:   [['MH', [0.7, -0.15, 2.3]], ['MH', [0, -0.28, 0]], 30, 0.06, 'MH', 22, 0.12],
    leaWide:  [['LH', [0.9, 0.35, 3.3]], ['LH', [-0.25, -0.3, -0.6]], 32, 0.06, 'LH', 14, 0.05],
    cal:      [['CAL', [0.05, 0.0, 0.62]], ['CAL', [0, 0, 0]], 34, 0.08, 'CAL', 32, 0.15],
    marcCU2:   [['MH', [-0.42, 0.0, 1.4]], ['MH', [0, -0.1, 0]], 27, 0.07, 'MH', 32, 0.2],
    calRed:   [['CAL', [-0.03, -0.03, 0.4]], ['CAL', [-0.055, -0.03, 0]], 30, 0.1, 'CAL', 40, 0.15],
    leaCU2:    [['LH', [0.5, 0.03, 1.4]], ['LH', [0, -0.1, 0]], 27, 0.07, 'LH', 32, 0.2],
    marcType: [['MH', [-0.6, 0.18, 1.6]], ['MH', [0.15, -0.4, 0.2]], 30, 0.07, 'MH', 22, 0.08],
    screen:   [['SCR', [-0.249, -0.07, -0.457]], ['SCR', [0, -0.07, 0]], 50, 0.08, 'SCR', 30, 0.15],
    marcWide: [['MH', [0.9, 0.45, 3.4]], ['MH', [-0.3, -0.3, -0.5]], 32, 0.06, 'MH', 12, 0.05],
    leaMed:    [['LH', [-0.8, -0.08, 2.3]], ['LH', [0, -0.25, 0]], 30, 0.06, 'LH', 22, 0.12],
    marcEnd:   [['MH', [0.28, 0.0, 1.55]], ['MH', [0, -0.1, 0]], 27, 0.1, 'MH', 30, 0.2],
    leaReact:  [['LH', [0.42, 0.03, 1.65]], ['LH', [0, -0.1, 0]], 27, 0.06, 'LH', 30, 0.2]
  };
  var dir = new TH.Vector3(), P0 = new TH.Vector3(), L0 = new TH.Vector3(), fv = new TH.Vector3();
  function shotAt(t){ var k = 0; for (var i = 0; i < T.cuts.length; i++) if (t >= T.cuts[i][0]) k = i;
    var nx = k + 1 < T.cuts.length ? T.cuts[k + 1][0] : T.end; return [SH[T.cuts[k][1]], T.cuts[k][0], nx, T.cuts[k][1]]; }
  function lineAt(t){ for (var i = 0; i < T.lines.length; i++) if (t >= T.lines[i][0] && t <= T.lines[i][1] + 0.05) return T.lines[i]; return null; }
  function brow(hd, inner, outer, lift){ hd.brows.forEach(function(b, i){ var s = i ? 1 : -1; b.rotation.z = Math.PI / 2 - s * 0.08 + s * inner; b.position.y = 0.098 + lift; }); }

  R.on(function(t){
    drawCrest();
    var ln = lineAt(t), who = ln ? ln[2] : '';
    // --- Léa ---
    var eL = who === 'lea' ? cl(envAvg(t, 0.08) * 1.2) : 0;
    talk(LH, eL); blink(LH, t, 0.3);
    var relief = ss((t - T.lines[7][0] - 1.2) / 1.2);                                           // after "tu as jusqu'à demain"
    brow(LH, 0.22 * (1 - relief) - 0.04 * relief, 0, 0.004 + 0.006 * (1 - relief));
    LH.g.rotation.set(-0.05 + Math.sin(t * 0.5) * 0.015 - 0.04 * (1 - relief), Math.sin(t * 0.33) * 0.03 - 0.12, -0.07 + Math.sin(t * 0.41) * 0.012);
    
    lea.position.y = Math.sin(t * 2 * Math.PI * 0.27) * 0.003 + (1 - relief) * Math.sin(t * 2 * Math.PI * 0.6) * 0.0015;
    // --- Marc ---
    var eM = who === 'marc' ? cl(envAvg(t, 0.08) * 1.2) : 0;
    talk(MH, eM); blink(MH, t, 1.7);
    var smirk = ss((t - T.lines[14][0] - 1.0) / 0.6);
    brow(MH, -0.04 + 0.05 * smirk, 0, 0.002 + 0.006 * smirk);
    var typing = t > T.typeT - 0.2 && t < T.typeT + 2.2;
    MH.g.rotation.set(-0.04 + Math.sin(t * 0.45) * 0.012 + (typing ? 0.12 : 0) * ss((t - T.typeT + 0.2) / 0.4), Math.sin(t * 0.3) * 0.03 + 0.1 + (typing ? 0.25 : 0), Math.sin(t * 0.37) * 0.01);
    
    marc.children.forEach(function(c){ if (c.name === 'hand1' || c.name === 'hand-1') { var s = c.name === 'hand1' ? 1 : -1;
      c.position.y = 0.785 + (typing ? Math.max(0, Math.sin(t * 22 + s)) * 0.006 : 0); } });
    marc.position.y = Math.sin(t * 2 * Math.PI * 0.22) * 0.003;
    // --- props ---
    var nT = cl((t - T.typeT - 0.15) / 1.1), n = Math.floor(nT * 19); if (n !== typed) { drawScreen(n); typed = n; }
    var cp = ss((t - T.red) / 0.55), cq = Math.round(cp * 40) / 40; if (cq !== calState) { drawCal(cq); calState = cq; }
    anchors();
    // --- camera ---
    var sh = shotAt(t), s = sh[0], u = ss((t - sh[1]) / Math.max(0.6, sh[2] - sh[1]));
    P0.copy(A[s[0][0]]).add(V3(s[0][1])); L0.copy(A[s[1][0]]).add(V3(s[1][1]));
    dir.copy(L0).sub(P0); P0.addScaledVector(dir, s[3] * u);
    var dist = P0.distanceTo(L0);
    P0.x += (Math.sin(t * 0.61) * 0.01 + Math.sin(t * 1.13) * 0.004) * dist; P0.y += (Math.sin(t * 0.47 + 1) * 0.007 + Math.sin(t * 0.97) * 0.003) * dist;
    cam.position.copy(P0); cam.fov = s[2]; cam.lookAt(L0); cam.rotateZ(Math.sin(t * 0.31) * 0.006);
    cam.setViewOffset(W, H, 0, -s[6] * H, W, H); cam.updateProjectionMatrix();
    cam.getWorldDirection(fv); dofM.uniforms.uFocus.value = Math.max(0.1, A[s[4]].clone().sub(cam.position).dot(fv)); dofM.uniforms.uAperture.value = s[5];
    var office = cam.position.x > 15;
    compM.uniforms.uTint.value.set(office ? 0.94 : 1.04, office ? 0.98 : 1.0, office ? 1.06 : 0.92);
    // --- overlays ---
    tagEl.style.opacity = (1 - cl((t - 2.6) / 0.4)).toFixed(3);
    var lbl = sh[3] === 'marcIntro' ? 'Marc · Thrax Legal' : '';
    whoEl.textContent = lbl; whoEl.style.opacity = lbl ? Math.min(cl((t - sh[1]) / 0.15), cl((sh[2] - t) / 0.15)).toFixed(3) : 0;
    var cur = null; for (var i = 0; i < T.subs.length; i++) if (t >= T.subs[i].t0 && t < T.subs[i].t1) cur = T.subs[i];
    if (cur && t < T.end) { subEl.textContent = cur.text; subEl.className = cur.spk === 'marc' ? 'm' : '';
      subEl.style.opacity = Math.min(cur.t0 === 0 ? 1 : cl((t - cur.t0) / 0.1), cl((cur.t1 - t) / 0.12)).toFixed(3); } else subEl.style.opacity = 0;
    endEl.style.opacity = t >= T.end ? 1 : 0;
    if (t >= T.end) return;
    r.setRenderTarget(rtScene); r.render(sc, cam); post(t);
  });
})();
"""
PUNCH = []
SFX = []
TAIL = 3.2
CAP_MAX = 3
