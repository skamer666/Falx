"""Guide vidéo — Bail commercial en Suisse : ce qu'il faut vérifier avant de signer."""
from offer import midroll, offer_block
from tpl import S, cards, compare, doc, law, lst, section, stat, statement, steps, table, title, warn

META = {
    "title": "Bail commercial en Suisse : à vérifier avant de signer",
    "yt_title": "Bail commercial en Suisse : les clauses à vérifier avant de signer (guide complet)",
    "chapter0": "Avant de signer un bail",
    "guide_url": "https://thrax-legal.ch/fr/guide/bail-commercial-suisse-guide",
    "yt_intro": ("Bail commercial en Suisse : délai de résiliation de 6 mois, prolongation, garantie de loyer, loyer indexé ou échelonné, frais accessoires, "
                 "travaux et remise en état, défauts et consignation du loyer, sous-location, transfert du bail, contestation du loyer initial et du congé. "
                 "Toutes les clauses à vérifier avant de signer."),
    "tags": ["bail commercial", "bail commercial Suisse", "locaux commerciaux", "résiliation bail commercial", "loyer indexé", "loyer échelonné",
             "garantie de loyer", "transfert de bail", "contester loyer initial", "congé formule officielle", "remise en état", "PME Suisse romande"],
    "thumb": ("Bail", "commercial ?", "Les clauses à vérifier avant de signer"),
    "chrome_from": 4,
}

A1 = "01 · Commercial ou habitation ?"
A2 = "02 · Les clauses à vérifier"
A3 = "03 · Travaux et remise en état"
A4 = "04 · Entretien et défauts"
A5 = "05 · Partir avant la fin"
A6 = "06 · Contester"
A7 = "07 · Fin de bail"
A8 = "08 · Les erreurs fréquentes"
A9 = "09 · Se faire accompagner"

S("Bail commercial en Suisse : c’est souvent cinq ans ou plus d’engagement, et des dizaines, parfois des centaines de milliers de francs de loyers.")(
    title("Guide Thrax Legal", "Bail commercial en Suisse : à vérifier avant de signer", sub="Souvent 5 ans ou plus d’engagement.", a_sub="cinq ans"))
S("Et la plupart des locataires signent sans le faire relire.")(
    warn("La plupart des locataires signent sans faire relire leur bail.", label="Le risque"))
S("Dans cette vidéo : les différences avec un bail d’habitation, les clauses à vérifier ligne par ligne, comment contester un loyer ou un congé, "
  "et le piège numéro un en fin de bail.")(
    steps("Au programme", "Signer un bail commercial sans mauvaise surprise",
          [("Les différences", None, "les différences"), ("Les clauses", None, "les clauses"), ("Contester", None, "comment"), ("Le piège n° 1", None, "le piège")]))

# ---------------------------------------------------------------- 01
S("D’abord : ce qui change par rapport à un logement.", A1)(section("01", "Commercial ou habitation ?", None, size="h1"))
S("Pour des locaux commerciaux, le délai de résiliation légal est de six mois, au lieu de trois. Le juge peut prolonger le bail jusqu’à six ans, au lieu de quatre.", A1)(
    table("Bail commercial", "Ce qui change", ["Point", "Logement", "Locaux commerciaux"],
          [(["Délai de résiliation", "3 mois", "6 mois (art. 266d CO)"], "le délai"), (["Prolongation maximale", "4 ans", "6 ans (art. 272b CO)"], "Le juge")], first_w=500))
S("La garantie de loyer n’a pas de plafond légal, alors qu’elle est limitée à trois mois pour un logement. Et vous pouvez transférer votre bail à un repreneur : "
  "le bailleur ne peut refuser que pour de justes motifs.", A1)(
    table("Bail commercial", "Et aussi", ["Point", "Logement", "Locaux commerciaux"],
          [(["Garantie de loyer", "3 mois au maximum", "Pas de plafond légal"], "La garantie"),
           (["Transfert à un repreneur", "Non prévu", "Possible (art. 263 CO)"], "Et vous pouvez")], first_w=500))

# ---------------------------------------------------------------- 02
S("Ensuite, les clauses à vérifier, ligne par ligne.", A2)(section("02", "Les clauses à vérifier", None, size="h1"))
S("La durée, avec ses options de renouvellement : c’est la clause la plus importante. Un bail de dix ans sans option de sortie peut devenir un boulet si votre activité change.", A2)(
    doc("Clause n° 1", "La durée", "La clause la plus importante.", "Bail à loyer · locaux commerciaux",
        [("Durée", "Fixe ou indéterminée", "La durée"), ("Options", "Renouvellement prévu ?", "options"), ("Sortie", "Une option de sortie ?", "sans option")],
        stamp=("10 ans sans sortie ?", "Un bail"), doc_icon="home"))
