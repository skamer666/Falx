"""Vidéo de service — Contester le décompte de charges (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, lst, process, title, warn

AUDIENCE = "particuliers"
SLUG = "decompte-de-charges"
NAME = "Contester le décompte de charges"

META = {
    "title": "Décompte de charges : vérifiez avant de payer",
    "yt_title": "Contester un décompte de charges en Suisse : frais accessoires et justificatifs (art. 257a CO)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Contester le décompte de charges : votre décompte de chauffage et de frais accessoires a explosé ? Vous ne devez que les frais "
                 "accessoires expressément prévus dans le bail (art. 257a CO) et vous avez le droit de consulter les justificatifs (art. 257b CO). "
                 "Thrax Legal vérifie chaque poste et rédige votre réclamation, à prix fixe."),
    "tags": ["décompte de charges", "contester décompte de charges", "frais accessoires", "décompte de chauffage", "art. 257a CO",
             "art. 257b CO", "régie", "locataire Suisse romande", "droit du bail", "Thrax Legal"],
    "thumb": ("Charges", "abusives ?", "Vérifiez avant de payer"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Contester le décompte de charges : votre décompte de chauffage et de frais accessoires a explosé ?")(
    title("Particuliers · Décompte de charges", "Votre décompte de charges a explosé ?",
          chips=[("Chauffage", "chauffage"), ("Charges", "frais accessoires")]))
S("Payer sans vérifier, c’est peut-être payer des frais qui ne sont même pas prévus dans votre bail.", P1)(
    warn("Payer sans vérifier peut coûter cher.", sub="Certains frais ne sont peut-être pas prévus dans votre bail.", a_sub="des frais", label="Le risque"))
S("La règle est simple : vous ne devez que les frais accessoires expressément prévus dans le bail. Et vous avez le droit de consulter les pièces justificatives.", P1)(
    law("Art. 257a et 257b CO", "Seuls les frais prévus dans le bail sont dus.", a_text="vous ne devez",
        note="Vous avez le droit de consulter les pièces justificatives", a_note="Et vous avez"))
S("On contrôle chaque poste facturé par rapport au bail, on repère les frais non convenus ou excessifs, et on rédige la réclamation avec la demande de justificatifs.", P2)(
    lst("La vérification", "Ligne par ligne :",
        [("Postes contrôlés", "on contrôle"), ("Frais non convenus repérés", "on repère"),
         ("Réclamation rédigée", "la réclamation"), ("Justificatifs demandés", "la demande")]))
S("Et on vous indique quelle partie payer et quelle partie contester, pour éviter tout reproche de retard.", P2)(
    brand("Payez le juste prix.",
          [("receipt", "Ce qu’il faut payer", "quelle partie payer"), ("cross", "Ce qu’on conteste", "quelle partie contester"),
           ("shield", "Aucun retard reproché", "tout reproche")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre réclamation, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
