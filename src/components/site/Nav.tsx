import Link from "next/link";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { PrimaryButton } from "./ui";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/abonnement-pme", label: "Abonnement PME" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          aria-label="Thrax Legal, accueil"
          className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm text-sm text-text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <PrimaryButton href="/abonnement-pme" className="px-5 py-2.5">
              Découvrir l&rsquo;abonnement PME
            </PrimaryButton>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
