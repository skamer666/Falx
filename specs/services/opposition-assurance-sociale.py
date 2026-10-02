"""Vidéo de service — Opposition à une décision d’assurance sociale (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, cards, lst, process, title, warn

AUDIENCE = "particuliers"
SLUG = "opposition-assurance-sociale"
NAME = "Opposition assurance sociale"

META = {
    "title": "Opposition à une décision d’assurance sociale",
    "yt_title": "Opposition à une décision d'assurance sociale : chômage, AVS, caisse maladie (art. 52 LPGA)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Opposition à une décision d'assurance sociale : jours de suspension au chômage, prestation refusée par la caisse maladie, "
                 "rente calculée trop bas. L'opposition doit être formée dans les 30 jours (art. 52 LPGA) et elle est en principe gratuite. "
                 "Thrax Legal analyse la décision et rédige votre opposition, à prix fixe."),
    "tags": ["opposition assurance sociale", "art. 52 LPGA", "suspension chômage", "caisse maladie refus", "décision AVS",
             "assurance accident", "opposition 30 jours", "assurances sociales Suisse", "Suisse romande", "Thrax Legal"],
    "thumb": ("Décision", "injuste ?", "Faites opposition à temps"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Opposition à une décision d’assurance sociale : chômage, AVS, caisse maladie, accident ?")(
    title("Particuliers · Assurances sociales", "Une décision d’assurance injuste ?",
          chips=[("Chômage", "chômage"), ("AVS", "avs"), ("Caisse maladie", "caisse maladie"), ("Accident", "accident")]))
S("Jours de suspension, prestation refusée, rente trop basse… Une décision n’est pas une fatalité : vous pouvez faire opposition.", P1)(
    warn("Une décision n’est pas une fatalité.", sub="Vous pouvez faire opposition.", a_sub="vous pouvez", label="Bon à savoir"))
S("L’opposition doit être formée dans les trente jours. Elle est en principe gratuite. Et pour l’assurance-invalidité, la procédure est différente.", P1)(
    cards("Art. 52 LPGA", "Trois choses à savoir :",
          [("clock", "30 jours", "Pour faire opposition", "trente jours"),
           ("check", "Gratuite", "En principe", "gratuite"),
           ("question", "Cas de l’AI", "Procédure différente", "l’assurance-invalidité")]))
S("On analyse la décision et les règles applicables, on rassemble les arguments et les pièces, et on rédige votre opposition, prête à envoyer.", P2)(
    lst("L’opposition", "Ce qu’on fait :",
        [("Décision analysée", "on analyse"), ("Arguments et pièces", "les arguments"), ("Opposition prête à envoyer", "votre opposition")]))
S("Et si l’opposition est rejetée, un recours au tribunal cantonal est possible. On vous dit alors si un avocat est recommandé.", P2)(
    brand("Vos prestations, réclamées.",
          [("gavel", "Recours possible", "un recours"), ("building", "Tribunal cantonal", "tribunal cantonal"),
           ("check", "Avis honnête", "si un avocat")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre opposition, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
