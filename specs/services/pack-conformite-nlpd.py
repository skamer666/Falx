"""Vidéo de service — Pack conformité nLPD (entreprises)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, lst, process, stat, title, warn

AUDIENCE = "entreprises"
SLUG = "pack-conformite-nlpd"
NAME = "Pack conformité nLPD"

META = {
    "title": "Pack conformité nLPD : mettez votre entreprise en règle",
    "yt_title": "Conformité nLPD pour PME suisses : politique de confidentialité, registre et clauses (art. 19 nLPD)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour entreprises", "https://thrax-legal.ch/fr/entreprises"),
              ("Le guide complet", "https://thrax-legal.ch/fr/guide/conformite-nlpd-pme")],
    "yt_intro": ("Conformité nLPD : depuis le 1er septembre 2023, la nouvelle loi sur la protection des données s'applique à toutes les entreprises. "
                 "Obligation d'informer (art. 19 nLPD), amende jusqu'à 250'000 CHF pour certaines violations intentionnelles (art. 60 nLPD). "
                 "Thrax Legal fait l'inventaire de vos traitements et rédige politique de confidentialité, registre et clauses, à prix fixe."),
    "tags": ["nLPD", "conformité nLPD", "protection des données Suisse", "politique de confidentialité", "registre des traitements",
             "art. 19 nLPD", "art. 60 nLPD", "RGPD", "PME Suisse romande", "Thrax Legal"],
    "thumb": ("nLPD :", "en règle ?", "Votre pack conformité"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, service juridique externalisé à prix fixe pour les indépendants et les PME de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Pack conformité nLPD : votre site, vos clients, vos outils… votre entreprise respecte-t-elle la nouvelle loi sur la protection des données ?")(
    title("Entreprises · Conformité nLPD", "Êtes-vous en règle avec la nLPD ?",
          chips=[("Site web", "votre site"), ("Clients", "vos clients"), ("Outils", "vos outils")]))
S("Depuis le premier septembre 2023, elle s’applique à toutes les entreprises. Même aux plus petites.", P1)(
    warn("La nLPD s’applique à toutes les entreprises.", sub="Depuis le 1er septembre 2023, même aux plus petites.", a_sub="Même aux", label="Le risque"))
S("La sanction est lourde : certaines violations intentionnelles exposent les responsables à une amende jusqu’à deux cent cinquante mille francs. "
  "Et vous devez informer les personnes de la collecte de leurs données.", P1)(
    stat("Jusqu’à", 250, "d’amende possible pour les responsables.", a_value="une amende", suffix="'000 CHF",
         law="Art. 19 et 60 nLPD", a_law="Et vous devez"))
S("On fait l’inventaire guidé de vos traitements et de vos sous-traitants, puis on rédige la politique de confidentialité, "
  "le registre des activités de traitement et les clauses pour vos contrats.", P2)(
    lst("Le pack", "Vos documents essentiels :",
        [("Inventaire de vos traitements", "l’inventaire"), ("Politique de confidentialité", "la politique"),
         ("Registre des traitements", "le registre"), ("Clauses pour vos contrats", "les clauses")]))
S("Votre site, vos outils, votre CRM, votre newsletter, votre cloud : tout est passé en revue. Et si le RGPD européen s’applique à vous, on l’intègre.", P2)(
    brand("Votre conformité, documentée.",
          [("link", "Votre site", "votre site"), ("data", "Vos outils", "vos outils"),
           ("check", "Tout passé en revue", "tout est passé"), ("shield", "RGPD si nécessaire", "le rgpd")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez vos documents, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
