"""Reel 001 — Licencié pendant un arrêt maladie ? (art. 336c CO). Style : flat cartoon pop, fond crème."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import mascot

VO = ("Tu es en arrêt maladie et ton patron te licencie ? Attends. Ce licenciement est peut-être nul. "
      "En Suisse, après le temps d'essai, ton employeur ne peut pas te licencier pendant une maladie ou un accident "
      "dont tu n'es pas responsable. Trente jours pendant la première année de service. Nonante jours de la deuxième "
      "à la cinquième. Cent quatre-vingts jours dès la sixième. Et si tu as reçu ton congé juste avant ? Le délai "
      "s'arrête pendant ta maladie, puis il reprend. C'est l'article 336c du Code des obligations. Enregistre cette "
      "vidéo. Et si ça t'arrive, Thrax Legal. Le lien est en bio.")

META = {
    "id": "r001-maladie-licenciement",
    "music": "bounce",
    "caption": ("Licencié pendant un arrêt maladie ? Ce congé est peut-être NUL 😳\n\n"
                "En Suisse, après le temps d'essai, l'employeur ne peut pas licencier pendant une incapacité de travail "
                "due à une maladie ou un accident non fautif : 30 jours la 1re année de service, 90 jours de la 2e à la 5e, "
                "180 jours dès la 6e (art. 336c CO). Congé reçu juste avant ? Le délai de congé est suspendu.\n\n"
                "📌 Enregistre pour plus tard. Une question ? Thrax Legal, lien en bio.\n\n"
                "#droitdutravail #suisse #suisseromande #licenciement #arretmaladie #travail #genève #lausanne #droitsuisse"),
    "yt_title": "Licencié pendant un arrêt maladie en Suisse ? Ce congé est peut-être nul (art. 336c CO) #shorts",
    "tags": ["licenciement", "arrêt maladie", "droit du travail suisse", "art. 336c CO", "Suisse romande"],
    "genome": {"style": "flat-cartoon-pop", "palette": "cream/navy/red", "hook": "question-choc + 'Attends'",
               "format": "regle-chiffree", "topic": "travail/licenciement-maladie", "mascot": "flat-talking",
               "captions": "karaoke-jaune", "music": "bounce", "length": "~30s"},
    "cover_t": 1.2,
}

CSS = """
#root { background: #f3ecdf; color: #141414; }
.bgdots { position:absolute; inset:0; background-image: radial-gradient(#e2d6c2 3px, transparent 3px); background-size: 46px 46px; }
.blob { position:absolute; border-radius: 50%; }
.hd { font-weight: 900; letter-spacing: -0.04em; line-height: 0.95; color:#141414; }
.tag { display:inline-block; background:#141414; color:#f3ecdf; font-weight:800; font-size:44px; padding:14px 30px; border-radius: 999px; letter-spacing: 0.02em;}
.paper { width: 560px; height: 470px; background: #fff; border-radius: 22px; box-shadow: 0 30px 0 #141414; border: 6px solid #141414; padding: 54px 50px; }
.paper .ln { height: 18px; border-radius: 9px; background: #e5e0d6; margin-bottom: 26px; }
.paper .tt { font-size: 40px; font-weight: 900; margin-bottom: 40px; letter-spacing: -0.02em; }
.stampx { font-size: 120px; font-weight: 900; color: #da291c; border: 12px solid #da291c; border-radius: 26px; padding: 0 34px; letter-spacing: 0.02em; background: rgba(243,236,223,0.9);}
.bar { position:absolute; height: 120px; border-radius: 26px; border: 6px solid #141414; box-shadow: 0 12px 0 #141414; transform-origin: 0 50%; display:flex; align-items:center; padding-left: 34px; font-size: 64px; font-weight: 900; }
.bl { position:absolute; font-size: 46px; font-weight: 800; color:#141414; }
.chip2 { display:inline-flex; align-items:center; gap:18px; background:#da291c; color:#fff; font-weight:900; font-size:58px; padding: 22px 40px; border-radius: 26px; border: 6px solid #141414; box-shadow: 0 12px 0 #141414; }
.pause { width: 260px; height: 260px; border-radius: 50%; background: #141414; display:flex; align-items:center; justify-content:center; gap: 34px; }
.pause i { display:block; width: 48px; height: 130px; background: #f3ecdf; border-radius: 12px; }
.brand { font-size: 110px; font-weight: 900; letter-spacing: -0.05em; }
.brand span { color:#da291c; }
.cap { top: 1010px; }
.cap .cw { color:#141414; -webkit-text-stroke: 0; background: none; }
.cap .cw.on { color:#141414; }
.cap .cw.now { color:#fff; background:#da291c; border-radius: 14px; padding: 0 12px; transform: rotate(-2deg) scale(1.06); }
.mwrap { position:absolute; left: 150px; top: 1130px; }
.mshadow { position:absolute; left: 230px; top: 1830px; width: 620px; height: 60px; border-radius: 50%; background: rgba(20,20,20,0.12); }
"""


def body(w):
    t_attends = w.a("Attends.")
    t_nul = w.a("nul.")
    t_suisse = w.a("En Suisse,")
    t_30 = w.a("Trente jours")
    t_90 = w.a("Nonante jours")
    t_180 = w.a("Cent quatre-vingts")
    t_avant = w.a("Et si tu")
    t_delai = w.a("Le délai")
    t_art = w.a("C'est l'article")
    t_enr = w.a("Enregistre")
    t_thrax = w.a("Thrax Legal.")
    end = w.total
    m = mascot.svg("m1", "navy", w=780)
    return f"""
<div class="bgdots"></div>
<div class="blob" style="left:-220px;top:-180px;width:760px;height:760px;background:#ffd60a"></div>
<div class="blob" style="left:760px;top:420px;width:520px;height:520px;background:#a8dadc"></div>

<!-- HOOK -->
<div class="ab c" style="left:0;top:170px;width:1080px" data-fx="pop" data-at="0.05" data-out="{t_suisse - 0.15}"><span class="tag">ARRÊT MALADIE</span></div>
<div class="ab hd c" style="left:0;top:270px;width:1080px;font-size:150px" data-fx="words" data-at="0.15" data-st="0.07" data-out="{t_suisse - 0.15}">+ LICENCIÉ ?</div>
<div class="ab paper" style="left:260px;top:470px" data-fx="drop" data-at="{t_attends - 0.1}" data-out="{t_suisse - 0.1}">
  <div class="tt">Lettre de licenciement</div><div class="ln" style="width:90%"></div><div class="ln"></div><div class="ln" style="width:70%"></div><div class="ln" style="width:85%"></div><div class="ln" style="width:60%"></div>
</div>
<div class="ab" style="left:300px;top:610px" data-fx="stamp" data-rot="-12" data-at="{t_nul}" data-out="{t_suisse - 0.1}"><span class="stampx">NUL ?</span></div>

<!-- RULE -->
<div class="ab hd c" style="left:60px;top:150px;width:960px;font-size:76px" data-fx="words" data-at="{t_suisse}" data-st="0.05" data-out="{t_avant - 0.15}">Protégé pendant la maladie :</div>
<div class="bl" style="left:80px;top:300px" data-fx="rise" data-at="{t_30 - 0.05}" data-out="{t_avant - 0.15}">1re année</div>
<div class="bar" style="left:80px;top:350px;width:300px;background:#ffd60a" data-fx="width" data-d="0.5" data-at="{t_30}" data-out="{t_avant - 0.15}">30 j</div>
<div class="bl" style="left:80px;top:520px" data-fx="rise" data-at="{t_90 - 0.05}" data-out="{t_avant - 0.15}">2e à 5e année</div>
<div class="bar" style="left:80px;top:570px;width:560px;background:#a8dadc" data-fx="width" data-d="0.6" data-at="{t_90}" data-out="{t_avant - 0.15}">90 jours</div>
<div class="bl" style="left:80px;top:740px" data-fx="rise" data-at="{t_180 - 0.05}" data-out="{t_avant - 0.15}">dès la 6e année</div>
<div class="bar" style="left:80px;top:790px;width:900px;background:#da291c;color:#fff" data-fx="width" data-d="0.7" data-at="{t_180}" data-out="{t_avant - 0.15}">180 jours</div>

<!-- SUSPENSION -->
<div class="ab hd c" style="left:60px;top:170px;width:960px;font-size:84px" data-fx="words" data-at="{t_avant}" data-st="0.05" data-out="{t_art - 0.15}">Congé reçu juste avant ?</div>
<div class="ab pause" style="left:410px;top:420px" data-fx="pop" data-at="{t_delai}" data-out="{t_art - 0.15}"><i></i><i></i></div>
<div class="ab hd c" style="left:60px;top:740px;width:960px;font-size:64px" data-fx="rise" data-at="{t_delai + 0.4}" data-out="{t_art - 0.15}">Le délai est suspendu</div>

<!-- ARTICLE -->
<div class="ab" style="left:140px;top:420px" data-fx="stamp" data-rot="-4" data-at="{t_art + 0.1}" data-out="{t_enr - 0.3}"><span class="chip2">§ Art. 336c CO</span></div>

<!-- CTA -->
<div class="ab c" style="left:0;top:260px;width:1080px" data-fx="pop" data-at="{t_enr}" ><span class="tag" style="font-size:52px">📌 ENREGISTRE</span></div>
<div class="ab brand c" style="left:0;top:470px;width:1080px" data-fx="zoom" data-at="{t_thrax}">Thrax <span>Legal</span></div>
<div class="ab c" style="left:0;top:620px;width:1080px;font-size:52px;font-weight:800" data-fx="rise" data-at="{t_thrax + 0.5}">Lien en bio ↗</div>

<div class="mshadow"></div>
<div class="mwrap" data-fx="rise" data-dy="400" data-at="0.0">
  {m.replace('class="mascot ', 'data-talk data-arml="0:0;' + f'{t_30}:-150;{t_avant - 0.3}:0;{t_thrax}:-160' + '" data-armr="0:0;' + f'{t_nul}:20;{t_suisse}:0' + '" data-brow="0:14;' + f'{t_suisse}:0;{t_nul}:16;{t_suisse + 0.3}:0;{t_avant}:10;{t_delai}:0' + '" class="mascot ')}
</div>
"""


PUNCH = []
SFX = []
TAIL = 1.6
