"""Vidéo de service — Relecture de bail commercial (entreprises)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, cards, law, process, title, warn

AUDIENCE = "entreprises"
SLUG = "relecture-bail-commercial"
NAME = "Relecture de bail commercial"

META = {
    "title": "Relecture de bail commercial",
    "yt_title": "Relecture de bail commercial en Suisse : loyer, indexation, durée, remise en état (art. 270 CO)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour entreprises", "https://thrax-legal.ch/fr/entreprises"),
              ("Le guide complet", "https://thrax-legal.ch/fr/guide/bail-commercial-suisse-guide")],
    "yt_intro": ("Relecture de bail commercial : un bail commercial vous engage souvent pour plusieurs années. Loyer, indexation, durée, options, "
                 "travaux, remise en état : Thrax Legal relit le bail et ses annexes et vous signale les points à négocier. Le loyer initial d'un "
                 "local commercial peut aussi être contesté (art. 270 CO). À prix fixe."),
    "tags": ["bail commercial", "relecture bail commercial", "local commercial", "loyer commercial", "indexation loyer", "art. 270 CO",
             "remise en état", "reprise de commerce", "PME Suisse romande", "Thrax Legal"],
    "thumb": ("Bail", "commercial ?", "Négociez avant de signer"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, service juridique externalisé à prix fixe pour les indépendants et les PME de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Relecture de bail commercial : vous allez louer un local pour votre entreprise ?")(
    title("Entreprises · Bail commercial", "Un local commercial à louer ?",
          chips=[("Local", "un local"), ("Entreprise", "votre entreprise")]))
S("Un bail commercial vous engage souvent pour plusieurs années. Une clause mal négociée vous suit jusqu’au bout.", P1)(
    warn("Un bail commercial vous engage pour des années.", sub="Une clause mal négociée vous suit jusqu’au bout.", a_sub="Une clause", label="Le risque"))
S("Bon à savoir : le loyer initial d’un local commercial peut aussi être contesté. Et la limite de trois mois de garantie ne vaut que pour les logements.", P1)(
    law("Art. 270 CO", "Le loyer initial d’un local commercial peut être contesté.", a_text="le loyer initial",
        note="La limite de trois mois de garantie ne vaut que pour les logements", a_note="Et la limite"))
S("On relit le bail et ses annexes, et on vous signale les points à négocier : loyer, indexation, durée, options, travaux et remise en état.", P2)(
    cards("La relecture", "Les points à négocier :",
          [("receipt", "Loyer", "", "loyer"), ("data", "Indexation", "", "indexation"), ("clock", "Durée", "", "durée"),
           ("check", "Options", "", "options"), ("building", "Travaux", "", "travaux"), ("home", "Remise en état", "", "remise en état")]))
S("Vous recevez aussi la liste des questions à poser au bailleur. Et pour une reprise de commerce, le pas-de-porte est analysé.", P2)(
    brand("Signez en connaissance de cause.",
          [("question", "Questions au bailleur", "la liste"), ("brief", "Reprise de commerce", "une reprise"), ("search", "Pas-de-porte", "le pas-de-porte")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre relecture, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