S("Le loyer : un loyer indexé sur l’indice des prix n’est valable que si le bail est conclu pour cinq ans au moins. Un loyer échelonné exige trois ans au moins, "
  "avec une seule hausse par an, fixée en francs.", A2)(
    table("Le loyer", "Indexé ou échelonné ?", ["Type", "Condition de validité"],
          [(["Loyer indexé (indice des prix)", "Bail d’au moins 5 ans (art. 269b CO)"], "un loyer indexé"),
           (["Loyer échelonné", "Au moins 3 ans, une hausse par an au plus, en francs (art. 269c CO)"], "Un loyer échelonné")], first_w=620))
S("Si ces conditions ne sont pas remplies, la clause n’est pas valable.", A2)(warn("Conditions non remplies : la clause n’est pas valable.", label="Attention"))
S("Les frais accessoires : seuls ceux expressément mentionnés dans le contrat peuvent vous être facturés en plus du loyer. Tout ce qui n’est pas listé est compris dans le loyer.", A2)(
    law("Art. 257a CO", "Frais accessoires : seuls ceux listés au contrat se paient en plus.", a_text="seuls",
        note="Tout le reste est compris dans le loyer.", a_note="Tout ce"))
S("La garantie : elle doit être déposée sur un compte bancaire à votre nom. Pour des locaux commerciaux, son montant se négocie.", A2)(
    cards("Art. 257e CO", "La garantie de loyer",
          [("lock", "Compte à votre nom", "Dépôt bancaire obligatoire", "un compte"), ("receipt", "Montant", "Se négocie pour les locaux commerciaux", "son montant")]))
midroll("Vous avez un bail sur la table et vous hésitez à signer ? Chez Thrax Legal, c’est exactement le type de dossier qu’on traite pour nos abonnés.",
        "Un bail sur la table, et vous hésitez ?",
        "Vous nous envoyez le bail, on vous signale chaque clause à risque avant la signature. Le lien est dans la description.",
        ("Vous nous envoyez le bail", "Vous nous"), ("On signale chaque clause à risque", "on vous signale"), A2, icons=("home", "search"), chip_at="Chez Thrax")

# ---------------------------------------------------------------- 03
S("Le piège numéro un : les travaux, et la remise en état.", A3)(section("03", "Travaux et remise en état", "Le piège n° 1", size="h1"))
S("Vous aménagez les locaux : cuisine, cloisons, vitrine. Mais à la fin du bail, le bailleur peut exiger la remise en état, sauf accord écrit contraire.", A3)(
    statement([("Cuisine, cloisons, vitrine…", "Vous aménagez", "h2 mute"), ("En fin de bail, le bailleur peut exiger la remise en état.", "Mais à la fin", "h1"),
               ("Sauf accord écrit contraire.", "sauf", "h2")]))
S("Et une indemnité pour la plus-value n’est possible que si le bailleur a donné son accord écrit aux travaux. Réglez par écrit, avant de signer, "
  "qui paie quoi, ce qui reste, et ce qui doit être démonté.", A3)(
    lst("Art. 260a CO", "À régler par écrit, avant de signer",
        [("L’accord écrit du bailleur pour les travaux", "son accord"), ("Qui paie quoi", "qui paie"), ("Ce qui reste", "ce qui reste"), ("Ce qui doit être démonté", "démonté")]))

# ---------------------------------------------------------------- 04
S("Quatrième point : l’entretien et les défauts.", A4)(section("04", "Entretien et défauts"))
S("Les menus travaux d’entretien sont à votre charge. Les défauts plus importants sont à la charge du bailleur.", A4)(
    compare("Art. 259 CO", "Qui répare ?",
            ("Vous", "user", [("Les menus travaux d’entretien", "Les menus")]), ("Le bailleur", "building", [("Les défauts plus importants", "Les défauts")])))
S("S’il ne répare pas, vous pouvez demander une baisse de loyer, voire consigner le loyer.", A4)(
    statement([("Le bailleur ne répare pas ?", "S’il", "h2 mute"), ("Baisse de loyer, voire consignation du loyer.", "vous pouvez", "h1")]))
S("Mais en respectant une procédure précise : un délai écrit d’abord, puis une annonce, puis un dépôt auprès de l’office désigné par le canton. "
  "Une erreur, et vous risquez d’être en retard de paiement.", A4)(
    steps("Consignation du loyer · art. 259g CO", "Une procédure précise",
          [("Délai écrit", "Au bailleur", "un délai"), ("Annonce", "De la consignation", "une annonce"), ("Dépôt", "Office désigné par le canton", "un dépôt")]))

