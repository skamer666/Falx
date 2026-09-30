import type { Locale } from "@/i18n/config";
import type { AccessState } from "./model";

export type BlockedState = Exclude<AccessState, "ok">;

export type AccountStrings = {
  login: {
    metaTitle: string;
    heading: string;
    subheading: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    cta: string;
    forgot: string;
    noAccount: string;
    createAccount: string;
    notices: { reset: string; signout: string };
    errors: {
      email: string;
      invalid: string;
      locked: string;
      exists: string;
      pending: string;
      expired: string;
      paused: string;
      cancelled: string;
    };
  };
  signup: {
    metaTitle: string;
    heading: string;
    subheading: string;
    emailLabel: string;
    nameLabel: string;
    namePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    planLabel: string;
    planEssentiel: string;
    planEssentielNote: string;
    planCroissance: string;
    planCroissanceNote: string;
    termsBefore: string;
    termsCgv: string;
    termsMiddle: string;
    termsPrivacy: string;
    termsAfter: string;
    aiLabel: string;
    aiHelp: string;
    activationNote: string;
    cta: string;
    haveAccount: string;
    signIn: string;
    errors: { email: string; name: string; terms: string; ai: string; throttled: string };
  };
  forgot: {
    metaTitle: string;
    heading: string;
    subheading: string;
    cta: string;
    back: string;
    errorEmail: string;
    errorThrottled: string;
  };
  reset: {
    metaTitle: string;
    heading: string;
    subheading: string;
    passwordLabel: string;
    confirmLabel: string;
    cta: string;
    invalidHeading: string;
    invalidBody: string;
    requestNew: string;
    mismatch: string;
  };
  check: {
    signup: { metaTitle: string; heading: string; body: string; note: string };
    reset: { metaTitle: string; heading: string; body: string; note: string };
    back: string;
  };
  blocked: {
    states: Record<BlockedState, { heading: string; body: string }>;
    contact: string;
    logout: string;
  };
  passwordProblems: { short: string; long: string; same_as_email: string; common: string };
  kinds: { question: string; dossier: string };
  dash: {
    metaTitle: string;
    greeting: string;
    plan: string;
    validUntil: string;
    settings: string;
    logout: string;
    dossiersQuota: string;
    questionsQuota: string;
    used: (used: number, total: number) => string;
    overDossiers: string;
    overQuestions: string;
    newRequest: string;
    requestsHeading: string;
    empty: string;
    emptyCta: string;
    successBanner: string;
    renewalBanner: (date: string) => string;
    newReply: string;
    dueBy: string;
    overdueNote: string;
    open: string;
  };
  detail: {
    metaTitle: string;
    back: string;
    submittedOn: string;
    dueBy: string;
    yourRequest: string;
    attachments: string;
    conversation: string;
    you: string;
    team: string;
    noMessages: string;
    replyLabel: string;
    replyPlaceholder: string;
    replyAttach: string;
    replyCta: string;
    closedNote: string;
    waitingNote: string;
    notFound: string;
    errorReply: string;
    errorFile: string;
    sent: string;
    urgent: string;
  };
  newRequest: {
    metaTitle: string;
    back: string;
    heading: string;
    subheading: string;
    kindLabel: string;
    kindQuestionTitle: string;
    kindQuestionNote: string;
    kindDossierTitle: string;
    kindDossierNote: string;
    categoryLabel: string;
    urgencyLabel: string;
    urgencyNormal: string;
    urgencyUrgent: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    attachmentsLabel: string;
    attachmentsNote: string;
    cta: string;
    error: string;
    errorFile: string;
    quotaDossier: (left: number) => string;
    quotaQuestion: (left: number) => string;
  };
  settings: {
    metaTitle: string;
    back: string;
    heading: string;
    profileHeading: string;
    nameLabel: string;
    companyLabel: string;
    phoneLabel: string;
    emailLabel: string;
    saveProfile: string;
    profileSaved: string;
    passwordHeading: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    savePassword: string;
    passwordSaved: string;
    wrongPassword: string;
    mismatch: string;
    subscriptionHeading: string;
    planLabel: string;
    statusLabel: string;
    validUntilLabel: string;
    statusValues: Record<"ok" | BlockedState, string>;
    paymentsHeading: string;
    noPayments: string;
    period: string;
    changePlanNote: string;
    errorProfile: string;
  };
};

