"""Guide vidéo — Facture impayée en Suisse : rappel, mise en demeure, poursuite, opposition."""
from kit import box, icon, words
from offer import midroll, offer_block
from tpl import S, cards, compare, doc, lst, ruler, section, stat, statement, steps, table, warn

META = {
    "title": "Facture impayée en Suisse : mise en demeure et poursuite",
    "yt_title": "Facture impayée en Suisse : mise en demeure, poursuite et opposition (guide complet)",
    "chapter0": "Facture impayée : le plan",
    "guide_url": "https://thrax-legal.ch/fr/guide/mise-en-demeure-recouvrement-suisse",
    "yt_intro": ("Facture impayée en Suisse ? Voici comment récupérer votre argent, étape par étape : rappel, mise en demeure, "
                 "réquisition de poursuite, commandement de payer, opposition et mainlevée. Avec les délais, les articles de loi "
                 "(CO, LP, CPC), la prescription et les erreurs à éviter."),
    "tags": ["facture impayée", "facture impayée Suisse", "mise en demeure", "mise en demeure Suisse", "poursuite", "commandement de payer",
             "opposition commandement de payer", "mainlevée", "recouvrement de créances", "office des poursuites", "LP", "PME Suisse romande"],
    "thumb": ("Facture", "impayée ?", "Récupérer votre argent en Suisse"),
    "chrome_from": 5,
}

A1 = "01 · Avant de relancer"
A2 = "02 · Le rappel"
A3 = "03 · La mise en demeure"
A4 = "04 · La poursuite"
A5 = "05 · L’opposition"
A6 = "06 · La prescription"
A7 = "07 · Prévenir les impayés"
A8 = "08 · Se faire accompagner"


def invoice(c):
    t0 = c.times[0]
    td = c.a("depuis deux mois")
    card = (f'<div style="padding:46px 50px"><div class="row" style="justify-content:space-between"><span class="kick" style="color:rgba(245,245,247,.75)">Facture n° 2026-041</span>'
            f'{icon("receipt", 34)}</div>'
            f'<div class="sm" style="margin-top:26px">Montant dû</div><div style="font-size:84px;font-weight:700;letter-spacing:-0.04em">CHF 5 000.–</div>'
            + "".join(f'<div class="line" style="width:{w}%;margin-top:18px"></div>' for w in (90, 72, 84))
            + f'<div class="row" style="margin-top:44px;gap:16px"><span style="font-size:96px;font-weight:700;letter-spacing:-0.05em" data-fx="count" data-at="{td}" data-d="1.2" data-from="0" data-to="61">61</span>'
            f'<span class="p" style="color:#f5f5f7">jours de retard</span></div></div>')
    return (box('<div class="kick">Guide Thrax Legal</div>', 200, 250, None, None, "", "rise", t0)
            + words("Facture impayée en Suisse.", 200, 300, 760, "h1", t0 + 0.05)
            + words("Le travail est fait. La facture est partie. Et depuis, plus rien.", 200, 560, 700, "h3 mute", c.a("vous avez"))
            + box(card, 1060, 160, 660, 760, "card", "rise", t0 + 0.2, dx=90)
            + box('<div class="stampbox" style="background:rgba(10,10,11,.9);font-size:40px">Impayée</div>', 1400, 600, None, None, "", "stamp", c.a("plus rien"), rot=-10))


# ---------------------------------------------------------------- accroche
S("Facture impayée en Suisse : vous avez fait le travail, envoyé la facture… et depuis deux mois, plus rien.")(invoice)
S("Cinq mille francs qui manquent dans votre trésorerie, et un client qui ne répond plus.")(
    statement([("5 000 francs qui manquent.", "Cinq", "h0"), ("Un client qui ne répond plus.", "un client", "h1 mute")]))
S("Dans cette vidéo, je vous montre comment récupérer cet argent en Suisse : le rappel, la mise en demeure, la poursuite et l’opposition.")(
    steps("Au programme", "Récupérer une facture impayée en Suisse",
          [("Rappel", None, "le rappel"), ("Mise en demeure", None, "la mise"), ("Poursuite", None, "la poursuite"), ("Opposition", None, "l’opposition")]))
