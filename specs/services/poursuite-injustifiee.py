"""Vidéo de service — Poursuite injustifiée : opposition et radiation (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, lst, process, ruler, title, warn

AUDIENCE = "particuliers"
SLUG = "poursuite-injustifiee"
NAME = "Poursuite injustifiée"

META = {
    "title": "Poursuite injustifiée : opposition et radiation",
    "yt_title": "Poursuite injustifiée en Suisse : faire opposition et la faire disparaître de l'extrait (art. 8a LP)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Poursuite injustifiée en Suisse : vous avez reçu un commandement de payer pour une dette que vous contestez ? L'opposition se fait "
                 "dans les 10 jours (art. 74 LP), gratuitement et sans motif. Trois mois plus tard, vous pouvez demander que la poursuite ne soit "
                 "plus communiquée aux tiers (art. 8a LP). Thrax Legal vous guide et rédige la demande, à prix fixe."),
    "tags": ["poursuite injustifiée", "commandement de payer", "opposition commandement de payer", "extrait du registre des poursuites",
             "non-divulgation poursuite", "art. 8a LP", "art. 74 LP", "office des poursuites", "Suisse romande", "Thrax Legal"],
    "thumb": ("Poursuite", "injuste ?", "Faites opposition à temps"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Poursuite injustifiée : vous avez reçu un commandement de payer pour une dette que vous contestez ?")(
    title("Particuliers · Poursuite injustifiée", "Un commandement de payer injustifié ?",
          chips=[("Commandement", "commandement de payer"), ("Dette contestée", "une dette")]))
S("Et cette poursuite peut apparaître dans votre extrait, par exemple face à un futur bailleur.", P1)(
    warn("La poursuite peut apparaître dans votre extrait.", sub="Par exemple face à un futur bailleur.", a_sub="par exemple", label="Le risque"))
S("L’opposition doit être faite dans les dix jours dès la notification. Elle est gratuite et n’a pas à être motivée. "
  "Trois mois plus tard, si le créancier n’a pas agi, vous pouvez demander que la poursuite ne soit plus communiquée aux tiers.", P1)(
    ruler("Art. 74 et 8a LP", "Deux délais à connaître", 100,
          [(10, "10 jours", "Pour faire opposition", "dans les dix jours"), (90, "3 mois", "Demande de non-divulgation", "Trois mois")],
          note=("Opposition gratuite, sans motif à donner", "Elle est gratuite")))
S("On vérifie le commandement de payer et les délais, on vous explique comment faire opposition, puis on rédige la demande de non-divulgation au bon moment.", P2)(
    lst("L’accompagnement", "On s’occupe de tout :",
        [("Commandement et délais vérifiés", "le commandement"), ("Comment faire opposition", "comment faire"),
         ("Demande de non-divulgation", "la demande")]))
S("La demande est rédigée à votre nom, adressée à l’office des poursuites, prête à envoyer.", P2)(
    brand("Votre extrait de poursuites, propre.",
          [("user", "À votre nom", "à votre nom"), ("building", "Office des poursuites", "l’office"), ("mail", "Prête à envoyer", "prête à envoyer")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre lettre, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
