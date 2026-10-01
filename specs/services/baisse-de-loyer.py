"""Vidéo de service — Demande de baisse de loyer (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, lst, process, ruler, title, warn

AUDIENCE = "particuliers"
SLUG = "baisse-de-loyer"
NAME = "Demande de baisse de loyer"

META = {
    "title": "Baisse de loyer : la demander correctement",
    "yt_title": "Baisse de loyer en Suisse : taux de référence et lettre au bailleur (art. 270a CO)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Baisse de loyer en Suisse : quand le taux hypothécaire de référence baisse, votre loyer peut baisser aussi. La demande se fait par "
                 "écrit, le bailleur a 30 jours pour répondre, puis l'autorité de conciliation peut être saisie (art. 270a CO). "
                 "Thrax Legal calcule votre baisse et rédige la lettre, à prix fixe."),
    "tags": ["baisse de loyer", "baisse de loyer Suisse", "taux hypothécaire de référence", "taux de référence", "art. 270a CO",
             "locataire", "régie", "autorité de conciliation", "Suisse romande", "Thrax Legal"],
    "thumb": ("Loyer", "trop cher ?", "Demandez votre baisse"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Baisse de loyer : quand le taux hypothécaire de référence baisse, votre loyer peut baisser aussi. Encore faut-il le demander.")(
    title("Particuliers · Baisse de loyer", "Votre loyer pourrait-il baisser ?",
          chips=[("Taux en baisse", "taux hypothécaire"), ("Loyer réduit", "votre loyer"), ("À demander", "le demander")]))
S("Beaucoup de locataires paient trop, simplement parce qu’ils ne demandent rien.", P1)(
    warn("Beaucoup de locataires paient trop, faute de demander.", sub="La baisse n’est pas automatique.", a_sub="simplement", label="Le risque"))
S("La demande se fait par écrit, pour le prochain terme de résiliation. Le bailleur a trente jours pour répondre. "
  "S’il refuse, vous pouvez saisir l’autorité de conciliation dans les trente jours.", P1)(
    ruler("Art. 270a CO", "Une demande écrite, des délais précis", 60,
          [(0, "Jour 0", "Votre demande écrite", "La demande"), (30, "30 jours", "Réponse du bailleur", "Le bailleur"),
           (60, "+ 30 jours", "Autorité de conciliation", "S’il refuse")],
          note=("Art. 270a CO", "dans les trente jours")))
S("On vérifie le taux de référence et le dernier ajustement de votre loyer, puis on calcule la baisse que vous pouvez demander.", P2)(
    lst("Le calcul", "On vérifie votre droit :",
        [("Le taux de référence", "le taux de référence"), ("Le dernier ajustement", "le dernier ajustement"),
         ("La baisse demandable", "on calcule")]))
S("Et on rédige la lettre à votre bailleur ou à votre régie, avec la marche à suivre s’il refuse.", P2)(
    brand("Votre demande de baisse, prête à envoyer.",
          [("pen", "Lettre au bailleur", "la lettre"), ("home", "Ou à la régie", "votre régie"), ("scale", "Marche à suivre", "la marche")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre lettre, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
