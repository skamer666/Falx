"""Reel 021 — TikTok « full value » : récupérer une facture impayée sans avocat, en 4 étapes (art. 102 et 104 CO ; art. 67, 74,
82 et 88 LP). Hook demandé par le propriétaire : « Incroyable, c'est faisable » + CTA « Commente FACTURE et je t'envoie le guide
complet » (guide du site : mise en demeure et recouvrement). Style (nouveau) : appli Notes en mode sombre, check-list qui se coche
au fil de la voix, puce d'article par étape. Voix Vivienne."""
import json

VOICE = "fr-FR-VivienneMultilingualNeural"
RATE = "+10%"

VO = ("Incroyable, mais c'est faisable : en Suisse, tu peux récupérer une facture impayée toi-même, sans avocat. "
      "Ton client à Genève ne paie pas ? Voilà les quatre étapes. "
      "Un : la mise en demeure. Une lettre, idéalement recommandée, avec un dernier délai. "
      "Et dès qu'il est en demeure, il te doit cinq pour cent d'intérêts par an. "
      "Deux : la réquisition de poursuite, à l'office des poursuites de son domicile. Souvent en ligne, pour quelques dizaines de francs. "
      "Trois : il reçoit un commandement de payer. Il a dix jours pour faire opposition. "
      "Quatre : pas d'opposition ? Tu demandes la suite de la poursuite. "
      "Et s'il avait signé une reconnaissance de dette, le juge peut lever son opposition, en procédure rapide. "
      "Tu veux le guide complet, avec tous les pièges ? Écris facture en commentaire, et je te l'envoie.")

META = {
    "id": "r021-facture-impayee-notes",
    "music": "drive",
    "caption": ("🤯 Un client ne paie pas ta facture ? En Suisse, tu peux lancer le recouvrement toi-même, sans avocat. Les 4 étapes :\n\n"
                "1️⃣ Mise en demeure : une lettre (idéalement recommandée, pour la preuve) qui fixe un dernier délai (art. 102 CO). "
                "Dès la demeure, intérêt moratoire de 5 % par an (art. 104 CO).\n"
                "2️⃣ Réquisition de poursuite à l'office des poursuites du domicile ou du siège du débiteur (art. 46 et 67 LP), souvent en ligne. "
                "Tu avances les frais, qui dépendent du montant, puis ils sont mis à la charge du débiteur (art. 68 LP).\n"
                "3️⃣ Commandement de payer : le débiteur a 10 jours pour faire opposition (art. 74 LP).\n"
                "4️⃣ Pas d'opposition : tu requiers la continuation de la poursuite, au plus tôt 20 jours après la notification (art. 88 LP) : "
                "saisie, ou faillite si le débiteur est inscrit au registre du commerce. "
                "En cas d'opposition, une reconnaissance de dette signée permet de demander au juge la mainlevée provisoire (art. 82 LP), en procédure sommaire. "
                "Sans reconnaissance de dette, il faut faire reconnaître la créance par le juge (art. 79 LP).\n\n"
                "📌 Pense aussi à la prescription : souvent 5 ans pour les prestations et fournitures, 10 ans sinon (art. 127 et 128 CO).\n\n"
                "💬 Commente FACTURE et je t'envoie le guide complet. 🔖 Enregistre pour le jour où ça t'arrive.\n\n"
                "#facture #impayé #recouvrement #poursuite #independant #pme #genève #lausanne #suisse #suisseromande #entrepreneur"),
    "yt_title": "Facture impayée en Suisse : la récupérer toi-même, sans avocat (4 étapes) #shorts",
    "tiktok_title": "Facture impayée ? En Suisse tu peux la récupérer sans avocat 🤯",
    "first_comment": "Commente FACTURE 👇 et je t'envoie le guide complet (gratuit)",
    "tags": ["facture impayée", "poursuite", "art. 74 LP", "recouvrement", "Genève"],
    "genome": {"style": "appli-notes-checklist-sombre", "palette": "noir/jaune Notes/gris", "hook": "incroyable c'est faisable + promesse (sans avocat)",
               "format": "full value 4 étapes + CTA commente mot-clé", "topic": "argent/recouvrement", "mascot": "aucun (appli Notes)",
               "voice": "fr-FR-VivienneMultilingualNeural", "captions": "blanc-contour-noir", "music": "drive", "length": "~42s"},
    "cover_t": 1.4,
}

