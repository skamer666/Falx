import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container, PrimaryButton } from "@/components/site/ui";
import SubmitButton from "@/components/account/SubmitButton";
import { INPUT, LABEL, Notice } from "@/components/account/ui";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { LEAD_STRINGS } from "@/lib/account/lead-strings";
import { submitLead } from "./actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return {
    title: LEAD_STRINGS[locale].metaTitle,
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const { sent, error } = await searchParams;
  const t = LEAD_STRINGS[locale];

  if (sent === "1") {
    return (
      <>
        <Nav />
        <main className="bg-bg text-text">
          <section className="theme-light flex min-h-screen items-center border-b border-border bg-bg pb-16 pt-32 md:pt-40">
            <Container className="mx-auto max-w-sm text-center">
              <Reveal>
                <h1 className="text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text">{t.sentHeading}</h1>
                <p className="mt-3 text-base leading-relaxed text-text-muted">{t.sentBody}</p>
                <PrimaryButton href={`/${locale}`} className="mt-8 px-6 py-3">
                  {t.backHome}
                </PrimaryButton>
              </Reveal>
            </Container>
          </section>
        </main>
        <Footer locale={locale} />
      </>
    );
  }

  const errorMessage =
    error === "generic" ? t.errorGeneric : error === "consent" ? t.errorConsent : error === "throttled" ? t.errorThrottled : null;

  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="theme-light border-b border-border bg-bg pb-16 pt-32 md:pt-40">
          <Container className="mx-auto max-w-md">
            <Reveal>
              <h1 className="text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text">{t.heading}</h1>
              <p className="mt-3 text-base leading-relaxed text-text-muted">{t.subheading}</p>

              {errorMessage ? <Notice tone="error">{errorMessage}</Notice> : null}

              <form action={submitLead.bind(null, locale)} className="mt-8 flex flex-col gap-5">
                {/* Champ piège à robots, invisible pour les humains. */}
                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                <div>
                  <label htmlFor="name" className={LABEL}>
                    {t.nameLabel}
                  </label>
                  <input id="name" name="name" required minLength={2} autoComplete="name" className={INPUT} />
                </div>
                <div>
                  <label htmlFor="email" className={LABEL}>
                    {t.emailLabel}
                  </label>
                  <input id="email" name="email" type="email" required autoComplete="email" className={INPUT} />
                </div>
                <div>
                  <label htmlFor="phone" className={LABEL}>
                    {t.phoneLabel}
                  </label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+41 79 000 00 00" className={INPUT} />
                </div>
                <div>
                  <label htmlFor="company" className={LABEL}>
                    {t.companyLabel}
                  </label>
                  <input id="company" name="company" autoComplete="organization" className={INPUT} />
                </div>
                <div>
                  <label htmlFor="plan" className={LABEL}>
                    {t.planLabel}
                  </label>
                  <select id="plan" name="plan" defaultValue="" className={INPUT}>
                    <option value="">{t.planNone}</option>
                    <option value="essentiel">{t.planEssentiel}</option>
                    <option value="croissance">{t.planCroissance}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className={LABEL}>
                    {t.messageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    maxLength={2000}
                    placeholder={t.messagePlaceholder}
                    className={`${INPUT} resize-y leading-relaxed`}
                  />
                </div>
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-text-muted">
                  <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 shrink-0 accent-text" />
                  <span>
                    {t.consentBefore}
                    <Link href={`/${locale}/confidentialite`} target="_blank" className="text-text underline underline-offset-4">
                      {t.consentLink}
                    </Link>
                    {t.consentAfter}
                  </span>
                </label>
                <SubmitButton className="w-full">{t.cta}</SubmitButton>
              </form>

              <p className="mt-6 border-t border-border pt-6 text-sm text-text-muted">
                {t.alternative}{" "}
                <Link href={`/${locale}/compte/inscription`} className="font-medium text-text underline underline-offset-4">
                  {t.alternativeCta}
                </Link>
              </p>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
