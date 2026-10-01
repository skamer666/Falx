import Link from "next/link";
import SubmitButton from "@/components/account/SubmitButton";
import { INPUT, LABEL } from "@/components/account/ui";
import type { Locale } from "@/i18n/config";
import { LEAD_STRINGS } from "@/lib/account/lead-strings";
import { submitLead } from "@/app/[locale]/contact/actions";
import SourceField from "./SourceField";

/** Formulaire complet « Être rappelé » (utilisé sur la page d'accueil et sur /contact). */
export default function LeadForm({ locale, className = "" }: { locale: Locale; className?: string }) {
  const t = LEAD_STRINGS[locale];
  return (
    <form action={submitLead.bind(null, locale)} className={`relative flex flex-col gap-5 ${className}`}>
      <SourceField />
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
  );
}
