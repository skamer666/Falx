"use client";

import { useState } from "react";
import Link from "next/link";
import SubmitButton from "@/components/account/SubmitButton";
import SourceField from "@/components/site/SourceField";
import type { Locale } from "@/i18n/config";
import type { ServiceDef } from "@/lib/services/catalog";
import { SERVICES_UI } from "@/lib/services/strings";
import { ACCOUNT_STRINGS } from "@/lib/account/strings";
import { submitOrder } from "@/app/[locale]/commande/actions";
import { validateOrder, type OrderField } from "@/lib/account/lead-validation";
import { useInlineValidation } from "@/components/site/useInlineValidation";

const ORDER: OrderField[] = ["name", "email", "phone", "company", "situation", "terms"];
const INVALID = "!border-danger";
const INVALID_BOX = "outline outline-2 outline-offset-2 outline-danger";

const INPUT =
  "mt-1.5 w-full rounded-xl border border-border bg-bg px-4 py-3 text-base text-text placeholder:text-text-muted/70 focus:border-text focus:outline-none";
const LABEL = "text-sm font-medium text-text";

const MORE: Record<Locale, string> = {
  fr: "Ajouter un téléphone ou une date limite (facultatif)",
  de: "Telefon oder Frist hinzufügen (freiwillig)",
  en: "Add a phone number or a deadline (optional)",
  it: "Aggiungere un telefono o una scadenza (facoltativo)",
};

/** Formulaire de commande d'une prestation à l'acte (aucun paiement à cette étape). */
export default function OrderForm({
  locale,
  service,
  submitLabel,
  submitLabelExpress,
  error,
}: {
  locale: Locale;
  service: ServiceDef;
  submitLabel: string;
  /** Libellé du bouton quand l'option express est cochée (prix de base + supplément). */
  submitLabelExpress?: string;
  error?: string;
}) {
  const [express, setExpress] = useState(false);
  const t = SERVICES_UI[locale].form;
  const ai = ACCOUNT_STRINGS[locale].signup;
  const errorMessage = error === "generic" || error === "consent" || error === "throttled" ? t.errors[error] : null;
  const id = (name: string) => `order-${name}`;
  const companyRequired = service.audience === "entreprises";
  const { errors, hasErrors, onSubmit, onChange } = useInlineValidation(ORDER, (data) => validateOrder(data, { companyRequired }));
  const err = (name: OrderField) =>
    errors[name] ? (
      <p id={id(`${name}-error`)} className="mt-1.5 text-sm leading-snug text-danger">
        {t.fieldErrors[name]}
      </p>
    ) : null;
  const aria = (name: OrderField) => (errors[name] ? { "aria-invalid": true as const, "aria-describedby": id(`${name}-error`) } : {});

  return (
    <form
      action={submitOrder.bind(null, locale, service.slug)}
      onSubmit={onSubmit}
      onChange={onChange}
      noValidate
      className="relative flex flex-col gap-4"
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
        <label htmlFor={id("name")} className={LABEL}>
          {t.name}
        </label>
        <input id={id("name")} name="name" required minLength={2} autoComplete="name" className={`${INPUT} ${errors.name ? INVALID : ""}`} {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor={id("email")} className={LABEL}>
          {t.email}
        </label>
        <input id={id("email")} name="email" type="email" required autoComplete="email" inputMode="email" className={`${INPUT} ${errors.email ? INVALID : ""}`} {...aria("email")} />
        {err("email")}
      </div>
      {service.audience === "entreprises" ? (
        <div>
          <label htmlFor={id("company")} className={LABEL}>
            {t.company}
          </label>
          <input id={id("company")} name="company" required autoComplete="organization" className={`${INPUT} ${errors.company ? INVALID : ""}`} {...aria("company")} />
          {err("company")}
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
          className={`${INPUT} resize-y leading-relaxed ${errors.situation ? INVALID : ""}`}
          {...aria("situation")}
        />
        {err("situation")}
      </div>
      <details open={Boolean(errors.phone)} className="group rounded-xl border border-border bg-bg px-4 py-3">
        <summary className="cursor-pointer list-none text-sm font-medium text-text-muted marker:hidden hover:text-text [&::-webkit-details-marker]:hidden">
          + {MORE[locale]}
        </summary>
        <div className="mt-3 flex flex-col gap-4">
      <div>
        <label htmlFor={id("phone")} className={LABEL}>
          {t.phone}
        </label>
        <input id={id("phone")} name="phone" type="tel" autoComplete="tel" placeholder="+41 79 000 00 00" className={`${INPUT} ${errors.phone ? INVALID : ""}`} {...aria("phone")} />
        {err("phone")}
      </div>
      <div>
        <label htmlFor={id("deadline")} className={LABEL}>
          {t.deadline}
        </label>
        <input id={id("deadline")} name="deadline" type="date" className={INPUT} />
      </div>

        </div>
      </details>

      {service.express ? (
        <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-border bg-bg px-4 py-3.5 has-checked:border-text">
          <span>
            <span className="block text-sm font-semibold text-text">{t.express}</span>
            <span className="block text-xs text-text-muted">{t.expressHint}</span>
          </span>
          <input type="checkbox" name="express" checked={express} onChange={(event) => setExpress(event.currentTarget.checked)} className="h-5 w-5 shrink-0 accent-text" />
        </label>
      ) : null}

      <p className="text-xs leading-relaxed text-text-muted">{t.filesNote}</p>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-text-muted">
          <input type="checkbox" name="terms" required className={`mt-0.5 h-5 w-5 shrink-0 accent-text ${errors.terms ? INVALID_BOX : ""}`} {...aria("terms")} />
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
            <span className="mt-1.5 block text-xs text-text-muted/90">{ai.aiNote}</span>
          </span>
        </label>
        {err("terms")}
      </div>

      {hasErrors ? (
        <p role="alert" className="text-sm font-medium text-danger">
          {t.fieldErrors.summary}
        </p>
      ) : null}

      <SubmitButton className="mt-1 min-h-14 w-full text-base font-semibold">{express && submitLabelExpress ? submitLabelExpress : submitLabel}</SubmitButton>
    </form>
  );
}
