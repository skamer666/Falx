"""Reel 012 — La facture zombie : prescription (art. 128 ch. 3, 135, 142 CO ; art. 63 al. 2 CO). Style : film d'horreur VHS,
facture-monstre qui parle (personnage jamais utilisé), pierre tombale, scintillement, voix grave."""
import json

VOICE = "fr-CH-FabriceNeural"
RATE = "+4%"

VO = ("Sion, minuit. Une facture de dentiste de deux mille dix-neuf revient te hanter. Tu dois vraiment payer ? Pas forcément. "
      "En Suisse, une facture de médecin ou de dentiste se prescrit par cinq ans. Après ça, elle est comme morte. "
      "Mais attention, elle peut ressusciter : une poursuite ou une reconnaissance de dette relance le compteur. "
      "Et voici le piège le plus vicieux : la prescription ne s'applique pas toute seule. "
      "Si tu reçois un commandement de payer, fais opposition, puis invoque la prescription toi-même. "
      "Et si tu paies une dette prescrite, tu ne pourras plus te faire rembourser. "
      "Articles 128 et 142 du Code des obligations. Envoie ça à quelqu'un qui garde tout dans un tiroir. Thrax Legal, lien en bio.")

META = {
    "id": "r012-facture-zombie-horreur",
    "music": "tension",
    "caption": ("🧟 Une vieille facture de dentiste de 2019 revient te hanter à Sion. Tu dois payer ?\n\n"
                "En Suisse, les créances des médecins et dentistes pour leurs soins se prescrivent par 5 ans (art. 128 ch. 3 CO), "
                "en général dès qu'elles sont exigibles. Le délai recommence notamment après une poursuite ou une reconnaissance de dette, "
                "par exemple un acompte (art. 135 CO).\n\n"
                "Le juge ne relève pas la prescription d'office : c'est à toi de l'invoquer (art. 142 CO). Face à un commandement de payer, "
                "l'opposition se fait dans les 10 jours (art. 74 LP). Et ce qui a été payé pour une dette prescrite ne peut pas être "
                "réclamé en retour (art. 63 al. 2 CO).\n\n"
                "📤 Envoie ça à quelqu'un qui garde tout dans un tiroir. Une question ? Thrax Legal, lien en bio.\n\n"
                "#prescription #facture #dettes #poursuite #suisse #sion #valais #suisseromande #halloween"),
    "yt_title": "Une facture de 2019 revient te hanter : tu dois payer ? (Suisse) #shorts",
    "tiktok_title": "La facture zombie : une dette de 2019, tu dois encore payer ? (Suisse)",
    "tags": ["prescription", "facture", "art. 128 CO", "commandement de payer", "Sion"],
    "genome": {"style": "horreur-vhs", "palette": "noir/vert-toxique/rouge", "hook": "ville + minuit + menace",
               "format": "mythe-vs-regle + piege", "topic": "argent/prescription-dettes", "mascot": "facture-monstre-qui-parle",
               "voice": "fr-CH-FabriceNeural", "captions": "blanc-vhs-vert", "music": "tension", "length": "~40s"},
    "cover_t": 1.8,
}

