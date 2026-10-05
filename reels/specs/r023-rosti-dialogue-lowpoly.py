"""Reel 023 — « Rösti » : sketch en dialogue, repris des codes de la vidéo de référence (Aozumi) : scène 3D low-poly
de nuit (bureau, ordinateur, lampe, guirlande, fenêtres de la ville en bokeh), champ-contrechamp, gros plans, répliques
courtes et pince-sans-rire, sous-titres discrets au centre, chute comique. Le second personnage n'est pas une IA :
c'est Rösti, le chat de Léa (collier rouge à croix suisse). Deux voix : Léa = Vivienne (voix préférée), Rösti = Henri.
Promesses vérifiées sur l'offre : prestations à prix fixe, prix connu avant de commencer, commande en ligne,
lettres rédigées prêtes à envoyer ; jamais « avocat » ni « juriste » pour Thrax Legal."""
import json

USE_THREE = True
ASSETS = ["media/crest-dark-256.png"]
VOICES = {"lea": ("fr-FR-VivienneMultilingualNeural", "+4%"), "rosti": ("fr-FR-HenriNeural", "-6%")}
LINES = [
    ("lea", "Rösti… et s'il existait un service où j'envoie juste mon problème juridique…"),
    ("rosti", "Continue."),
    ("lea", "Quelqu'un le lit, on me dit quoi faire, et le prix est fixé avant de commencer."),
    ("rosti", "Un prix. Fixé avant."),
    ("lea", "Et je reçois ma lettre, prête à envoyer."),
    ("lea", "Tout se fait en ligne.", 0.2),
    ("lea", "Et pas de facture à l'heure.", 0.2),
    ("rosti", "Pas de facture à l'heure ?"),
    ("lea", "Pas de facture à l'heure."),
    ("rosti", "Et ça existe, en Suisse ?", 0.35),
    ("lea", "Rösti. C'est Thrax Legal.", 1.25),
    ("rosti", "Alors pourquoi je viens de passer trois heures à te chercher des modèles de lettres sur Google ?", 0.55),
]
# Shot per line (cut on the first word of each line; "far" holds the silence before the punchline).
SHOTS = ["hook", "catA", "leaA", "catB", "wide", "wide", "leaM", "catX", "leaB", "catC", "lap", "catEnd"]

META = {
    "id": "r023-rosti-dialogue-lowpoly",
    "music": "lofi",
    "music_gain": -9,
    "room": -32,
    "vo_chain": True,
    "caption": ("🐈 Quand ton chat a passé la soirée à te chercher des modèles de lettres sur Google…\n\n"
                "Chez Thrax Legal, tu décris ton problème en ligne, le prix est fixé avant de commencer, et tu reçois un document "
                "rédigé, prêt à envoyer. Pas de facture à l'heure.\n\n"
                "Thrax Legal, le juridique à prix fixe en Suisse romande. Lien en bio.\n"
                "(Thrax Legal n'est pas un cabinet d'avocats et ne représente pas ses clients devant les tribunaux.)\n\n"
                "#suisse #suisseromande #lausanne #genève #independant #pme #chat #humour #juridique #thraxlegal"),
    "yt_title": "Rösti, le chat qui cherchait des modèles de lettres sur Google #shorts",
    "tiktok_title": "Quand ton chat découvre Thrax Legal 🐈",
    "first_comment": "Et toi, tu as déjà passé 3 heures sur Google pour une seule lettre ? 👇",
    "tags": ["Thrax Legal", "humour", "chat", "lettre", "Suisse romande"],
    "genome": {"style": "3d-lowpoly-nuit-dialogue-cinema (codes Aozumi + skill dev-claude-reel : DOF, bloom, grain)",
               "palette": "nuit bleu nuit/orange lampe/bokeh ville", "hook": "« et s'il existait un service où… » + chat qui répond",
               "format": "sketch dialogue champ-contrechamp + temps mort + chute + coupe sèche", "topic": "marque/offre",
               "mascot": "Léa (indépendante) + Rösti le chat", "voice": "Vivienne + Henri",
               "captions": "phrase, 54 px, bande 31-43 %", "music": "lofi (bas) + ambiance pièce", "length": "~32s"},
    "cover_t": 0.0,
}

CSS = """
#root { background: #000; color:#fff; }
#gl { position:absolute; left:0; top:0; width:1080px; height:1920px; }
.cap { display:none; }
#subwrap { position:absolute; left:0; right:0; top:600px; height:224px; display:flex; align-items:center; justify-content:center; pointer-events:none;
           background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,0,0,0.22), rgba(0,0,0,0)); }
#sub { max-width:880px; text-align:center; font-size:54px; font-weight:600; line-height:1.18; color:#f4f2ee; text-wrap: balance;
       text-shadow: 0 2px 20px rgba(0,0,0,.72), 0 1px 4px rgba(0,0,0,.6); }
#sub.r { color:#ffe3bd; }
#crest { position:absolute; width:1px; height:1px; opacity:0; }
"""


