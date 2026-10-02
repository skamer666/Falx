"""Test 3D : figurine en costume (Three.js) rendue image par image."""
VO = "Test de la 3D. Bonjour la Suisse romande."
RATE = "+12%"
META = {"id": "t3d", "music": "drive", "caption": "", "yt_title": "", "tags": [], "genome": {}, "cover_t": 1.0}
USE_THREE = True
CSS = "#root{background:#dfe9f2} #gl{position:absolute;left:0;top:0;width:1080px;height:1920px}"
def body(w):
    return '<canvas id="gl" width="1080" height="1920"></canvas>'
SCRIPT = """
(function(){
  const T = THREE, cv = document.getElementById('gl');
  const r = new T.WebGLRenderer({canvas: cv, antialias: true, preserveDrawingBuffer: true});
  r.setSize(1080, 1920, false); r.shadowMap.enabled = true;
  const sc = new T.Scene(); sc.background = new T.Color('#dfe9f2');
  const cam = new T.PerspectiveCamera(35, 1080/1920, 0.1, 100); cam.position.set(0, 1.6, 9);
  sc.add(new T.HemisphereLight('#ffffff', '#8aa0b8', 1.4));
  const d = new T.DirectionalLight('#ffffff', 2.2); d.position.set(3, 6, 5); d.castShadow = true; sc.add(d);
  const mat = (c, r_=0.5) => new T.MeshStandardMaterial({color: c, roughness: r_});
  const g = new T.Group(); sc.add(g);
  const body = new T.Mesh(new T.CapsuleGeometry(0.9, 1.2, 8, 24), mat('#1d2a44')); body.position.y = 1.0; body.castShadow = true; g.add(body);
  const head = new T.Mesh(new T.SphereGeometry(0.95, 48, 32), mat('#f1c7a5', 0.6)); head.position.y = 2.9; head.castShadow = true; g.add(head);
  const hair = new T.Mesh(new T.SphereGeometry(0.98, 48, 32, 0, Math.PI*2, 0, Math.PI*0.45), mat('#3a2a20', 0.8)); hair.position.y = 2.95; g.add(hair);
  const eyeM = mat('#14141a', 0.2);
  [-0.33, 0.33].forEach(x => { const e = new T.Mesh(new T.SphereGeometry(0.11, 24, 16), eyeM); e.position.set(x, 2.95, 0.86); g.add(e); });
  const shirt = new T.Mesh(new T.ConeGeometry(0.42, 0.9, 3), mat('#ffffff')); shirt.rotation.z = Math.PI; shirt.position.set(0, 1.85, 0.72); g.add(shirt);
  const tie = new T.Mesh(new T.BoxGeometry(0.16, 0.7, 0.05), mat('#c8102e')); tie.position.set(0, 1.7, 0.92); g.add(tie);
  const pin = new T.Mesh(new T.BoxGeometry(0.34, 0.34, 0.08), mat('#da291c', 0.3)); pin.position.set(0.55, 1.75, 0.82); g.add(pin);
  const c1 = new T.Mesh(new T.BoxGeometry(0.22, 0.07, 0.03), mat('#ffffff')); c1.position.set(0.55, 1.75, 0.87); g.add(c1);
  const c2 = new T.Mesh(new T.BoxGeometry(0.07, 0.22, 0.03), mat('#ffffff')); c2.position.set(0.55, 1.75, 0.87); g.add(c2);
  const floor = new T.Mesh(new T.CircleGeometry(4, 64), mat('#c9d6e3', 0.9)); floor.rotation.x = -Math.PI/2; floor.position.y = -0.5; floor.receiveShadow = true; sc.add(floor);
  R.on(function(t){
    g.rotation.y = Math.sin(t * 1.2) * 0.6;
    head.position.y = 2.9 + R.env(t) * 0.08; head.rotation.z = Math.sin(t*2.1)*0.06;
    cam.position.x = Math.sin(t*0.4)*1.2; cam.lookAt(0, 1.8, 0);
    r.render(sc, cam);
  });
})();
"""
PUNCH = []
SFX = []
TAIL = 0.8
