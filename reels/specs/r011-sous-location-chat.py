"""Reel 011 — Sous-louer sa chambre sur Airbnb (art. 262 CO). Style : POV écran de téléphone, groupe WhatsApp de colocs
(conversation fictive), messages qui arrivent en direct, puis la règle en surimpression."""
import json

VOICE = "fr-FR-VivienneMultilingualNeural"
RATE = "+10%"

VO = ("Lausanne, groupe des colocs. Léo écrit : je sous-loue ma chambre sur Airbnb pendant mes trois semaines au Portugal. "
      "Mia répond : t'as demandé au proprio ? Léo : pas besoin, c'est ma chambre. "
      "Erreur. En Suisse, pour sous-louer, il faut l'accord du bailleur. "
      "Mais voilà le twist : ton bailleur ne peut refuser que dans trois cas. "
      "Un : tu refuses de lui dire les conditions. "
      "Deux : les conditions sont abusives, par exemple si tu demandes bien plus cher que ton propre loyer. "
      "Trois : la sous-location lui cause de gros inconvénients. Sinon, il doit dire oui. "
      "Mais sans son accord, tu risques gros, jusqu'à la résiliation du bail dans certains cas. "
      "Article 262 du Code des obligations. Envoie ça à ton coloc. Thrax Legal, lien en bio.")

META = {
    "id": "r011-sous-location-chat",
    "music": "lofi",
    "caption": ("Sous-louer ta chambre sur Airbnb à Lausanne sans demander au proprio ? 📱 (conversation fictive)\n\n"
                "En Suisse, tu peux sous-louer tout ou partie de ton logement, mais avec le consentement du bailleur (art. 262 al. 1 CO). "
                "Il ne peut refuser que si : tu refuses de lui communiquer les conditions ; les conditions sont abusives par rapport "
                "à ton propre bail ; ou la sous-location lui cause des inconvénients majeurs (art. 262 al. 2 CO).\n\n"
                "Sous-louer sans demander peut, dans certains cas, mener à une résiliation du bail. Tu restes aussi responsable "
                "de l'usage que fait ton sous-locataire (art. 262 al. 3 CO).\n\n"
                "📤 Envoie ça à ton coloc. Une question sur ton bail ? Thrax Legal, lien en bio.\n\n"
                "#souslocation #airbnb #colocation #locataire #lausanne #genève #suisse #suisseromande #bail"),
    "yt_title": "Sous-louer sur Airbnb sans l'accord du proprio en Suisse ? Erreur #shorts",
    "tiktok_title": "Sous-louer ta chambre sur Airbnb sans demander au proprio ? (Suisse)",
    "tags": ["sous-location", "Airbnb", "art. 262 CO", "colocation", "Lausanne"],
    "genome": {"style": "pov-ecran-telephone-chat", "palette": "whatsapp-sombre/vert/jaune", "hook": "ville + message choc",
               "format": "conversation-fictive + regle-3-cas", "topic": "logement/sous-location", "mascot": "aucun (chat)",
               "voice": "fr-FR-VivienneMultilingualNeural", "captions": "blanc-contour", "music": "lofi", "length": "~40s"},
    "cover_t": 3.0,
}

