"""Vidéo de service — Relecture de contrat commercial (entreprises)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, cards, lst, process, title, warn

AUDIENCE = "entreprises"
SLUG = "relecture-contrat-commercial"
NAME = "Relecture de contrat commercial"

META = {
    "title": "Relecture de contrat commercial",
    "yt_title": "Relecture de contrat commercial : les clauses à risque avant de signer (responsabilité, pénalités, for)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour entreprises", "https://thrax-legal.ch/fr/entreprises")],
    "yt_intro": ("Relecture de contrat commercial : un client ou un fournisseur vous soumet son contrat ? Les clauses de responsabilité, de "
                 "pénalité, de durée et de for sont celles qui coûtent le plus cher en cas de problème. Thrax Legal relit le contrat, classe "
                 "les risques par priorité et propose des corrections à négocier, à prix fixe."),
    "tags": ["relecture contrat commercial", "contrat fournisseur", "contrat client", "clause de responsabilité", "clause pénale",
             "for juridique", "négocier un contrat", "B2B Suisse", "PME Suisse romande", "Thrax Legal"],
    "thumb": ("Contrat", "fournisseur ?", "Repérez les clauses à risque"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, service juridique externalisé à prix fixe pour les indépendants et les PME de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Relecture de contrat commercial : un client ou un fournisseur vous soumet son contrat ?")(
    title("Entreprises · Relecture de contrat", "On vous soumet un contrat à signer ?",
          chips=[("Client", "un client"), ("Fournisseur", "un fournisseur")]))
S("Attention : son contrat est rédigé pour lui, pour protéger ses intérêts. Pas pour vous.", P1)(
    warn("Son contrat est rédigé pour lui.", sub="Pas pour vous.", a_sub="pas pour vous", label="Le risque"))
S("Les clauses qui coûtent le plus cher en cas de problème : la responsabilité, les pénalités, la durée et le for.", P1)(
    cards("Bon à savoir", "Les clauses qui coûtent cher :",
          [("shield", "Responsabilité", "", "la responsabilité"), ("receipt", "Pénalités", "", "les pénalités"),
           ("clock", "Durée", "", "la durée"), ("building", "For", "", "le for")]))
S("On relit tout le contrat, on classe les risques par priorité, et on propose des corrections en suivi des modifications.", P2)(
    lst("La relecture", "Avant de signer :",
        [("Relecture complète", "on relit"), ("Risques par priorité", "on classe"), ("Corrections en suivi", "des corrections")]))
S("Vous négociez avec une liste claire, point par point. Et la relecture en anglais est possible.", P2)(
    brand("Signez en connaissance de cause.",
          [("pen", "Prêt à négocier", "vous négociez"), ("scale", "Liste claire", "une liste claire"), ("chat", "En anglais aussi", "en anglais")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre relecture, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
