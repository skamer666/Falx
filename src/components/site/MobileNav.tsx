"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useState } from "react";
import { PrimaryButton } from "./ui";
import LocaleSwitcher from "./LocaleSwitcher";
import { getDictionary } from "@/i18n/dictionary";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const rawLocale = typeof params.locale === "string" ? params.locale : DEFAULT_LOCALE;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = getDictionary(locale).nav;

  const LINKS = [
    { href: `/${locale}/#offre`, label: t.pricing },
    { href: `/${locale}/suivi-conformite`, label: t.monitoring },
    { href: `/${locale}/guide`, label: t.guide },
    { href: `/${locale}/#contact`, label: t.faq },
  ];

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? t.menuClose : t.menuOpen}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 items-center gap-2 rounded-full border border-border px-3 text-sm font-medium text-text"
      >
        <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 shrink-0">
          {open ? (
            <path
              d="M3 3L13 13M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M2 4.5H14M2 8H14M2 11.5H14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          )}
        </svg>
        {open ? t.menuCloseLabel : t.menuLabel}
      </button>

      {open ? (
        <div className="absolute inset-x-0 top-[calc(100%+12px)] rounded-3xl border border-border bg-surface px-6 py-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
          <nav aria-label="Navigation principale" className="flex flex-col gap-1">
            {LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-lg px-2 py-3 text-base transition-colors hover:bg-surface-hover ${
                    isActive ? "font-semibold text-text" : "text-text"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <LocaleSwitcher locale={locale} pathname={pathname} className="mt-4 flex justify-center" />
          <PrimaryButton
            href={`/${locale}/#diagnostic`}
            className="mt-4 w-full"
            onClick={() => setOpen(false)}
          >
            {t.diagnosticCta}
          </PrimaryButton>
        </div>
      ) : null}
    </div>
  );
}
