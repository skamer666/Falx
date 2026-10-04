"""Reel 014 — Quiz « Vrai ou faux » spécial locataires (art. 269d, 264, 257e CO). Style : plateau de jeu télévisé
(projecteurs, chrono circulaire, boutons VRAI/FAUX, score), animateur à la voix québécoise (jamais utilisée)."""
import json

VOICE = "fr-CA-ThierryNeural"
RATE = "+10%"

VO = ("Quiz spécial locataires de Lausanne ! Trois affirmations, vrai ou faux, tu as trois secondes. "
      "Question un : ton bailleur peut augmenter ton loyer quand il veut, avec une simple lettre. Trois, deux, un. "
      "Faux ! Il doit utiliser une formule officielle, et la hausse ne vaut que pour la prochaine échéance, "
      "annoncée au moins dix jours avant le début du délai de congé. "
      "Question deux : tu peux partir avant la fin de ton bail si tu trouves un remplaçant. Trois, deux, un. "
      "Vrai ! S'il est solvable, acceptable pour le bailleur, et prêt à reprendre le bail aux mêmes conditions, tu es libéré. "
      "Question trois : la garantie de loyer peut aller jusqu'à six mois de loyer. Trois, deux, un. "
      "Faux ! Pour un logement, c'est trois mois maximum. Alors, ton score ? "
      "Articles 269d, 264 et 257e du Code des obligations. Envoie ce quiz à ton coloc. Thrax Legal, lien en bio.")

META = {
    "id": "r014-quiz-bail",
    "music": "bounce",
    "caption": ("🎤 QUIZ locataires de Lausanne : vrai ou faux ? Note ton score en commentaire 👇\n\n"
                "1️⃣ Hausse de loyer par simple lettre → FAUX. Elle doit être notifiée sur une formule officielle, au moins 10 jours "
                "avant le début du délai de résiliation, pour le prochain terme de résiliation (art. 269d CO). Elle peut être contestée.\n\n"
                "2️⃣ Partir avant la fin du bail avec un remplaçant → VRAI. Le locataire est libéré s'il présente un nouveau locataire "
                "solvable, que le bailleur ne peut raisonnablement refuser, et qui est prêt à reprendre le bail aux mêmes conditions (art. 264 CO).\n\n"
                "3️⃣ Garantie de 6 mois de loyer → FAUX. Pour un logement, la garantie est limitée à 3 mois de loyer (art. 257e al. 2 CO).\n\n"
                "📤 Envoie ce quiz à ton coloc. Une question sur ton bail ? Thrax Legal, lien en bio.\n\n"
                "#quiz #vraioufaux #locataire #bail #lausanne #genève #suisse #suisseromande #logement"),
    "yt_title": "Quiz locataires en Suisse : vrai ou faux ? (3 questions) #shorts",
    "tiktok_title": "QUIZ locataires : vrai ou faux ? Donne ton score 👇",
    "tags": ["quiz", "bail", "locataire", "art. 264 CO", "Lausanne"],
    "genome": {"style": "jeu-tele-quiz", "palette": "violet-plateau/or/neon", "hook": "quiz + ville + defi 3 secondes",
               "format": "vrai-ou-faux x3 + score", "topic": "logement/bail-mix", "mascot": "aucun (plateau)",
               "voice": "fr-CA-ThierryNeural", "captions": "or-gras", "music": "bounce", "length": "~45s"},
    "cover_t": 1.6,
}

