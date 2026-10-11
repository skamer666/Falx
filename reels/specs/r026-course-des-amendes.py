"""Reel 026 — « La course des amendes » : format course de bonshommes en bâton (codes Stick Odds) avec voix (Vivienne).
« À Lausanne, lequel te coûte le plus cher ? Choisis ton couloir. » Le compteur en francs monte, chaque coureur arrive
sur le montant de son amende d'ordre (OAO, montants fixes fédéraux), puis le dernier ne s'arrête jamais : délit de
chauffard, peine privative de liberté d'un à quatre ans (art. 90 al. 3 et 4 let. b LCR). Barreaux qui tombent."""
import json

VOICE = "fr-FR-VivienneMultilingualNeural"
RATE = "+10%"

VO = ("À Lausanne, lequel te coûte le plus cher ? Choisis ton couloir. C'est parti ! "
      "Quarante francs : cinq kilomètres-heure de trop en ville. "
      "Soixante : pas de ceinture. "
      "Cent : le téléphone en main. "
      "Deux cents : pas de vignette sur l'autoroute. "
      "Deux cent cinquante : un feu rouge grillé. "
      "Et le dernier ? Cinquante kilomètres-heure de trop en ville. "
      "Là, ce n'est plus une amende. C'est la prison : un à quatre ans. "
      "Toi, tu avais choisi lequel ? Un mot en commentaire.")

# display order (mixed on purpose so viewers have to guess) : (label, amount CHF or None, display, source, color, spoken anchor)
LANES = [
    ("Téléphone en main au volant", 100, "100 CHF", "amende d'ordre", "#2e86ab", "Cent :"),
    ("Griller un feu rouge", 250, "250 CHF", "amende d'ordre", "#e4572e", "Deux cent cinquante"),
    ("Rouler sans ceinture", 60, "60 CHF", "amende d'ordre", "#f3a712", "Soixante :"),
    ("+50 km/h en ville", None, "PRISON", "1 à 4 ans · art. 90 LCR", "#111111", "Cinquante kilomètres-heure"),
    ("Autoroute sans vignette", 200, "200 CHF", "amende", "#3bb273", "Deux cents :"),
    ("+5 km/h en ville", 40, "40 CHF", "amende d'ordre", "#7768ae", "Quarante francs"),
]

META = {
    "id": "r026-course-des-amendes",
    "music": "drive",
    "music_gain": -2,
    "caption": ("🚗 À Lausanne, lequel te coûte le plus cher ? Choisis ton couloir avant de regarder.\n\n"
                "Amendes d'ordre (montants fixes, partout en Suisse, conducteur) :\n"
                "• +1 à 5 km/h en localité : 40 CHF\n• Pas de ceinture : 60 CHF\n• Téléphone tenu en main en conduisant : 100 CHF\n"
                "• Feu rouge : 250 CHF\n• Autoroute sans vignette : 200 CHF d'amende (et la vignette à acheter)\n\n"
                "🚨 +50 km/h là où la limite est de 50 km/h : délit de chauffard, peine privative de liberté d'un à quatre ans "
                "(art. 90 al. 3 et 4 LCR), en plus du retrait de permis.\n"
                "Au-delà des cas couverts par l'amende d'ordre (par exemple dès +16 km/h en localité), c'est une procédure pénale ordinaire.\n\n"
                "💬 Tu avais choisi lequel ? Un mot en commentaire. Thrax Legal, lien en bio.\n\n"
                "#amende #permis #radar #lausanne #genève #suisse #suisseromande #voiture #lesaviezvous #droit"),
    "yt_title": "Amendes en Suisse : lequel te coûte le plus cher ? #shorts",
    "tiktok_title": "Lequel te coûte le plus cher en Suisse ? Choisis ton couloir 🚗",
    "first_comment": "Tu avais choisi quel couloir ? 👇",
    "tags": ["amende d'ordre", "excès de vitesse", "art. 90 LCR", "vignette", "Lausanne"],
    "genome": {"style": "course-stick-figures-data + voix (codes Stick Odds)", "palette": "beige / couloirs verts / rouge prison",
               "hook": "pari : choisis ton couloir + ville", "format": "course + compteur CHF + twist prison + un mot en commentaire",
               "topic": "route/amendes", "mascot": "bonshommes en bâton", "voice": "fr-FR-VivienneMultilingualNeural",
               "captions": "mot à mot bas", "music": "drive", "length": "~25s"},
    "cover_t": 1.2,
}

