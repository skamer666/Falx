"""Vidéo de service — Litige commercial : analyse et courrier (entreprises)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, lst, process, title, warn

AUDIENCE = "entreprises"
SLUG = "litige-commercial"
NAME = "Litige commercial"

META = {
    "title": "Litige commercial : défendez votre position",
    "yt_title": "Litige commercial en Suisse : client ou fournisseur, défendez votre position par écrit",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour entreprises", "https://thrax-legal.ch/fr/entreprises")],
    "yt_intro": ("Litige commercial : livraison non conforme, prestation contestée, rupture de contrat. Les écrits comptent : un courrier précis, "
                 "envoyé tôt, renforce votre position en cas de procédure. Thrax Legal analyse le contrat et les échanges, évalue votre position "
                 "et rédige le courrier formel à la partie adverse, à prix fixe."),
    "tags": ["litige commercial", "litige fournisseur", "litige client", "livraison non conforme", "rupture de contrat", "courrier formel",
             "contentieux PME", "droit des contrats", "PME Suisse romande", "Thrax Legal"],
    "thumb": ("Litige", "commercial ?", "Défendez votre position"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, service juridique externalisé à prix fixe pour les indépendants et les PME de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Litige commercial : livraison non conforme, prestation contestée, rupture de contrat ?")(
    title("Entreprises · Litige commercial", "Un litige avec un client ou un fournisseur ?",
          chips=[("Livraison", "livraison non conforme"), ("Prestation", "prestation contestée"), ("Rupture", "rupture de contrat")]))
S("Sans écrit précis, votre position s’affaiblit. Et les échanges informels s’accumulent, sans trace claire.", P1)(
    warn("Sans écrit précis, votre position s’affaiblit.", sub="Les échanges informels s’accumulent.", a_sub="Les échanges", label="Le risque"))
S("Les écrits comptent : un courrier précis, envoyé tôt, renforce votre position en cas de procédure.", P1)(
    law("Bon à savoir", "Un courrier précis, envoyé tôt, renforce votre position.", a_text="un courrier précis",
        note="Utile en cas de procédure", a_note="en cas de procédure"))
S("On analyse le contrat et les échanges, on évalue votre position et les risques, puis on rédige le courrier formel à la partie adverse.", P2)(
    lst("Le dossier", "Ce qu’on fait :",
        [("Contrat et échanges analysés", "on analyse"), ("Position et risques évalués", "on évalue"), ("Courrier formel", "le courrier formel")]))
S("Vous restez l’interlocuteur, avec des arguments solides. Et si le litige va au tribunal, on vous oriente vers un avocat, avec un dossier propre.", P2)(
    brand("Votre position, défendue par écrit.",
          [("user", "Vous gardez la main", "vous restez"), ("scale", "Arguments solides", "des arguments"),
           ("doc", "Dossier propre", "un dossier propre")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre courrier, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
