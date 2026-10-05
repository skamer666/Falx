"""Reel 027 — « Pierre et Claire » : storytelling illustré (codes Élan Finance) avec les dessins faits par le propriétaire.
Concubins sans testament : la compagne n'est pas héritière légale (art. 457 ss CC). Trois règles : testament olographe
(art. 505 CC ; réserves depuis le 1.1.2023, art. 471 CC), caisse de pension (art. 20a LPP, selon le règlement),
pacte successoral en la forme authentique (art. 512 CC). Une image par phrase, chiffres posés par-dessus, petits « pop »."""
import json

VOICE = "fr-FR-VivienneMultilingualNeural"
RATE = "+8%"
TAIL = 1.8
GAP_SENT = 0.24
CAP_MAX = 3

VO = ("À Lausanne comme partout en Suisse, quand un homme meurt sans testament, sa compagne peut ne rien recevoir. Zéro franc. "
      "Et Pierre ne le savait pas. "
      "Trente ans de vie commune. Pas mariés. Un appartement, de l'épargne, une caisse de pension. "
      "Le jour où Pierre est parti, Claire a découvert la règle : en Suisse, la concubine n'est pas héritière. "
      "Tout est allé à la famille de Pierre. Même l'appartement où elle vivait. "
      "Et ce n'est pas rare. C'est la loi. "
      "Mais les couples prévoyants connaissent trois règles. "
      "Règle numéro un : le testament. Écrit entièrement à la main, daté, signé. Une feuille suffit. "
      "Et depuis deux mille vingt-trois, sans enfants, tu peux tout laisser à ta compagne. "
      "Avec des enfants, au moins la moitié reste libre. "
      "Règle numéro deux : la caisse de pension. Si son règlement le permet, ta compagne peut toucher le capital-décès. "
      "Mais il faut souvent l'annoncer par écrit, de ton vivant. "
      "Règle numéro trois : le pacte successoral, chez le notaire, pour tout verrouiller. "
      "Parce que devant la loi, l'amour ne suffit pas. Il faut une feuille de papier. "
      "Histoire fictive. Envoie ça à un couple pas marié.")

# (image number, spoken anchor where it appears)
SHOTS = [(1, None), (2, "Et Pierre"), (3, "Trente ans"), (4, "Pas mariés"), (5, "Un appartement"), (6, "Le jour où"),
         (7, "Claire a découvert"), (8, "Tout est allé"), (9, "Même"), (10, "Et ce n'est pas rare"), (11, "Mais les couples"),
         (13, "Règle numéro un"), (12, "Écrit entièrement"), (14, "Et depuis"), (15, "Avec des enfants"), (16, "Règle numéro deux"),
         (17, "Mais il faut"), (18, "Règle numéro trois"), (19, "pour tout verrouiller"), (20, "Parce que devant"), (21, "Histoire fictive")]

# (big text, small line, red?, fx, anchor in, anchor out)
OVERLAYS = [
    ("SANS TESTAMENT ?", "", False, "pop", None, "Zéro franc"),
    ("0 CHF", "pour sa compagne", True, "stamp", "Zéro franc", "Et Pierre"),
    ("30 ANS", "de vie commune", False, "stamp", "Trente ans", "Pas mariés"),
    ("PAS MARIÉS", "", False, "pop", "Pas mariés", "Un appartement"),
    ("PAS HÉRITIÈRE", "la concubine", True, "stamp", "héritière", "Tout est allé"),
    ("TOUT À LA FAMILLE", "de Pierre", False, "pop", "Tout est allé", "Et ce n'est pas rare"),
    ("C'EST LA LOI", "", True, "stamp", "C'est la loi", "Mais les couples"),
    ("3 RÈGLES", "", False, "stamp", "trois règles", "Règle numéro un"),
    ("RÈGLE 1", "le testament", False, "stamp", "Règle numéro un", "Et depuis"),
    ("2023", "sans enfants : tout à ta compagne", False, "stamp", "Et depuis", "Avec des enfants"),
    ("½ LIBRE", "avec des enfants", False, "pop", "la moitié", "Règle numéro deux"),
    ("RÈGLE 2", "la caisse de pension", False, "stamp", "Règle numéro deux", "Règle numéro trois"),
    ("RÈGLE 3", "le pacte successoral", False, "stamp", "Règle numéro trois", "Parce que devant"),
    ("L'AMOUR NE SUFFIT PAS", "", True, "pop", "ne suffit pas", "Histoire fictive"),
    ("ENVOIE ÇA", "à un couple pas marié 💌", False, "pop", "Envoie", None),
]

