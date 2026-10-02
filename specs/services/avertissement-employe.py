"""Vidéo de service — Avertissement écrit (entreprises)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, doc, law, process, title, warn

AUDIENCE = "entreprises"
SLUG = "avertissement-employe"
NAME = "Avertissement écrit"

META = {
    "title": "Avertissement écrit à un employé",
    "yt_title": "Avertissement écrit à un employé en Suisse : un avertissement qui tient en cas de litige",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour entreprises", "https://thrax-legal.ch/fr/entreprises")],
    "yt_intro": ("Avertissement écrit : retards répétés, comportement inadéquat, consignes ignorées. Pour un manquement de gravité moyenne, "
                 "un licenciement immédiat suppose en principe un avertissement préalable resté sans effet. Thrax Legal rédige un avertissement "
                 "précis et proportionné, prêt à remettre, à prix fixe."),
    "tags": ["avertissement écrit", "avertissement employé", "lettre d'avertissement", "licenciement immédiat", "manquements",
             "employeur", "ressources humaines", "droit du travail Suisse", "PME Suisse romande", "Thrax Legal"],
    "thumb": ("Avertir", "un employé ?", "Un avertissement qui tient"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, service juridique externalisé à prix fixe pour les indépendants et les PME de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Avertissement écrit : retards répétés, comportement inadéquat, consignes ignorées ?")(
    title("Entreprises · Avertissement", "Un employé qui ne respecte pas les règles ?",
          chips=[("Retards", "retards"), ("Comportement", "comportement"), ("Consignes", "consignes")]))
S("Un avertissement oral ne laisse aucune trace. Et un écrit vague ne tient pas en cas de litige.", P1)(
    warn("Un avertissement vague ne tient pas.", sub="Surtout en cas de litige.", a_sub="Et un écrit", label="Le risque"))
S("Pour un manquement de gravité moyenne, un licenciement immédiat suppose en principe un avertissement préalable resté sans effet.", P1)(
    law("Bon à savoir", "Avant un licenciement immédiat, un avertissement préalable.", a_text="pour un manquement",
        note="Pour un manquement de gravité moyenne, en principe", a_note="un licenciement immédiat"))
S("On décrit les manquements de façon factuelle, on fixe des attentes claires et on annonce les conséquences.", P2)(
    doc("L’avertissement", "Ce qu’il doit contenir", "Précis et proportionné.", "Avertissement",
        [("Les faits", "Décrits avec les dates", "les manquements"), ("Les attentes", "Claires", "des attentes"),
         ("Les conséquences", "Annoncées", "les conséquences")],
        stamp=("Prêt à remettre", "on annonce"), doc_icon="doc"))
S("Il est prêt à remettre, à votre en-tête. Pour garder une preuve, faites-le signer pour réception, ou remettez-le devant témoin.", P2)(
    brand("Un avertissement qui tient.",
          [("pen", "Signature", "signer"), ("user", "Ou un témoin", "devant témoin"), ("shield", "Entreprise protégée", "prêt à remettre")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre avertissement, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
