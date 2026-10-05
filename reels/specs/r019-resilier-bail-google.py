"""Reel 019 — Résilier son bail : par écrit, 3 mois, et la signature du conjoint pour le logement de famille
(art. 266c, 266l, 266m, 266o CO). Style (nouveau) : recherche Google en direct (frappe, suggestions, résultats qui se déroulent),
puis 3 règles en cartes. Voix Charline (belge, jamais utilisée)."""
import json

VOICE = "fr-BE-CharlineNeural"
RATE = "+8%"

VO = ("Tu veux quitter ton appart à Fribourg ? Voilà ce que tout le monde tape sur Google. "
      "Et voilà les trois règles que presque personne ne lit. "
      "Un : la résiliation se fait par écrit, avec ta signature. Un simple mail ne suffit pas. "
      "Deux : en général, trois mois à l'avance, pour un terme prévu dans ton bail ou par l'usage local. "
      "Trois, le piège : si tu es marié, et que c'est le logement de la famille, ton conjoint doit aussi donner son accord, par écrit. "
      "Sinon, ta résiliation est nulle. "
      "Articles 266 et suivants du Code des obligations. Enregistre ça avant ton déménagement. Thrax Legal, lien en bio.")

META = {
    "id": "r019-resilier-bail-google",
    "music": "bounce",
    "caption": ("🔎 Tu veux quitter ton appart à Fribourg ? Les 3 règles que presque personne ne lit.\n\n"
                "1️⃣ Le congé d'un bail d'habitation doit être donné par écrit (art. 266l al. 1 CO) : une lettre signée. Un simple e-mail ne remplit pas la forme écrite.\n"
                "2️⃣ Délai : en principe 3 mois, pour le terme fixé par l'usage local ou, à défaut, pour la fin d'un trimestre de bail (art. 266c CO), "
                "sauf si ton contrat prévoit des délais ou termes plus longs.\n"
                "3️⃣ Logement de la famille : un époux (ou partenaire enregistré) ne peut résilier qu'avec le consentement exprès de l'autre (art. 266m CO). "
                "Un congé qui ne respecte pas ces règles est nul (art. 266o CO).\n\n"
                "Bonne nouvelle : tu peux aussi partir avant le terme en présentant un locataire de remplacement (art. 264 CO).\n\n"
                "🔖 Enregistre avant ton déménagement. Une question ? Thrax Legal, lien en bio.\n\n"
                "#bail #demenagement #locataire #resiliation #fribourg #lausanne #genève #suisse #suisseromande"),
    "yt_title": "Résilier son bail en Suisse : les 3 règles que personne ne lit #shorts",
    "tiktok_title": "Quitter ton appart en Suisse : les 3 règles que personne ne lit 🔎",
    "tags": ["résiliation bail", "art. 266m CO", "déménagement", "locataire", "Fribourg"],
    "genome": {"style": "recherche-google-en-direct", "palette": "blanc/bleu Google/jaune", "hook": "identité (tu veux quitter ton appart) + ville",
               "format": "recherche + 3 règles + piège", "topic": "logement/résiliation", "mascot": "aucun (UI de recherche)",
               "voice": "fr-BE-CharlineNeural", "captions": "noir-contour-blanc", "music": "bounce", "length": "~32s"},
    "cover_t": 1.2,
}

CSS = """
#root { background:#fff; color:#202124; }
.g { position:absolute; left:0; right:0; top:150px; text-align:center; font-size:150px; font-weight:800; letter-spacing:-0.04em; }
.g span:nth-child(1){color:#4285f4} .g span:nth-child(2){color:#ea4335} .g span:nth-child(3){color:#fbbc05}
.g span:nth-child(4){color:#4285f4} .g span:nth-child(5){color:#34a853} .g span:nth-child(6){color:#ea4335}
.box { position:absolute; left:70px; right:70px; top:380px; border:3px solid #dfe1e5; border-radius:60px; padding:30px 44px; font-size:48px;
       box-shadow:0 8px 28px rgba(32,33,36,0.18); background:#fff; display:flex; gap:22px; align-items:center; }
.box .q { flex:1; white-space:nowrap; overflow:hidden; }
.sugg { position:absolute; left:70px; right:70px; top:500px; background:#fff; border:3px solid #dfe1e5; border-top:none; border-radius:0 0 40px 40px;
        padding:10px 44px 24px; box-shadow:0 18px 30px rgba(32,33,36,0.15); }
.sugg div { font-size:42px; padding:14px 0; color:#3c4043; }
.sugg b { color:#202124; }
.res { position:absolute; left:70px; right:70px; }
.r { margin-bottom:34px; }
.r .u { font-size:28px; color:#5f6368; }
.r .t { font-size:44px; color:#1a0dab; font-weight:600; }
.r .d { font-size:32px; color:#4d5156; }
.dim { position:absolute; inset:0; background:rgba(255,255,255,0.94); }
.card { position:absolute; left:70px; right:70px; background:#fff; border-radius:40px; padding:36px 44px; box-shadow:0 30px 70px rgba(32,33,36,0.22);
        border-left:18px solid #4285f4; }
.card .n { font-size:46px; font-weight:900; color:#4285f4; }
.card .h { font-size:66px; font-weight:900; letter-spacing:-0.02em; line-height:1.08; margin-top:6px; }
.card .s { font-size:42px; color:#4d5156; margin-top:12px; line-height:1.2; }
.card.warn { border-left-color:#ea4335; } .card.warn .n { color:#ea4335; }
.nul { position:absolute; left:0; right:0; text-align:center; font-size:170px; font-weight:900; color:#ea4335; letter-spacing:-0.04em; }
.chip { display:inline-block; background:#202124; color:#fff; font-size:62px; font-weight:900; border-radius:22px; padding:12px 32px; }
.mid { position:absolute; left:60px; right:60px; text-align:center; display:flex; flex-direction:column; gap:16px; align-items:center; }
.brand { font-size:120px; font-weight:900; letter-spacing:-0.05em; }
.brand span { color:#4285f4; }
.cap { top: 1500px; font-size: 76px; color:#202124; }
.cap .cw { color:#202124; -webkit-text-stroke: 14px #fff; }
.cap .cw.now { color:#4285f4; }
"""


