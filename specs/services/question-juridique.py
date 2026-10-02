"""Vidéo de service — Question juridique : réponse écrite (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, cards, law, process, title, warn

AUDIENCE = "particuliers"
SLUG = "question-juridique"
NAME = "Question juridique"

META = {
    "title": "Question juridique : une réponse écrite",
    "yt_title": "Question juridique en Suisse : une réponse écrite claire, avec les articles de loi",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Question juridique : vous avez une question précise et voulez une réponse fiable, sans rendez-vous ? Droit du travail, bail, "
                 "consommation, contrats, poursuites, famille simple : Thrax Legal vous répond par écrit, avec les bases légales et la prochaine "
                 "étape conseillée, à prix fixe."),
    "tags": ["question juridique", "conseil juridique en ligne", "réponse juridique écrite", "droit du travail", "droit du bail",
             "droit de la consommation", "poursuites", "conseil juridique Suisse", "Suisse romande", "Thrax Legal"],
    "thumb": ("Question", "juridique ?", "Une réponse claire, par écrit"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Question juridique : vous avez une question précise et vous voulez une réponse fiable, sans rendez-vous ?")(
    title("Particuliers · Question juridique", "Une question juridique précise ?",
          chips=[("Précise", "question précise"), ("Fiable", "réponse fiable")]))
S("Sur internet, les réponses se contredisent. Et beaucoup ne valent pas en Suisse.", P1)(
    warn("Sur internet, les réponses se contredisent.", sub="Et beaucoup ne valent pas en Suisse.", a_sub="Et beaucoup", label="Le risque"))
S("Une question rapide porte sur un point précis. Et si votre situation demande une analyse complète, on vous propose la prestation adaptée avant de commencer.", P1)(
    law("Bon à savoir", "Une question, un point précis.", a_text="une question rapide",
        note="Situation plus large ? La prestation adaptée vous est proposée avant de commencer", a_note="si votre situation"))
S("Droit du travail, bail, consommation, contrats, poursuites, famille simple : posez votre question. Pour le pénal, on vous oriente.", P2)(
    cards("Les domaines", "Ce qu’on couvre :",
          [("brief", "Travail", "", "droit du travail"), ("home", "Bail", "", "bail"), ("receipt", "Consommation", "", "consommation"),
           ("doc", "Contrats", "", "contrats"), ("gavel", "Poursuites", "", "poursuites"), ("user", "Famille simple", "", "famille simple")]))
S("Vous recevez une réponse écrite, avec les bases légales et la prochaine étape conseillée. Et une précision sur la réponse est incluse.", P2)(
    brand("Une réponse fiable, par écrit.",
          [("doc", "Réponse écrite", "une réponse écrite"), ("scale", "Bases légales", "les bases légales"),
           ("arrow", "Prochaine étape", "la prochaine étape"), ("chat", "Précision incluse", "une précision")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre réponse, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