def chunks(words, lines):
    """Subtitle chunks per line: break after a sentence end (> 14 chars) or a comma when long, never over ~46 chars."""
    out = []
    for k, ln in enumerate(lines):
        ws = [w for w in words if w.get("ln") == k]
        cur = []
        for i, w in enumerate(ws):
            cur.append(w)
            txt = " ".join(x["w"] for x in cur)
            nxt = ws[i + 1] if i + 1 < len(ws) else None
            gap = (nxt["t0"] - w["t1"]) if nxt else 9
            end = w["w"][-1:] in ".?!…" and len(txt) > 14
            long_ = nxt and len(txt + " " + nxt["w"]) > 46 and (w["w"][-1:] in ",;" or len(txt) > 30)
            if not nxt or end or gap > 0.5 or long_:
                out.append({"t0": cur[0]["t0"] - 0.03, "t1": cur[-1]["t1"] + (0.42 if not nxt else 0.32), "text": txt, "spk": ln["spk"]})
                cur = []
    for i in range(len(out)):
        if i + 1 < len(out):
            out[i]["t1"] = min(out[i]["t1"], out[i + 1]["t0"] - 0.03)
        out[i]["t1"] = max(out[i]["t1"], out[i]["t0"] + 0.7)
        if i + 1 < len(out):
            out[i]["t1"] = min(out[i]["t1"], out[i + 1]["t0"] - 0.03)
    out[0]["t0"] = 0.0
    return out


def body(w):
    L = w.lines
    end = round(L[-1]["t1"] + 0.45, 3)
    subs = chunks(w.words, L)
    T = {"lines": [[l["t0"], l["t1"], l["spk"]] for l in L], "shots": SHOTS, "end": end, "subs": subs}
    globals()["SCRIPT"] = SCRIPT_T.replace("__T__", json.dumps(T, ensure_ascii=False))
    globals()["SFX"] = []
    return """
<canvas id="gl" width="1080" height="1920"></canvas>
<img id="crest" src="assets/crest-dark-256.png" alt="">
<div id="subwrap"><div id="sub"></div></div>
"""


