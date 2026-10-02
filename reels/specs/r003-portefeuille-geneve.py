"""Reel 003 — Le portefeuille trouvé à Genève (art. 720-722 CC, 137 et 332 CP). Style : collage papier / carte postale."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import mascot

VO = ("Tu trouves un portefeuille sur un trottoir à Genève. Dedans, deux mille francs. Personne ne t'a vu. "
      "Tu fais quoi ? Si tu le gardes, attention : en Suisse, c'est une infraction pénale. "
      "Mais si tu joues le jeu, ça devient très intéressant. La loi t'oblige à prévenir le propriétaire, "
      "ou la police si tu ne sais pas qui c'est. Quand tu le rends, tu as droit à une récompense équitable. "
      "En pratique, on parle souvent d'environ dix pour cent. Mais le plus fou, c'est ça. "
      "Si personne ne le réclame pendant cinq ans après ta déclaration, le portefeuille devient à toi. Légalement. "
      "C'est le Code civil suisse, articles 720 à 722. Envoie ça à la personne la plus honnête que tu connais. "
      "Thrax Legal, lien en bio.")

META = {
    "id": "r003-portefeuille-geneve",
    "music": "lofi",
    "caption": ("Tu trouves 2000 francs dans un portefeuille à Genève. Tu fais quoi ? 👀\n\n"
                "En Suisse, garder une chose trouvée est une infraction (art. 137 et 332 CP). Tu dois prévenir le "
                "propriétaire, ou la police si tu ne le connais pas. En le rendant, tu as droit au remboursement de tes "
                "frais et à une récompense équitable (art. 722 al. 2 CC), souvent autour de 10 % en pratique.\n\n"
                "Et si personne ne le réclame dans les 5 ans après ta déclaration, il devient à toi (art. 722 al. 1 CC).\n\n"
                "📤 Envoie ça à la personne la plus honnête que tu connais. Une question ? Thrax Legal, lien en bio.\n\n"
                "#suisse #genève #lausanne #suisseromande #objettrouvé #droitsuisse #lesaviezvous #storytime"),
    "yt_title": "Tu trouves 2000 francs à Genève : la loi suisse te dit quoi ? #shorts",
    "tags": ["objet trouvé", "Genève", "Suisse", "récompense", "droit suisse", "Code civil"],
    "genome": {"style": "collage-papier-carte-postale", "palette": "papier/violet/rouge", "hook": "dilemme-moral 'Tu fais quoi ?'",
               "format": "storytime-choix-twist", "topic": "vie-quotidienne/objet-trouve", "mascot": "ink-charcoal",
               "captions": "noir-surligne-violet", "music": "lofi", "length": "~35s"},
    "cover_t": 2.2,
}

CSS = """
#root { background: #eee4cf; color: #1d1a16; }
.paper { position:absolute; inset:0; background:
  radial-gradient(circle at 20% 15%, rgba(255,255,255,0.55), transparent 40%),
  repeating-linear-gradient(0deg, rgba(120,90,40,0.035) 0 3px, transparent 3px 7px); }
