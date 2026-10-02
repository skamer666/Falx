"""Vidéo de service — Contester un congé ou prolonger le bail (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, cards, lst, process, title, warn

AUDIENCE = "particuliers"
SLUG = "contestation-conge"
NAME = "Contester un congé ou prolonger le bail"

META = {
    "title": "Contester un congé ou prolonger le bail",
    "yt_title": "Contester un congé de bail en Suisse : annulation ou prolongation, délai de 30 jours (art. 273 CO)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Contester un congé : vous avez reçu la résiliation de votre bail ? Le délai est de 30 jours dès la réception du congé "
                 "(art. 273 CO). Un congé donné sans formule officielle est nul (art. 266l et 266o CO), et la prolongation peut atteindre "
                 "quatre ans pour un logement (art. 272b CO). Thrax Legal rédige votre requête à l'autorité de conciliation, à prix fixe."),
    "tags": ["contester un congé", "congé bail", "prolongation de bail", "résiliation de bail", "art. 273 CO", "art. 272b CO",
             "formule officielle", "autorité de conciliation", "locataire Suisse romande", "Thrax Legal"],
    "thumb": ("Congé", "du bail ?", "Contestez à temps"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Contester un congé : vous avez reçu la résiliation de votre bail, et vous voulez rester, ou au moins gagner du temps ?")(
    title("Particuliers · Contester un congé", "Vous avez reçu votre congé ?",
          chips=[("Rester", "vous voulez rester"), ("Prolongation", "gagner du temps")]))
S("Attention : le délai pour agir est très court. Chaque jour compte.", P1)(
    warn("Le délai pour agir est très court.", sub="Chaque jour compte.", a_sub="Chaque jour", label="Le risque"))
S("Trois règles : vous avez trente jours dès la réception du congé. Un congé donné sans formule officielle est nul. "
  "Et la prolongation peut atteindre quatre ans pour un logement.", P1)(
    cards("Art. 273, 266l et 272b CO", "Trois règles à connaître :",
          [("clock", "30 jours", "Dès la réception du congé", "trente jours"),
           ("doc", "Formule officielle", "Sans elle, le congé est nul", "formule officielle"),
           ("cal", "Jusqu’à 4 ans", "De prolongation pour un logement", "quatre ans")]))
S("On vérifie la validité formelle du congé, on analyse ses motifs, et on rédige la requête en annulation, en prolongation, ou les deux, prête à déposer.", P2)(
    lst("La requête", "Ce qu’on fait :",
        [("Validité formelle vérifiée", "la validité"), ("Motifs analysés", "ses motifs"),
         ("Annulation ou prolongation", "en annulation"), ("Prête à déposer", "prête à déposer")]))
S("Même si le congé est valable, une prolongation peut souvent être accordée si le départ entraîne des conséquences pénibles. Vous déposez la requête vous-même, à l’autorité de conciliation.", P2)(
    brand("Du temps, et vos droits.",
          [("cal", "Prolongation possible", "une prolongation"), ("home", "Conséquences pénibles", "conséquences pénibles"),
           ("building", "Conciliation", "l’autorité")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre requête, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
