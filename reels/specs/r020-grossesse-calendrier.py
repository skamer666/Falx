"""Reel 020 — Licenciement pendant la grossesse : congé nul (art. 336c al. 1 let. c et al. 2 CO). Style (nouveau) : calendrier
mural dont les pages s'arrachent en 3D CSS, compteur de semaines, tampon « NUL ». Voix Sylvie (jamais utilisée)."""
import json

VOICE = "fr-CA-SylvieNeural"
RATE = "+8%"

VO = ("Enceinte, et ton patron te licencie, à Neuchâtel ? Ce congé est nul. "
      "En Suisse, après le temps d'essai, ton employeur ne peut pas te licencier pendant toute la grossesse, "
      "et pendant les seize semaines qui suivent l'accouchement. "
      "S'il le fait quand même, le congé ne vaut rien. "
      "Et si tu avais reçu ton congé juste avant ? Le délai s'arrête pendant cette période, puis reprend après. "
      "Attention : ça te protège contre un licenciement, pas si c'est toi qui démissionnes. "
      "Article 336 C, du Code des obligations. Envoie ça à une amie enceinte. Thrax Legal, lien en bio.")

META = {
    "id": "r020-grossesse-calendrier",
    "music": "lofi",
    "caption": ("🤰 Enceinte et licenciée à Neuchâtel ? Ce congé est nul.\n\n"
                "En Suisse, après le temps d'essai, l'employeur ne peut pas résilier le contrat pendant la grossesse et au cours des "
                "16 semaines qui suivent l'accouchement (art. 336c al. 1 let. c CO). Un congé donné pendant cette période est nul (art. 336c al. 2 CO).\n\n"
                "Si le congé a été donné avant, le délai de congé est suspendu pendant la période de protection et ne reprend qu'après, "
                "avec report éventuel au prochain terme (art. 336c al. 2 et 3 CO).\n\n"
                "Cette protection vise le licenciement par l'employeur : elle ne s'applique pas à une démission, ni pendant le temps d'essai. "
                "Des règles particulières existent pour le licenciement immédiat pour justes motifs.\n\n"
                "📤 Envoie ça à une amie enceinte. Une question ? Thrax Legal, lien en bio.\n\n"
                "#grossesse #maternite #travail #licenciement #neuchatel #lausanne #genève #suisse #suisseromande #droitdutravail"),
    "yt_title": "Enceinte et licenciée en Suisse ? Ce congé est nul #shorts",
    "tiktok_title": "Enceinte et licenciée ? En Suisse, ce congé est nul",
    "tags": ["grossesse", "licenciement", "art. 336c CO", "maternité", "Neuchâtel"],
    "genome": {"style": "calendrier-pages-arrachees-3d-css", "palette": "crème/rose/rouge", "hook": "affirmation choc vraie + ville",
               "format": "regle + compteur + exception", "topic": "travail/grossesse", "mascot": "aucun (calendrier)",
               "voice": "fr-CA-SylvieNeural", "captions": "blanc-contour-bordeaux", "music": "lofi", "length": "~30s"},
    "cover_t": 1.5,
}

CSS = """
#root { background: radial-gradient(ellipse at 50% 40%, #fff5ee 0%, #f7dcd2 60%, #e8bfb3 100%); color:#2a1414; }
.cal { position:absolute; left:190px; top:560px; width:700px; height:760px; perspective:2200px; }
.ring { position:absolute; top:-26px; width:34px; height:70px; border-radius:18px; background:#6b6b75; z-index:50; }
.pg { position:absolute; inset:0; background:#fffdf9; border-radius:30px; box-shadow:0 30px 60px rgba(90,30,20,0.25);
      transform-origin: 50% 0%; display:flex; flex-direction:column; overflow:hidden; backface-visibility:hidden; }
.pg .hd { height:150px; background:#d9465f; color:#fff; font-size:64px; font-weight:900; display:flex; align-items:center; justify-content:center; letter-spacing:0.04em; }
.pg .bd { flex:1; display:flex; align-items:center; justify-content:center; font-size:300px; font-weight:900; color:#2a1414; letter-spacing:-0.05em; }
.pg .ft { font-size:36px; font-weight:800; color:#9a6b62; text-align:center; padding-bottom:30px; }
.top { position:absolute; left:60px; right:60px; display:flex; flex-direction:column; align-items:center; text-align:center; gap:14px; }
.big { font-size:118px; font-weight:900; letter-spacing:-0.045em; line-height:0.95; }
.mid { font-size:58px; font-weight:900; line-height:1.1; letter-spacing:-0.02em; }
.sm { font-size:40px; font-weight:700; color:#6b4a44; }
.red { color:#c81e3a; }
.nul { position:absolute; left:0; right:0; top:820px; text-align:center; font-size:210px; font-weight:900; color:#c81e3a; letter-spacing:-0.04em;
       text-shadow:0 10px 40px rgba(200,30,58,0.35); z-index:60; }
.bar { width:840px; height:46px; border-radius:23px; background:rgba(255,255,255,0.7); border:3px solid #d9465f; overflow:hidden; }
.bar i { display:block; height:100%; background:linear-gradient(90deg,#f28aa0,#d9465f); transform-origin:0 50%; }
.chip { display:inline-block; background:#2a1414; color:#fff; font-size:70px; font-weight:900; border-radius:22px; padding:12px 34px; }
.brand { font-size:120px; font-weight:900; letter-spacing:-0.05em; }
.brand span { color:#d9465f; }
.cap { top: 1460px; font-size: 76px; }
.cap .cw { -webkit-text-stroke: 14px #5a1020; }
.cap .cw.now { color:#ffd1db; }
"""

