"""Vidéo de service — Politique de confidentialité du site (entreprises)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, lst, process, title, warn

AUDIENCE = "entreprises"
SLUG = "politique-de-confidentialite"
NAME = "Politique de confidentialité"

META = {
    "title": "Politique de confidentialité du site",
    "yt_title": "Politique de confidentialité conforme à la nLPD pour votre site web (art. 19 nLPD)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour entreprises", "https://thrax-legal.ch/fr/entreprises"),
              ("Le guide complet", "https://thrax-legal.ch/fr/guide/conformite-nlpd-pme")],
    "yt_intro": ("Politique de confidentialité du site : formulaire, statistiques, newsletter ? Une politique générique qui ne correspond pas à vos "
                 "traitements réels ne remplit pas le devoir d'information (art. 19 nLPD). Thrax Legal fait l'inventaire des outils de votre site "
                 "et rédige la politique de confidentialité et les mentions légales, à prix fixe."),
    "tags": ["politique de confidentialité", "nLPD", "site web", "mentions légales", "art. 19 nLPD", "cookies", "analytics",
             "newsletter", "PME Suisse romande", "Thrax Legal"],
    "thumb": ("Votre site", "conforme ?", "Une politique sur mesure"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, service juridique externalisé à prix fixe pour les indépendants et les PME de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Politique de confidentialité : votre site collecte des données, via un formulaire, des statistiques ou une newsletter ?")(
    title("Entreprises · Confidentialité", "Votre site collecte des données ?",
          chips=[("Formulaire", "formulaire"), ("Statistiques", "statistiques"), ("Newsletter", "newsletter")]))
S("Un modèle copié ailleurs décrit souvent des outils que vous n’utilisez pas. Et oublie ceux que vous utilisez.", P1)(
    warn("Un modèle copié ailleurs ne décrit pas votre site.", sub="Il oublie les outils que vous utilisez.", a_sub="Et oublie", label="Le risque"))
S("Une politique générique, qui ne correspond pas à vos traitements réels, ne remplit pas le devoir d’information.", P1)(
    law("Art. 19 nLPD", "Une politique générique ne remplit pas le devoir d’information.", a_text="une politique générique"))
S("On fait l’inventaire des outils de votre site, puis on rédige une politique de confidentialité complète, et les mentions légales.", P2)(
    lst("Le service", "Adapté à vos outils réels :",
        [("Inventaire des outils", "l’inventaire"), ("Politique complète", "une politique"), ("Mentions légales", "les mentions légales")]))
S("Hébergeur, analytics, formulaires, newsletter : tout est couvert. Et on vous dit si un bandeau cookies est nécessaire.", P2)(
    brand("Un site en règle.",
          [("data", "Hébergeur", "hébergeur"), ("search", "Analytics", "analytics"), ("mail", "Newsletter", "newsletter"),
           ("check", "Bandeau cookies ?", "un bandeau")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre politique, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
