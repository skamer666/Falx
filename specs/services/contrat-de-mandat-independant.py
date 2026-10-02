"""Vidéo de service — Contrat de mandat pour indépendant (entreprises)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, lst, process, title, warn

AUDIENCE = "entreprises"
SLUG = "contrat-de-mandat-independant"
NAME = "Contrat de mandat pour indépendant"

META = {
    "title": "Contrat de mandat pour indépendant",
    "yt_title": "Contrat de mandat pour indépendant en Suisse : freelance, honoraires, requalification (art. 404 CO)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour entreprises", "https://thrax-legal.ch/fr/entreprises")],
    "yt_intro": ("Contrat de mandat pour indépendant : freelance ou entreprise qui engage un indépendant, un contrat clair évite les malentendus "
                 "et le risque de requalification en contrat de travail. Le statut au sens de l'AVS dépend de la réalité de la collaboration, "
                 "et le mandat peut être résilié en tout temps (art. 404 CO). Thrax Legal rédige votre contrat, à prix fixe."),
    "tags": ["contrat de mandat", "contrat freelance", "indépendant Suisse", "requalification contrat de travail", "statut AVS",
             "art. 404 CO", "propriété intellectuelle", "honoraires", "PME Suisse romande", "Thrax Legal"],
    "thumb": ("Freelance", "contrat ?", "Un contrat freelance solide"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, service juridique externalisé à prix fixe pour les indépendants et les PME de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Contrat de mandat pour indépendant : vous êtes freelance, ou vous engagez un indépendant ?")(
    title("Entreprises · Mandat indépendant", "Un freelance, un vrai contrat ?",
          chips=[("Freelance", "freelance"), ("Indépendant", "un indépendant")]))
S("Sans contrat clair, le risque, c’est une requalification en contrat de travail. Et des malentendus sur la mission.", P1)(
    warn("Le risque : une requalification en contrat de travail.", sub="Et des malentendus sur la mission.", a_sub="et des malentendus", label="Le risque"))
S("Le statut d’indépendant au sens de l’AVS dépend de la réalité de la collaboration, pas seulement du contrat. "
  "Et le mandat peut être résilié en tout temps par chaque partie.", P1)(
    law("AVS et art. 404 CO", "Pour l’AVS, c’est la réalité qui compte, pas seulement le contrat.", a_text="le statut",
        note="Le mandat peut être résilié en tout temps par chaque partie", a_note="et le mandat"))
S("On choisit le bon contrat, mandat ou contrat d’entreprise, on rédige les clauses d’honoraires, de responsabilité et de propriété intellectuelle, "
  "et on signale les points de vigilance sur le statut.", P2)(
    lst("Le contrat", "Ce qu’on rédige :",
        [("Mandat ou entreprise", "on choisit"), ("Honoraires", "les clauses"), ("Responsabilité", "responsabilité"),
         ("Propriété intellectuelle", "propriété intellectuelle"), ("Statut d’indépendant", "les points")]))
S("Et pour plusieurs clients, on peut prévoir un modèle réutilisable. La collaboration reste claire.", P2)(
    brand("Une collaboration claire.",
          [("user", "Plusieurs clients", "plusieurs clients"), ("doc", "Modèle réutilisable", "un modèle"), ("check", "Collaboration claire", "la collaboration")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre contrat, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
