"""Vidéo de service — Achat défectueux : faire valoir la garantie (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, cards, law, process, title, warn

AUDIENCE = "particuliers"
SLUG = "garantie-achat-defectueux"
NAME = "Achat défectueux : la garantie"

META = {
    "title": "Achat défectueux : faites valoir la garantie",
    "yt_title": "Achat défectueux en Suisse : faire valoir la garantie auprès du vendeur (art. 201 et 210 CO)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Achat défectueux : appareil, meuble ou véhicule en panne ? La garantie légale lie le vendeur. Le défaut doit être signalé dès "
                 "sa découverte (art. 201 CO) et, pour un bien neuf acheté par un consommateur, la garantie de deux ans ne peut pas être "
                 "raccourcie (art. 210 CO). Thrax Legal rédige votre mise en demeure au vendeur, à prix fixe."),
    "tags": ["achat défectueux", "garantie légale", "garantie vendeur", "produit défectueux", "art. 201 CO", "art. 210 CO",
             "mise en demeure vendeur", "consommateur Suisse", "Suisse romande", "Thrax Legal"],
    "thumb": ("Achat", "défectueux ?", "Faites jouer la garantie"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Achat défectueux : un appareil, un meuble ou un véhicule en panne, et le vendeur se renvoie la balle ?")(
    title("Particuliers · Garantie", "Un achat défectueux ?",
          chips=[("Appareil", "un appareil"), ("Meuble", "un meuble"), ("Véhicule", "un véhicule")]))
S("Le vendeur vous renvoie vers le fabricant ? Pourtant, la garantie légale le lie, lui.", P1)(
    warn("« Voyez avec le fabricant. »", sub="Pourtant, la garantie légale lie le vendeur.", a_sub="Pourtant", label="Le piège"))
S("Deux règles : le défaut doit être signalé au vendeur dès sa découverte. Et pour un bien neuf acheté par un consommateur, la garantie de deux ans ne peut pas être raccourcie.", P1)(
    law("Art. 201 et 210 CO", "Signalez le défaut dès sa découverte.", a_text="le défaut",
        note="Bien neuf, consommateur : la garantie de deux ans ne peut pas être raccourcie", a_note="Et pour"))
S("On analyse la garantie légale et contractuelle, et on choisit la demande la plus favorable : réparation, échange, réduction, ou annulation.", P2)(
    cards("Vos droits", "La demande la plus favorable :",
          [("pen", "Réparation", "", "réparation"), ("arrow", "Échange", "", "échange"),
           ("receipt", "Réduction", "", "réduction"), ("cross", "Annulation", "", "annulation")], a_head="la demande"))
S("La mise en demeure est rédigée au vendeur, prête à envoyer. Et pour un achat en ligne à l’étranger, on vous indique le droit applicable.", P2)(
    brand("Votre garantie, réclamée.",
          [("mail", "Mise en demeure", "la mise en demeure"), ("check", "Prête à envoyer", "prête à envoyer"),
           ("link", "Achat en ligne", "un achat en ligne")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre lettre, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
