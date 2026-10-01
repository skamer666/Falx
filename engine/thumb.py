"""Write work/<slug>/thumb.html (1280x720) from the spec META["thumb"] = (line1, line2_muted, chip). Swiss flag always included."""
import importlib.util
import os
import sys

ROOT = os.path.abspath(sys.argv[1])
SPEC_PATH = os.path.abspath(sys.argv[2])
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
spec = importlib.util.spec_from_file_location("spec", SPEC_PATH)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)
l1, l2, chip = mod.META["thumb"]
audience = getattr(mod, "AUDIENCE", "")
badge = {"particuliers": "Particuliers", "entreprises": "Entreprises"}.get(audience, "Guide")

html = f"""<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:"S";font-weight:400 900;src:url("assets/fonts/schibsted-grotesk-1789676e.woff2") format("woff2")}}
*{{margin:0;padding:0;box-sizing:border-box}}
body{{width:1280px;height:720px;background:#0a0a0b;font-family:"S";color:#f5f5f7;overflow:hidden;position:relative}}
.grid{{position:absolute;inset:0;background-image:linear-gradient(to right,rgba(245,245,247,.05) 0 1px,transparent 1px 100%),linear-gradient(to bottom,rgba(245,245,247,.05) 0 1px,transparent 1px 100%);background-size:64px 64px}}
.vig{{position:absolute;inset:0;background:radial-gradient(ellipse 80% 75% at 40% 50%,rgba(0,0,0,0) 50%,rgba(0,0,0,.7) 100%)}}
.crest{{position:absolute;right:24px;top:110px;width:440px;height:459px;object-fit:contain;opacity:.95}}
.t{{position:absolute;left:70px;top:130px;width:780px;font-size:112px;font-weight:700;letter-spacing:-.05em;line-height:.95}}
.t .m{{color:rgba(245,245,247,.45)}}
.chip{{position:absolute;left:70px;top:530px;max-width:900px;background:#f5f5f7;color:#0a0a0b;font-size:38px;font-weight:700;padding:16px 30px;border-radius:999px;letter-spacing:-.02em}}
.brand{{position:absolute;left:72px;top:58px;font-size:26px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgba(245,245,247,.6)}}
.flag{{position:absolute;left:1086px;top:452px;width:132px;height:132px;transform:rotate(-8deg);filter:drop-shadow(0 18px 30px rgba(0,0,0,.65));border-radius:8px}}
</style></head><body><div class="grid"></div><img class="crest" src="assets/img/crest-alpha.png"><div class="vig"></div>
<svg class="flag" viewBox="0 0 32 32"><rect width="32" height="32" rx="3" fill="#DA291C"/><rect x="13" y="6" width="6" height="20" fill="#fff"/><rect x="6" y="13" width="20" height="6" fill="#fff"/></svg>
<div class="brand">Thrax Legal · {badge}</div>
<div class="t">{l1}<br><span class="m">{l2}</span></div>
<div class="chip">{chip}</div></body></html>
"""
open(os.path.join(ROOT, "thumb.html"), "w").write(html)
print("thumb.html written")
