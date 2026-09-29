import type { Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";

const FROM = "Thrax Legal <hey@thrax-legal.ch>";

const MAGIC_LINK_STRINGS: Record<Locale, { subject: string; heading: string; body: string; cta: string; expiry: string }> = {
  fr: {
    subject: "Votre lien de connexion Thrax Legal",
    heading: "Votre lien de connexion",
    body: "Cliquez sur le bouton ci-dessous pour accéder à votre espace client. Ce lien est valable 15 minutes et ne peut être utilisé qu'une seule fois.",
    cta: "Accéder à mon espace",
    expiry: "Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email.",
  },
  de: {
    subject: "Ihr Anmeldelink für Thrax Legal",
    heading: "Ihr Anmeldelink",
    body: "Klicken Sie auf die Schaltfläche unten, um auf Ihren Kundenbereich zuzugreifen. Dieser Link ist 15 Minuten gültig und kann nur einmal verwendet werden.",
    cta: "Zu meinem Konto",
    expiry: "Wenn Sie diese Anfrage nicht gestellt haben, ignorieren Sie diese E-Mail einfach.",
  },
  en: {
    subject: "Your Thrax Legal sign-in link",
    heading: "Your sign-in link",
    body: "Click the button below to access your client account. This link is valid for 15 minutes and can only be used once.",
    cta: "Go to my account",
    expiry: "If you didn't request this, you can safely ignore this email.",
  },
  it: {
    subject: "Il vostro link di accesso a Thrax Legal",
    heading: "Il vostro link di accesso",
    body: "Cliccate sul pulsante qui sotto per accedere alla vostra area clienti. Questo link è valido 15 minuti e può essere utilizzato una sola volta.",
    cta: "Vai al mio account",
    expiry: "Se non siete voi ad aver effettuato questa richiesta, potete ignorare questa email.",
  },
};

function wrapEmailHtml(heading: string, body: string, ctaLabel: string, ctaUrl: string, footer: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f3ee;font-family:-apple-system,Segoe UI,Roboto,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
      <tr><td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #eceae2;">
          <tr><td style="padding:32px 32px 8px;">
            <p style="margin:0;font-size:15px;font-weight:600;letter-spacing:-0.01em;color:#101010;">Thrax Legal</p>
          </td></tr>
          <tr><td style="padding:16px 32px 0;">
            <h1 style="margin:0;font-size:22px;line-height:1.3;color:#101010;">${heading}</h1>
            <p style="margin:12px 0 0;font-size:14px;line-height:1.6;color:#5c5c5c;">${body}</p>
          </td></tr>
          <tr><td style="padding:24px 32px;">
            <a href="${ctaUrl}" style="display:inline-block;background:#101010;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:999px;font-size:14px;font-weight:500;">${ctaLabel}</a>
          </td></tr>
          <tr><td style="padding:0 32px 32px;">
            <p style="margin:0;font-size:12px;line-height:1.6;color:#8a8a8a;">${footer}</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

async function sendEmail(to: string, subject: string, html: string) {
  const { env } = await import("cloudflare:workers");
  const apiKey = (env as unknown as Record<string, string | undefined>).RESEND_API_KEY;
  if (!apiKey) {
    // No Resend key configured (local dev, or not yet set in production): log instead of failing.
    console.log(`[email:dev-fallback] to=${to} subject=${subject}\n${html}`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend error ${res.status}: ${text}`);
  }
}

export async function sendMagicLinkEmail(email: string, token: string, locale: Locale) {
  const t = MAGIC_LINK_STRINGS[locale];
  const url = `${SITE_URL}/api/auth/verify?token=${token}&locale=${locale}`;
  const html = wrapEmailHtml(t.heading, t.body, t.cta, url, t.expiry);
  await sendEmail(email, t.subject, html);
  return url;
}

const NOTIFY_ADMIN = "hey@thrax-legal.ch";

export async function notifyAdminOfDossier(input: {
  userEmail: string;
  userName: string;
  plan: string;
  category: string;
  urgency: string;
  description: string;
  attachmentCount: number;
}) {
  const html = wrapEmailHtml(
    "Nouveau dossier soumis",
    `${input.userName} (${input.userEmail}, formule ${input.plan}) a soumis un dossier "${input.category}" (urgence: ${input.urgency}, ${input.attachmentCount} pièce(s) jointe(s)).<br/><br/>${input.description}`,
    "Ouvrir le tableau de bord",
    `${SITE_URL}/fr/compte/tableau-de-bord`,
    "Notification automatique Thrax Legal.",
  );
  await sendEmail(NOTIFY_ADMIN, `Nouveau dossier : ${input.category} (${input.userName})`, html);
}