.lake { position:absolute; left:0; right:0; top:860px; height:260px; background: linear-gradient(#bcd7e0, #9cc3d1); opacity: 0.55; }
.jet { position:absolute; left:760px; top:120px; width:120px; height:760px; }
.cut { background:#fff; box-shadow: 0 14px 0 rgba(40,30,15,0.18); border-radius: 6px; }
.tape { position:absolute; width: 150px; height: 46px; background: rgba(255,214,102,0.75); }
.stampP { display:inline-block; padding: 18px 34px; border: 6px dashed #c23b22; color:#c23b22; font-weight:900; font-size: 58px; letter-spacing: 0.08em; background: #f8f1e2; }
.hd { font-weight: 900; letter-spacing: -0.04em; line-height: 0.95; }
.note { position:absolute; width: 520px; height: 250px; border-radius: 14px; background: linear-gradient(135deg,#8e6ccf,#5b3ea8); color:#fff; box-shadow: 0 12px 0 rgba(40,30,15,0.25); display:flex; align-items:center; justify-content:space-between; padding: 0 40px; font-weight:900; font-size: 92px; }
.note small { font-size: 40px; font-weight: 800; opacity: 0.85; }
.btn { position:absolute; width: 440px; height: 170px; border-radius: 30px; border: 7px solid #1d1a16; box-shadow: 0 14px 0 #1d1a16; display:flex; align-items:center; justify-content:center; font-weight: 900; font-size: 64px; background:#fff; }
.btnr { background:#e63946; color:#fff; }
.btng { background:#2a9d8f; color:#fff; }
.step { display:flex; align-items:center; gap: 26px; font-size: 56px; font-weight: 800; }
.step b { width: 84px; height: 84px; border-radius: 50%; background:#1d1a16; color:#eee4cf; display:inline-flex; align-items:center; justify-content:center; font-size: 48px; }
.cal { position:absolute; width: 420px; height: 470px; border-radius: 26px; background:#fff; border: 7px solid #1d1a16; box-shadow: 0 16px 0 #1d1a16; overflow:hidden; }
.cal .top { height: 110px; background:#c23b22; }
.chip { display:inline-block; font-weight:900; font-size: 56px; padding: 20px 38px; background:#1d1a16; color:#eee4cf; border-radius: 20px; }
.brand { font-size: 112px; font-weight: 900; letter-spacing: -0.05em; }
.brand span { color:#c23b22; }
.cap { top: 1110px; }
.cap .cw { color:#1d1a16; -webkit-text-stroke: 0; }
.cap .cw.now { color:#fff; background:#5b3ea8; border-radius: 12px; padding: 0 10px; transform: rotate(-2deg) scale(1.06); }
.mwrap { position:absolute; left: 250px; top: 1215px; }
"""

WALLET = """<svg width="520" height="380" viewBox="0 0 520 380">
  <rect x="20" y="40" width="480" height="320" rx="34" fill="#7a4a2a" stroke="#1d1a16" stroke-width="8"/>
  <rect x="20" y="40" width="480" height="120" rx="34" fill="#8f5a35" stroke="#1d1a16" stroke-width="8"/>
  <rect x="380" y="140" width="150" height="90" rx="22" fill="#5c361d" stroke="#1d1a16" stroke-width="8"/>
  <circle cx="420" cy="185" r="14" fill="#e9c46a" stroke="#1d1a16" stroke-width="5"/>
  <path d="M60 300 Q260 330 460 300" stroke="#c99a6b" stroke-width="5" fill="none" stroke-dasharray="14 12"/>
</svg>"""

JET = """<svg class="jet" viewBox="0 0 120 760"><path d="M60 760 C40 520 30 260 52 30 Q60 0 68 30 C90 260 80 520 60 760 Z" fill="#ffffff" opacity="0.85"/>
<path d="M60 40 C20 120 0 220 4 300" stroke="#ffffff" stroke-width="10" fill="none" opacity="0.5"/></svg>"""


def body(w):
    t_dedans = w.a("Dedans,")
    t_2000 = w.a("deux mille")
    t_personne = w.a("Personne ne")
    t_quoi = w.a("Tu fais quoi")
    t_garde = w.a("Si tu le gardes,")
    t_penale = w.a("pénale.")
    t_mais = w.a("Mais si tu joues")
    t_loi = w.a("La loi")
    t_police = w.a("ou la police")
    t_rends = w.a("Quand tu le rends,")
    t_recomp = w.a("récompense")
    t_pratique = w.a("En pratique,")
    t_dix = w.a("dix pour cent.")
    t_fou = w.a("Mais le plus fou,")
    t_si = w.a("Si personne")
    t_cinq = w.a("cinq ans")
    t_toi = w.a("devient à toi.")
    t_leg = w.a("Légalement.")
    t_code = w.a("C'est le Code")
    t_envoie = w.a("Envoie")
    t_thrax = w.a("Thrax Legal,")
    m = mascot.svg("m3", "charcoal", w=600, extra_cls="ink")
    talk = (f'data-talk data-arml="0:0;{t_quoi}:-130;{t_garde}:0;{t_fou}:-150;{t_code}:0;{t_thrax}:-160" '
            f'data-armr="0:0;{t_garde}:40;{t_mais}:0" '
            f'data-brow="0:10;{t_dedans}:18;{t_quoi}:6;{t_garde}:20;{t_mais}:0;{t_fou}:20;{t_leg}:0" class="mascot ')
    m = m.replace('class="mascot ', talk, 1)
    globals()["PUNCH"] = [t_quoi, t_penale, t_fou, t_leg]
    s1 = t_garde - 0.2  # end of scene 1
    return f"""
<div class="paper"></div>

<!-- SCENE 1 : Genève, le portefeuille -->
<div class="ab" style="left:0;top:0;width:1080px;height:1120px" data-fx="fade" data-d="0.3" data-at="0" data-out="{t_quoi - 0.1}">
  <div class="lake"></div>{JET}
</div>
<div class="ab" style="left:80px;top:150px" data-fx="stamp" data-rot="-6" data-at="0.05" data-out="{t_quoi - 0.1}"><span class="stampP">GENÈVE</span></div>
<div class="ab" style="left:270px;top:330px" data-fx="drop" data-at="0.25" data-out="{t_quoi - 0.1}">{WALLET}</div>
<div class="note" style="left:120px;top:470px;transform:rotate(-8deg)" data-fx="rise" data-dy="220" data-at="{t_2000}" data-out="{t_quoi - 0.1}">1000<small>FRANCS</small></div>
<div class="note" style="left:400px;top:560px;transform:rotate(6deg)" data-fx="rise" data-dy="220" data-at="{t_2000 + 0.18}" data-out="{t_quoi - 0.1}">1000<small>FRANCS</small></div>
<div class="ab hd c" style="left:0;top:850px;width:1080px;font-size:74px" data-fx="pop" data-at="{t_personne}" data-out="{t_quoi - 0.1}">👀 personne ne t'a vu</div>

<!-- CHOIX -->
<div class="ab hd c" style="left:0;top:330px;width:1080px;font-size:130px" data-fx="words" data-at="{t_quoi}" data-st="0.08" data-out="{s1}">Tu fais quoi ?</div>
<div class="btn" style="left:80px;top:640px" data-fx="pop" data-at="{t_quoi + 0.3}" data-out="{t_loi - 0.15}">LE GARDER</div>
<div class="btn" style="left:560px;top:640px" data-fx="pop" data-at="{t_quoi + 0.42}" data-out="{t_loi - 0.15}">LE RENDRE</div>
<div class="btn btnr" style="left:80px;top:640px" data-fx="fade" data-d="0.12" data-at="{t_garde}" data-out="{t_mais - 0.1}">LE GARDER</div>
<div class="ab c" style="left:20px;top:270px;width:1040px" data-fx="stamp" data-rot="-5" data-at="{t_penale - 0.3}" data-out="{t_mais - 0.1}"><span class="stampP" style="font-size:66px;background:#fff">INFRACTION PÉNALE</span></div>
<div class="ab c" style="left:0;top:880px;width:520px;font-size:40px;font-weight:800;color:#c23b22" data-fx="rise" data-at="{t_penale}" data-out="{t_mais - 0.1}">art. 137 + 332 CP</div>
<div class="btn btng" style="left:560px;top:640px" data-fx="pop" data-at="{t_mais}" data-out="{t_loi - 0.15}">✓ RENDU</div>
<div class="ab hd c" style="left:0;top:300px;width:1080px;font-size:84px" data-fx="words" data-at="{t_mais + 0.2}" data-st="0.06" data-out="{t_loi - 0.15}">ça devient <span style="color:#2a9d8f">intéressant</span></div>

<!-- OBLIGATIONS -->
<div class="ab hd" style="left:90px;top:290px;font-size:88px" data-fx="words" data-at="{t_loi}" data-st="0.06" data-out="{t_rends - 0.15}">Ce que tu dois faire :</div>
<div class="ab step" style="left:90px;top:520px;font-size:62px" data-fx="rise" data-dx="-140" data-at="{t_loi + 0.5}" data-out="{t_rends - 0.15}"><b>1</b>prévenir le propriétaire</div>
<div class="ab step" style="left:90px;top:700px;font-size:62px" data-fx="rise" data-dx="-140" data-at="{t_police}" data-out="{t_rends - 0.15}"><b>2</b>sinon : la police 🚓</div>

<!-- RECOMPENSE -->
<div class="ab c" style="left:0;top:260px;width:1080px;font-size:240px" data-fx="spinin" data-at="{t_recomp - 0.2}" data-out="{t_fou - 0.15}">🎁</div>
<div class="ab hd c" style="left:0;top:580px;width:1080px;font-size:100px" data-fx="words" data-at="{t_recomp}" data-st="0.06" data-out="{t_fou - 0.15}">récompense équitable</div>
<div class="ab cut c" style="left:240px;top:770px;width:600px;padding:26px 0;font-weight:900;font-size:84px;transform:rotate(-3deg)" data-fx="pop" data-at="{t_dix - 0.2}" data-out="{t_fou - 0.15}">≈ 10 % <span style="font-size:44px;color:#7a6a55">en pratique</span></div>
<div class="tape" style="left:470px;top:748px;transform:rotate(-8deg)" data-fx="fade" data-d="0.1" data-at="{t_dix}" data-out="{t_fou - 0.15}"></div>

<!-- TWIST : 5 ans -->
<div class="ab hd c" style="left:0;top:200px;width:1080px;font-size:84px;color:#c23b22" data-fx="words" data-at="{t_fou}" data-st="0.06" data-out="{t_code - 0.15}">Le plus fou :</div>
<div class="cal" style="left:330px;top:340px" data-fx="drop" data-at="{t_si}" data-out="{t_toi - 0.1}"><div class="top"></div>
  <div class="hd c" style="font-size:210px;margin-top:20px" data-fx="count" data-from="0" data-to="5" data-d="1.2" data-at="{t_cinq - 0.2}">5</div>
  <div class="hd c" style="font-size:56px;margin-top:-10px">ANS</div></div>
<div class="ab hd c" style="left:0;top:880px;width:1080px;font-size:58px;color:#7a6a55" data-fx="rise" data-at="{t_cinq + 0.3}" data-out="{t_toi - 0.1}">sans réclamation</div>
<div class="ab" style="left:270px;top:340px" data-fx="zoom" data-at="{t_toi}" data-out="{t_code - 0.15}">{WALLET}</div>
<div class="ab c" style="left:0;top:780px;width:1080px" data-fx="stamp" data-rot="-6" data-at="{t_leg}" data-out="{t_code - 0.15}"><span class="stampP" style="font-size:80px;color:#2a9d8f;border-color:#2a9d8f">À TOI. LÉGALEMENT.</span></div>

<!-- ARTICLE -->
<div class="ab c" style="left:0;top:560px;width:1080px" data-fx="stamp" data-rot="-3" data-at="{t_code + 0.1}" data-out="{t_envoie - 0.15}"><span class="chip">§ Code civil, art. 720–722</span></div>

<!-- CTA -->
<div class="ab hd c" style="left:60px;top:300px;width:960px;font-size:80px" data-fx="words" data-at="{t_envoie}" data-st="0.05">📤 Envoie ça à la personne <span style="color:#5b3ea8">la plus honnête</span> que tu connais</div>
<div class="ab brand c" style="left:0;top:700px;width:1080px" data-fx="zoom" data-at="{t_thrax}">Thrax <span>Legal</span></div>
<div class="ab c" style="left:0;top:850px;width:1080px;font-size:50px;font-weight:800" data-fx="rise" data-at="{t_thrax + 0.5}">lien en bio ↗</div>

<div class="mwrap" data-fx="rise" data-dy="500" data-at="0.0">{m}</div>
"""


PUNCH = []
SFX = []
TAIL = 1.6
CAP_MAX = 3
