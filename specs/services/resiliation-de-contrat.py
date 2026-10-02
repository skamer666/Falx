"""Vidéo de service — Résilier un abonnement ou un contrat (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, lst, process, title, warn

AUDIENCE = "particuliers"
SLUG = "resiliation-de-contrat"
NAME = "Résilier un abonnement ou un contrat"

META = {
    "title": "Résilier un abonnement ou un contrat",
    "yt_title": "Résilier un abonnement ou un contrat en Suisse : fitness, téléphone, assurance (art. 35a LCA)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Résilier un abonnement ou un contrat : fitness, téléphonie, assurance. Une résiliation tardive ne prend effet qu'à l'échéance "
                 "suivante, et une assurance peut en principe être résiliée pour la fin de la troisième année, puis chaque année (art. 35a LCA). "
                 "Thrax Legal vérifie votre contrat et rédige une résiliation qui tient, à prix fixe."),
    "tags": ["résilier un abonnement", "résiliation de contrat", "résilier fitness", "résilier téléphonie", "résilier assurance",
             "art. 35a LCA", "lettre de résiliation", "consommateur Suisse", "Suisse romande", "Thrax Legal"],
    "thumb": ("Abonnement", "à résilier ?", "La bonne date, la bonne forme"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Résilier un abonnement ou un contrat : fitness, téléphonie, assurance… et on fait la sourde oreille ?")(
    title("Particuliers · Résiliation", "Un abonnement impossible à résilier ?",
          chips=[("Fitness", "fitness"), ("Téléphonie", "téléphonie"), ("Assurance", "assurance")]))
S("Une résiliation envoyée trop tard ne prend effet qu’à l’échéance suivante. Et l’abonnement continue.", P1)(
    warn("Une résiliation tardive ne vaut qu’à l’échéance suivante.", sub="Et l’abonnement continue.", a_sub="Et l’abonnement", label="Le risque"))
S("Pour une assurance, le contrat peut en principe être résilié pour la fin de la troisième année, puis chaque année. "
  "Et si votre résiliation respecte le contrat, elle produit ses effets, même sans accord.", P1)(
    law("Art. 35a LCA", "Assurance : résiliable pour la fin de la 3e année, puis chaque année.", a_text="pour une assurance",
        note="Une résiliation conforme au contrat produit ses effets, même sans accord", a_note="Et si"))
S("On vérifie les conditions de résiliation, on calcule la date de fin possible, et on rédige une lettre de résiliation prête à envoyer.", P2)(
    lst("La résiliation", "Une résiliation qui tient :",
        [("Conditions vérifiées", "on vérifie"), ("Date de fin calculée", "on calcule"), ("Lettre prête à envoyer", "une lettre")]))
S("Le fournisseur refuse ? La lettre le rappelle clairement. Et s’il existe un juste motif, on vérifie si une résiliation immédiate est possible.", P2)(
    brand("Une sortie propre.",
          [("mail", "Rappel clair", "le rappelle"), ("scale", "Juste motif vérifié", "un juste motif"),
           ("check", "Fin immédiate ?", "une résiliation immédiate")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre lettre, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
