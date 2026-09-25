"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PrimaryButton } from "./ui";

const LINKS = [
  { href: "/#offre", label: "Tarifs" },
  { href: "/suivi-conformite", label: "Suivi Conformité" },
  { href: "/guide", label: "Guide" },
  { href: "/#contact", label: "FAQ" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
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
        {open ? "Fermer" : "Menu"}
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
          <PrimaryButton href="/#diagnostic" className="mt-4 w-full" onClick={() => setOpen(false)}>
            Diagnostic gratuit en 2 min
          </PrimaryButton>
        </div>
      ) : null}
    </div>
  );
}
