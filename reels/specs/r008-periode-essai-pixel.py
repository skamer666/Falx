"""Reel 008 — Période d'essai (art. 335b CO, 336c CO). Style : jeu vidéo rétro 8 bits (pixel art sur canvas, musique chiptune)."""
import json

VOICE = "fr-FR-RemyMultilingualNeural"
RATE = "+8%"

VO = ("Nouveau job à Fribourg ? Bienvenue au niveau un : la période d'essai. "
      "Règle numéro un : pendant l'essai, ton patron peut te licencier avec seulement sept jours de préavis. "
      "Mais toi aussi, tu peux partir en sept jours. "
      "Règle numéro deux : par défaut, l'essai dure un mois. Par écrit, il peut aller jusqu'à trois mois, jamais plus. "
      "Et maintenant, le boss final : tu tombes malade pendant l'essai. "
      "Ton patron peut quand même te licencier, car la protection spéciale ne commence qu'après l'essai. "
      "Dernier piège : chaque jour d'arrêt prolonge ton essai d'autant. "
      "Articles 335b et 336c du Code des obligations. Envoie ça à quelqu'un qui commence un nouveau job. Thrax Legal, lien en bio.")

META = {
    "id": "r008-periode-essai-pixel",
    "music": "chip",
    "caption": ("🎮 NIVEAU 1 : la période d'essai en Suisse.\n\n"
                "• Le 1er mois est un temps d'essai par défaut. Pendant l'essai, chacun peut résilier à tout moment avec 7 jours de préavis (art. 335b al. 1 CO).\n"
                "• Un accord écrit, un contrat-type ou une CCT peut prévoir autre chose (le raccourcir, le supprimer ou le prolonger), mais jamais au-delà de 3 mois (art. 335b al. 2 CO).\n"
                "• La protection contre le licenciement pendant une maladie ne s'applique qu'après le temps d'essai (art. 336c CO).\n"
                "• Si tu es malade ou accidenté pendant l'essai, l'essai est prolongé d'autant (art. 335b al. 3 CO).\n\n"
                "📤 Envoie ça à quelqu'un qui commence un nouveau job. Une question ? Thrax Legal, lien en bio.\n\n"
                "#periodedessai #nouveaujob #travail #suisse #fribourg #lausanne #genève #suisseromande #droitdutravail"),
    "yt_title": "Période d'essai en Suisse : 7 jours pour te virer… et pour partir #shorts",
    "tiktok_title": "Période d'essai en Suisse : les 3 règles à connaître (niveau 1)",
    "tags": ["période d'essai", "droit du travail suisse", "art. 335b CO", "nouveau job", "Fribourg"],
    "genome": {"style": "jeu-video-pixel-8bits", "palette": "nuit-violette/jaune/vert", "hook": "question + ville",
               "format": "niveaux-de-jeu (regles + boss final)", "topic": "travail/periode-essai", "mascot": "avatar-pixel + boss",
               "voice": "fr-FR-RemyMultilingualNeural", "captions": "police-pixel", "music": "chip", "length": "~35s"},
    "cover_t": 2.4,
}

CSS = """
#root { background:#141634; }
#px { position:absolute; left:0; top:0; width:1080px; height:1920px; image-rendering: pixelated; }
.px { font-family: "Press Start 2P", monospace; font-weight: 400; }
.hud { position:absolute; right:50px; top:70px; font-size:30px; color:#fff; text-align:right; line-height:1.6; }
.hud b { color:#ffd447; font-weight:400; }
.box { position:absolute; left:60px; top:300px; width:960px; height:470px; background:#0b0b1e; border:8px solid #fff;
       box-shadow: 0 0 0 8px #0b0b1e, inset 0 0 0 6px #3a3f99; text-align:center; display:flex; flex-direction:column;
       align-items:center; justify-content:center; gap:30px; padding:34px; line-height:1.35; color:#fff; }
.box .k { font-size:28px; color:#9aa3ff; }
.box .v { font-size:84px; color:#ffd447; }
.box .s { font-size:34px; }
.g { color:#5be35f; } .y { color:#ffd447; } .r { color:#ff4d5e; }
.bar { display:flex; gap:12px; }
.seg { position:relative; width:250px; height:64px; border:6px solid #fff; background:#22264f; }
.seg i { position:absolute; inset:0; transform-origin: 0 50%; }
.lab { display:flex; gap:12px; font-size:26px; line-height:1.4; }
.lab span { width:250px; }
.capbg { position:absolute; left:0; right:0; top:1428px; height:250px; background: rgba(5,5,20,0.62); }
.cap { top: 1460px; font-family: "Press Start 2P", monospace; font-weight:400; font-size: 40px; line-height: 1.55; letter-spacing: 0; }
.cap .cw { -webkit-text-stroke: 10px #000; }
.cap .cw.now { color:#ffd447; transform: none; }
.brand { font-family: "Schibsted Grotesk", sans-serif; font-size: 104px; font-weight: 900; letter-spacing: -0.05em; color:#fff; }
.brand span { color:#ff4d5e; }
"""