CSS = """
#root { background:#f1eee6; color:#1d1d1f; }
.brand { position:absolute; left:0; right:0; top:80px; text-align:center; font-size:26px; font-weight:800; letter-spacing:0.14em; color:#9a958a; }
.head { position:absolute; left:40px; right:40px; top:150px; text-align:center; }
.h1 { font-size:62px; font-weight:900; letter-spacing:-0.02em; line-height:1.05; }
.h3 { font-size:44px; font-weight:900; margin-top:14px; letter-spacing:0.02em; color:#e4572e; }
.cnt { position:absolute; left:0; right:0; top:140px; text-align:center; }
.cnt .k { font-size:28px; font-weight:800; letter-spacing:0.1em; color:#6e6a60; }
.cnt .n { font-size:140px; font-weight:900; letter-spacing:-0.04em; line-height:1; font-variant-numeric: tabular-nums; }
.cnt .n.red { color:#d1121f; }
.legend { position:absolute; left:60px; right:60px; top:420px; height:10px; display:flex; gap:16px; }
.legend i { flex:1; height:8px; border-radius:4px; opacity:0.35; }
#lanes { position:absolute; left:0; right:0; top:450px; }
.lane { position:relative; height:180px; border-top:2px solid rgba(255,255,255,0.7); overflow:hidden; }
.lane:nth-child(odd) { background:#cfe6c4; } .lane:nth-child(even) { background:#bfdcb2; }
.lane .lb { position:absolute; left:22px; top:12px; display:flex; align-items:center; gap:10px; font-size:30px; font-weight:800; z-index:3; }
.lane .lb b { width:32px; height:32px; border-radius:50%; color:#fff; font-size:19px; display:flex; align-items:center; justify-content:center; }
.lane .rk { font-size:18px; font-weight:900; padding:2px 8px; border-radius:6px; background:#1d1d1f; color:#fff; opacity:0; }
.lane .rt { position:absolute; right:22px; top:10px; font-size:32px; font-weight:900; opacity:0; z-index:3; }
.lane svg.crowd { position:absolute; left:0; top:52px; width:1080px; height:125px; }
.lane .runner { position:absolute; top:60px; width:62px; height:116px; z-index:2; }
.lane .flash { position:absolute; inset:0; opacity:0; }
.bars { position:absolute; left:0; right:0; top:0; height:180px; z-index:4; transform:translateY(-200px);
        background: repeating-linear-gradient(90deg, transparent 0 46px, #2a2a2e 46px 58px); }
.bars::after { content:""; position:absolute; left:0; right:0; top:0; height:14px; background:#2a2a2e; }
.bars::before { content:""; position:absolute; left:0; right:0; bottom:0; height:14px; background:#2a2a2e; }
.finish { position:absolute; right:56px; top:0; bottom:0; width:6px; background:repeating-linear-gradient(#1d1d1f 0 10px, #fff 10px 20px); opacity:0.55; }
.redwash { position:absolute; inset:0; background:radial-gradient(ellipse at 50% 55%, rgba(209,18,31,0.0), rgba(209,18,31,0.45)); opacity:0; pointer-events:none; }
.stamp { position:absolute; left:0; right:0; top:760px; text-align:center; opacity:0; z-index:6; }
.stamp div { display:inline-block; font-size:120px; font-weight:900; color:#fff; background:#d1121f; padding:10px 40px; border-radius:20px;
             transform:rotate(-5deg); box-shadow:0 20px 60px rgba(209,18,31,0.5); letter-spacing:-0.02em; }
.stamp small { display:block; font-size:44px; font-weight:800; color:#d1121f; margin-top:20px; }
.card { position:absolute; left:70px; right:70px; top:470px; background:#fbfaf6; border:4px solid #1d1d1f; border-radius:28px; padding:30px 40px; opacity:0;
        box-shadow:0 20px 50px rgba(0,0,0,0.18); z-index:7; }
.card .t { font-size:40px; font-weight:900; text-align:center; letter-spacing:0.06em; margin-bottom:12px; }
.row { display:flex; align-items:center; gap:16px; padding:12px 0; border-bottom:2px solid #ece8de; }
.row b { flex:none; width:44px; height:44px; border-radius:50%; color:#fff; font-size:22px; display:flex; align-items:center; justify-content:center; }
.row .l { flex:1; font-size:31px; font-weight:800; line-height:1.1; }
.row .l small { display:block; font-size:21px; font-weight:600; color:#8a857a; }
.row .d { font-size:34px; font-weight:900; text-align:right; }
.row.p .d { color:#d1121f; }
.card .q { font-size:38px; font-weight:900; text-align:center; margin-top:20px; }
.card .q2 { font-size:24px; font-weight:600; text-align:center; color:#6e6a60; margin-top:6px; }

.chflag { position:relative; display:inline-block; width:var(--s); height:var(--s); background:#d52b1e; border-radius:calc(var(--s) * 0.08);
          box-shadow:0 6px 18px rgba(213,43,30,0.35); vertical-align:middle; }
.chflag::before, .chflag::after { content:""; position:absolute; background:#fff; left:50%; top:50%; transform:translate(-50%,-50%); }
.chflag::before { width:62.5%; height:18.75%; } .chflag::after { width:18.75%; height:62.5%; }
.flagtop { position:absolute; left:0; right:0; top:40px; text-align:center; }
.brand { top:118px !important; }
.head { top:175px !important; } .cnt { top:165px !important; }
.card .t .chflag { margin-right:14px; }
.cap { top: 1590px; font-size: 64px; }
.cap .cw { -webkit-text-stroke: 12px #f1eee6; color:#1d1d1f; }
.cap .cw.now { color:#e4572e; }
"""


