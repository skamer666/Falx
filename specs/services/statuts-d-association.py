"""Vidéo de service — Statuts d'association (entreprises)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, lst, process, title, warn

AUDIENCE = "entreprises"
SLUG = "statuts-d-association"
NAME = "Statuts d’association"

META = {
    "title": "Statuts d’association : créez votre association",
    "yt_title": "Statuts d'association en Suisse : créer une association conforme au Code civil (art. 60 CC)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour entreprises", "https://thrax-legal.ch/fr/entreprises")],
    "yt_intro": ("Statuts d'association : club, association culturelle, projet de quartier ? Les statuts doivent être écrits et indiquer le but, "
                 "les ressources et l'organisation de l'association (art. 60 CC). Thrax Legal rédige des statuts clairs et le procès-verbal de "
                 "l'assemblée constitutive, à prix fixe."),
    "tags": ["statuts d'association", "créer une association", "association Suisse", "art. 60 CC", "assemblée constitutive",
             "procès-verbal", "club", "registre du commerce", "Suisse romande", "Thrax Legal"],
    "thumb": ("Créer une", "association ?", "Des statuts clairs"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, service juridique externalisé à prix fixe pour les indépendants et les PME de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Statuts d’association : un club, une association culturelle, un projet de quartier… vous voulez créer votre association ?")(
    title("Entreprises · Statuts d’association", "Vous créez une association ?",
          chips=[("Club", "un club"), ("Culture", "culturelle"), ("Quartier", "projet de quartier")]))
S("Des statuts flous, et ce sont les conflits entre membres qui commencent. Sur le but, l’argent ou les décisions.", P1)(
    warn("Des statuts flous créent des conflits.", sub="Sur le but, l’argent ou les décisions.", a_sub="Sur le but", label="Le risque"))
S("La loi est claire : les statuts doivent être écrits et indiquer le but, les ressources et l’organisation de l’association.", P1)(
    law("Art. 60 CC", "Des statuts écrits : but, ressources, organisation.", a_text="les statuts"))
S("On rédige des statuts complets, conformes au Code civil, et le procès-verbal de l’assemblée constitutive. Avec les indications pour le registre du commerce, si nécessaire.", P2)(
    lst("Le dossier", "Ce qu’on rédige :",
        [("Statuts complets", "des statuts"), ("Procès-verbal constitutif", "le procès-verbal"),
         ("Registre du commerce si besoin", "le registre")]))
S("But, organes, membres, finances : tout est clair dès le départ. Et l’assemblée générale pourra les modifier plus tard.", P2)(
    brand("Une association bien construite.",
          [("search", "But", "but"), ("building", "Organes", "organes"), ("user", "Membres", "membres"), ("receipt", "Finances", "finances")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez vos statuts, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
