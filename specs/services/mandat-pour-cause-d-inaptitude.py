"""Vidéo de service — Mandat pour cause d’inaptitude (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, cards, law, process, title, warn

AUDIENCE = "particuliers"
SLUG = "mandat-pour-cause-d-inaptitude"
NAME = "Mandat pour cause d’inaptitude"

META = {
    "title": "Mandat pour cause d’inaptitude : choisissez",
    "yt_title": "Mandat pour cause d'inaptitude en Suisse : choisir qui décidera pour vous (art. 361 CC)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Mandat pour cause d'inaptitude : accident, maladie, si vous ne pouvez plus gérer vos affaires, l'autorité de protection désigne "
                 "quelqu'un. Avec un mandat, c'est vous qui choisissez. Il doit être écrit à la main, daté et signé, ou passé en la forme "
                 "authentique (art. 361 CC). Thrax Legal le rédige avec vous, à prix fixe."),
    "tags": ["mandat pour cause d'inaptitude", "art. 361 CC", "protection de l'adulte", "APEA", "représentation", "prévoyance personnelle",
             "accident maladie", "état civil", "Suisse romande", "Thrax Legal"],
    "thumb": ("Inaptitude", "qui décide ?", "Choisissez qui vous représente"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Mandat pour cause d’inaptitude : si un accident ou une maladie vous empêchait de gérer vos affaires, qui déciderait pour vous ?")(
    title("Particuliers · Mandat d’inaptitude", "Qui décidera pour vous ?",
          chips=[("Accident", "accident"), ("Maladie", "maladie")]))
S("Sans mandat, c’est l’autorité de protection qui désigne quelqu’un. Pas forcément la personne que vous auriez choisie.", P1)(
    warn("Sans mandat, c’est l’autorité qui choisit.", sub="Pas forcément la personne que vous auriez choisie.", a_sub="pas forcément", label="Le risque"))
S("Le mandat doit être entièrement écrit à la main, daté et signé, ou passé en la forme authentique. "
  "Et votre conjoint ne peut vous représenter que pour les affaires courantes.", P1)(
    law("Art. 361 et 374 CC", "Écrit à la main, daté et signé, ou en la forme authentique.", a_text="le mandat",
        note="Le conjoint ne représente que pour les affaires courantes", a_note="Et votre conjoint"))
S("Vous choisissez les domaines : votre personne, votre patrimoine, la représentation. Puis on rédige le texte du mandat, adapté à votre situation.", P2)(
    cards("Les domaines", "C’est vous qui choisissez :",
          [("user", "Votre personne", "Santé, quotidien", "votre personne"),
           ("receipt", "Votre patrimoine", "Biens et finances", "votre patrimoine"),
           ("doc", "La représentation", "Démarches administratives", "la représentation")]))
S("Vous recevez aussi les instructions pour la forme et l’enregistrement à l’état civil. Et vous pouvez le modifier à tout moment, tant que vous êtes capable de discernement.", P2)(
    brand("Vous gardez la main.",
          [("pen", "Forme expliquée", "la forme"), ("building", "Enregistrement", "l’enregistrement"), ("check", "Modifiable", "modifier")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre mandat, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