S("Et surtout, les erreurs qui font perdre des semaines, voire la créance entière. Restez jusqu’au bout : à la fin, je vous explique comment ne plus jamais gérer ça seul.")(
    warn("Les erreurs qui font perdre des semaines, voire la créance entière.", sub="Et à la fin : comment ne plus jamais gérer ça seul.",
         a_text="les erreurs", a_sub="Restez", label="À éviter"))

# ---------------------------------------------------------------- 01
S("Première chose, avant de relancer : vérifiez votre dossier.", A1)(section("01", "Vérifiez votre dossier", "Avant toute relance"))
S("Un : avez-vous une base écrite, un devis accepté, un contrat, une commande par e-mail ? Deux : pouvez-vous prouver que le travail a été livré ? "
  "Trois : quelle était la date d’échéance ? Quatre : le client conteste-t-il la qualité ? Si oui, réglez ce point d’abord.", A1)(
    lst("Les 4 vérifications", "Votre dossier tient-il la route ?",
        [("Une base écrite : devis accepté, contrat, commande", "Un"), ("La preuve que le travail a été livré", "Deux"),
         ("La date d’échéance", "Trois"), ("Le client conteste-t-il la qualité ?", "Quatre")], mode="num"))
S("Et un réflexe simple : commandez l’extrait du registre des poursuites de votre client, auprès de l’office de son domicile ou de son siège. "
  "Pour une vingtaine de francs, vous saurez s’il a déjà des dettes.", A1)(
    doc("Le bon réflexe", "L’extrait du registre des poursuites", "Savoir si votre client a déjà des dettes, avant d’aller plus loin.",
        "Extrait du registre des poursuites",
        [("Où le demander", "Office du domicile ou du siège du client", "auprès"), ("Coût", "Une vingtaine de francs", "vingtaine"),
         ("Ce que vous apprenez", "Poursuites en cours et montants", "vous saurez")], stamp=("Art. 8a LP", "dettes"), doc_icon="search"))

# ---------------------------------------------------------------- 02
S("Étape un : le rappel.", A2)(section("02", "Le rappel", "Étape 1"))
S("Commencez par un rappel aimable : « Sauf erreur de notre part, la facture numéro tant, échue le 15 septembre, n’a pas encore été réglée. » "
  "Beaucoup de retards sont de simples oublis, et ce message suffit souvent.", A2)(
    doc("Étape 1", "Un message aimable suffit souvent.", "Beaucoup de retards sont de simples oublis.", "E-mail · Rappel",
        [("Objet", "Facture n° 2026-041", "Sauf"), ("Message", "« Sauf erreur de notre part, la facture échue le 15 septembre n’a pas encore été réglée. »", "échue")],
        doc_icon="mail"))

# ---------------------------------------------------------------- 03
S("Si rien ne bouge, passez à l’étape deux : la mise en demeure. C’est la sommation formelle de payer, et elle a des effets juridiques précis.", A3)(
    section("03", "La mise en demeure", "La sommation formelle de payer"))
S("Si une date de paiement a été convenue, dans un contrat, un devis signé ou des CGV acceptées, le client est en demeure automatiquement à cette date. "
  "En revanche, si seule votre facture indique « payable à trente jours », c’est en principe la mise en demeure qui le place en demeure.", A3)(
    table("Art. 102 CO", "Quand votre client est-il en demeure ?", ["Situation", "En demeure…"],
          [(["Date de paiement convenue : contrat, devis signé, CGV acceptées", "Automatiquement à cette date"], "Si une date"),
           (["Seule la facture indique « payable à 30 jours »", "En principe, à réception de la mise en demeure"], "En revanche")], first_w=860))
