import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container, PrimaryButton } from "@/components/site/ui";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { createAccount } from "../actions";

const STRINGS: Record<
  Locale,
  {
    metaTitle: string;
    heading: string;
    subheading: string;
    emailLabel: string;
    nameLabel: string;
    namePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    planLabel: string;
    planEssentiel: string;
    planEssentielNote: string;
    planCroissance: string;
    planCroissanceNote: string;
    cta: string;
    error: string;
  }
> = {
  fr: {
    metaTitle: "Créer votre compte | Thrax Legal",
    heading: "Créons votre compte",
    subheading: "Quelques informations pour préparer votre espace client.",
    emailLabel: "Adresse email",
    nameLabel: "Nom et prénom",
    namePlaceholder: "Jean Dupont",
    companyLabel: "Entreprise (optionnel)",
    companyPlaceholder: "Nom de votre société",
    planLabel: "Votre formule",
    planEssentiel: "Essentiel",
    planEssentielNote: "149 CHF/mois · 3 dossiers/mois",
    planCroissance: "Croissance",
    planCroissanceNote: "349 CHF/mois · 8 dossiers/mois",
    cta: "Créer mon compte",
    error: "Vérifiez votre email et votre nom.",
  },
  de: {
    metaTitle: "Konto erstellen | Thrax Legal",
    heading: "Erstellen wir Ihr Konto",
    subheading: "Ein paar Angaben, um Ihren Kundenbereich vorzubereiten.",
    emailLabel: "E-Mail-Adresse",
    nameLabel: "Vor- und Nachname",
    namePlaceholder: "Hans Muster",
    companyLabel: "Unternehmen (optional)",
    companyPlaceholder: "Name Ihres Unternehmens",
    planLabel: "Ihre Formel",
    planEssentiel: "Essentiel",
    planEssentielNote: "CHF 149/Monat · 3 Anliegen/Monat",
    planCroissance: "Croissance",
    planCroissanceNote: "CHF 349/Monat · 8 Anliegen/Monat",
    cta: "Konto erstellen",
    error: "Prüfen Sie Ihre E-Mail und Ihren Namen.",
  },
  en: {
    metaTitle: "Create your account | Thrax Legal",
    heading: "Let's create your account",
    subheading: "A few details to set up your client area.",
    emailLabel: "Email address",
    nameLabel: "Full name",
    namePlaceholder: "Jane Smith",
    companyLabel: "Company (optional)",
    companyPlaceholder: "Your company name",
    planLabel: "Your plan",
    planEssentiel: "Essential",
    planEssentielNote: "CHF 149/month · 3 matters/month",
    planCroissance: "Growth",
    planCroissanceNote: "CHF 349/month · 8 matters/month",
    cta: "Create my account",
    error: "Check your email and name.",
  },
  it: {
    metaTitle: "Crea il tuo account | Thrax Legal",
    heading: "Creiamo il vostro account",
    subheading: "Alcune informazioni per preparare la vostra area clienti.",
    emailLabel: "Indirizzo email",
    nameLabel: "Nome e cognome",
    namePlaceholder: "Mario Rossi",
    companyLabel: "Azienda (opzionale)",
    companyPlaceholder: "Nome della vostra azienda",
    planLabel: "La vostra formula",
    planEssentiel: "Essentiel",
    planEssentielNote: "CHF 149/mese · 3 pratiche/mese",
    planCroissance: "Croissance",
    planCroissanceNote: "CHF 349/mese · 8 pratiche/mese",
    cta: "Crea il mio account",
    error: "Controllate la vostra email e il vostro nome.",
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

export default async function InscriptionPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ email?: string; error?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const { email, error } = await searchParams;
  const t = STRINGS[locale];

  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="theme-light border-b border-border bg-bg pb-16 pt-32 md:pt-40">
          <Container className="mx-auto max-w-md">
            <Reveal>
              <h1 className="text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text">
                {t.heading}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-text-muted">{t.subheading}</p>

              {error ? (
                <p className="mt-5 rounded-xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger">
                  {t.error}
                </p>
              ) : null}

              <form action={createAccount.bind(null, locale)} className="mt-8 flex flex-col gap-5">
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
                    className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-text focus:border-text focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted">
                    {t.nameLabel}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    placeholder={t.namePlaceholder}
                    className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-text placeholder:text-text-muted/60 focus:border-text focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted">
                    {t.companyLabel}
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder={t.companyPlaceholder}
                    className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-text placeholder:text-text-muted/60 focus:border-text focus:outline-none"
                  />
                </div>

                <fieldset>
                  <legend className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted">
                    {t.planLabel}
                  </legend>
                  <div className="mt-3 grid gap-3">
                    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3 has-checked:border-text">
                      <span>
                        <span className="block text-sm font-semibold text-text">{t.planEssentiel}</span>
                        <span className="block text-xs text-text-muted">{t.planEssentielNote}</span>
                      </span>
                      <input type="radio" name="plan" value="essentiel" defaultChecked className="h-4 w-4 accent-text" />
                    </label>
                    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3 has-checked:border-text">
                      <span>
                        <span className="block text-sm font-semibold text-text">{t.planCroissance}</span>
                        <span className="block text-xs text-text-muted">{t.planCroissanceNote}</span>
                      </span>
                      <input type="radio" name="plan" value="croissance" className="h-4 w-4 accent-text" />
                    </label>
                  </div>
                </fieldset>

                <PrimaryButton type="submit" className="mt-2 w-full px-6 py-3">
                  {t.cta}
                </PrimaryButton>
              </form>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