ASSETS = [f"media/r027-concubins/{n:02d}.png" for n in sorted({s[0] for s in SHOTS})]

META = {
    "id": "r027-concubins-sans-testament",
    "music": "lofi",
    "music_gain": -3,
    "caption": ("💔 Trente ans ensemble, pas mariés, pas de testament : sa compagne ne touche rien. (histoire fictive)\n\n"
                "En Suisse, le ou la concubin·e n'est pas héritier légal (art. 457 ss CC). Sans testament, tout va à la famille.\n\n"
                "Les 3 règles des couples prévoyants :\n"
                "1️⃣ Le testament, écrit entièrement à la main, daté et signé (art. 505 CC). Depuis le 1er janvier 2023, "
                "sans enfants (et sans conjoint), il n'y a plus de réserve : tu peux tout laisser à ta compagne. Avec des enfants, "
                "au moins la moitié reste libre (art. 471 CC).\n"
                "2️⃣ La caisse de pension : si son règlement le prévoit, le ou la partenaire peut toucher le capital-décès "
                "(art. 20a LPP). Il faut souvent l'annoncer par écrit à la caisse, de son vivant.\n"
                "3️⃣ Le pacte successoral, chez le notaire (art. 512 CC), pour tout verrouiller.\n\n"
                "⚠️ Chaque situation est différente (enfants, biens, canton) : fais vérifier tes documents.\n\n"
                "💌 Envoie ça à un couple pas marié. Thrax Legal, le juridique à prix fixe en Suisse romande. Lien en bio.\n\n"
                "#concubinage #testament #succession #héritage #couple #lausanne #suisse #suisseromande #droit #lesaviezvous"),
    "yt_title": "Pas mariés, sans testament : elle n'a rien touché #shorts",
    "tiktok_title": "Pas mariés depuis 30 ans, sans testament… elle n'a rien touché 💔",
    "tags": ["concubinage", "testament", "succession", "art. 505 CC", "Lausanne"],
    "genome": {"style": "storytelling illustré crayon (codes Élan Finance), dessins faits main", "palette": "gris clair / encre / rouge suisse",
               "hook": "SANS TESTAMENT ? + 0 CHF + ville", "format": "histoire + 3 règles + partage", "topic": "couple/succession",
               "mascot": "bonhomme à casquette suisse", "voice": "fr-FR-VivienneMultilingualNeural", "captions": "3 mots, bas",
               "music": "lofi", "length": "~70s"},
}

CSS = """
#root { background:#ECECEF; color:#1d1d1f; }
#stage { background:#ECECEF; }
.brand { position:absolute; left:0; right:0; top:84px; text-align:center; font-size:26px; font-weight:800; letter-spacing:0.16em; color:#8d8b92; }
.brand .chflag { margin-right:12px; vertical-align:-6px; }
.tag { position:absolute; left:0; right:0; top:142px; text-align:center; }
.tag span { display:inline-block; font-size:26px; font-weight:700; color:#55535a; background:#fff; border-radius:40px; padding:8px 22px;
            box-shadow:0 4px 14px rgba(0,0,0,0.06); }
.ov { position:absolute; left:30px; right:30px; top:218px; height:220px; display:flex; flex-direction:column; align-items:center;
      justify-content:center; text-align:center; opacity:0; z-index:5; }
.ov b { display:block; font-size:118px; font-weight:900; letter-spacing:-0.035em; line-height:0.95; color:#1d1d1f; }
.ov.long b { font-size:84px; }
.ov.red b { color:#d52b1e; }
.ov small { display:block; font-size:40px; font-weight:700; color:#55535a; margin-top:12px; letter-spacing:-0.01em; }
.img { position:absolute; left:60px; top:450px; width:960px; height:960px; opacity:0; will-change:transform; mix-blend-mode:multiply; }
.img img { width:100%; height:100%; display:block; }
.src { position:absolute; left:40px; right:40px; top:150px; text-align:center; font-size:24px; font-weight:600; color:#7d7b82; opacity:0; }
.chflag { position:relative; display:inline-block; width:var(--s); height:var(--s); background:#d52b1e; border-radius:calc(var(--s) * 0.08); }
.chflag::before, .chflag::after { content:""; position:absolute; background:#fff; left:50%; top:50%; transform:translate(-50%,-50%); }
.chflag::before { width:62.5%; height:18.75%; } .chflag::after { width:18.75%; height:62.5%; }
.cap { top: 1462px; font-size: 66px; }
.cap .cw { -webkit-text-stroke: 12px #ECECEF; color:#1d1d1f; }
.cap .cw.now { color:#d52b1e; }
"""


