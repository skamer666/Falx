import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container } from "@/components/site/ui";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

const STRINGS: Record<Locale, { metaTitle: string; heading: string; body: string; note: string }> = {
  fr: {
    metaTitle: "Vérifiez vos emails | Thrax Legal",
    heading: "Vérifiez vos emails",
    body: "Nous avons envoyé un lien de connexion à",
    note: "Le lien est valable 15 minutes. Pensez à vérifier vos spams si vous ne le voyez pas.",
  },
  de: {
    metaTitle: "Prüfen Sie Ihre E-Mails | Thrax Legal",
    heading: "Prüfen Sie Ihre E-Mails",
    body: "Wir haben einen Anmeldelink gesendet an",
    note: "Der Link ist 15 Minuten gültig. Prüfen Sie gegebenenfalls Ihren Spam-Ordner.",
  },
  en: {
    metaTitle: "Check your email | Thrax Legal",
    heading: "Check your email",
    body: "We've sent a sign-in link to",
    note: "The link is valid for 15 minutes. Check your spam folder if you don't see it.",
  },
  it: {
    metaTitle: "Controllate la vostra email | Thrax Legal",
    heading: "Controllate la vostra email",
    body: "Abbiamo inviato un link di accesso a",
    note: "Il link è valido 15 minuti. Controllate anche la cartella spam.",
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

export default async function VerifierPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ email?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const { email } = await searchParams;
  const t = STRINGS[locale];

  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="theme-light flex min-h-screen items-center border-b border-border bg-bg pb-16 pt-32 md:pt-40">
          <Container className="mx-auto max-w-sm text-center">
            <Reveal>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-text">
                  <path
                    d="M3 7l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h1 className="mt-6 text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text">
                {t.heading}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-text-muted">
                {t.body} {email ? <strong className="text-text">{email}</strong> : null}
              </p>
              <p className="mt-6 text-xs leading-relaxed text-text-muted">{t.note}</p>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