PAGES = [("MOIS 1", "🤰"), ("MOIS 3", "🤰"), ("MOIS 5", "🤰"), ("MOIS 7", "🤰"), ("MOIS 9", "👶"), ("+16 SEM.", "🍼")]


def body(w):
    T = {k: w.a(p) for k, p in {
        "licencie": "te licencie,", "nul": "Ce congé est nul.", "suisse": "En Suisse,", "toute": "pendant toute la grossesse,",
        "seize": "pendant les seize semaines", "quand": "S'il le fait", "avant": "Et si tu avais", "arrete": "Le délai s'arrête",
        "attention": "Attention :", "art": "Article", "envoie": "Envoie ça", "thrax": "Thrax Legal,"}.items()}
    T["total"] = w.total
    globals()["PUNCH"] = [T["nul"], T["quand"]]
    globals()["SCRIPT"] = SCRIPT_T.replace("__T__", json.dumps(T))
    O = lambda a, b: f'data-at="{a:.3f}" data-out="{b - 0.2:.3f}"'
    pages = "".join(f'<div class="pg" id="pg{i}" style="z-index:{40 - i}"><div class="hd">{h}</div><div class="bd">{e}</div>'
                    f'<div class="ft">{"protégée" if i < 5 else "toujours protégée"}</div></div>' for i, (h, e) in enumerate(PAGES))
    return f"""
<div class="top" style="top:110px" data-fx="drop" {O(0.05, T['suisse'])}>
  <div class="mid">✉️ « Nous mettons fin à ton contrat… »</div>
  <div class="big red" data-fx="stamp" data-rot="-5" data-at="{T['nul']:.3f}">CONGÉ NUL</div>
  <div class="sm" data-fx="rise" data-at="{T['nul'] + 0.5:.3f}">📍 Neuchâtel · histoire fictive</div>
</div>
<div class="top" style="top:120px" data-fx="drop" {O(T['suisse'], T['avant'])}>
  <div class="mid">🇨🇭 Après le temps d'essai :</div>
  <div class="mid">aucun licenciement pendant</div>
  <div class="bar"><i id="prog" style="transform:scaleX(0)"></i></div>
  <div class="sm" id="lbl">la grossesse…</div>
</div>
<div class="cal" data-fx="rise" data-at="0.15" data-out="{T['art'] - 0.2:.3f}">
  <div class="ring" style="left:180px"></div><div class="ring" style="right:180px"></div>
  {pages}
</div>
<div class="nul" data-fx="stamp" data-rot="-8" {O(T['quand'], T['avant'])}>NUL</div>
<div class="top" style="top:120px" data-fx="drop" {O(T['avant'], T['attention'])}>
  <div class="mid">Congé reçu juste avant ?</div>
  <div class="big" style="font-size:96px" data-fx="stamp" data-rot="-3" data-at="{T['arrete']:.3f}">⏸️ le délai s'arrête</div>
  <div class="sm" data-fx="rise" data-at="{T['arrete'] + 1.2:.3f}">puis reprend après</div>
</div>
<div class="top" style="top:120px" data-fx="drop" {O(T['attention'], T['art'])}>
  <div class="mid">⚠️ Protège contre un licenciement…</div>
  <div class="mid red">pas contre ta démission</div>
</div>
<div class="top" style="top:640px" data-fx="stamp" data-rot="-3" {O(T['art'], T['envoie'])}><div class="chip">Art. 336c CO</div></div>
<div class="top" style="top:560px" data-fx="drop" data-at="{T['envoie']:.3f}">
  <div class="mid">📤 Envoie ça à une amie enceinte</div>
  <div class="brand" data-fx="zoom" data-at="{T['thrax']:.3f}">Thrax <span>Legal</span></div>
</div>
"""


SCRIPT_T = r"""
(function(){
  var T = __T__, N = 6;
  var pages = []; for (var i = 0; i < N; i++) pages.push(document.getElementById('pg' + i));
  var prog = document.getElementById('prog'), lbl = document.getElementById('lbl');
  function cl(v){ return Math.max(0, Math.min(1, v)); }
  function ei(u){ u = cl(u); return u * u * u; }
  // Pages tear off one by one between "pendant toute la grossesse" and "S'il le fait".
  var a = T.toute, b = T.quand - 0.3, step = (b - a) / (N - 1);
  R.on(function(t){
    for (var i = 0; i < N - 1; i++) {
      var t0 = a + i * step, u = ei((t - t0) / 0.55);
      pages[i].style.transform = 'rotateX(' + (u * 110) + 'deg) translateY(' + (u * 60) + 'px) rotateZ(' + (u * (i % 2 ? 9 : -9)) + 'deg)';
      pages[i].style.opacity = 1 - cl((t - t0 - 0.35) / 0.25);
    }
    var p = cl((t - a) / (b - a));
    prog.style.transform = 'scaleX(' + p + ')';
    lbl.textContent = t < T.seize ? 'toute la grossesse…' : '… + 16 semaines après l\'accouchement';
  });
})();
"""
PUNCH = []
SFX = []
TAIL = 1.6
CAP_MAX = 3
