"""Vidéo de service — Directives anticipées (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, lst, process, title, warn

AUDIENCE = "particuliers"
SLUG = "directives-anticipees"
NAME = "Directives anticipées"

META = {
    "title": "Directives anticipées : vos volontés, par écrit",
    "yt_title": "Directives anticipées en Suisse : écrire vos volontés médicales valablement (art. 371 CC)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Directives anticipées : quels traitements accepter ou refuser si vous ne pouvez plus vous exprimer ? Elles doivent être "
                 "écrites, datées et signées (art. 371 CC), et le médecin doit les suivre sauf exceptions (art. 372 CC). Thrax Legal rédige "
                 "vos directives en termes précis et la désignation de votre représentant thérapeutique, à prix fixe."),
    "tags": ["directives anticipées", "art. 371 CC", "volontés médicales", "représentant thérapeutique", "fin de vie", "carte d'assuré",
             "protection de l'adulte", "santé", "Suisse romande", "Thrax Legal"],
    "thumb": ("Directives", "anticipées ?", "Vos volontés, par écrit"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Directives anticipées : quels traitements accepter ou refuser si vous ne pouvez plus vous exprimer ?")(
    title("Particuliers · Directives anticipées", "Vos volontés médicales sont-elles écrites ?",
          chips=[("Accepter", "accepter"), ("Refuser", "refuser")]))
S("Sans directives, ce sont d’autres qui devront deviner ce que vous auriez voulu.", P1)(
    warn("Sans directives, d’autres devront deviner.", sub="Ce que vous auriez voulu.", a_sub="ce que vous", label="Le risque"))
S("Les directives doivent être écrites, datées et signées, sans notaire. Et le médecin doit les suivre, sauf si elles violent la loi ou ne correspondent plus à votre volonté présumée.", P1)(
    law("Art. 371 et 372 CC", "Écrites, datées et signées : pas besoin de notaire.", a_text="les directives",
        note="Le médecin doit les suivre, sauf exceptions prévues par la loi", a_note="Et le médecin"))
S("On vous guide avec un questionnaire, on rédige vos directives en termes précis, et on désigne votre représentant thérapeutique.", P2)(
    lst("Vos directives", "Claires et valables :",
        [("Questionnaire guidé", "un questionnaire"), ("Termes précis", "termes précis"), ("Représentant thérapeutique", "représentant thérapeutique")]))
S("Vous pouvez ensuite les faire inscrire sur votre carte d’assuré. Et la personne de confiance saura quoi dire pour vous.", P2)(
    brand("Vos volontés, écrites clairement.",
          [("shield", "Carte d’assuré", "carte d’assuré"), ("user", "Personne de confiance", "la personne de confiance"),
           ("check", "Volontés claires", "quoi dire")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez vos directives, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