S("Une bonne mise en demeure indique la facture, sa date, le montant, l’échéance dépassée et vos rappels précédents. Elle donne un dernier délai précis, "
  "par exemple dix jours dès réception, et annonce clairement la suite : à défaut de paiement, une poursuite sera introduite sans autre avis.", A3)(
    doc("Le contenu", "Courte, précise, datée.", "Un modèle de formulation est dans le guide complet.", "Lettre recommandée · Mise en demeure",
        [("Facture", "N° 2026-041 du 15 août", "la facture"), ("Montant", "CHF 4 860.–", "le montant"), ("Échéance dépassée", "14 septembre", "l’échéance"),
         ("Dernier délai", "10 jours dès réception", "dernier délai"), ("La suite", "Poursuite sans autre avis", "annonce")]))
S("Envoyez-la en recommandé, idéalement doublée d’un e-mail. Le recommandé prouve la date de réception.", A3)(
    cards("L’envoi", "Recommandé, et e-mail en plus",
          [("mail", "Courrier recommandé", "Prouve la date de réception", "recommandé"), ("chat", "Doublé d’un e-mail", "Pour gagner du temps", "doublée"),
           ("doc", "Gardez une copie", "Récépissé et suivi de La Poste", "prouve")]))
S("Dès la demeure, vous avez droit à un intérêt de cinq pour cent par an.", A3)(
    stat("Intérêt moratoire", 5, "par an, dès la demeure", "cinq", suffix="%", law="Art. 104 CO", a_label="par an"))
S("Mais attention : les frais de rappel ne sont dus que s’ils ont été convenus d’avance.", A3)(
    warn("Les frais de rappel ne sont dus que s’ils ont été convenus d’avance.", a_text="les frais", label="Attention"))
S("Et évitez les menaces disproportionnées, comme une plainte pénale ou la publication du nom du client : elles peuvent se retourner contre vous.", A3)(
    lst("À éviter", "Les menaces disproportionnées",
        [("Menacer d’une plainte pénale", "une plainte"), ("Publier le nom du client", "la publication"), ("Elles peuvent se retourner contre vous", "elles peuvent")], mode="cross"))
midroll("Si vous n’avez ni le temps ni l’envie de rédiger ces lettres vous-même : chez Thrax Legal, c’est exactement le type de dossier qu’on traite pour nos abonnés.",
        "Pas le temps de rédiger ces lettres ?",
        "Vous nous envoyez la facture, on rédige la mise en demeure. Le lien est dans la description.",
        ("Vous nous envoyez la facture", "Vous nous"), ("On rédige la mise en demeure", "on rédige"), A3, chip_at="chez Thrax")

# ---------------------------------------------------------------- 04
S("Le délai est passé, toujours rien ? Étape trois : la poursuite.", A4)(section("04", "La poursuite", "Étape 3 · Loi sur la poursuite (LP)"))
S("Vous déposez une réquisition de poursuite auprès de l’office des poursuites du domicile ou du siège du débiteur, pas du vôtre. C’est une erreur fréquente. "
  "Vous avancez les frais, quelques dizaines de francs pour une créance de quelques milliers de francs, mais ils sont mis à la charge du débiteur.", A4)(
    doc("Réquisition de poursuite", "Au bon office : celui du débiteur.", "Pas le vôtre : c’est une erreur fréquente.", "Réquisition de poursuite",
        [("Où ?", "Office du domicile ou du siège du débiteur", "l’office"), ("Attention", "Pas l’office de votre domicile", "pas du vôtre"),
         ("Frais", "Quelques dizaines de francs, avancés par vous", "Vous avancez"), ("Au final", "À la charge du débiteur (art. 68 LP)", "mis à la charge")],
        doc_icon="doc"))
S("L’office lui notifie un commandement de payer. Il a alors vingt jours pour payer. Et la poursuite apparaît dans son registre, ce qui suffit souvent à le faire réagir.", A4)(
    ruler("Commandement de payer", "Le débiteur a 20 jours pour payer", 22,
          [(0, "Jour 0", "Commandement de payer notifié", "L’office"), (20, "20 jours", "Délai pour payer", "vingt jours")],
          note=("Inscrite au registre des poursuites", "Et la poursuite")))

