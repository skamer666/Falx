"""Reel 005 — « J'ai 14 jours pour renvoyer » : mythe en Suisse (art. 40a ss CO). Style : écran de smartphone / chat, dégradé vif."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import mascot

VO = ("Tu commandes une veste en ligne depuis Neuchâtel. Elle ne te va pas. "
      "Pas grave, tu as quatorze jours pour la renvoyer, non ? Eh bien non. "
      "En Suisse, ce droit n'existe pas pour les achats en ligne. Les quatorze jours, c'est une règle européenne. "
      "Ici, tout dépend des conditions du vendeur. S'il ne prévoit pas de retour, il peut refuser. "
      "Attention : si la veste est défectueuse, c'est une autre histoire, c'est la garantie. "
      "Et il y a un cas où tu as vraiment quatorze jours : quand un vendeur t'appelle, ou sonne chez toi, "
      "sans que tu l'aies demandé, pour un achat de plus de cent francs. "
      "Article 40a et suivants du Code des obligations. Avant de commander, lis les conditions de retour. "
      "Thrax Legal, lien en bio.")

META = {
    "id": "r005-achat-en-ligne",
    "music": "bounce",
    "caption": ("« J'ai 14 jours pour renvoyer mon achat en ligne. » En Suisse… non 😬\n\n"
                "Le droit de rétractation de 14 jours pour les achats en ligne est une règle de l'Union européenne. "
                "La loi suisse ne le prévoit pas : le retour dépend des conditions du vendeur. Un article défectueux, "
                "c'est une autre question (garantie).\n\n"
                "Tu as en revanche 14 jours pour révoquer un achat de plus de 100 CHF conclu lors d'un démarchage "
                "à domicile ou par téléphone, si tu ne l'as pas sollicité (art. 40a ss CO).\n\n"
                "🛒 Lis les conditions de retour avant de commander. Une question ? Thrax Legal, lien en bio.\n\n"
                "#achatenligne #shopping #suisse #neuchatel #genève #lausanne #suisseromande #consommateur #droitsuisse"),
    "yt_title": "14 jours pour renvoyer un achat en ligne en Suisse ? Non, et voici pourquoi #shorts",
    "tags": ["achat en ligne", "droit de rétractation", "Suisse", "consommateur", "art. 40a CO", "Neuchâtel"],
    "genome": {"style": "smartphone-chat-degrade", "palette": "violet/rose/blanc", "hook": "mythe-a-casser 'non ?'",
               "format": "mythe-vs-realite", "topic": "conso/achat-en-ligne", "mascot": "flat-warm",
               "captions": "blanc-surligne-jaune", "music": "bounce", "length": "~35s"},
    "cover_t": 4.0,
}

CSS = """
#root { background: linear-gradient(160deg, #6a3df0 0%, #b23cd6 55%, #ff5c8a 100%); color:#fff; }
.glow { position:absolute; width: 900px; height: 900px; left: 90px; top: 120px; border-radius: 50%; background: radial-gradient(rgba(255,255,255,0.25), transparent 65%); }
.phone { position:absolute; left: 190px; top: 130px; width: 700px; height: 960px; border-radius: 80px; background: #0e0e14; padding: 22px; box-shadow: 0 40px 80px rgba(40,0,60,0.45); }
.screen { position:relative; width:100%; height:100%; border-radius: 60px; background: #f6f5fb; overflow:hidden; color:#14121c; }
.notch { position:absolute; left: 50%; top: 18px; width: 200px; height: 44px; margin-left:-100px; border-radius: 22px; background:#0e0e14; z-index: 5; }
.bar { position:absolute; left:0; right:0; top:0; height: 150px; background:#fff; border-bottom: 2px solid #e6e3ef; display:flex; align-items:flex-end; padding: 0 40px 22px; font-size: 36px; font-weight: 800; gap: 18px; }
.av { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg,#6a3df0,#ff5c8a); }
.b { position:absolute; max-width: 470px; padding: 24px 32px; border-radius: 36px; font-size: 38px; font-weight: 700; line-height: 1.2; }
.me { right: 30px; background: #2f7bff; color:#fff; border-bottom-right-radius: 10px; }
.them { left: 30px; background: #e6e3ef; color:#14121c; border-bottom-left-radius: 10px; }
.order { position:absolute; left: 40px; right: 40px; top: 190px; background:#fff; border-radius: 34px; padding: 34px; box-shadow: 0 10px 30px rgba(60,40,120,0.12); }
.order .ok { color:#18a957; font-weight: 900; font-size: 40px; }
.jacket { font-size: 190px; text-align:center; margin: 10px 0; }
.price { display:flex; justify-content:space-between; font-size: 40px; font-weight: 800; }
.loc { display:inline-block; font-size: 42px; font-weight: 900; letter-spacing: 0.12em; background: #fff; color:#6a3df0; padding: 12px 28px; border-radius: 999px; }
.stampM { display:inline-block; font-size: 170px; font-weight: 900; color:#ff2d55; border: 14px solid #ff2d55; border-radius: 30px; padding: 0 40px; background: rgba(255,255,255,0.92); letter-spacing: 0.02em; }
.hd { font-weight: 900; letter-spacing: -0.04em; line-height: 0.95; }
.card { position:absolute; left: 110px; width: 860px; background: #fff; color:#14121c; border-radius: 40px; padding: 44px 50px; box-shadow: 0 30px 60px rgba(40,0,60,0.35); }
.vs { display:flex; justify-content:space-around; align-items:center; }
.vs div { text-align:center; font-weight: 900; }
.call { position:absolute; inset:0; background: linear-gradient(#1c1c28, #0b0b12); color:#fff; display:flex; flex-direction:column; align-items:center; padding-top: 110px; }
.call .who { font-size: 56px; font-weight: 800; margin-top: 30px; }
.call .sub { font-size: 34px; color:#a5a3b5; margin-top: 10px; }
.call .btns { display:flex; gap: 160px; margin-top: 190px; }
.call .btns i { width: 140px; height: 140px; border-radius: 50%; display:block; }
.chip { display:inline-block; font-weight:900; font-size: 58px; padding: 20px 40px; background:#fff; color:#6a3df0; border-radius: 22px; box-shadow: 0 14px 0 rgba(40,0,60,0.3); }
.brand { font-size: 112px; font-weight: 900; letter-spacing: -0.05em; }
.brand span { color:#ffe14d; }
.cap { top: 1125px; }
.cap .cw { -webkit-text-stroke: 12px #4b1d8f; }
.cap .cw.now { color:#ffe14d; }
.mwrap { position:absolute; left: 250px; top: 1225px; }
"""


def body(w):
    t_elle = w.a("Elle ne te va pas.")
    t_pas = w.a("Pas grave,")
    t_non = w.a("Eh bien non.")
    t_suisse = w.a("En Suisse,")
    t_euro = w.a("européenne.")
    t_ici = w.a("Ici,")
    t_refuser = w.a("il peut refuser.")
    t_att = w.a("Attention :")
    t_gar = w.a("c'est la garantie.")
    t_cas = w.a("Et il y a un cas")
    t_appelle = w.a("t'appelle,")
    t_sonne = w.a("sonne chez toi,")
    t_sans = w.a("sans que tu")
    t_cent = w.a("plus de cent francs.")
    t_art = w.a("Article 40a")
    t_avant = w.a("Avant de commander,")
    t_thrax = w.a("Thrax Legal,")
    m = mascot.svg("m5", "warm", w=580)
    talk = (f'data-talk data-arml="0:0;{t_non}:-150;{t_suisse}:0;{t_cas}:-140;{t_art}:0;{t_thrax}:-160" '
            f'data-armr="0:0;{t_elle}:35;{t_pas}:0;{t_att}:40;{t_cas}:0" '
            f'data-brow="0:6;{t_elle}:16;{t_non}:22;{t_suisse}:0;{t_att}:18;{t_cas}:0" class="mascot ')
    m = m.replace('class="mascot ', talk, 1)
    globals()["PUNCH"] = [t_non, t_cas, t_cent]
    end_phone = t_suisse - 0.15
    return f"""
<div class="glow"></div>

<!-- TELEPHONE : commande + chat -->
<div class="ab c" style="left:0;top:50px;width:1080px;z-index:6" data-fx="pop" data-at="0.05" data-out="{end_phone}"><span class="loc">📍 NEUCHÂTEL</span></div>
<div class="phone" data-fx="rise" data-dy="300" data-at="0" data-out="{end_phone}">
  <div class="screen">
    <div class="notch"></div>
    <div class="bar"><div class="av"></div>Ma boutique</div>
    <div class="order" data-fx="pop" data-at="0.35" data-out="{t_pas - 0.1}">
      <div class="ok">✓ Commande confirmée</div>
      <div class="jacket">🧥</div>
      <div class="price"><span>Veste</span><span>189 CHF</span></div>
    </div>
    <div class="ab c" style="left:0;right:0;top:620px;font-size:150px" data-fx="pop" data-at="{t_elle + 0.2}" data-out="{t_pas - 0.1}">😬</div>
    <div class="b me" style="top:220px" data-fx="rise" data-dy="80" data-at="{t_pas}">Je veux la renvoyer. J'ai 14 jours, non ?</div>
    <div class="b them" style="top:470px" data-fx="rise" data-dy="80" data-at="{t_non + 0.25}">Désolé, aucun retour possible 🙃</div>
  </div>
</div>
<div class="ab c" style="left:0;top:520px;width:1080px;z-index:8" data-fx="stamp" data-rot="-10" data-at="{t_non + 0.6}" data-out="{end_phone}"><span class="stampM">MYTHE</span></div>

<!-- SUISSE vs UE -->
<div class="ab hd c" style="left:60px;top:170px;width:960px;font-size:86px" data-fx="words" data-at="{t_suisse}" data-st="0.05" data-out="{t_att - 0.15}">Achat en ligne : 14 jours pour renvoyer ?</div>
<div class="card" style="top:470px" data-fx="rise" data-dy="160" data-at="{t_suisse + 0.5}" data-out="{t_att - 0.15}">
  <div class="vs">
    <div><div style="font-size:60px;color:#2f7bff">UE</div><div style="font-size:120px;color:#18a957" data-fx="pop" data-at="{t_euro - 0.3}">✓</div></div>
    <div style="width:4px;height:240px;background:#e6e3ef"></div>
    <div><div style="font-size:60px;color:#ff2d55">SUISSE</div><div style="font-size:120px;color:#ff2d55" data-fx="pop" data-at="{t_suisse + 0.7}">✗</div></div>
  </div>
</div>
<div class="ab hd c" style="left:60px;top:870px;width:960px;font-size:52px" data-fx="rise" data-at="{t_ici}" data-out="{t_att - 0.15}">👉 ça dépend des <span style="color:#ffe14d">conditions du vendeur</span></div>

<!-- GARANTIE -->
<div class="ab c" style="left:0;top:250px;width:1080px;font-size:200px" data-fx="spinin" data-at="{t_att}" data-out="{t_cas - 0.15}">⚠️</div>
<div class="ab hd c" style="left:60px;top:540px;width:960px;font-size:84px" data-fx="words" data-at="{t_att + 0.4}" data-st="0.05" data-out="{t_cas - 0.15}">Article défectueux ?</div>
<div class="ab c" style="left:0;top:700px;width:1080px" data-fx="stamp" data-rot="-3" data-at="{t_gar}" data-out="{t_cas - 0.15}"><span class="chip">= garantie</span></div>

<!-- LE VRAI CAS 14 JOURS -->
<div class="phone" style="left:240px;width:600px;height:690px;top:150px" data-fx="rise" data-dy="300" data-at="{t_cas}" data-out="{t_art - 0.15}">
  <div class="screen"><div class="call">
    <div class="av" style="width:180px;height:180px"></div>
    <div class="who">Vendeur inconnu</div><div class="sub" data-fx="pulse" data-at="{t_cas}">appel entrant…</div>
    <div class="btns"><i style="background:#ff3b30"></i><i style="background:#34c759"></i></div>
  </div></div>
</div>
<div class="ab c" style="left:800px;top:110px;font-size:150px;z-index:7" data-fx="shake" data-at="{t_sonne}" data-out="{t_art - 0.15}">🔔</div>
<div class="ab hd c" style="left:0;top:870px;width:1080px;font-size:120px;color:#ffe14d;z-index:7" data-fx="stamp" data-rot="-4" data-at="{t_cas + 1.2}" data-out="{t_art - 0.15}">14 JOURS ✓</div>
<div class="ab c" style="left:0;top:1010px;width:1080px;font-size:44px;font-weight:800;z-index:7" data-fx="rise" data-at="{t_sans}" data-out="{t_art - 0.15}">non sollicité · plus de 100 CHF</div>

<!-- ARTICLE -->
<div class="ab c" style="left:0;top:520px;width:1080px" data-fx="stamp" data-rot="-3" data-at="{t_art + 0.1}" data-out="{t_avant - 0.15}"><span class="chip">§ Art. 40a ss CO</span></div>

<!-- CTA -->
<div class="ab hd c" style="left:60px;top:280px;width:960px;font-size:82px" data-fx="words" data-at="{t_avant}" data-st="0.05">🛒 Lis les conditions de retour <span style="color:#ffe14d">avant</span> de commander</div>
<div class="ab brand c" style="left:0;top:640px;width:1080px" data-fx="zoom" data-at="{t_thrax}">Thrax <span>Legal</span></div>
<div class="ab c" style="left:0;top:790px;width:1080px;font-size:50px;font-weight:800" data-fx="rise" data-at="{t_thrax + 0.5}">lien en bio ↗</div>

<div class="mwrap" data-fx="rise" data-dy="500" data-at="0.0">{m}</div>
"""


PUNCH = []
SFX = []
TAIL = 1.6
CAP_MAX = 3
