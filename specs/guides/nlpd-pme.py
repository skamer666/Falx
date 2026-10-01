"""Guide vidéo — nLPD : ce que votre PME doit faire (protection des données)."""
from offer import midroll, offer_block
from tpl import S, cards, compare, doc, law, lst, section, stat, statement, steps, table, title

META = {
    "title": "nLPD : ce que votre PME doit faire",
    "yt_title": "nLPD : protection des données en Suisse, ce que votre PME doit faire (guide 2026)",
    "chapter0": "nLPD : qui est concerné ?",
    "guide_url": "https://thrax-legal.ch/fr/guide/conformite-nlpd-pme",
    "yt_intro": ("nLPD : la nouvelle loi suisse sur la protection des données s’applique à toutes les entreprises depuis le 1er septembre 2023. "
                 "Politique de confidentialité, sous-traitants, transferts à l’étranger, sécurité, fuites de données, droit d’accès, registre des traitements, "
                 "cookies, outils d’IA et sanctions : ce que votre PME doit faire concrètement, avec une méthode en 10 étapes."),
    "tags": ["nLPD", "LPD", "protection des données Suisse", "nLPD PME", "politique de confidentialité", "RGPD Suisse", "registre des traitements",
             "PFPDT", "fuite de données", "cookies Suisse", "IA et données personnelles", "conformité nLPD"],
    "thumb": ("nLPD :", "en règle ?", "Ce que votre PME doit faire"),
    "chrome_from": 4,
}

A1 = "01 · Qui est concerné ?"
A2 = "02 · Informer"
A3 = "03 · Vos sous-traitants"
A4 = "04 · Transferts à l’étranger"
A5 = "05 · Sécurité et fuites"
A6 = "06 · Ce dont vous êtes dispensé"
A7 = "07 · Cas particuliers"
A8 = "08 · Sanctions"
A9 = "09 · La méthode en 10 étapes"
A10 = "10 · Se faire accompagner"

S("nLPD : depuis le 1er septembre 2023, la nouvelle loi suisse sur la protection des données s’applique à toutes les entreprises, même aux indépendants.")(
    title("Guide Thrax Legal", "nLPD : ce que votre PME doit faire", sub="En vigueur depuis le 1er septembre 2023, pour toutes les entreprises.", a_sub="depuis"))
S("Et les amendes peuvent atteindre deux cent cinquante mille francs. Elles visent personnellement les responsables, souvent la direction.")(
    stat("Sanctions nLPD", 250000, "d’amende au maximum, pour les personnes responsables", "deux", prefix="CHF", law="Art. 60 ss nLPD", a_label="Elles visent"))
S("Dans cette vidéo : ce que la loi exige concrètement d’une PME, ce dont vous êtes dispensé, ce qu’il faut faire avec vos outils, y compris l’intelligence artificielle, "
  "et une méthode simple pour vous mettre en conformité.")(
    steps("Au programme", "La nLPD, concrètement",
          [("Les obligations", None, "ce que la loi"), ("Les dispenses", None, "ce dont"), ("Outils et IA", None, "ce qu’il faut"), ("La méthode", None, "une méthode")]))

# ---------------------------------------------------------------- 01
S("Première question : qui est concerné ?", A1)(section("01", "Qui est concerné ?"))
S("Tout le monde. Dès que vous traitez des données personnelles, c’est-à-dire des noms, des e-mails, des numéros de téléphone, des dossiers clients ou employés, "
  "vous êtes concerné. Un simple fichier Excel de clients suffit.", A1)(
    cards("Données personnelles", "Un fichier Excel de clients suffit",
          [("user", "Noms", None, "des noms"), ("mail", "E-mails", None, "des e-mails"), ("chat", "Téléphones", None, "des numéros"),
           ("doc", "Dossiers clients", None, "des dossiers"), ("brief", "Dossiers employés", None, "employés"), ("data", "Fichier Excel", "Ça suffit", "Un simple")]))
S("Les principes : collecter de façon transparente, seulement ce qui est nécessaire, pour un but précis. Garder les données exactes. "
  "Et ne pas les conserver plus longtemps qu’utile.", A1)(
    lst("Art. 6 nLPD", "Les principes à respecter",
        [("Transparence", "transparente"), ("Seulement le nécessaire", "seulement"), ("Un but précis", "pour un but"), ("Des données exactes", "exactes"),
         ("Pas plus longtemps qu’utile", "Et ne pas")]))

# ---------------------------------------------------------------- 02
S("Obligation numéro un : informer.", A2)(section("02", "Informer", "Obligation n° 1"))
S("Toute personne dont vous collectez les données doit savoir qui vous êtes, ce que vous en faites, à qui vous les transmettez, et dans quels pays. "
  "En pratique : une politique de confidentialité à jour, sur votre site et dans vos documents.", A2)(
    doc("Art. 19 nLPD", "Une politique de confidentialité à jour.", "Sur votre site et dans vos documents.", "Politique de confidentialité",
        [("Qui vous êtes", "Identité et coordonnées", "qui vous"), ("Ce que vous en faites", "Finalités du traitement", "ce que vous"),
         ("À qui", "Destinataires des données", "à qui"), ("Dans quels pays", "Transferts à l’étranger", "dans quels")], doc_icon="shield"))