const fr: AccountStrings = {
  login: {
    metaTitle: "Connexion | Thrax Legal",
    heading: "Connexion à votre espace",
    subheading: "Entrez votre adresse email et votre mot de passe.",
    emailLabel: "Adresse email",
    emailPlaceholder: "vous@entreprise.ch",
    passwordLabel: "Mot de passe",
    cta: "Se connecter",
    forgot: "Mot de passe oublié ?",
    noAccount: "Pas encore client ?",
    createAccount: "S’inscrire",
    notices: {
      reset: "Mot de passe enregistré. Vous pouvez maintenant vous connecter.",
      signout: "Vous êtes déconnecté.",
    },
    errors: {
      email: "Adresse email invalide.",
      invalid: "Email ou mot de passe incorrect.",
      locked: "Trop de tentatives. Réessayez dans 15 minutes.",
      exists: "Un compte existe déjà avec cette adresse. Connectez-vous ou réinitialisez votre mot de passe.",
      pending:
        "Votre compte est en attente d'activation : il est ouvert dès réception de votre paiement. Nous vous écrivons dès que c'est fait.",
      expired:
        "Votre période d'abonnement est terminée. L'accès revient dès réception du paiement de la période suivante.",
      paused: "Votre abonnement est en pause. Écrivez-nous pour le reprendre.",
      cancelled: "Cet abonnement est résilié. Écrivez-nous si vous souhaitez le réactiver.",
    },
  },
  signup: {
    metaTitle: "Créer votre compte | Thrax Legal",
    heading: "Je m’inscris",
    subheading: "Laissez vos informations et acceptez les conditions en ligne. Aucun paiement maintenant : nous vous contactons pour finaliser et ouvrir votre espace.",
    emailLabel: "Adresse email",
    nameLabel: "Nom et prénom",
    namePlaceholder: "Jean Dupont",
    companyLabel: "Entreprise (optionnel)",
    companyPlaceholder: "Nom de votre société",
    phoneLabel: "Téléphone (recommandé, pour vous rappeler)",
    phonePlaceholder: "+41 79 000 00 00",
    messageLabel: "Votre besoin en quelques mots (facultatif)",
    messagePlaceholder: "Ex. : contrat de distribution, litige avec un client, CGV pour ma boutique…",
    planLabel: "Votre formule",
    planEssentiel: "Essentiel",
    planEssentielNote: "290 CHF/mois · 10 questions rapides · 5 dossiers/mois",
    planCroissance: "Croissance",
    planCroissanceNote: "690 CHF/mois · 30 questions rapides · 12 dossiers/mois",
    termsBefore: "J'ai lu et j'accepte les ",
    termsCgv: "conditions générales",
    termsMiddle: " et la ",
    termsPrivacy: "politique de confidentialité",
    termsAfter: ", et je confirme souscrire à des fins professionnelles.",
    aiLabel: "J’accepte que mes informations et documents soient traités par un outil d’intelligence artificielle (Claude, édité par Anthropic, aux États-Unis) pour préparer les réponses de Thrax Legal, qui les relit et en reste responsable.",
    aiHelp: "Ce traitement est nécessaire au service. Thrax Legal désactive l’usage de ces données pour l’entraînement des modèles. Évitez d’envoyer des données sensibles inutiles. Détails dans la politique de confidentialité.",
    activationNote: "Sans paiement à ce stade. Nous vous contactons dans les meilleurs délais (en principe sous 1 jour ouvré) pour finaliser votre abonnement. Votre espace s’ouvre à réception du premier paiement : vous choisissez alors votre mot de passe.",
    cta: "Envoyer ma demande d’abonnement",
    haveAccount: "Déjà un compte ?",
    signIn: "Se connecter",
    errors: {
      email: "Vérifiez votre adresse email.",
      name: "Indiquez votre nom et prénom.",
      terms: "Vous devez accepter les conditions générales pour continuer.",
      ai: "Le traitement par l’intelligence artificielle est nécessaire au service : cochez la case correspondante pour continuer.",
      throttled: "Trop d’inscriptions depuis cette connexion. Réessayez dans une heure ou demandez à être rappelé.",
    },
  },
  forgot: {
    metaTitle: "Mot de passe oublié | Thrax Legal",
    heading: "Mot de passe oublié",
    subheading: "Entrez votre adresse email : nous vous envoyons un lien pour choisir un nouveau mot de passe.",
    cta: "Envoyer le lien",
    back: "Retour à la connexion",
    errorEmail: "Adresse email invalide.",
    errorThrottled: "Trop de demandes. Réessayez dans une heure.",
  },
  reset: {
    metaTitle: "Choisir un mot de passe | Thrax Legal",
    heading: "Choisissez votre mot de passe",
    subheading: "8 caractères minimum. Évitez les mots de passe déjà utilisés ailleurs.",
    passwordLabel: "Nouveau mot de passe",
    confirmLabel: "Confirmez le mot de passe",
    cta: "Enregistrer",
    invalidHeading: "Lien invalide ou expiré",
    invalidBody: "Ce lien n'est plus valable (durée d'une heure, usage unique). Demandez-en un nouveau.",
    requestNew: "Recevoir un nouveau lien",
    mismatch: "Les deux mots de passe ne correspondent pas.",
  },
  check: {
    signup: {
      metaTitle: "Demande reçue | Thrax Legal",
      heading: "Merci, votre demande est enregistrée",
      body: "Nous avons bien reçu votre demande d’abonnement pour",
      note: "Vous avez accepté les conditions générales en ligne : une confirmation vous est envoyée par email. Nous vous contactons dans les meilleurs délais pour finaliser. À l’activation de votre espace, vous recevez un lien pour choisir votre mot de passe.",
    },
    reset: {
      metaTitle: "Vérifiez vos emails | Thrax Legal",
      heading: "Vérifiez vos emails",
      body: "Si un compte existe pour",
      note: "un lien vient d'être envoyé pour choisir un mot de passe. Il est valable une heure. Pensez à vérifier vos spams.",
    },
    back: "Retour à la connexion",
  },
  blocked: {
    states: {
      pending: {
        heading: "Compte en attente d'activation",
        body: "Votre espace s'ouvre dès réception de votre premier paiement. Nous vous écrivons dès que c'est fait.",
      },
      expired: {
        heading: "Période d'abonnement terminée",
        body: "L'accès revient dès réception du paiement de la période suivante. Vos dossiers et échanges sont conservés.",
      },
      paused: {
        heading: "Abonnement en pause",
        body: "Votre abonnement est en pause. Écrivez-nous pour le reprendre : vos dossiers sont conservés.",
      },
      cancelled: {
        heading: "Abonnement résilié",
        body: "Cet abonnement est résilié. Écrivez-nous si vous souhaitez le réactiver.",
      },
    },
    contact: "Nous écrire",
    logout: "Se déconnecter",
  },
  passwordProblems: {
    short: "Le mot de passe doit contenir au moins 8 caractères.",
    long: "Le mot de passe est trop long.",
    same_as_email: "Le mot de passe ne doit pas être votre adresse email.",
    common: "Ce mot de passe est trop courant. Choisissez-en un autre.",
  },
  kinds: { question: "Question rapide", dossier: "Dossier" },
  dash: {
    metaTitle: "Tableau de bord | Thrax Legal",
    greeting: "Bonjour",
    plan: "Formule",
    validUntil: "Abonnement valable jusqu'au",
    settings: "Mon compte",
    logout: "Déconnexion",
    dossiersQuota: "Dossiers ce mois-ci",
    questionsQuota: "Questions rapides ce mois-ci",
    used: (used, total) => `${used} / ${total} utilisés`,
    overDossiers: "Forfait dépassé : chaque dossier supplémentaire est facturé 79 CHF, prix fixe.",
    overQuestions:
      "Forfait de questions atteint : les questions suivantes sont traitées le mois prochain, ou comptées comme un dossier si vous préférez.",
    newRequest: "Nouvelle demande",
    requestsHeading: "Vos demandes",
    empty: "Vous n'avez pas encore envoyé de demande.",
    emptyCta: "Envoyer ma première demande",
    successBanner: "Votre demande a bien été transmise. Vous recevrez une réponse dans le délai de votre formule.",
    renewalBanner: (date) => `Votre période d'abonnement se termine le ${date}. Écrivez-nous pour la renouveler sans interruption.`,
    newReply: "Nouvelle réponse",
    dueBy: "Réponse attendue d'ici le",
    overdueNote: "Délai dépassé, nous y travaillons",
    open: "Ouvrir",
  },
  detail: {
    metaTitle: "Demande | Thrax Legal",
    back: "Retour au tableau de bord",
    submittedOn: "Envoyée le",
    dueBy: "Réponse attendue d'ici le",
    yourRequest: "Votre demande",
    attachments: "Documents joints",
    conversation: "Échanges",
    you: "Vous",
    team: "Thrax Legal",
    noMessages: "Aucune réponse pour l'instant. Nous revenons vers vous dans le délai de votre formule.",
    replyLabel: "Ajouter un message",
    replyPlaceholder: "Une précision, un document manquant, une question de suivi…",
    replyAttach: "Joindre des documents (optionnel, 5 fichiers, 10 Mo chacun)",
    replyCta: "Envoyer",
    closedNote: "Cette demande est traitée. Si vous répondez ci-dessous, elle est rouverte.",
    waitingNote: "Nous attendons votre retour pour avancer.",
    notFound: "Demande introuvable.",
    errorReply: "Écrivez un message ou joignez un document.",
    errorFile: "Un fichier dépasse 10 Mo.",
    sent: "Message envoyé.",
    urgent: "Urgent",
  },
  newRequest: {
    metaTitle: "Nouvelle demande | Thrax Legal",
    back: "Retour au tableau de bord",
    heading: "Décrivez votre demande",
    subheading: "Plus vous êtes précis, plus la réponse sera rapide et pertinente.",
    kindLabel: "De quoi s'agit-il ?",
    kindQuestionTitle: "Question rapide",
    kindQuestionNote: "Une question précise, réponse écrite brève (environ 15 minutes de travail). Suivis dans les 14 jours non comptés.",
    kindDossierTitle: "Dossier",
    kindDossierNote: "Un travail avec un livrable écrit : contrat, courrier, mise en demeure, analyse d'une situation.",
    categoryLabel: "Thème",
    urgencyLabel: "Urgence",
    urgencyNormal: "Normal",
    urgencyUrgent: "Urgent (formule Croissance, traité sous 24 h ouvrées)",
    descriptionLabel: "Décrivez votre situation",
    descriptionPlaceholder:
      "Expliquez ce qui se passe, ce que vous avez déjà fait, ce que vous attendez de nous. Contexte, dates, montants, personnes concernées…",
    attachmentsLabel: "Documents (optionnel)",
    attachmentsNote: "Contrats, courriers, échanges d'emails. 5 fichiers maximum, 10 Mo chacun.",
    cta: "Envoyer",
    error: "Choisissez un thème et décrivez votre situation (10 caractères minimum).",
    errorFile: "Un fichier dépasse 10 Mo.",
    quotaDossier: (left) => (left > 0 ? `Il vous reste ${left} dossier${left > 1 ? "s" : ""} inclus ce mois-ci.` : "Forfait atteint : 79 CHF pour ce dossier supplémentaire, prix fixe."),
    quotaQuestion: (left) =>
      left > 0 ? `Il vous reste ${left} question${left > 1 ? "s" : ""} rapide${left > 1 ? "s" : ""} incluse${left > 1 ? "s" : ""} ce mois-ci.` : "Forfait de questions atteint : traitée le mois prochain, ou comptée comme un dossier.",
  },
  settings: {
    metaTitle: "Mon compte | Thrax Legal",
    back: "Retour au tableau de bord",
    heading: "Mon compte",
    profileHeading: "Mes informations",
    nameLabel: "Nom et prénom",
    companyLabel: "Entreprise",
    phoneLabel: "Téléphone",
    emailLabel: "Adresse email (non modifiable ici)",
    saveProfile: "Enregistrer",
    profileSaved: "Informations enregistrées.",
    passwordHeading: "Changer mon mot de passe",
    currentPassword: "Mot de passe actuel",
    newPassword: "Nouveau mot de passe",
    confirmPassword: "Confirmez le nouveau mot de passe",
    savePassword: "Changer le mot de passe",
    passwordSaved: "Mot de passe modifié. Vos autres appareils ont été déconnectés.",
    wrongPassword: "Le mot de passe actuel est incorrect.",
    mismatch: "Les deux mots de passe ne correspondent pas.",
    subscriptionHeading: "Mon abonnement",
    planLabel: "Formule",
    statusLabel: "Statut",
    validUntilLabel: "Valable jusqu'au",
    statusValues: {
      ok: "Actif",
      pending: "En attente d'activation",
      expired: "Période terminée",
      paused: "En pause",
      cancelled: "Résilié",
    },
    paymentsHeading: "Paiements reçus",
    noPayments: "Aucun paiement enregistré pour l'instant.",
    period: "Période",
    changePlanNote: "Pour changer de formule, mettre en pause ou résilier, écrivez-nous : nous nous en occupons.",
    errorProfile: "Indiquez au moins votre nom.",
  },
};

