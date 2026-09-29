import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import SignInPrompt from "@/components/site/SignInPrompt";
import { Container, PrimaryButton } from "@/components/site/ui";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { getCurrentUser } from "@/lib/account/session";
import { listDossiers, countDossiersThisCycle, PLAN_QUOTAS } from "@/lib/account/db";
import { CATEGORY_LABELS, STATUS_LABELS, type DossierCategory } from "@/lib/account/categories";
import { logout } from "../actions";

const STRINGS: Record<
  Locale,
  {
    metaTitle: string;
    greeting: string;
    plan: string;
    logout: string;
    quotaHeading: string;
    quotaUsed: (used: number, total: number) => string;
    quotaOver: string;
    newDossier: string;
    dossiersHeading: string;
    empty: string;
    emptyCta: string;
    successBanner: string;
    extraPrice: string;
  }
> = {
  fr: {
    metaTitle: "Tableau de bord | Thrax Legal",
    greeting: "Bonjour",
    plan: "Formule",
    logout: "Déconnexion",
    quotaHeading: "Dossiers ce mois-ci",
    quotaUsed: (used, total) => `${used} / ${total} dossiers utilisés`,
    quotaOver: "Forfait dépassé : chaque dossier supplémentaire est facturé 79 CHF, prix fixe.",
    newDossier: "Nouveau dossier",
    dossiersHeading: "Vos dossiers",
    empty: "Vous n'avez pas encore soumis de dossier.",
    emptyCta: "Soumettre mon premier dossier",
    successBanner: "Votre dossier a bien été transmis. Vous recevrez une réponse dans le délai de votre formule.",
    extraPrice: "79 CHF",
  },
  de: {
    metaTitle: "Übersicht | Thrax Legal",
    greeting: "Hallo",
    plan: "Formel",
    logout: "Abmelden",
    quotaHeading: "Anliegen diesen Monat",
    quotaUsed: (used, total) => `${used} / ${total} Anliegen genutzt`,
    quotaOver: "Kontingent überschritten: Jedes zusätzliche Anliegen kostet CHF 79, Fixpreis.",
    newDossier: "Neues Anliegen",
    dossiersHeading: "Ihre Anliegen",
    empty: "Sie haben noch kein Anliegen eingereicht.",
    emptyCta: "Erstes Anliegen einreichen",
    successBanner: "Ihr Anliegen wurde übermittelt. Sie erhalten eine Antwort innerhalb der Frist Ihrer Formel.",
    extraPrice: "CHF 79",
  },
  en: {
    metaTitle: "Dashboard | Thrax Legal",
    greeting: "Hello",
    plan: "Plan",
    logout: "Log out",
    quotaHeading: "Matters this month",
    quotaUsed: (used, total) => `${used} / ${total} matters used`,
    quotaOver: "Plan exceeded: each extra matter is billed at CHF 79, fixed price.",
    newDossier: "New matter",
    dossiersHeading: "Your matters",
    empty: "You haven't submitted any matter yet.",
    emptyCta: "Submit your first matter",
    successBanner: "Your matter has been submitted. You'll get a response within your plan's timeframe.",
    extraPrice: "CHF 79",
  },
  it: {
    metaTitle: "Bacheca | Thrax Legal",
    greeting: "Ciao",
    plan: "Formula",
    logout: "Disconnetti",
    quotaHeading: "Pratiche questo mese",
    quotaUsed: (used, total) => `${used} / ${total} pratiche utilizzate`,
    quotaOver: "Pacchetto superato: ogni pratica supplementare è fatturata CHF 79, prezzo fisso.",
    newDossier: "Nuova pratica",
    dossiersHeading: "Le vostre pratiche",
    empty: "Non avete ancora inviato nessuna pratica.",
    emptyCta: "Inviate la vostra prima pratica",
    successBanner: "La vostra pratica è stata inviata. Riceverete una risposta entro il termine della vostra formula.",
    extraPrice: "CHF 79",
  },
};

const PLAN_LABEL: Record<Locale, Record<"essentiel" | "croissance", string>> = {
  fr: { essentiel: "Essentiel", croissance: "Croissance" },
  de: { essentiel: "Essentiel", croissance: "Croissance" },
  en: { essentiel: "Essential", croissance: "Growth" },
  it: { essentiel: "Essentiel", croissance: "Croissance" },
};

const DATE_LOCALE: Record<Locale, string> = { fr: "fr-CH", de: "de-CH", en: "en-CH", it: "it-CH" };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return { title: STRINGS[locale].metaTitle };
}

export default async function TableauDeBordPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ soumis?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const { soumis } = await searchParams;
  const t = STRINGS[locale];

  const user = await getCurrentUser();
  if (!user) return <SignInPrompt locale={locale} />;

  const [dossiers, usedThisCycle] = await Promise.all([listDossiers(user.id), countDossiersThisCycle(user.id)]);
  const quota = PLAN_QUOTAS[user.plan];
  const quotaPct = Math.min(100, Math.round((usedThisCycle / quota) * 100));
  const isOverQuota = usedThisCycle > quota;

  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="theme-light border-b border-border bg-bg pb-12 pt-32 md:pt-40">
          <Container className="mx-auto max-w-3xl">
            <Reveal>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text">
                    {t.greeting}, {user.name.split(" ")[0]}
                  </h1>
                  <p className="mt-2 text-sm text-text-muted">
                    {t.plan} : <span className="font-medium text-text">{PLAN_LABEL[locale][user.plan]}</span>
                  </p>
                </div>
                <form action={logout.bind(null, locale)}>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text transition-colors duration-200 hover:border-white/20 hover:bg-surface"
                  >
                    {t.logout}
                  </button>
                </form>
              </div>

              {soumis === "1" ? (
                <p className="mt-6 rounded-xl border border-success/30 bg-success-soft px-4 py-3 text-sm text-text">
                  {t.successBanner}
                </p>
              ) : null}
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-surface py-10">
          <Container className="mx-auto max-w-3xl">
            <Reveal>
              <div className="rounded-2xl border border-border bg-bg p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-text">{t.quotaHeading}</p>
                  <p className="text-sm text-text-muted">{t.quotaUsed(usedThisCycle, quota)}</p>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-text transition-[width]"
                    style={{ width: `${quotaPct}%` }}
                  />
                </div>
                {isOverQuota ? (
                  <p className="mt-3 text-xs text-text-muted">{t.quotaOver}</p>
                ) : null}
              </div>

              <div className="mt-6 flex justify-center sm:justify-start">
                <PrimaryButton href={`/${locale}/compte/nouveau-dossier`} className="px-6 py-3">
                  {t.newDossier}
                </PrimaryButton>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-bg py-12 md:py-16">
          <Container className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                {t.dossiersHeading}
              </h2>

              {dossiers.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-border p-10 text-center">
                  <p className="text-sm text-text-muted">{t.empty}</p>
                  <PrimaryButton href={`/${locale}/compte/nouveau-dossier`} className="mt-5 px-6 py-3">
                    {t.emptyCta}
                  </PrimaryButton>
                </div>
              ) : (
                <div className="mt-6 divide-y divide-border border-t border-border">
                  {dossiers.map((dossier) => (
                    <div key={dossier.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-text">
                          {CATEGORY_LABELS[locale][dossier.category as DossierCategory] ?? dossier.category}
                        </p>
                        <p className="mt-1 truncate text-xs text-text-muted">
                          {new Date(dossier.created_at).toLocaleDateString(DATE_LOCALE[locale], {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-muted">
                        {STATUS_LABELS[locale][dossier.status]}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
