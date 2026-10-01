"""Guide vidéo — Contrat de travail en Suisse : écrit, essai, congé, maladie, licenciement, CCT, assurances."""
from offer import midroll, offer_block
from tpl import S, cards, doc, law, lst, section, stat, statement, steps, table, title, warn

META = {
    "title": "Contrat de travail en Suisse : le guide pour les PME",
    "yt_title": "Contrat de travail en Suisse : période d’essai, délais de congé, maladie (guide employeur)",
    "chapter0": "Engager sans se tromper",
    "guide_url": "https://thrax-legal.ch/fr/guide/contrat-de-travail-suisse-pme",
    "yt_intro": ("Contrat de travail en Suisse : ce qui doit être écrit, la période d’essai, les délais de congé (art. 335c CO), le salaire en cas de maladie, "
                 "la protection contre le licenciement (art. 336c CO), la clause de non-concurrence, les CCT, les salaires minimums cantonaux "
                 "et les assurances sociales. Le guide complet pour les employeurs et les PME."),
    "tags": ["contrat de travail", "contrat de travail Suisse", "période d’essai", "délai de congé", "art. 335c CO", "licenciement maladie",
             "art. 336c CO", "clause de non-concurrence", "salaire minimum Genève", "CCT", "LPP", "employeur PME"],
    "thumb": ("Contrat de", "travail ?", "Les règles suisses pour les employeurs"),
    "chrome_from": 5,
}

A1 = "01 · Oral ou écrit ?"
A2 = "02 · Essai et délais de congé"
A3 = "03 · Salaire et vacances"
A4 = "04 · Maladie et accident"
A5 = "05 · Licenciement"
A6 = "06 · Non-concurrence"
A7 = "07 · CCT et salaire minimum"
A8 = "08 · Assurances sociales"
A9 = "09 · Les erreurs classiques"
A10 = "10 · Se faire accompagner"

S("Contrat de travail en Suisse : engager quelqu’un, c’est une excellente nouvelle pour votre entreprise.")(
    title("Guide Thrax Legal", "Contrat de travail en Suisse : le guide pour les PME", sub="Engager quelqu’un, c’est une excellente nouvelle.", a_sub="engager"))
S("Mais un contrat mal rédigé peut vous coûter des mois de salaire. Un licenciement nul, des heures supplémentaires à payer avec vingt-cinq pour cent de supplément, "
  "une clause de non-concurrence qui ne vaut rien.")(
    lst("Ce qui coûte cher", "Un contrat mal rédigé peut coûter des mois de salaire",
        [("Un licenciement nul", "Un licenciement"), ("Des heures supplémentaires à payer, + 25 %", "des heures"),
         ("Une clause de non-concurrence sans valeur", "une clause")], mode="cross", a_head="Mais"))
S("Dans cette vidéo : ce qui doit être écrit, la période d’essai, les délais de congé, la maladie, les salaires minimums, les assurances sociales et les erreurs classiques.")(
    steps("Au programme", "Engager sans se tromper",
          [("L’écrit", None, "ce qui"), ("L’essai", None, "la période"), ("Le congé", None, "les délais"), ("La maladie", None, "la maladie"),
           ("Le salaire minimum", None, "les salaires"), ("Les assurances", None, "les assurances")]))
S("Et à la fin, comment avoir des contrats solides sans vous y perdre.")(
    statement([("Et à la fin :", "Et à la fin", "h2 mute"), ("des contrats solides, sans vous y perdre.", "des contrats", "h1")]))

# ---------------------------------------------------------------- 01
S("Première question : faut-il un contrat écrit ?", A1)(section("01", "Oral ou écrit ?"))
S("En Suisse, un contrat de travail est valable même oral. Mais dès un mois d’engagement, vous devez remettre par écrit les informations de base : "
  "les parties, le début, la fonction, le salaire, le temps de travail.", A1)(
    doc("Art. 330b CO", "Valable même oral. Mais…", "Dès un mois d’engagement : les informations de base, par écrit.", "Informations écrites obligatoires",
        [("Parties", "Employeur et employé", "les parties"), ("Début", "Date d’entrée", "le début"), ("Fonction", "Poste occupé", "la fonction"),
         ("Salaire", "Montant et suppléments", "le salaire"), ("Temps de travail", "Heures par semaine", "le temps")], doc_icon="doc"))
S("Et surtout, plusieurs clauses n’ont d’effet que par écrit : une période d’essai différente d’un mois, des délais de congé différents de la loi, "
  "des heures supplémentaires sans supplément de vingt-cinq pour cent, et une clause de non-concurrence.", A1)(
    table("Écrit obligatoire", "Ces clauses n’existent que par écrit", ["Clause", "Article"],
          [(["Période d’essai différente d’un mois", "Art. 335b CO"], "une période"), (["Délais de congé différents de la loi", "Art. 335c CO"], "des délais"),
           (["Heures supplémentaires sans supplément de 25 %", "Art. 321c CO"], "des heures"), (["Clause de non-concurrence", "Art. 340 CO"], "et une clause")], first_w=1100))
