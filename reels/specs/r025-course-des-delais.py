"""Reel 025 — « La course des délais » : reprise des codes du format « Stick Odds » (course de bonshommes en bâton,
couloirs, compteur qui s'emballe, classement, tableau final, « un mot en commentaire »), sans voix, musique seule.
Six vrais délais suisses : 10 jours (art. 74 LP), 14 jours (art. 40e CO), 30 jours (art. 273 CO), 2 ans (art. 210 CO),
5 ans (art. 128 CO), 20 ans (art. 149a LP). Chaque délai part de son propre point de départ (précisé dans la légende)."""
import json

SOURCE_AUDIO = "media/silence-18.wav"
SOURCE_WORDS = "media/empty-words.json"

LANES = [  # (label, short, days, display, article, color)
    ("Faire opposition à un commandement de payer", "Opposition", 10, "10 jours", "art. 74 LP", "#e4572e"),
    ("Annuler un achat fait à domicile", "Achat à domicile", 14, "14 jours", "art. 40e CO", "#2e86ab"),
    ("Contester le congé de ton bail", "Congé du bail", 30, "30 jours", "art. 273 CO", "#f3a712"),
    ("Garantie d'un objet neuf", "Garantie", 730, "2 ans", "art. 210 CO", "#3bb273"),
    ("Un artisan te réclame sa facture", "Facture d'artisan", 1826, "5 ans", "art. 128 CO", "#7768ae"),
    ("Une dette avec acte de défaut de biens", "Acte de défaut de biens", 7300, "20 ans", "art. 149a LP", "#e15fa0"),
]
T0, T1, TRES = 2.6, 12.2, 12.9   # race start / end, results card

META = {
    "id": "r025-course-des-delais",
    "music": "bounce",
    "music_gain": 4,
    "caption": ("⏱️ La course des délais : lequel expire en premier ? Choisis ton couloir avant de regarder.\n\n"
                "1️⃣ Opposition à un commandement de payer : 10 jours dès la notification (art. 74 LP)\n"
                "2️⃣ Révoquer un contrat conclu à domicile (démarchage) : 14 jours (art. 40e CO)\n"
                "3️⃣ Contester le congé de ton bail : 30 jours dès la réception du congé (art. 273 CO)\n"
                "4️⃣ Garantie pour les défauts d'un objet : 2 ans dès la livraison (art. 210 CO)\n"
                "5️⃣ Facture d'artisan : prescription de 5 ans (art. 128 CO)\n"
                "6️⃣ Créance constatée par un acte de défaut de biens : 20 ans (art. 149a LP)\n\n"
                "Chaque délai part de son propre point de départ. Rate le premier et tu peux perdre tes droits.\n\n"
                "💬 Quel délai tu ne connaissais pas ? Un mot en commentaire. Thrax Legal, lien en bio.\n\n"
                "#delais #droit #suisse #suisseromande #lausanne #genève #poursuite #bail #garantie #lesaviezvous"),
    "yt_title": "La course des délais en Suisse : lequel expire en premier ? #shorts",
    "tiktok_title": "La course des délais : lequel expire en premier ? ⏱️",
    "first_comment": "Lequel tu avais choisi ? 👇",
    "tags": ["délais", "art. 74 LP", "art. 273 CO", "prescription", "Suisse"],
    "genome": {"style": "course-stick-figures-data (codes Stick Odds)", "palette": "beige papier / couloirs verts / 6 couleurs",
               "hook": "choisis ton couloir (pari)", "format": "course + compteur + classement + un mot en commentaire",
               "topic": "délais", "mascot": "bonshommes en bâton", "voice": "aucune (musique)", "captions": "aucune",
               "music": "bounce", "length": "~18s"},
    "cover_t": 1.0,
}

