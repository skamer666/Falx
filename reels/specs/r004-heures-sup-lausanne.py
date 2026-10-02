"""Reel 004 — Heures sup offertes au patron à Lausanne (art. 321c CO, art. 128 ch. 3 CO). Style : nuit au bureau + ticket de caisse."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import mascot

VO = ("Imagine : tu bosses à Lausanne et tu offres six mille francs par an à ton patron. Sans le savoir. "
      "Chaque semaine, tu restes trois heures de plus. Ton chef te dit : c'est normal, c'est compris dans le salaire. "
      "Sauf qu'en Suisse, la règle est claire. Les heures supplémentaires, ton employeur doit te les payer, "
      "avec vingt-cinq pour cent en plus. Ou te les rendre en congé, si tu es d'accord. "
      "La seule exception : ton contrat écrit, ou ta convention collective, prévoit autre chose. "
      "Fais le calcul. Trois heures par semaine, sur quarante-six semaines, à trente-cinq francs de l'heure, "
      "plus vingt-cinq pour cent. Plus de six mille francs. Et tu peux réclamer jusqu'à cinq ans en arrière. "
      "Article 321c du Code des obligations. Va relire ton contrat ce soir. Thrax Legal, lien en bio.")

META = {
    "id": "r004-heures-sup-lausanne",
    "music": "drive",
    "caption": ("Tu restes 3 heures de plus chaque semaine ? Tu offres peut-être plus de 6000 francs par an à ton patron 💸\n\n"
                "En Suisse, les heures supplémentaires doivent être payées avec un supplément d'au moins 25 %, "
                "ou compensées par un congé de même durée si tu es d'accord (art. 321c CO). Exception : un accord écrit, "
                "un contrat-type ou une convention collective qui prévoit autre chose.\n\n"
                "Calcul : 3 h × 46 semaines × 35 CHF × 1,25 = 6037 CHF. Les créances de salaire se prescrivent par 5 ans "
                "(art. 128 ch. 3 CO).\n\n"
                "📄 Va relire ton contrat ce soir. Une question ? Thrax Legal, lien en bio.\n\n"
                "#heuressup #travail #salaire #suisse #lausanne #genève #suisseromande #droitdutravail #droitsuisse"),
    "yt_title": "Heures sup non payées en Suisse : tu offres peut-être 6000 francs à ton patron #shorts",
    "tags": ["heures supplémentaires", "salaire", "Lausanne", "droit du travail suisse", "art. 321c CO"],
    "genome": {"style": "nuit-bureau-ticket-caisse", "palette": "nuit/blanc/vert-argent", "hook": "perte-d-argent-chiffree 'tu offres 6000 francs'",
               "format": "storytime-calcul", "topic": "travail/heures-sup", "mascot": "flat-steel",
               "captions": "blanc-surligne-vert", "music": "drive", "length": "~35s"},
    "cover_t": 1.6,
}

CSS = """
#root { background: #10131a; color: #f4f1ea; }
.night { position:absolute; inset:0; background: radial-gradient(ellipse at 50% 30%, #1d2533 0%, #10131a 70%); }
.win { position:absolute; left:0; right:0; top:60px; height:1000px; display:grid; grid-template-columns: repeat(6, 1fr); gap: 34px; padding: 0 60px; opacity: 0.22; }
.win i { display:block; height: 120px; background:#2b3445; border-radius: 6px; }
.win i.on { background:#ffd166; box-shadow: 0 0 30px rgba(255,209,102,0.6); }
.lbl { display:inline-block; font-size: 40px; font-weight: 800; letter-spacing: 0.18em; color:#10131a; background:#f4f1ea; padding: 10px 26px; border-radius: 8px; }
.hd { font-weight: 900; letter-spacing: -0.045em; line-height: 0.92; }
.money { color:#ff4d5e; }
.green { color:#3ddc97; }
.clock { position:absolute; width: 360px; height: 360px; border-radius: 50%; border: 12px solid #f4f1ea; }
.clock i { position:absolute; left: 50%; bottom: 50%; width: 14px; margin-left:-7px; background:#f4f1ea; border-radius: 7px; transform-origin: 50% 100%; }
.bubble { position:absolute; background:#f4f1ea; color:#10131a; border-radius: 40px; padding: 40px 50px; font-size: 60px; font-weight: 800; line-height: 1.1; }
.bubble:after { content:""; position:absolute; left: 90px; bottom: -40px; border: 22px solid transparent; border-top: 26px solid #f4f1ea; }
.boss { font-size: 34px; font-weight: 800; letter-spacing: 0.2em; color:#9aa6b8; }
.receipt { position:absolute; width: 760px; background: #fbfaf6; color:#1a1a1a; font-family: ui-monospace, "DejaVu Sans Mono", monospace; padding: 46px 52px 70px; box-shadow: 0 30px 60px rgba(0,0,0,0.5); transform-origin: 50% 0; }
.receipt .ln { display:flex; justify-content:space-between; font-size: 48px; font-weight: 700; padding: 10px 0; border-bottom: 3px dashed #c9c5ba; }
.receipt .tt { font-size: 34px; letter-spacing: 0.2em; text-align:center; margin-bottom: 18px; }
.receipt .tot { display:flex; justify-content:space-between; font-size: 66px; font-weight: 900; padding-top: 20px; }
.zig { position:absolute; left:0; right:0; bottom:-24px; height: 26px; background: linear-gradient(-45deg, transparent 16px, #fbfaf6 0) 0 0/32px 26px, linear-gradient(45deg, transparent 16px, #fbfaf6 0) 0 0/32px 26px; }
.chip { display:inline-block; font-weight:900; font-size: 60px; padding: 20px 40px; border: 6px solid #3ddc97; color:#3ddc97; border-radius: 20px; }
.brand { font-size: 112px; font-weight: 900; letter-spacing: -0.05em; }
.brand span { color:#ff4d5e; }
.cap { top: 1120px; }
.cap .cw.now { color:#10131a; background:#3ddc97; border-radius: 12px; padding: 0 10px; -webkit-text-stroke: 0; }
.mwrap { position:absolute; left: 250px; top: 1225px; filter: drop-shadow(0 0 40px rgba(255,209,102,0.25)); }
"""


def windows():
    lit = {2, 7, 9, 16, 21, 26, 28, 33}
    return "".join(f'<i class="{"on" if i in lit else ""}"></i>' for i in range(42))


def body(w):
    t_offres = w.a("tu offres")
    t_sans = w.a("Sans le savoir.")
    t_chaque = w.a("Chaque semaine,")
    t_trois = w.a("trois heures")
    t_chef = w.a("Ton chef")
    t_compris = w.a("c'est compris")
    t_sauf = w.a("Sauf qu'en Suisse,")
    t_heures = w.a("Les heures")
    t_25 = w.a("vingt-cinq pour cent")
    t_conge = w.a("Ou te les rendre")
    t_exc = w.a("La seule exception")
    t_calc = w.a("Fais le calcul.")
    t_l1 = w.a("Trois heures par")
    t_l2 = w.a("quarante-six semaines,")
    t_l3 = w.a("trente-cinq francs")
    t_l4 = w.a("plus vingt-cinq")
    t_tot = w.a("Plus de six mille")
    t_cinq = w.a("Et tu peux réclamer")
    t_art = w.a("Article 321c")
    t_va = w.a("Va relire")
    t_thrax = w.a("Thrax Legal,")
    m = mascot.svg("m4", "steel", w=580)
    talk = (f'data-talk data-arml="0:0;{t_offres}:-140;{t_chaque}:0;{t_25}:-150;{t_conge}:0;{t_tot}:-160;{t_art}:0" '
            f'data-armr="0:0;{t_chef}:30;{t_sauf}:0" '
            f'data-brow="0:8;{t_sans}:18;{t_chaque}:4;{t_compris}:20;{t_sauf}:0;{t_tot}:16;{t_va}:0" class="mascot ')
    m = m.replace('class="mascot ', talk, 1)
    globals()["PUNCH"] = [t_offres + 0.6, t_sauf, t_25, t_tot]
    globals()["SCRIPT"] = SCRIPT_T % {"a": t_trois - 0.2, "b": t_chef}
    return f"""
<div class="night"></div>
<div class="win">{windows()}</div>

<!-- HOOK -->
<div class="ab c" style="left:0;top:170px;width:1080px" data-fx="pop" data-at="0.05" data-out="{t_chaque - 0.15}"><span class="lbl">LAUSANNE · 19 H 47</span></div>
<div class="ab hd c money" style="left:0;top:330px;width:1080px;font-size:210px" data-fx="count" data-from="0" data-to="6000" data-d="1.0" data-pre="−" data-at="{t_offres + 0.4}" data-out="{t_chaque - 0.15}">−6000</div>
<div class="ab hd c" style="left:0;top:560px;width:1080px;font-size:84px" data-fx="rise" data-at="{t_offres + 0.6}" data-out="{t_chaque - 0.15}">francs par an</div>
<div class="ab hd c" style="left:0;top:680px;width:1080px;font-size:64px;color:#9aa6b8" data-fx="words" data-at="{t_offres + 0.9}" data-st="0.06" data-out="{t_chaque - 0.15}">offerts à ton patron 🎁</div>
<div class="ab c" style="left:0;top:830px;width:1080px;font-size:56px;font-weight:800;color:#ff4d5e" data-fx="shake" data-at="{t_sans}" data-out="{t_chaque - 0.15}">sans le savoir</div>

<!-- HORLOGE -->
<div class="clock" style="left:360px;top:250px" data-fx="pop" data-at="{t_chaque}" data-out="{t_chef - 0.1}"><i id="hh" style="height:110px"></i><i id="mm" style="height:150px;width:10px;margin-left:-5px"></i></div>
<div class="ab hd c green" style="left:0;top:690px;width:1080px;font-size:120px" data-fx="stamp" data-rot="-4" data-at="{t_trois}" data-out="{t_chef - 0.1}">+3 h</div>
<div class="ab hd c" style="left:0;top:830px;width:1080px;font-size:56px;color:#9aa6b8" data-fx="rise" data-at="{t_trois + 0.3}" data-out="{t_chef - 0.1}">chaque semaine</div>

<!-- LE CHEF -->
<div class="ab boss" style="left:110px;top:250px" data-fx="fade" data-at="{t_chef}" data-out="{t_heures - 0.15}">TON CHEF</div>
<div class="bubble" style="left:100px;top:320px;width:820px" data-fx="pop" data-at="{t_chef + 0.1}" data-out="{t_heures - 0.15}">« C'est normal, c'est compris dans le salaire 😇 »</div>
<div class="ab hd c" style="left:0;top:760px;width:1080px;font-size:96px" data-fx="words" data-at="{t_sauf}" data-st="0.06" data-out="{t_heures - 0.15}">Sauf qu'en <span class="money">Suisse</span>…</div>

<!-- REGLE -->
<div class="ab hd c" style="left:0;top:210px;width:1080px;font-size:70px" data-fx="words" data-at="{t_heures}" data-st="0.05" data-out="{t_calc - 0.15}">Heures sup =</div>
<div class="ab hd c green" style="left:0;top:330px;width:1080px;font-size:260px" data-fx="zoom" data-at="{t_25}" data-out="{t_calc - 0.15}">+25 %</div>
<div class="ab hd c" style="left:0;top:640px;width:1080px;font-size:60px" data-fx="rise" data-at="{t_conge}" data-out="{t_calc - 0.15}">ou du congé <span style="color:#9aa6b8">(si tu acceptes)</span></div>
<div class="ab c" style="left:80px;top:780px;width:920px;font-size:46px;font-weight:800;color:#ffd166;line-height:1.2" data-fx="rise" data-at="{t_exc}" data-out="{t_calc - 0.15}">⚠ sauf si ton contrat écrit ou ta CCT prévoit autre chose</div>

<!-- TICKET -->
<div class="receipt" style="left:160px;top:190px" data-fx="drop" data-at="{t_calc}" data-out="{t_art - 0.15}">
  <div class="tt">TICKET · HEURES SUP</div>
  <div class="ln" data-fx="type" data-cps="40" data-at="{t_l1}">3 h / semaine</div>
  <div class="ln" data-fx="type" data-cps="40" data-at="{t_l2}">× 46 semaines</div>
  <div class="ln" data-fx="type" data-cps="40" data-at="{t_l3}">× 35 CHF / heure</div>
  <div class="ln" data-fx="type" data-cps="40" data-at="{t_l4}">+ 25 %</div>
  <div class="tot"><span data-fx="fade" data-d="0.2" data-at="{t_tot}">TOTAL</span><span data-fx="count" data-from="0" data-to="6037" data-d="1.0" data-at="{t_tot}" data-pre="CHF ">CHF 6037</span></div>
  <div class="zig"></div>
</div>
<div class="ab hd c green" style="left:0;top:880px;width:1080px;font-size:58px" data-fx="stamp" data-rot="-3" data-at="{t_cinq}" data-out="{t_art - 0.15}">↩ jusqu'à 5 ans en arrière</div>

<!-- ARTICLE -->
<div class="ab c" style="left:0;top:520px;width:1080px" data-fx="stamp" data-rot="-3" data-at="{t_art + 0.1}" data-out="{t_va - 0.15}"><span class="chip">§ Art. 321c CO</span></div>

<!-- CTA -->
<div class="ab hd c" style="left:60px;top:300px;width:960px;font-size:84px" data-fx="words" data-at="{t_va}" data-st="0.06">📄 Relis ton contrat <span class="green">ce soir</span></div>
<div class="ab brand c" style="left:0;top:600px;width:1080px" data-fx="zoom" data-at="{t_thrax}">Thrax <span>Legal</span></div>
<div class="ab c" style="left:0;top:750px;width:1080px;font-size:50px;font-weight:800" data-fx="rise" data-at="{t_thrax + 0.5}">lien en bio ↗</div>

<div class="mwrap" data-fx="rise" data-dy="500" data-at="0.0">{m}</div>
"""


SCRIPT_T = """
(function(){
  var hh = document.getElementById('hh'), mm = document.getElementById('mm');
  var a = %(a)s, b = %(b)s;
  R.on(function(t){
    var u = Math.max(0, Math.min(1, (t - a) / Math.max(0.5, b - a)));
    var e = u < 0.5 ? 4*u*u*u : 1 - Math.pow(-2*u + 2, 3) / 2;
    mm.style.transform = 'rotate(' + (e * 3 * 360) + 'deg)';
    hh.style.transform = 'rotate(' + (210 + e * 90) + 'deg)';
  });
})();
"""
PUNCH = []
SFX = []
TAIL = 1.6
CAP_MAX = 3