S("Sans écrit, c’est la règle légale qui s’applique.", A1)(warn("Sans écrit, c’est la règle légale qui s’applique.", label="Retenez"))

# ---------------------------------------------------------------- 02
S("Deuxième point : la période d’essai et les délais de congé.", A2)(section("02", "Essai et délais de congé", None, size="h1"))
S("La période d’essai dure un mois par défaut, trois mois au maximum, par écrit. Pendant l’essai, le délai de congé est de sept jours.", A2)(
    stat("Période d’essai", 1, "par défaut · jusqu’à 3 mois par écrit", "un mois", suffix="mois", law="Art. 335b CO", a_label="trois mois",
         side="Pendant l’essai, le délai de congé est de sept jours.", a_side="Pendant"))
S("Après l’essai : un mois pendant la première année de service. Deux mois de la deuxième à la neuvième année. Trois mois ensuite. "
  "À chaque fois pour la fin d’un mois, sauf accord écrit différent.", A2)(
    table("Art. 335c CO", "Les délais de congé", ["Ancienneté", "Délai"],
          [(["1re année de service", "1 mois"], "un mois"), (["De la 2e à la 9e année", "2 mois"], "Deux mois"), (["Dès la 10e année", "3 mois"], "Trois mois"),
           (["Échéance", "Pour la fin d’un mois"], "pour la fin")], first_w=1050))

# ---------------------------------------------------------------- 03
S("Le treizième salaire n’est pas obligatoire. Mais s’il est prévu, ou s’il est d’usage dans l’entreprise, il est dû, au prorata en cas de départ en cours d’année. "
  "Écrivez clairement ce qui est un salaire, et ce qui est un bonus discrétionnaire.", A3)(
    cards("Salaire", "13e salaire et bonus",
          [("receipt", "13e salaire", "Pas obligatoire… sauf s’il est prévu ou d’usage", "Le treizième"), ("cal", "Au prorata", "En cas de départ en cours d’année", "au prorata"),
           ("pen", "Salaire ou bonus ?", "À distinguer clairement par écrit", "Écrivez")]))
S("Les vacances : quatre semaines au minimum, cinq jusqu’à vingt ans.", A3)(
    stat("Vacances", 4, "par an au minimum · 5 jusqu’à 20 ans", "quatre", suffix="semaines", law="Art. 329a CO", a_label="cinq"))
midroll("Vous préférez ne pas rédiger ce contrat vous-même ? Chez Thrax Legal, c’est exactement le type de dossier qu’on traite pour nos abonnés.",
        "Pas envie de rédiger ce contrat vous-même ?",
        "Vous nous décrivez le poste, on rédige le contrat de travail. Le lien est dans la description.",
        ("Vous nous décrivez le poste", "Vous nous"), ("On rédige le contrat de travail", "on rédige"), A3, icons=("brief", "pen"), chip_at="Chez Thrax")

# ---------------------------------------------------------------- 04
S("Quatrième point, souvent mal connu : la maladie et l’accident.", A4)(section("04", "Maladie et accident", "Deux règles à connaître"))
S("Un : si votre employé est malade, vous devez continuer à verser son salaire pendant un temps limité. Au moins trois semaines la première année, "
  "puis plus longtemps selon l’ancienneté.", A4)(
    stat("Salaire en cas de maladie", 3, "au moins la 1re année · puis plus selon l’ancienneté", "trois semaines", suffix="semaines", law="Art. 324a CO", a_label="puis"))
S("Sauf si vous avez une assurance perte de gain au moins équivalente, prévue par écrit. Cette assurance n’est pas obligatoire, mais elle est fortement recommandée.", A4)(
    warn("Assurance perte de gain maladie : pas obligatoire, mais fortement recommandée.",
         sub="Au moins équivalente et prévue par écrit, elle remplace l’obligation de verser le salaire.", a_text="Sauf", a_sub="Cette assurance", label="Conseil"))
S("Deux : après la période d’essai, un licenciement donné pendant une maladie ou un accident est nul.", A4)(
    law("Art. 336c CO", "Congé donné pendant une maladie ou un accident : il est nul.", a_text="un licenciement"))
S("La protection dure trente jours la première année de service, quatre-vingt-dix jours de la deuxième à la cinquième, et cent quatre-vingts jours ensuite. "
  "La grossesse est protégée pendant toute sa durée, et seize semaines après l’accouchement.", A4)(
    table("Art. 336c CO", "Combien de temps dure la protection ?", ["Situation", "Protection"],
          [(["Maladie ou accident, 1re année", "30 jours"], "trente"), (["De la 2e à la 5e année", "90 jours"], "quatre-vingt-dix"),
           (["Dès la 6e année", "180 jours"], "cent"), (["Grossesse", "Toute la grossesse + 16 semaines"], "La grossesse")], first_w=900))

