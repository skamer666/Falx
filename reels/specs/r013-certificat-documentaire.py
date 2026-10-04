"""Reel 013 — Certificat de travail (art. 330a CO). Style : documentaire animalier (parodie), savane de bureaux au lever du
soleil, bandes cinéma, notes de terrain manuscrites, noms latins, voix de documentaire belge (jamais utilisée)."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import mascot

VOICE = "fr-BE-GerardNeural"
RATE = "+8%"

VO = ("Genève, open space, huit heures du matin. Ici vit une espèce fascinante : le salarié qui veut partir. "
      "Pour survivre, il a besoin d'un certificat de travail. Mais son patron, prédateur rusé, fait semblant d'oublier. Observez bien. "
      "En Suisse, le salarié peut exiger un certificat à tout moment, pas seulement à la fin. "
      "Ce certificat parle de son poste, de la durée, mais aussi de la qualité de son travail et de sa conduite. "
      "Et voici sa technique de survie la plus rare : si le certificat complet risque de lui nuire, "
      "il peut demander une simple attestation, avec seulement le poste et la durée. "
      "Article 330a du Code des obligations. Envoie ça à un collègue en pleine migration. Thrax Legal, lien en bio.")

META = {
    "id": "r013-certificat-documentaire",
    "music": "epic",
    "caption": ("🦁 Documentaire : le salarié genevois et son certificat de travail.\n\n"
                "En Suisse, le travailleur peut demander en tout temps un certificat portant sur la nature et la durée des rapports "
                "de travail, ainsi que sur la qualité de son travail et sa conduite (art. 330a al. 1 CO). "
                "À sa demande expresse, le certificat ne porte que sur la nature et la durée des rapports de travail (art. 330a al. 2 CO).\n\n"
                "En tout temps = aussi pendant le contrat, pas seulement à la fin.\n\n"
                "📤 Envoie ça à un collègue en pleine migration. Une question ? Thrax Legal, lien en bio.\n\n"
                "#certificatdetravail #travail #emploi #genève #lausanne #suisse #suisseromande #droitdutravail #documentaire"),
    "yt_title": "Ton patron « oublie » ton certificat de travail ? Ce que dit la loi suisse #shorts",
    "tiktok_title": "Documentaire : le salarié genevois et son certificat de travail",
    "tags": ["certificat de travail", "art. 330a CO", "droit du travail suisse", "emploi", "Genève"],
    "genome": {"style": "documentaire-animalier-parodie", "palette": "savane-orange/sepia", "hook": "ville + voix documentaire",
               "format": "narration-parodique + regle", "topic": "travail/certificat", "mascot": "salarie-warm + patron-charcoal (animaux)",
               "voice": "fr-BE-GerardNeural", "captions": "serif-documentaire", "music": "epic", "length": "~40s"},
    "cover_t": 2.0,
}

CSS = """
#root { background:#1b0f05; }
.sky { position:absolute; inset:0; background: linear-gradient(#2b1a3d 0%, #b8462a 38%, #f2a23a 58%, #f6d27a 70%, #c98a3e 71%, #8a5a2a 100%); }
.sun { position:absolute; left:340px; top:760px; width:400px; height:400px; border-radius:50%; background: radial-gradient(circle, #fff3c4 0%, #ffd36b 45%, rgba(255,180,60,0) 70%); }
.sil { position:absolute; left:0; right:0; top:900px; height:420px; }
.lb { position:absolute; left:0; right:0; height:190px; background:#000; z-index:80; }
.doc { position:absolute; left:60px; z-index:81; color:#f3e3c3; font-family: "Playfair Display", serif; letter-spacing:0.18em; font-size:34px; text-transform:uppercase; }
.note { position:absolute; font-family:"Caveat", cursive; font-weight:700; color:#fff8e6; text-shadow: 0 3px 10px rgba(0,0,0,0.6); }
.latin { font-family: "Playfair Display", serif; font-style:italic; color:#fff3d6; text-shadow: 0 3px 12px rgba(0,0,0,0.7); }
.card { position:absolute; left:80px; right:80px; background:#f6ecd4; color:#2a1d0e; border-radius:10px; padding:34px 44px; box-shadow:0 30px 70px rgba(0,0,0,0.5); transform: rotate(-2deg); z-index:30; }
.card h3 { font-family: "Playfair Display", serif; font-size:70px; font-weight:700; letter-spacing:0.02em; margin-bottom:16px; }
.card .li { font-size:58px; font-weight:700; margin:10px 0; display:flex; gap:16px; align-items:center; }
.card .li s { opacity:0.45; }
.ok { color:#15803d; } .no { color:#b91c1c; }
.bino { position:absolute; inset:0; z-index:60; pointer-events:none;
        background: radial-gradient(circle at 34% 50%, transparent 0 290px, rgba(0,0,0,0.92) 300px), radial-gradient(circle at 66% 50%, transparent 0 290px, rgba(0,0,0,0.92) 300px);
        background-blend-mode: multiply; }
.chip { display:inline-block; background:#2a1d0e; color:#f6ecd4; font-family: "Playfair Display", serif; font-size:76px; font-weight:700; border-radius:16px; padding:14px 36px; }
.ttl { position:absolute; left:60px; right:60px; text-align:center; z-index:40; }
.brand { font-size:120px; font-weight:900; letter-spacing:-0.05em; color:#fff8e6; text-shadow:0 6px 30px rgba(0,0,0,0.5); }
.brand span { color:#ffb347; }
.cap { top: 1470px; font-size: 70px; z-index:85; }
.cap .cw { color:#fff8e6; -webkit-text-stroke: 12px #1b0f05; font-family: "Playfair Display", serif; font-weight:700; letter-spacing:0; }
.cap .cw.now { color:#ffb347; transform:none; }
"""


def savanna():
    # Acacia trees made of desks and monitors, as silhouettes.
    t = []
    for x, s in [(60, 1.0), (760, 1.2), (430, 0.7)]:
        t.append(f'<g transform="translate({x} 0) scale({s})" fill="#2b1608">'
                 f'<rect x="120" y="120" width="18" height="300"/><path d="M0 130 Q130 40 260 130 Q130 100 0 130 Z"/>'
                 f'<rect x="40" y="70" width="70" height="46" rx="6"/><rect x="150" y="60" width="80" height="54" rx="6"/></g>')
    t.append('<rect x="0" y="330" width="1080" height="120" fill="#2b1608"/>')
    t.append('<g fill="#2b1608"><rect x="300" y="280" width="200" height="16"/><rect x="320" y="296" width="12" height="40"/><rect x="470" y="296" width="12" height="40"/>'
             '<rect x="360" y="230" width="80" height="50" rx="6"/></g>')
    return '<svg class="sil" viewBox="0 0 1080 420" width="1080" height="420" preserveAspectRatio="none">' + "".join(t) + "</svg>"


def body(w):
    T = {k: w.a(p) for k, p in {
        "espece": "une espèce fascinante", "salarie": "le salarié qui veut partir.", "survivre": "Pour survivre,",
        "patron": "Mais son patron,", "oublier": "fait semblant d'oublier.", "observez": "Observez bien.", "suisse": "En Suisse,",
        "moment": "à tout moment,", "fin": "pas seulement à la fin.", "parle": "Ce certificat parle", "duree": "de la durée,",
        "qualite": "la qualité", "conduite": "et de sa conduite.", "technique": "Et voici sa technique", "nuire": "risque de lui nuire,",
        "attest": "une simple attestation,", "seulement": "avec seulement", "art": "Article 330a", "envoie": "Envoie ça", "thrax": "Thrax Legal,"}.items()}
    globals()["PUNCH"] = [T["patron"], T["technique"]]
    O = lambda a, b: f'data-at="{a:.3f}" data-out="{b - 0.25:.3f}"'
    sal = mascot.svg("m13s", "warm", w=520)
    pat = mascot.svg("m13p", "charcoal", w=560)
    return f"""
<div class="sky"></div><div class="sun" data-fx="rise" data-dy="200" data-d="2" data-at="0"></div>
{savanna()}
<div class="lb" style="top:0"></div><div class="lb" style="bottom:0"></div>
<div class="doc" style="top:120px" data-fx="fade" data-at="0.2" data-out="{T['suisse'] - 0.25:.3f}">Genève · open space · 08:00</div>
<div class="doc" style="top:120px;right:60px;left:auto" data-fx="fade" data-at="0.2">● Cam 2</div>

<div style="position:absolute;left:60px;top:470px" data-fx="rise" data-dx="-500" {O(T['espece'], T['suisse'])}>{sal}</div>
<div class="note" style="left:60px;top:240px;font-size:80px;white-space:nowrap" data-fx="rise" {O(T['salarie'], T['survivre'])}>↓ le salarié qui veut partir</div>
<div class="latin" style="position:absolute;left:60px;top:350px;font-size:46px" data-fx="fade" {O(T['salarie'] + 0.4, T['survivre'])}>(Homo officius fugitivus)</div>

<div class="card" style="top:250px;transform:rotate(3deg)" data-fx="drop" {O(T['survivre'], T['patron'])}><h3>📜 Certificat de travail</h3><div class="li">ressource vitale pour survivre</div></div>
<div style="position:absolute;left:520px;top:420px" data-fx="rise" data-dx="600" {O(T['patron'], T['suisse'])}>{pat}</div>
<div class="note" style="left:60px;top:240px;font-size:78px" data-fx="rise" {O(T['patron'] + 0.2, T['suisse'])}>le patron, prédateur rusé 🦁</div>
<div class="latin" style="position:absolute;left:60px;top:345px;font-size:46px" data-fx="fade" {O(T['oublier'], T['suisse'])}>(Patronus oublius)</div>
<div class="bino" data-fx="fade" data-d="0.2" {O(T['observez'], T['suisse'] + 0.2)}></div>

<div class="card" style="top:280px" data-fx="drop" {O(T['suisse'], T['parle'])}>
  <h3>🇨🇭 Note de terrain n°1</h3>
  <div class="li">il peut exiger un certificat</div>
  <div class="li ok" data-fx="stamp" data-rot="-3" data-at="{T['moment']:.3f}" style="font-size:64px;font-weight:900">À TOUT MOMENT</div>
  <div class="li" data-fx="rise" data-at="{T['fin']:.3f}">pas seulement à la fin</div>
</div>

<div class="card" style="top:250px" data-fx="drop" {O(T['parle'], T['technique'])}>
  <h3>📜 Certificat complet</h3>
  <div class="li" data-fx="rise" data-at="{T['parle'] + 0.5:.3f}"><span class="ok">✓</span> son poste</div>
  <div class="li" data-fx="rise" data-at="{T['duree']:.3f}"><span class="ok">✓</span> la durée</div>
  <div class="li" data-fx="rise" data-at="{T['qualite']:.3f}"><span class="ok">✓</span> la qualité du travail</div>
  <div class="li" data-fx="rise" data-at="{T['conduite']:.3f}"><span class="ok">✓</span> sa conduite</div>
</div>

<div class="ttl" style="top:230px" data-fx="rise" {O(T['technique'], T['art'])}><div class="note" style="position:static;font-size:92px">technique de survie rarissime 🦎</div></div>
<div class="card" style="top:420px;transform:rotate(-3deg)" data-fx="drop" {O(T['attest'] - 0.2, T['art'])}>
  <h3>📄 Simple attestation</h3>
  <div class="li"><span class="ok">✓</span> le poste</div>
  <div class="li"><span class="ok">✓</span> la durée</div>
  <div class="li no" data-fx="fade" data-at="{T['seulement']:.3f}"><span>✗</span><s>qualité, conduite</s></div>
</div>

<div class="ttl" style="top:560px" data-fx="stamp" data-rot="-3" {O(T['art'], T['envoie'])}><span class="chip">Art. 330a CO</span></div>
<div class="ttl" style="top:380px" data-fx="rise" data-at="{T['envoie']:.3f}"><div class="note" style="position:static;font-size:76px">📤 Envoie ça à un collègue<br>en pleine migration</div></div>
<div class="ttl" style="top:700px" data-fx="zoom" data-at="{T['thrax']:.3f}"><span class="brand">Thrax <span>Legal</span></span></div>
"""


PUNCH = []
SFX = []
TAIL = 1.6
CAP_MAX = 3