CSS = """
#root { background:#050607; color:#e8ffe9; }
.room { position:absolute; inset:0; background: radial-gradient(ellipse at 50% 42%, #18241c 0%, #0a0f0c 45%, #020303 100%); }
.scan { position:absolute; inset:0; background: repeating-linear-gradient(0deg, rgba(0,0,0,0.28) 0 3px, transparent 3px 6px); pointer-events:none; z-index:70; }
.vig { position:absolute; inset:0; background: radial-gradient(ellipse at 50% 45%, transparent 45%, rgba(0,0,0,0.85) 100%); pointer-events:none; z-index:69; }
.osd { position:absolute; font-family: "Press Start 2P", monospace; font-size:28px; color:#e8ffe9; z-index:71; text-shadow: 2px 0 #ff2a2a, -2px 0 #2affd5; }
.monster { position:absolute; left:240px; top:300px; width:600px; height:800px; transform-origin: 50% 0; z-index:20; }
.ttl { position:absolute; left:60px; right:60px; text-align:center; font-weight:900; letter-spacing:-0.03em; z-index:40; }
.ttl.big { font-size:120px; line-height:0.95; }
.ttl.mid { font-size:64px; line-height:1.08; }
.toxic { color:#7dff6a; text-shadow: 0 0 30px rgba(125,255,106,0.6); }
.blood { color:#ff2a2a; text-shadow: 0 0 30px rgba(255,42,42,0.55); }
.stone { position:absolute; left:290px; top:480px; width:500px; height:560px; background: linear-gradient(#6b7076, #3c4045); border-radius:250px 250px 20px 20px;
         box-shadow: inset -30px -20px 60px rgba(0,0,0,0.5), 0 40px 80px rgba(0,0,0,0.8); display:flex; flex-direction:column; align-items:center; justify-content:center; color:#1d2024; text-align:center; }
.stone b { font-size:110px; font-weight:900; letter-spacing:0.04em; }
.stone span { font-size:44px; font-weight:800; line-height:1.3; }
.ground { position:absolute; left:0; right:0; top:1010px; height:140px; background: radial-gradient(ellipse at 50% 0%, #1f2a1c 0%, #0a0d09 70%); border-radius:50% 50% 0 0; }
.counter { position:absolute; left:0; right:0; top:300px; text-align:center; font-family:"Press Start 2P", monospace; font-size:150px; color:#7dff6a; text-shadow: 0 0 40px rgba(125,255,106,0.7); z-index:41; }
.paper { position:absolute; left:150px; right:150px; background:#f3efe2; color:#1a1a1a; border-radius:8px; padding:34px 40px; box-shadow:0 30px 70px rgba(0,0,0,0.7); transform: rotate(-3deg); z-index:42; }
.paper h4 { font-size:44px; font-weight:900; letter-spacing:0.02em; }
.paper p { font-size:36px; font-weight:700; margin-top:10px; }
.chip { display:inline-block; background:#7dff6a; color:#071007; font-size:72px; font-weight:900; border-radius:22px; padding:12px 34px; }
.brand { font-size:120px; font-weight:900; letter-spacing:-0.05em; color:#e8ffe9; }
.brand span { color:#7dff6a; }
.cap { top: 1300px; font-size: 74px; z-index:60; }
.cap .cw { color:#e8ffe9; -webkit-text-stroke: 12px #000; }
.cap .cw.now { color:#7dff6a; }
"""


def monster_svg():
    # A dentist's invoice that came back from the dead: torn paper, glowing eyes, jagged mouth (opened by the voice).
    return """
<svg viewBox="0 0 600 800" width="600" height="800">
  <defs><filter id="glow"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <path d="M60 40 L540 40 L540 690 L500 720 L470 690 L430 730 L390 690 L350 735 L310 690 L270 730 L230 690 L190 735 L150 690 L110 725 L60 690 Z"
        fill="#d9d4bf" stroke="#2b2b22" stroke-width="6"/>
  <path d="M60 40 L540 40 L540 690 L500 720 L470 690 L430 730 L390 690 L350 735 L310 690 L270 730 L230 690 L190 735 L150 690 L110 725 L60 690 Z"
        fill="url(#none)" opacity="0.2"/>
  <text x="300" y="120" text-anchor="middle" font-size="46" font-weight="900" fill="#2b2b22" font-family="Schibsted Grotesk">FACTURE</text>
  <text x="300" y="170" text-anchor="middle" font-size="28" font-weight="700" fill="#4a473c" font-family="Schibsted Grotesk">Cabinet dentaire · 2019</text>
  <rect x="110" y="560" width="380" height="8" fill="#4a473c" opacity="0.5"/>
  <rect x="110" y="590" width="300" height="8" fill="#4a473c" opacity="0.5"/>
  <text x="440" y="660" text-anchor="end" font-size="40" font-weight="900" fill="#8b1010" font-family="Schibsted Grotesk">CHF 840.–</text>
  <g filter="url(#glow)">
    <ellipse id="eyeL" cx="210" cy="270" rx="50" ry="34" fill="#7dff6a"/>
    <ellipse id="eyeR" cx="390" cy="270" rx="50" ry="34" fill="#7dff6a"/>
  </g>
  <circle cx="210" cy="272" r="13" fill="#071007"/><circle cx="390" cy="272" r="13" fill="#071007"/>
  <path d="M150 215 L260 245 M450 215 L340 245" stroke="#2b2b22" stroke-width="14" stroke-linecap="round"/>
  <g id="mouth" transform="translate(300 400)">
    <path id="mouthIn" d="M-150 0 Q0 30 150 0 Q0 60 -150 0 Z" fill="#1a0505"/>
    <path id="teethT" d="M-140 0 L-115 28 L-90 0 L-65 28 L-40 0 L-15 28 L10 0 L35 28 L60 0 L85 28 L110 0 L135 28 L150 0 Z" fill="#f4f1e6"/>
  </g>
  <path d="M60 330 Q10 360 20 430 M540 330 Q590 360 580 430" stroke="#2b2b22" stroke-width="10" fill="none" stroke-linecap="round"/>
</svg>"""


