"""Guide vidéo — CGV en Suisse : quand elles s'appliquent, clauses clés, B2B/B2C, erreurs."""
from offer import midroll, offer_block
from tpl import S, cards, compare, doc, law, lst, section, statement, steps, table, title, warn

META = {
    "title": "CGV en Suisse : les règles pour qu’elles s’appliquent vraiment",
    "yt_title": "CGV en Suisse : rédiger des conditions générales valables (guide complet PME)",
    "chapter0": "CGV : êtes-vous protégé ?",
    "guide_url": "https://thrax-legal.ch/fr/guide/cgv-suisses-guide",
    "yt_intro": ("CGV en Suisse : quand vos conditions générales lient-elles vraiment vos clients ? Intégration au contrat, règle de l’insolite, "
                 "clauses indispensables (paiement, garantie, responsabilité, for), différences B2B / B2C (art. 8 LCD), réserve de propriété "
                 "et mandat (art. 404 CO) : le guide complet pour les PME et indépendants."),
    "tags": ["CGV", "CGV Suisse", "conditions générales", "conditions générales de vente", "rédiger CGV", "règle de l’insolite", "art. 8 LCD",
             "réserve de propriété", "art. 404 CO", "clause de responsabilité", "PME Suisse romande", "droit suisse"],
    "thumb": ("Vos CGV", "valables ?", "Le guide pour les PME suisses"),
    "chrome_from": 5,
}

A1 = "01 · Faut-il des CGV ?"
A2 = "02 · Acceptées avant la conclusion"
A3 = "03 · La règle de l’insolite"
A4 = "04 · Clients particuliers"
A5 = "05 · Les clauses indispensables"
A6 = "06 · La réserve de propriété"
A7 = "07 · Prestataires de services"
A8 = "08 · Les erreurs qui coûtent cher"
A9 = "09 · Se faire accompagner"

S("CGV en Suisse : vos conditions générales sont sur votre site, ou au dos de vos factures. Vous pensez être protégé.")(
    title("Guide Thrax Legal", "CGV en Suisse : êtes-vous vraiment protégé ?", sub="Sur votre site, au dos de vos factures…", a_sub="au dos"))
S("Mais le jour d’un litige, il y a de bonnes chances qu’elles ne s’appliquent pas du tout.")(
    warn("Le jour d’un litige, elles ne s’appliquent peut-être pas du tout.", a_text="Mais", label="Le risque"))
S("Dans cette vidéo : quand vos CGV lient vraiment vos clients, les clauses indispensables, la différence entre clients professionnels et consommateurs, "
  "et les erreurs qui rendent des CGV inutiles.")(
    steps("Au programme", "Des CGV qui tiennent en Suisse",
          [("Quand elles s’appliquent", None, "quand vos"), ("Les clauses clés", None, "les clauses"), ("B2B ou B2C", None, "la différence"),
           ("Les erreurs", None, "les erreurs")]))
S("Et à la fin, je vous dis comment obtenir des CGV solides sans y passer des semaines.")(
    statement([("Et à la fin :", "Et à la fin", "h2 mute"), ("des CGV solides, sans y passer des semaines.", "des CGV", "h1")]))

# ---------------------------------------------------------------- 01
S("Première question : faut-il des CGV ?", A1)(section("01", "Faut-il des CGV ?"))
S("Aucune loi n’oblige une entreprise suisse à avoir des CGV. Mais sans elles, c’est le Code des obligations qui s’applique, avec des règles générales, "
  "rarement à votre avantage.", A1)(
    statement([("Aucune loi ne les impose.", "Aucune", "h1"), ("Mais sans CGV, c’est le Code des obligations qui s’applique.", "Mais sans", "h2 mute"),
               ("Rarement à votre avantage.", "rarement", "h1")]))
S("Pas de frais de rappel. Une garantie qui peut s’étendre. Pas de limite de responsabilité. Un for qui n’est pas forcément chez vous.", A1)(
    lst("Sans CGV", "Ce que vous perdez",
        [("Pas de frais de rappel", "Pas de frais"), ("Une garantie qui peut s’étendre", "Une garantie"),
         ("Pas de limite de responsabilité", "Pas de limite"), ("Un tribunal pas forcément chez vous", "Un for")], mode="cross"))

# ---------------------------------------------------------------- 02
S("Règle numéro un : vos CGV doivent être acceptées avant la conclusion du contrat.", A2)(
    section("02", "Acceptées avant la conclusion", "Règle n° 1", size="h1"))
S("Vos CGV ne lient votre client que s’il a pu les lire avant de conclure, et qu’il les a acceptées.", A2)(
    law("Intégration des CGV", "Lues avant de conclure. Et acceptées.", a_text="avant de conclure"))
S("En ligne, un lien et une case à cocher avant la commande : ça fonctionne. Des CGV jointes au devis signé, avec une mention claire : ça fonctionne.", A2)(
    table("Ça fonctionne", "Intégrer vos CGV correctement", ["Situation", "Valable ?"],
          [(["Lien + case à cocher avant la commande en ligne", "Oui"], "En ligne"),
           (["CGV jointes au devis signé, avec une mention claire", "Oui"], "Des CGV jointes")], first_w=1180))