CSS = """
#root { background:#12002b; color:#fff; }
.stage { position:absolute; inset:0; background: radial-gradient(ellipse at 50% 110%, #ff3fa4 0%, rgba(255,63,164,0) 45%), radial-gradient(ellipse at 50% 30%, #3b0a7a 0%, #1a0440 55%, #0b0120 100%); }
.beam { position:absolute; top:-200px; width:260px; height:1500px; background: linear-gradient(rgba(255,255,255,0.22), rgba(255,255,255,0)); transform-origin: 50% 0; filter: blur(8px); }
.floor { position:absolute; left:-100px; right:-100px; top:1230px; height:700px; background: repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 2px, transparent 2px 120px), linear-gradient(#2a0a5a, #0b0120); transform: perspective(600px) rotateX(55deg); transform-origin: 50% 0; }
.logo { position:absolute; left:0; right:0; top:110px; text-align:center; font-weight:900; font-size:54px; letter-spacing:0.12em; color:#ffd23f; text-shadow: 0 0 24px rgba(255,210,63,0.7); }
.q { position:absolute; left:70px; right:70px; top:220px; min-height:420px; background: linear-gradient(#2c0d63, #1a0640); border:6px solid #ffd23f; border-radius:36px;
     box-shadow: 0 0 60px rgba(255,210,63,0.35), inset 0 0 40px rgba(0,0,0,0.4); padding:38px 44px; text-align:center; display:flex; flex-direction:column; justify-content:center; gap:16px; }
.q .n { font-size:40px; font-weight:900; color:#ffd23f; letter-spacing:0.08em; }
.q .t { font-size:64px; font-weight:900; line-height:1.08; letter-spacing:-0.02em; }
.btns { position:absolute; left:70px; right:70px; top:700px; display:flex; gap:40px; }
.btn { flex:1; height:170px; border-radius:30px; display:flex; align-items:center; justify-content:center; font-size:78px; font-weight:900; letter-spacing:0.04em; border:6px solid rgba(255,255,255,0.25); }
.btn.v { background:#16a34a; } .btn.f { background:#dc2626; }
.timer { position:absolute; left:390px; top:910px; width:300px; height:300px; }
.timer b { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-size:140px; font-weight:900; }
.verdict { position:absolute; left:0; right:0; top:880px; text-align:center; font-size:170px; font-weight:900; letter-spacing:-0.03em; }
.expl { position:absolute; left:80px; right:80px; top:1070px; text-align:center; font-size:46px; font-weight:800; line-height:1.18; color:#f2e8ff; }
.score { position:absolute; right:50px; top:110px; font-size:34px; font-weight:900; background:#ffd23f; color:#1a0640; border-radius:999px; padding:8px 22px; }
.chip { display:inline-block; background:#ffd23f; color:#1a0640; font-size:64px; font-weight:900; border-radius:24px; padding:14px 34px; }
.ttl { position:absolute; left:60px; right:60px; text-align:center; }
.brand { font-size:120px; font-weight:900; letter-spacing:-0.05em; }
.brand span { color:#ffd23f; }
.cap { top: 1500px; font-size: 70px; }
.cap .cw.now { color:#ffd23f; }
"""


