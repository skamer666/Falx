"""Vidéo de service — Testament : rédaction guidée (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, lst, process, title, warn

AUDIENCE = "particuliers"
SLUG = "testament"
NAME = "Testament : rédaction guidée"

META = {
    "title": "Testament : le rédiger correctement",
    "yt_title": "Testament en Suisse : le rédiger à la main selon le nouveau droit successoral (art. 505 CC)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Testament en Suisse : protéger votre conjoint, votre partenaire, léguer un bien précis. Un testament olographe doit être entièrement "
                 "écrit à la main, daté et signé (art. 505 CC), et le droit successoral a changé en 2023. Thrax Legal calcule les réserves et rédige "
                 "votre testament sur mesure, à recopier à la main, à prix fixe."),
    "tags": ["testament", "testament Suisse", "testament olographe", "réserve héréditaire", "nouveau droit successoral 2023", "art. 505 CC",
             "quotité disponible", "concubin héritage", "Suisse romande", "Thrax Legal"],
    "thumb": ("Testament", "valable ?", "Protégez vos proches"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Testament : vous voulez protéger votre conjoint, votre partenaire, ou léguer un bien précis ?")(
    title("Particuliers · Testament", "Protéger vos proches avec un testament ?",
          chips=[("Conjoint", "votre conjoint"), ("Partenaire", "votre partenaire"), ("Un bien précis", "un bien précis")]))
S("Sans testament, c’est la loi qui décide. Et un partenaire non marié n’hérite pas.", P1)(
    warn("Sans testament, c’est la loi qui décide.", sub="Un partenaire non marié n’hérite pas.", a_sub="Et un partenaire", label="Le risque"))
S("Un testament olographe doit être entièrement écrit à la main, daté et signé. Et depuis 2023, les règles ont changé : "
  "les parents n’ont plus de réserve, et celle des descendants est réduite.", P1)(
    law("Art. 505 CC", "Écrit entièrement à la main, daté et signé.", a_text="entièrement écrit",
        note="Depuis 2023 : plus de réserve pour les parents, celle des descendants réduite", a_note="Et depuis"))
S("On calcule les réserves et la part dont vous pouvez disposer librement, on rédige le texte selon vos volontés, "
  "et on vous explique comment le recopier, le dater et le conserver.", P2)(
    lst("Pas à pas", "Votre testament, sans erreur :",
        [("Réserves héréditaires", "les réserves"), ("Part disponible", "la part"),
         ("Texte sur mesure", "le texte"), ("Recopie et conservation", "comment le recopier")]))
S("Pas besoin de notaire pour un testament olographe. Vous recopiez le texte à la main, et vos volontés sont claires.", P2)(
    brand("Vos volontés, écrites clairement.",
          [("doc", "Sans notaire", "Pas besoin"), ("pen", "Recopié à la main", "à la main"), ("check", "Volontés claires", "vos volontés")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre texte, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