def stick(x, color, s=1.0):
    return (f'<g transform="translate({x},0) scale({s})" stroke="{color}" stroke-width="4" stroke-linecap="round" fill="none">'
            f'<circle cx="0" cy="14" r="9" fill="{color}" stroke="none"/><line x1="0" y1="24" x2="0" y2="62"/>'
            f'<line x1="0" y1="34" x2="-13" y2="52"/><line x1="0" y1="34" x2="13" y2="52"/>'
            f'<line x1="0" y1="62" x2="-11" y2="96"/><line x1="0" y1="62" x2="11" y2="96"/></g>')


def body(w):
    T = {k: w.a(p) for k, p in {"go": "C'est parti", "dernier": "Et le dernier", "plus": "Là, ce n'est plus", "prison": "C'est la prison",
                                  "toi": "Toi, tu avais", "mot": "Un mot"}.items()}
    T["finish"] = [w.a(l[5]) if l[1] else None for l in LANES]
    T["amounts"] = [l[1] for l in LANES]
    T["colors"] = [l[4] for l in LANES]
    T["total"] = w.total
    globals()["SCRIPT"] = SCRIPT_T.replace("__T__", json.dumps(T))
    globals()["SFX"] = [{"t": t, "k": "ding"} for t in T["finish"] if t] + [{"t": T["prison"], "k": "impact"}, {"t": T["prison"] + 0.05, "k": "stamp"},
                       {"t": T["dernier"] - 0.6, "k": "riser"}, {"t": T["toi"], "k": "pop"}]
    globals()["PUNCH"] = [T["prison"]]
    lanes = []
    for i, (lab, amt, disp, src, col, _) in enumerate(LANES):
        crowd = "".join(stick(30 + k * 34, "#2b2b2b", 0.9) for k in range(31))
        bars = '<div class="bars" id="bars"></div>' if amt is None else ""
        lanes.append(f'''<div class="lane" id="lane{i}"><div class="flash" style="background:{col}"></div>{bars}
  <div class="lb"><b style="background:{col}">{i + 1}</b>{lab} <span class="rk" id="rk{i}"></span></div>
  <div class="rt" id="rt{i}" style="color:{col if amt else '#d1121f'}">{disp}</div>
  <svg class="crowd" viewBox="0 0 1080 125" style="opacity:0.5">{crowd}</svg>
  <svg class="runner" id="run{i}" viewBox="-30 0 60 112"><g stroke="{col}" stroke-width="7" stroke-linecap="round" fill="none">
    <circle cx="0" cy="14" r="12" fill="{col}" stroke="none"/><line x1="0" y1="26" x2="0" y2="64"/>
    <line id="a1{i}" x1="0" y1="36" x2="-16" y2="56"/><line id="a2{i}" x1="0" y1="36" x2="16" y2="56"/>
    <line id="l1{i}" x1="0" y1="64" x2="-14" y2="104"/><line id="l2{i}" x1="0" y1="64" x2="14" y2="104"/></g></svg>
</div>''')
    order = sorted(range(len(LANES)), key=lambda i: LANES[i][1] if LANES[i][1] else 10 ** 9)
    rows = "".join(f'<div class="row{" p" if LANES[i][1] is None else ""}"><b style="background:{LANES[i][4]}">{i + 1}</b>'
                   f'<span class="l">{LANES[i][0]}<small>{LANES[i][3]}</small></span><span class="d">{LANES[i][2]}</span></div>' for i in order)
    return f"""
<div class="flagtop"><span class="chflag" style="--s:64px"></span></div>
<div class="brand">THRAX LEGAL · LA ROUTE EN SUISSE</div>
<div class="head" id="head"><div class="h1">À Lausanne, lequel te coûte<br>le plus cher ?</div><div class="h3">CHOISIS TON COULOIR 👇</div></div>
<div class="cnt" id="cnt" style="opacity:0"><div class="k">LA COURSE DES AMENDES</div><div class="n" id="num">0 CHF</div></div>
<div class="legend">{''.join(f'<i id="lg{i}" style="background:{l[4]}"></i>' for i, l in enumerate(LANES))}</div>
<div id="lanes">{''.join(lanes)}<div class="finish"></div></div>
<div class="redwash" id="red"></div>
<div class="stamp" id="stamp"><div>PRISON</div><small>délit de chauffard · 1 à 4 ans</small></div>
<div class="card" id="card"><div class="t"><span class="chflag" style="--s:40px"></span>RÉSULTATS</div>{rows}
  <div class="q">Tu avais choisi lequel ?</div><div class="q2">Un mot en commentaire</div></div>
"""


