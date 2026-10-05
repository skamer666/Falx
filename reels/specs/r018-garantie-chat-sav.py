"""Reel 018 — Garantie : 2 ans… sauf si elle est exclue (art. 210 et 199 CO). Style : mutation du format « chat » (meilleure
rétention, r011) : conversation fictive avec un service client, en mode clair (iMessage), puis la règle en surimpression. Voix Vivienne."""
import json

VOICE = "fr-FR-VivienneMultilingualNeural"
RATE = "+10%"

VO = ("Ton téléphone meurt après quatorze mois, à Lausanne. Tu écris au magasin. Réponse : désolé, garantie un an. "
      "Tu réponds : en Suisse, c'est deux ans ! Et là, le magasin a peut-être raison. "
      "Oui, la garantie légale dure deux ans pour un objet neuf. "
      "Mais voilà le piège : le vendeur peut l'exclure complètement dans ses conditions générales, "
      "et la remplacer par sa propre garantie, souvent d'un an. "
      "Donc avant d'acheter, cherche la ligne garantie dans les conditions. "
      "Et si elle n'est pas exclue, signale le défaut tout de suite, par écrit. "
      "Article 210, et article 199, du Code des obligations. Envoie ça à quelqu'un qui va acheter un téléphone. Thrax Legal, lien en bio.")

META = {
    "id": "r018-garantie-chat-sav",
    "music": "lofi",
    "caption": ("📱 Ton téléphone lâche après 14 mois et le magasin te répond « garantie 1 an » ? (conversation fictive)\n\n"
                "En Suisse, l'action en garantie pour les défauts se prescrit en principe par 2 ans ; pour un objet neuf vendu à un consommateur "
                "par un professionnel, ce délai ne peut pas être raccourci (art. 210 al. 1 et 4 CO).\n\n"
                "Mais la garantie légale peut être exclue par contrat, par exemple dans les conditions générales, sauf si le vendeur a "
                "frauduleusement caché le défaut (art. 199 CO). Beaucoup de vendeurs la remplacent par leur propre garantie.\n\n"
                "✅ Avant d'acheter : lis la clause « garantie ». Si elle n'est pas exclue, signale le défaut immédiatement, par écrit (art. 201 CO).\n\n"
                "📤 Envoie ça à quelqu'un qui va acheter un téléphone. Une question ? Thrax Legal, lien en bio.\n\n"
                "#garantie #smartphone #achat #consommateur #lausanne #genève #suisse #suisseromande #lesaviezvous"),
    "yt_title": "Garantie 2 ans en Suisse ? Le piège des conditions générales #shorts",
    "tiktok_title": "Garantie 2 ans en Suisse ? Pas toujours 😬",
    "tags": ["garantie", "art. 210 CO", "art. 199 CO", "consommateur", "Lausanne"],
    "genome": {"style": "pov-chat-imessage-clair", "palette": "blanc/bleu iMessage/rouge", "hook": "ville + objet cassé + réponse du magasin",
               "format": "conversation-fictive + piege + check-list", "topic": "consommation/garantie", "mascot": "aucun (chat)",
               "voice": "fr-FR-VivienneMultilingualNeural", "captions": "noir-contour-blanc", "music": "lofi", "length": "~33s"},
    "cover_t": 2.6,
}

CSS = """
#root { background: linear-gradient(#e9eef6, #cfd8e6); color:#111; }
.phone { position:absolute; left:80px; top:110px; width:920px; height:1270px; border-radius:72px; background:#fff; border:14px solid #1d1d1f;
         box-shadow: 0 50px 120px rgba(20,30,60,0.35); overflow:hidden; }
.bar { position:absolute; left:0; right:0; top:0; height:170px; background:#f6f6f8; border-bottom:2px solid #e5e5ea; display:flex; flex-direction:column;
       align-items:center; justify-content:flex-end; padding-bottom:16px; gap:6px; }
.bar i { width:84px; height:84px; border-radius:50%; background:linear-gradient(#8e9ab0,#5d6a82); color:#fff; font-style:normal; font-size:40px;
         display:flex; align-items:center; justify-content:center; font-weight:800; }
.bar b { font-size:32px; font-weight:700; }
.m { position:absolute; max-width:680px; padding:22px 30px; border-radius:38px; font-size:50px; font-weight:600; line-height:1.22; }
.m.in { left:28px; background:#e9e9eb; color:#111; }
.m.out { right:28px; background:#0a84ff; color:#fff; }
.typing { position:absolute; left:28px; background:#e9e9eb; border-radius:30px; padding:20px 30px; font-size:44px; color:#8e8e93; letter-spacing:6px; }
.dim { position:absolute; left:80px; top:110px; width:920px; height:1270px; border-radius:72px; background:rgba(255,255,255,0.93); }
.over { position:absolute; left:60px; right:60px; display:flex; flex-direction:column; align-items:center; text-align:center; gap:16px; }
.v { font-size:132px; font-weight:900; letter-spacing:-0.045em; line-height:0.95; }
.s { font-size:60px; font-weight:800; line-height:1.14; }
.red { color:#e11d48; } .blue { color:#0a84ff; } .grn { color:#16a34a; }
.doc { background:#fff; border:3px solid #d1d5db; border-radius:26px; padding:28px 34px; width:820px; text-align:left; box-shadow:0 30px 70px rgba(0,0,0,0.15); }
.doc .h { font-size:34px; font-weight:800; color:#6b7280; letter-spacing:0.06em; }
.doc .l { height:16px; background:#e5e7eb; border-radius:8px; margin:14px 0; }
.doc .k { font-size:44px; font-weight:800; background:#fef08a; padding:6px 12px; border-radius:10px; display:inline-block; }
.row { display:flex; gap:22px; align-items:center; font-size:52px; font-weight:800; text-align:left; }
.row b { flex:none; width:72px; height:72px; border-radius:50%; background:#0a84ff; color:#fff; display:flex; align-items:center; justify-content:center; font-size:40px; }
.fict { position:absolute; left:0; right:0; top:40px; text-align:center; }
.fict span { font-size:28px; font-weight:700; color:#4b5563; border:2px dashed #9ca3af; border-radius:12px; padding:6px 16px; background:rgba(255,255,255,0.7); }
.chip { display:inline-block; background:#111; color:#fff; font-size:70px; font-weight:900; border-radius:22px; padding:12px 34px; }
.brand { font-size:120px; font-weight:900; letter-spacing:-0.05em; }
.brand span { color:#0a84ff; }
.cap { top: 1450px; font-size: 76px; color:#111; }
.cap .cw { color:#111; -webkit-text-stroke: 14px #fff; }
.cap .cw.now { color:#0a84ff; }
"""


