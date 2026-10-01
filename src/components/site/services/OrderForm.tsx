import Link from "next/link";
import SubmitButton from "@/components/account/SubmitButton";
import SourceField from "@/components/site/SourceField";
import type { Locale } from "@/i18n/config";
import type { ServiceDef } from "@/lib/services/catalog";
import { SERVICES_UI } from "@/lib/services/strings";
import { ACCOUNT_STRINGS } from "@/lib/account/strings";
import { submitOrder } from "@/app/[locale]/commande/actions";

const INPUT =
  "mt-1.5 w-full rounded-xl border border-border bg-bg px-4 py-3 text-base text-text placeholder:text-text-muted/70 focus:border-text focus:outline-none";
const LABEL = "text-sm font-medium text-text";

/** Formulaire de commande d'une prestation à l'acte (aucun paiement à cette étape). */
export default function OrderForm({
  locale,
  service,
  submitLabel,
  error,
}: {
  locale: Locale;
  service: ServiceDef;
  submitLabel: string;
  error?: string;
}) {
  const t = SERVICES_UI[locale].form;
  const ai = ACCOUNT_STRINGS[locale].signup;
  const errorMessage = error === "generic" || error === "consent" || error === "throttled" ? t.errors[error] : null;
  const id = (name: string) => `order-${name}`;

  return (
    <form action={submitOrder.bind(null, locale, service.slug)} className="relative flex flex-col gap-4">
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
        <label htmlFor={id("name")} className={LABEL}>
          {t.name}
        </label>
        <input id={id("name")} name="name" required minLength={2} autoComplete="name" className={INPUT} />
      </div>
      <div>
        <label htmlFor={id("email")} className={LABEL}>
          {t.email}
        </label>
        <input id={id("email")} name="email" type="email" required autoComplete="email" className={INPUT} />
      </div>
      <div>
        <label htmlFor={id("phone")} className={LABEL}>
          {t.phone}
        </label>
        <input id={id("phone")} name="phone" type="tel" autoComplete="tel" placeholder="+41 79 000 00 00" className={INPUT} />
      </div>
      {service.audience === "entreprises" ? (
        <div>
          <label htmlFor={id("company")} className={LABEL}>
            {t.company}
          </label>
          <input id={id("company")} name="company" required autoComplete="organization" className={INPUT} />
        </div>
      ) : null}
      <div>
        <label htmlFor={id("situation")} className={LABEL}>
          {t.situation}
        </label>
        <textarea
          id={id("situation")}
          name="situation"
          required
          minLength={10}
          rows={4}
          maxLength={4000}
          placeholder={t.situationPlaceholder}
          className={`${INPUT} resize-y leading-relaxed`}
        />
      </div>
      <div>
        <label htmlFor={id("deadline")} className={LABEL}>
          {t.deadline}
        </label>
        <input id={id("deadline")} name="deadline" type="date" className={INPUT} />
      </div>

      {service.express ? (
        <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-border bg-bg px-4 py-3.5 has-checked:border-text">
          <span>
            <span className="block text-sm font-semibold text-text">{t.express}</span>
            <span className="block text-xs text-text-muted">{t.expressHint}</span>
          </span>
          <input type="checkbox" name="express" className="h-5 w-5 shrink-0 accent-text" />
        </label>
      ) : null}

      <p className="text-xs leading-relaxed text-text-muted">{t.filesNote}</p>

      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-text-muted">
        <input type="checkbox" name="terms" required className="mt-0.5 h-5 w-5 shrink-0 accent-text" />
        <span>
          {t.termsBefore}
          <Link href={`/${locale}/conditions-generales`} target="_blank" className="text-text underline underline-offset-4">
            {t.termsLink}
          </Link>
          {t.termsAnd}
          <Link href={`/${locale}/confidentialite`} target="_blank" className="text-text underline underline-offset-4">
            {t.consentLink}
          </Link>
          .
        </span>
      </label>
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-text-muted">
        <input type="checkbox" name="ai" required className="mt-0.5 h-5 w-5 shrink-0 accent-text" />
        <span>{ai.aiLabel}</span>
      </label>

      <SubmitButton className="mt-1 min-h-14 w-full text-base font-semibold">{submitLabel}</SubmitButton>
    </form>
  );
}
