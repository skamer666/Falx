"""Vidéo de service — Licenciement : vérification et opposition (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, lst, process, title, warn

AUDIENCE = "particuliers"
SLUG = "licenciement-opposition"
NAME = "Licenciement et opposition"

META = {
    "title": "Licenciement : vérifier et faire opposition à temps",
    "yt_title": "Licenciement en Suisse : vérifier son congé et faire opposition à temps (art. 336b CO)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Licenciement en Suisse : délai de congé, périodes de protection (maladie, accident, grossesse, service militaire), congé abusif. "
                 "Pour réclamer une indemnité, il faut faire opposition par écrit avant la fin du délai de congé (art. 336b CO). "
                 "Thrax Legal vérifie votre licenciement et rédige votre opposition, à prix fixe."),
    "tags": ["licenciement", "licenciement Suisse", "congé abusif", "opposition licenciement", "art. 336b CO", "art. 336c CO",
             "période de protection", "délai de congé", "droit du travail Suisse", "Thrax Legal"],
    "thumb": ("Licencié ?", "Réagissez", "Opposition dans les délais"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Licenciement : vous venez d’être licencié et quelque chose ne vous semble pas juste ? Un délai, une maladie, un motif douteux ?")(
    title("Particuliers · Licenciement", "Licencié, et quelque chose cloche ?",
          chips=[("Délai", "Un délai"), ("Maladie", "une maladie"), ("Motif douteux", "un motif")]))
S("Attention : si vous ne réagissez pas à temps, vous pouvez perdre vos droits.", P1)(
    warn("Sans réaction à temps, vos droits peuvent tomber.", sub="Le délai court déjà.", a_sub="vous pouvez perdre", label="Le risque"))
S("Pour obtenir une indemnité pour congé abusif, il faut faire opposition par écrit avant la fin du délai de congé. "
  "Et un congé donné pendant une période de protection est nul.", P1)(
    law("Art. 336b et 336c CO", "Opposition par écrit, avant la fin du délai de congé.", a_text="il faut faire",
        note="Congé donné pendant une période de protection : il est nul", a_note="Et un congé"))
S("On vérifie le délai de congé et la date de fin, les périodes de protection, maladie, accident ou grossesse, et le motif du congé.", P2)(
    lst("La vérification", "On contrôle tout :",
        [("Le délai de congé et la date de fin", "le délai de congé"), ("Les périodes de protection", "les périodes"),
         ("Le motif : abusif ou non", "le motif")]))
S("Puis on rédige votre lettre d’opposition et la demande de motivation écrite, à votre nom, prêtes à envoyer.", P2)(
    brand("Votre opposition, rédigée à temps.",
          [("pen", "Lettre d’opposition", "lettre d’opposition"), ("question", "Motivation écrite", "la demande"),
           ("user", "À votre nom", "à votre nom"), ("mail", "Prêtes à envoyer", "prêtes à envoyer")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre lettre, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