# ---------------------------------------------------------------- 05
S("Étape quatre : l’opposition. C’est le moment où tout se joue.", A5)(section("05", "L’opposition", "Le moment où tout se joue"))
S("Le débiteur peut faire opposition dans les dix jours, sans se justifier et sans frais. C’est donc très fréquent. "
  "Et c’est là que la qualité de votre dossier fait toute la différence.", A5)(
    stat("Opposition au commandement de payer", 10, "sans motif et sans frais", "dix", suffix="jours", law="Art. 74 LP", a_label="sans se justifier",
         side="C’est très fréquent. Et c’est là que la qualité de votre dossier fait toute la différence.", a_side="C’est donc"))
S("Si vous avez un jugement, vous obtenez la mainlevée définitive. Si vous avez une reconnaissance de dette, par exemple un contrat signé avec la preuve que vous avez fait le travail, "
  "vous pouvez demander la mainlevée provisoire : une procédure écrite et rapide.", A5)(
    table("Après l’opposition", "Tout dépend de vos preuves", ["Vous avez…", "Ce qui se passe"],
          [(["Un jugement", "Mainlevée définitive (art. 80 LP)"], "Si vous avez un jugement"),
           (["Une reconnaissance de dette signée", "Mainlevée provisoire : écrite et rapide (art. 82 LP)"], "Si vous avez une reconnaissance")], first_w=700))
S("Mais sans document signé, il faut passer par une procédure au fond, qui commence en général devant l’autorité de conciliation.", A5)(
    warn("Sans document signé : procédure au fond.", sub="Elle commence en général devant l’autorité de conciliation.", a_text="Mais sans", a_sub="qui commence", label="Sinon"))
S("Jusqu’à deux mille francs, celle-ci peut trancher elle-même si vous le demandez. Jusqu’à cinq mille francs, elle peut proposer un jugement. "
  "Et jusqu’à trente mille francs, c’est la procédure simplifiée.", A5)(
    lst("Procédure au fond · CPC", "Selon le montant en litige",
        [("Jusqu’à 2 000 CHF : l’autorité de conciliation peut trancher", "Jusqu’à deux", "Art. 212 CPC"),
         ("Jusqu’à 5 000 CHF : proposition de jugement", "Jusqu’à cinq", "Art. 210 CPC"),
         ("Jusqu’à 30 000 CHF : procédure simplifiée", "trente", "Art. 243 CPC")], mode="dot"))
S("Vous voyez le point clé : ce qui décide de la vitesse de votre recouvrement, ce n’est pas la poursuite. C’est ce que vous avez fait signer avant.", A5)(
    statement([("Ce qui décide de la vitesse du recouvrement,", "ce qui", "h2 mute"), ("ce n’est pas la poursuite.", "ce n’est", "h1"),
               ("C’est ce que vous avez fait signer avant.", "C’est ce que", "h1")]))
S("Une fois l’opposition levée, ou si le débiteur n’a pas réagi, vous requérez la continuation de la poursuite : au plus tôt vingt jours après le commandement de payer, "
  "au plus tard un an après. Ratez ce délai d’un an, et vous recommencez tout.", A5)(
    ruler("Continuation de la poursuite", "Requérir la continuation : le bon moment", 365,
          [(20, "20 jours", "Au plus tôt", "au plus tôt"), (365, "1 an", "Au plus tard", "au plus tard")], note=("Délai raté : tout recommence", "Ratez")))
S("Ensuite, c’est la saisie. Ou la faillite, si le débiteur est inscrit au registre du commerce.", A5)(
    cards("Et ensuite ?", "Saisie ou faillite",
          [("receipt", "Saisie", "Le cas général", "la saisie"), ("building", "Faillite", "Si le débiteur est inscrit au registre du commerce", "Ou la faillite")]))

