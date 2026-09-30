import Nav from "./Nav";
import Footer from "./Footer";
import { Container } from "./ui";
import SubmitButton from "@/components/account/SubmitButton";
import type { Locale } from "@/i18n/config";
import { CONTACT_EMAIL } from "@/lib/account/contact";
import { ACCOUNT_STRINGS, type BlockedState } from "@/lib/account/strings";
import { logout } from "@/app/[locale]/compte/actions";

/** Affiché à la place de l'espace client quand le compte n'est pas (ou plus) payé. */
export default function AccessBlocked({ locale, state, name }: { locale: Locale; state: BlockedState; name: string }) {
  const t = ACCOUNT_STRINGS[locale].blocked;
  const copy = t.states[state];
  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="theme-light flex min-h-screen items-center border-b border-border bg-bg pb-16 pt-32 md:pt-40">
          <Container className="mx-auto max-w-md text-center">
            <p className="text-sm text-text-muted">{name}</p>
            <h1 className="mt-2 text-[2rem] font-semibold leading-[1.15] tracking-[-0.02em] text-text">{copy.heading}</h1>
            <p className="mt-3 text-base leading-relaxed text-text-muted">{copy.body}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-colors duration-200 hover:bg-accent-hover"
              >
                {t.contact}
              </a>
              <form action={logout.bind(null, locale)}>
                <SubmitButton variant="ghost">{t.logout}</SubmitButton>
              </form>
            </div>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
