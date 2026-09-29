import Nav from "./Nav";
import Footer from "./Footer";
import { Container, PrimaryButton } from "./ui";
import type { Locale } from "@/i18n/config";

const STRINGS: Record<Locale, { heading: string; body: string; cta: string }> = {
  fr: {
    heading: "Connectez-vous pour continuer",
    body: "Cette page est réservée aux abonnés. Entrez votre email pour recevoir un lien de connexion.",
    cta: "Se connecter",
  },
  de: {
    heading: "Melden Sie sich an, um fortzufahren",
    body: "Diese Seite ist Abonnentinnen und Abonnenten vorbehalten. Geben Sie Ihre E-Mail-Adresse ein, um einen Anmeldelink zu erhalten.",
    cta: "Anmelden",
  },
  en: {
    heading: "Sign in to continue",
    body: "This page is reserved for subscribers. Enter your email to receive a sign-in link.",
    cta: "Sign in",
  },
  it: {
    heading: "Accedete per continuare",
    body: "Questa pagina è riservata agli abbonati. Inserite la vostra email per ricevere un link di accesso.",
    cta: "Accedi",
  },
};

/**
 * Rendered in place of protected content when there's no session, instead of a
 * server-side redirect() — a GET page load that responds with a redirect gets
 * mishandled by the CDN cache adapter's route-cacheability probe (infinite
 * "too many redirects" loop in local dev; unverified but avoided on principle
 * for a critical auth path). Client-side navigation via a normal Link has no
 * such risk.
 */
export default function SignInPrompt({ locale }: { locale: Locale }) {
  const t = STRINGS[locale];
  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="theme-light flex min-h-screen items-center border-b border-border bg-bg pb-16 pt-32 md:pt-40">
          <Container className="mx-auto max-w-sm text-center">
            <h1 className="text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text">
              {t.heading}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-text-muted">{t.body}</p>
            <PrimaryButton href={`/${locale}/compte`} className="mt-8 px-6 py-3">
              {t.cta}
            </PrimaryButton>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
