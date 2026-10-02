"""Vidéo de service — Lettre juridique sur mesure (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, doc, lst, process, title, warn

AUDIENCE = "particuliers"
SLUG = "lettre-juridique-sur-mesure"
NAME = "Lettre juridique sur mesure"

META = {
    "title": "Lettre juridique sur mesure",
    "yt_title": "Lettre juridique sur mesure en Suisse : réclamation, contestation, mise en demeure",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Lettre juridique sur mesure : votre situation n'entre dans aucune case ? Réclamation, contestation, demande, mise en demeure : "
                 "une lettre bien rédigée fixe un délai, cite les bonnes règles et laisse une trace écrite utile en cas de procédure. "
                 "Thrax Legal la rédige à votre nom, prête à envoyer, à prix fixe."),
    "tags": ["lettre juridique", "courrier juridique", "lettre de réclamation", "lettre de contestation", "mise en demeure",
             "courrier formel", "modèle lettre juridique", "particuliers", "Suisse romande", "Thrax Legal"],
    "thumb": ("Lettre", "sur mesure ?", "Un courrier qui tient la route"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Lettre juridique sur mesure : réclamation, contestation, demande… votre situation n’entre dans aucune case ?")(
    title("Particuliers · Lettre sur mesure", "Votre situation n’entre dans aucune case ?",
          chips=[("Réclamation", "réclamation"), ("Contestation", "contestation"), ("Demande", "demande")]))
S("Un courrier vague reste souvent sans effet. Et ne vous sert à rien en cas de procédure.", P1)(
    warn("Un courrier vague reste souvent sans effet.", sub="Et ne vous sert à rien en cas de procédure.", a_sub="Et ne vous", label="Le risque"))
S("Une lettre bien rédigée fixe un délai, cite les bonnes règles et laisse une trace écrite utile en cas de procédure. Elle est rédigée à votre nom.", P1)(
    doc("La lettre", "Ce qu’elle doit contenir", "Précise, fondée, utile.", "Lettre formelle",
        [("Un délai", "Clair et daté", "fixe un délai"), ("Les règles", "Citées correctement", "cite les bonnes règles"),
         ("Une trace", "Utile en cas de procédure", "une trace écrite")],
        stamp=("À votre nom", "à votre nom"), doc_icon="mail"))
S("On analyse votre situation, on rédige une lettre juridiquement fondée, prête à envoyer, et un tour de corrections est inclus.", P2)(
    lst("Le service", "Ce qu’on fait :",
        [("Situation analysée", "on analyse"), ("Lettre juridiquement fondée", "une lettre"), ("Un tour de corrections", "un tour")]))
S("Vous l’envoyez vous-même. Et si la situation est plus complexe, on vous le dit avant de commencer.", P2)(
    brand("Votre courrier, sur mesure.",
          [("mail", "Vous l’envoyez", "vous l’envoyez"), ("question", "Situation complexe ?", "plus complexe"),
           ("check", "Dit avant de commencer", "avant de commencer")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre lettre, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
