"""Vidéo de service — Récupérer de l’argent prêté ou dû (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, lst, process, title, warn

AUDIENCE = "particuliers"
SLUG = "recuperer-argent-prete"
NAME = "Récupérer de l’argent prêté ou dû"

META = {
    "title": "Récupérer de l’argent prêté ou dû",
    "yt_title": "Récupérer de l'argent prêté en Suisse : mise en demeure et poursuite (art. 318 CO)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Récupérer de l'argent prêté ou dû : prêt à un proche, objet vendu sans être payé, frais avancés. Un prêt sans échéance doit être "
                 "remboursé dans les six semaines qui suivent la première réclamation (art. 318 CO), et une reconnaissance de dette facilite "
                 "beaucoup la suite (art. 82 LP). Thrax Legal rédige la mise en demeure et prépare la réquisition de poursuite, à prix fixe."),
    "tags": ["récupérer argent prêté", "prêt entre proches", "dette privée", "mise en demeure", "réquisition de poursuite", "art. 318 CO",
             "reconnaissance de dette", "art. 82 LP", "Suisse romande", "Thrax Legal"],
    "thumb": ("Argent", "prêté ?", "Réclamez votre dû"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Récupérer de l’argent prêté : vous avez prêté à un proche, vendu un objet sans être payé, ou avancé des frais ?")(
    title("Particuliers · Argent prêté", "On vous doit de l’argent ?",
          chips=[("Prêt", "prêté à un proche"), ("Vente impayée", "vendu un objet"), ("Frais avancés", "avancé des frais")]))
S("Entre proches, on n’ose pas toujours réclamer. Et le temps passe.", P1)(
    warn("Entre proches, on n’ose pas réclamer.", sub="Et le temps passe.", a_sub="Et le temps", label="Le risque"))
S("La loi vous aide : un prêt sans échéance doit être remboursé dans les six semaines qui suivent la première réclamation. "
  "Et une reconnaissance de dette signée facilite beaucoup la suite.", P1)(
    law("Art. 318 CO et 82 LP", "Prêt sans échéance : remboursable six semaines après la réclamation.", a_text="un prêt",
        note="Une reconnaissance de dette signée facilite beaucoup la suite", a_note="Et une reconnaissance"))
S("On analyse vos preuves, on rédige la mise en demeure avec un délai de paiement, et on prépare la réquisition de poursuite, prête à déposer.", P2)(
    lst("Le dossier", "Ce qu’on prépare :",
        [("Preuves analysées", "on analyse"), ("Mise en demeure", "la mise en demeure"), ("Réquisition de poursuite", "la réquisition")]))
S("Pas de contrat écrit ? Messages, virements et témoins peuvent prouver le prêt. On évalue la solidité de vos preuves.", P2)(
    brand("Réclamez votre dû, proprement.",
          [("chat", "Messages", "messages"), ("receipt", "Virements", "virements"), ("user", "Témoins", "témoins"),
           ("search", "Preuves évaluées", "la solidité")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez vos lettres, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
