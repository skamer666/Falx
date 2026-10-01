import Link from "next/link";
import SubmitButton from "@/components/account/SubmitButton";
import SourceField from "@/components/site/SourceField";
import { Container } from "@/components/site/ui";
import type { Locale } from "@/i18n/config";
import type { Audience } from "@/lib/services/catalog";
import { SERVICES_UI } from "@/lib/services/strings";
import { ACCOUNT_STRINGS } from "@/lib/account/strings";
import { submitQuote } from "@/app/[locale]/commande/actions";

const INPUT =
  "mt-1.5 w-full rounded-xl border border-white/15 bg-bg px-4 py-3 text-base text-text placeholder:text-text-muted/70 focus:border-text focus:outline-none";
const LABEL = "text-sm font-medium text-text";

/** Grande section « Votre problème n'est pas dans la liste ? » avec formulaire de demande de devis. */
export default function QuoteSection({ locale, audience, error }: { locale: Locale; audience: Audience; error?: string }) {
  const ui = SERVICES_UI[locale];
  const q = ui.quote;
  const form = ui.form;
  const ai = ACCOUNT_STRINGS[locale].signup;
  const errorMessage = error === "generic" || error === "consent" || error === "throttled" ? form.errors[error] : null;
  const id = (name: string) => `quote-${name}`;

  return (
    <section id="devis" className="scroll-mt-24 border-y border-white/10 bg-[#0a0a0b] py-16 text-text md:py-24">
      <Container className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
        <div>
          <h2 className="text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-5xl md:text-6xl">{q.title}</h2>
          <p className="mt-5 text-xl leading-relaxed text-text-muted md:text-2xl">{q.body}</p>
          <ul className="mt-8 space-y-3">
            {q.points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-base md:text-lg">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-text text-bg">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
                    <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <form
          action={submitQuote.bind(null, locale, audience)}
          className="relative flex flex-col gap-4 rounded-3xl border border-white/12 bg-surface p-6 md:p-8"
        >
          <SourceField />
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor={id("website")}>Website</label>
            <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          {errorMessage ? (
            <p role="alert" className="rounded-xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger">
              {errorMessage}
            </p>
          ) : null}
          <div>
            <label htmlFor={id("situation")} className={LABEL}>
              {q.situation}
            </label>
            <textarea
              id={id("situation")}
              name="situation"
              required
              minLength={10}
              rows={5}
              maxLength={4000}
              placeholder={q.situationPlaceholder[audience]}
              className={`${INPUT} resize-y leading-relaxed`}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={id("name")} className={LABEL}>
                {form.name}
              </label>
              <input id={id("name")} name="name" required minLength={2} autoComplete="name" className={INPUT} />
            </div>
            <div>
              <label htmlFor={id("email")} className={LABEL}>
                {form.email}
              </label>
              <input id={id("email")} name="email" type="email" required autoComplete="email" className={INPUT} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={id("phone")} className={LABEL}>
                {form.phone}
              </label>
              <input id={id("phone")} name="phone" type="tel" autoComplete="tel" placeholder="+41 79 000 00 00" className={INPUT} />
            </div>
            {audience === "entreprises" ? (
              <div>
                <label htmlFor={id("company")} className={LABEL}>
                  {form.company}
                </label>
                <input id={id("company")} name="company" autoComplete="organization" className={INPUT} />
              </div>
            ) : null}
          </div>
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-text-muted">
            <input type="checkbox" name="terms" required className="mt-0.5 h-5 w-5 shrink-0 accent-text" />
            <span>
              {form.termsBefore}
              <Link href={`/${locale}/conditions-generales`} target="_blank" className="text-text underline underline-offset-4">
                {form.termsLink}
              </Link>
              {form.termsAnd}
              <Link href={`/${locale}/confidentialite`} target="_blank" className="text-text underline underline-offset-4">
                {form.consentLink}
              </Link>
              .
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-text-muted">
            <input type="checkbox" name="ai" required className="mt-0.5 h-5 w-5 shrink-0 accent-text" />
            <span>{ai.aiLabel}</span>
          </label>
          <SubmitButton className="mt-1 min-h-14 w-full text-base font-semibold">{q.submit}</SubmitButton>
        </form>
      </Container>
    </section>
  );
}
