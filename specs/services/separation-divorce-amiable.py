"""Vidéo de service — Divorce à l’amiable sans enfants mineurs (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, lst, process, title, warn

AUDIENCE = "particuliers"
SLUG = "separation-divorce-amiable"
NAME = "Divorce à l’amiable"

META = {
    "title": "Divorce à l’amiable sans enfants mineurs",
    "yt_title": "Divorce à l'amiable en Suisse sans enfants mineurs : convention et requête commune (art. 111 CC)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Divorce à l'amiable sans enfants mineurs : vous êtes d'accord sur l'essentiel et voulez éviter une procédure longue ? Le divorce "
                 "sur requête commune ne requiert pas d'avocat : les époux déposent eux-mêmes la requête et la convention (art. 111 CC). "
                 "Thrax Legal rédige, de façon neutre et pour vous deux, la convention et la requête commune, à prix fixe."),
    "tags": ["divorce à l'amiable", "divorce Suisse", "requête commune de divorce", "convention de divorce", "art. 111 CC",
             "partage du 2e pilier", "divorce sans enfants", "séparation", "Suisse romande", "Thrax Legal"],
    "thumb": ("Divorce", "amiable ?", "Une convention pour vous deux"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Divorce à l’amiable : vous êtes d’accord sur l’essentiel, sans enfants mineurs, et vous voulez éviter une procédure longue ?")(
    title("Particuliers · Divorce à l’amiable", "Divorcer à l’amiable, sans conflit ?",
          chips=[("D’accord", "d’accord"), ("Sans mineurs", "sans enfants mineurs"), ("Simplicité", "éviter une procédure")]))
S("Attention : le juge vérifie la convention. Elle doit être claire, complète et équitable.", P1)(
    warn("Le juge vérifie la convention.", sub="Elle doit être claire, complète et équitable.", a_sub="Elle doit", label="L’exigence"))
S("Bon à savoir : le divorce sur requête commune ne requiert pas d’avocat. Les époux déposent eux-mêmes la requête et la convention.", P1)(
    law("Art. 111 CC", "Requête commune : pas besoin d’avocat.", a_text="le divorce",
        note="Les époux déposent eux-mêmes la requête et la convention", a_note="les époux"))
S("On commence par un entretien de cadrage avec vous deux, puis on rédige la convention : logement, entretien, biens et partage de la prévoyance professionnelle. "
  "Et la requête commune, prête à déposer, avec la liste des pièces.", P2)(
    lst("Le dossier", "Pour vous deux :",
        [("Entretien de cadrage", "un entretien"), ("Convention complète", "la convention"),
         ("Prévoyance partagée", "la prévoyance"), ("Requête commune prête", "la requête commune")]))
S("Nous intervenons de façon neutre, pour les deux époux, et uniquement s’ils sont d’accord. Avec des enfants mineurs, on vous oriente vers un médiateur familial ou un avocat.", P2)(
    brand("Neutre, pour vous deux.",
          [("scale", "Neutre", "de façon neutre"), ("user", "Pour les deux époux", "pour les deux"),
           ("check", "Accord nécessaire", "uniquement"), ("arrow", "Sinon, on vous oriente", "on vous oriente")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre convention, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
