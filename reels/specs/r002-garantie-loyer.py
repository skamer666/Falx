"""Reel 002 — Garantie de loyer bloquée (art. 257e CO). Style : « dossier noir » néon, personnage en traits lumineux."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import mascot

VO = ("Ton ancien bailleur bloque ta garantie de loyer depuis des mois ? Écoute bien. Cet argent n'est pas à lui. "
      "En Suisse, une garantie versée en argent doit être déposée à la banque, sur un compte à ton nom. "
      "Pour un logement, elle ne peut pas dépasser trois mois de loyer. Et la banque ne la libère pas comme ça. "
      "Il faut votre accord à tous les deux, un jugement exécutoire, ou une poursuite à laquelle tu n'as pas fait opposition. "
      "Mais voici le détail que presque personne ne connaît. Si, dans l'année qui suit la fin du bail, le bailleur "
      "n'a ouvert ni procès ni poursuite contre toi, tu peux exiger de la banque qu'elle te rende ta garantie. "
      "Même sans son accord. C'est l'article 257e du Code des obligations. Envoie ça à quelqu'un qui déménage. "
      "Thrax Legal, lien en bio.")

META = {
    "id": "r002-garantie-loyer",
    "music": "tension",
    "caption": ("Ta garantie de loyer est bloquée depuis des mois ? Voici la règle que presque personne ne connaît 🔓\n\n"
                "En Suisse, une garantie versée en argent doit être déposée à la banque, sur un compte au nom du locataire. "
                "Pour un logement : 3 mois de loyer maximum. La banque ne la libère qu'avec l'accord des deux parties, "
                "un jugement exécutoire ou un commandement de payer non frappé d'opposition.\n\n"
                "Et si, dans l'année qui suit la fin du bail, le bailleur n'a ouvert ni action en justice ni poursuite "
                "contre toi, tu peux exiger de la banque qu'elle te restitue la garantie (art. 257e al. 3 CO).\n\n"
                "📤 Envoie ça à quelqu'un qui déménage. Une question ? Thrax Legal, lien en bio.\n\n"
                "#bail #garantiedeloyer #locataire #suisse #suisseromande #demenagement #genève #lausanne #droitsuisse"),
    "yt_title": "Garantie de loyer bloquée en Suisse ? La règle des 1 an (art. 257e CO) #shorts",
    "tags": ["garantie de loyer", "bail", "locataire", "art. 257e CO", "Suisse romande", "déménagement"],
    "genome": {"style": "noir-neon-dossier", "palette": "black/cyan/red", "hook": "situation-frustrante + 'Écoute bien'",
               "format": "secret-peu-connu", "topic": "bail/garantie-loyer", "mascot": "line-neon",
               "captions": "majuscules-cyan", "music": "tension", "length": "~35s"},
    "cover_t": 1.4,
}

CSS = """
#root { background: #06070b; color: #eef6ff; }
.grid { position:absolute; inset:-200px; background-image: linear-gradient(rgba(76,201,240,0.07) 2px, transparent 2px), linear-gradient(90deg, rgba(76,201,240,0.07) 2px, transparent 2px); background-size: 90px 90px; transform: perspective(900px) rotateX(28deg) translateY(380px); transform-origin: 50% 100%; }
.vign { position:absolute; inset:0; background: radial-gradient(ellipse at 50% 38%, transparent 30%, rgba(0,0,0,0.85) 100%); }
.scan { position:absolute; inset:0; background: repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0 2px, transparent 2px 6px); pointer-events:none; z-index: 60; }
.mono { font-family: ui-monospace, "DejaVu Sans Mono", monospace; letter-spacing: 0.08em; }
.lbl { font-size: 38px; color: #ff3b4e; font-weight: 700; text-shadow: 0 0 18px rgba(255,59,78,0.8); }
.big { font-weight: 900; letter-spacing: -0.045em; line-height: 0.92; text-transform: uppercase; }
.out { color: transparent; -webkit-text-stroke: 4px #eef6ff; }
.neonr { color: #ff3b4e; text-shadow: 0 0 14px rgba(255,59,78,0.9), 0 0 44px rgba(255,59,78,0.6); }
.neonc { color: #4cc9f0; text-shadow: 0 0 14px rgba(76,201,240,0.9), 0 0 44px rgba(76,201,240,0.5); }
.neong { color: #3ef59a; text-shadow: 0 0 14px rgba(62,245,154,0.9), 0 0 44px rgba(62,245,154,0.5); }
.vault { position:absolute; filter: drop-shadow(0 0 12px #4cc9f0) drop-shadow(0 0 30px rgba(76,201,240,0.6)); }
.vault * { fill: none; stroke: #4cc9f0; stroke-width: 7; stroke-linecap: round; }
.card { width: 760px; height: 440px; border-radius: 36px; border: 5px solid #4cc9f0; box-shadow: 0 0 30px rgba(76,201,240,0.55), inset 0 0 40px rgba(76,201,240,0.15); padding: 46px 54px; background: rgba(8,14,22,0.85); }
.card .chipx { width: 110px; height: 82px; border-radius: 14px; border: 4px solid #4cc9f0; margin-bottom: 70px; }
.card .nm { font-size: 34px; color: #9fb3c8; }
.card .who { font-size: 64px; font-weight: 900; margin-top: 12px; }
.row { display:flex; align-items:center; gap: 28px; font-size: 54px; font-weight: 800; }
.row b { display:inline-flex; width: 78px; height: 78px; border-radius: 18px; border: 4px solid #4cc9f0; align-items:center; justify-content:center; color:#4cc9f0; font-size: 46px; box-shadow: 0 0 18px rgba(76,201,240,0.6); }
.flash { position:absolute; inset:0; background:rgba(255,59,78,0.35); }
.sk { position:relative; display:inline-block; }
.sk i { position:absolute; left:-8px; right:-8px; top:46%; height: 10px; background:#ff3b4e; box-shadow: 0 0 16px #ff3b4e; transform-origin: 0 50%; }
.ring { position:absolute; }
.ring circle { fill:none; stroke-width: 26; }
.chipA { display:inline-block; font-size: 62px; font-weight: 900; padding: 22px 44px; border: 5px solid #eef6ff; border-radius: 22px; box-shadow: 0 0 26px rgba(238,246,255,0.5); }
.brand { font-size: 112px; font-weight: 900; letter-spacing: -0.05em; }
.brand span { color:#ff3b4e; text-shadow: 0 0 24px rgba(255,59,78,0.7); }
.cap { top: 1120px; font-size: 76px; text-transform: uppercase; letter-spacing: -0.01em; }
.cap .cw { color: #eef6ff; -webkit-text-stroke: 12px #06070b; }
.cap .cw.now { color: #4cc9f0; text-shadow: 0 0 22px rgba(76,201,240,0.8); transform: scale(1.06); }
.mwrap { position:absolute; left: 230px; top: 1190px; --bgc: #06070b; --glow: #4cc9f0; }
"""


def body(w):
    t_bloque = w.a("bloque")
    t_ecoute = w.a("Écoute")
    t_argent = w.a("Cet argent")
    t_suisse = w.a("En Suisse,")
    t_compte = w.a("sur un compte")
    t_logement = w.a("Pour un logement,")
    t_trois = w.a("trois mois")
    t_banque = w.a("Et la banque")
    t_accord = w.a("votre accord")
    t_jug = w.a("un jugement")
    t_pours = w.a("ou une poursuite")
    t_mais = w.a("Mais voici")
    t_si = w.a("Si, dans")
    t_fin = w.a("fin du bail,")
    t_proces = w.a("ni procès")
    t_ni_p = w.a("ni poursuite")
    t_exiger = w.a("tu peux exiger")
    t_meme = w.a("Même sans")
    t_art = w.a("C'est l'article")
    t_envoie = w.a("Envoie")
    t_thrax = w.a("Thrax Legal,")
    m = mascot.svg("m2", "navy", w=620, extra_cls="line neon")
    talk = (f'data-talk data-arml="0:0;{t_trois}:-120;{t_banque - 0.2}:0;{t_exiger}:-150;{t_art}:0" '
            f'data-armr="0:0;{t_argent}:35;{t_suisse}:0;{t_mais}:30;{t_si}:0" '
            f'data-brow="0:16;{t_argent}:0;{t_mais}:18;{t_si}:6;{t_exiger}:0" class="mascot ')
    m = m.replace('class="mascot ', talk, 1)
    globals()["PUNCH"] = [t_argent, t_mais, t_exiger]
    globals()["SCRIPT"] = SCRIPT_T % {"a": t_si + 0.2}
    return f"""
<div class="grid"></div>
<div class="vign"></div>

<!-- HOOK : dossier + coffre -->
<div class="ab mono lbl" style="left:80px;top:150px" data-fx="type" data-cps="38" data-at="0.0" data-out="{t_suisse - 0.15}">● DOSSIER 257e — BLOQUÉ</div>
<div class="ab big out" style="left:76px;top:230px;font-size:128px" data-fx="words" data-at="0.05" data-st="0.08" data-out="{t_suisse - 0.15}">Ta garantie</div>
<div class="ab big neonr" style="left:76px;top:360px;font-size:150px" data-fx="shake" data-at="{t_bloque}" data-out="{t_suisse - 0.15}">bloquée ?</div>
<svg class="vault ab" style="left:300px;top:560px" width="480" height="480" viewBox="0 0 480 480" data-fx="none" data-at="0.2" data-out="{t_suisse - 0.15}">
  <circle cx="240" cy="240" r="220" pathLength="1" data-fx="draw" data-d="0.9" data-at="0.2"/>
  <circle cx="240" cy="240" r="150" pathLength="1" data-fx="draw" data-d="0.9" data-at="0.45"/>
  <path d="M240 150 L240 330 M150 240 L330 240 M176 176 L304 304 M304 176 L176 304" pathLength="1" data-fx="draw" data-d="0.8" data-at="0.7"/>
  <circle cx="240" cy="240" r="34" pathLength="1" data-fx="draw" data-d="0.4" data-at="1.1"/>
</svg>
<div class="ab big neonr c" style="left:0;top:700px;width:1080px;font-size:120px" data-fx="stamp" data-rot="-7" data-at="{t_argent + 0.35}" data-out="{t_suisse - 0.15}"><span style="background:#06070b;padding:0 26px;border:7px solid #ff3b4e;border-radius:24px;box-shadow:0 0 30px #ff3b4e">PAS À LUI</span></div>

<!-- COMPTE A TON NOM -->
<div class="ab mono lbl c" style="left:0;top:170px;width:1080px;color:#4cc9f0;text-shadow:0 0 18px rgba(76,201,240,0.8)" data-fx="type" data-cps="40" data-at="{t_suisse}" data-out="{t_banque - 0.15}">RÈGLE N°1 — GARANTIE EN ARGENT</div>
<div class="ab card" style="left:160px;top:270px" data-fx="rise" data-dy="120" data-at="{t_suisse + 0.4}" data-out="{t_logement - 0.15}">
  <div class="chipx"></div><div class="nm mono">COMPTE DE GARANTIE</div><div class="who">AU NOM DU <span class="neonc">LOCATAIRE</span></div>
</div>
<div class="ab big c" style="left:0;top:260px;width:1080px;font-size:400px" data-fx="pop" data-at="{t_trois}" data-out="{t_banque - 0.15}"><span class="neonc">3</span><span style="font-size:220px" class="out">×</span></div>
<div class="ab big c" style="left:0;top:690px;width:1080px;font-size:74px" data-fx="rise" data-at="{t_trois + 0.25}" data-out="{t_banque - 0.15}">loyers <span class="neonr">maximum</span></div>
<div class="ab mono c" style="left:0;top:800px;width:1080px;font-size:36px;color:#9fb3c8" data-fx="fade" data-at="{t_logement}" data-out="{t_banque - 0.15}">BAIL D'HABITATION</div>

<!-- LIBERATION : 3 conditions -->
<div class="ab big c" style="left:0;top:170px;width:1080px;font-size:84px" data-fx="words" data-at="{t_banque}" data-st="0.05" data-out="{t_mais - 0.15}">La banque libère <span class="neonc">seulement</span> avec :</div>
<div class="ab row" style="left:90px;top:420px" data-fx="rise" data-dx="-120" data-at="{t_accord}" data-out="{t_mais - 0.15}"><b>1</b>l'accord des deux</div>
<div class="ab row" style="left:90px;top:560px" data-fx="rise" data-dx="-120" data-at="{t_jug}" data-out="{t_mais - 0.15}"><b>2</b>un jugement exécutoire</div>
<div class="ab row" style="left:90px;top:700px;font-size:50px" data-fx="rise" data-dx="-120" data-at="{t_pours}" data-out="{t_mais - 0.15}"><b>3</b>une poursuite sans opposition</div>

<!-- SECRET -->
<div class="flash" data-fx="fade" data-d="0.01" data-at="{t_mais}" data-out="{t_mais + 0.05}"></div>
<div class="ab mono lbl c" style="left:0;top:180px;width:1080px" data-fx="type" data-cps="34" data-at="{t_mais}" data-out="{t_meme - 0.1}">⚠ DÉTAIL PEU CONNU</div>
<svg class="ring ab" style="left:240px;top:230px" width="600" height="600" viewBox="0 0 600 600" data-fx="pop" data-at="{t_si}" data-out="{t_meme - 0.1}">
  <circle cx="300" cy="300" r="260" style="stroke:rgba(76,201,240,0.15)"/>
  <circle id="ring" cx="300" cy="300" r="260" pathLength="1" style="stroke:#4cc9f0;stroke-linecap:round;stroke-dasharray:1 1;stroke-dashoffset:1;transform:rotate(-90deg);transform-origin:300px 300px;filter:drop-shadow(0 0 14px #4cc9f0)"/>
</svg>
<div class="ab big c neonc" style="left:0;top:400px;width:1080px;font-size:190px" data-fx="count" data-from="0" data-to="365" data-d="1.6" data-at="{t_si + 0.2}" data-out="{t_meme - 0.1}">365</div>
<div class="ab big c" style="left:0;top:860px;width:1080px;font-size:56px" data-fx="rise" data-at="{t_fin}" data-out="{t_meme - 0.1}">jours après la fin du bail</div>
<div class="ab big c" style="left:0;top:955px;width:1080px;font-size:56px;color:#9fb3c8" data-fx="rise" data-at="{t_proces}" data-out="{t_exiger - 0.4}"><span class="sk">procès<i data-fx="width" data-d="0.25" data-at="{t_proces + 0.3}"></i></span> &nbsp;·&nbsp; <span class="sk">poursuite<i data-fx="width" data-d="0.25" data-at="{t_ni_p + 0.3}"></i></span></div>
<div class="ab big c neong" style="left:0;top:945px;width:1080px;font-size:84px" data-fx="stamp" data-rot="-3" data-at="{t_exiger}" data-out="{t_meme - 0.1}">🔓 TU LA RÉCUPÈRES</div>

<!-- MEME SANS SON ACCORD + ARTICLE -->
<div class="ab big c" style="left:40px;top:330px;width:1000px;font-size:112px;text-transform:none" data-fx="words" data-at="{t_meme}" data-st="0.07" data-out="{t_envoie - 0.15}">même <span class="neonr">sans</span> son accord</div>
<div class="ab c" style="left:0;top:720px;width:1080px" data-fx="stamp" data-rot="-3" data-at="{t_art + 0.1}" data-out="{t_envoie - 0.15}"><span class="chipA mono">ART. 257e al. 3 CO</span></div>

<!-- CTA -->
<div class="ab big c" style="left:0;top:260px;width:1080px;font-size:72px" data-fx="words" data-at="{t_envoie}" data-st="0.05">📤 Envoie ça à quelqu'un <span class="neonc">qui déménage</span></div>
<div class="ab brand c" style="left:0;top:560px;width:1080px" data-fx="zoom" data-at="{t_thrax}">Thrax <span>Legal</span></div>
<div class="ab mono c" style="left:0;top:710px;width:1080px;font-size:46px;color:#9fb3c8" data-fx="rise" data-at="{t_thrax + 0.5}">LIEN EN BIO ↗</div>

<div class="mwrap" data-fx="rise" data-dy="500" data-at="0.0">{m}</div>
<div class="scan"></div>
"""


SCRIPT_T = """
(function(){
  var ring = document.getElementById('ring');
  var a = %(a)s;
  R.on(function(t){ var u = Math.max(0, Math.min(1, (t - a) / 1.6)); u = 1 - Math.pow(1 - u, 3); ring.style.strokeDashoffset = String(1 - u); });
})();
"""
PUNCH = []
SFX = []
TAIL = 1.6
CAP_MAX = 3
