"""Vidéo de service — CGV sur mesure (entreprises)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, lst, process, title, warn

AUDIENCE = "entreprises"
SLUG = "cgv-sur-mesure"
NAME = "CGV sur mesure"

META = {
    "title": "CGV sur mesure : des conditions qui vous protègent",
    "yt_title": "CGV en Suisse : des conditions générales sur mesure qui protègent vraiment votre entreprise",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour entreprises", "https://thrax-legal.ch/fr/entreprises"),
              ("Le guide complet", "https://thrax-legal.ch/fr/guide/cgv-suisses-guide")],
    "yt_intro": ("CGV en Suisse : des conditions générales copiées d'un concurrent ne vous protègent pas. Envers les consommateurs, les clauses "
                 "déséquilibrées sont déloyales (art. 8 LCD), et des CGV ne valent que si le client a pu les lire avant de conclure. "
                 "Thrax Legal rédige vos CGV sur mesure, à prix fixe."),
    "tags": ["CGV", "CGV Suisse", "conditions générales de vente", "rédiger CGV", "art. 8 LCD", "clauses abusives",
             "boutique en ligne", "PME Suisse romande", "contrat", "Thrax Legal"],
    "thumb": ("CGV", "copiées ?", "Des CGV qui vous protègent"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, service juridique externalisé à prix fixe pour les indépendants et les PME de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("CGV sur mesure : vos conditions générales sont copiées d’un concurrent, ou vous n’en avez pas ?")(
    title("Entreprises · CGV", "Vos CGV vous protègent vraiment ?",
          chips=[("Copiées", "copiées"), ("Absentes", "vous n’en avez pas")]))
S("Des CGV copiées ne vous protègent pas : retards de paiement, garantie, responsabilité, tout se joue là.", P1)(
    warn("Des CGV copiées ne vous protègent pas.", sub="Paiement, garantie, responsabilité : tout se joue là.", a_sub="retards de paiement", label="Le risque"))
S("Envers les consommateurs, les clauses déséquilibrées sont déloyales. Et des CGV ne valent que si le client a pu les lire avant de conclure.", P1)(
    law("Art. 8 LCD", "Envers les consommateurs, les clauses déséquilibrées sont déloyales.",
        note="Et des CGV ne valent que si le client a pu les lire avant de conclure", a_note="Et des CGV"))
S("On rédige des CGV complètes : commande et prix, paiement et retard, garantie et responsabilité, et for juridique.", P2)(
    lst("Le contenu", "Des CGV complètes :",
        [("Commande et prix", "commande et prix"), ("Paiement et retard", "paiement et retard"),
         ("Garantie et responsabilité", "garantie et responsabilité"), ("For juridique", "for juridique")]))
S("Adaptées à votre activité, à vos clients, entreprises ou particuliers, avec des conseils pour les intégrer valablement à votre site, vos offres et vos factures.", P2)(
    brand("Adaptées à votre activité.",
          [("brief", "Votre activité", "votre activité"), ("user", "Vos clients", "vos clients"),
           ("link", "Site et offres", "votre site"), ("receipt", "Vos factures", "vos factures")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez vos CGV, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