CSS = """
#root { background:#f1eee6; color:#1d1d1f; }
.cap { display:none; }
.brand { position:absolute; left:0; right:0; top:80px; text-align:center; font-size:26px; font-weight:800; letter-spacing:0.14em; color:#9a958a; }
.head { position:absolute; left:40px; right:40px; top:160px; text-align:center; }
.h1 { font-size:66px; font-weight:900; letter-spacing:-0.02em; }
.h2 { font-size:34px; font-weight:600; color:#6e6a60; margin-top:8px; }
.h3 { font-size:42px; font-weight:900; margin-top:14px; letter-spacing:0.02em; }
.cnt { position:absolute; left:0; right:0; top:150px; text-align:center; }
.cnt .k { font-size:28px; font-weight:800; letter-spacing:0.1em; color:#6e6a60; }
.cnt .n { font-size:132px; font-weight:900; letter-spacing:-0.04em; line-height:1; font-variant-numeric: tabular-nums; }
.cnt .u { font-size:30px; font-weight:700; color:#6e6a60; }
.legend { position:absolute; left:60px; right:60px; top:420px; height:10px; display:flex; gap:16px; }
.legend i { flex:1; height:8px; border-radius:4px; opacity:0.35; }
#lanes { position:absolute; left:0; right:0; top:460px; }
.lane { position:relative; height:192px; border-top:2px solid rgba(255,255,255,0.7); }
.lane:nth-child(odd) { background:#cfe6c4; } .lane:nth-child(even) { background:#bfdcb2; }
.lane .lb { position:absolute; left:22px; top:12px; display:flex; align-items:center; gap:10px; font-size:28px; font-weight:800; z-index:3; }
.lane .lb b { width:30px; height:30px; border-radius:50%; color:#fff; font-size:18px; display:flex; align-items:center; justify-content:center; }
.lane .rk { font-size:18px; font-weight:900; padding:2px 8px; border-radius:6px; background:#1d1d1f; color:#fff; opacity:0; }
.lane .rt { position:absolute; right:22px; top:10px; font-size:26px; font-weight:900; opacity:0; z-index:3; }
.lane svg.crowd { position:absolute; left:0; top:52px; width:1080px; height:135px; }
.lane .runner { position:absolute; top:62px; width:64px; height:120px; z-index:2; }
.lane .flash { position:absolute; inset:0; opacity:0; }
.finish { position:absolute; right:56px; top:0; bottom:0; width:6px; background:repeating-linear-gradient(#1d1d1f 0 10px, #fff 10px 20px); opacity:0.55; }
.card { position:absolute; left:70px; right:70px; top:470px; background:#fbfaf6; border:4px solid #1d1d1f; border-radius:28px; padding:34px 40px; opacity:0;
        box-shadow:0 20px 50px rgba(0,0,0,0.18); }
.card .t { font-size:40px; font-weight:900; text-align:center; letter-spacing:0.06em; margin-bottom:16px; }
.row { display:flex; align-items:center; gap:18px; padding:14px 0; border-bottom:2px solid #ece8de; }
.row b { flex:none; width:46px; height:46px; border-radius:50%; color:#fff; font-size:22px; display:flex; align-items:center; justify-content:center; }
.row .p { width:66px; font-size:24px; font-weight:800; color:#6e6a60; }
.row .l { flex:1; font-size:31px; font-weight:800; line-height:1.1; }
.row .l small { display:block; font-size:21px; font-weight:600; color:#8a857a; }
.row .d { font-size:36px; font-weight:900; text-align:right; }
.card .q { font-size:38px; font-weight:900; text-align:center; margin-top:24px; }
.card .q2 { font-size:24px; font-weight:600; text-align:center; color:#6e6a60; margin-top:6px; }
.foot { position:absolute; left:0; right:0; top:1740px; text-align:center; font-size:30px; font-weight:800; color:#6e6a60; opacity:0; }
.note { position:absolute; left:0; right:0; top:1640px; text-align:center; font-size:22px; font-weight:600; color:#8a857a; }
"""


def stick(x, color, s=1.0):
    return (f'<g transform="translate({x},0) scale({s})" stroke="{color}" stroke-width="4" stroke-linecap="round" fill="none">'
            f'<circle cx="0" cy="14" r="9" fill="{color}" stroke="none"/><line x1="0" y1="24" x2="0" y2="62"/>'
            f'<line x1="0" y1="34" x2="-13" y2="52"/><line x1="0" y1="34" x2="13" y2="52"/>'
            f'<line x1="0" y1="62" x2="-11" y2="96"/><line x1="0" y1="62" x2="11" y2="96"/></g>')


def body(w):
    lanes = []
    for i, (lab, short, days, disp, art, col) in enumerate(LANES):
        crowd = "".join(stick(30 + k * 34, "#2b2b2b", 0.92) for k in range(31))
        lanes.append(f'''<div class="lane" id="lane{i}"><div class="flash" style="background:{col}"></div>
  <div class="lb"><b style="background:{col}">{i + 1}</b>{lab} <span class="rk" id="rk{i}"></span></div>
  <div class="rt" id="rt{i}" style="color:{col}">{disp}</div>
  <svg class="crowd" viewBox="0 0 1080 125" style="opacity:0.55">{crowd}</svg>
  <svg class="runner" id="run{i}" viewBox="-30 0 60 112"><g stroke="{col}" stroke-width="7" stroke-linecap="round" fill="none">
    <circle cx="0" cy="14" r="12" fill="{col}" stroke="none"/><line x1="0" y1="26" x2="0" y2="64"/>
    <line id="a1{i}" x1="0" y1="36" x2="-16" y2="56"/><line id="a2{i}" x1="0" y1="36" x2="16" y2="56"/>
    <line id="l1{i}" x1="0" y1="64" x2="-14" y2="104"/><line id="l2{i}" x1="0" y1="64" x2="14" y2="104"/></g></svg>
</div>''')
    order = sorted(range(len(LANES)), key=lambda i: LANES[i][2])
    rows = "".join(f'<div class="row"><b style="background:{LANES[i][5]}">{i + 1}</b><span class="p">{["1er", "2e", "3e", "4e", "5e", "6e"][r]}</span>'
                   f'<span class="l">{LANES[i][1]}<small>{LANES[i][4]}</small></span><span class="d">{LANES[i][3]}</span></div>'
                   for r, i in enumerate(order))
    T = {"lanes": [[l[2], l[5]] for l in LANES], "t0": T0, "t1": T1, "tres": TRES, "total": w.total}
    globals()["SCRIPT"] = SCRIPT_T.replace("__T__", json.dumps(T))
    import math
    sfx = []
    for i, l in enumerate(LANES):
        u = math.log10(l[2]) / 3.9
        sfx.append({"t": round(T0 + u * (T1 - T0), 3), "k": "ding"})
    sfx += [{"t": TRES, "k": "pop"}, {"t": 0.05, "k": "pop"}]
    globals()["SFX"] = sfx
    return f"""
<div class="brand">THRAX LEGAL · DÉLAIS</div>
<div class="head" id="head"><div class="h1">TU REÇOIS UN PAPIER.</div><div class="h2">Quel délai expire en premier ?</div>
  <div class="h3">CHOISIS TON COULOIR 👇</div></div>
<div class="cnt" id="cnt" style="opacity:0"><div class="k">LA COURSE DES DÉLAIS</div><div class="n" id="num">0</div><div class="u" id="unit">jours écoulés</div></div>
<div class="legend">{''.join(f'<i id="lg{i}" style="background:{l[5]}"></i>' for i, l in enumerate(LANES))}</div>
<div id="lanes">{''.join(lanes)}<div class="finish"></div></div>
<div class="note" id="note">chaque délai part de son propre point de départ</div>
<div class="card" id="card"><div class="t">RÉSULTATS</div>{rows}
  <div class="q">Lequel tu ne connaissais pas ?</div><div class="q2">Un mot en commentaire</div></div>
<div class="foot" id="foot">Thrax Legal · le juridique à prix fixe</div>
"""


