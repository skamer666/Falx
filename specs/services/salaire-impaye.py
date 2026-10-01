"""Vidéo de service — Salaire, heures sup ou vacances impayés (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, lst, process, stat, title, warn

AUDIENCE = "particuliers"
SLUG = "salaire-impaye"
NAME = "Salaire, heures sup ou vacances impayés"

META = {
    "title": "Salaire impayé : réclamez ce qui vous est dû",
    "yt_title": "Salaire impayé en Suisse : heures supplémentaires, vacances et mise en demeure à l'employeur",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Salaire impayé, heures supplémentaires jamais payées, solde de vacances ignoré : les heures supplémentaires sont payées avec "
                 "un supplément de 25 %, sauf accord écrit contraire (art. 321c CO), et les créances de salaire se prescrivent par cinq ans "
                 "(art. 128 CO). Thrax Legal calcule ce qui vous est dû et rédige la mise en demeure à votre employeur, à prix fixe."),
    "tags": ["salaire impayé", "heures supplémentaires impayées", "vacances impayées", "mise en demeure employeur", "art. 321c CO",
             "art. 128 CO", "droit du travail Suisse", "treizième salaire", "Suisse romande", "Thrax Legal"],
    "thumb": ("Salaire", "impayé ?", "Réclamez ce qui vous est dû"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Salaire impayé, heures supplémentaires jamais payées, vacances ignorées à la fin du contrat ?")(
    title("Particuliers · Salaire impayé", "Votre employeur vous doit de l’argent ?",
          chips=[("Salaire", "salaire impayé"), ("Heures sup", "heures supplémentaires"), ("Vacances", "vacances")]))
S("Sans calcul précis, vous risquez d’oublier une partie de ce qui vous est dû. Salaire, heures, vacances, treizième : tout compte.", P1)(
    warn("Sans calcul précis, vous risquez d’oublier une partie.", sub="Salaire, heures, vacances, 13e : tout compte.", a_sub="salaire, heures", label="Le risque"))
S("Les heures supplémentaires sont payées avec un supplément de vingt-cinq pour cent, sauf accord écrit contraire. "
  "Et les créances de salaire se prescrivent par cinq ans : ne laissez pas traîner.", P1)(
    stat("Heures supplémentaires", 25, "de supplément, sauf accord écrit contraire.", a_value="un supplément", suffix="%",
         law="Art. 321c CO", side="Les créances de salaire se prescrivent par cinq ans (art. 128 CO).", a_side="Et les créances"))
S("On calcule précisément ce qui vous est dû, on vérifie le contrat et la convention collective, et on rédige la mise en demeure avec un délai de paiement.", P2)(
    lst("Le dossier", "Ce qu’on prépare :",
        [("Calcul détaillé des montants", "on calcule"), ("Contrat et convention vérifiés", "on vérifie"),
         ("Mise en demeure avec délai", "on rédige")]))
S("La lettre est ferme mais correcte, pour préserver la relation si vous restez. Et si l’employeur ne paie pas, vous avez la marche à suivre.", P2)(
    brand("Ce qui vous est dû, réclamé proprement.",
          [("mail", "Ferme mais correcte", "ferme mais correcte"), ("user", "Relation préservée", "préserver la relation"),
           ("arrow", "Marche à suivre", "la marche à suivre")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre lettre, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
