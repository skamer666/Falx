"""Vidéo de service — Réclamation contre une taxation (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, lst, process, ruler, title, warn

AUDIENCE = "particuliers"
SLUG = "reclamation-taxation-impots"
NAME = "Réclamation contre une taxation"

META = {
    "title": "Réclamation contre une taxation d’impôt",
    "yt_title": "Réclamation contre une taxation d'impôt en Suisse : délai de 30 jours (art. 132 LIFD)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Réclamation contre une taxation : déduction refusée, revenu estimé d'office, erreur de calcul ? La réclamation doit être déposée "
                 "dans les 30 jours dès la notification, par écrit et motivée (art. 132 LIFD, règles similaires dans les cantons). Thrax Legal "
                 "compare votre déclaration et la décision, et rédige votre réclamation, à prix fixe."),
    "tags": ["réclamation taxation", "décision de taxation", "contester ses impôts", "taxation d'office", "art. 132 LIFD", "déduction refusée",
             "impôts Suisse", "impôt fédéral direct", "Suisse romande", "Thrax Legal"],
    "thumb": ("Taxation", "erronée ?", "Réclamez à temps"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Réclamation contre une taxation : déduction refusée, revenu estimé d’office, erreur de calcul ?")(
    title("Particuliers · Impôts", "Votre taxation est fausse ?",
          chips=[("Déduction", "déduction refusée"), ("Taxé d’office", "estimé d’office"), ("Erreur", "erreur de calcul")]))
S("Attention : le délai ne peut pas être prolongé. Il est fixé par la loi.", P1)(
    warn("Le délai ne peut pas être prolongé.", sub="Il est fixé par la loi.", a_sub="Il est", label="Le risque"))
S("La réclamation doit être déposée dans les trente jours dès la notification de la décision, par écrit et motivée. Des règles similaires s’appliquent dans les cantons.", P1)(
    ruler("Art. 132 LIFD", "Le délai de réclamation", 40,
          [(30, "30 jours", "Dès la notification", "trente jours")],
          note=("Par écrit et motivée, règles similaires dans les cantons", "par écrit")))
S("On compare votre déclaration et la décision, on rassemble les arguments et les pièces à joindre, et on rédige la réclamation, prête à envoyer.", P2)(
    lst("La réclamation", "Ce qu’on fait :",
        [("Déclaration et décision comparées", "on compare"), ("Arguments et pièces", "les arguments"),
         ("Réclamation prête à envoyer", "la réclamation")]))
S("Bon à savoir : l’autorité réexamine toute la taxation. On vérifie donc ce risque avant de déposer.", P2)(
    brand("Réclamez sans mauvaise surprise.",
          [("search", "Taxation réexaminée", "toute la taxation"), ("shield", "Risque vérifié", "ce risque"),
           ("mail", "Avant de déposer", "avant de déposer")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre réclamation, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