const de: AccountStrings = {
  login: {
    metaTitle: "Anmeldung | Thrax Legal",
    heading: "Anmeldung in Ihrem Bereich",
    subheading: "Geben Sie Ihre E-Mail-Adresse und Ihr Passwort ein.",
    emailLabel: "E-Mail-Adresse",
    emailPlaceholder: "sie@unternehmen.ch",
    passwordLabel: "Passwort",
    cta: "Anmelden",
    forgot: "Passwort vergessen?",
    noAccount: "Noch nicht Kunde?",
    createAccount: "Registrieren",
    notices: {
      reset: "Passwort gespeichert. Sie können sich jetzt anmelden.",
      signout: "Sie sind abgemeldet.",
    },
    errors: {
      email: "Ungültige E-Mail-Adresse.",
      invalid: "E-Mail oder Passwort falsch.",
      locked: "Zu viele Versuche. Versuchen Sie es in 15 Minuten erneut.",
      exists: "Mit dieser Adresse existiert bereits ein Konto. Melden Sie sich an oder setzen Sie Ihr Passwort zurück.",
      pending:
        "Ihr Konto wartet auf die Aktivierung: Es wird nach Zahlungseingang freigeschaltet. Wir schreiben Ihnen, sobald es so weit ist.",
      expired: "Ihre Abonnementperiode ist abgelaufen. Der Zugang kehrt nach Eingang der Zahlung für die nächste Periode zurück.",
      paused: "Ihr Abonnement ist pausiert. Schreiben Sie uns, um es wieder aufzunehmen.",
      cancelled: "Dieses Abonnement ist gekündigt. Schreiben Sie uns, wenn Sie es reaktivieren möchten.",
    },
  },
  signup: {
    metaTitle: "Konto erstellen | Thrax Legal",
    heading: "Ich melde mich an",
    subheading: "Hinterlassen Sie Ihre Angaben und akzeptieren Sie die Bedingungen online. Jetzt keine Zahlung: Wir melden uns, um alles abzuschliessen und Ihren Bereich zu öffnen.",
    emailLabel: "E-Mail-Adresse",
    nameLabel: "Vor- und Nachname",
    namePlaceholder: "Hans Muster",
    companyLabel: "Unternehmen (optional)",
    companyPlaceholder: "Name Ihres Unternehmens",
    phoneLabel: "Telefon (empfohlen, damit wir Sie anrufen können)",
    phonePlaceholder: "+41 79 000 00 00",
    messageLabel: "Ihr Anliegen in wenigen Worten (freiwillig)",
    messagePlaceholder: "Z. B.: Vertriebsvertrag, Streit mit einem Kunden, AGB für meinen Shop …",
    planLabel: "Ihre Formel",
    planEssentiel: "Essentiel",
    planEssentielNote: "CHF 290/Monat · 10 Kurzfragen · 5 Anliegen/Monat",
    planCroissance: "Croissance",
    planCroissanceNote: "CHF 690/Monat · 30 Kurzfragen · 12 Anliegen/Monat",
    termsBefore: "Ich habe die ",
    termsCgv: "Allgemeinen Geschäftsbedingungen",
    termsMiddle: " und die ",
    termsPrivacy: "Datenschutzerklärung",
    termsAfter: " gelesen, akzeptiere sie und bestätige, dass ich zu beruflichen Zwecken abschliesse.",
    aiLabel: "Ich akzeptiere, dass meine Angaben und Dokumente von einem KI-Tool (Claude, herausgegeben von Anthropic, USA) verarbeitet werden, um die Antworten von Thrax Legal vorzubereiten, das sie überprüft und dafür verantwortlich bleibt.",
    aiHelp: "Diese Verarbeitung ist für den Dienst erforderlich. Thrax Legal deaktiviert die Nutzung dieser Daten für das Training der Modelle. Senden Sie keine unnötigen sensiblen Daten. Einzelheiten in der Datenschutzerklärung.",
    activationNote: "Zu diesem Zeitpunkt ohne Zahlung. Wir melden uns so rasch wie möglich (in der Regel innert 1 Arbeitstag), um Ihr Abonnement abzuschliessen. Ihr Bereich wird mit Eingang der ersten Zahlung freigeschaltet: Dann wählen Sie Ihr Passwort.",
    cta: "Abonnementsanfrage senden",
    haveAccount: "Schon ein Konto?",
    signIn: "Anmelden",
    errors: {
      email: "Prüfen Sie Ihre E-Mail-Adresse.",
      name: "Geben Sie Ihren Vor- und Nachnamen an.",
      terms: "Sie müssen die Allgemeinen Geschäftsbedingungen akzeptieren, um fortzufahren.",
      ai: "Die Verarbeitung durch künstliche Intelligenz ist für den Dienst erforderlich: Bitte aktivieren Sie das entsprechende Feld, um fortzufahren.",
      throttled: "Zu viele Anmeldungen von dieser Verbindung. Versuchen Sie es in einer Stunde erneut oder lassen Sie sich zurückrufen.",
    },
  },
  forgot: {
    metaTitle: "Passwort vergessen | Thrax Legal",
    heading: "Passwort vergessen",
    subheading: "Geben Sie Ihre E-Mail-Adresse ein: Wir senden Ihnen einen Link, um ein neues Passwort zu wählen.",
    cta: "Link senden",
    back: "Zurück zur Anmeldung",
    errorEmail: "Ungültige E-Mail-Adresse.",
    errorThrottled: "Zu viele Anfragen. Versuchen Sie es in einer Stunde erneut.",
  },
  reset: {
    metaTitle: "Passwort wählen | Thrax Legal",
    heading: "Wählen Sie Ihr Passwort",
    subheading: "Mindestens 8 Zeichen. Vermeiden Sie Passwörter, die Sie schon anderswo verwenden.",
    passwordLabel: "Neues Passwort",
    confirmLabel: "Passwort bestätigen",
    cta: "Speichern",
    invalidHeading: "Link ungültig oder abgelaufen",
    invalidBody: "Dieser Link ist nicht mehr gültig (eine Stunde, einmalige Nutzung). Fordern Sie einen neuen an.",
    requestNew: "Neuen Link erhalten",
    mismatch: "Die beiden Passwörter stimmen nicht überein.",
  },
  check: {
    signup: {
      metaTitle: "Anfrage erhalten | Thrax Legal",
      heading: "Danke, Ihre Anfrage ist erfasst",
      body: "Wir haben Ihre Abonnementsanfrage erhalten für",
      note: "Sie haben die Allgemeinen Geschäftsbedingungen online akzeptiert: Eine Bestätigung wird Ihnen per E-Mail gesendet. Wir melden uns so rasch wie möglich, um alles abzuschliessen. Bei der Freischaltung Ihres Bereichs erhalten Sie einen Link zur Wahl Ihres Passworts.",
    },
    reset: {
      metaTitle: "Prüfen Sie Ihre E-Mails | Thrax Legal",
      heading: "Prüfen Sie Ihre E-Mails",
      body: "Falls ein Konto existiert für",
      note: "wurde ein Link zum Wählen eines Passworts gesendet. Er ist eine Stunde gültig. Prüfen Sie gegebenenfalls Ihren Spam-Ordner.",
    },
    back: "Zurück zur Anmeldung",
  },
  blocked: {
    states: {
      pending: {
        heading: "Konto wartet auf Aktivierung",
        body: "Ihr Bereich wird nach Eingang Ihrer ersten Zahlung freigeschaltet. Wir schreiben Ihnen, sobald es so weit ist.",
      },
      expired: {
        heading: "Abonnementperiode abgelaufen",
        body: "Der Zugang kehrt nach Eingang der Zahlung für die nächste Periode zurück. Ihre Anliegen und Nachrichten bleiben erhalten.",
      },
      paused: {
        heading: "Abonnement pausiert",
        body: "Ihr Abonnement ist pausiert. Schreiben Sie uns, um es wieder aufzunehmen: Ihre Anliegen bleiben erhalten.",
      },
      cancelled: {
        heading: "Abonnement gekündigt",
        body: "Dieses Abonnement ist gekündigt. Schreiben Sie uns, wenn Sie es reaktivieren möchten.",
      },
    },
    contact: "Uns schreiben",
    logout: "Abmelden",
  },
  passwordProblems: {
    short: "Das Passwort muss mindestens 8 Zeichen enthalten.",
    long: "Das Passwort ist zu lang.",
    same_as_email: "Das Passwort darf nicht Ihre E-Mail-Adresse sein.",
    common: "Dieses Passwort ist zu gebräuchlich. Wählen Sie ein anderes.",
  },
  kinds: { question: "Kurzfrage", dossier: "Anliegen" },
  dash: {
    metaTitle: "Übersicht | Thrax Legal",
    greeting: "Hallo",
    plan: "Formel",
    validUntil: "Abonnement gültig bis",
    settings: "Mein Konto",
    logout: "Abmelden",
    dossiersQuota: "Anliegen diesen Monat",
    questionsQuota: "Kurzfragen diesen Monat",
    used: (used, total) => `${used} / ${total} genutzt`,
    overDossiers: "Kontingent überschritten: Jedes zusätzliche Anliegen kostet CHF 79, Fixpreis.",
    overQuestions:
      "Fragenkontingent erreicht: Weitere Fragen werden im nächsten Monat bearbeitet oder auf Wunsch als Anliegen gezählt.",
    newRequest: "Neue Anfrage",
    requestsHeading: "Ihre Anfragen",
    empty: "Sie haben noch keine Anfrage gesendet.",
    emptyCta: "Erste Anfrage senden",
    successBanner: "Ihre Anfrage wurde übermittelt. Sie erhalten eine Antwort innerhalb der Frist Ihrer Formel.",
    renewalBanner: (date) => `Ihre Abonnementperiode endet am ${date}. Schreiben Sie uns, um sie ohne Unterbruch zu erneuern.`,
    newReply: "Neue Antwort",
    dueBy: "Antwort erwartet bis",
    overdueNote: "Frist überschritten, wir arbeiten daran",
    open: "Öffnen",
  },
  detail: {
    metaTitle: "Anfrage | Thrax Legal",
    back: "Zurück zur Übersicht",
    submittedOn: "Gesendet am",
    dueBy: "Antwort erwartet bis",
    yourRequest: "Ihre Anfrage",
    attachments: "Beigefügte Dokumente",
    conversation: "Austausch",
    you: "Sie",
    team: "Thrax Legal",
    noMessages: "Noch keine Antwort. Wir melden uns innerhalb der Frist Ihrer Formel.",
    replyLabel: "Nachricht hinzufügen",
    replyPlaceholder: "Eine Präzisierung, ein fehlendes Dokument, eine Folgefrage …",
    replyAttach: "Dokumente anhängen (optional, 5 Dateien, je 10 MB)",
    replyCta: "Senden",
    closedNote: "Diese Anfrage ist erledigt. Wenn Sie unten antworten, wird sie wieder geöffnet.",
    waitingNote: "Wir warten auf Ihre Rückmeldung, um weiterzukommen.",
    notFound: "Anfrage nicht gefunden.",
    errorReply: "Schreiben Sie eine Nachricht oder hängen Sie ein Dokument an.",
    errorFile: "Eine Datei ist grösser als 10 MB.",
    sent: "Nachricht gesendet.",
    urgent: "Dringend",
  },
  newRequest: {
    metaTitle: "Neue Anfrage | Thrax Legal",
    back: "Zurück zur Übersicht",
    heading: "Beschreiben Sie Ihre Anfrage",
    subheading: "Je genauer Sie sind, desto schneller und passender die Antwort.",
    kindLabel: "Worum geht es?",
    kindQuestionTitle: "Kurzfrage",
    kindQuestionNote: "Eine präzise Frage, kurze schriftliche Antwort (etwa 15 Minuten Arbeit). Nachfragen innerhalb von 14 Tagen werden nicht gezählt.",
    kindDossierTitle: "Anliegen",
    kindDossierNote: "Eine Arbeit mit schriftlichem Ergebnis: Vertrag, Schreiben, Mahnung, Analyse einer Situation.",
    categoryLabel: "Thema",
    urgencyLabel: "Dringlichkeit",
    urgencyNormal: "Normal",
    urgencyUrgent: "Dringend (Formel Croissance, bearbeitet innert 24 Arbeitsstunden)",
    descriptionLabel: "Beschreiben Sie Ihre Situation",
    descriptionPlaceholder:
      "Erklären Sie, was passiert, was Sie bereits unternommen haben, was Sie von uns erwarten. Kontext, Daten, Beträge, beteiligte Personen …",
    attachmentsLabel: "Dokumente (optional)",
    attachmentsNote: "Verträge, Schreiben, E-Mail-Verläufe. Höchstens 5 Dateien, je 10 MB.",
    cta: "Senden",
    error: "Wählen Sie ein Thema und beschreiben Sie Ihre Situation (mind. 10 Zeichen).",
    errorFile: "Eine Datei ist grösser als 10 MB.",
    quotaDossier: (left) =>
      left > 0 ? `Sie haben diesen Monat noch ${left} inbegriffene${left > 1 ? " Anliegen" : "s Anliegen"}.` : "Kontingent erreicht: CHF 79 für dieses zusätzliche Anliegen, Fixpreis.",
    quotaQuestion: (left) =>
      left > 0 ? `Sie haben diesen Monat noch ${left} inbegriffene Kurzfrage${left > 1 ? "n" : ""}.` : "Fragenkontingent erreicht: Bearbeitung im nächsten Monat oder als Anliegen gezählt.",
  },
  settings: {
    metaTitle: "Mein Konto | Thrax Legal",
    back: "Zurück zur Übersicht",
    heading: "Mein Konto",
    profileHeading: "Meine Angaben",
    nameLabel: "Vor- und Nachname",
    companyLabel: "Unternehmen",
    phoneLabel: "Telefon",
    emailLabel: "E-Mail-Adresse (hier nicht änderbar)",
    saveProfile: "Speichern",
    profileSaved: "Angaben gespeichert.",
    passwordHeading: "Passwort ändern",
    currentPassword: "Aktuelles Passwort",
    newPassword: "Neues Passwort",
    confirmPassword: "Neues Passwort bestätigen",
    savePassword: "Passwort ändern",
    passwordSaved: "Passwort geändert. Ihre anderen Geräte wurden abgemeldet.",
    wrongPassword: "Das aktuelle Passwort ist falsch.",
    mismatch: "Die beiden Passwörter stimmen nicht überein.",
    subscriptionHeading: "Mein Abonnement",
    planLabel: "Formel",
    statusLabel: "Status",
    validUntilLabel: "Gültig bis",
    statusValues: {
      ok: "Aktiv",
      pending: "Wartet auf Aktivierung",
      expired: "Periode abgelaufen",
      paused: "Pausiert",
      cancelled: "Gekündigt",
    },
    paymentsHeading: "Erhaltene Zahlungen",
    noPayments: "Noch keine Zahlung erfasst.",
    period: "Periode",
    changePlanNote: "Um die Formel zu wechseln, zu pausieren oder zu kündigen, schreiben Sie uns: Wir kümmern uns darum.",
    errorProfile: "Geben Sie mindestens Ihren Namen an.",
  },
};