def body(w):
    T = {k: w.a(p) for k, p in {
        "sion": "Sion, minuit.", "facture": "Une facture de dentiste", "payer": "Tu dois vraiment payer", "pas": "Pas forcément.",
        "suisse": "En Suisse,", "cinq": "par cinq ans.", "morte": "elle est comme morte.", "attention": "Mais attention,",
        "poursuite": "une poursuite", "compteur": "relance le compteur.", "piege": "Et voici le piège", "seule": "pas toute seule.",
        "cdp": "Si tu reçois un commandement", "opp": "fais opposition,", "invoque": "puis invoque", "paies": "Et si tu paies",
        "rembourser": "te faire rembourser.", "art": "Articles", "envoie": "Envoie ça", "thrax": "Thrax Legal,"}.items()}
    T["total"] = w.total
    globals()["PUNCH"] = [T["facture"], T["attention"], T["piege"]]
    globals()["SCRIPT"] = SCRIPT_T.replace("__T__", json.dumps(T))
    globals()["SFX"] = [{"t": T["facture"], "k": "impact"}, {"t": T["morte"], "k": "stamp"}, {"t": T["attention"], "k": "impact"}]
    O = lambda a, b: f'data-at="{a:.3f}" data-out="{b - 0.25:.3f}"'
    return f"""
<div class="room"></div>
<div class="osd" style="left:50px;top:60px" data-fx="none" data-at="0">● REC</div>
<div class="osd" style="right:50px;top:60px;text-align:right" id="clock" data-fx="none" data-at="0">SION 00:00</div>

<div class="ttl mid" style="top:170px" data-fx="fade" data-d="0.4" {O(0.0, T['suisse'])}><span class="toxic">Sion, minuit.</span></div>
<div class="monster" id="mon" style="opacity:0">{monster_svg()}</div>
<div class="ttl big blood" style="top:1120px" data-fx="shake" {O(T['payer'], T['suisse'])}>Tu dois payer ?</div>

<div class="counter" data-fx="none" {O(T['suisse'], T['morte'])}><span id="yr">2019</span></div>
<div class="ttl mid" style="top:560px" data-fx="rise" {O(T['suisse'] + 0.3, T['morte'])}>médecin / dentiste<br><span class="toxic">= 5 ans</span></div>
<div class="ground" data-fx="fade" {O(T['morte'] - 0.1, T['attention'])}></div>
<div class="stone" data-fx="rise" data-dy="400" {O(T['morte'] - 0.1, T['attention'])}><b>R.I.P.</b><span>Facture<br>2019 – 2024</span><span style="font-size:34px;color:#2c3035">prescrite</span></div>

<div class="ttl big toxic" style="top:220px" data-fx="shake" {O(T['attention'], T['piege'])}>ELLE PEUT<br>RESSUSCITER</div>
<div class="paper" style="top:600px" data-fx="drop" {O(T['poursuite'], T['piege'])}><h4>⚡ Poursuite</h4><p>ou reconnaissance de dette</p></div>
<div class="ttl mid" style="top:460px" data-fx="rise" {O(T['compteur'], T['piege'])}>= le compteur <span class="blood">repart à zéro</span></div>

<div class="ttl big blood" style="top:190px" data-fx="stamp" data-rot="-4" {O(T['piege'], T['art'])}>LE PIÈGE</div>
<div class="ttl mid" style="top:360px" data-fx="rise" {O(T['seule'] - 0.4, T['art'])}>elle ne s'applique<br><span class="toxic">pas toute seule</span></div>
<div class="paper" style="top:620px" data-fx="drop" {O(T['cdp'], T['paies'])}><h4>📄 Commandement de payer</h4><p data-fx="rise" data-at="{T['opp']:.3f}">1. fais opposition</p><p data-fx="rise" data-at="{T['invoque']:.3f}">2. invoque la prescription</p></div>
<div class="ttl mid" style="top:640px" data-fx="stamp" data-rot="-3" {O(T['paies'], T['art'])}>💸 Dette prescrite payée<br><span class="blood">= pas remboursée</span></div>

<div class="ttl mid" style="top:520px" data-fx="stamp" data-rot="-3" {O(T['art'], T['envoie'])}><span class="chip">Art. 128 + 142 CO</span><br><span style="font-size:42px">Code des obligations</span></div>
<div class="ttl mid" style="top:400px" data-fx="rise" data-at="{T['envoie']:.3f}">📤 Envoie ça à quelqu'un<br>qui garde tout dans un tiroir</div>
<div class="ttl" style="top:700px" data-fx="zoom" data-at="{T['thrax']:.3f}"><span class="brand">Thrax <span>Legal</span></span></div>

<div class="vig"></div><div class="scan" id="scan"></div>
"""


