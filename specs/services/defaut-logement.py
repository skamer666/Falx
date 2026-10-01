"""Vidéo de service — Défaut du logement : réduction de loyer (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, doc, law, process, title, warn

AUDIENCE = "particuliers"
SLUG = "defaut-logement"
NAME = "Défaut du logement : réduction de loyer"

META = {
    "title": "Défaut du logement : obtenir une réduction de loyer",
    "yt_title": "Moisissure, panne, bruit : défaut du logement et réduction de loyer en Suisse (art. 259d CO)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Défaut du logement en Suisse : moisissure, chauffage en panne, infiltration, chantier bruyant. La réduction de loyer est due dès que "
                 "le bailleur connaît le défaut (art. 259d CO), et la consignation du loyer exige un avis écrit et un délai (art. 259g CO). "
                 "Thrax Legal rédige votre avis de défaut et votre demande de réduction, à prix fixe."),
    "tags": ["défaut logement", "réduction de loyer", "moisissure appartement", "consignation du loyer", "art. 259d CO", "art. 259g CO",
             "avis de défaut", "locataire Suisse", "régie", "Thrax Legal"],
    "thumb": ("Moisissure", "ou panne ?", "Obtenez une baisse de loyer"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Défaut du logement : moisissure, chauffage en panne, infiltration ou chantier bruyant ? Un défaut qui dure vous donne des droits.")(
    title("Particuliers · Défaut du logement", "Un défaut dans votre logement ?",
          chips=[("Moisissure", "moisissure"), ("Chauffage", "chauffage"), ("Infiltration", "infiltration"), ("Bruit", "chantier bruyant")]))
S("Mais attention : ne cessez jamais de payer votre loyer. C’est un motif de résiliation.", P1)(
    warn("Ne cessez jamais de payer votre loyer.", sub="C’est un motif de résiliation.", a_sub="C’est un motif", label="Le piège"))
S("La bonne méthode : un avis écrit avec un délai de réparation. La réduction de loyer est due dès que le bailleur connaît le défaut.", P1)(
    law("Art. 259d et 259g CO", "Un avis écrit, un délai, puis la réduction du loyer.", a_text="un avis écrit",
        note="La réduction est due dès que le bailleur connaît le défaut", a_note="La réduction"))
S("On qualifie le défaut, on fixe un délai de réparation, et on demande la réduction de loyer. Tout est prêt à envoyer.", P2)(
    doc("La lettre", "L’avis de défaut", "Clair, daté, avec un délai.", "Avis de défaut",
        [("Le défaut", "Décrit précisément, photos à l’appui", "On qualifie"), ("Le délai", "Pour la réparation", "un délai"),
         ("La réduction", "Demandée par écrit", "on demande")],
        stamp=("Prêt à envoyer", "prêt à envoyer"), doc_icon="home"))
S("On vous indique aussi la réduction usuelle selon la gravité du défaut, et comment consigner le loyer si la régie ne réagit pas.", P2)(
    brand("Vos droits de locataire, par écrit.",
          [("search", "Réduction usuelle", "la réduction usuelle"), ("scale", "Selon la gravité", "la gravité"),
           ("lock", "Consignation du loyer", "consigner")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre lettre, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
