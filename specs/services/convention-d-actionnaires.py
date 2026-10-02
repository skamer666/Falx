"""Vidéo de service — Convention d'actionnaires ou d'associés (entreprises)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, cards, law, process, title, warn

AUDIENCE = "entreprises"
SLUG = "convention-d-actionnaires"
NAME = "Convention d’actionnaires"

META = {
    "title": "Convention d’actionnaires : protégez chaque associé",
    "yt_title": "Convention d'actionnaires en Suisse : gouvernance, sortie, préemption entre associés (SA, Sàrl)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour entreprises", "https://thrax-legal.ch/fr/entreprises")],
    "yt_intro": ("Convention d'actionnaires ou d'associés : les statuts ne règlent pas tout. La convention organise les décisions, l'arrivée et le "
                 "départ d'un associé, et protège chacun en cas de désaccord. Elle lie les associés entre eux, et les peines conventionnelles "
                 "assurent son respect. Thrax Legal la rédige pour votre SA ou votre Sàrl, à prix fixe."),
    "tags": ["convention d'actionnaires", "pacte d'associés", "convention d'associés", "SA", "Sàrl", "droit de préemption",
             "clause de sortie", "gouvernance", "startup Suisse", "Thrax Legal"],
    "thumb": ("Entre", "associés ?", "Des règles claires pour tous"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, service juridique externalisé à prix fixe pour les indépendants et les PME de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Convention d’actionnaires : vous fondez une société à plusieurs, ou un nouvel associé arrive ?")(
    title("Entreprises · Convention d’associés", "Vous êtes plusieurs associés ?",
          chips=[("Fondation", "vous fondez"), ("Nouvel associé", "un nouvel associé")]))
S("Les statuts ne règlent pas tout. Et le jour d’un désaccord, ou du départ d’un associé, c’est trop tard pour négocier.", P1)(
    warn("Les statuts ne règlent pas tout.", sub="Le jour du désaccord, c’est trop tard pour négocier.", a_sub="Et le jour", label="Le risque"))
S("Bon à savoir : la convention lie les associés entre eux, pas la société. Ce sont les peines conventionnelles qui assurent son respect.", P1)(
    law("Bon à savoir", "La convention lie les associés entre eux, pas la société.", a_text="la convention",
        note="Les peines conventionnelles assurent son respect", a_note="ce sont les peines"))
S("Après un entretien de cadrage, on rédige une convention complète : gouvernance, transfert, préemption, sortie et non-concurrence.", P2)(
    cards("La convention", "Tout est prévu :",
          [("building", "Gouvernance", "", "gouvernance"), ("arrow", "Transfert", "", "transfert"), ("lock", "Préemption", "", "préemption"),
           ("user", "Sortie", "", "sortie"), ("shield", "Non-concurrence", "", "non-concurrence"), ("chat", "Cadrage", "", "un entretien")]))
S("Avec des peines conventionnelles et des mécanismes de blocage, et un tour de corrections. Pas besoin de notaire pour la convention elle-même.", P2)(
    brand("Chaque associé protégé.",
          [("receipt", "Peines conventionnelles", "des peines"), ("scale", "Mécanismes de blocage", "mécanismes de blocage"),
           ("pen", "Corrections incluses", "un tour"), ("check", "Sans notaire", "pas besoin")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre convention, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