def body(w):
    T = {k: w.a(p) for k, p in {
        "quiz": "Quiz spécial", "trois_aff": "Trois affirmations,", "q1": "Question un", "c1": "Trois, deux, un.", "f1": "Faux ! Il doit",
        "prochaine": "la prochaine échéance,", "dix": "au moins dix jours", "q2": "Question deux", "c2": "Trois, deux, un.",
        "v2": "Vrai ! S'il est", "libere": "tu es libéré.", "q3": "Question trois", "c3": "Trois, deux, un.", "f3": "Faux ! Pour un logement,",
        "score": "Alors, ton score", "art": "Articles", "envoie": "Envoie ce quiz", "thrax": "Thrax Legal,"}.items()}
    T["total"] = w.total
    globals()["PUNCH"] = [T["f1"], T["v2"], T["f3"]]
    globals()["SCRIPT"] = SCRIPT_T.replace("__T__", json.dumps(T))
    globals()["SFX"] = ([{"t": T[c] + i * 0.55, "k": "tick"} for c in ("c1", "c2", "c3") for i in range(3)]
                        + [{"t": T["f1"], "k": "buzz"}, {"t": T["v2"], "k": "cash"}, {"t": T["f3"], "k": "buzz"}])
    O = lambda a, b: f'data-at="{a:.3f}" data-out="{b - 0.25:.3f}"'

    def question(n, text, q, c, verdict, vk, expl, end):
        good = "v" if verdict == "VRAI" else "f"
        col = "#22c55e" if verdict == "VRAI" else "#ef4444"
        return f"""
<div class="q" data-fx="zoom" {O(T[q], T[end])}><div class="n">QUESTION {n} / 3</div><div class="t">{text}</div></div>
<div class="btns" data-fx="rise" {O(T[q] + 0.4, T[end])}>
  <div class="btn v" id="b{n}v">VRAI</div><div class="btn f" id="b{n}f">FAUX</div>
</div>
<div class="timer" data-fx="pop" {O(T[c] - 0.1, T[vk])}>
  <svg viewBox="0 0 300 300" width="300" height="300"><circle cx="150" cy="150" r="130" fill="#1a0640" stroke="rgba(255,255,255,0.15)" stroke-width="22"/>
  <circle id="ring{n}" cx="150" cy="150" r="130" fill="none" stroke="#ffd23f" stroke-width="22" stroke-linecap="round" transform="rotate(-90 150 150)" pathLength="1" stroke-dasharray="1 1"/></svg>
  <b id="cnt{n}">3</b>
</div>
<div class="verdict" style="color:{col}" data-fx="stamp" data-rot="-5" {O(T[vk], T[end])}>{verdict} {'✅' if good == 'v' else '❌'}</div>
<div class="expl" data-fx="rise" {O(T[vk] + 0.6, T[end])}>{expl}</div>"""

    return f"""
<div class="stage"></div>
<div class="beam" id="bm1" style="left:80px"></div><div class="beam" id="bm2" style="left:740px"></div>
<div class="floor"></div>
<div class="logo" data-fx="drop" data-at="0.05">VRAI ou FAUX ?</div>

<div class="ttl" style="top:400px" data-fx="zoom" {O(0.1, T['q1'])}><div style="font-size:120px;font-weight:900;line-height:0.95">QUIZ<br><span style="color:#ffd23f">LOCATAIRES</span></div>
  <div style="font-size:52px;font-weight:800;margin-top:24px" data-fx="rise" data-at="{T['trois_aff']:.3f}">📍 Lausanne · 3 questions · ⏱️ 3 s</div></div>

{question(1, "Ton bailleur peut augmenter ton loyer <span style='color:#ffd23f'>quand il veut</span>, par simple lettre.", "q1", "c1", "FAUX", "f1",
          "formule officielle obligatoire · pour la prochaine échéance · annoncée ≥ 10 jours avant le délai de congé", "q2")}
{question(2, "Tu peux partir <span style='color:#ffd23f'>avant la fin</span> de ton bail si tu trouves un remplaçant.", "q2", "c2", "VRAI", "v2",
          "remplaçant solvable, acceptable, qui reprend le bail aux mêmes conditions → tu es libéré", "q3")}
{question(3, "La garantie de loyer peut aller jusqu'à <span style='color:#ffd23f'>6 mois</span> de loyer.", "q3", "c3", "FAUX", "f3",
          "logement : 3 mois de loyer maximum", "score")}

<div class="ttl" style="top:380px" data-fx="zoom" {O(T['score'], T['art'])}><div style="font-size:110px;font-weight:900">Ton score ?</div>
  <div style="font-size:150px;margin-top:20px">🥇 🥈 🥉</div><div style="font-size:50px;font-weight:800">dis-le en commentaire 👇</div></div>
<div class="ttl" style="top:480px" data-fx="stamp" data-rot="-3" {O(T['art'], T['envoie'])}><span class="chip">Art. 269d · 264 · 257e CO</span><div style="font-size:44px;font-weight:800;margin-top:18px">Code des obligations</div></div>
<div class="ttl" style="top:400px" data-fx="rise" data-at="{T['envoie']:.3f}"><div style="font-size:66px;font-weight:900">📤 Envoie ce quiz à ton coloc</div></div>
<div class="ttl" style="top:620px" data-fx="zoom" data-at="{T['thrax']:.3f}"><span class="brand">Thrax <span>Legal</span></span></div>
"""


SCRIPT_T = r"""
(function(){
  var T = __T__;
  var bm1 = document.getElementById('bm1'), bm2 = document.getElementById('bm2');
  var Q = [[T.c1, T.f1, 'f'], [T.c2, T.v2, 'v'], [T.c3, T.f3, 'f']];
  R.on(function(t){
    bm1.style.transform = 'rotate(' + (18 + Math.sin(t * 0.9) * 14) + 'deg)';
    bm2.style.transform = 'rotate(' + (-18 + Math.sin(t * 0.9 + 1.7) * 14) + 'deg)';
    for (var i = 0; i < 3; i++) {
      var c = Q[i][0], v = Q[i][1], n = i + 1;
      var ring = document.getElementById('ring' + n), cnt = document.getElementById('cnt' + n);
      var u = Math.max(0, Math.min(1, (t - c) / Math.max(0.6, v - c)));
      ring.setAttribute('stroke-dasharray', (1 - u).toFixed(3) + ' 1');
      cnt.textContent = String(Math.max(1, 3 - Math.floor(u * 3)));
      var good = document.getElementById('b' + n + Q[i][2]), bad = document.getElementById('b' + n + (Q[i][2] === 'v' ? 'f' : 'v'));
      var on = t >= v;
      good.style.transform = on ? 'scale(' + (1.08 + Math.sin(t * 10) * 0.02) + ')' : 'scale(1)';
      good.style.boxShadow = on ? '0 0 60px rgba(255,255,255,0.7)' : 'none';
      bad.style.opacity = on ? 0.25 : 1;
    }
  });
})();
"""
PUNCH = []
SFX = []
TAIL = 1.6
CAP_MAX = 3
