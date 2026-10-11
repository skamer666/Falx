"use client";

import Link from "next/link";
import SubmitButton from "@/components/account/SubmitButton";
import SourceField from "@/components/site/SourceField";
import type { Locale } from "@/i18n/config";
import type { Audience } from "@/lib/services/catalog";
import { SERVICES_UI } from "@/lib/services/strings";
import { ACCOUNT_STRINGS } from "@/lib/account/strings";
import { submitQuote } from "@/app/[locale]/commande/actions";
import { validateOrder, type OrderField } from "@/lib/account/lead-validation";
import { useInlineValidation } from "@/components/site/useInlineValidation";

const INPUT =
  "mt-1.5 w-full rounded-xl border border-white/15 bg-bg px-4 py-3 text-base text-text placeholder:text-text-muted/70 focus:border-text focus:outline-none";
const LABEL = "text-sm font-medium text-text";
const INVALID = "!border-danger";
const INVALID_BOX = "outline outline-2 outline-offset-2 outline-danger";
const ORDER: OrderField[] = ["situation", "name", "email", "phone", "terms", "ai"];

/** Formulaire de demande de devis (section « Votre problème n'est pas dans la liste ? »). */
export default function QuoteForm({ locale, audience, error }: { locale: Locale; audience: Audience; error?: string }) {
  const ui = SERVICES_UI[locale];
  const q = ui.quote;
  const form = ui.form;
  const ai = ACCOUNT_STRINGS[locale].signup;
  const errorMessage = error === "generic" || error === "consent" || error === "throttled" ? form.errors[error] : null;
  const id = (name: string) => `quote-${name}`;
  const { errors, hasErrors, onSubmit, onChange } = useInlineValidation(ORDER, (data) => validateOrder(data, { companyRequired: false }));
  const err = (name: OrderField) =>
    errors[name] ? (
      <p id={id(`${name}-error`)} className="mt-1.5 text-sm leading-snug text-danger">
        {form.fieldErrors[name]}
      </p>
    ) : null;
  const aria = (name: OrderField) => (errors[name] ? { "aria-invalid": true as const, "aria-describedby": id(`${name}-error`) } : {});

  return (
    <form
      action={submitQuote.bind(null, locale, audience)}
      onSubmit={onSubmit}
      onChange={onChange}
      noValidate
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
          className={`${INPUT} resize-y leading-relaxed ${errors.situation ? INVALID : ""}`}
          {...aria("situation")}
        />
        {err("situation")}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className={LABEL}>
            {form.name}
          </label>
          <input id={id("name")} name="name" required minLength={2} autoComplete="name" className={`${INPUT} ${errors.name ? INVALID : ""}`} {...aria("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor={id("email")} className={LABEL}>
            {form.email}
          </label>
          <input id={id("email")} name="email" type="email" required autoComplete="email" inputMode="email" className={`${INPUT} ${errors.email ? INVALID : ""}`} {...aria("email")} />
          {err("email")}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("phone")} className={LABEL}>
            {form.phone}
          </label>
          <input id={id("phone")} name="phone" type="tel" autoComplete="tel" placeholder="+41 79 000 00 00" className={`${INPUT} ${errors.phone ? INVALID : ""}`} {...aria("phone")} />
          {err("phone")}
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
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-text-muted">
          <input type="checkbox" name="terms" required className={`mt-0.5 h-5 w-5 shrink-0 accent-text ${errors.terms ? INVALID_BOX : ""}`} {...aria("terms")} />
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
        {err("terms")}
      </div>
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-text-muted">
          <input type="checkbox" name="ai" required className={`mt-0.5 h-5 w-5 shrink-0 accent-text ${errors.ai ? INVALID_BOX : ""}`} {...aria("ai")} />
          <span>{ai.aiLabel}</span>
        </label>
        {err("ai")}
      </div>
      {hasErrors ? (
        <p role="alert" className="text-sm font-medium text-danger">
          {form.fieldErrors.summary}
        </p>
      ) : null}
      <SubmitButton className="mt-1 min-h-14 w-full text-base font-semibold">{q.submit}</SubmitButton>
    </form>
  );
}
