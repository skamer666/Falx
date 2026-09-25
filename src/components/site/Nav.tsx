"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { PrimaryButton } from "./ui";

const LINKS = [
  { href: "/#offre", label: "Tarifs" },
  { href: "/suivi-conformite", label: "Suivi Conformité" },
  { href: "/#contact", label: "FAQ" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 md:top-6">
      <div className="relative flex h-16 w-full max-w-6xl items-center justify-between rounded-full border border-border bg-surface/95 px-5 shadow-[0_12px_36px_-16px_rgba(0,0,0,0.6)] backdrop-blur-md md:px-7">
        <Link
          href="/"
          aria-label="Thrax Legal, accueil"
          className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-sm border-b pb-0.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
                  isActive
                    ? "border-text text-text"
                    : "border-transparent text-text hover:border-text/40"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <PrimaryButton href="/#diagnostic" className="px-5 py-2.5">
              Diagnostic gratuit en 2 min
            </PrimaryButton>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
