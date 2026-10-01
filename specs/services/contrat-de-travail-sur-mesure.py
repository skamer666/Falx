"""Vidéo de service — Contrat de travail sur mesure (entreprises)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, lst, process, title, warn

AUDIENCE = "entreprises"
SLUG = "contrat-de-travail-sur-mesure"
NAME = "Contrat de travail sur mesure"

META = {
    "title": "Contrat de travail sur mesure : protéger l’entreprise",
    "yt_title": "Contrat de travail en Suisse : les clauses écrites qui protègent l'employeur (art. 321c et 340 CO)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour entreprises", "https://thrax-legal.ch/fr/entreprises"),
              ("Le guide complet", "https://thrax-legal.ch/fr/guide/contrat-de-travail-suisse-pme")],
    "yt_intro": ("Contrat de travail en Suisse : heures supplémentaires, vacances, non-concurrence, confidentialité. Certaines clauses ne valent que "
                 "par écrit (art. 321c et 340 CO), et une convention collective étendue s'applique même sans adhésion. Thrax Legal rédige votre "
                 "contrat de travail sur mesure, à prix fixe."),
    "tags": ["contrat de travail", "contrat de travail Suisse", "employeur", "heures supplémentaires", "clause de non-concurrence",
             "art. 321c CO", "art. 340 CO", "convention collective", "PME Suisse romande", "Thrax Legal"],
    "thumb": ("Contrat de", "travail ?", "Le contrat qui vous protège"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, service juridique externalisé à prix fixe pour les indépendants et les PME de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Contrat de travail : vous engagez quelqu’un et vous voulez un contrat qui protège vraiment l’entreprise ?")(
    title("Entreprises · Contrat de travail", "Un contrat de travail qui vous protège ?",
          chips=[("Embauche", "vous engagez"), ("Protection", "protège vraiment")]))
S("Un contrat mal rédigé, et ce sont les heures supplémentaires, les vacances ou la concurrence qui deviennent des litiges.", P1)(
    warn("Un contrat mal rédigé devient un litige.", sub="Heures supplémentaires, vacances, concurrence…", a_sub="les heures", label="Le risque"))
S("Attention : certaines clauses ne valent que par écrit, comme l’exclusion des heures supplémentaires ou la non-concurrence. "
  "Et une convention collective étendue s’applique, même sans adhésion.", P1)(
    law("Art. 321c et 340 CO", "Certaines clauses ne valent que par écrit.", a_text="certaines clauses",
        note="Une convention collective étendue s’applique même sans adhésion", a_note="Et une convention"))
S("On vérifie la convention collective applicable, puis on rédige un contrat complet pour le poste, avec les clauses écrites indispensables : "
  "heures supplémentaires, non-concurrence et confidentialité.", P2)(
    lst("Le contrat", "Rédigé pour le poste :",
        [("Convention collective vérifiée", "la convention"), ("Contrat adapté au poste", "un contrat complet"),
         ("Heures sup et non-concurrence", "heures supplémentaires"), ("Confidentialité", "confidentialité")]))
S("Un tour de corrections est inclus, et on peut prévoir un modèle pour plusieurs postes similaires.", P2)(
    brand("Un contrat solide, dès l’embauche.",
          [("pen", "Corrections incluses", "Un tour"), ("doc", "Modèle réutilisable", "un modèle"), ("user", "Postes similaires", "plusieurs postes")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre contrat, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
