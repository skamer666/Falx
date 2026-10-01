"""Vidéo de service — Relecture de contrat de travail (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, lst, process, title, warn

AUDIENCE = "particuliers"
SLUG = "relecture-contrat-de-travail"
NAME = "Relecture de contrat de travail"

META = {
    "title": "Relecture de contrat de travail : avant de signer",
    "yt_title": "Relecture de contrat de travail : les clauses à vérifier avant de signer (art. 335b et 340 CO)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Relecture de contrat de travail : période d'essai, heures supplémentaires, non-concurrence, mobilité, vacances. La période d'essai "
                 "ne dépasse pas trois mois (art. 335b CO) et une non-concurrence n'est valable qu'à certaines conditions (art. 340 CO). "
                 "Thrax Legal relit votre contrat et vous dit quoi négocier avant de signer, à prix fixe."),
    "tags": ["relecture contrat de travail", "contrat de travail Suisse", "période d'essai", "clause de non-concurrence", "heures supplémentaires",
             "art. 335b CO", "art. 340 CO", "négocier son contrat", "Suisse romande", "Thrax Legal"],
    "thumb": ("Contrat", "à signer ?", "Relisez avant de signer"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Relecture de contrat de travail : on vous propose un contrat, et vous voulez savoir ce que vous signez ?")(
    title("Particuliers · Relecture de contrat", "Savez-vous ce que vous signez ?",
          chips=[("Nouveau poste", "on vous propose"), ("Signature", "vous signez")]))
S("Une clause défavorable passe vite inaperçue. Et une fois signée, elle est plus difficile à négocier.", P1)(
    warn("Une clause défavorable passe vite inaperçue.", sub="Une fois signée, elle est plus difficile à négocier.", a_sub="Et une fois", label="Le risque"))
S("Deux repères : la période d’essai ne dépasse pas trois mois. Et une non-concurrence n’est valable que si elle est écrite, "
  "et si vous avez accès à la clientèle ou à des secrets d’affaires.", P1)(
    law("Art. 335b et 340 CO", "La période d’essai : trois mois au maximum.", a_text="la période",
        note="Non-concurrence : écrite, et seulement avec accès à la clientèle ou à des secrets", a_note="Et une non-concurrence"))
S("On relit tout le contrat et on signale les points à risque : essai, heures supplémentaires, non-concurrence, mobilité, vacances. "
  "Et on compare avec la convention collective, s’il y en a une.", P2)(
    lst("La relecture", "Tout est vérifié :",
        [("Essai et heures sup", "essai"), ("Non-concurrence et mobilité", "non-concurrence"),
         ("Vacances", "vacances"), ("Convention collective", "la convention")]))
S("Vous recevez les changements à demander avant de signer, avec une formulation polie pour les aborder. Et si vous avez déjà signé, on vous dit quelles clauses sont nulles.", P2)(
    brand("Négociez en connaissance de cause.",
          [("pen", "Changements proposés", "les changements"), ("chat", "Formulation polie", "une formulation"),
           ("cross", "Clauses nulles", "quelles clauses")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre relecture, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