SCRIPT_T = r"""
(function(){
  var T = __T__;
  var root = document.getElementById('root'), mon = document.querySelector('#mon svg'), wrap = document.getElementById('mon');
  var mi = document.getElementById('mouthIn'), tt = document.getElementById('teethT'), yr = document.getElementById('yr');
  var clock = document.getElementById('clock'), eyes = [document.getElementById('eyeL'), document.getElementById('eyeR')];
  R.on(function(t){
    // Flicker (deterministic) + VHS clock.
    var f = 0.86 + 0.14 * Math.abs(Math.sin(t * 37.1) * Math.sin(t * 11.3));
    if (Math.floor(t * 30) % 47 === 0) f = 0.45;
    root.style.filter = 'brightness(' + f.toFixed(3) + ') contrast(1.08)';
    var s = Math.floor(t); clock.textContent = 'SION 00:' + (s < 10 ? '0' : '') + s;
    // Monster talks while it is on screen (the narrator is the invoice's victim; the mouth just snarls with the voice).
    var e = R.env(t), open = t < T.suisse ? e : e * 0.6;
    mi.setAttribute('d', 'M-150 0 Q0 ' + (30 + open * 120) + ' 150 0 Q0 ' + (60 + open * 200) + ' -150 0 Z');
    tt.setAttribute('transform', 'translate(0 ' + (open * 10) + ')');
    var blink = (Math.floor(t * 30) % 97) < 3 ? 0.1 : 1;
    eyes.forEach(function(el){ el.setAttribute('ry', 34 * blink); });
    mon.style.transform = 'rotate(' + (Math.sin(t * 2.3) * 3) + 'deg) scale(' + (1 + Math.sin(t * 1.7) * 0.02) + ')';
    // The invoice-monster appears twice: drops in at the hook, then crawls back up from below when it "resurrects".
    var r1 = t >= T.facture - 0.1 && t < T.suisse - 0.2, r2 = t >= T.attention && t < T.art - 0.2;
    if (r1) { var k = Math.min(1, (t - T.facture + 0.1) / 0.5); k = 1 - Math.pow(1 - k, 3); wrap.style.opacity = 1; wrap.style.transform = 'translateY(' + ((1 - k) * -900) + 'px)'; }
    else if (r2) { var k2 = Math.min(1, (t - T.attention) / 0.8); k2 = 1 - Math.pow(1 - k2, 3); wrap.style.opacity = 1;
      wrap.style.transform = 'translateY(' + (600 + (1 - k2) * 500) + 'px) scale(0.5)'; }
    else wrap.style.opacity = 0;
    // Years flipping 2019 -> 2024.
    if (t >= T.suisse) { var u = Math.min(1, (t - T.suisse - 0.3) / 1.8); yr.textContent = String(2019 + Math.max(0, Math.round(u * 5))); }
  });
})();
"""
PUNCH = []
SFX = []
TAIL = 1.6
CAP_MAX = 3
