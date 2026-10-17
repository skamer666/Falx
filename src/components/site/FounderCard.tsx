import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { ABOUT_PATH, ABOUT_STRINGS, FOUNDER_NAME, FOUNDER_THUMB } from "@/lib/about";

/** Rappel discret sous le bouton de commande : visage et une phrase, sans cadre ni lien de plus. */
export default function FounderCard({ locale }: { locale: Locale }) {
  const t = ABOUT_STRINGS[locale];
  return (
    <div className="mt-5 flex items-center gap-3 border-t border-border pt-4 text-sm leading-snug">
      <Image
        src={FOUNDER_THUMB}
        alt={FOUNDER_NAME}
        width={44}
        height={44}
        unoptimized
        className="h-11 w-11 shrink-0 rounded-full object-cover"
      />
      <p className="text-text-muted">
        {t.cardLine}{" "}
        <a href="mailto:hey@thrax-legal.ch" className="font-semibold text-text underline underline-offset-4">
          {t.cardWrite}
        </a>
      </p>
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
