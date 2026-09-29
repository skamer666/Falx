import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container, PrimaryButton } from "@/components/site/ui";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { requestAccess } from "./actions";

const STRINGS: Record<
  Locale,
  {
    metaTitle: string;
    heading: string;
    subheading: string;
    emailLabel: string;
    emailPlaceholder: string;
    cta: string;
    note: string;
    errorEmail: string;
    errorExpired: string;
    errorUnknown: string;
    errorLink: string;
  }
> = {
  fr: {
    metaTitle: "Espace client | Thrax Legal",
    heading: "Accédez à votre espace",
    subheading: "Entrez votre adresse email, nous vous envoyons un lien de connexion sécurisé.",
    emailLabel: "Adresse email",
    emailPlaceholder: "vous@entreprise.ch",
    cta: "Continuer",
    note: "Aucun mot de passe à retenir. Le lien reçu par email est valable 15 minutes et à usage unique.",
    errorEmail: "Adresse email invalide.",
    errorExpired: "Ce lien a expiré ou a déjà été utilisé. Redemandez-en un ci-dessous.",
    errorUnknown: "Compte introuvable. Vérifiez votre adresse ou créez un compte.",
    errorLink: "Lien invalide.",
  },
  de: {
    metaTitle: "Kundenbereich | Thrax Legal",
    heading: "Zugang zu Ihrem Konto",
    subheading: "Geben Sie Ihre E-Mail-Adresse ein, wir senden Ihnen einen sicheren Anmeldelink.",
    emailLabel: "E-Mail-Adresse",
    emailPlaceholder: "sie@unternehmen.ch",
    cta: "Weiter",
    note: "Kein Passwort zu merken. Der per E-Mail erhaltene Link ist 15 Minuten gültig und einmalig nutzbar.",
    errorEmail: "Ungültige E-Mail-Adresse.",
    errorExpired: "Dieser Link ist abgelaufen oder wurde bereits verwendet. Fordern Sie unten einen neuen an.",
    errorUnknown: "Konto nicht gefunden. Prüfen Sie Ihre Adresse oder erstellen Sie ein Konto.",
    errorLink: "Ungültiger Link.",
  },
  en: {
    metaTitle: "Client area | Thrax Legal",
    heading: "Access your account",
    subheading: "Enter your email address, we'll send you a secure sign-in link.",
    emailLabel: "Email address",
    emailPlaceholder: "you@company.ch",
    cta: "Continue",
    note: "No password to remember. The link you receive by email is valid for 15 minutes, single use.",
    errorEmail: "Invalid email address.",
    errorExpired: "This link has expired or was already used. Request a new one below.",
    errorUnknown: "Account not found. Check your address or create an account.",
    errorLink: "Invalid link.",
  },
  it: {
    metaTitle: "Area clienti | Thrax Legal",
    heading: "Accedete al vostro spazio",
    subheading: "Inserite il vostro indirizzo email, vi invieremo un link di accesso sicuro.",
    emailLabel: "Indirizzo email",
    emailPlaceholder: "voi@azienda.ch",
    cta: "Continua",
    note: "Nessuna password da ricordare. Il link ricevuto via email è valido 15 minuti e a uso unico.",
    errorEmail: "Indirizzo email non valido.",
    errorExpired: "Questo link è scaduto o è già stato utilizzato. Richiedetene uno nuovo qui sotto.",
    errorUnknown: "Account non trovato. Verificate l'indirizzo o create un account.",
    errorLink: "Link non valido.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return { title: STRINGS[locale].metaTitle };
}

export default async function ComptePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string; email?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const { error, email } = await searchParams;
  const t = STRINGS[locale];

  const errorMessage =
    error === "email"
      ? t.errorEmail
      : error === "expire"
        ? t.errorExpired
        : error === "inconnu"
          ? t.errorUnknown
          : error === "lien"
            ? t.errorLink
            : null;

  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="theme-light flex min-h-screen items-center border-b border-border bg-bg pb-16 pt-32 md:pt-40">
          <Container className="mx-auto max-w-sm">
            <Reveal>
              <h1 className="text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text">
                {t.heading}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-text-muted">{t.subheading}</p>

              {errorMessage ? (
                <p className="mt-5 rounded-xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger">
                  {errorMessage}
                </p>
              ) : null}

              <form action={requestAccess.bind(null, locale)} className="mt-8 flex flex-col gap-4">
                <div>
                  <label htmlFor="email" className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted">
                    {t.emailLabel}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    defaultValue={email}
                    placeholder={t.emailPlaceholder}
                    className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-text placeholder:text-text-muted/60 focus:border-text focus:outline-none"
                  />
                </div>
                <PrimaryButton type="submit" className="w-full px-6 py-3">
                  {t.cta}
                </PrimaryButton>
              </form>

              <p className="mt-6 text-xs leading-relaxed text-text-muted">{t.note}</p>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
