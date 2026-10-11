"use client";

import Link from "next/link";
import { useActionState, useRef, useState, type FormEvent } from "react";
import SubmitButton from "@/components/account/SubmitButton";
import { INPUT, LABEL, Notice } from "@/components/account/ui";
import type { Locale } from "@/i18n/config";
import { LEAD_STRINGS } from "@/lib/account/lead-strings";
import { validateLead, type LeadField, type LeadFieldErrors } from "@/lib/account/lead-validation";
import { submitLead, type LeadFormState } from "@/app/[locale]/contact/actions";
import SourceField from "./SourceField";

const ORDER: LeadField[] = ["name", "email", "phone", "consent"];
const INVALID = "!border-danger";

function readErrors(form: HTMLFormElement): LeadFieldErrors {
  const data = new FormData(form);
  return validateLead({
    name: String(data.get("name") ?? ""),
    email: String(data.get("email") ?? ""),
    phone: String(data.get("phone") ?? ""),
    consent: data.get("consent") === "on",
  });
}

/** Formulaire complet « Être rappelé » (page d'accueil, /entreprises, /contact…). */
export default function LeadForm({ locale, className = "" }: { locale: Locale; className?: string }) {
  const t = LEAD_STRINGS[locale];
  const [state, formAction] = useActionState<LeadFormState, FormData>(submitLead.bind(null, locale), null);
  // Erreurs vues dans le navigateur ; après une tentative d'envoi, elles se mettent à jour à chaque frappe.
  const [clientErrors, setClientErrors] = useState<LeadFieldErrors | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const errors: LeadFieldErrors = clientErrors ?? state?.errors ?? {};
  const hasErrors = Object.keys(errors).length > 0;
  const message: Record<LeadField, string> = { name: t.errorName, email: t.errorEmail, phone: t.errorPhone, consent: t.errorConsent };
  const values = state?.values ?? {};

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const js = event.currentTarget.elements.namedItem("js");
    if (js instanceof HTMLInputElement) js.value = "1";
    const found = readErrors(event.currentTarget);
    setClientErrors(found);
    const first = ORDER.find((name) => found[name]);
    if (!first) return;
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem(first);
    if (input instanceof HTMLElement) {
      input.focus();
      input.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }

  function onChange() {
    if (clientErrors && formRef.current) setClientErrors(readErrors(formRef.current));
  }

  const err = (name: LeadField) =>
    errors[name] ? (
      <p id={`lead-${name}-error`} className="mt-2 text-sm leading-snug text-danger">
        {message[name]}
      </p>
    ) : null;
  const aria = (name: LeadField) =>
    errors[name] ? { "aria-invalid": true as const, "aria-describedby": `lead-${name}-error` } : {};

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      onChange={onChange}
      noValidate
      className={`relative flex flex-col gap-5 ${className}`}
    >
      <SourceField />
      {/* Rempli à l'envoi par JavaScript : le serveur peut alors renvoyer les erreurs sur place. */}
      <input type="hidden" name="js" defaultValue="" />
      {/* Champ piège à robots, invisible pour les humains. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {state?.throttled ? <Notice tone="error">{t.errorThrottled}</Notice> : null}
      <div>
        <label htmlFor="name" className={LABEL}>
          {t.nameLabel}
        </label>
        <input
          id="name"
          name="name"
          required
          minLength={2}
          autoComplete="name"
          defaultValue={values.name}
          className={`${INPUT} ${errors.name ? INVALID : ""}`}
          {...aria("name")}
        />
        {err("name")}
      </div>
      <div>
        <label htmlFor="email" className={LABEL}>
          {t.emailLabel}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          defaultValue={values.email}
          className={`${INPUT} ${errors.email ? INVALID : ""}`}
          {...aria("email")}
        />
        {err("email")}
      </div>
      <div>
        <label htmlFor="phone" className={LABEL}>
          {t.phoneLabel}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+41 79 000 00 00"
          defaultValue={values.phone}
          className={`${INPUT} ${errors.phone ? INVALID : ""}`}
          {...aria("phone")}
        />
        {err("phone")}
      </div>
      <div>
        <label htmlFor="company" className={LABEL}>
          {t.companyLabel}
        </label>
        <input id="company" name="company" autoComplete="organization" defaultValue={values.company} className={INPUT} />
      </div>
      <div>
        <label htmlFor="plan" className={LABEL}>
          {t.planLabel}
        </label>
        <select id="plan" name="plan" defaultValue={values.plan ?? ""} className={INPUT}>
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
          defaultValue={values.message}
          className={`${INPUT} resize-y leading-relaxed`}
        />
      </div>
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-text-muted">
          <input
            type="checkbox"
            name="consent"
            required
            className={`mt-1 h-4 w-4 shrink-0 accent-text ${errors.consent ? "outline outline-2 outline-offset-2 outline-danger" : ""}`}
            {...aria("consent")}
          />
          <span>
            {t.consentBefore}
            <Link href={`/${locale}/confidentialite`} target="_blank" className="text-text underline underline-offset-4">
              {t.consentLink}
            </Link>
            {t.consentAfter}
          </span>
        </label>
        {err("consent")}
      </div>
      {hasErrors ? (
        <p role="alert" className="text-sm font-medium text-danger">
          {t.errorSummary}
        </p>
      ) : null}
      <SubmitButton className="w-full">{t.cta}</SubmitButton>
    </form>
  );
}