SCRIPT_T = r"""
(function(){
  var T = __T__, N = T.lanes.length;
  function cl(v){ return Math.max(0, Math.min(1, v)); }
  function $(id){ return document.getElementById(id); }
  var rank = 0, done = [];
  R.on(function(t){
    var u = cl((t - T.t0) / (T.t1 - T.t0)), days = Math.pow(10, u * 3.9);
    var head = $('head'), cnt = $('cnt');
    head.style.opacity = (1 - cl((t - T.t0 + 0.3) / 0.3)).toFixed(3);
    cnt.style.opacity = (cl((t - T.t0 + 0.2) / 0.3) * (1 - cl((t - T.tres) / 0.3))).toFixed(3);
    var d = t < T.t0 ? 0 : Math.floor(days);
    $('num').textContent = d.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    $('unit').textContent = d >= 365 ? 'jours écoulés  ·  ' + (d / 365).toFixed(1).replace('.', ',') + ' ans' : 'jours écoulés';
    // order of finishing = by deadline
    var finished = 0;
    for (var i = 0; i < N; i++) {
      var D = T.lanes[i][0], prog = t < T.t0 ? 0 : cl(Math.log(Math.max(1, days)) / Math.log(D)), fin = prog >= 1 && t >= T.t0;
      var x = 70 + prog * (1080 - 70 - 120);
      var run = $('run' + i); run.style.left = x.toFixed(1) + 'px';
      var ph = fin ? 0 : Math.sin(t * 22 + i) * (t >= T.t0 ? 1 : 0.15);
      $('l1' + i).setAttribute('x2', (-14 * ph).toFixed(1)); $('l2' + i).setAttribute('x2', (14 * ph).toFixed(1));
      $('a1' + i).setAttribute('x2', (16 * ph).toFixed(1)); $('a2' + i).setAttribute('x2', (-16 * ph).toFixed(1));
      run.style.transform = fin ? 'translateY(-14px)' : 'translateY(' + (Math.abs(Math.sin(t * 22 + i)) * -6 * (t >= T.t0 ? 1 : 0)).toFixed(1) + 'px)';
      var lane = $('lane' + i);
      var tf = T.t0 + (Math.log10(D) / 3.9) * (T.t1 - T.t0);
      var fl = fin ? Math.max(0, 1 - (t - tf) / 0.5) : 0;
      lane.querySelector('.flash').style.opacity = (fin ? 0.18 + fl * 0.5 : 0).toFixed(3);
      $('rt' + i).style.opacity = fin ? 1 : 0;
      var r = 0; for (var j = 0; j < N; j++) if (T.lanes[j][0] < D) r++;
      var rk = $('rk' + i); rk.textContent = ['1er', '2e', '3e', '4e', '5e', '6e'][r]; rk.style.opacity = fin ? 1 : 0;
      $('lg' + i).style.opacity = fin ? 1 : 0.35;
    }
    var card = $('card'), c = cl((t - T.tres) / 0.35);
    card.style.opacity = c.toFixed(3); card.style.transform = 'translateY(' + ((1 - c) * 60).toFixed(1) + 'px)';
    $('lanes').style.opacity = (1 - 0.65 * c).toFixed(3);
    $('foot').style.opacity = cl((t - T.tres - 1.2) / 0.4).toFixed(3);
    $('note').style.opacity = (t > T.t0 && t < T.tres ? 1 : 0);
  });
})();
"""
PUNCH = []
SFX = []
TAIL = 0.0
CAP_MAX = 3
