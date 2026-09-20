"use client";

import Link from "next/link";
import { useState } from "react";
import { PrimaryButton } from "./ui";

const LINKS = [
  { href: "#produits", label: "Produits" },
  { href: "#securite", label: "Sécurité" },
  { href: "#tarifs", label: "Tarifs" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-ligne text-ink"
      >
        <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
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
      </button>

      {open ? (
        <div className="absolute inset-x-0 top-[calc(100%+12px)] rounded-3xl border border-ligne bg-papier px-6 py-6 shadow-[0_20px_50px_-20px_rgba(11,15,20,0.35)]">
          <nav className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base text-ink transition-colors hover:bg-papier-dim"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#connexion"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-base text-ink-muted transition-colors hover:bg-papier-dim"
            >
              Se connecter
            </Link>
          </nav>
          <PrimaryButton href="#demarrer" className="mt-4 w-full">
            Démarrer ma Sàrl
          </PrimaryButton>
        </div>
      ) : null}
    </div>
  );
}
