"""Vidéo de service — Analyse de certificat de travail (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, lst, process, title, warn

AUDIENCE = "particuliers"
SLUG = "analyse-certificat-de-travail"
NAME = "Analyse de certificat de travail"

META = {
    "title": "Analyse de certificat de travail : ce qu’il dit vraiment",
    "yt_title": "Analyse de certificat de travail en Suisse : décoder les formules codées (art. 330a CO)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Analyse de certificat de travail : un certificat peut sembler positif et contenir des formules codées, des omissions ou des "
                 "nuances qui freinent vos candidatures. Votre employeur doit vous remettre un certificat complet, exact et bienveillant "
                 "(art. 330a CO). Thrax Legal l'analyse phrase par phrase et vous dit s'il faut demander une rectification, à prix fixe."),
    "tags": ["certificat de travail", "analyse certificat de travail", "formules codées", "certificat de travail Suisse", "art. 330a CO",
             "rectification certificat de travail", "certificat intermédiaire", "recherche d'emploi", "Suisse romande", "Thrax Legal"],
    "thumb": ("Certificat", "codé ?", "Ce qu’il dit vraiment"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Analyse de certificat de travail : votre certificat semble positif, mais que dit-il vraiment aux recruteurs ?")(
    title("Particuliers · Analyse de certificat", "Que dit vraiment votre certificat ?",
          chips=[("Positif ?", "semble positif"), ("Recruteurs", "aux recruteurs")]))
S("Une formule codée, une omission, une nuance, et vos candidatures sont freinées sans que vous le sachiez.", P1)(
    warn("Une formule codée peut freiner vos candidatures.", sub="Sans que vous le sachiez.", a_sub="sans que", label="Le risque"))
S("Votre employeur doit vous remettre un certificat complet, exact et bienveillant. Et vous pouvez demander un certificat intermédiaire à tout moment.", P1)(
    law("Art. 330a CO", "Complet, exact et bienveillant : c’est votre droit.", a_text="votre employeur",
        note="Un certificat intermédiaire peut être demandé à tout moment", a_note="Et vous pouvez"))
S("On lit chaque phrase, formules codées et omissions comprises. Vous recevez une évaluation claire, et la liste des points que vous êtes en droit de faire modifier.", P2)(
    lst("L’analyse", "Phrase par phrase :",
        [("Chaque phrase lue", "chaque phrase"), ("Formules codées repérées", "formules codées"),
         ("Évaluation globale claire", "une évaluation"), ("Points à faire modifier", "la liste des points")]))
S("Par exemple, une satisfaction « dans l’ensemble » peut signaler une faiblesse. On vous l’explique, et on vous recommande clairement : le garder, ou demander une rectification.", P2)(
    brand("Votre certificat, décodé.",
          [("search", "Formules expliquées", "par exemple"), ("check", "Le garder", "le garder"),
           ("pen", "Ou le faire rectifier", "demander une rectification")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre analyse, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
