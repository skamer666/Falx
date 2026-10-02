"""Vidéo de service — Litige de voisinage : courrier formel (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, lst, process, title, warn

AUDIENCE = "particuliers"
SLUG = "litige-de-voisinage"
NAME = "Litige de voisinage"

META = {
    "title": "Litige de voisinage : le courrier formel",
    "yt_title": "Litige de voisinage en Suisse : bruit, plantations, nuisances, le courrier formel (art. 684 CC)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Litige de voisinage : bruit, plantations, limites, nuisances. Chacun doit s'abstenir de tout excès au détriment des voisins "
                 "(art. 684 CC), et les distances des plantations sont fixées par le droit cantonal. Thrax Legal rédige votre courrier formel, "
                 "ferme mais courtois, au voisin ou à la régie, à prix fixe."),
    "tags": ["litige de voisinage", "conflit de voisinage", "bruit voisin", "nuisances", "plantations", "art. 684 CC", "droit de voisinage",
             "régie", "Suisse romande", "Thrax Legal"],
    "thumb": ("Voisin", "pénible ?", "Un courrier ferme et posé"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Litige de voisinage : bruit, plantations, limites, nuisances… et les discussions n’ont rien donné ?")(
    title("Particuliers · Voisinage", "Un voisin qui dépasse les bornes ?",
          chips=[("Bruit", "bruit"), ("Plantations", "plantations"), ("Nuisances", "nuisances")]))
S("La situation dure, la tension monte. Et rien ne bouge.", P1)(
    warn("La situation dure, la tension monte.", sub="Et rien ne bouge.", a_sub="Et rien", label="Le risque"))
S("Pourtant, la loi est claire : chacun doit s’abstenir de tout excès au détriment de ses voisins. "
  "Et pour les arbres et les plantations, les distances sont fixées par le droit cantonal.", P1)(
    law("Art. 684 CC", "Chacun doit s’abstenir de tout excès envers ses voisins.", a_text="chacun doit",
        note="Distances des arbres et plantations : fixées par le droit cantonal", a_note="Et pour"))
S("On analyse la situation et les règles applicables, on rédige un courrier formel au voisin ou à la régie, et on vous conseille pour constituer des preuves.", P2)(
    lst("Le courrier", "Posé et fondé :",
        [("Règles applicables analysées", "on analyse"), ("Courrier au voisin ou à la régie", "un courrier formel"),
         ("Conseils pour les preuves", "constituer des preuves")]))
S("Le ton est ferme mais courtois, pour ouvrir une solution plutôt qu’un conflit. Et si vous êtes locataire, on vous dit à qui écrire.", P2)(
    brand("Une solution, pas un conflit.",
          [("mail", "Ferme mais courtois", "ferme mais courtois"), ("check", "Une solution", "une solution"),
           ("home", "Le bon destinataire", "si vous êtes locataire")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre courrier, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