# ---------------------------------------------------------------- 05
S("Cinquième point : partir avant la fin du bail.", A5)(section("05", "Partir avant la fin"))
S("Sous-location : le bailleur ne peut la refuser que pour des motifs précis. Transfert du bail à un repreneur : possible, avec l’accord du bailleur, "
  "qui ne peut refuser que pour de justes motifs. Restitution anticipée : présentez un nouveau locataire solvable et acceptable, et vous êtes libéré.", A5)(
    cards("Trois solutions", "Sortir d’un bail commercial",
          [("user", "Sous-location", "Refus seulement pour des motifs précis (art. 262 CO)", "Sous-location"),
           ("brief", "Transfert à un repreneur", "Refus seulement pour de justes motifs (art. 263 CO)", "Transfert"),
           ("home", "Restitution anticipée", "Un locataire de remplacement solvable (art. 264 CO)", "Restitution")]))

# ---------------------------------------------------------------- 06
S("Sixième point : contester un loyer ou un congé.", A6)(section("06", "Contester un loyer ou un congé", None, size="h1"))
S("Le loyer initial vous semble abusif ? Sous certaines conditions, vous pouvez le contester dans les trente jours après la remise des locaux. "
  "Une hausse en cours de bail doit être notifiée sur formule officielle, et elle se conteste aussi dans les trente jours.", A6)(
    stat("Loyer initial", 30, "pour le contester, sous conditions", "trente", suffix="jours", law="Art. 270 CO", a_label="après",
         side="Une hausse en cours de bail : formule officielle, et 30 jours pour la contester.", a_side="Une hausse"))
S("Un congé du bailleur doit être donné sur formule officielle, sinon il est nul. Vous avez trente jours pour le contester, ou demander une prolongation.", A6)(
    law("Art. 266l et 273 CO", "Congé du bailleur : formule officielle obligatoire, sinon il est nul.", a_text="Un congé",
        note="30 jours pour le contester, ou demander une prolongation.", a_note="Vous avez"))

# ---------------------------------------------------------------- 07
S("En fin de bail, faites un état des lieux de sortie précis. Le bailleur doit signaler les défauts immédiatement. S’il ne le fait pas, il ne peut plus les invoquer plus tard, "
  "sauf défauts cachés.", A7)(
    doc("Art. 267a CO", "L’état des lieux de sortie", None, "État des lieux · sortie",
        [("Constat", "Précis, pièce par pièce", "état des lieux"), ("Défauts", "Signalés immédiatement par le bailleur", "immédiatement"),
         ("Sinon", "Il ne peut plus les invoquer", "S’il ne"), ("Exception", "Défauts cachés", "cachés")], doc_icon="search"))

# ---------------------------------------------------------------- 08
S("Et les erreurs les plus fréquentes.", A8)(section("08", "Les erreurs fréquentes"))
S("Signer sans option de sortie. Accepter une indexation sur un bail de moins de cinq ans. Ne rien écrire sur les travaux. "
  "Laisser passer le délai de trente jours pour contester. Et ne pas faire d’état des lieux d’entrée.", A8)(
    lst("À éviter", "Les 5 erreurs qui coûtent cher",
        [("Signer sans option de sortie", "Signer"), ("Une indexation sur moins de 5 ans", "Accepter"), ("Rien d’écrit sur les travaux", "Ne rien"),
         ("Laisser passer le délai de 30 jours", "Laisser"), ("Pas d’état des lieux d’entrée", "Et ne pas")], mode="cross"))

offer_block(
    A9,
    "Un bail commercial, c’est souvent le plus gros engagement financier d’une PME après les salaires. Le faire relire avant de signer coûte peu. "
    "Ne pas le faire peut coûter des années.",
    "Souvent le plus gros engagement d’une PME, après les salaires.",
    [("Le faire relire avant de signer : peu de chose", "Le faire relire"), ("Ne pas le faire : parfois des années", "Ne pas")],
    "Concrètement : on relit votre bail avant signature, on vous aide à négocier les clauses à risque, et on vous accompagne en cas de hausse, de défaut ou de congé.",
    [("search", "Relecture avant signature", "on relit"), ("pen", "Négocier les clauses à risque", "négocier"), ("receipt", "Hausse de loyer", "hausse"),
     ("home", "Défaut ou congé", "de défaut")],
    "Guide : bail commercial en Suisse",
    intro_mode="dot", intro_kicker="Avant de signer",
)
