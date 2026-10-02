"""Vidéo de service — Convention de concubinage (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, cards, law, process, title, warn

AUDIENCE = "particuliers"
SLUG = "convention-de-concubinage"
NAME = "Convention de concubinage"

META = {
    "title": "Convention de concubinage : tout prévoir",
    "yt_title": "Convention de concubinage en Suisse : logement, frais, biens et séparation",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Convention de concubinage : les couples non mariés n'ont presque aucune règle légale qui les protège. Sans testament, aucun "
                 "partenaire n'hérite de l'autre, et le logement commun n'est pas protégé comme celui des époux. Thrax Legal rédige votre "
                 "convention sur mesure : logement, frais, biens communs et séparation, à prix fixe."),
    "tags": ["convention de concubinage", "concubinage Suisse", "couple non marié", "séparation concubins", "logement commun",
             "testament partenaire", "biens communs", "union libre", "Suisse romande", "Thrax Legal"],
    "thumb": ("Couple", "non marié ?", "Tout prévoir, noir sur blanc"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Convention de concubinage : vous vivez en couple sans être mariés, avec un logement, des frais et des biens en commun ?")(
    title("Particuliers · Concubinage", "En couple, sans être mariés ?",
          chips=[("Logement", "un logement"), ("Frais", "des frais"), ("Biens", "des biens")]))
S("Les couples non mariés n’ont presque aucune règle légale qui les protège. Surtout en cas de séparation.", P1)(
    warn("Non mariés : presque aucune protection légale.", sub="Surtout en cas de séparation.", a_sub="surtout", label="Le risque"))
S("Sans testament, aucun partenaire n’hérite de l’autre. Et le logement commun n’est pas protégé comme celui des époux.", P1)(
    law("Concubinage", "Sans testament, votre partenaire n’hérite pas.", a_text="sans testament",
        note="Le logement commun n’est pas protégé comme celui des époux", a_note="Et le logement"))
S("La convention règle le logement, les frais, les biens achetés ensemble, et ce qui se passe en cas de séparation.", P2)(
    cards("La convention", "Tout est prévu :",
          [("home", "Logement", "", "règle le logement"), ("receipt", "Frais communs", "", "les frais"),
           ("brief", "Biens communs", "", "les biens"), ("arrow", "Séparation", "", "de séparation")]))
S("Elle est valable sans notaire, signée par vous deux. Et on vous recommande les compléments utiles : testament, prévoyance, assurance.", P2)(
    brand("Tout est prévu, noir sur blanc.",
          [("pen", "Sans notaire", "sans notaire"), ("doc", "Testament", "testament"),
           ("shield", "Prévoyance", "prévoyance"), ("check", "Assurance", "assurance")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre convention, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