SCRIPT_T = r"""
(function(){
  var T = __T__, N = T.amounts.length;
  function cl(v){ return Math.max(0, Math.min(1, v)); }
  function $(id){ return document.getElementById(id); }
  // counter keyframes (time, CHF): each amount lands exactly on its spoken word; then it explodes.
  var K = [[T.go, 1]];
  var pairs = []; for (var i = 0; i < N; i++) if (T.finish[i]) pairs.push([T.finish[i], T.amounts[i]]);
  pairs.sort(function(a, b){ return a[0] - b[0]; }); K = K.concat(pairs);
  K.push([T.dernier + 0.2, 300]); K.push([T.prison, 250000]);
  function money(t){ if (t <= K[0][0]) return 0; for (var k = 1; k < K.length; k++) if (t <= K[k][0]) {
      var a = K[k - 1], b = K[k], u = (t - a[0]) / (b[0] - a[0]); return Math.exp(Math.log(a[1]) + (Math.log(b[1]) - Math.log(a[1])) * u); }
    return K[K.length - 1][1]; }
  R.on(function(t){
    var m = money(t), jail = t >= T.prison;
    $('head').style.opacity = (1 - cl((t - T.go + 0.2) / 0.3)).toFixed(3);
    $('cnt').style.opacity = (cl((t - T.go + 0.1) / 0.3) * (1 - cl((t - T.toi) / 0.3))).toFixed(3);
    var num = $('num'); num.textContent = jail ? 'PRISON' : Math.floor(m).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'") + ' CHF';
    num.className = 'n' + (t > T.dernier ? ' red' : '');
    var started = t >= T.go;
    for (var i = 0; i < N; i++) {
      var A = T.amounts[i], prog, fin;
      if (A) { prog = started ? cl(Math.log(Math.max(1, m)) / Math.log(A)) : 0; fin = started && t >= T.finish[i]; if (fin) prog = 1; }
      else { prog = started ? Math.min(0.97, Math.log(Math.max(1, m)) / Math.log(600)) : 0; if (jail) prog = 0.97; fin = jail; }
      var x = 60 + prog * (1080 - 60 - 120);
      var run = $('run' + i); run.style.left = x.toFixed(1) + 'px';
      var moving = started && !fin, ph = moving ? Math.sin(t * 24 + i) : 0;
      $('l1' + i).setAttribute('x2', (-14 * ph).toFixed(1)); $('l2' + i).setAttribute('x2', (14 * ph).toFixed(1));
      $('a1' + i).setAttribute('x2', (16 * ph).toFixed(1)); $('a2' + i).setAttribute('x2', (-16 * ph).toFixed(1));
      run.style.transform = 'translateY(' + (moving ? Math.abs(Math.sin(t * 24 + i)) * -6 : (fin && A ? -12 : 0)).toFixed(1) + 'px)';
      var lane = $('lane' + i), tf = A ? T.finish[i] : T.prison, fl = fin ? Math.max(0, 1 - (t - tf) / 0.5) : 0;
      lane.querySelector('.flash').style.opacity = (fin ? (A ? 0.18 : 0.3) + fl * 0.5 : 0).toFixed(3);
      $('rt' + i).style.opacity = fin ? 1 : 0;
      var r = 0; for (var j = 0; j < N; j++) if ((T.amounts[j] || 1e9) < (A || 1e9)) r++;
      var rk = $('rk' + i); rk.textContent = A ? ['1er', '2e', '3e', '4e', '5e', '6e'][r] : 'HORS COURSE'; rk.style.opacity = fin ? 1 : 0;
      $('lg' + i).style.opacity = fin ? 1 : 0.35;
    }
    var bars = $('bars'); if (bars) { var b = cl((t - T.prison + 0.15) / 0.25); bars.style.transform = 'translateY(' + ((1 - b * b) * -200).toFixed(1) + 'px)'; }
    var red = cl((t - T.dernier) / 1.5) * (1 - cl((t - T.toi) / 0.4));
    $('red').style.opacity = (red * (0.75 + 0.25 * Math.sin(t * 8))).toFixed(3);
    var st = $('stamp'), sp = cl((t - T.prison) / 0.2), so = sp * (1 - cl((t - T.toi + 0.1) / 0.3));
    st.style.opacity = so.toFixed(3); st.style.transform = 'scale(' + (1.6 - 0.6 * sp).toFixed(3) + ')';
    var card = $('card'), c = cl((t - T.toi) / 0.35);
    card.style.opacity = c.toFixed(3); card.style.transform = 'translateY(' + ((1 - c) * 60).toFixed(1) + 'px)';
    $('lanes').style.opacity = (1 - 0.7 * c).toFixed(3);
  });
})();
"""
PUNCH = []
SFX = []
TAIL = 1.6
CAP_MAX = 3