def body(w):
    T = {k: w.a(p) for k, p in {
        "quitter": "Tu veux quitter", "voila": "Voilà ce que", "regles": "Et voilà les trois", "un": "Un :", "mail": "Un simple mail",
        "deux": "Deux :", "trois": "Trois, le piège", "marie": "si tu es marié,", "conjoint": "ton conjoint", "sinon": "Sinon,",
        "art": "Articles", "enregistre": "Enregistre", "thrax": "Thrax Legal,"}.items()}
    T["total"] = w.total
    globals()["PUNCH"] = [T["regles"], T["trois"], T["sinon"]]
    O = lambda a, b: f'data-at="{a:.3f}" data-out="{b - 0.2:.3f}"'
    return f"""
<div data-fx="fade" data-d="0.15" data-at="-1" data-out="{T['un'] - 0.2:.3f}">
  <div class="g"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></div>
  <div class="box">🔍 <div class="q" data-fx="type" data-at="0.05" data-cps="22">comment résilier mon bail fribourg</div></div>
  <div class="sugg" data-fx="fade" data-d="0.15" {O(T['voila'] - 0.4, T['regles'])}>
    <div>🔍 comment résilier mon bail <b>fribourg délai</b></div>
    <div>🔍 comment résilier mon bail <b>par mail</b></div>
    <div>🔍 comment résilier mon bail <b>avant la fin</b></div>
  </div>
  <div class="res" style="top:540px" data-fx="rise" data-at="{T['regles']:.3f}">
    <div class="r"><div class="u">forum-logement.ch › résiliation</div><div class="t">Résilier son bail : un mail suffit ?</div><div class="d">« Moi j'ai envoyé un mail et… »</div></div>
    <div class="r"><div class="u">questions-locataires.ch</div><div class="t">Combien de temps à l'avance ?</div><div class="d">Ça dépend… </div></div>
    <div class="r"><div class="u">avis-et-conseils.ch</div><div class="t">Résiliation : les erreurs fréquentes</div><div class="d">Publié il y a 6 ans</div></div>
  </div>
</div>
<div class="dim" data-fx="fade" data-d="0.2" data-at="{T['un'] - 0.25:.3f}"></div>
<div class="card" style="top:180px" data-fx="drop" {O(T['un'], T['art'])}>
  <div class="n">1 · LA FORME</div><div class="h">Par écrit, signé ✍️</div>
  <div class="s" data-fx="rise" data-at="{T['mail']:.3f}">❌ un simple mail ne suffit pas</div>
</div>
<div class="card" style="top:560px" data-fx="drop" {O(T['deux'], T['art'])}>
  <div class="n">2 · LE DÉLAI</div><div class="h">3 mois à l'avance 📅</div>
  <div class="s">pour un terme du bail ou de l'usage local</div>
</div>
<div class="card warn" style="top:940px" data-fx="drop" {O(T['trois'], T['art'])}>
  <div class="n">3 · LE PIÈGE</div><div class="h">Marié ? Logement de la famille 👨‍👩‍👧</div>
  <div class="s" data-fx="rise" data-at="{T['conjoint']:.3f}">→ accord écrit du conjoint aussi</div>
</div>
<div class="nul" style="top:1225px" data-fx="stamp" data-rot="-6" {O(T['sinon'], T['art'])}>NULLE</div>
<div class="dim" data-fx="fade" data-d="0.2" data-at="{T['art'] - 0.2:.3f}"></div>
<div class="mid" style="top:600px" data-fx="stamp" data-rot="-3" {O(T['art'], T['enregistre'])}>
  <div class="chip">Art. 266c · 266l · 266m CO</div></div>
<div class="mid" style="top:520px" data-fx="drop" data-at="{T['enregistre']:.3f}">
  <div style="font-size:60px;font-weight:900">🔖 Enregistre avant ton déménagement</div>
  <div class="brand" data-fx="zoom" data-at="{T['thrax']:.3f}">Thrax <span>Legal</span></div>
</div>
"""


PUNCH = []
SFX = []
TAIL = 1.6
CAP_MAX = 3
