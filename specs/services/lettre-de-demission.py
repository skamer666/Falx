"""Vidéo de service — Lettre de démission (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, lst, process, ruler, title, warn

AUDIENCE = "particuliers"
SLUG = "lettre-de-demission"
NAME = "Lettre de démission"

META = {
    "title": "Lettre de démission : le bon délai, la bonne date",
    "yt_title": "Lettre de démission en Suisse : délai de congé, date de fin et vacances (art. 335c CO)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Lettre de démission en Suisse : sauf contrat ou convention contraire, le délai de congé est d'un mois la première année, "
                 "deux mois de la deuxième à la neuvième, trois mois ensuite, pour la fin d'un mois (art. 335c CO). Thrax Legal calcule votre "
                 "délai et rédige votre lettre de démission, avec la demande de certificat et le point sur vos vacances, à prix fixe."),
    "tags": ["lettre de démission", "démission Suisse", "délai de congé", "préavis démission", "art. 335c CO", "date de fin de contrat",
             "solde de vacances", "certificat de travail", "Suisse romande", "Thrax Legal"],
    "thumb": ("Démission", "à écrire ?", "Le bon délai, la bonne date"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Lettre de démission : vous voulez quitter votre emploi, sans erreur de date ni conflit inutile ?")(
    title("Particuliers · Lettre de démission", "Vous voulez démissionner sans erreur ?",
          chips=[("Bonne date", "erreur de date"), ("Sans conflit", "conflit inutile")]))
S("Une démission mal datée peut vous coûter un mois de salaire. Ou créer un conflit inutile.", P1)(
    warn("Une démission mal datée peut coûter un mois de salaire.", sub="Ou créer un conflit inutile.", a_sub="Ou créer", label="Le risque"))
S("Sauf contrat contraire, le délai est d’un mois la première année, deux mois de la deuxième à la neuvième, trois mois ensuite, "
  "pour la fin d’un mois. Et la lettre doit arriver avant le début du délai.", P1)(
    ruler("Art. 335c CO", "Le délai de congé", 3.5,
          [(1, "1 mois", "1re année", "la première année"), (2, "2 mois", "2e à 9e année", "deux mois"), (3, "3 mois", "Ensuite", "trois mois")],
          note=("La lettre doit arriver avant le début du délai", "Et la lettre")))
S("On calcule votre délai et la date de fin exacte, on rédige une lettre personnalisée, et on y ajoute la demande de certificat de travail et le point sur vos vacances.", P2)(
    lst("La lettre", "Tout est réglé :",
        [("Délai et date de fin exacts", "on calcule"), ("Lettre personnalisée", "une lettre personnalisée"),
         ("Demande de certificat", "la demande"), ("Solde de vacances", "vos vacances")]))
S("Vous voulez partir plus tôt ? La lettre peut proposer une date anticipée, en respectant le délai légal. Et on vous dit comment l’envoyer pour prouver la date.", P2)(
    brand("Partez proprement.",
          [("cal", "Départ anticipé", "une date anticipée"), ("check", "Délai légal respecté", "le délai légal"),
           ("mail", "Envoi avec preuve", "prouver la date")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre lettre, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