# ---------------------------------------------------------------- 05
S("Cinquième point : le licenciement.", A5)(section("05", "Le licenciement", "Abusif ou immédiat"))
S("Licencier quelqu’un parce qu’il fait valoir ses droits est abusif. L’indemnité peut aller jusqu’à six mois de salaire.", A5)(
    stat("Congé abusif", 6, "de salaire d’indemnité, au maximum", "six mois", suffix="mois", law="Art. 336a CO", a_label="L’indemnité",
         side="Exemple : licencier quelqu’un parce qu’il fait valoir ses droits.", a_side="Licencier"))
S("Et le licenciement immédiat n’est possible que pour de justes motifs graves. Mal utilisé, il coûte le salaire de tout le délai de congé, plus une indemnité.", A5)(
    warn("Licenciement immédiat : seulement pour de justes motifs graves.", sub="Mal utilisé : le salaire de tout le délai de congé, plus une indemnité.",
         a_text="Et le", a_sub="Mal utilisé", label="Attention"))

# ---------------------------------------------------------------- 06
S("La clause de non-concurrence doit être écrite, et l’employé doit avoir eu accès à votre clientèle ou à des secrets d’affaires. "
  "Elle doit être limitée dans le lieu, le temps et l’activité, en principe trois ans au maximum. Trop large, le juge peut la réduire.", A6)(
    lst("Art. 340 CO", "Une clause de non-concurrence valable",
        [("Écrite", "doit être écrite"), ("Accès à la clientèle ou à des secrets d’affaires", "l’employé"), ("Limitée : lieu, temps, activité", "limitée"),
         ("3 ans au maximum, en principe", "en principe"), ("Trop large ? Le juge peut la réduire", "Trop large")]))

# ---------------------------------------------------------------- 07
S("Avant de signer, vérifiez deux choses.", A7)(section("07", "CCT et salaire minimum", "À vérifier avant de signer", size="h1"))
S("Une convention collective de travail s’applique-t-elle à votre branche ? Et votre canton impose-t-il un salaire minimum ? C’est le cas de Genève, Neuchâtel et du Jura, "
  "avec des montants supérieurs à vingt francs de l’heure. Ces règles priment sur votre contrat.", A7)(
    cards("À vérifier", "Elles priment sur votre contrat",
          [("brief", "Convention collective (CCT)", "Selon votre branche", "Une convention"),
           ("building", "Salaire minimum cantonal", "Genève, Neuchâtel, Jura : plus de 20 CHF/h", "salaire minimum"),
           ("scale", "Priorité", "Ces règles priment sur le contrat", "Ces règles")]))

# ---------------------------------------------------------------- 08
S("Enfin, n’oubliez pas les assurances sociales.", A8)(section("08", "Les assurances sociales"))
S("AVS, AI et APG dès le premier franc. L’assurance-chômage. L’assurance-accidents. Les allocations familiales. "
  "Et la prévoyance professionnelle dès un salaire annuel d’environ vingt-deux mille francs.", A8)(
    cards("Employeur", "Les assurances obligatoires",
          [("shield", "AVS / AI / APG", "Dès le premier franc", "AVS"), ("brief", "Assurance-chômage", "Cotisations partagées", "L’assurance-chômage"),
           ("lock", "Assurance-accidents", "Obligatoire", "L’assurance-accidents"), ("user", "Allocations familiales", "Montants fixés par canton", "Les allocations"),
           ("building", "Prévoyance (LPP)", "Dès env. 22 000 CHF par an", "Et la prévoyance")]))

# ---------------------------------------------------------------- 09
S("Et les erreurs classiques à éviter.", A9)(section("09", "Les erreurs classiques"))
S("Pas de contrat écrit. Une période d’essai de trois mois jamais écrite. Les heures supplémentaires jamais réglées. Une clause de non-concurrence copiée d’un modèle. "
  "Et un salaire sous le minimum cantonal, sans le savoir.", A9)(
    lst("À éviter", "Les 5 erreurs qui coûtent cher",
        [("Pas de contrat écrit", "Pas de contrat"), ("Un essai de 3 mois jamais écrit", "Une période"), ("Des heures supplémentaires jamais réglées", "Les heures"),
         ("Une non-concurrence copiée d’un modèle", "Une clause"), ("Un salaire sous le minimum cantonal", "Et un salaire")], mode="cross"))

offer_block(
    A10,
    "Un contrat de travail se signe en dix minutes. Mais s’il est mal rédigé, l’erreur peut vous coûter des mois de salaire, et c’est vous, l’employeur, qui paierez.",
    "Un contrat se signe en dix minutes. Mais…",
    [("Une erreur peut coûter des mois de salaire", "l’erreur"), ("Et c’est l’employeur qui paie", "c’est vous")],
    "Concrètement : on rédige vos contrats de travail, on relit ceux que vous avez déjà, et on vous accompagne en cas de licenciement, d’absence ou de conflit avec un employé.",
    [("pen", "Contrats de travail", "on rédige"), ("doc", "Relecture de vos contrats", "on relit"), ("brief", "Licenciement", "licenciement"),
     ("user", "Absences et conflits", "d’absence")],
    "Guide : contrat de travail en Suisse",
)