CSS = """
#root { background: radial-gradient(ellipse at 50% 30%, #1d3b34 0%, #0b1614 60%, #050a09 100%); }
.phone { position:absolute; left:80px; top:110px; width:920px; height:1260px; border-radius:70px; background:#0b141a; border:14px solid #222c31;
         box-shadow: 0 50px 120px rgba(0,0,0,0.6); overflow:hidden; }
.bar { position:absolute; left:0; right:0; top:0; height:150px; background:#1f2c33; display:flex; align-items:center; gap:24px; padding:30px 34px 0; color:#e9edef; }
.bar i { width:78px; height:78px; border-radius:50%; background:#2a7d6b; display:flex; align-items:center; justify-content:center; font-style:normal; font-size:42px; }
.bar b { font-size:40px; font-weight:800; display:block; }
.bar small { font-size:26px; color:#8696a0; font-weight:600; }
.feed { position:absolute; left:0; right:0; top:170px; bottom:0; padding:0 30px; }
.m { position:absolute; max-width:700px; padding:20px 28px 12px; border-radius:28px; font-size:50px; font-weight:600; line-height:1.22; color:#e9edef; }
.m.in { left:30px; background:#202c33; border-top-left-radius:6px; }
.m.out { right:30px; background:#005c4b; border-top-right-radius:6px; }
.m u { display:block; text-decoration:none; font-size:30px; font-weight:800; margin-bottom:4px; }
.m em { display:block; text-align:right; font-style:normal; font-size:22px; color:#8696a0; margin-top:4px; }
.typing { position:absolute; left:30px; background:#202c33; border-radius:26px; padding:20px 30px; font-size:40px; color:#8696a0; letter-spacing:6px; }
.over { position:absolute; left:60px; right:60px; display:flex; flex-direction:column; align-items:center; text-align:center; gap:14px; color:#fff; }
.over .v { font-size:150px; font-weight:900; letter-spacing:-0.04em; line-height:1; }
.over .s { font-size:62px; font-weight:800; line-height:1.15; }
.err { color:#ff4d5e; }
.dim { position:absolute; left:80px; top:110px; width:920px; height:1260px; border-radius:70px; background:rgba(5,10,9,0.95); }
.panel { position:absolute; left:110px; right:110px; top:330px; background:#fff; color:#111; border-radius:44px; padding:40px 44px; box-shadow:0 40px 90px rgba(0,0,0,0.5); }
.panel h3 { font-size:54px; font-weight:900; letter-spacing:-0.03em; margin-bottom:22px; }
.row { display:flex; gap:22px; align-items:flex-start; font-size:50px; font-weight:700; line-height:1.18; margin:20px 0; }
.row b { flex:none; width:64px; height:64px; border-radius:50%; background:#16a34a; color:#fff; display:flex; align-items:center; justify-content:center; font-size:38px; }
.fict { position:absolute; left:0; right:0; top:40px; text-align:center; }
.fict span { font-size:28px; font-weight:700; color:rgba(255,255,255,0.75); border:2px dashed rgba(255,255,255,0.4); border-radius:12px; padding:6px 16px; }
.chip { display:inline-block; background:#fff; color:#111; font-size:80px; font-weight:900; border-radius:24px; padding:12px 36px; }
.brand { font-size:120px; font-weight:900; letter-spacing:-0.05em; color:#fff; }
.brand span { color:#25d366; }
.cap { top: 1430px; font-size: 76px; }
.cap .cw.now { color:#25d366; }
"""