const en: AccountStrings = {
  login: {
    metaTitle: "Sign in | Thrax Legal",
    heading: "Sign in to your account",
    subheading: "Enter your email address and password.",
    emailLabel: "Email address",
    emailPlaceholder: "you@company.ch",
    passwordLabel: "Password",
    cta: "Sign in",
    forgot: "Forgot your password?",
    noAccount: "Not a customer yet?",
    createAccount: "Sign up",
    notices: {
      reset: "Password saved. You can now sign in.",
      signout: "You are signed out.",
    },
    errors: {
      email: "Invalid email address.",
      invalid: "Incorrect email or password.",
      locked: "Too many attempts. Try again in 15 minutes.",
      exists: "An account already exists for this address. Sign in or reset your password.",
      pending: "Your account is awaiting activation: it opens as soon as your payment is received. We'll write to you once it's done.",
      expired: "Your subscription period has ended. Access returns once payment for the next period is received.",
      paused: "Your subscription is paused. Write to us to resume it.",
      cancelled: "This subscription has been cancelled. Write to us if you'd like to reactivate it.",
    },
  },
  signup: {
    metaTitle: "Create your account | Thrax Legal",
    heading: "Sign me up",
    subheading: "Leave your details and accept the terms online. No payment now: we will contact you to finalise and open your account.",
    emailLabel: "Email address",
    nameLabel: "Full name",
    namePlaceholder: "Jane Smith",
    companyLabel: "Company (optional)",
    companyPlaceholder: "Your company name",
    phoneLabel: "Phone (recommended, so we can call you)",
    phonePlaceholder: "+41 79 000 00 00",
    messageLabel: "Your need in a few words (optional)",
    messagePlaceholder: "E.g. distribution contract, dispute with a customer, T&Cs for my shop…",
    planLabel: "Your plan",
    planEssentiel: "Essential",
    planEssentielNote: "CHF 290/month · 10 quick questions · 5 matters/month",
    planCroissance: "Growth",
    planCroissanceNote: "CHF 690/month · 30 quick questions · 12 matters/month",
    termsBefore: "I have read and accept the ",
    termsCgv: "terms and conditions",
    termsMiddle: " and the ",
    termsPrivacy: "privacy policy",
    termsAfter: ", and I confirm that I am subscribing for professional purposes.",
    aiLabel: "I agree that my information and documents may be processed by an artificial intelligence tool (Claude, published by Anthropic, in the United States) to prepare Thrax Legal’s answers, which Thrax Legal reviews and remains responsible for.",
    aiHelp: "This processing is necessary for the service. Thrax Legal turns off the use of this data for model training. Avoid sending unnecessary sensitive data. Details in the privacy policy.",
    activationNote: "No payment at this stage. We will contact you as soon as possible (in principle within 1 business day) to finalise your subscription. Your account opens when the first payment is received: you then choose your password.",
    cta: "Send my subscription request",
    haveAccount: "Already have an account?",
    signIn: "Sign in",
    errors: {
      email: "Check your email address.",
      name: "Enter your full name.",
      terms: "You must accept the terms and conditions to continue.",
      ai: "Processing by artificial intelligence is necessary for the service: please tick the corresponding box to continue.",
      throttled: "Too many sign-ups from this connection. Try again in an hour or ask to be called back.",
    },
  },
  forgot: {
    metaTitle: "Forgot password | Thrax Legal",
    heading: "Forgot your password",
    subheading: "Enter your email address: we'll send you a link to choose a new password.",
    cta: "Send the link",
    back: "Back to sign in",
    errorEmail: "Invalid email address.",
    errorThrottled: "Too many requests. Try again in an hour.",
  },
  reset: {
    metaTitle: "Choose a password | Thrax Legal",
    heading: "Choose your password",
    subheading: "At least 8 characters. Avoid passwords you already use elsewhere.",
    passwordLabel: "New password",
    confirmLabel: "Confirm password",
    cta: "Save",
    invalidHeading: "Invalid or expired link",
    invalidBody: "This link is no longer valid (one hour, single use). Request a new one.",
    requestNew: "Get a new link",
    mismatch: "The two passwords don't match.",
  },
  check: {
    signup: {
      metaTitle: "Request received | Thrax Legal",
      heading: "Thank you, your request is recorded",
      body: "We have received your subscription request for",
      note: "You have accepted the terms and conditions online: a confirmation is sent to you by email. We will contact you as soon as possible to finalise. When your account is activated, you receive a link to choose your password.",
    },
    reset: {
      metaTitle: "Check your email | Thrax Legal",
      heading: "Check your email",
      body: "If an account exists for",
      note: "a link to choose a password has just been sent. It is valid for one hour. Check your spam folder if you don't see it.",
    },
    back: "Back to sign in",
  },
  blocked: {
    states: {
      pending: {
        heading: "Account awaiting activation",
        body: "Your account opens as soon as your first payment is received. We'll write to you once it's done.",
      },
      expired: {
        heading: "Subscription period ended",
        body: "Access returns once payment for the next period is received. Your matters and messages are kept.",
      },
      paused: {
        heading: "Subscription paused",
        body: "Your subscription is paused. Write to us to resume it: your matters are kept.",
      },
      cancelled: {
        heading: "Subscription cancelled",
        body: "This subscription has been cancelled. Write to us if you'd like to reactivate it.",
      },
    },
    contact: "Write to us",
    logout: "Sign out",
  },
  passwordProblems: {
    short: "The password must be at least 8 characters.",
    long: "The password is too long.",
    same_as_email: "The password must not be your email address.",
    common: "This password is too common. Choose another one.",
  },
  kinds: { question: "Quick question", dossier: "Matter" },
  dash: {
    metaTitle: "Dashboard | Thrax Legal",
    greeting: "Hello",
    plan: "Plan",
    validUntil: "Subscription valid until",
    settings: "My account",
    logout: "Log out",
    dossiersQuota: "Matters this month",
    questionsQuota: "Quick questions this month",
    used: (used, total) => `${used} / ${total} used`,
    overDossiers: "Plan exceeded: each extra matter is billed at CHF 79, fixed price.",
    overQuestions: "Question allowance reached: further questions are handled next month, or counted as a matter if you prefer.",
    newRequest: "New request",
    requestsHeading: "Your requests",
    empty: "You haven't sent any request yet.",
    emptyCta: "Send my first request",
    successBanner: "Your request has been submitted. You'll get a response within your plan's timeframe.",
    renewalBanner: (date) => `Your subscription period ends on ${date}. Write to us to renew without interruption.`,
    newReply: "New reply",
    dueBy: "Response expected by",
    overdueNote: "Past the deadline, we're on it",
    open: "Open",
  },
  detail: {
    metaTitle: "Request | Thrax Legal",
    back: "Back to dashboard",
    submittedOn: "Sent on",
    dueBy: "Response expected by",
    yourRequest: "Your request",
    attachments: "Attached documents",
    conversation: "Conversation",
    you: "You",
    team: "Thrax Legal",
    noMessages: "No reply yet. We'll get back to you within your plan's timeframe.",
    replyLabel: "Add a message",
    replyPlaceholder: "A clarification, a missing document, a follow-up question…",
    replyAttach: "Attach documents (optional, 5 files, 10 MB each)",
    replyCta: "Send",
    closedNote: "This request is completed. If you reply below, it will be reopened.",
    waitingNote: "We're waiting for your reply to move forward.",
    notFound: "Request not found.",
    errorReply: "Write a message or attach a document.",
    errorFile: "A file exceeds 10 MB.",
    sent: "Message sent.",
    urgent: "Urgent",
  },
  newRequest: {
    metaTitle: "New request | Thrax Legal",
    back: "Back to dashboard",
    heading: "Describe your request",
    subheading: "The more precise you are, the faster and more relevant the response.",
    kindLabel: "What is it about?",
    kindQuestionTitle: "Quick question",
    kindQuestionNote: "A specific question, brief written answer (about 15 minutes of work). Follow-ups within 14 days aren't counted.",
    kindDossierTitle: "Matter",
    kindDossierNote: "Work with a written deliverable: a contract, a letter, a formal notice, an analysis of a situation.",
    categoryLabel: "Topic",
    urgencyLabel: "Urgency",
    urgencyNormal: "Normal",
    urgencyUrgent: "Urgent (Growth plan, handled within 24 business hours)",
    descriptionLabel: "Describe your situation",
    descriptionPlaceholder:
      "Explain what's going on, what you've already done, what you expect from us. Context, dates, amounts, people involved…",
    attachmentsLabel: "Documents (optional)",
    attachmentsNote: "Contracts, letters, email threads. Up to 5 files, 10 MB each.",
    cta: "Send",
    error: "Choose a topic and describe your situation (10 characters minimum).",
    errorFile: "A file exceeds 10 MB.",
    quotaDossier: (left) =>
      left > 0 ? `You have ${left} included matter${left > 1 ? "s" : ""} left this month.` : "Allowance reached: CHF 79 for this extra matter, fixed price.",
    quotaQuestion: (left) =>
      left > 0 ? `You have ${left} included quick question${left > 1 ? "s" : ""} left this month.` : "Question allowance reached: handled next month, or counted as a matter.",
  },
  settings: {
    metaTitle: "My account | Thrax Legal",
    back: "Back to dashboard",
    heading: "My account",
    profileHeading: "My details",
    nameLabel: "Full name",
    companyLabel: "Company",
    phoneLabel: "Phone",
    emailLabel: "Email address (can't be changed here)",
    saveProfile: "Save",
    profileSaved: "Details saved.",
    passwordHeading: "Change my password",
    currentPassword: "Current password",
    newPassword: "New password",
    confirmPassword: "Confirm new password",
    savePassword: "Change password",
    passwordSaved: "Password changed. Your other devices have been signed out.",
    wrongPassword: "The current password is incorrect.",
    mismatch: "The two passwords don't match.",
    subscriptionHeading: "My subscription",
    planLabel: "Plan",
    statusLabel: "Status",
    validUntilLabel: "Valid until",
    statusValues: {
      ok: "Active",
      pending: "Awaiting activation",
      expired: "Period ended",
      paused: "Paused",
      cancelled: "Cancelled",
    },
    paymentsHeading: "Payments received",
    noPayments: "No payment recorded yet.",
    period: "Period",
    changePlanNote: "To change plan, pause or cancel, write to us: we'll take care of it.",
    errorProfile: "Enter at least your name.",
  },
};

