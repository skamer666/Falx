import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { Container } from "@/components/site/ui";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { BCE_NUMBER } from "@/lib/account/legal";
import { LEGAL_NOTICE, LEGAL_NOTICE_PATH } from "@/lib/legal-notice";
import { getDictionary } from "@/i18n/dictionary";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = LEGAL_NOTICE[locale];
  return pageMetadata({ locale, path: LEGAL_NOTICE_PATH, title: t.metaTitle, description: t.metaDescription });
}

export default async function LegalNoticePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = LEGAL_NOTICE[locale];
  const d = getDictionary(locale);
  return (
    <>
      <Nav />
      <main className="theme-light bg-bg text-text">
        <section className="border-b border-border pb-16 pt-32 md:pb-24 md:pt-40">
          <Container className="mx-auto max-w-2xl">
            <h1 className="text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">{t.heading}</h1>
            <p className="mt-4 text-base leading-relaxed text-text-muted">{t.intro}</p>

            <dl className="mt-8 divide-y divide-border border-y border-border text-[15px]">
              {t.rows.map((row) => (
                <div key={row.label} className="grid gap-1 py-3 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <dt className="text-text-muted">{row.label}</dt>
                  <dd className="font-medium">
                    {row.label.toLowerCase().includes("mail") ? (
                      <a href={`mailto:${row.value}`} className="underline underline-offset-4">
                        {row.value}
                      </a>
                    ) : (
                      row.value.replace("{BCE}", BCE_NUMBER)
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-10 text-lg font-semibold">{t.hostTitle}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-text-muted">{t.host}</p>

            <h2 className="mt-8 text-lg font-semibold">{t.pricesTitle}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-text-muted">{t.prices}</p>

            <p className="mt-10 text-sm text-text-muted">
              {t.moreTitle} :{" "}
              <Link href={`/${locale}/conditions-generales`} className="text-text underline underline-offset-4">
                {d.footer.terms}
              </Link>
              {" · "}
              <Link href={`/${locale}/confidentialite`} className="text-text underline underline-offset-4">
                {d.footer.privacy}
              </Link>
            </p>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
