"""Vidéo de service — Contrat commercial sur mesure (entreprises)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, lst, process, title, warn

AUDIENCE = "entreprises"
SLUG = "contrat-commercial-sur-mesure"
NAME = "Contrat commercial sur mesure"

META = {
    "title": "Contrat commercial sur mesure",
    "yt_title": "Contrat commercial sur mesure en Suisse : prestation, sous-traitance, distribution, partenariat",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour entreprises", "https://thrax-legal.ch/fr/entreprises")],
    "yt_intro": ("Contrat commercial sur mesure : prestation, sous-traitance, distribution, partenariat. La plupart des contrats commerciaux ne "
                 "requièrent aucune forme, mais un écrit clair évite l'essentiel des litiges. Thrax Legal rédige un contrat complet, adapté à "
                 "votre relation commerciale, à prix fixe."),
    "tags": ["contrat commercial", "contrat de prestation", "contrat de sous-traitance", "contrat de distribution", "contrat de partenariat",
             "rédaction de contrat", "clause de responsabilité", "for juridique", "PME Suisse romande", "Thrax Legal"],
    "thumb": ("Contrat", "commercial ?", "Un contrat qui vous protège"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, service juridique externalisé à prix fixe pour les indépendants et les PME de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Contrat commercial sur mesure : prestation, sous-traitance, distribution, partenariat… un accord important à formaliser ?")(
    title("Entreprises · Contrat commercial", "Un accord important à formaliser ?",
          chips=[("Prestation", "prestation"), ("Sous-traitance", "sous-traitance"), ("Distribution", "distribution"), ("Partenariat", "partenariat")]))
S("Une poignée de main, quelques e-mails… Et le jour du désaccord, chacun a sa version.", P1)(
    warn("Sans contrat clair, chacun a sa version.", sub="Le jour du désaccord.", a_sub="le jour", label="Le risque"))
S("Un écrit clair évite l’essentiel des litiges. Pourtant, la plupart des contrats commerciaux ne requièrent aucune forme.", P1)(
    law("Bon à savoir", "Un écrit clair évite l’essentiel des litiges.", a_text="un écrit clair",
        note="La plupart des contrats commerciaux ne requièrent aucune forme", a_note="la plupart"))
S("On cadre l’accord et les risques, puis on rédige un contrat complet : objet, prix, délais, responsabilité, résiliation et for.", P2)(
    lst("Le contrat", "Complet, pour votre relation :",
        [("Accord et risques cadrés", "on cadre"), ("Objet, prix, délais", "objet"),
         ("Responsabilité", "responsabilité"), ("Résiliation et for", "résiliation")]))
S("Un tour de corrections est inclus. Et si l’autre partie propose son propre contrat, la relecture est plus adaptée : on vous le dit.", P2)(
    brand("Un contrat qui vous protège.",
          [("pen", "Corrections incluses", "un tour"), ("search", "Relecture si besoin", "la relecture"), ("check", "Conseil honnête", "on vous le dit")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre contrat, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
