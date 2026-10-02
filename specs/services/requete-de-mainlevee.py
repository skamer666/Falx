"""Vidéo de service — Requête de mainlevée (entreprises)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, cards, lst, process, title, warn

AUDIENCE = "entreprises"
SLUG = "requete-de-mainlevee"
NAME = "Requête de mainlevée"

META = {
    "title": "Requête de mainlevée : débloquez la poursuite",
    "yt_title": "Requête de mainlevée en Suisse : débloquer une poursuite après opposition (art. 80 et 82 LP)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour entreprises", "https://thrax-legal.ch/fr/entreprises"),
              ("Le guide complet", "https://thrax-legal.ch/fr/guide/mise-en-demeure-recouvrement-suisse")],
    "yt_intro": ("Requête de mainlevée : votre débiteur a fait opposition au commandement de payer ? Une reconnaissance de dette signée permet "
                 "la mainlevée provisoire (art. 82 LP), un jugement exécutoire la mainlevée définitive (art. 80 LP). Thrax Legal vérifie "
                 "votre titre et rédige la requête de mainlevée, prête à déposer, à prix fixe."),
    "tags": ["requête de mainlevée", "mainlevée provisoire", "mainlevée définitive", "opposition commandement de payer", "art. 82 LP",
             "art. 80 LP", "reconnaissance de dette", "recouvrement", "PME Suisse romande", "Thrax Legal"],
    "thumb": ("Poursuite", "bloquée ?", "Demandez la mainlevée"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, service juridique externalisé à prix fixe pour les indépendants et les PME de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Requête de mainlevée : votre débiteur a fait opposition au commandement de payer ?")(
    title("Entreprises · Mainlevée", "Votre débiteur a fait opposition ?",
          chips=[("Opposition", "opposition"), ("Commandement", "commandement de payer")]))
S("Sans mainlevée, la poursuite s’arrête là. Et votre créance reste impayée.", P1)(
    warn("Sans mainlevée, la poursuite s’arrête là.", sub="Et votre créance reste impayée.", a_sub="Et votre", label="Le risque"))
S("Avec une reconnaissance de dette signée, c’est la mainlevée provisoire. Avec un jugement exécutoire, la mainlevée définitive. Sans titre, il faut agir devant le juge.", P1)(
    cards("Art. 80 et 82 LP", "Quel titre avez-vous ?",
          [("pen", "Reconnaissance signée", "Mainlevée provisoire", "reconnaissance de dette"),
           ("gavel", "Jugement exécutoire", "Mainlevée définitive", "jugement exécutoire"),
           ("cross", "Pas de titre", "Action devant le juge", "sans titre")]))
S("On vérifie votre titre, on rédige la requête de mainlevée, provisoire ou définitive, et on prépare le bordereau de pièces.", P2)(
    lst("La requête", "Prête à déposer :",
        [("Titre vérifié", "on vérifie"), ("Requête de mainlevée", "la requête"), ("Bordereau de pièces", "le bordereau")]))
S("Un contrat signé suffit souvent, si la prestation a été fournie. Vous déposez la requête vous-même, et on vous indique le tribunal compétent.", P2)(
    brand("La poursuite peut continuer.",
          [("doc", "Contrat signé", "un contrat signé"), ("mail", "Vous déposez", "vous déposez"),
           ("building", "Tribunal compétent", "tribunal compétent")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre requête, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
