"""Vidéo de service — Recouvrement de facture impayée (entreprises)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, process, steps, title, warn

AUDIENCE = "entreprises"
SLUG = "recouvrement-facture-impayee"
NAME = "Recouvrement de facture impayée"

META = {
    "title": "Facture impayée : le recouvrement de A à Z",
    "yt_title": "Facture impayée en Suisse : recouvrement, mise en demeure et poursuite, sans société d'encaissement",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour entreprises", "https://thrax-legal.ch/fr/entreprises"),
              ("Le guide complet", "https://thrax-legal.ch/fr/guide/mise-en-demeure-recouvrement-suisse")],
    "yt_intro": ("Facture impayée en Suisse : mise en demeure avec intérêts, réquisition de poursuite, analyse de l'opposition. Les créances se "
                 "prescrivent par dix ans en règle générale, mais par cinq ans pour de nombreuses prestations courantes (art. 127 et 128 CO). "
                 "Thrax Legal prend en charge le recouvrement à prix fixe, sans pourcentage."),
    "tags": ["facture impayée", "recouvrement de créances", "recouvrement Suisse", "mise en demeure", "réquisition de poursuite",
             "opposition", "prescription créance", "PME Suisse romande", "société de recouvrement", "Thrax Legal"],
    "thumb": ("Facture", "impayée ?", "Faites-vous payer"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, service juridique externalisé à prix fixe pour les indépendants et les PME de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Recouvrement : une facture impayée depuis des semaines, malgré vos rappels ?")(
    title("Entreprises · Recouvrement", "Une facture impayée depuis des semaines ?",
          chips=[("Impayé", "une facture"), ("Sans réponse", "malgré vos rappels")]))
S("Chaque semaine d’attente pèse sur votre trésorerie. Et une créance finit par se prescrire.", P1)(
    warn("Chaque semaine d’attente pèse sur votre trésorerie.", sub="Et une créance finit par se prescrire.", a_sub="Et une créance", label="Le risque"))
S("Les créances se prescrivent par dix ans en règle générale, mais par cinq ans pour de nombreuses prestations courantes. Mieux vaut agir tôt.", P1)(
    law("Art. 127 et 128 CO", "Dix ans en règle générale, cinq ans pour bien des prestations.", a_text="dix ans",
        note="Mieux vaut agir tôt que trop tard", a_note="Mieux vaut"))
S("On prend en charge tout le parcours : la mise en demeure avec intérêts, la réquisition de poursuite préparée, "
  "et si le débiteur fait opposition, l’analyse de la suite.", P2)(
    steps("Le parcours", "De la relance à la poursuite",
          [("Mise en demeure", "avec intérêts", "la mise en demeure"), ("Réquisition", "de poursuite, préparée", "la réquisition"),
           ("Opposition ?", "analyse et suite", "fait opposition")]))
S("Contrairement à une société de recouvrement, on ne prend aucun pourcentage, et on préserve la relation client quand c’est possible. "
  "Vous déposez vous-même la réquisition, prête à l’emploi.", P2)(
    brand("Faites-vous payer, sans casser la relation.",
          [("lock", "Aucun pourcentage", "aucun pourcentage"), ("user", "Relation préservée", "la relation client"),
           ("doc", "Prête à déposer", "Vous déposez")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez vos documents, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
