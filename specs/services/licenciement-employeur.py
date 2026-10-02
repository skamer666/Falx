"""Vidéo de service — Licenciement sécurisé (entreprises)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, cards, lst, process, title, warn

AUDIENCE = "entreprises"
SLUG = "licenciement-employeur"
NAME = "Licenciement sécurisé"

META = {
    "title": "Licenciement sécurisé : évitez le congé nul",
    "yt_title": "Licencier un employé en Suisse sans erreur : périodes de protection et congé abusif (art. 336c CO)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour entreprises", "https://thrax-legal.ch/fr/entreprises"),
              ("Le guide complet", "https://thrax-legal.ch/fr/guide/contrat-de-travail-suisse-pme")],
    "yt_intro": ("Licenciement sécurisé : un licenciement mal préparé peut être nul ou abusif. Un congé donné pendant une période de protection "
                 "(maladie, accident, grossesse, service) est nul (art. 336c CO), et un congé abusif peut coûter jusqu'à six mois de salaire "
                 "(art. 336a CO). Thrax Legal vérifie les délais et rédige la lettre de licenciement, à prix fixe."),
    "tags": ["licenciement", "licencier un employé Suisse", "lettre de licenciement", "période de protection", "art. 336c CO",
             "congé abusif", "art. 336a CO", "employeur", "PME Suisse romande", "Thrax Legal"],
    "thumb": ("Licencier", "sans risque ?", "Un congé conforme"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, service juridique externalisé à prix fixe pour les indépendants et les PME de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Licenciement : vous devez vous séparer d’un employé, et vous voulez que le congé soit conforme ?")(
    title("Entreprises · Licenciement", "Vous devez licencier un employé ?",
          chips=[("Séparation", "vous séparer"), ("Conforme", "conforme")]))
S("Un licenciement mal préparé peut être nul. Ou abusif, et coûter jusqu’à six mois de salaire.", P1)(
    warn("Un licenciement mal préparé peut être nul ou abusif.", sub="Un congé abusif : jusqu’à six mois de salaire.", a_sub="Ou abusif", label="Le risque"))
S("Un congé donné pendant une période de protection est nul : maladie, accident, grossesse ou service.", P1)(
    cards("Art. 336c CO", "Périodes de protection :",
          [("shield", "Maladie", "", "maladie"), ("cross", "Accident", "", "accident"),
           ("user", "Grossesse", "", "grossesse"), ("cal", "Service", "", "service")], a_head="période de protection"))
S("On vérifie le délai de congé et la date de fin, on contrôle les périodes de protection, et on rédige la lettre de licenciement avec la motivation écrite.", P2)(
    lst("Le dossier", "Ce qu’on fait :",
        [("Délai et date de fin vérifiés", "on vérifie"), ("Périodes de protection", "on contrôle"),
         ("Lettre et motivation écrite", "la lettre")]))
S("Et les points d’attention : solde de vacances, certificat, assurances. Pour un licenciement immédiat, on évalue le risque avant tout.", P2)(
    brand("Un licenciement conforme.",
          [("cal", "Solde de vacances", "solde de vacances"), ("doc", "Certificat", "certificat"),
           ("shield", "Assurances", "assurances"), ("scale", "Risque évalué", "on évalue")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre lettre, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
