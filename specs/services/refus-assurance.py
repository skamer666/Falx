"""Vidéo de service — Refus d’une assurance : réclamation (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, lst, process, title, warn

AUDIENCE = "particuliers"
SLUG = "refus-assurance"
NAME = "Refus d’une assurance"

META = {
    "title": "Refus d’une assurance : contestez par écrit",
    "yt_title": "Refus d'assurance en Suisse : contester le refus de l'assureur (ménage, voyage, véhicule)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Refus d'une assurance : ménage, voyage, véhicule, protection juridique. Un refus n'est pas forcément définitif : une exclusion "
                 "doit être claire et s'interprète en faveur de l'assuré en cas de doute. Les prétentions se prescrivent en principe par cinq ans "
                 "(art. 46 LCA). Thrax Legal rédige votre réclamation motivée à l'assureur, à prix fixe."),
    "tags": ["refus assurance", "assurance refuse de payer", "réclamation assureur", "assurance ménage", "assurance voyage", "art. 46 LCA",
             "ombudsman assurance", "exclusion assurance", "Suisse romande", "Thrax Legal"],
    "thumb": ("Assurance", "refuse ?", "Contestez le refus"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Refus d’une assurance : ménage, voyage, véhicule, protection juridique… et votre assureur refuse de payer ?")(
    title("Particuliers · Refus d’assurance", "Votre assurance refuse de payer ?",
          chips=[("Ménage", "ménage"), ("Voyage", "voyage"), ("Véhicule", "véhicule")]))
S("Ou elle ne rembourse qu’une partie. Pourtant, un refus n’est pas forcément définitif, même quand l’assureur invoque une exclusion.", P1)(
    warn("Un refus n’est pas forcément définitif.", sub="Même quand l’assureur invoque une exclusion.", a_sub="même quand", label="Bon à savoir"))
S("Une exclusion doit être claire, et en cas de doute, elle s’interprète en faveur de l’assuré. Les prétentions se prescrivent en principe par cinq ans.", P1)(
    law("Assurance privée", "En cas de doute, l’exclusion joue en faveur de l’assuré.", a_text="une exclusion",
        note="Prescription : en principe cinq ans (art. 46 LCA)", a_note="les prétentions"))
S("On analyse la police, les conditions générales et le refus, on construit les arguments juridiques et contractuels, et on rédige une réclamation motivée, prête à envoyer.", P2)(
    lst("La réclamation", "Ce qu’on fait :",
        [("Police et refus analysés", "on analyse"), ("Arguments juridiques", "les arguments"), ("Réclamation motivée", "une réclamation")]))
S("Et si l’assureur maintient son refus, on vous indique la suite : l’ombudsman de l’assurance privée, qui intervient gratuitement, ou la procédure.", P2)(
    brand("Faites valoir votre contrat.",
          [("arrow", "La suite expliquée", "la suite"), ("scale", "Ombudsman gratuit", "l’ombudsman"),
           ("gavel", "Ou la procédure", "ou la procédure")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre réclamation, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
