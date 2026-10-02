"""Vidéo de service — Litige avec un artisan ou une entreprise (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, lst, process, title, warn

AUDIENCE = "particuliers"
SLUG = "litige-artisan"
NAME = "Litige avec un artisan"

META = {
    "title": "Litige avec un artisan : travaux mal faits",
    "yt_title": "Litige avec un artisan en Suisse : travaux mal faits, devis dépassé, avis des défauts (art. 375 CO)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Litige avec un artisan : travaux bâclés, chantier qui s'éternise, facture au-delà du devis ? Les défauts doivent être signalés "
                 "rapidement, et un devis approximatif dépassé de manière excessive permet de demander une réduction ou de se départir du "
                 "contrat (art. 375 CO). Thrax Legal rédige votre avis des défauts et votre mise en demeure, à prix fixe."),
    "tags": ["litige artisan", "travaux mal faits", "avis des défauts", "devis dépassé", "art. 375 CO", "norme SIA 118",
             "mise en demeure artisan", "contrat d'entreprise", "Suisse romande", "Thrax Legal"],
    "thumb": ("Artisan", "défaillant ?", "Réclamez par écrit"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Litige avec un artisan : travaux bâclés, chantier qui s’éternise, facture bien au-delà du devis ?")(
    title("Particuliers · Litige artisan", "Des travaux mal faits ?",
          chips=[("Travaux bâclés", "travaux bâclés"), ("Retard", "chantier"), ("Devis dépassé", "facture bien")]))
S("Attention : attendre peut vous faire perdre vos droits, car les défauts doivent être signalés rapidement après leur découverte.", P1)(
    warn("Attendre peut vous faire perdre vos droits.", sub="Les défauts doivent être signalés rapidement.", a_sub="les défauts", label="Le risque"))
S("Et si un devis approximatif est dépassé de manière excessive, vous pouvez demander une réduction ou vous départir du contrat. "
  "Si la norme SIA cent dix-huit s’applique, on en tient compte.", P1)(
    law("Art. 375 CO", "Devis dépassé à l’excès : réduction ou fin du contrat.", a_text="un devis approximatif",
        note="Norme SIA 118 : prise en compte si elle s’applique", a_note="si la norme"))
S("On analyse le contrat, le devis et les factures, on rédige l’avis des défauts dans les formes, puis la mise en demeure : réfection, délai ou réduction du prix.", P2)(
    lst("Le dossier", "Ce qu’on rédige :",
        [("Contrat et devis analysés", "on analyse"), ("Avis des défauts", "l’avis"), ("Mise en demeure", "la mise en demeure")]))
S("Et on vous indique quelle partie de la facture payer, et quelle partie retenir, sans vous mettre en tort.", P2)(
    brand("Un dossier solide face à l’artisan.",
          [("receipt", "Ce qu’il faut payer", "quelle partie de"), ("lock", "Ce qu’il faut retenir", "quelle partie retenir"),
           ("shield", "Jamais en tort", "sans vous mettre")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez vos lettres, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
