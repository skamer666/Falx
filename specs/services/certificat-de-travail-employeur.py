"""Vidéo de service — Rédaction de certificat de travail (entreprises)."""
from service import end_service, page_url, promise, service_cta
from tpl import S, brand, law, lst, process, title, warn

AUDIENCE = "entreprises"
SLUG = "certificat-de-travail-employeur"
NAME = "Rédaction de certificat de travail"

META = {
    "title": "Certificat de travail : le rédiger sans piège",
    "yt_title": "Certificat de travail en Suisse : le rédiger sans piège pour l'employeur (art. 330a CO)",
    "chapter0": "Le problème",
    "links": [("Commander cette prestation", page_url(AUDIENCE, SLUG)),
              ("Toutes nos prestations pour entreprises", "https://thrax-legal.ch/fr/entreprises"),
              ("Le guide complet", "https://thrax-legal.ch/fr/guide/contrat-de-travail-suisse-pme")],
    "yt_intro": ("Certificat de travail en Suisse : il doit être complet, exact et bienveillant (art. 330a CO). Trop flatteur, il peut engager la "
                 "responsabilité de l'employeur envers un futur employeur ; trop sévère, il ouvre un litige. Thrax Legal rédige vos certificats "
                 "de travail et attestations à partir de vos indications, à prix fixe."),
    "tags": ["certificat de travail", "certificat de travail Suisse", "rédiger un certificat de travail", "employeur", "art. 330a CO",
             "certificat intermédiaire", "attestation de travail", "ressources humaines", "PME Suisse romande", "Thrax Legal"],
    "thumb": ("Certificat", "de travail ?", "Un certificat sans piège"),
    "chrome_from": 2,
    "footer": ("Thrax Legal, service juridique externalisé à prix fixe pour les indépendants et les PME de Suisse romande. "
               "Thrax Legal n’est pas un cabinet d’avocats et ne représente pas ses clients devant les tribunaux."),
}

P1 = "01 · Le problème"
P2 = "02 · La solution"
P3 = "03 · Commander"

S("Certificat de travail : un employé vous quitte, et vous devez rédiger son certificat ?")(
    title("Entreprises · Certificat de travail", "Un certificat de travail à rédiger ?",
          chips=[("Départ", "vous quitte"), ("Rédaction", "rédiger")]))
S("Le piège est double. Trop flatteur, il engage votre responsabilité. Trop sévère, il ouvre un litige.", P1)(
    warn("Trop flatteur ou trop sévère : deux pièges.", sub="Votre responsabilité d’un côté, un litige de l’autre.", a_sub="Trop flatteur", label="Le risque"))
S("La loi est claire : le certificat doit être complet, exact et bienveillant. "
  "Et un certificat faussement élogieux peut engager votre responsabilité envers un futur employeur.", P1)(
    law("Art. 330a CO", "Complet, exact et bienveillant.", a_text="le certificat doit",
        note="Faussement élogieux, il peut engager votre responsabilité envers un futur employeur", a_note="Et un certificat"))
S("On part d’un questionnaire rapide sur l’employé, puis on rédige un certificat complet ou une attestation simple, avec des formulations conformes à la pratique.", P2)(
    lst("La méthode", "Rédigé à partir de vos indications :",
        [("Questionnaire rapide", "questionnaire rapide"), ("Certificat complet ou attestation", "un certificat complet"),
         ("Formulations conformes à la pratique", "des formulations")]))
S("Vous donnez le poste, les dates, les tâches et votre appréciation. On s’occupe du reste, y compris pour un certificat intermédiaire.", P2)(
    brand("Un certificat juste, sans piège.",
          [("brief", "Le poste et les dates", "le poste"), ("check", "Tâches et appréciation", "les tâches"),
           ("doc", "Version intermédiaire", "un certificat intermédiaire")]))
S("Vous décrivez votre situation en ligne. Chaque dossier est analysé et recherché, jamais improvisé. Et vous recevez votre certificat, par écrit.", P2)(
    process())
S("Un prix fixe, annoncé avant de commencer. Tout se fait par écrit. Tout est recherché, jamais improvisé. Et si un avocat est nécessaire, on vous le dit.", P2)(
    promise(AUDIENCE))
S("Commandez en ligne, sur la page de la prestation. Le lien est dans la description.", P3)(
    service_cta(AUDIENCE, SLUG, NAME))
S("", None, dur=5.0)(end_service(AUDIENCE))
