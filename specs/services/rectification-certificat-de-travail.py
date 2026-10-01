"""Vidéo de service — Certificat de travail : demande de rectification (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, lst, process, title, warn

AUDIENCE = "particuliers"
SLUG = "rectification-certificat-de-travail"
NAME = "Rectification du certificat de travail"

META = {
    "title": "Certificat de travail : le faire rectifier",
    "yt_title": "Certificat de travail en Suisse : comment le faire rectifier (formules codées, art. 330a CO)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Certificat de travail en Suisse : formules codées, omissions, phrases qui vous desservent ? Votre employeur doit vous remettre "
                 "un certificat complet, exact et bienveillant (art. 330a CO). Thrax Legal analyse votre certificat phrase par phrase et rédige "
                 "votre demande de rectification, à prix fixe."),
    "tags": ["certificat de travail", "certificat de travail Suisse", "rectifier certificat de travail", "formules codées",
             "art. 330a CO", "certificat intermédiaire", "droit du travail Suisse", "employé", "Suisse romande", "Thrax Legal"],
    "thumb": ("Certificat", "à corriger ?", "Rectifiez votre certificat"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Certificat de travail : le vôtre contient des formules floues, des omissions ou des phrases qui vous desservent ?")(
    title("Particuliers · Certificat de travail", "Votre certificat de travail vous dessert ?",
          chips=[("Formules floues", "des formules floues"), ("Omissions", "des omissions"), ("Phrases codées", "des phrases")]))
S("Un certificat mal formulé peut freiner chacune de vos candidatures, sans que vous le sachiez.", P1)(
    warn("Un certificat mal formulé freine vos candidatures.", sub="Souvent sans que vous le sachiez.", a_sub="sans que", label="Le risque"))
S("La loi est claire : votre employeur doit vous remettre un certificat complet, exact et formulé avec bienveillance. "
  "Et en cas de refus, la procédure est gratuite jusqu’à trente mille francs.", P1)(
    law("Art. 330a CO", "Votre certificat doit être complet, exact et bienveillant.", a_text="votre employeur",
        note="En cas de refus : procédure gratuite jusqu’à 30'000 CHF (art. 114 CPC)", a_note="en cas de refus"))
S("On analyse votre certificat phrase par phrase : les formules codées, les omissions, le ton général, et ce que vous pouvez exiger.", P2)(
    lst("L’analyse", "Phrase par phrase, on vérifie :",
        [("Les formules codées", "les formules codées"), ("Les omissions", "les omissions"),
         ("Le ton général", "le ton général"), ("Ce que vous pouvez exiger", "ce que vous pouvez")]))
S("Ensuite, on propose un texte corrigé et on rédige la lettre à votre employeur, à votre nom. Avec la marche à suivre s’il refuse.", P2)(
    brand("Votre demande de rectification, prête.",
          [("doc", "Texte corrigé", "un texte corrigé"), ("mail", "Lettre à l’employeur", "la lettre"),
           ("user", "À votre nom", "à votre nom"), ("scale", "Marche à suivre", "la marche")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre lettre, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
