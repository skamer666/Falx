"""Vidéo de service — Vol annulé ou retardé : indemnisation (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, lst, process, stat, title, warn

AUDIENCE = "particuliers"
SLUG = "vol-annule-retarde"
NAME = "Vol annulé ou retardé"

META = {
    "title": "Vol annulé ou retardé : votre indemnité",
    "yt_title": "Vol annulé ou retardé : réclamer jusqu'à 600 € d'indemnité depuis la Suisse, sans commission",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Vol annulé ou retardé, surréservation : vous avez peut-être droit à une indemnité de 250 à 600 euros par passager. Le règlement "
                 "européen sur les droits des passagers aériens s'applique aussi en Suisse, notamment aux vols au départ d'un aéroport suisse. "
                 "Thrax Legal vérifie votre droit et rédige la réclamation à la compagnie, à prix fixe, sans pourcentage sur votre indemnité."),
    "tags": ["vol annulé", "vol retardé", "indemnisation vol", "surréservation", "droits des passagers aériens", "réclamation compagnie aérienne",
             "indemnité 600 euros", "aéroport Genève", "Suisse romande", "Thrax Legal"],
    "thumb": ("Vol", "annulé ?", "Réclamez votre indemnité"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Vol annulé ou retardé : annulation, surréservation, retard important ?")(
    title("Particuliers · Vol annulé ou retardé", "Votre vol a été annulé ou retardé ?",
          chips=[("Annulation", "annulation"), ("Surréservation", "surréservation"), ("Retard", "retard important")]))
S("Et si vous passez par une plateforme, elle prélève souvent un pourcentage sur votre propre indemnité.", P1)(
    warn("Les plateformes prélèvent souvent un pourcentage.", sub="Sur votre propre indemnité.", a_sub="sur votre", label="Le piège"))
S("Pourtant, vous avez peut-être droit à une indemnité de deux cent cinquante à six cents euros par passager. "
  "Et le règlement européen s’applique aussi aux vols au départ d’un aéroport suisse.", P1)(
    stat("Jusqu’à", 600, "d’indemnité par passager, selon le vol.", a_value="une indemnité", suffix="€",
         law="Règlement européen", side="Il s’applique aussi aux vols au départ d’un aéroport suisse.", a_side="Et le règlement"))
S("On vérifie votre droit et le montant, en tenant compte des circonstances extraordinaires comme la météo, puis on rédige la réclamation, avec la marche à suivre en cas de refus.", P2)(
    lst("La réclamation", "Ce qu’on fait :",
        [("Droit et montant vérifiés", "on vérifie"), ("Circonstances extraordinaires", "circonstances extraordinaires"),
         ("Réclamation prête à envoyer", "la réclamation"), ("Marche à suivre si refus", "la marche")]))
S("Pas de pourcentage prélevé : vous gardez votre indemnité. Et une seule commande suffit pour toute la réservation.", P2)(
    brand("Votre indemnité, sans commission.",
          [("receipt", "Aucun pourcentage", "pas de pourcentage"), ("check", "Indemnité conservée", "vous gardez"),
           ("user", "Toute la réservation", "une seule commande")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre réclamation, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
