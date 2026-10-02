"""Vidéo de service — Relecture d’un contrat avant signature (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, lst, process, stat, title, warn

AUDIENCE = "particuliers"
SLUG = "relecture-contrat-particulier"
NAME = "Relecture d’un contrat avant signature"

META = {
    "title": "Relecture d’un contrat avant signature",
    "yt_title": "Relecture de contrat avant signature : leasing, prêt, achat de véhicule (art. 16 LCC)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Relecture d'un contrat avant signature : leasing, prêt, achat de véhicule, travaux. Nous vous signalons les clauses défavorables, "
                 "les frais cachés et ce que vous pouvez négocier. Pour un leasing ou un crédit à la consommation, vous pouvez révoquer votre "
                 "accord dans les 14 jours (art. 16 LCC). Thrax Legal relit votre contrat, à prix fixe."),
    "tags": ["relecture de contrat", "contrat leasing", "crédit à la consommation", "achat de véhicule", "art. 16 LCC", "révocation leasing",
             "frais cachés", "consommateur Suisse", "Suisse romande", "Thrax Legal"],
    "thumb": ("Leasing,", "prêt ?", "Faites relire avant de signer"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Relecture de contrat : leasing, prêt, achat de véhicule, travaux… vous êtes sur le point de signer ?")(
    title("Particuliers · Relecture de contrat", "Prêt à signer un contrat important ?",
          chips=[("Leasing", "leasing"), ("Prêt", "prêt"), ("Véhicule", "véhicule"), ("Travaux", "travaux")]))
S("Une fois signé, il est souvent trop tard pour négocier. Clauses défavorables, frais cachés : mieux vaut les voir avant.", P1)(
    warn("Une fois signé, il est souvent trop tard.", sub="Clauses défavorables, frais cachés : voyez-les avant.", a_sub="Clauses défavorables", label="Le risque"))
S("Bon à savoir : pour un leasing ou un crédit à la consommation, vous pouvez révoquer votre accord dans les quatorze jours.", P1)(
    stat("Leasing et crédit", 14, "jours pour révoquer votre accord.", a_value="quatorze jours", law="Art. 16 LCC"))
S("On relit tout le contrat, on dresse la liste des risques et des clauses inhabituelles, et on vous propose des modifications à demander.", P2)(
    lst("La relecture", "Avant de signer :",
        [("Relecture complète", "on relit"), ("Risques et clauses inhabituelles", "la liste"), ("Modifications proposées", "des modifications")]))
S("Clauses défavorables, frais cachés, points à négocier : vous savez exactement ce que vous signez.", P2)(
    brand("Signez en connaissance de cause.",
          [("search", "Frais cachés repérés", "frais cachés"), ("pen", "Points à négocier", "points à négocier"),
           ("check", "Signature éclairée", "vous savez")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre relecture, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