def body(w):
    T = {k: w.a(p) for k, p in {
        "groupe": "groupe des colocs.", "leo": "Léo écrit", "mia": "Mia répond", "leo2": "Léo : pas besoin",
        "erreur": "Erreur.", "suisse": "En Suisse,", "twist": "Mais voilà le twist", "trois": "que dans trois cas.",
        "un": "Un :", "deux": "Deux :", "cher": "bien plus cher", "c3": "Trois :", "sinon": "Sinon,",
        "risques": "tu risques gros", "art": "Article 262", "envoie": "Envoie ça", "thrax": "Thrax Legal,"}.items()}
    globals()["PUNCH"] = [T["erreur"], T["twist"]]
    P = lambda a, b=None: f'data-fx="pop" data-at="{a:.3f}"' + (f' data-out="{b - 0.25:.3f}"' if b else "")
    end_chat = T["erreur"]
    return f"""
<div class="fict" data-fx="fade" data-at="0" data-out="{T['art'] - 0.2:.3f}"><span>Conversation fictive</span></div>
<div class="phone" data-fx="rise" data-at="0" data-out="{T['twist'] - 0.2:.3f}">
  <div class="bar"><i>🏠</i><div><b>Coloc Lausanne 🔑</b><small>Léo, Mia, Sami, toi</small></div></div>
  <div class="feed">
    <div class="typing" style="top:30px" data-fx="fade" data-d="0.1" data-at="{T['groupe']:.3f}" data-out="{T['leo'] + 0.2:.3f}">• • •</div>
    <div class="m in" style="top:30px" {P(T['leo'] + 0.3)}><u style="color:#53bdeb">Léo</u>je sous-loue ma chambre sur Airbnb pendant mes 3 semaines au Portugal 😎🇵🇹<em>19:02</em></div>
    <div class="m in" style="top:400px" {P(T['mia'] + 0.2)}><u style="color:#f5a623">Mia</u>t'as demandé au proprio ? 🤨<em>19:03</em></div>
    <div class="m in" style="top:640px" {P(T['leo2'] + 0.1)}><u style="color:#53bdeb">Léo</u>pas besoin c'est MA chambre 💅<em>19:03</em></div>
    <div class="m out" style="top:890px" {P(T['erreur'] + 0.1)}>euh… 😬<em>19:04 ✓✓</em></div>
  </div>
</div>
<div class="dim" data-fx="fade" data-d="0.2" data-at="{end_chat + 0.35:.3f}" data-out="{T['twist'] - 0.2:.3f}"></div>
<div class="over" style="top:470px" data-fx="stamp" data-rot="-6" data-at="{end_chat + 0.35:.3f}" data-out="{T['twist'] - 0.2:.3f}"><div class="v err">ERREUR.</div></div>
<div class="over" style="top:680px" data-fx="rise" data-at="{T['suisse']:.3f}" data-out="{T['twist'] - 0.2:.3f}"><div class="s">🇨🇭 Sous-louer = <span style="color:#25d366">accord du bailleur</span></div></div>

<div class="over" style="top:150px" data-fx="rise" data-at="{T['twist']:.3f}" data-out="{T['art'] - 0.25:.3f}">
  <div class="s">Le twist 🔄</div>
  <div class="v" style="font-size:84px">Il ne peut refuser<br>que dans <span style="color:#25d366">3 cas</span></div>
</div>
<div class="panel" style="top:520px" data-fx="pop" data-at="{T['un'] - 0.1:.3f}" data-out="{T['risques'] - 0.25:.3f}">
  <div class="row" data-fx="rise" data-at="{T['un']:.3f}"><b>1</b>tu refuses de lui dire les conditions</div>
  <div class="row" data-fx="rise" data-at="{T['deux']:.3f}"><b>2</b><span>conditions abusives <span style="color:#6b7280">(ex. bien plus cher que ton loyer 💸)</span></span></div>
  <div class="row" data-fx="rise" data-at="{T['c3']:.3f}"><b>3</b>gros inconvénients pour lui</div>
  <div class="row" data-fx="pop" data-at="{T['sinon']:.3f}" style="justify-content:center;font-size:56px;font-weight:900;color:#16a34a">Sinon → il doit dire OUI ✅</div>
</div>
<div class="over" style="top:640px" data-fx="stamp" data-rot="-4" data-at="{T['risques']:.3f}" data-out="{T['art'] - 0.25:.3f}">
  <div class="v err" style="font-size:96px">Sans accord ⚠️</div>
  <div class="s">risque de résiliation du bail<br><span style="font-size:40px;opacity:0.8">dans certains cas</span></div>
</div>
<div class="over" style="top:560px" data-fx="stamp" data-rot="-3" data-at="{T['art']:.3f}" data-out="{T['envoie'] - 0.25:.3f}">
  <div class="chip">Art. 262 CO</div><div class="s" style="font-size:42px">Code des obligations</div>
</div>
<div class="over" style="top:420px" data-fx="rise" data-at="{T['envoie']:.3f}">
  <div class="s">📤 Envoie ça à ton coloc</div>
  <div class="brand" data-fx="zoom" data-at="{T['thrax']:.3f}">Thrax <span>Legal</span></div>
</div>
"""


PUNCH = []
SFX = []
TAIL = 1.6
CAP_MAX = 3
