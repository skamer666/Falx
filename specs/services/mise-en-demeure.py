"""Vidéo de service — Mise en demeure (entreprises). Spec de référence pour les vidéos de service."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, doc, law, process, title, warn

AUDIENCE = "entreprises"
SLUG = "mise-en-demeure"
NAME = "Mise en demeure"

META = {
    "title": "Mise en demeure : faites respecter vos droits, par écrit",
    "yt_title": "Mise en demeure en Suisse : faites payer un client ou livrer un fournisseur (entreprises)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour entreprises", "https://thrax-legal.ch/fr/entreprises")],
    "yt_intro": ("Client qui ne paie pas, fournisseur qui ne livre pas, locataire en retard, partenaire qui ne tient pas parole : "
                 "la mise en demeure est l’étape clé. Intérêts moratoires (art. 104 CO), délai supplémentaire et résolution du contrat (art. 107 CO) : "
                 "Thrax Legal rédige votre mise en demeure à prix fixe, prête à envoyer."),
    "tags": ["mise en demeure", "mise en demeure Suisse", "facture impayée", "client qui ne paie pas", "fournisseur", "intérêts moratoires",
             "art. 104 CO", "art. 107 CO", "recouvrement", "PME Suisse romande", "Thrax Legal"],
    "thumb": ("Mise en", "demeure ?", "Faites respecter vos droits"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, service juridique externalisé à prix fixe pour les indépendants et les PME de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Un client qui ne paie pas, un fournisseur qui ne livre pas, un locataire en retard, un partenaire qui ne tient pas parole ?")(
    title("Entreprises · Mise en demeure", "Quelqu’un ne respecte pas ses engagements ?",
          chips=[("Client", "Un client"), ("Fournisseur", "un fournisseur"), ("Locataire", "un locataire"), ("Partenaire", "un partenaire")]))
S("Les relances polies ne suffisent plus. Et chaque semaine qui passe vous coûte.", P1)(
    warn("Les relances polies ne suffisent plus.", sub="Et chaque semaine qui passe vous coûte.", a_sub="Et chaque", label="Le risque"))
S("La mise en demeure est l’étape clé : pour une somme d’argent, elle fait courir un intérêt de cinq pour cent par an. "
  "Pour une prestation, elle ouvre le droit de résoudre le contrat.", P1)(
    law("Art. 104 et 107 CO", "La mise en demeure fait courir les intérêts et ouvre la suite.", a_text="pour une somme",
        note="5 % par an sur une somme due · résolution possible si la prestation ne vient pas", a_note="Pour une prestation"))
S("Une bonne mise en demeure dit précisément ce qui est dû, fixe un délai clair, et annonce la suite si rien ne bouge.", P2)(
    doc("La lettre", "Ce qu’elle doit contenir", "Précise, datée, impossible à ignorer.", "Mise en demeure",
        [("Ce qui est dû", "Montant ou prestation, avec les pièces", "ce qui est dû"),
         ("Le délai", "Une date claire", "un délai"),
         ("La suite", "Ce qui se passera sinon", "annonce la suite")],
        stamp=("Dernier avertissement", "si rien"), doc_icon="mail"))
S("Chez Thrax Legal, on vérifie vos droits et vos pièces, on calcule les intérêts, et on rédige la mise en demeure à votre en-tête, prête à envoyer.", P2)(
    brand("Votre mise en demeure, rédigée pour vous.",
          [("search", "Vos droits vérifiés", "on vérifie"), ("receipt", "Intérêts calculés", "on calcule"),
           ("pen", "À votre en-tête", "on rédige"), ("mail", "Prête à envoyer", "prête à envoyer")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre lettre, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