S("Imprimées au dos d’une facture envoyée après la prestation : en principe, non. Et des CGV jamais mentionnées, disponibles « sur demande » : non plus.", A2)(
    table("Ça ne fonctionne pas", "Les intégrations qui ne valent rien", ["Situation", "Valable ?"],
          [(["Au dos d’une facture envoyée après la prestation", "En principe non"], "Imprimées"),
           (["Jamais mentionnées, « disponibles sur demande »", "Non"], "Et des CGV")], first_w=1100))

# ---------------------------------------------------------------- 03
S("Règle numéro deux : la règle de l’insolite.", A3)(section("03", "La règle de l’insolite", "Règle n° 2"))
S("Une clause surprenante et défavorable, que le client ne pouvait pas raisonnablement attendre, ne s’applique pas si vous ne l’avez pas signalée clairement. "
  "Mettez-la en gras, ou faites-la accepter séparément.", A3)(
    doc("Règle de l’insolite", "Une clause surprenante doit être signalée.", None, "Conditions générales · page 3",
        [("Clause insolite", "Défavorable et inattendue pour le client", "Une clause"), ("Sans mise en évidence", "Elle ne s’applique pas", "ne s’applique"),
         ("La parade", "En gras, ou acceptée séparément", "Mettez-la")], doc_icon="doc"))
S("Et en cas de doute sur le sens d’une clause, elle s’interprète contre celui qui l’a rédigée, donc contre vous. Une formulation vague vous coûte.", A3)(
    warn("En cas de doute, une clause s’interprète contre celui qui l’a rédigée.", sub="Donc contre vous. Une formulation vague vous coûte.",
         a_text="Et en cas", a_sub="donc contre", label="À savoir"))

# ---------------------------------------------------------------- 04
S("Règle numéro trois : les consommateurs sont mieux protégés.", A4)(section("04", "Clients particuliers", "Règle n° 3 · Les consommateurs sont mieux protégés"))
S("Face à des particuliers, la loi contre la concurrence déloyale interdit les clauses qui créent un déséquilibre important et injustifié à leur détriment.", A4)(
    law("Art. 8 LCD", "Aucune clause qui déséquilibre fortement le contrat au détriment du consommateur.", a_text="interdit"))
S("Les prix affichés doivent être les prix finaux, TVA comprise. Pour les biens neufs, la garantie ne peut pas descendre sous deux ans. "
  "Et un consommateur peut toujours agir devant le tribunal de son domicile.", A4)(
    table("B2B ou B2C", "Ce qui change avec les consommateurs", ["Point", "Entre entreprises", "Avec des consommateurs"],
          [(["Prix affichés", "Hors TVA possible", "Prix final, TVA comprise"], "Les prix"),
           (["Garantie, biens neufs", "Peut être limitée", "2 ans au minimum"], "Pour les biens"),
           (["Tribunal", "For convenu possible", "Domicile du consommateur"], "Et un consommateur")], first_w=420))
S("Une bonne nouvelle au passage : contrairement à l’Union européenne, la Suisse ne prévoit pas de droit de rétractation général pour la vente en ligne.", A4)(
    statement([("Bon à savoir", "Une bonne", "h3 mute"), ("En Suisse, pas de droit de rétractation général pour la vente en ligne.", "la Suisse", "h1")]))
midroll("Vous vous rendez compte que vos CGV datent, ou qu’elles ont été copiées d’un modèle étranger ?",
        "Des CGV qui datent, ou copiées d’un modèle ?",
        "Chez Thrax Legal, on rédige des CGV adaptées à votre activité et conformes au droit suisse. Le lien est dans la description.",
        ("Vous décrivez votre activité", "Chez Thrax"), ("Des CGV sur mesure, en droit suisse", "on rédige"), A4, icons=("brief", "pen"))

# ---------------------------------------------------------------- 05
S("Au minimum, vos CGV doivent régler quelques points essentiels.", A5)(section("05", "Les clauses indispensables", None, size="h1"))
S("Le paiement : un délai précis, qui vaut terme convenu. Votre client sera alors en demeure automatiquement à l’échéance. "
  "Ajoutez les intérêts de retard et les frais de rappel. Sans clause, vous ne pouvez pas les réclamer.", A5)(
    doc("Clause n° 1", "Le paiement", "Sans clause, pas de frais de rappel.", "CGV · Paiement",
        [("Délai", "Payable à 30 jours : terme convenu", "un délai"), ("Effet", "Demeure automatique à l’échéance", "Votre client"),
         ("Intérêts de retard", "Prévus dans les CGV", "Ajoutez"), ("Frais de rappel", "Prévus et chiffrés", "les frais")], doc_icon="receipt"))
S("La livraison et le transfert des risques : qui supporte la perte si la marchandise est abîmée en route ? La garantie : entre entreprises, vous pouvez la limiter. "
  "Et rappelez que les défauts doivent vous être signalés rapidement.", A5)(
    cards("Clauses n° 2 et 3", "Livraison et garantie",
          [("brief", "Transfert des risques", "Qui supporte une perte en route ?", "La livraison"), ("shield", "Garantie limitée", "Possible entre entreprises", "La garantie"),
           ("chat", "Avis des défauts", "À signaler rapidement", "rappelez")]))