# ---------------------------------------------------------------- 03
S("Obligation numéro deux : encadrer vos sous-traitants.", A3)(section("03", "Vos sous-traitants", "Obligation n° 2"))
S("Votre hébergeur, votre logiciel de comptabilité, votre outil d’e-mailing, votre CRM traitent des données pour vous. "
  "Vous devez vous assurer, par contrat, qu’ils les protègent.", A3)(
    cards("Art. 9 nLPD", "Ils traitent des données pour vous",
          [("data", "Hébergeur", None, "hébergeur"), ("receipt", "Comptabilité", None, "logiciel"), ("mail", "E-mailing", None, "outil"),
           ("user", "CRM", None, "CRM"), ("lock", "Un contrat qui les engage", "À vérifier", "par contrat")]))
midroll("Vous n’avez pas de politique de confidentialité, ou elle a été copiée d’un site européen ? Chez Thrax Legal, on met les PME en conformité avec la nLPD.",
        "Pas de politique de confidentialité, ou copiée d’un site européen ?",
        "Vous nous décrivez votre activité, on rédige votre politique de confidentialité. Le lien est dans la description.",
        ("Vous nous décrivez votre activité", "Vous nous"), ("On rédige votre politique de confidentialité", "on rédige"), A3,
        icons=("brief", "shield"), chip_at="Chez Thrax")

# ---------------------------------------------------------------- 04
S("Obligation numéro trois : les transferts à l’étranger.", A4)(section("04", "Transferts à l’étranger", "Obligation n° 3", size="h1"))
S("Vos données partent sur des serveurs aux États-Unis ou ailleurs ? Le Conseil fédéral tient une liste des pays qui offrent une protection adéquate.", A4)(
    statement([("Des serveurs aux États-Unis ou ailleurs ?", "Vos données", "h2 mute"),
               ("Le Conseil fédéral liste les pays à protection adéquate.", "Le Conseil", "h1")]))
S("L’Union européenne en fait partie. Pour les autres pays, il faut des garanties, par exemple des clauses contractuelles types, ou une certification de votre fournisseur.", A4)(
    table("Art. 16 nLPD", "Vos données partent à l’étranger ?", ["Destination", "Ce qu’il faut"],
          [(["Pays à protection adéquate (UE, EEE…)", "Rien de plus"], "L’Union"),
           (["Autres pays, par exemple les États-Unis", "Des garanties : clauses types ou certification du fournisseur"], "Pour les autres")], first_w=720))

# ---------------------------------------------------------------- 05
S("Obligation numéro quatre : la sécurité, et les fuites de données.", A5)(section("05", "Sécurité et fuites", "Obligation n° 4"))
S("Vous devez protéger les données de façon adaptée : accès limités, mots de passe solides, sauvegardes.", A5)(
    lst("Art. 8 nLPD", "Une sécurité adaptée", [("Accès limités", "accès"), ("Mots de passe solides", "mots"), ("Sauvegardes", "sauvegardes")]))
S("En cas de fuite présentant un risque élevé pour les personnes, vous devez l’annoncer au Préposé fédéral dans les meilleurs délais.", A5)(
    law("Art. 24 nLPD", "Fuite à risque élevé : l’annoncer au Préposé fédéral, dans les meilleurs délais.", a_text="vous devez"))
S("Toute personne peut aussi vous demander quelles données vous avez sur elle. Vous devez en principe répondre dans les trente jours, gratuitement.", A5)(
    stat("Droit d’accès", 30, "pour répondre, en principe gratuitement", "trente", suffix="jours", law="Art. 25 nLPD", a_label="gratuitement",
         side="Toute personne peut demander quelles données vous avez sur elle.", a_side="Toute"))

# ---------------------------------------------------------------- 06
S("Bonne nouvelle : il y a aussi ce dont vous êtes dispensé.", A6)(section("06", "Ce dont vous êtes dispensé", None, size="h1"))
S("Le registre des activités de traitement : les entreprises de moins de deux cent cinquante collaborateurs en sont en principe dispensées, "
  "sauf si elles traitent des données sensibles à grande échelle, ou font du profilage à risque élevé.", A6)(
    stat("Registre des traitements", 250, "collaborateurs : en dessous, dispense en principe", "deux", prefix="moins de", law="Art. 12 nLPD · art. 24 OPDo",
         a_label="en sont", side="Sauf données sensibles à grande échelle, ou profilage à risque élevé.", a_side="sauf"))
S("Et le conseiller à la protection des données n’est pas obligatoire.", A6)(
    statement([("Conseiller à la protection des données ?", "Et le", "h2 mute"), ("Pas obligatoire.", "n’est pas", "h0")]))

