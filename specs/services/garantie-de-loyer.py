"""Vidéo de service — Récupérer votre garantie de loyer (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, lst, process, title, warn

AUDIENCE = "particuliers"
SLUG = "garantie-de-loyer"
NAME = "Récupérer votre garantie de loyer"

META = {
    "title": "Garantie de loyer : la récupérer",
    "yt_title": "Garantie de loyer bloquée en Suisse : frais de remise en état et libération (art. 257e CO)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Garantie de loyer en Suisse : votre ancienne régie bloque la garantie ou facture des frais de remise en état ? L'usure normale est à "
                 "la charge du bailleur (art. 267 CO), et après un an sans procédure, la banque peut libérer la garantie (art. 257e CO). "
                 "Thrax Legal conteste les frais injustifiés et demande la libération, à prix fixe."),
    "tags": ["garantie de loyer", "garantie de loyer bloquée", "libération garantie de loyer", "remise en état", "usure normale",
             "art. 257e CO", "art. 267 CO", "état des lieux de sortie", "locataire Suisse", "Thrax Legal"],
    "thumb": ("Garantie", "bloquée ?", "Récupérez votre argent"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Garantie de loyer : votre ancienne régie bloque votre garantie ou vous facture des frais de remise en état ?")(
    title("Particuliers · Garantie de loyer", "Votre garantie de loyer est bloquée ?",
          chips=[("Bloquée", "bloque"), ("Frais facturés", "vous facture"), ("Remise en état", "remise en état")]))
S("Beaucoup de locataires paient des frais qu’ils ne doivent pas.", P1)(
    warn("Beaucoup paient des frais qu’ils ne doivent pas.", label="Le risque"))
S("L’usure normale est à la charge du bailleur. Et si le bailleur n’a rien fait valoir dans l’année qui suit la fin du bail, "
  "vous pouvez demander à la banque de libérer la garantie.", P1)(
    law("Art. 267 et 257e CO", "L’usure normale est à la charge du bailleur.", a_text="L’usure normale",
        note="Un an sans procédure du bailleur : demandez la libération à la banque", a_note="Et si"))
S("On trie entre l’usure normale, à la charge du bailleur, et les vrais dégâts, à votre charge. Et la durée de vie des peintures est prise en compte.", P2)(
    lst("Le tri", "Ce que la régie peut vraiment facturer",
        [("Usure normale : pour le bailleur", "l’usure normale"), ("Vrais dégâts : pour vous", "les vrais dégâts"),
         ("Peintures : leur durée de vie compte", "la durée de vie")]))
S("Puis on rédige la contestation des frais injustifiés et la demande de libération de votre garantie.", P2)(
    brand("Votre réclamation, prête à envoyer.",
          [("pen", "Contestation des frais", "la contestation"), ("receipt", "Frais injustifiés", "frais injustifiés"),
           ("lock", "Libération", "la demande de libération")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre lettre, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