SCRIPT_T = r"""
(function(){
  var T = __T__, TH = THREE, RE = window.REEL, W = 1080, H = 1920;
  var cv = document.getElementById('gl'), subEl = document.getElementById('sub');
  var r = new TH.WebGLRenderer({canvas: cv, antialias: false, preserveDrawingBuffer: true});
  r.setPixelRatio(1); r.setSize(W, H, false); r.toneMapping = TH.NoToneMapping; r.outputColorSpace = TH.LinearSRGBColorSpace;
  r.shadowMap.enabled = true; r.shadowMap.type = TH.PCFSoftShadowMap;
  var sc = new TH.Scene(); sc.background = new TH.Color(0x03050a); sc.fog = new TH.Fog(0x03050a, 9, 26);
  var cam = new TH.PerspectiveCamera(30, W / H, 0.1, 60);

  // ---------- post chain: HDR scene -> DOF -> bloom -> composite (ACES, grade, gamma, vignette, grain) ----------
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
    '  for (int i = 0; i < 40; i++) { float fi = float(i) + 0.5; float rr = sqrt(fi / 40.0); float a = fi * 2.39996323;',
    '    vec2 off = vec2(cos(a), sin(a)) * rr * uMaxCoc; float dist = length(off); vec2 uv = vUv + off / uRes;',
    '    float zs = lin(texture2D(tDepth, uv).x); float cs = cocOf(zs); float eff = (zs > z0) ? min(cs, c0) : cs;',
    '    float w = smoothstep(dist - 1.0, dist + 1.0, eff) / max(eff * eff, 1.0);',
    '    vec3 s = texture2D(tColor, uv).rgb; float lum = dot(s, vec3(0.3, 0.5, 0.2)); w *= 1.0 + 1.6 * clamp(lum - 0.8, 0.0, 6.0);',
    '    acc += s * w; ws += w; }',
    '  gl_FragColor = vec4(acc / ws, 1.0); }'].join('\n'));
  var brightM = SM({tColor: {value: null}}, 'uniform sampler2D tColor; varying vec2 vUv; void main(){ vec3 c = texture2D(tColor, vUv).rgb; float m = max(c.r, max(c.g, c.b)); gl_FragColor = vec4(c * clamp((m - 1.2) / max(m, 1e-3), 0., 1.), 1.); }');
  var blurM = SM({tColor: {value: null}, uDir: {value: new TH.Vector2()}}, [
    'uniform sampler2D tColor; uniform vec2 uDir; varying vec2 vUv;',
    'void main(){ float w[8]; w[0]=0.2270; w[1]=0.1946; w[2]=0.1216; w[3]=0.0540; w[4]=0.0162; w[5]=0.0054; w[6]=0.0016; w[7]=0.0;',
    '  vec3 c = texture2D(tColor, vUv).rgb * w[0];',
    '  for (int i = 1; i < 7; i++) { vec2 o = uDir * float(i) * 1.6; c += (texture2D(tColor, vUv + o).rgb + texture2D(tColor, vUv - o).rgb) * w[i]; }',
    '  gl_FragColor = vec4(c, 1.); }'].join('\n'));
  var compM = SM({tColor: {value: rtDof.texture}, tB1: {value: b1.texture}, tB2: {value: b2.texture}, uTime: {value: 0}, uFade: {value: 1}}, [
    'uniform sampler2D tColor, tB1, tB2; uniform float uTime, uFade; varying vec2 vUv;',
    'vec3 aces(vec3 x){ return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0., 1.); }',
    'float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }',
    'void main(){ vec2 d = vUv - 0.5; float ca = 0.004 * dot(d, d);',
    '  vec3 col = vec3(texture2D(tColor, vUv + d * ca).r, texture2D(tColor, vUv).g, texture2D(tColor, vUv - d * ca).b);',
    '  col += 0.36 * texture2D(tB1, vUv).rgb + 0.55 * texture2D(tB2, vUv).rgb;',
    '  col = aces(col * 1.05); col *= vec3(1.03, 1.0, 0.95); col = pow(col, vec3(1.0 / 2.2));',
    '  float v = smoothstep(0.95, 0.3, length(d * vec2(1.0, 0.72))); col *= mix(0.7, 1.0, v);',
    '  col += (hash(vUv * vec2(1080., 1920.) + fract(uTime * 7.31)) - 0.5) * 0.028;',
    '  gl_FragColor = vec4(col * uFade, 1.); }'].join('\n'));
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
  function M(c, o){ o = o || {}; return new TH.MeshStandardMaterial(Object.assign({color: c, roughness: 0.78, flatShading: true}, o)); }
  function mesh(g, m, x, y, z, p){ var o = new TH.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; (p || sc).add(o); return o; }
  function limb(a, b, r0, m, p){ var A = new TH.Vector3().fromArray(a), B = new TH.Vector3().fromArray(b), L = A.distanceTo(B);
    var o = mesh(new TH.CylinderGeometry(r0, r0 * 0.9, L, 7), m, 0, 0, 0, p); o.position.copy(A).add(B).multiplyScalar(0.5);
    o.quaternion.setFromUnitVectors(new TH.Vector3(0, 1, 0), B.clone().sub(A).normalize()); return o; }
  function glowTex(c0){ var c = document.createElement('canvas'); c.width = c.height = 64; var g = c.getContext('2d');
    var gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, c0); gr.addColorStop(0.4, c0); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64); var t = new TH.CanvasTexture(c); t.colorSpace = TH.SRGBColorSpace; return t; }
  function envAt(t){ var i = t * 30; var i0 = Math.max(0, Math.min(RE.env.length - 1, Math.floor(i))), i1 = Math.min(RE.env.length - 1, i0 + 1);
    return t < 0 || t > RE.vo_dur ? 0 : (RE.env[i0] || 0) * (1 - (i - Math.floor(i))) + (RE.env[i1] || 0) * (i - Math.floor(i)); }
  function envAvg(t, w){ var s = 0, n = 6; for (var k = 0; k < n; k++) s += envAt(t - w / 2 + w * k / (n - 1)); return s / n; }

  // ---------- lights ----------
  sc.add(new TH.HemisphereLight(0x4a64a8, 0x140c08, 0.45));
  var lampL = new TH.PointLight(0xff8a3c, 6, 6, 1.8); lampL.position.set(1.2, 1.72, -0.35); lampL.castShadow = true; lampL.shadow.mapSize.set(1024, 1024); sc.add(lampL);
  var key = new TH.SpotLight(0xffc28a, 10, 12, 0.6, 0.9, 1.4); key.position.set(1.6, 2.9, 2.4); key.target.position.set(-0.1, 1.5, -0.5); sc.add(key); sc.add(key.target);
  var rim = new TH.SpotLight(0x7fa0ff, 14, 10, 0.7, 0.8, 1.4); rim.position.set(-1.2, 2.9, -2.8); rim.target.position.set(0, 1.5, -0.4); sc.add(rim); sc.add(rim.target);
  var screenL = new TH.PointLight(0xa8d8ff, 1.4, 1.6, 2); screenL.position.set(-0.45, 1.38, -0.55); sc.add(screenL);

  // ---------- set ----------
  mesh(new TH.PlaneGeometry(30, 30), M(0x16110d, {roughness: 0.95}), 0, 0, 0).rotation.x = -Math.PI / 2;
  var wood = M(0x5c3b22, {roughness: 0.6});
  mesh(new TH.BoxGeometry(3.0, 0.07, 1.35), wood, 0, 0.965, -0.2);
  mesh(new TH.BoxGeometry(3.0, 0.72, 0.05), M(0x4a2f1b), 0, 0.58, 0.44);                 // modesty panel hides legs
  [-1.45, 1.45].forEach(function(x){ mesh(new TH.BoxGeometry(0.07, 0.93, 1.25), wood, x, 0.465, -0.2); });
  var chairM = M(0x2a2a30);
  mesh(new TH.BoxGeometry(0.6, 0.06, 0.5), chairM, -0.45, 0.5, -1.0);
  mesh(new TH.BoxGeometry(0.6, 0.75, 0.06), chairM, -0.45, 0.95, -1.3).rotation.x = -0.08;
  mesh(new TH.CylinderGeometry(0.03, 0.03, 0.47, 6), chairM, -0.45, 0.24, -1.0);
  var warm = glowTex('rgba(255,214,150,1)'), cool = glowTex('rgba(150,190,255,1)');
  for (var i = 0; i < 150; i++) {
    var sm = new TH.SpriteMaterial({map: rnd(i, 1) > 0.3 ? warm : cool, transparent: true, depthWrite: false, fog: false,
      opacity: 0.35 + rnd(i, 2) * 0.6, blending: TH.AdditiveBlending}); sm.color.setScalar(1.6);
    var s = new TH.Sprite(sm), z = -4 - rnd(i, 3) * 9, sz = 0.06 + rnd(i, 4) * 0.12 + (-z - 4) * 0.01;
    s.position.set((rnd(i, 5) - 0.5) * 12, 0.5 + rnd(i, 6) * 6.5, z); s.scale.set(sz, sz * (rnd(i, 7) > 0.5 ? 1.4 : 1), 1); sc.add(s);
  }
  var dark = new TH.MeshBasicMaterial({color: 0x010204});
  [-3.0, -1.0, 1.0, 3.0].forEach(function(x){ var m = new TH.Mesh(new TH.BoxGeometry(0.12, 8, 0.12), dark); m.position.set(x, 4, -3.4); sc.add(m); });
  var sill = new TH.Mesh(new TH.BoxGeometry(12, 0.7, 0.3), dark); sill.position.set(0, 0.35, -3.4); sc.add(sill);
  var bulbM = new TH.MeshBasicMaterial({color: 0xffd08a}); bulbM.color.multiplyScalar(5);
  for (var i = 0; i <= 30; i++) { var u = i / 30; var b = new TH.Mesh(new TH.SphereGeometry(0.028, 8, 6), bulbM);
    b.position.set(-2.4 + u * 4.8, 2.95 - Math.sin(Math.PI * u) * 0.32, -2.7); sc.add(b); }
  // props
  var shadeM = M(0xd8452b, {emissive: 0xff5a2a, emissiveIntensity: 1.6, side: TH.DoubleSide});
  limb([1.32, 1.0, -0.45], [1.25, 1.62, -0.38], 0.022, M(0x1c1c1c));
  var shade = mesh(new TH.ConeGeometry(0.22, 0.3, 7, 1, true), shadeM, 1.18, 1.7, -0.33); shade.rotation.z = -0.6;
  mesh(new TH.CylinderGeometry(0.11, 0.13, 0.04, 8), M(0x1c1c1c), 1.32, 1.02, -0.45);
  mesh(new TH.CylinderGeometry(0.075, 0.065, 0.16, 9), M(0xe9e2d6), 0.05, 1.08, 0.25);
  mesh(new TH.TorusGeometry(0.042, 0.011, 6, 10, Math.PI), M(0xe9e2d6), 0.125, 1.09, 0.25).rotation.z = -Math.PI / 2;
  mesh(new TH.CylinderGeometry(0.12, 0.09, 0.2, 7), M(0x8a4a2a), -1.3, 1.1, -0.45);
  for (var i = 0; i < 9; i++) { var lf = mesh(new TH.ConeGeometry(0.06, 0.5, 4), M(0x2f6b35), -1.3 + (rnd(i, 9) - 0.5) * 0.16, 1.42, -0.45 + (rnd(i, 10) - 0.5) * 0.16);
    lf.rotation.set((rnd(i, 11) - 0.5) * 0.9, 0, (rnd(i, 12) - 0.5) * 0.9); }
  mesh(new TH.BoxGeometry(0.4, 0.025, 0.28), M(0xf1ead8), 0.75, 1.013, 0.18).rotation.y = 0.35;

  // laptop (screen toward Léa, crest on the lid toward camera)
  var lap = new TH.Group(); lap.position.set(-0.45, 1.0, -0.3); sc.add(lap);
  mesh(new TH.BoxGeometry(0.9, 0.03, 0.58), M(0x2b2e34, {metalness: 0.5, roughness: 0.4, flatShading: false}), 0, 0.015, 0, lap);
  mesh(new TH.BoxGeometry(0.78, 0.004, 0.26), M(0x16181c), 0, 0.032, -0.08, lap);
  var lid = new TH.Group(); lid.position.set(0, 0.03, 0.28); lid.rotation.x = 0.26; lap.add(lid);
  mesh(new TH.BoxGeometry(0.9, 0.58, 0.022), M(0x2b2e34, {metalness: 0.55, roughness: 0.35, flatShading: false}), 0, 0.29, 0, lid);
  var crestC = document.createElement('canvas'); crestC.width = crestC.height = 256; var cg = crestC.getContext('2d'); cg.fillStyle = '#1d2026'; cg.fillRect(0, 0, 256, 256);
  var crestT = new TH.CanvasTexture(crestC); crestT.colorSpace = TH.SRGBColorSpace;
  var logoM = new TH.MeshBasicMaterial({map: crestT}); var logo = new TH.Mesh(new TH.CircleGeometry(0.11, 40), logoM); logo.position.set(0, 0.31, 0.0125); lid.add(logo);
  var scrM = new TH.MeshBasicMaterial({color: 0x9fd4ff}); scrM.color.multiplyScalar(1.3);
  var scr = new TH.Mesh(new TH.PlaneGeometry(0.82, 0.5), scrM); scr.position.set(0, 0.3, -0.0125); scr.rotation.y = Math.PI; lid.add(scr);
  var crestDone = false;
  function drawCrest(){ var im = document.getElementById('crest'); if (crestDone || !im || !im.complete || !im.naturalWidth) return;
    cg.save(); cg.beginPath(); cg.arc(128, 128, 126, 0, Math.PI * 2); cg.clip(); cg.drawImage(im, 0, 0, 256, 256); cg.restore(); crestT.needsUpdate = true; crestDone = true; }

  // ---------- Léa (seated, hands on the keyboard) ----------
  var lea = new TH.Group(); lea.position.set(-0.45, 0, -0.98); sc.add(lea);
  var skin = M(0xc98a62), hood = M(0x2e4d78), hair = M(0x35200f), dk = M(0x111111);
  mesh(new TH.BoxGeometry(0.5, 0.26, 0.42), M(0x1d2a3a), 0, 0.66, 0.02, lea);                       // pelvis on the seat (0.53)
  mesh(new TH.CylinderGeometry(0.27, 0.33, 0.8, 8), hood, 0, 1.18, 0, lea);
  var hoodBack = mesh(new TH.IcosahedronGeometry(0.2, 0), hood, 0, 1.58, -0.17, lea); hoodBack.scale.set(1.2, 0.6, 0.8);
  [-0.06, 0.06].forEach(function(x){ limb([x, 1.52, 0.27], [x, 1.32, 0.29], 0.01, M(0xf3f0ea), lea); });
  mesh(new TH.CylinderGeometry(0.09, 0.1, 0.16, 7), skin, 0, 1.64, 0, lea);
  [-1, 1].forEach(function(sg){
    limb([sg * 0.3, 1.48, 0.0], [sg * 0.33, 1.13, 0.22], 0.075, hood, lea);
    limb([sg * 0.33, 1.13, 0.22], [sg * 0.17, 1.08, 0.56], 0.06, hood, lea);
    var hand = new TH.Group(); hand.position.set(sg * 0.15, 1.075, 0.6); lea.add(hand);
    mesh(new TH.BoxGeometry(0.08, 0.03, 0.08), skin, 0, 0, 0, hand);
    for (var f = 0; f < 4; f++) mesh(new TH.BoxGeometry(0.016, 0.018, 0.05), skin, -0.028 + f * 0.019, -0.008, 0.055, hand).rotation.x = 0.35;
    mesh(new TH.BoxGeometry(0.018, 0.018, 0.045), skin, -sg * 0.048, -0.004, 0.02, hand).rotation.y = sg * 0.6;
  });
  var head = new TH.Group(); head.position.set(0, 1.9, 0.02); lea.add(head);
  mesh(new TH.IcosahedronGeometry(0.27, 1), skin, 0, 0, 0, head).scale.set(0.95, 1.08, 0.95);
  mesh(new TH.IcosahedronGeometry(0.29, 1), hair, 0, 0.1, -0.05, head).scale.set(1, 0.72, 1.02);
  mesh(new TH.IcosahedronGeometry(0.11, 0), hair, 0, 0.18, -0.27, head);
  [-0.1, 0.1].forEach(function(x){ mesh(new TH.TorusGeometry(0.075, 0.013, 6, 16), dk, x, 0.0, 0.245, head);
    mesh(new TH.SphereGeometry(0.024, 8, 6), M(0x0a0a0a, {flatShading: false}), x, 0.0, 0.235, head); });
  mesh(new TH.BoxGeometry(0.055, 0.012, 0.01), dk, 0, 0.01, 0.255, head);
  var brows = [-0.1, 0.1].map(function(x){ return mesh(new TH.BoxGeometry(0.08, 0.015, 0.012), hair, x, 0.105, 0.245, head); });
  var leaMouth = mesh(new TH.BoxGeometry(0.075, 0.016, 0.02), M(0x5a2018), 0, -0.14, 0.24, head);

  // ---------- Rösti (cat on the desk) ----------
  var cat = new TH.Group(); cat.position.set(0.38, 1.0, -0.02); sc.add(cat);
  var catBody = new TH.Group(); cat.add(catBody);
  var fur = M(0x8f8b90), furD = M(0x5b585e), pink = M(0xe8a0a0);
  mesh(new TH.IcosahedronGeometry(0.2, 1), fur, 0, 0.19, 0, catBody).scale.set(1, 1.05, 0.9);
  [-0.07, 0.07].forEach(function(x){ mesh(new TH.IcosahedronGeometry(0.055, 0), fur, x, 0.03, 0.14, catBody).scale.set(1, 0.6, 1.4); });
  var tail = new TH.Mesh(new TH.TorusGeometry(0.18, 0.032, 6, 12, Math.PI * 0.9), furD); tail.position.set(-0.13, 0.13, -0.11); tail.rotation.set(0, 0.6, 0.4); catBody.add(tail);
  var cHead = new TH.Group(); cHead.position.set(0, 0.45, 0.03); catBody.add(cHead);
  mesh(new TH.IcosahedronGeometry(0.155, 1), fur, 0, 0, 0, cHead).scale.set(1.15, 0.98, 1);
  var ears = [-0.09, 0.09].map(function(x){ var e = mesh(new TH.ConeGeometry(0.055, 0.11, 4), fur, x, 0.14, -0.01, cHead); e.rotation.z = -x * 2.2;
    mesh(new TH.ConeGeometry(0.032, 0.065, 4), pink, 0, -0.005, 0.02, e); return e; });
  [-0.035, 0.035].forEach(function(x){ mesh(new TH.BoxGeometry(0.016, 0.055, 0.01), furD, x, 0.09, 0.142, cHead).rotation.z = x * 3; });
  var eyes = [-0.06, 0.06].map(function(x){ var e = mesh(new TH.CapsuleGeometry(0.02, 0.032, 4, 8), M(0x050505, {flatShading: false, roughness: 0.2}), x, 0.02, 0.142, cHead);
    var hl = new TH.Mesh(new TH.SphereGeometry(0.0075, 6, 4), new TH.MeshBasicMaterial({color: 0xffffff})); hl.position.set(0.007, 0.018, 0.02); e.add(hl);
    mesh(new TH.CircleGeometry(0.027, 10), M(0xe58a8a, {transparent: true, opacity: 0.55}), x * 1.6, -0.035, 0.14, cHead); return e; });
  mesh(new TH.ConeGeometry(0.016, 0.018, 3), pink, 0, -0.022, 0.158, cHead).rotation.x = Math.PI;
  var catMouth = mesh(new TH.SphereGeometry(0.02, 8, 6), M(0x3a1414), 0, -0.058, 0.142, cHead); catMouth.scale.set(1.3, 0.2, 0.5);
  [-1, 1].forEach(function(sg){ for (var k = 0; k < 2; k++) { var wk = new TH.Mesh(new TH.BoxGeometry(0.11, 0.003, 0.003), new TH.MeshBasicMaterial({color: 0xcfcfcf}));
    wk.position.set(sg * 0.12, -0.03 - k * 0.018, 0.12); wk.rotation.z = sg * (0.1 - k * 0.2); cHead.add(wk); } });
  var collar = mesh(new TH.TorusGeometry(0.1, 0.016, 6, 16), M(0xd52b1e), 0, 0.33, 0.02, catBody); collar.rotation.x = Math.PI / 2 + 0.2;
  mesh(new TH.BoxGeometry(0.045, 0.045, 0.01), M(0xd52b1e), 0, 0.29, 0.115, catBody);
  mesh(new TH.BoxGeometry(0.028, 0.007, 0.012), new TH.MeshBasicMaterial({color: 0xffffff}), 0, 0.29, 0.121, catBody);
  mesh(new TH.BoxGeometry(0.007, 0.028, 0.012), new TH.MeshBasicMaterial({color: 0xffffff}), 0, 0.29, 0.121, catBody);
  // dust in the lamp light
  var ND = 160, dG = new TH.BufferGeometry(), dP = new Float32Array(ND * 3);
  dG.setAttribute('position', new TH.BufferAttribute(dP, 3));
  var dmat = new TH.PointsMaterial({color: 0xffd6a0, size: 0.008, transparent: true, opacity: 0.55, depthWrite: false, blending: TH.AdditiveBlending}); dmat.color.multiplyScalar(2);
  sc.add(new TH.Points(dG, dmat));

  // ---------- anchors and shots ----------
  var A = {LH: new TH.Vector3(), CH: new TH.Vector3(), PAIR: new TH.Vector3(), LAP: new TH.Vector3()};
  function anchors(){ sc.updateMatrixWorld(true); head.getWorldPosition(A.LH); cHead.getWorldPosition(A.CH); A.PAIR.copy(A.LH).add(A.CH).multiplyScalar(0.5); logo.getWorldPosition(A.LAP); }
  // [posAnchor, offset], [lookAnchor, offset], fov, push (fraction of distance over the shot), focus anchor, aperture, view shift
  var SH = {
    hook:   [['PAIR', [0.95, 0.18, 3.9]], ['PAIR', [0, 0.0, 0]], 30, 0.08, 'LH', 14, 0.04],
    catA:   [['CH', [0.55, 0.05, 1.85]], ['CH', [0, 0.02, 0]], 28, 0.06, 'CH', 26, 0.07],
    leaA:   [['LH', [0.75, -0.02, 2.6]], ['LH', [0, -0.03, 0]], 28, 0.08, 'LH', 24, 0.08],
    catB:   [['CH', [-0.6, -0.1, 1.65]], ['CH', [0, 0.03, 0]], 26, 0.05, 'CH', 28, 0.07],
    wide:   [['PAIR', [0.55, 0.75, 5.2]], ['PAIR', [0, 0.25, -0.6]], 31, 0.1, 'PAIR', 8, 0.0],
    leaM:   [['LH', [-0.55, -0.1, 3.2]], ['LH', [0, -0.25, 0]], 28, 0.07, 'LH', 18, 0.05],
    catX:   [['CH', [0.15, 0.02, 0.95]], ['CH', [0, 0.02, 0]], 26, 0.05, 'CH', 34, 0.09],
    leaB:   [['LH', [0.25, 0.0, 2.2]], ['LH', [0, -0.02, 0]], 26, 0.06, 'LH', 28, 0.09],
    catC:   [['CH', [-0.7, -0.05, 2.1]], ['CH', [0, 0.04, 0]], 28, 0.06, 'CH', 22, 0.06],
    far:    [['PAIR', [0.3, 1.25, 8.2]], ['PAIR', [0, 0.55, -1.5]], 33, 0.02, 'PAIR', 5, -0.02],
    lap:    [['LAP', [0.2, 0.55, 2.9]], ['LH', [0, -0.36, 0]], 30, 0.07, 'LH', 14, -0.12],
    catEnd: [['CH', [0.25, 0.04, 1.45]], ['CH', [0, 0.02, 0]], 27, -0.22, 'CH', 26, 0.08]
  };
  // cut list: shot k starts at line k's first word; the far shot holds the silence before line 10.
  var CUT = T.lines.map(function(l, k){ return [Math.max(0, l[0] - 0.02), T.shots[k]]; });
  CUT.splice(10, 0, [T.lines[9][1] + 0.12, 'far']);
  var P0 = new TH.Vector3(), L0 = new TH.Vector3(), dir = new TH.Vector3();
  function shotAt(t){ var k = 0; for (var i = 0; i < CUT.length; i++) if (t >= CUT[i][0]) k = i; var nx = k + 1 < CUT.length ? CUT[k + 1][0] : T.end; return [SH[CUT[k][1]], CUT[k][0], nx]; }

  function lineAt(t){ for (var i = 0; i < T.lines.length; i++) if (t >= T.lines[i][0] && t <= T.lines[i][1] + 0.05) return T.lines[i]; return null; }
  R.on(function(t){
    drawCrest();
    var ln = lineAt(t), who = ln ? ln[2] : '';
    // --- pose (all from t, eased; tiny sines for life) ---
    var eL = who === 'lea' ? Math.min(1, envAvg(t, 0.08) * 1.15) : 0, eC = who === 'rosti' ? Math.min(1, envAvg(t, 0.09) * 1.1) : 0, eCs = who === 'rosti' ? envAvg(t, 0.3) : 0;
    leaMouth.scale.y = 1 + eL * 1.6;
    var lookCat = 0; // Léa turns to the cat while he speaks
    T.lines.forEach(function(l){ if (l[2] === 'rosti') lookCat = Math.max(lookCat, ss((t - l[0] + 0.1) / 0.45) * (1 - ss((t - l[1] - 0.25) / 0.5))); });
    head.rotation.set(-0.06 + Math.sin(t * 0.5) * 0.012, 0.35 * lookCat + Math.sin(t * 0.33) * 0.03, Math.sin(t * 0.41) * 0.015);
    lea.position.y = Math.sin(t * 2 * Math.PI * 0.25) * 0.004;
    var flat = (t > T.lines[8][0] && t < T.lines[8][1] + 0.6) ? 1 : 0; // deadpan brows on the repeated line
    brows.forEach(function(b, i){ b.position.y = 0.105 - 0.012 * flat; b.rotation.z = (i ? -1 : 1) * 0.12 * flat; });
    var turn = ss((t - T.lines[10][0] - 0.3) / 0.6) * (1 - ss((t - T.lines[11][0] + 0.1) / 0.5));
    cHead.rotation.set(-0.04 + eCs * 0.05 + Math.sin(t * 0.37) * 0.015, -0.55 * turn + Math.sin(t * 0.29) * 0.06, Math.sin(t * 0.43) * 0.03 + eCs * 0.03);
    catBody.scale.set(1 - eCs * 0.012, 1 + eCs * 0.015, 1);
    catMouth.scale.y = 0.2 + eC * 1.3;
    var wide = 1 + 0.18 * ss((t - T.lines[10][0] - 0.6) / 0.4) * (1 - ss((t - T.lines[11][0] - 0.2) / 0.4));
    eyes.forEach(function(e){ var bl = ((t + 0.4) % 4.1) < 0.11 ? 0.15 : 1; e.scale.set(wide, wide * bl, 1); });
    ears.forEach(function(e, i){ e.rotation.z = -(i ? 0.09 : -0.09) * 2.2 + Math.sin(t * 0.7 + i) * 0.03; });
    tail.rotation.z = 0.4 + Math.sin(t * 2 * Math.PI * 0.22) * 0.2;
    for (var i = 0; i < ND; i++) { dP[i * 3] = 0.2 + (rnd(i, 1) - 0.5) * 2.4 + Math.sin(t * 0.13 + i) * 0.05; dP[i * 3 + 1] = 1.1 + rnd(i, 2) * 1.6 + Math.sin(t * 0.17 + i * 2) * 0.04; dP[i * 3 + 2] = -0.9 + rnd(i, 3) * 1.6; }
    dG.attributes.position.needsUpdate = true;
    anchors();
    // --- camera from the shot list (smootherstep push + barely visible handheld) ---
    var sh = shotAt(t), s = sh[0], u = ss((t - sh[1]) / Math.max(0.6, sh[2] - sh[1]));
    P0.copy(A[s[0][0]]).add(new TH.Vector3().fromArray(s[0][1])); L0.copy(A[s[1][0]]).add(new TH.Vector3().fromArray(s[1][1]));
    dir.copy(L0).sub(P0); P0.addScaledVector(dir, s[3] * u);
    var dist = P0.distanceTo(L0);
    P0.x += (Math.sin(t * 0.61) * 0.012 + Math.sin(t * 1.13) * 0.005) * dist; P0.y += (Math.sin(t * 0.47 + 1) * 0.008 + Math.sin(t * 0.97) * 0.004) * dist;
    cam.position.copy(P0); cam.fov = s[2]; cam.lookAt(L0); cam.rotateZ(Math.sin(t * 0.31) * 0.006);
    cam.setViewOffset(W, H, 0, -s[6] * H, W, H); cam.updateProjectionMatrix();
    var fv = new TH.Vector3(); cam.getWorldDirection(fv);
    dofM.uniforms.uFocus.value = Math.max(0.2, A[s[4]].clone().sub(cam.position).dot(fv)); dofM.uniforms.uAperture.value = s[5];
    // --- lights ---
    var flare = ss((t - T.lines[10][0] - 0.75) / 0.3) * (1 - ss((t - T.lines[10][0] - 1.4) / 1.4));
    logoM.color.setScalar(1 + flare * 2.2); screenL.intensity = 1.4 + flare * 1.2; lampL.intensity = 6 + Math.sin(t * 1.3) * 0.15;
    // --- subtitle ---
    var cur = null; for (var i = 0; i < T.subs.length; i++) if (t >= T.subs[i].t0 && t < T.subs[i].t1) cur = T.subs[i];
    if (cur) { subEl.textContent = cur.text; subEl.className = cur.spk === 'rosti' ? 'r' : '';
      subEl.style.opacity = Math.min(cl((t - cur.t0) / 0.1 + (cur.t0 === 0 ? 1 : 0)), cl((cur.t1 - t) / 0.12)).toFixed(3); }
    else subEl.style.opacity = 0;
    // --- render: HDR scene -> post ---
    r.setRenderTarget(rtScene); r.render(sc, cam); post(t);
  });
})();
"""
PUNCH = []
SFX = []
TAIL = 0.55
CAP_MAX = 3
