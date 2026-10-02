"""Vidéo de service — Résiliation anticipée du bail (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, cards, lst, process, title, warn

AUDIENCE = "particuliers"
SLUG = "resiliation-anticipee-bail"
NAME = "Résiliation anticipée du bail"

META = {
    "title": "Résiliation anticipée du bail : partez plus tôt",
    "yt_title": "Résiliation anticipée du bail : partir plus tôt avec un locataire de remplacement (art. 264 CO)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Résiliation anticipée du bail : vous devez déménager avant l'échéance ? En présentant un locataire de remplacement solvable, "
                 "acceptable pour le bailleur et prêt à reprendre le bail aux mêmes conditions (art. 264 CO), vous pouvez vous libérer plus tôt. "
                 "Pour le logement de la famille, les deux époux signent (art. 266m CO). Thrax Legal rédige vos lettres, à prix fixe."),
    "tags": ["résiliation anticipée bail", "locataire de remplacement", "quitter son appartement", "art. 264 CO", "art. 266m CO",
             "résilier son bail", "déménagement", "droit du bail Suisse", "Suisse romande", "Thrax Legal"],
    "thumb": ("Bail :", "partir tôt ?", "Libérez-vous plus tôt"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Résiliation anticipée du bail : vous devez déménager avant l’échéance, sans payer des mois de loyer pour rien ?")(
    title("Particuliers · Résiliation anticipée", "Déménager avant la fin du bail ?",
          chips=[("Déménagement", "déménager"), ("Échéance", "l’échéance"), ("Loyers", "des mois")]))
S("Sans démarche correcte, le loyer continue de courir jusqu’à l’échéance. Parfois pendant des mois.", P1)(
    warn("Sans démarche correcte, le loyer continue de courir.", sub="Parfois pendant des mois.", a_sub="Parfois", label="Le risque"))
S("La solution : présenter un locataire de remplacement solvable, acceptable pour le bailleur, et prêt à reprendre le bail aux mêmes conditions.", P1)(
    cards("Art. 264 CO", "Le locataire de remplacement doit être :",
          [("receipt", "Solvable", "Il peut payer le loyer", "solvable"),
           ("check", "Acceptable", "Pour le bailleur", "acceptable"),
           ("doc", "Aux mêmes conditions", "Il reprend le bail tel quel", "mêmes conditions")], a_head="présenter"))
S("On calcule l’échéance ordinaire et les délais, on rédige la lettre de résiliation anticipée, et la lettre de présentation de votre candidat.", P2)(
    lst("Les lettres", "Ce qu’on prépare :",
        [("Échéance et délais calculés", "on calcule"), ("Lettre de résiliation", "la lettre de résiliation"),
         ("Présentation du candidat", "la lettre de présentation")]))
S("Un seul candidat suffit s’il remplit les conditions. Le bailleur ne peut le refuser que pour de justes motifs. Et pour le logement de la famille, les deux époux signent.", P2)(
    brand("Libéré plus tôt, proprement.",
          [("user", "Un candidat suffit", "un seul candidat"), ("scale", "Refus encadré", "justes motifs"),
           ("pen", "Les deux époux signent", "les deux époux")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez vos lettres, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
