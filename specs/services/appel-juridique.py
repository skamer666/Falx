"""Vidéo de service — Appel juridique (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, cards, lst, process, title, warn

AUDIENCE = "particuliers"
SLUG = "appel-juridique"
NAME = "Appel juridique"

META = {
    "title": "Appel juridique : sachez quoi faire",
    "yt_title": "Appel juridique en Suisse : exposez votre situation, sachez quoi faire et dans quels délais",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Appel juridique : vous préférez en parler ? Par téléphone ou en visio, vous exposez votre situation et Thrax Legal vous dit ce que "
                 "vous pouvez faire, dans quels délais et ce qu'il faut éviter. L'appel est préparé à partir de votre description écrite, et "
                 "vous recevez un résumé écrit des prochaines étapes, à prix fixe."),
    "tags": ["appel juridique", "consultation juridique", "conseil juridique téléphone", "visio juridique", "quoi faire", "délais",
             "conseil juridique Suisse", "particuliers", "Suisse romande", "Thrax Legal"],
    "thumb": ("Appel", "juridique ?", "On vous dit quoi faire"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Appel juridique : vous préférez en parler, par téléphone ou en visio ?")(
    title("Particuliers · Appel juridique", "Vous préférez en parler ?",
          chips=[("Téléphone", "téléphone"), ("Visio", "visio")]))
S("Face à un problème juridique, le plus dur, c’est souvent de savoir par où commencer. Et surtout, quels délais respecter.", P1)(
    warn("Le plus dur : savoir par où commencer.", sub="Et surtout, quels délais respecter.", a_sub="Et surtout", label="Le risque"))
S("Vous exposez votre situation. On vous dit ce que vous pouvez faire, dans quels délais, et ce qu’il faut éviter.", P1)(
    lst("L’appel", "Vous saurez :",
        [("Ce que vous pouvez faire", "ce que vous pouvez faire"), ("Dans quels délais", "dans quels délais"),
         ("Ce qu’il faut éviter", "ce qu’il faut éviter")]))
S("L’appel est préparé à partir de votre description écrite, et vous recevez ensuite un résumé écrit des prochaines étapes.", P2)(
    cards("Le déroulé", "Préparé, puis résumé :",
          [("phone", "L’appel", "Téléphone ou visio", "l’appel est"),
           ("doc", "Description écrite", "Préparé à l’avance", "description écrite"),
           ("check", "Résumé écrit", "Les prochaines étapes", "un résumé")]))
S("Et si votre situation demande plus, le résumé indique la prestation adaptée, à prix fixe.", P2)(
    brand("Clair, dès le premier échange.",
          [("doc", "Le résumé", "le résumé"), ("arrow", "Prestation adaptée", "la prestation adaptée"), ("lock", "Prix fixe", "prix fixe")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre résumé, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
