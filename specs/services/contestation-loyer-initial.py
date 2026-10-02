"""Vidéo de service — Contestation du loyer initial (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, lst, process, ruler, title, warn

AUDIENCE = "particuliers"
SLUG = "contestation-loyer-initial"
NAME = "Contestation du loyer initial"

META = {
    "title": "Contestation du loyer initial : agissez à temps",
    "yt_title": "Contester le loyer initial en Suisse : loyer abusif à l'entrée, délai de 30 jours (art. 270 CO)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Contestation du loyer initial : votre loyer est nettement plus élevé que celui du locataire précédent ? Le délai est de "
                 "30 jours dès la réception de l'objet loué (art. 270 CO), et l'absence de formule officielle peut aussi être invoquée. "
                 "Thrax Legal analyse vos chances et rédige la requête à l'autorité de conciliation, à prix fixe."),
    "tags": ["contestation loyer initial", "loyer abusif", "loyer trop cher", "art. 270 CO", "formule officielle", "autorité de conciliation",
             "bail à loyer", "locataire Suisse romande", "droit du bail", "Thrax Legal"],
    "thumb": ("Loyer", "trop cher ?", "Contestez à temps"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Contestation du loyer initial : vous venez d’emménager, et votre loyer est nettement plus élevé que celui du locataire précédent ?")(
    title("Particuliers · Loyer initial", "Votre nouveau loyer est trop élevé ?",
          chips=[("Emménagement", "vous venez"), ("Ancien loyer", "locataire précédent")]))
S("Attendre, c’est payer ce loyer chaque mois. Et le délai pour agir est très court.", P1)(
    warn("Attendre, c’est payer ce loyer chaque mois.", sub="Et le délai pour agir est très court.", a_sub="Et le délai", label="Le risque"))
S("Le délai est de trente jours dès la réception de l’objet loué. Et dans plusieurs cantons romands, le bailleur doit communiquer le loyer précédent "
  "sur une formule officielle : son absence peut aussi être invoquée.", P1)(
    ruler("Art. 270 CO", "Un délai à ne pas manquer", 40,
          [(30, "30 jours", "Dès la réception du logement", "trente jours")],
          note=("Sans formule officielle : un argument de plus", "une formule officielle")))
S("On analyse les conditions de contestation, on vérifie la formule officielle, et on rédige la requête à l’autorité de conciliation, prête à déposer.", P2)(
    lst("Le dossier", "Vérifié et rédigé :",
        [("Conditions de contestation", "les conditions"), ("Formule officielle vérifiée", "la formule"),
         ("Requête prête à déposer", "la requête")]))
S("Est-ce risqué pour votre bail ? Le bailleur ne peut pas vous résilier pour ce motif pendant la procédure et les trois ans qui suivent. On vous explique aussi la procédure et les risques.", P2)(
    brand("Contestez sans crainte.",
          [("shield", "Bail protégé", "ne peut pas"), ("cal", "Protégé trois ans", "les trois ans"),
           ("question", "Risques expliqués", "les risques")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre requête, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
