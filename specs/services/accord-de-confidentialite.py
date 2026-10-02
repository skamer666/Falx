"""Vidéo de service — Accord de confidentialité (NDA) (entreprises)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, cards, law, process, title, warn

AUDIENCE = "entreprises"
SLUG = "accord-de-confidentialite"
NAME = "Accord de confidentialité (NDA)"

META = {
    "title": "Accord de confidentialité (NDA)",
    "yt_title": "NDA en Suisse : accord de confidentialité avec peine conventionnelle (art. 160 ss CO)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour entreprises", "https://thrax-legal.ch/fr/entreprises")],
    "yt_intro": ("Accord de confidentialité (NDA) : avant de présenter un projet, un savoir-faire ou des chiffres, protégez-les. Une peine "
                 "conventionnelle (art. 160 ss CO) évite de devoir prouver le montant exact du dommage en cas de violation. Thrax Legal rédige "
                 "votre NDA, unilatéral ou réciproque, adapté à votre projet, à prix fixe."),
    "tags": ["accord de confidentialité", "NDA", "NDA Suisse", "peine conventionnelle", "art. 160 CO", "secret d'affaires",
             "savoir-faire", "startup", "PME Suisse romande", "Thrax Legal"],
    "thumb": ("NDA :", "protégé ?", "Protégez vos idées"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, service juridique externalisé à prix fixe pour les indépendants et les PME de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Accord de confidentialité : avant de présenter un projet, un savoir-faire ou des chiffres ?")(
    title("Entreprises · NDA", "Vous allez présenter un projet ?",
          chips=[("Projet", "un projet"), ("Savoir-faire", "savoir-faire"), ("Chiffres", "des chiffres")]))
S("Un modèle gratuit, trouvé en ligne, protège souvent mal ce qui compte pour vous. Ou prévoit une peine inapplicable.", P1)(
    warn("Un modèle gratuit protège souvent mal.", sub="Ou prévoit une peine inapplicable.", a_sub="ou prévoit", label="Le risque"))
S("Bon à savoir : une peine conventionnelle, bien rédigée, évite de devoir prouver le montant exact du dommage en cas de violation.", P1)(
    law("Art. 160 ss CO", "La peine conventionnelle : pas besoin de prouver le dommage exact.", a_text="une peine"))
S("Accord unilatéral ou réciproque selon votre situation, informations protégées définies précisément, peine et durée adaptées.", P2)(
    cards("Le NDA", "Adapté à votre projet :",
          [("arrow", "Unilatéral", "Ou réciproque", "unilatéral"), ("search", "Informations", "Définies précisément", "informations protégées"),
           ("receipt", "Peine", "Dissuasive", "peine"), ("clock", "Durée", "Adaptée", "durée")]))
S("Et en anglais, c’est possible aussi. Vous présentez votre projet, vos chiffres et votre savoir-faire, l’esprit tranquille.", P2)(
    brand("Présentez l’esprit tranquille.",
          [("chat", "En anglais aussi", "en anglais"), ("lock", "Projet protégé", "votre projet"), ("check", "Esprit tranquille", "l’esprit tranquille")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre accord, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