S("La responsabilité : vous pouvez la limiter, mais pas l’exclure totalement. Une exclusion en cas de faute grave ou d’intention est nulle. "
  "Une clause trop large risque de tomber en entier.", A5)(
    law("Art. 100 CO", "Limiter sa responsabilité : oui. L’exclure pour faute grave : non.", a_text="vous pouvez",
        note="Une clause trop large risque de tomber en entier.", a_note="Une clause"))
S("La propriété intellectuelle : qui possède ce que vous créez ? Le droit applicable et le for : droit suisse, tribunaux de votre siège, au moins avec les clients professionnels.", A5)(
    cards("Clauses n° 4 à 6", "Propriété intellectuelle, droit et for",
          [("pen", "Propriété intellectuelle", "Qui possède ce que vous créez ?", "La propriété"), ("scale", "Droit suisse", "Droit applicable", "Le droit"),
           ("building", "For à votre siège", "Avec les clients professionnels", "tribunaux")]))

# ---------------------------------------------------------------- 06
S("Attention à un piège classique : la réserve de propriété.", A6)(section("06", "Le piège de la réserve de propriété", None, size="h1"))
S("Beaucoup de CGV prévoient que la marchandise reste votre propriété jusqu’au paiement complet. Mais en Suisse, cette clause n’a d’effet que si elle est inscrite "
  "au registre des pactes de réserve de propriété, à l’office des poursuites du domicile de l’acheteur. Sans inscription, elle ne vous protège pas.", A6)(
    doc("Art. 715 CC", "Une clause qui ne suffit pas.", "Sans inscription, elle ne vous protège pas.", "Registre des pactes de réserve de propriété",
        [("Clause de vos CGV", "Propriété réservée jusqu’au paiement", "Beaucoup"), ("Condition", "Inscription au registre", "inscrite"),
         ("Où", "Office des poursuites du domicile de l’acheteur", "l’office")], stamp=("Sans inscription : sans effet", "Sans inscription"), doc_icon="doc"))

# ---------------------------------------------------------------- 07
S("Si vous vendez des services, attention : votre contrat est souvent un mandat.", A7)(section("07", "Prestataires : le mandat", "Si vous vendez des services"))
S("Et dans un mandat, chaque partie peut résilier à tout moment. C’est une règle impérative : vos CGV ne peuvent pas l’empêcher.", A7)(
    law("Art. 404 CO", "Un mandat peut être résilié à tout moment, par chaque partie.", a_text="chaque partie",
        note="Règle impérative : vos CGV ne peuvent pas l’empêcher.", a_note="C’est une règle"))
S("En revanche, elles peuvent prévoir clairement la facturation du travail déjà effectué. Beaucoup de prestataires l’ignorent, "
  "et le découvrent quand un client s’en va au milieu d’un projet.", A7)(
    compare("Vos CGV face à l’art. 404 CO", "Ce qu’elles peuvent faire",
            ("Impossible", "stop", [("Empêcher la résiliation", "En revanche")], "cross"),
            ("Possible", "pen", [("Facturer le travail déjà effectué", "la facturation"), ("Le prévoir clairement, à l’avance", "Beaucoup")])))

# ---------------------------------------------------------------- 08
S("Pour finir, les erreurs qui coûtent cher.", A8)(section("08", "Les erreurs qui coûtent cher", None, size="h1"))
S("Copier les CGV d’un concurrent, ou un modèle étranger qui cite le droit français ou le RGPD hors contexte. Exclure toute responsabilité. "
  "Ne rien prévoir sur les retards de paiement.", A8)(
    lst("À éviter", "Les erreurs classiques",
        [("Copier un concurrent ou un modèle étranger", "Copier"), ("Exclure toute responsabilité", "Exclure"), ("Rien sur les retards de paiement", "Ne rien")], mode="cross"))
S("Oublier d’inscrire la réserve de propriété. Et ne jamais faire accepter ses CGV avant la commande.", A8)(
    lst("À éviter", "Et aussi",
        [("Réserve de propriété non inscrite", "Oublier"), ("CGV jamais acceptées avant la commande", "Et ne jamais")], mode="cross"))

offer_block(
    A9,
    "Des CGV mal rédigées, c’est pire que pas de CGV : vous croyez être protégé, et vous découvrez le contraire le jour du litige.",
    "Des CGV mal rédigées, c’est pire que pas de CGV.",
    [("Vous croyez être protégé", "vous croyez"), ("Vous découvrez le contraire le jour du litige", "vous découvrez")],
    "Concrètement : on rédige vos CGV sur mesure, on relit vos devis et contrats, et on vous aide à les intégrer correctement, sur votre site comme dans vos offres.",
    [("pen", "CGV sur mesure", "on rédige"), ("doc", "Relecture de devis et contrats", "on relit"),
     ("link", "Intégration sur votre site", "on vous aide"), ("mail", "Et dans vos offres", "dans vos offres")],
    "Guide : CGV en Suisse",
)
