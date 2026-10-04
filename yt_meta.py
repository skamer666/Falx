"""Lit livraisons/<slug>/youtube.md (ou films/<slug>/youtube.md) et imprime le JSON pour l'upload YouTube."""
import json, os, re, sys

ST = os.path.dirname(os.path.abspath(__file__))
slug = sys.argv[1]
p = next(x for x in (f"{ST}/livraisons/{slug}/youtube.md", f"{ST}/films/{slug}/youtube.md") if os.path.exists(x))
md = open(p).read()
sec = dict(re.findall(r"^## ([^\n]+)\n(.*?)(?=^## |\Z)", md, re.S | re.M))
title = next(v for k, v in sec.items() if k.startswith("Titre")).strip()
desc = sec["Description"].strip()
tags = [t.strip() for t in sec["Tags"].strip().split(",") if t.strip()]
# YouTube : titre ≤ 100 caractères, tags ≤ 500 caractères au total, pas de < >.
assert len(title) <= 100, title
while len(",".join(tags)) > 480:
    tags.pop()
print(json.dumps({"title": title, "description": desc.replace("<", "‹").replace(">", "›"), "tags": tags}, ensure_ascii=False))