def body(w):
    T = {
        "bienvenue": w.a("Bienvenue au niveau"), "r1": w.a("Règle numéro un"), "sept": w.a("sept jours de préavis"),
        "toi": w.a("Mais toi aussi"), "r2": w.a("Règle numéro deux"), "defaut": w.a("par défaut,"),
        "ecrit": w.a("Par écrit,"), "jamais": w.a("jamais plus."), "boss": w.a("Et maintenant,"),
        "malade": w.a("tu tombes malade"), "quand": w.a("Ton patron peut quand"), "protection": w.a("car la protection"),
        "piege": w.a("Dernier piège"), "art": w.a("Articles 335b"), "envoie": w.a("Envoie ça"), "thrax": w.a("Thrax Legal,"),
        "total": w.total,
    }
    globals()["PUNCH"] = [T["sept"], T["boss"], T["quand"]]
    globals()["SCRIPT"] = SCRIPT_T.replace("__T__", json.dumps(T))
    B = lambda a, b: f'data-fx="pop" data-at="{a:.3f}" data-out="{b - 0.3:.3f}"'
    return f"""
<canvas id="px" width="1080" height="1920"></canvas>
<div class="hud px" data-fx="fade" data-at="0.1">NIVEAU <b>1</b><br>FRIBOURG</div>

<div class="box px" {B(0.15, T['r1'])}>
  <div class="k">NOUVEAU JOB</div>
  <div class="v">NIVEAU 1</div>
  <div class="s" data-fx="rise" data-at="{T['bienvenue']:.3f}">PERIODE D'ESSAI</div>
</div>

<div class="box px" {B(T['r1'], T['r2'])}>
  <div class="k">REGLE 1 · PREAVIS</div>
  <div class="v" data-fx="stamp" data-rot="0" data-at="{T['sept']:.3f}">7 JOURS</div>
  <div class="s">ton patron peut te licencier</div>
  <div class="s g" data-fx="rise" data-at="{T['toi']:.3f}">... et toi, partir</div>
</div>

<div class="box px" {B(T['r2'], T['boss'])}>
  <div class="k">REGLE 2 · DUREE</div>
  <div class="bar">
    <div class="seg"><i style="background:#5be35f" data-fx="width" data-d="0.5" data-at="{T['defaut'] + 0.3:.3f}"></i></div>
    <div class="seg"><i style="background:#ffd447" data-fx="width" data-d="0.5" data-at="{T['ecrit'] + 0.3:.3f}"></i></div>
    <div class="seg"><i style="background:#ffd447" data-fx="width" data-d="0.5" data-at="{T['ecrit'] + 0.7:.3f}"></i></div>
  </div>
  <div class="lab"><span class="g" data-fx="rise" data-at="{T['defaut'] + 0.3:.3f}">1 MOIS<br>par défaut</span><span class="y" data-fx="rise" data-at="{T['ecrit'] + 0.4:.3f}" style="width:512px">jusqu'à 3 MOIS<br>par écrit</span></div>
  <div class="s r" data-fx="stamp" data-rot="-4" data-at="{T['jamais']:.3f}">JAMAIS PLUS 🔒</div>
</div>

<div class="box px" {B(T['boss'], T['piege'])} style="border-color:#ff4d5e">
  <div class="v r" data-fx="pulse" data-at="{T['boss']:.3f}" style="font-size:64px">BOSS FINAL</div>
  <div class="s" data-fx="rise" data-at="{T['malade']:.3f}">🤒 malade pendant l'essai</div>
  <div class="s r" data-fx="stamp" data-rot="-5" data-at="{T['quand'] + 0.5:.3f}" style="font-size:40px">LICENCIEMENT<br>POSSIBLE</div>
  <div class="k" data-fx="rise" data-at="{T['protection']:.3f}" style="font-size:24px">protection spéciale<br>seulement APRES l'essai</div>
</div>

<div class="box px" {B(T['piege'], T['art'])}>
  <div class="k">DERNIER PIEGE</div>
  <div class="bar">
    <div class="seg" style="width:420px"><i style="background:#5be35f" data-fx="width" data-d="0.4" data-at="{T['piege'] + 0.2:.3f}"></i></div>
    <div class="seg" style="width:200px"><i style="background:#ff4d5e" data-fx="width" data-d="0.6" data-at="{T['piege'] + 1.2:.3f}"></i></div>
  </div>
  <div class="s" data-fx="rise" data-at="{T['piege'] + 1.2:.3f}"><span class="r">+1 jour malade</span><br>= +1 jour d'essai</div>
</div>

<div class="box px" {B(T['art'], T['envoie'])}>
  <div class="k">SOURCE</div>
  <div class="v" style="font-size:62px">ART. 335b<br>+ 336c CO</div>
  <div class="s">Code des obligations</div>
</div>

<div class="box px" data-fx="pop" data-at="{T['envoie']:.3f}">
  <div class="v g" style="font-size:56px">LEVEL CLEAR</div>
  <div class="s" style="font-size:30px">Envoie ça à quelqu'un<br>qui commence un nouveau job</div>
  <div class="brand" data-fx="zoom" data-at="{T['thrax']:.3f}">Thrax <span>Legal</span></div>
</div>

<div class="capbg"></div>
"""