CSS = """
#root { background:#000; color:#fff; }
.top { position:absolute; left:60px; right:60px; top:70px; display:flex; justify-content:space-between; align-items:center;
       font-size:44px; color:#ffd60a; font-weight:600; }
.top b { font-weight:600; }
.prog { font-size:38px; color:#8e8e93; font-weight:700; }
.ttl { position:absolute; left:60px; right:60px; top:150px; font-size:76px; font-weight:900; letter-spacing:-0.02em; line-height:1.05; }
.date { position:absolute; left:60px; top:330px; font-size:32px; color:#8e8e93; }
.it { position:absolute; left:60px; right:50px; display:flex; gap:30px; align-items:flex-start; }
.ck { flex:none; width:70px; height:70px; border-radius:50%; border:5px solid #636366; margin-top:2px; position:relative; }
.ck i { position:absolute; inset:-5px; border-radius:50%; background:#ffd60a; color:#000; font-style:normal; font-size:44px; font-weight:900;
        display:flex; align-items:center; justify-content:center; }
.tx { flex:1; }
.tx .h { font-size:56px; font-weight:800; line-height:1.08; }
.tx .d { font-size:38px; color:#aeaeb2; line-height:1.25; margin-top:8px; }
.tx .a { display:inline-block; margin-top:10px; font-size:32px; font-weight:800; color:#000; background:#ffd60a; border-radius:12px; padding:4px 14px; }
.hl { color:#ffd60a; }
.dim { position:absolute; inset:0; background:rgba(0,0,0,0.88); }
.ov { position:absolute; left:50px; right:50px; display:flex; flex-direction:column; align-items:center; text-align:center; gap:18px; }
.big { font-size:150px; font-weight:900; letter-spacing:-0.05em; line-height:0.92; }
.mid { font-size:70px; font-weight:900; line-height:1.08; letter-spacing:-0.02em; }
.sm { font-size:42px; font-weight:700; color:#aeaeb2; }
.cmt { display:flex; gap:24px; align-items:center; background:#1c1c1e; border-radius:36px; padding:26px 34px; text-align:left; width:900px; }
.cmt .av { flex:none; width:96px; height:96px; border-radius:50%; background:linear-gradient(135deg,#ffd60a,#ff9f0a); font-size:52px;
           display:flex; align-items:center; justify-content:center; }
.cmt .u { font-size:32px; color:#8e8e93; font-weight:700; }
.cmt .m { font-size:66px; font-weight:900; letter-spacing:0.02em; min-height:72px; }
.reply { font-size:48px; font-weight:800; color:#ffd60a; }
.brand { font-size:96px; font-weight:900; letter-spacing:-0.05em; }
.brand span { color:#ffd60a; }
.cap { top: 1590px; font-size: 74px; }
.cap .cw { -webkit-text-stroke: 14px #000; }
.cap .cw.now { color:#ffd60a; }
"""

STEPS = [
    ("un", "Mise en demeure ✉️", "lettre recommandée + dernier délai<br><span class=\"hl\">+ 5 % d'intérêts par an</span>", "Art. 102 + 104 CO", 380),
    ("deux", "Réquisition de poursuite 🏛️", "office des poursuites de son domicile<br>souvent en ligne, quelques dizaines de CHF", "Art. 67 LP", 680),
    ("trois", "Commandement de payer 📬", "il a <span class=\"hl\">10 jours</span> pour faire opposition", "Art. 74 LP", 980),
    ("quatre", "Pas d'opposition ? ▶️", "saisie (ou faillite si inscrit au RC)<br>reconnaissance de dette → <span class=\"hl\">mainlevée rapide</span>", "Art. 88 + 82 LP", 1250),
]


