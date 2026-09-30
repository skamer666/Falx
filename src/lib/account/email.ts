import type { Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";
import { escapeHtml, formatDate } from "./format";
import { PLAN_LABEL } from "./strings";
import type { Lead, Plan } from "./model";
import { adminEmails, readEnv } from "./db";

const FROM = "Thrax Legal <hey@thrax-legal.ch>";
import { CONTACT_EMAIL } from "./contact";
export { CONTACT_EMAIL };

function wrapEmailHtml(input: {
  heading: string;
  /** Déjà échappé / HTML de confiance. */
  bodyHtml: string;
  ctaLabel?: string;
  ctaUrl?: string;
  footer: string;
}) {
  const cta = input.ctaLabel && input.ctaUrl
    ? `<tr><td style="padding:24px 32px;">
            <a href="${input.ctaUrl}" style="display:inline-block;background:#101010;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:999px;font-size:14px;font-weight:500;">${escapeHtml(input.ctaLabel)}</a>
          </td></tr>`
    : `<tr><td style="padding:8px 32px;"></td></tr>`;
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f3ee;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
      <tr><td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="max-width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #eceae2;">
          <tr><td style="padding:32px 32px 8px;">
            <p style="margin:0;font-size:15px;font-weight:600;letter-spacing:-0.01em;color:#101010;">Thrax Legal</p>
          </td></tr>
          <tr><td style="padding:16px 32px 0;">
            <h1 style="margin:0;font-size:22px;line-height:1.3;color:#101010;">${escapeHtml(input.heading)}</h1>
            <div style="margin:12px 0 0;font-size:14px;line-height:1.6;color:#5c5c5c;">${input.bodyHtml}</div>
          </td></tr>
          ${cta}
          <tr><td style="padding:0 32px 32px;">
            <p style="margin:0;font-size:12px;line-height:1.6;color:#8a8a8a;">${escapeHtml(input.footer)}</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

async function sendEmail(to: string | string[], subject: string, html: string, replyTo?: string) {
  const apiKey = await readEnv("RESEND_API_KEY");
  if (!apiKey) {
    // Pas de clé Resend (dev local, ou pas encore configurée) : on journalise au lieu d'échouer.
    console.log(`[email:dev-fallback] to=${to} subject=${subject}\n${html}`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to, subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend error ${res.status}: ${text}`);
  }
}

/** Envoi « au mieux » : une panne d'email ne doit jamais bloquer l'action qui l'a déclenchée. */
export async function safeSend(task: () => Promise<unknown>): Promise<void> {
  try {
    await task();
  } catch (error) {
    console.error("[email] envoi échoué", error);
  }
}

// ---------------------------------------------------------------------------
// Emails client (4 langues)
// ---------------------------------------------------------------------------

const PASSWORD_LINK: Record<Locale, { subject: string; heading: string; body: string; cta: string; footer: string }> = {
  fr: {
    subject: "Choisissez votre mot de passe Thrax Legal",
    heading: "Choisissez votre mot de passe",
    body: "Cliquez sur le bouton ci-dessous pour définir un mot de passe. Le lien est valable une heure et ne peut être utilisé qu'une seule fois.",
    cta: "Choisir mon mot de passe",
    footer: "Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email : votre mot de passe actuel reste inchangé.",
  },
  de: {
    subject: "Wählen Sie Ihr Thrax-Legal-Passwort",
    heading: "Wählen Sie Ihr Passwort",
    body: "Klicken Sie auf die Schaltfläche unten, um ein Passwort festzulegen. Der Link ist eine Stunde gültig und kann nur einmal verwendet werden.",
    cta: "Passwort wählen",
    footer: "Wenn Sie diese Anfrage nicht gestellt haben, ignorieren Sie diese E-Mail einfach: Ihr aktuelles Passwort bleibt unverändert.",
  },
  en: {
    subject: "Choose your Thrax Legal password",
    heading: "Choose your password",
    body: "Click the button below to set a password. The link is valid for one hour and can only be used once.",
    cta: "Choose my password",
    footer: "If you didn't request this, simply ignore this email: your current password is unchanged.",
  },
  it: {
    subject: "Scegliete la vostra password Thrax Legal",
    heading: "Scegliete la vostra password",
    body: "Cliccate sul pulsante qui sotto per impostare una password. Il link è valido un'ora e può essere usato una sola volta.",
    cta: "Scegli la password",
    footer: "Se non siete voi ad aver fatto questa richiesta, ignorate questa email: la vostra password attuale resta invariata.",
  },
};

export async function sendPasswordLinkEmail(email: string, token: string, locale: Locale) {
  const t = PASSWORD_LINK[locale];
  const url = `${SITE_URL}/${locale}/compte/mot-de-passe?token=${token}`;
  const html = wrapEmailHtml({ heading: t.heading, bodyHtml: escapeHtml(t.body), ctaLabel: t.cta, ctaUrl: url, footer: t.footer });
  await sendEmail(email, t.subject, html);
  return url;
}

const SIGNUP_RECEIVED: Record<Locale, { subject: string; heading: string; body: (name: string, plan: string, version: string) => string; cta: string; footer: string }> = {
  fr: {
    subject: "Votre demande d’abonnement Thrax Legal est enregistrée",
    heading: "Merci, votre demande est enregistrée",
    body: (name, plan, version) =>
      `Bonjour ${name},<br/><br/>Nous avons bien reçu votre demande d’abonnement Thrax Legal (formule ${plan}). Vous avez accepté en ligne les conditions générales (version du ${version}) et le traitement de vos informations par l’intelligence artificielle décrit dans ces conditions : conservez cet email comme confirmation.<br/><br/>Aucun paiement n’est demandé à ce stade. Nous vous contactons dans les meilleurs délais pour finaliser votre abonnement. Votre espace s’ouvre à réception du premier paiement, et vous recevez alors un lien pour choisir votre mot de passe.`,
    cta: "Relire les conditions générales",
    footer: "Une question ? Répondez simplement à cet email.",
  },
  de: {
    subject: "Ihre Abonnementsanfrage bei Thrax Legal ist erfasst",
    heading: "Danke, Ihre Anfrage ist erfasst",
    body: (name, plan, version) =>
      `Guten Tag ${name}<br/><br/>Wir haben Ihre Abonnementsanfrage bei Thrax Legal (Formel ${plan}) erhalten. Sie haben die Allgemeinen Geschäftsbedingungen (Fassung vom ${version}) und die darin beschriebene Verarbeitung Ihrer Angaben durch künstliche Intelligenz online akzeptiert: Bewahren Sie diese E-Mail als Bestätigung auf.<br/><br/>Zum jetzigen Zeitpunkt ist keine Zahlung nötig. Wir melden uns so rasch wie möglich, um Ihr Abonnement abzuschliessen. Ihr Bereich wird mit Eingang der ersten Zahlung freigeschaltet; dann erhalten Sie einen Link zur Wahl Ihres Passworts.`,
    cta: "Allgemeine Geschäftsbedingungen lesen",
    footer: "Eine Frage? Antworten Sie einfach auf diese E-Mail.",
  },
  en: {
    subject: "Your Thrax Legal subscription request is recorded",
    heading: "Thank you, your request is recorded",
    body: (name, plan, version) =>
      `Hello ${name},<br/><br/>We have received your Thrax Legal subscription request (${plan} plan). You accepted the terms and conditions online (version of ${version}) and the processing of your information by artificial intelligence described in them: keep this email as confirmation.<br/><br/>No payment is requested at this stage. We will contact you as soon as possible to finalise your subscription. Your account opens when the first payment is received, and you then receive a link to choose your password.`,
    cta: "Read the terms and conditions",
    footer: "A question? Just reply to this email.",
  },
  it: {
    subject: "La vostra richiesta di abbonamento a Thrax Legal è registrata",
    heading: "Grazie, la vostra richiesta è registrata",
    body: (name, plan, version) =>
      `Buongiorno ${name},<br/><br/>Abbiamo ricevuto la vostra richiesta di abbonamento a Thrax Legal (formula ${plan}). Avete accettato online le condizioni generali (versione del ${version}) e il trattamento delle vostre informazioni tramite intelligenza artificiale ivi descritto: conservate questa email come conferma.<br/><br/>Nessun pagamento è richiesto in questa fase. Vi contattiamo il prima possibile per finalizzare il vostro abbonamento. Il vostro spazio si apre alla ricezione del primo pagamento e riceverete allora un link per scegliere la password.`,
    cta: "Rileggere le condizioni generali",
    footer: "Una domanda? Rispondete semplicemente a questa email.",
  },
};

export async function sendSignupReceivedEmail(email: string, name: string, plan: Plan, locale: Locale, termsVersion: string) {
  const t = SIGNUP_RECEIVED[locale];
  const html = wrapEmailHtml({
    heading: t.heading,
    bodyHtml: t.body(escapeHtml(name), PLAN_LABEL[locale][plan], formatDate(Date.parse(termsVersion), locale)),
    ctaLabel: t.cta,
    ctaUrl: `${SITE_URL}/${locale}/conditions-generales`,
    footer: t.footer,
  });
  await sendEmail(email, t.subject, html, CONTACT_EMAIL);
}

const ACTIVE: Record<Locale, { subject: string; heading: string; body: (name: string, plan: string, until: string) => string; cta: string; footer: string }> = {
  fr: {
    subject: "Votre espace Thrax Legal est actif",
    heading: "Votre espace est actif",
    body: (name, plan, until) =>
      `Bonjour ${name},<br/><br/>Nous avons bien reçu votre paiement. Votre abonnement <strong>${plan}</strong> est actif jusqu'au <strong>${until}</strong>. Connectez-vous avec votre email et votre mot de passe pour envoyer votre première demande.`,
    cta: "Accéder à mon espace",
    footer: "Merci de votre confiance.",
  },
  de: {
    subject: "Ihr Thrax-Legal-Bereich ist aktiv",
    heading: "Ihr Bereich ist aktiv",
    body: (name, plan, until) =>
      `Guten Tag ${name}<br/><br/>Wir haben Ihre Zahlung erhalten. Ihr Abonnement <strong>${plan}</strong> ist bis zum <strong>${until}</strong> aktiv. Melden Sie sich mit E-Mail und Passwort an, um Ihre erste Anfrage zu senden.`,
    cta: "Zu meinem Bereich",
    footer: "Danke für Ihr Vertrauen.",
  },
  en: {
    subject: "Your Thrax Legal account is active",
    heading: "Your account is active",
    body: (name, plan, until) =>
      `Hello ${name},<br/><br/>We've received your payment. Your <strong>${plan}</strong> subscription is active until <strong>${until}</strong>. Sign in with your email and password to send your first request.`,
    cta: "Go to my account",
    footer: "Thank you for your trust.",
  },
  it: {
    subject: "Il vostro spazio Thrax Legal è attivo",
    heading: "Il vostro spazio è attivo",
    body: (name, plan, until) =>
      `Buongiorno ${name},<br/><br/>Abbiamo ricevuto il vostro pagamento. Il vostro abbonamento <strong>${plan}</strong> è attivo fino al <strong>${until}</strong>. Accedete con email e password per inviare la vostra prima richiesta.`,
    cta: "Vai al mio spazio",
    footer: "Grazie per la fiducia.",
  },
};

const SET_PASSWORD_CTA: Record<Locale, { cta: string; note: string }> = {
  fr: { cta: "Choisir mon mot de passe", note: "Le lien pour choisir votre mot de passe est valable 7 jours." },
  de: { cta: "Mein Passwort wählen", note: "Der Link zur Wahl Ihres Passworts ist 7 Tage gültig." },
  en: { cta: "Choose my password", note: "The link to choose your password is valid for 7 days." },
  it: { cta: "Scegliere la password", note: "Il link per scegliere la password è valido 7 giorni." },
};

export async function sendAccountActiveEmail(
  email: string,
  name: string,
  plan: Plan,
  paidUntil: number,
  locale: Locale,
  passwordToken?: string,
) {
  const t = ACTIVE[locale];
  const setPassword = passwordToken ? SET_PASSWORD_CTA[locale] : null;
  const html = wrapEmailHtml({
    heading: t.heading,
    bodyHtml:
      t.body(escapeHtml(name), PLAN_LABEL[locale][plan], formatDate(paidUntil, locale)) +
      (setPassword ? `<br/><br/>${escapeHtml(setPassword.note)}` : ""),
    ctaLabel: setPassword ? setPassword.cta : t.cta,
    ctaUrl: passwordToken ? `${SITE_URL}/${locale}/compte/mot-de-passe?token=${passwordToken}` : `${SITE_URL}/${locale}/compte`,
    footer: t.footer,
  });
  await sendEmail(email, t.subject, html, CONTACT_EMAIL);
}

const REPLY: Record<Locale, { subjectReply: string; subjectDone: string; headingReply: string; headingDone: string; bodyReply: string; bodyDone: string; cta: string; footer: string }> = {
  fr: {
    subjectReply: "Nouvelle réponse de Thrax Legal",
    subjectDone: "Votre demande est traitée",
    headingReply: "Vous avez une nouvelle réponse",
    headingDone: "Votre demande est traitée",
    bodyReply: "Nous avons répondu à votre demande. Connectez-vous pour lire le message et télécharger les documents éventuels.",
    bodyDone: "Votre demande est traitée. Vous retrouvez la réponse et les documents dans votre espace.",
    cta: "Ouvrir ma demande",
    footer: "Vous pouvez répondre directement depuis votre espace.",
  },
  de: {
    subjectReply: "Neue Antwort von Thrax Legal",
    subjectDone: "Ihre Anfrage ist erledigt",
    headingReply: "Sie haben eine neue Antwort",
    headingDone: "Ihre Anfrage ist erledigt",
    bodyReply: "Wir haben auf Ihre Anfrage geantwortet. Melden Sie sich an, um die Nachricht zu lesen und allfällige Dokumente herunterzuladen.",
    bodyDone: "Ihre Anfrage ist erledigt. Die Antwort und die Dokumente finden Sie in Ihrem Bereich.",
    cta: "Anfrage öffnen",
    footer: "Sie können direkt aus Ihrem Bereich antworten.",
  },
  en: {
    subjectReply: "New reply from Thrax Legal",
    subjectDone: "Your request is completed",
    headingReply: "You have a new reply",
    headingDone: "Your request is completed",
    bodyReply: "We've replied to your request. Sign in to read the message and download any documents.",
    bodyDone: "Your request is completed. You'll find the answer and documents in your account.",
    cta: "Open my request",
    footer: "You can reply directly from your account.",
  },
  it: {
    subjectReply: "Nuova risposta da Thrax Legal",
    subjectDone: "La vostra richiesta è trattata",
    headingReply: "Avete una nuova risposta",
    headingDone: "La vostra richiesta è trattata",
    bodyReply: "Abbiamo risposto alla vostra richiesta. Accedete per leggere il messaggio e scaricare gli eventuali documenti.",
    bodyDone: "La vostra richiesta è trattata. Trovate la risposta e i documenti nel vostro spazio.",
    cta: "Apri la richiesta",
    footer: "Potete rispondere direttamente dal vostro spazio.",
  },
};

export async function sendReplyEmail(email: string, locale: Locale, dossierId: string, done: boolean) {
  const t = REPLY[locale];
  const html = wrapEmailHtml({
    heading: done ? t.headingDone : t.headingReply,
    bodyHtml: escapeHtml(done ? t.bodyDone : t.bodyReply),
    ctaLabel: t.cta,
    ctaUrl: `${SITE_URL}/${locale}/compte/dossier/${dossierId}`,
    footer: t.footer,
  });
  await sendEmail(email, done ? t.subjectDone : t.subjectReply, html, CONTACT_EMAIL);
}

// ---------------------------------------------------------------------------
// Notifications pour l'équipe (français)
// ---------------------------------------------------------------------------

export async function notifyAdminOfSignup(input: {
  userId: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  plan: Plan;
  message?: string | null;
}) {
  const lines = [
    `<strong>${escapeHtml(input.name)}</strong>${input.company ? ` (${escapeHtml(input.company)})` : ""}`,
    escapeHtml(input.email),
    input.phone ? escapeHtml(input.phone) : null,
    `Formule demandée : ${PLAN_LABEL.fr[input.plan]}`,
    input.message ? `<br/>Message : ${escapeHtml(input.message).replace(/\n/g, "<br/>")}` : null,
  ].filter(Boolean);
  const html = wrapEmailHtml({
    heading: "Nouvelle inscription à activer",
    bodyHtml: `${lines.join("<br/>")}<br/><br/>Le client a signé les CGV en ligne. Recontactez-le ; son espace reste fermé tant que vous n'avez pas enregistré le paiement.`,
    ctaLabel: "Ouvrir la fiche client",
    ctaUrl: `${SITE_URL}/fr/admin/clients/${input.userId}`,
    footer: "Notification automatique Thrax Legal.",
  });
  await sendEmail(await adminEmails(), `Nouvelle inscription : ${input.name}`, html, input.email);
}

export async function notifyAdminOfDossier(input: {
  dossierId: string;
  userEmail: string;
  userName: string;
  plan: Plan;
  kindLabel: string;
  category: string;
  urgency: string;
  description: string;
  attachmentCount: number;
}) {
  const html = wrapEmailHtml({
    heading: input.urgency === "urgent" ? `Nouvelle demande URGENTE : ${input.kindLabel}` : `Nouvelle demande : ${input.kindLabel}`,
    bodyHtml: `${escapeHtml(input.userName)} (${escapeHtml(input.userEmail)}, formule ${PLAN_LABEL.fr[input.plan]}) a envoyé une demande « ${escapeHtml(input.category)} » (${input.attachmentCount} pièce(s) jointe(s)).<br/><br/>${escapeHtml(input.description).replace(/\n/g, "<br/>")}`,
    ctaLabel: "Ouvrir dans l'admin",
    ctaUrl: `${SITE_URL}/fr/admin/dossiers/${input.dossierId}`,
    footer: "Notification automatique Thrax Legal.",
  });
  await sendEmail(await adminEmails(), `Nouvelle demande (${input.kindLabel}) : ${input.userName}`, html, input.userEmail);
}

export async function notifyAdminOfClientMessage(input: {
  dossierId: string;
  userEmail: string;
  userName: string;
  body: string;
}) {
  const html = wrapEmailHtml({
    heading: "Nouveau message d'un client",
    bodyHtml: `${escapeHtml(input.userName)} (${escapeHtml(input.userEmail)}) a écrit :<br/><br/>${escapeHtml(input.body).replace(/\n/g, "<br/>")}`,
    ctaLabel: "Ouvrir dans l'admin",
    ctaUrl: `${SITE_URL}/fr/admin/dossiers/${input.dossierId}`,
    footer: "Notification automatique Thrax Legal.",
  });
  await sendEmail(await adminEmails(), `Nouveau message : ${input.userName}`, html, input.userEmail);
}

// ---------------------------------------------------------------------------
// Prospects (formulaire « Être rappelé »)
// ---------------------------------------------------------------------------

const LEAD_RECEIVED: Record<Locale, { subject: string; heading: string; body: (name: string) => string; cta: string; footer: string }> = {
  fr: {
    subject: "Nous avons bien reçu votre demande",
    heading: "Merci, nous vous rappelons",
    body: (name) =>
      `Bonjour ${name},<br/><br/>Nous avons bien reçu votre demande et vous recontactons dans les meilleurs délais. Si vous savez déjà ce qu’il vous faut, vous pouvez aussi vous inscrire en ligne dès maintenant : aucun paiement n’est demandé à ce stade.`,
    cta: "S’inscrire en ligne",
    footer: "Vous pouvez répondre directement à cet email.",
  },
  de: {
    subject: "Wir haben Ihre Anfrage erhalten",
    heading: "Danke, wir rufen Sie zurück",
    body: (name) =>
      `Guten Tag ${name}<br/><br/>Wir haben Ihre Anfrage erhalten und melden uns so rasch wie möglich. Wenn Sie schon wissen, was Sie brauchen, können Sie sich auch gleich online anmelden: Zum jetzigen Zeitpunkt ist keine Zahlung nötig.`,
    cta: "Online anmelden",
    footer: "Sie können direkt auf diese E-Mail antworten.",
  },
  en: {
    subject: "We've received your request",
    heading: "Thank you, we'll call you back",
    body: (name) =>
      `Hello ${name},<br/><br/>We have received your request and will get back to you as soon as possible. If you already know what you need, you can also sign up online right now: no payment is requested at this stage.`,
    cta: "Sign up online",
    footer: "You can reply directly to this email.",
  },
  it: {
    subject: "Abbiamo ricevuto la vostra richiesta",
    heading: "Grazie, vi richiamiamo",
    body: (name) =>
      `Buongiorno ${name},<br/><br/>Abbiamo ricevuto la vostra richiesta e vi ricontatteremo il prima possibile. Se sapete già di cosa avete bisogno, potete anche iscrivervi subito online: nessun pagamento è richiesto in questa fase.`,
    cta: "Iscriversi online",
    footer: "Potete rispondere direttamente a questa email.",
  },
};

export async function sendLeadReceivedEmail(lead: Lead) {
  const t = LEAD_RECEIVED[lead.locale];
  const plan = lead.plan_interest ? `?plan=${lead.plan_interest}` : "";
  const html = wrapEmailHtml({
    heading: t.heading,
    bodyHtml: t.body(escapeHtml(lead.name)),
    ctaLabel: t.cta,
    ctaUrl: `${SITE_URL}/${lead.locale}/compte/inscription${plan}`,
    footer: t.footer,
  });
  await sendEmail(lead.email, t.subject, html, CONTACT_EMAIL);
}

export async function notifyAdminOfLead(lead: Lead) {
  const lines = [
    `<strong>${escapeHtml(lead.name)}</strong>${lead.company ? ` (${escapeHtml(lead.company)})` : ""}`,
    escapeHtml(lead.email),
    lead.phone ? `Tél. ${escapeHtml(lead.phone)}` : "Pas de téléphone",
    lead.plan_interest ? `Intéressé par : ${PLAN_LABEL.fr[lead.plan_interest]}` : null,
    lead.message ? `<br/>${escapeHtml(lead.message).replace(/\n/g, "<br/>")}` : null,
  ].filter(Boolean);
  const html = wrapEmailHtml({
    heading: "Nouveau prospect à rappeler",
    bodyHtml: lines.join("<br/>"),
    ctaLabel: "Ouvrir les prospects",
    ctaUrl: `${SITE_URL}/fr/admin/prospects`,
    footer: "Notification automatique Thrax Legal.",
  });
  await sendEmail(await adminEmails(), `Prospect : ${lead.name}`, html, lead.email);
}

const SIGNUP_INVITE: Record<Locale, { subject: string; heading: string; body: (name: string) => string; cta: string; footer: string }> = {
  fr: {
    subject: "Finalisez votre inscription Thrax Legal",
    heading: "Finalisez votre inscription",
    body: (name) =>
      `Bonjour ${name},<br/><br/>Suite à notre échange, vous pouvez finaliser votre inscription en ligne : vous acceptez les conditions générales et nous ouvrons votre espace dès réception du premier paiement. Aucun paiement n’est demandé à cette étape.`,
    cta: "Finaliser mon inscription",
    footer: "Une question ? Répondez simplement à cet email.",
  },
  de: {
    subject: "Schliessen Sie Ihre Anmeldung bei Thrax Legal ab",
    heading: "Schliessen Sie Ihre Anmeldung ab",
    body: (name) =>
      `Guten Tag ${name}<br/><br/>Nach unserem Austausch können Sie Ihre Anmeldung online abschliessen: Sie akzeptieren die Allgemeinen Geschäftsbedingungen, und wir öffnen Ihren Bereich mit Eingang der ersten Zahlung. In diesem Schritt ist keine Zahlung nötig.`,
    cta: "Anmeldung abschliessen",
    footer: "Eine Frage? Antworten Sie einfach auf diese E-Mail.",
  },
  en: {
    subject: "Complete your Thrax Legal registration",
    heading: "Complete your registration",
    body: (name) =>
      `Hello ${name},<br/><br/>Following our conversation, you can complete your registration online: you accept the terms and conditions, and we open your account when the first payment is received. No payment is requested at this step.`,
    cta: "Complete my registration",
    footer: "A question? Just reply to this email.",
  },
  it: {
    subject: "Finalizzate la vostra iscrizione a Thrax Legal",
    heading: "Finalizzate la vostra iscrizione",
    body: (name) =>
      `Buongiorno ${name},<br/><br/>In seguito al nostro scambio, potete finalizzare la vostra iscrizione online: accettate le condizioni generali e apriamo il vostro spazio alla ricezione del primo pagamento. In questa fase non è richiesto alcun pagamento.`,
    cta: "Finalizzare l’iscrizione",
    footer: "Una domanda? Rispondete semplicemente a questa email.",
  },
};

export async function sendSignupInviteEmail(lead: Lead) {
  const t = SIGNUP_INVITE[lead.locale];
  const params = new URLSearchParams({ email: lead.email, name: lead.name });
  if (lead.plan_interest) params.set("plan", lead.plan_interest);
  const html = wrapEmailHtml({
    heading: t.heading,
    bodyHtml: t.body(escapeHtml(lead.name)),
    ctaLabel: t.cta,
    ctaUrl: `${SITE_URL}/${lead.locale}/compte/inscription?${params.toString()}`,
    footer: t.footer,
  });
  await sendEmail(lead.email, t.subject, html, CONTACT_EMAIL);
}