def body(w):
    T = {k: w.a(p) for k, p in {
        "meurt": "meurt après", "ecris": "Tu écris", "reponse": "Réponse :", "repond": "Tu réponds", "raison": "a peut-être raison.",
        "oui": "Oui, la garantie", "piege": "Mais voilà le piège", "exclure": "l'exclure complètement", "remplacer": "et la remplacer",
        "avant": "Donc avant d'acheter,", "pas": "Et si elle", "signale": "signale le défaut", "art": "Article 210,", "envoie": "Envoie ça",
        "thrax": "Thrax Legal,"}.items()}
    globals()["PUNCH"] = [T["raison"], T["piege"]]
    P = lambda a: f'data-fx="pop" data-at="{a:.3f}"'
    O = lambda a, b: f'data-at="{a:.3f}" data-out="{b - 0.2:.3f}"'
    return f"""
<div class="fict" data-fx="fade" data-at="0" data-out="{T['art'] - 0.2:.3f}"><span>Conversation fictive</span></div>
<div class="phone" data-fx="rise" data-at="0" data-out="{T['oui'] - 0.2:.3f}">
  <div class="bar"><i>📱</i><b>Service client · MediaShop</b></div>
  <div class="m out" style="top:200px" {P(0.35)}>Mon téléphone ne s'allume plus 😩 acheté il y a 14 mois</div>
  <div class="typing" style="top:430px" data-fx="fade" data-d="0.1" data-at="{T['ecris'] + 0.6:.3f}" data-out="{T['reponse']:.3f}">• • •</div>
  <div class="m in" style="top:430px" {P(T['reponse'] + 0.1)}>Désolé, la garantie est d'1 an 🙏</div>
  <div class="m out" style="top:620px" {P(T['repond'] + 0.1)}>En Suisse c'est 2 ans !! 😤</div>
  <div class="typing" style="top:850px" data-fx="fade" data-d="0.1" data-at="{T['repond'] + 1.4:.3f}" data-out="{T['oui'] - 0.2:.3f}">• • •</div>
</div>
<div class="dim" data-fx="fade" data-d="0.2" {O(T['raison'], T['oui'])}></div>
<div class="over" style="top:520px" data-fx="stamp" data-rot="-5" {O(T['raison'], T['oui'])}><div class="v">Pas si vite…</div></div>

<div class="over" style="top:220px" data-fx="drop" {O(T['oui'], T['avant'])}>
  <div class="s">✅ Garantie légale :</div>
  <div class="v blue">2 ans</div>
  <div class="s" style="font-size:44px;color:#4b5563">pour un objet neuf</div>
  <div class="v red" style="font-size:96px" data-fx="stamp" data-rot="-4" data-at="{T['piege']:.3f}">LE PIÈGE ⚠️</div>
  <div class="doc" data-fx="rise" data-at="{T['exclure']:.3f}">
    <div class="h">CONDITIONS GÉNÉRALES</div><div class="l"></div><div class="l" style="width:70%"></div>
    <div class="k">« La garantie légale est exclue. »</div>
    <div class="l" style="width:85%"></div>
    <div class="s" style="font-size:42px;margin-top:10px" data-fx="rise" data-at="{T['remplacer']:.3f}">→ remplacée par « notre garantie 1 an »</div>
  </div>
</div>
<div class="over" style="top:300px" data-fx="drop" {O(T['avant'], T['art'])}>
  <div class="s">Avant d'acheter :</div>
  <div class="row" data-fx="rise" data-at="{T['avant'] + 0.3:.3f}"><b>1</b>lis la ligne « garantie » 🔍</div>
  <div class="row" data-fx="rise" data-at="{T['signale']:.3f}"><b>2</b>défaut ? signale-le tout de suite, par écrit ✍️</div>
</div>
<div class="over" style="top:560px" data-fx="stamp" data-rot="-3" {O(T['art'], T['envoie'])}>
  <div class="chip">Art. 210 + 199 CO</div><div class="s" style="font-size:42px">Code des obligations</div>
</div>
<div class="over" style="top:420px" data-fx="rise" data-at="{T['envoie']:.3f}">
  <div class="s">📤 Envoie ça à quelqu'un qui va acheter un téléphone</div>
  <div class="brand" data-fx="zoom" data-at="{T['thrax']:.3f}">Thrax <span>Legal</span></div>
</div>
"""


PUNCH = []
SFX = []
TAIL = 1.6
CAP_MAX = 3