SCRIPT_T = r"""
(function(){
  var T = __T__;
  var cv = document.getElementById('px'), X = cv.getContext('2d');
  var off = document.createElement('canvas'); off.width = 90; off.height = 160; var c = off.getContext('2d');
  function rect(x, y, w, h, col){ c.fillStyle = col; c.fillRect(Math.round(x), Math.round(y), w, h); }
  function spr(rows, pal, x, y, s){ for (var j = 0; j < rows.length; j++) for (var i = 0; i < rows[j].length; i++) { var k = rows[j][i]; if (k !== '.' && pal[k]) rect(x + i * s, y + j * s, s, s, pal[k]); } }
  function clamp(v){ return Math.max(0, Math.min(1, v)); }
  var HERO = ["..hhhh..", ".hhhhhh.", ".hssssh.", ".sesses.", ".ssssss.", "..smms..", ".bbbbbb.", "sbbbbbbs", "sbbbbbbs", ".pppppp.", ".pp..pp.", ".kk..kk."];
  var HERO2 = ["..hhhh..", ".hhhhhh.", ".hssssh.", ".sesses.", ".ssssss.", "..smms..", ".bbbbbb.", "sbbbbbbs", "sbbbbbbs", ".pppppp.", "..pppp..", "..kkkk.."];
  var BOSS = ["..gggggg..", ".gggggggg.", ".gssssssg.", ".sxxssxxs.", ".sesssses.", ".ssssssss.", "..sMMMMs..", "...ssss...", "cccwrrwccc", "cccwrrwccc", "ccccrrcccc", "s.cccccc.s", "..dd..dd..", ".kkk..kkk."];
  var HEART = [".rr.rr.", "rrrrrrr", "rrrrrrr", ".rrrrr.", "..rrr..", "...r..."];
  var heroPal = {h:'#3b2416', s:'#f3c79b', e:'#141414', m:'#b8443c', b:'#2f80ed', p:'#1d2a44', k:'#111111'};
  var sickPal = {h:'#3b2416', s:'#b5d77e', e:'#141414', m:'#5b7a2e', b:'#2f80ed', p:'#1d2a44', k:'#111111'};
  var bossPal = {g:'#9a9aa8', s:'#f0c09a', x:'#141414', e:'#141414', M:'#7a1f1f', c:'#3a3a46', w:'#ffffff', r:'#e3001b', d:'#22222a', k:'#0a0a0a'};
  var stars = []; for (var i = 0; i < 46; i++) stars.push([(i * 37 + 11) % 90, (i * 53) % 46 + 2, i % 3]);
  var houses = [[0,78,10],[11,73,9],[21,80,8],[30,75,8],[39,82,7],[64,80,7],[72,74,9],[82,79,8]];
  R.on(function(t){
    var boss = t >= T.boss && t < T.piege, end = t >= T.envoie;
    var sky = boss ? ['#2a0710', '#4a0d1c', '#7a1a2a'] : ['#141634', '#1f2463', '#30368c'];
    rect(0, 0, 90, 44, sky[0]); rect(0, 44, 90, 22, sky[1]); rect(0, 66, 90, 52, sky[2]);
    for (var i = 0; i < stars.length; i++) { var s = stars[i]; if ((Math.floor(t * 3) + i) % 9 !== 0) rect(s[0], s[1], 1, 1, s[2] ? '#ffffff' : '#ffd447'); }
    rect(74, 20, 6, 6, boss ? '#ff6b6b' : '#fff4c2'); rect(73, 21, 1, 4, boss ? '#ff6b6b' : '#fff4c2'); rect(80, 21, 1, 4, boss ? '#ff6b6b' : '#fff4c2');
    c.save(); c.translate(0, 18);
    var city = boss ? '#1a0408' : '#0e1030';
    rect(0, 86, 90, 14, city);
    houses.forEach(function(h){ rect(h[0], h[1], h[2], 100 - h[1], city); rect(h[0] + 1, h[1] - 2, h[2] - 2, 2, city); });
    rect(49, 58, 11, 42, city); rect(51, 54, 7, 4, city); rect(53, 50, 3, 4, city); rect(54, 46, 1, 4, city);
    for (var i = 0; i < houses.length; i++) { var h = houses[i]; for (var y = h[1] + 3; y < 96; y += 5) for (var x = h[0] + 2; x < h[0] + h[2] - 1; x += 3) if (((x * 7 + y * 3 + i) % 5) < 2) rect(x, y, 1, 2, '#ffd447'); }
    rect(53, 64, 3, 5, '#ffd447'); rect(53, 76, 3, 5, '#ffd447');
    rect(0, 100, 90, 2, '#46c24a'); rect(0, 102, 90, 1, '#2e8f33');
    for (var y = 103; y < 160; y += 4) for (var x = 0; x < 90; x += 4) rect(x, y, 4, 4, ((x + y - 103) / 4) % 2 ? '#6b4020' : '#5a3418');
    var nh = 3;
    if (t >= T.quand + 0.5 && t < T.art) nh = 1; else if (t >= T.malade + 0.3 && t < T.art) nh = 2;
    for (var i = 0; i < 3; i++) { var lost = i >= nh; if (!lost || Math.floor(t * 6) % 2) spr(HEART, {r: lost ? '#55304a' : '#ff4d5e'}, 4 + i * 9, 6, 1); }
    var hx = -24 + 44 * clamp(t / 1.6), hy = 64;
    var walking = t < 1.6 || (end && t > T.thrax);
    if (end) { hy -= Math.abs(Math.sin((t - T.envoie) * 7)) * 10; }
    var sick = t >= T.malade && t < T.art;
    spr(walking && Math.floor(t * 8) % 2 ? HERO2 : HERO, sick ? sickPal : heroPal, hx, hy, 3);
    if (sick) { rect(hx + 20, hy + 14, 8, 2, '#ffffff'); rect(hx + 27, hy + 13, 3, 4, '#ff4d5e'); if (Math.floor(t * 3) % 2) rect(hx + 3, hy - 7, 2, 4, '#7fd3ff'); }
    if (t >= T.r1) {
      var k = clamp((t - T.r1) / 0.45), by = -60 + 118 * (1 - Math.pow(1 - k, 3)), bx = 56, sc = 3;
      if (boss) { sc = 4; bx = 47 + (Math.floor(t * 20) % 2); by = 44; }
      if (end) bx += (t - T.envoie) * 40;
      spr(BOSS, bossPal, bx, by, sc);
      if (t >= T.r1 && t < T.r2 && Math.floor(t * 2) % 2) { rect(bx - 6, by + 2, 5, 5, '#ffffff'); rect(bx - 5, by + 3, 3, 1, '#e3001b'); rect(bx - 5, by + 5, 2, 1, '#e3001b'); }
    }
    c.restore();
    var fl = t >= T.boss ? Math.max(0, 1 - (t - T.boss) / 0.35) : 0;
    if (fl > 0) { c.globalAlpha = fl; rect(0, 0, 90, 160, '#ffffff'); c.globalAlpha = 1; }
    if (end) { var cols = ['#ffd447', '#5be35f', '#ff4d5e', '#7fd3ff', '#ffffff']; for (var i = 0; i < 40; i++) { var px = (i * 29) % 90, py = ((t - T.envoie) * (18 + i % 7 * 4) + i * 13) % 100; rect(px, py, 1, 1, cols[i % 5]); } }
    X.imageSmoothingEnabled = false; X.drawImage(off, 0, 0, 1080, 1920);
  });
})();
"""
PUNCH = []
SFX = []
TAIL = 1.6
CAP_MAX = 3