def body(w):
    shots = []
    for n, anc in SHOTS:
        shots.append([n, 0.0 if anc is None else w.a(anc, -0.05)])
    w.reset()
    ovs = []
    for i, (big, small, red, fx, a_in, a_out) in enumerate(OVERLAYS):
        t_in = 0.08 if a_in is None else w.a(a_in, -0.04)
        t_out = None if a_out is None else w.a(a_out, -0.3)
        cls = "ov" + (" red" if red else "") + (" long" if len(big) > 12 else "")
        out = f' data-out="{t_out:.3f}"' if t_out is not None else ""
        sm = f"<small>{small}</small>" if small else ""
        ovs.append(f'<div class="{cls}" data-fx="{fx}" data-at="{t_in:.3f}"{out}><b>{big}</b>{sm}</div>')
    w.reset()
    t_pierre, t_fict, t_zero = w.a("Et Pierre"), w.a("Histoire fictive"), w.a("Zéro franc")
    t_heir = w.a("héritière")
    META["cover_t"] = round(t_zero + 0.5, 2)
    globals()["PUNCH"] = [t_zero, t_heir]
    globals()["SCRIPT"] = SCRIPT_T.replace("__S__", json.dumps(shots)).replace("__F__", json.dumps([t_pierre, t_fict]))
    imgs = "".join(f'<div class="img" id="im{i}"><img src="assets/{n:02d}.png" alt=""></div>' for i, (n, _) in enumerate(shots))
    return f"""
<div class="brand"><span class="chflag" style="--s:30px"></span>THRAX LEGAL</div>
<div class="tag" id="tag"><span>📍 Lausanne · histoire fictive</span></div>
<div class="src" id="src">Histoire fictive · art. 457 ss, 471, 505, 512 CC · art. 20a LPP</div>
{imgs}
{''.join(ovs)}
"""


SCRIPT_T = r"""
(function(){
  var S = __S__, F = __F__;
  function cl(v){ return Math.max(0, Math.min(1, v)); }
  var els = S.map(function(_, i){ return document.getElementById('im' + i); });
  R.on(function(t){
    var k = 0; for (var i = 0; i < S.length; i++) if (t >= S[i][1]) k = i;
    for (var j = 0; j < S.length; j++) {
      var el = els[j];
      if (j !== k) { el.style.opacity = 0; continue; }
      var dt = t - S[j][1], end = (j + 1 < S.length ? S[j + 1][1] : t + 3), dur = Math.max(1, end - S[j][1]);
      var p = TX.step(dt, 0.55, 3.0);
      var sc = (0.9 + 0.1 * p) * (1 + 0.045 * cl(dt / dur));
      var rot = (j % 2 ? 1.2 : -1.2) * (1 - p);
      var y = 30 * (1 - p);
      el.style.opacity = cl(dt / 0.08).toFixed(3);
      el.style.transform = 'translateY(' + y.toFixed(1) + 'px) rotate(' + rot.toFixed(2) + 'deg) scale(' + sc.toFixed(4) + ')';
    }
    document.getElementById('tag').style.opacity = (1 - cl((t - F[0] + 0.2) / 0.3)).toFixed(3);
    document.getElementById('src').style.opacity = cl((t - F[1]) / 0.4).toFixed(3);
  });
})();
"""
