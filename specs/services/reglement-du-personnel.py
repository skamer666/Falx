"""Vidéo de service — Règlement du personnel (entreprises)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, cards, law, process, title, warn

AUDIENCE = "entreprises"
SLUG = "reglement-du-personnel"
NAME = "Règlement du personnel"

META = {
    "title": "Règlement du personnel : des règles claires",
    "yt_title": "Règlement du personnel pour PME suisse : horaires, vacances, télétravail, frais",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour entreprises", "https://thrax-legal.ch/fr/entreprises")],
    "yt_intro": ("Règlement du personnel : dès quelques employés, il évite de renégocier chaque règle et les inégalités de traitement. Il doit "
                 "être porté à la connaissance des employés et intégré aux contrats pour leur être opposable. Thrax Legal le rédige pour votre "
                 "entreprise, en cohérence avec vos contrats et la convention collective, à prix fixe."),
    "tags": ["règlement du personnel", "règlement interne", "télétravail", "horaires de travail", "frais professionnels",
             "convention collective", "ressources humaines", "PME", "PME Suisse romande", "Thrax Legal"],
    "thumb": ("Règles", "d’équipe ?", "Un règlement clair pour tous"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, service juridique externalisé à prix fixe pour les indépendants et les PME de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Règlement du personnel : horaires, vacances, frais, télétravail… votre équipe grandit ?")(
    title("Entreprises · Règlement du personnel", "Votre équipe grandit ?",
          chips=[("Horaires", "horaires"), ("Vacances", "vacances"), ("Télétravail", "télétravail")]))
S("Sans règles écrites, chaque question se renégocie. Et les inégalités de traitement s’installent.", P1)(
    warn("Sans règles écrites, tout se renégocie.", sub="Et les inégalités de traitement s’installent.", a_sub="Et les", label="Le risque"))
S("Bon à savoir : le règlement doit être porté à la connaissance des employés et intégré aux contrats pour leur être opposable.", P1)(
    law("Bon à savoir", "Communiqué et intégré aux contrats : sinon, il ne vaut rien.", a_text="le règlement",
        note="Il doit être porté à la connaissance des employés", a_note="porté à la connaissance"))
S("On part d’un questionnaire sur vos pratiques, puis on rédige un règlement complet : temps de travail, absences, frais, télétravail, informatique et données.", P2)(
    cards("Le règlement", "Complet, pour votre entreprise :",
          [("clock", "Temps de travail", "", "temps de travail"), ("cal", "Absences", "", "absences"), ("receipt", "Frais", "", "frais"),
           ("home", "Télétravail", "", "télétravail"), ("data", "Informatique", "", "informatique"), ("lock", "Données", "", "et données")]))
S("En cohérence avec vos contrats et la convention collective. Avec des conseils de mise en place, et un tour de corrections.", P2)(
    brand("Des règles claires pour tous.",
          [("doc", "Cohérent", "en cohérence"), ("chat", "Mise en place", "mise en place"), ("pen", "Corrections", "un tour")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre règlement, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
