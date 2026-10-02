"""Vidéo de service — Requête de conciliation (travail) (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, lst, process, title, warn

AUDIENCE = "particuliers"
SLUG = "requete-conciliation-travail"
NAME = "Requête de conciliation (travail)"

META = {
    "title": "Requête de conciliation (travail) : prête à déposer",
    "yt_title": "Requête de conciliation en droit du travail : saisir les prud'hommes gratuitement (art. 243 CPC)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Requête de conciliation en droit du travail : votre employeur ne paie pas ou conteste vos droits ? La procédure devant le "
                 "tribunal des prud'hommes commence en principe par une tentative de conciliation. Jusqu'à 30'000 CHF, la procédure est "
                 "simplifiée et gratuite (art. 114 et 243 CPC). Thrax Legal rédige votre requête, prête à déposer, à prix fixe."),
    "tags": ["requête de conciliation", "prud'hommes", "litige employeur", "autorité de conciliation", "art. 243 CPC", "art. 114 CPC",
             "salaire impayé", "droit du travail Suisse", "Suisse romande", "Thrax Legal"],
    "thumb": ("Litige", "de travail ?", "Votre requête prête à déposer"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Requête de conciliation : votre employeur ne paie pas ou conteste vos droits, malgré vos courriers ?")(
    title("Particuliers · Conciliation travail", "Votre employeur ne répond plus ?",
          chips=[("Impayé", "ne paie pas"), ("Contestation", "conteste vos droits")]))
S("Les courriers ne suffisent plus. La procédure devant le tribunal des prud’hommes commence en principe par une tentative de conciliation.", P1)(
    warn("Les courriers ne suffisent plus.", sub="La procédure commence en principe par une conciliation.", a_sub="La procédure", label="L’étape suivante"))
S("Bonne nouvelle : pour les litiges de travail jusqu’à trente mille francs, la procédure est simplifiée et gratuite. Vous déposez la requête vous-même.", P1)(
    law("Art. 114 et 243 CPC", "Jusqu’à 30'000 CHF : procédure simplifiée et gratuite.", a_text="pour les litiges",
        note="Vous déposez la requête vous-même", a_note="Vous déposez"))
S("On rédige votre requête avec vos conclusions chiffrées, on classe les pièces à joindre, et vous avez une fiche pour préparer l’audience.", P2)(
    lst("La requête", "Prête à déposer :",
        [("Conclusions chiffrées", "conclusions chiffrées"), ("Pièces classées", "on classe"), ("Fiche de préparation", "une fiche")]))
S("La comparution personnelle est en principe obligatoire : la fiche vous aide à présenter votre position calmement. Et si votre cas exige un avocat, on vous le dit avant que vous payiez.", P2)(
    brand("Préparé pour l’audience.",
          [("user", "Vous comparaissez", "la comparution"), ("chat", "Position claire", "présenter votre position"),
           ("check", "Avis honnête", "si votre cas")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre requête, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
