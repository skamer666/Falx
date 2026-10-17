import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import JsonLd from "@/components/site/JsonLd";
import { Container, PrimaryButton } from "@/components/site/ui";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { BCE_NUMBER } from "@/lib/account/legal";
import { ABOUT_PATH, ABOUT_STRINGS, FOUNDER_ID, FOUNDER_NAME, FOUNDER_PHOTO } from "@/lib/about";
import { pageMetadata } from "@/lib/seo";
import { ORG_ID, SITE_URL } from "@/lib/site";
import { getDictionary } from "@/i18n/dictionary";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = ABOUT_STRINGS[locale];
  return pageMetadata({ locale, path: ABOUT_PATH, title: t.metaTitle, description: t.metaDescription });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = ABOUT_STRINGS[locale];
  const d = getDictionary(locale);
  const url = `${SITE_URL}/${locale}${ABOUT_PATH}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${url}#page`,
    url,
    name: t.metaTitle,
    description: t.metaDescription,
    inLanguage: locale,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": ORG_ID },
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_URL}/${FOUNDER_ID}`,
      name: FOUNDER_NAME,
      jobTitle: t.role,
      image: `${SITE_URL}${FOUNDER_PHOTO}`,
      worksFor: { "@id": ORG_ID },
      url,
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Nav />
      <main className="theme-light bg-bg text-text">
        <section className="border-b border-border pb-16 pt-32 md:pb-24 md:pt-40">
          <Container className="mx-auto max-w-4xl">
            <Reveal>
              <h1 className="text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[2.6rem] md:text-5xl">{t.heading}</h1>

              <div className="mt-10 grid gap-8 md:grid-cols-[240px_minmax(0,1fr)] md:gap-12">
                <div>
                  <Image
                    src={FOUNDER_PHOTO}
                    alt={FOUNDER_NAME}
                    width={720}
                    height={900}
                    priority
                    unoptimized
                    className="h-auto w-48 rounded-3xl object-cover md:w-full"
                  />
                  <p className="mt-3 text-base font-semibold">{FOUNDER_NAME}</p>
                  <p className="text-sm text-text-muted">{t.role}</p>
                </div>

                <div>
                  <p className="text-lg leading-relaxed">{t.intro}</p>

                  <h2 className="mt-10 text-xl font-semibold">{t.doTitle}</h2>
                  <ul className="mt-4 flex flex-col gap-3">
                    {t.doItems.map((item) => (
                      <li key={item} className="flex gap-3 text-base leading-relaxed">
                        <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-5 w-5 shrink-0" aria-hidden>
                          <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 rounded-2xl bg-surface p-6">
                    <h2 className="text-base font-semibold">{t.notTitle}</h2>
                    <p className="mt-2 text-[15px] leading-relaxed text-text-muted">{t.notBody}</p>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-3">
                    <PrimaryButton href={`/${locale}/particuliers`} className="px-6 py-3">
                      {d.footer.particuliers}
                    </PrimaryButton>
                    <Link
                      href={`/${locale}/entreprises`}
                      className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-text"
                    >
                      {d.footer.entreprises}
                    </Link>
                    <a
                      href="mailto:hey@thrax-legal.ch"
                      className="inline-flex items-center px-2 py-3 text-sm font-semibold underline underline-offset-4"
                    >
                      {t.contactCta}
                    </a>
                  </div>

                  <div className="mt-14 border-t border-border pt-6">
                    <h2 className="text-sm font-semibold text-text-muted">{t.idTitle}</h2>
                    <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm text-text-muted sm:grid-cols-[max-content_1fr]">
                      {t.idRows.map((row) => (
                        <div key={row.label} className="contents">
                          <dt>{row.label}</dt>
                          <dd className="text-text">{row.value.replace("{BCE}", BCE_NUMBER)}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-4 text-xs text-text-muted">
                      <Link href={`/${locale}/conditions-generales`} className="underline underline-offset-4 hover:text-text">
                        {d.footer.terms}
                      </Link>
                      {" · "}
                      <Link href={`/${locale}/confidentialite`} className="underline underline-offset-4 hover:text-text">
                        {d.footer.privacy}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