# ---------------------------------------------------------------- 07
S("Attention aux données sensibles : santé, religion, opinions politiques, données biométriques. Dans un cabinet de santé, une fiduciaire ou une agence RH, "
  "les exigences augmentent.", A7)(
    cards("Données sensibles", "Des exigences renforcées",
          [("shield", "Santé", None, "santé"), ("user", "Religion", None, "religion"), ("chat", "Opinions politiques", None, "opinions"),
           ("lock", "Biométrie", None, "biométriques")]))
S("Votre site web : la loi suisse n’impose pas un bandeau de cookies avec consentement préalable pour tous les cookies. Mais vous devez informer, et permettre de refuser. "
  "Et si vous ciblez des clients dans l’Union européenne, le RGPD peut aussi s’appliquer.", A7)(
    compare("Site web et cookies", "Ce que dit la loi suisse",
            ("Pas imposé", "stop", [("Un bandeau de consentement pour tous les cookies", "n’impose")], "cross"),
            ("À faire", "shield", [("Informer", "informer"), ("Permettre de refuser", "refuser"), ("RGPD si vous ciblez l’UE", "Et si")])))
S("Et l’intelligence artificielle : copier les données d’un client dans un outil d’IA, c’est un traitement de données, et souvent un transfert à l’étranger.", A7)(
    statement([("Des données client dans une IA ?", "copier", "h2 mute"), ("C’est un traitement de données.", "c’est un", "h1"),
               ("Et souvent un transfert à l’étranger.", "et souvent", "h1")]))
S("Avant de le faire, vérifiez les conditions de l’outil, l’endroit où les données sont stockées, et si elles servent à entraîner le modèle.", A7)(
    lst("Outils d’IA", "À vérifier avant de copier des données",
        [("Les conditions de l’outil", "les conditions"), ("Où les données sont stockées", "l’endroit"), ("Servent-elles à entraîner le modèle ?", "et si")]))

# ---------------------------------------------------------------- 08
S("Les sanctions visent surtout certaines violations intentionnelles : ne pas informer, ne pas répondre à une demande d’accès, confier des données à un sous-traitant "
  "sans garanties. Elles frappent personnellement les responsables, souvent la direction.", A8)(
    lst("Art. 60 ss nLPD", "Ce qui est sanctionné",
        [("Ne pas informer", "ne pas informer"), ("Ne pas répondre à une demande d’accès", "ne pas répondre"), ("Sous-traitant sans garanties", "confier"),
         ("Amende personnelle, souvent pour la direction", "Elles frappent")], mode="cross"))

# ---------------------------------------------------------------- 09
S("Pour vous mettre en conformité, voici une méthode en dix étapes.", A9)(section("09", "La méthode en 10 étapes", None, size="h1"))
S("Lister vos données. Mettre à jour la politique de confidentialité. Vérifier les sous-traitants. Contrôler les transferts. Sécuriser.", A9)(
    lst("Étapes 1 à 5", "Mettre votre PME en conformité",
        [("Lister vos données", "Lister"), ("Mettre à jour la politique de confidentialité", "Mettre"), ("Vérifier les sous-traitants", "Vérifier"),
         ("Contrôler les transferts", "Contrôler"), ("Sécuriser", "Sécuriser")], mode="num"))
S("Prévoir la procédure en cas de fuite. Savoir répondre aux demandes. Fixer des durées de conservation. Former l’équipe. Puis réviser chaque année.", A9)(
    lst("Étapes 6 à 10", "Et la tenir dans la durée",
        [("Prévoir la procédure en cas de fuite", "Prévoir"), ("Savoir répondre aux demandes", "Savoir"), ("Fixer des durées de conservation", "Fixer"),
         ("Former l’équipe", "Former"), ("Réviser chaque année", "Puis")], mode="num", start=6))

offer_block(
    A10,
    "La conformité nLPD, ce n’est pas un projet de six mois. Pour une PME, c’est quelques documents bien faits et quelques bons réflexes. Encore faut-il savoir lesquels.",
    "La conformité nLPD, ce n’est pas un projet de six mois.",
    [("Quelques documents bien faits", "quelques documents"), ("Quelques bons réflexes", "quelques bons"), ("Encore faut-il savoir lesquels", "Encore")],
    "Concrètement : on fait l’état des lieux de vos données, on rédige votre politique de confidentialité, on vérifie vos contrats de sous-traitance et vos outils, "
    "et on vous aide en cas de fuite ou de demande d’accès.",
    [("search", "État des lieux de vos données", "l’état"), ("shield", "Politique de confidentialité", "on rédige"),
     ("doc", "Sous-traitants et outils", "on vérifie"), ("lock", "Fuites et demandes d’accès", "on vous aide")],
    "Guide : nLPD pour les PME",
    intro_mode="check", intro_kicker="Bonne nouvelle",
)