const it: AccountStrings = {
  login: {
    metaTitle: "Accesso | Thrax Legal",
    heading: "Accesso al vostro spazio",
    subheading: "Inserite il vostro indirizzo email e la vostra password.",
    emailLabel: "Indirizzo email",
    emailPlaceholder: "voi@azienda.ch",
    passwordLabel: "Password",
    cta: "Accedi",
    forgot: "Password dimenticata?",
    noAccount: "Non siete ancora clienti?",
    createAccount: "Iscrivetevi",
    notices: {
      reset: "Password salvata. Ora potete accedere.",
      signout: "Siete disconnessi.",
    },
    errors: {
      email: "Indirizzo email non valido.",
      invalid: "Email o password errata.",
      locked: "Troppi tentativi. Riprovate tra 15 minuti.",
      exists: "Esiste già un account con questo indirizzo. Accedete o reimpostate la password.",
      pending: "Il vostro account è in attesa di attivazione: si apre alla ricezione del pagamento. Vi scriviamo appena fatto.",
      expired: "Il vostro periodo di abbonamento è terminato. L'accesso torna alla ricezione del pagamento del periodo successivo.",
      paused: "Il vostro abbonamento è in pausa. Scriveteci per riprenderlo.",
      cancelled: "Questo abbonamento è stato disdetto. Scriveteci se desiderate riattivarlo.",
    },
  },
  signup: {
    metaTitle: "Crea il tuo account | Thrax Legal",
    heading: "Mi iscrivo",
    subheading: "Lasciate i vostri dati e accettate le condizioni online. Nessun pagamento ora: vi contattiamo per finalizzare e aprire il vostro spazio.",
    emailLabel: "Indirizzo email",
    nameLabel: "Nome e cognome",
    namePlaceholder: "Mario Rossi",
    companyLabel: "Azienda (opzionale)",
    companyPlaceholder: "Nome della vostra azienda",
    phoneLabel: "Telefono (consigliato, per richiamarvi)",
    phonePlaceholder: "+41 79 000 00 00",
    messageLabel: "La vostra esigenza in poche parole (facoltativo)",
    messagePlaceholder: "Es.: contratto di distribuzione, controversia con un cliente, condizioni generali per il mio negozio…",
    planLabel: "La vostra formula",
    planEssentiel: "Essentiel",
    planEssentielNote: "CHF 290/mese · 10 domande rapide · 5 pratiche/mese",
    planCroissance: "Croissance",
    planCroissanceNote: "CHF 690/mese · 30 domande rapide · 12 pratiche/mese",
    termsBefore: "Ho letto e accetto le ",
    termsCgv: "condizioni generali",
    termsMiddle: " e l'",
    termsPrivacy: "informativa sulla privacy",
    termsAfter: ", e confermo di sottoscrivere per fini professionali.",
    aiLabel: "Accetto che le mie informazioni e i miei documenti siano trattati da uno strumento di intelligenza artificiale (Claude, di Anthropic, negli Stati Uniti) per preparare le risposte di Thrax Legal, che le rivede e ne resta responsabile.",
    aiHelp: "Questo trattamento è necessario al servizio. Thrax Legal disattiva l’uso di questi dati per l’addestramento dei modelli. Evitate di inviare dati sensibili non necessari. Dettagli nell’informativa sulla privacy.",
    activationNote: "Nessun pagamento in questa fase. Vi contattiamo il prima possibile (in linea di principio entro 1 giorno lavorativo) per finalizzare il vostro abbonamento. Il vostro spazio si apre alla ricezione del primo pagamento: sceglierete allora la password.",
    cta: "Invia la richiesta di abbonamento",
    haveAccount: "Avete già un account?",
    signIn: "Accedi",
    errors: {
      email: "Controllate il vostro indirizzo email.",
      name: "Indicate nome e cognome.",
      terms: "Dovete accettare le condizioni generali per continuare.",
      ai: "Il trattamento tramite intelligenza artificiale è necessario al servizio: spuntate la casella corrispondente per continuare.",
      throttled: "Troppe iscrizioni da questa connessione. Riprovate tra un’ora o chiedete di essere richiamati.",
    },
  },
  forgot: {
    metaTitle: "Password dimenticata | Thrax Legal",
    heading: "Password dimenticata",
    subheading: "Inserite il vostro indirizzo email: vi inviamo un link per scegliere una nuova password.",
    cta: "Invia il link",
    back: "Torna all'accesso",
    errorEmail: "Indirizzo email non valido.",
    errorThrottled: "Troppe richieste. Riprovate tra un'ora.",
  },
  reset: {
    metaTitle: "Scegliere una password | Thrax Legal",
    heading: "Scegliete la vostra password",
    subheading: "Almeno 8 caratteri. Evitate password già usate altrove.",
    passwordLabel: "Nuova password",
    confirmLabel: "Confermate la password",
    cta: "Salva",
    invalidHeading: "Link non valido o scaduto",
    invalidBody: "Questo link non è più valido (un'ora, uso unico). Richiedetene uno nuovo.",
    requestNew: "Ricevi un nuovo link",
    mismatch: "Le due password non corrispondono.",
  },
  check: {
    signup: {
      metaTitle: "Richiesta ricevuta | Thrax Legal",
      heading: "Grazie, la vostra richiesta è registrata",
      body: "Abbiamo ricevuto la vostra richiesta di abbonamento per",
      note: "Avete accettato le condizioni generali online: una conferma vi viene inviata via email. Vi contattiamo il prima possibile per finalizzare. All’attivazione del vostro spazio ricevete un link per scegliere la password.",
    },
    reset: {
      metaTitle: "Controllate la vostra email | Thrax Legal",
      heading: "Controllate la vostra email",
      body: "Se esiste un account per",
      note: "è stato appena inviato un link per scegliere una password. È valido un'ora. Controllate anche la cartella spam.",
    },
    back: "Torna all'accesso",
  },
  blocked: {
    states: {
      pending: {
        heading: "Account in attesa di attivazione",
        body: "Il vostro spazio si apre alla ricezione del primo pagamento. Vi scriviamo appena fatto.",
      },
      expired: {
        heading: "Periodo di abbonamento terminato",
        body: "L'accesso torna alla ricezione del pagamento del periodo successivo. Le vostre pratiche e i messaggi sono conservati.",
      },
      paused: {
        heading: "Abbonamento in pausa",
        body: "Il vostro abbonamento è in pausa. Scriveteci per riprenderlo: le vostre pratiche sono conservate.",
      },
      cancelled: {
        heading: "Abbonamento disdetto",
        body: "Questo abbonamento è stato disdetto. Scriveteci se desiderate riattivarlo.",
      },
    },
    contact: "Scriveteci",
    logout: "Disconnetti",
  },
  passwordProblems: {
    short: "La password deve contenere almeno 8 caratteri.",
    long: "La password è troppo lunga.",
    same_as_email: "La password non deve essere il vostro indirizzo email.",
    common: "Questa password è troppo comune. Sceglietene un'altra.",
  },
  kinds: { question: "Domanda rapida", dossier: "Pratica" },
  dash: {
    metaTitle: "Bacheca | Thrax Legal",
    greeting: "Ciao",
    plan: "Formula",
    validUntil: "Abbonamento valido fino al",
    settings: "Il mio account",
    logout: "Disconnetti",
    dossiersQuota: "Pratiche questo mese",
    questionsQuota: "Domande rapide questo mese",
    used: (used, total) => `${used} / ${total} utilizzate`,
    overDossiers: "Pacchetto superato: ogni pratica supplementare è fatturata CHF 79, prezzo fisso.",
    overQuestions:
      "Pacchetto di domande raggiunto: le domande successive sono trattate il mese prossimo, o contate come pratica se preferite.",
    newRequest: "Nuova richiesta",
    requestsHeading: "Le vostre richieste",
    empty: "Non avete ancora inviato nessuna richiesta.",
    emptyCta: "Inviate la vostra prima richiesta",
    successBanner: "La vostra richiesta è stata inviata. Riceverete una risposta entro il termine della vostra formula.",
    renewalBanner: (date) => `Il vostro periodo di abbonamento termina il ${date}. Scriveteci per rinnovarlo senza interruzioni.`,
    newReply: "Nuova risposta",
    dueBy: "Risposta attesa entro il",
    overdueNote: "Termine superato, ci stiamo lavorando",
    open: "Apri",
  },
  detail: {
    metaTitle: "Richiesta | Thrax Legal",
    back: "Torna alla bacheca",
    submittedOn: "Inviata il",
    dueBy: "Risposta attesa entro il",
    yourRequest: "La vostra richiesta",
    attachments: "Documenti allegati",
    conversation: "Scambi",
    you: "Voi",
    team: "Thrax Legal",
    noMessages: "Nessuna risposta per ora. Torniamo da voi entro il termine della vostra formula.",
    replyLabel: "Aggiungi un messaggio",
    replyPlaceholder: "Una precisazione, un documento mancante, una domanda di seguito…",
    replyAttach: "Allegare documenti (opzionale, 5 file, 10 MB ciascuno)",
    replyCta: "Invia",
    closedNote: "Questa richiesta è trattata. Se rispondete qui sotto, viene riaperta.",
    waitingNote: "Attendiamo il vostro riscontro per procedere.",
    notFound: "Richiesta non trovata.",
    errorReply: "Scrivete un messaggio o allegate un documento.",
    errorFile: "Un file supera i 10 MB.",
    sent: "Messaggio inviato.",
    urgent: "Urgente",
  },
  newRequest: {
    metaTitle: "Nuova richiesta | Thrax Legal",
    back: "Torna alla bacheca",
    heading: "Descrivete la vostra richiesta",
    subheading: "Più siete precisi, più rapida e pertinente sarà la risposta.",
    kindLabel: "Di cosa si tratta?",
    kindQuestionTitle: "Domanda rapida",
    kindQuestionNote: "Una domanda precisa, risposta scritta breve (circa 15 minuti di lavoro). I seguiti entro 14 giorni non sono conteggiati.",
    kindDossierTitle: "Pratica",
    kindDossierNote: "Un lavoro con un documento scritto finale: contratto, lettera, diffida, analisi di una situazione.",
    categoryLabel: "Tema",
    urgencyLabel: "Urgenza",
    urgencyNormal: "Normale",
    urgencyUrgent: "Urgente (formula Croissance, trattata entro 24 ore lavorative)",
    descriptionLabel: "Descrivete la vostra situazione",
    descriptionPlaceholder:
      "Spiegate cosa sta succedendo, cosa avete già fatto, cosa vi aspettate da noi. Contesto, date, importi, persone coinvolte…",
    attachmentsLabel: "Documenti (opzionale)",
    attachmentsNote: "Contratti, lettere, scambi di email. Massimo 5 file, 10 MB ciascuno.",
    cta: "Invia",
    error: "Scegliete un tema e descrivete la vostra situazione (minimo 10 caratteri).",
    errorFile: "Un file supera i 10 MB.",
    quotaDossier: (left) =>
      left > 0 ? `Vi ${left > 1 ? "restano" : "resta"} ${left} pratic${left > 1 ? "he incluse" : "a inclusa"} questo mese.` : "Pacchetto raggiunto: CHF 79 per questa pratica supplementare, prezzo fisso.",
    quotaQuestion: (left) =>
      left > 0 ? `Vi ${left > 1 ? "restano" : "resta"} ${left} domand${left > 1 ? "e rapide incluse" : "a rapida inclusa"} questo mese.` : "Pacchetto di domande raggiunto: trattata il mese prossimo, o contata come pratica.",
  },
  settings: {
    metaTitle: "Il mio account | Thrax Legal",
    back: "Torna alla bacheca",
    heading: "Il mio account",
    profileHeading: "I miei dati",
    nameLabel: "Nome e cognome",
    companyLabel: "Azienda",
    phoneLabel: "Telefono",
    emailLabel: "Indirizzo email (non modificabile qui)",
    saveProfile: "Salva",
    profileSaved: "Dati salvati.",
    passwordHeading: "Cambiare la password",
    currentPassword: "Password attuale",
    newPassword: "Nuova password",
    confirmPassword: "Confermate la nuova password",
    savePassword: "Cambia password",
    passwordSaved: "Password modificata. Gli altri dispositivi sono stati disconnessi.",
    wrongPassword: "La password attuale non è corretta.",
    mismatch: "Le due password non corrispondono.",
    subscriptionHeading: "Il mio abbonamento",
    planLabel: "Formula",
    statusLabel: "Stato",
    validUntilLabel: "Valido fino al",
    statusValues: {
      ok: "Attivo",
      pending: "In attesa di attivazione",
      expired: "Periodo terminato",
      paused: "In pausa",
      cancelled: "Disdetto",
    },
    paymentsHeading: "Pagamenti ricevuti",
    noPayments: "Nessun pagamento registrato per ora.",
    period: "Periodo",
    changePlanNote: "Per cambiare formula, mettere in pausa o disdire, scriveteci: ce ne occupiamo noi.",
    errorProfile: "Indicate almeno il vostro nome.",
  },
};

export const ACCOUNT_STRINGS: Record<Locale, AccountStrings> = { fr, de, en, it };

export const PLAN_LABEL: Record<Locale, Record<"essentiel" | "croissance", string>> = {
  fr: { essentiel: "Essentiel", croissance: "Croissance" },
  de: { essentiel: "Essentiel", croissance: "Croissance" },
  en: { essentiel: "Essential", croissance: "Growth" },
  it: { essentiel: "Essentiel", croissance: "Croissance" },
};