def body(w):
    T = {k: w.a(p) for k, p in {
        "inc": "Incroyable,", "sans": "sans avocat.", "client": "Ton client", "voila": "Voilà les quatre",
        "un": "Un :", "interets": "cinq pour cent", "deux": "Deux :", "ligne": "Souvent en ligne,", "trois": "Trois :", "dix": "dix jours",
        "quatre": "Quatre :", "reco": "Et s'il avait signé", "juge": "le juge peut", "guide": "Tu veux le guide", "commente": "Écris facture",
        "envoie": "et je te l'envoie."}.items()}
    T["total"] = w.total
    globals()["PUNCH"] = [T["sans"], T["interets"], T["dix"], T["commente"]]
    O = lambda a, b: f'data-at="{a:.3f}" data-out="{b - 0.2:.3f}"'
    items = []
    for i, (k, h, d, art, top) in enumerate(STEPS):
        t0 = T[k]
        nxt = T[STEPS[i + 1][0]] if i + 1 < len(STEPS) else T["guide"]
        items.append(
            f'<div class="it" style="top:{top}px" data-fx="rise" data-dy="40" data-at="{t0 - 0.1:.3f}" data-out="{T["guide"] - 0.2:.3f}">'
            f'<div class="ck"><i data-fx="pop" data-at="{nxt - 0.35:.3f}">✓</i></div>'
            f'<div class="tx"><div class="h">{h}</div><div class="d" data-fx="fade" data-d="0.2" data-at="{t0 + 0.6:.3f}">{d}</div>'
            f'<div class="a" data-fx="pop" data-at="{t0 + 1.0:.3f}">{art}</div></div></div>')
    items = "\n".join(items)
    progs = "".join(f'<div class="prog" data-fx="fade" data-d="0.1" {O(T[k], (T[STEPS[i + 1][0]] if i + 1 < 4 else T["guide"]))}>{i + 1}/4</div>'
                    for i, (k, *_r) in enumerate(STEPS))
    return f"""
<div data-fx="fade" data-d="0.1" data-at="-1" data-out="{T['guide'] - 0.2:.3f}">
  <div class="top"><b>‹ Notes</b><div style="position:relative;width:120px;height:50px">{progs.replace('class="prog"', 'class="prog" style="position:absolute;right:0"')}</div></div>
  <div class="ttl" data-fx="type" data-at="0.05" data-cps="26">Facture impayée 💸 récupérer mon argent</div>
  <div class="date" data-fx="fade" data-at="0.6">5 octobre · client à Genève · CHF 4'800</div>
  {items}
</div>
<div class="dim" data-fx="fade" data-d="0.12" {O(T['inc'] + 0.2, T['un'])}></div>
<div class="ov" style="top:400px" data-fx="stamp" data-rot="-4" {O(T['inc'] + 0.2, T['un'])}>
  <div class="big">🤯</div><div class="mid">Récupérer une facture impayée…</div>
  <div class="big hl" data-fx="stamp" data-rot="-4" data-at="{T['sans']:.3f}">SANS AVOCAT</div>
  <div class="mid" style="font-size:56px;margin-top:20px" data-fx="rise" data-at="{T['client']:.3f}">📍 ton client à Genève ne paie pas ?</div>
  <div class="big" style="font-size:120px" data-fx="stamp" data-rot="-3" data-at="{T['voila']:.3f}">4 étapes 👇</div>
  <div class="sm" data-fx="rise" data-at="{T['voila'] + 0.5:.3f}">🔖 enregistre la liste</div>
</div>
<div class="ov" style="top:300px" data-fx="drop" data-at="{T['guide']:.3f}">
  <div class="mid">📘 Le guide complet,<br>avec tous les pièges ?</div>
  <div class="big hl" style="font-size:130px;margin-top:20px" data-fx="stamp" data-rot="-3" data-at="{T['commente']:.3f}">COMMENTE 👇</div>
  <div class="cmt" data-fx="pop" data-at="{T['commente'] + 0.3:.3f}">
    <div class="av">🙋</div><div><div class="u">toi · à l'instant</div><div class="m" data-fx="type" data-at="{T['commente'] + 0.5:.3f}" data-cps="9">FACTURE</div></div>
  </div>
  <div class="reply" data-fx="rise" data-at="{T['envoie']:.3f}">→ je t'envoie le guide complet 📩</div>
  <div class="brand" style="margin-top:40px" data-fx="zoom" data-at="{T['envoie'] + 0.6:.3f}">Thrax <span>Legal</span></div>
</div>
"""


PUNCH = []
SFX = []
TAIL = 2.0
CAP_MAX = 3
