"""Vidéo de service — Contester une facture (particuliers)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, lst, process, ruler, title, warn

AUDIENCE = "particuliers"
SLUG = "contester-une-facture"
NAME = "Contester une facture"

META = {
    "title": "Contester une facture injustifiée",
    "yt_title": "Contester une facture injustifiée en Suisse : lettre motivée et opposition (art. 74 LP)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour particuliers", "https://thrax-legal.ch/fr/particuliers")],
    "yt_intro": ("Contester une facture : prestation jamais commandée, montant gonflé, frais surprises ? Payer « pour avoir la paix » vaut souvent "
                 "reconnaissance, et en cas de commandement de payer, l'opposition se fait dans les 10 jours (art. 74 LP). Thrax Legal rédige "
                 "votre contestation écrite et motivée, à prix fixe."),
    "tags": ["contester une facture", "facture injustifiée", "facture abusive", "frais cachés", "commandement de payer", "art. 74 LP",
             "opposition", "consommateur Suisse", "Suisse romande", "Thrax Legal"],
    "thumb": ("Facture", "injuste ?", "Contestez par écrit"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, le juridique à prix fixe pour les particuliers de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Contester une facture : une prestation jamais commandée, un montant gonflé, des frais surprises ?")(
    title("Particuliers · Contester une facture", "Une facture injustifiée ?",
          chips=[("Non commandé", "jamais commandée"), ("Montant gonflé", "montant gonflé"), ("Frais cachés", "frais surprises")]))
S("Attention : payer « pour avoir la paix » vaut souvent reconnaissance. Réfléchissez avant de payer.", P1)(
    warn("Payer « pour avoir la paix » vaut souvent reconnaissance.", sub="Réfléchissez avant de payer.", a_sub="Réfléchissez", label="Le risque"))
S("Et si l’entreprise vous met aux poursuites, vous avez dix jours dès le commandement de payer pour faire opposition. "
  "Payez la partie non contestée : cela montre votre bonne foi.", P1)(
    ruler("Art. 74 LP", "Si un commandement de payer arrive", 14,
          [(10, "10 jours", "Pour faire opposition", "dix jours")],
          note=("Payez la partie non contestée : un signe de bonne foi", "la partie non contestée")))
S("On analyse la facture et ce qui a été convenu, on rédige une lettre de contestation motivée, avec le montant reconnu, et on vous donne la marche à suivre en cas de rappel ou de poursuite.", P2)(
    lst("La contestation", "Claire et motivée :",
        [("Facture et accord analysés", "on analyse"), ("Contestation motivée", "une lettre"),
         ("Montant reconnu précisé", "le montant reconnu"), ("Marche à suivre", "la marche à suivre")]))
S("Votre lettre explique pourquoi vous ne devez pas ce montant. Elle est prête à envoyer.", P2)(
    brand("Ne payez pas ce que vous ne devez pas.",
          [("receipt", "Montant contesté", "pourquoi vous"), ("scale", "Arguments clairs", "ce montant"),
           ("mail", "Prête à envoyer", "prête à envoyer")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre lettre, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
