import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import SignInPrompt from "@/components/site/SignInPrompt";
import AccessBlocked from "@/components/site/AccessBlocked";
import SubmitButton from "@/components/account/SubmitButton";
import { INPUT, LABEL, Notice } from "@/components/account/ui";
import { Container } from "@/components/site/ui";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { getClientGate } from "@/lib/account/session";
import { accessState, formatChf } from "@/lib/account/model";
import { listUserPayments } from "@/lib/account/admin-db";
import { CONTACT_EMAIL } from "@/lib/account/contact";
import { formatDate } from "@/lib/account/format";
import { ACCOUNT_STRINGS, PLAN_LABEL } from "@/lib/account/strings";
import { changePassword, saveProfile } from "../actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return { title: ACCOUNT_STRINGS[locale].settings.metaTitle, robots: { index: false, follow: false } };
}

export default async function ParametresPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const { error, saved } = await searchParams;
  const strings = ACCOUNT_STRINGS[locale];
  const t = strings.settings;

  const gate = await getClientGate();
  if (gate.kind === "anonymous") return <SignInPrompt locale={locale} />;
  if (gate.kind === "blocked") return <AccessBlocked locale={locale} state={gate.state} name={gate.user.name} />;
  const user = gate.user;
  const payments = await listUserPayments(user.id);

  let passwordError: string | null = null;
  if (error === "wrong") passwordError = t.wrongPassword;
  else if (error === "mismatch") passwordError = t.mismatch;
  else if (error === "locked") passwordError = strings.login.errors.locked;
  else if (error?.startsWith("password_")) {
    const key = error.slice("password_".length) as keyof typeof strings.passwordProblems;
    passwordError = strings.passwordProblems[key] ?? null;
  }

  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="theme-light border-b border-border bg-bg pb-16 pt-32 md:pt-40">
          <Container className="mx-auto max-w-xl">
            <Reveal>
              <Link
                href={`/${locale}/compte/tableau-de-bord`}
                className="text-sm text-text-muted underline underline-offset-4 hover:text-text"
              >
                ← {t.back}
              </Link>
              <h1 className="mt-6 text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text">{t.heading}</h1>

              {!user.is_admin ? (
                <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
                  <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-text">{t.subscriptionHeading}</h2>
                  <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                    <dt className="text-text-muted">{t.planLabel}</dt>
                    <dd className="font-medium text-text">{PLAN_LABEL[locale][user.plan]}</dd>
                    <dt className="text-text-muted">{t.statusLabel}</dt>
                    <dd className="font-medium text-text">{t.statusValues[accessState(user)]}</dd>
                    {user.paid_until ? (
                      <>
                        <dt className="text-text-muted">{t.validUntilLabel}</dt>
                        <dd className="font-medium text-text">{formatDate(user.paid_until, locale)}</dd>
                      </>
                    ) : null}
                  </dl>

                  <h3 className="mt-6 text-sm font-semibold text-text">{t.paymentsHeading}</h3>
                  {payments.length === 0 ? (
                    <p className="mt-2 text-sm text-text-muted">{t.noPayments}</p>
                  ) : (
                    <ul className="mt-2 divide-y divide-border text-sm">
                      {payments.map((payment) => (
                        <li key={payment.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
                          <span className="text-text-muted">
                            {t.period} {formatDate(payment.period_start, locale)} → {formatDate(payment.period_end, locale)}
                          </span>
                          <span className="font-medium text-text">CHF {formatChf(payment.amount_rappen)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="mt-4 text-xs leading-relaxed text-text-muted">
                    {t.changePlanNote}{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-text underline underline-offset-4">
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                </div>
              ) : null}

              <h2 className="mt-10 text-[18px] font-semibold tracking-[-0.02em] text-text">{t.profileHeading}</h2>
              {saved === "profile" ? <Notice tone="success">{t.profileSaved}</Notice> : null}
              {error === "profile" ? <Notice tone="error">{t.errorProfile}</Notice> : null}
              <form action={saveProfile.bind(null, locale)} className="mt-4 flex flex-col gap-4">
                <div>
                  <label htmlFor="name" className={LABEL}>
                    {t.nameLabel}
                  </label>
                  <input id="name" name="name" required minLength={2} defaultValue={user.name} autoComplete="name" className={INPUT} />
                </div>
                <div>
                  <label htmlFor="company" className={LABEL}>
                    {t.companyLabel}
                  </label>
                  <input id="company" name="company" defaultValue={user.company ?? ""} autoComplete="organization" className={INPUT} />
                </div>
                <div>
                  <label htmlFor="phone" className={LABEL}>
                    {t.phoneLabel}
                  </label>
                  <input id="phone" name="phone" type="tel" defaultValue={user.phone ?? ""} autoComplete="tel" className={INPUT} />
                </div>
                <div>
                  <label htmlFor="email" className={LABEL}>
                    {t.emailLabel}
                  </label>
                  <input id="email" value={user.email} disabled readOnly className={`${INPUT} opacity-60`} />
                </div>
                <SubmitButton className="self-start">{t.saveProfile}</SubmitButton>
              </form>

              <h2 className="mt-12 text-[18px] font-semibold tracking-[-0.02em] text-text">{t.passwordHeading}</h2>
              {saved === "password" ? <Notice tone="success">{t.passwordSaved}</Notice> : null}
              {passwordError ? <Notice tone="error">{passwordError}</Notice> : null}
              <form action={changePassword.bind(null, locale)} className="mt-4 flex flex-col gap-4">
                <div>
                  <label htmlFor="current" className={LABEL}>
                    {t.currentPassword}
                  </label>
                  <input id="current" name="current" type="password" required autoComplete="current-password" className={INPUT} />
                </div>
                <div>
                  <label htmlFor="password" className={LABEL}>
                    {t.newPassword}
                  </label>
                  <input id="password" name="password" type="password" required minLength={10} autoComplete="new-password" className={INPUT} />
                </div>
                <div>
                  <label htmlFor="confirm" className={LABEL}>
                    {t.confirmPassword}
                  </label>
                  <input id="confirm" name="confirm" type="password" required minLength={10} autoComplete="new-password" className={INPUT} />
                </div>
                <SubmitButton className="self-start">{t.savePassword}</SubmitButton>
              </form>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
