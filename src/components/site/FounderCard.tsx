import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { ABOUT_PATH, ABOUT_STRINGS, FOUNDER_NAME, FOUNDER_THUMB } from "@/lib/about";

/** Petite carte de confiance près du bouton de commande : visage, nom et une phrase, sans prendre la place de l'offre. */
export default function FounderCard({ locale }: { locale: Locale }) {
  const t = ABOUT_STRINGS[locale];
  return (
    <div className="mt-5 flex items-start gap-4 rounded-2xl border border-border bg-bg p-4">
      <Image
        src={FOUNDER_THUMB}
        alt={FOUNDER_NAME}
        width={64}
        height={64}
        unoptimized
        className="h-16 w-16 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0 text-sm leading-relaxed">
        <p className="font-semibold text-text">
          {FOUNDER_NAME} <span className="font-normal text-text-muted">· {t.role}</span>
        </p>
        <p className="mt-1 text-text-muted">{t.cardLine}</p>
        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          <a href="mailto:hey@thrax-legal.ch" className="font-semibold text-text underline underline-offset-4">
            {t.cardWrite}
          </a>
          <Link href={`/${locale}${ABOUT_PATH}`} className="text-text-muted underline underline-offset-4 hover:text-text">
            {t.cardCta}
          </Link>
        </p>
      </div>
    </div>
  );
}

/** Ligne discrète sous le titre : le visage est visible dès l'arrivée sur la page, avant même de descendre au formulaire. */
export function FounderMini({ locale }: { locale: Locale }) {
  const t = ABOUT_STRINGS[locale];
  return (
    <Link href={`/${locale}${ABOUT_PATH}`} className="mt-4 inline-flex items-center gap-3 text-sm text-text-muted hover:text-text">
      <Image
        src={FOUNDER_THUMB}
        alt=""
        width={36}
        height={36}
        unoptimized
        className="h-9 w-9 shrink-0 rounded-full object-cover"
      />
      <span>
        <span className="font-semibold text-text">{FOUNDER_NAME}</span>
        {" · "}
        {t.miniReply}
      </span>
    </Link>
  );
}