# ---------------------------------------------------------------- 06
S("Attention aussi à la prescription : c’est le piège silencieux.", A6)(section("06", "La prescription", "Le piège silencieux"))
S("En règle générale, une créance se prescrit par dix ans. Mais pour les services, les travaux d’artisans ou les ventes au détail, c’est souvent cinq ans.", A6)(
    table("Délais de prescription", "Combien de temps pour agir ?", ["Créance", "Délai"],
          [(["Règle générale (art. 127 CO)", "10 ans"], "En règle"),
           (["Services, travaux d’artisans, ventes au détail (art. 128 CO)", "5 ans"], "Mais pour")], first_w=1150))
S("Et une simple lettre de rappel n’interrompt pas la prescription. Une poursuite, une action en justice ou une reconnaissance de dette, oui.", A6)(
    compare("Art. 135 CO", "Interrompre la prescription",
            ("N’interrompt pas", "mail", [("Une simple lettre de rappel", "une simple")], "cross"),
            ("Interrompt", "shield", [("Une poursuite", "Une poursuite"), ("Une action en justice", "une action"), ("Une reconnaissance de dette", "une reconnaissance")])))
S("Le client veut payer en plusieurs fois ? Acceptez, mais par écrit : une reconnaissance de dette du montant total, un échéancier précis et une clause de déchéance.", A6)(
    doc("Plan de paiement", "Payer en plusieurs fois ? Oui, par écrit.", None, "Reconnaissance de dette",
        [("Montant total", "Reconnu et signé par le débiteur", "une reconnaissance"), ("Échéancier", "Montants et dates précis", "un échéancier"),
         ("Clause de déchéance", "Au premier retard, tout devient exigible", "une clause")], doc_icon="pen"))
S("Au premier retard, tout devient exigible. Avec ce document, en cas de nouveau défaut, vous obtenez directement la mainlevée provisoire.", A6)(
    statement([("Au premier retard : tout est exigible.", "Au premier", "h1"), ("Nouveau défaut ?", "Avec ce document", "h2 mute"),
               ("Mainlevée provisoire, directement.", "directement", "h1")]))

# ---------------------------------------------------------------- 07
S("Et pour l’avenir : comment ne plus jamais courir après une facture ?", A7)(section("07", "Ne plus courir après vos factures", None, size="h1"))
S("Des CGV qui fixent l’échéance, les intérêts et les frais de rappel. Un acompte pour les nouveaux clients. Une facturation par étapes. Et une relance systématique.", A7)(
    lst("Prévenir les impayés", "4 réflexes qui changent tout",
        [("Des CGV : échéance, intérêts, frais de rappel", "Des CGV"), ("Un acompte pour les nouveaux clients", "Un acompte"),
         ("Une facturation par étapes", "Une facturation"), ("Une relance systématique", "Et une relance")]))
S("Par exemple : un rappel à J plus cinq, une mise en demeure à J plus vingt, une poursuite à J plus trente-cinq.", A7)(
    ruler("Relance systématique", "Un calendrier simple", 40,
          [(5, "J+5", "Rappel", "un rappel"), (20, "J+20", "Mise en demeure", "une mise"), (35, "J+35", "Poursuite", "une poursuite")]))

# ---------------------------------------------------------------- 08
offer_block(
    A8,
    "Tout ça, vous pouvez le faire seul. Mais un mauvais office, un délai raté, une lettre trop vague ou un contrat jamais signé, "
    "et vous perdez des semaines, parfois la créance entière.",
    "Tout ça, vous pouvez le faire seul. Mais…",
    [("Un mauvais office", "un mauvais"), ("Un délai raté", "un délai"), ("Une lettre trop vague", "une lettre"), ("Un contrat jamais signé", "un contrat")],
    "Concrètement : on rédige vos mises en demeure, on prépare vos réquisitions de poursuite, on vous guide en cas d’opposition, et on met en place des CGV qui évitent les impayés.",
    [("mail", "Mises en demeure", "on rédige"), ("doc", "Réquisitions de poursuite", "on prépare"),
     ("scale", "Accompagnement en cas d’opposition", "on vous guide"), ("pen", "CGV contre les impayés", "et on met")],
    "Guide : facture impayée en Suisse",
)
