import Link from "next/link";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { PrimaryButton } from "./ui";

const LINKS = [
  { href: "#produits", label: "Produits" },
  { href: "#comment-ca-marche", label: "Comment ça marche" },
  { href: "#securite", label: "Sécurité" },
  { href: "#tarifs", label: "Tarifs" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 md:top-6">
      <div className="relative flex h-16 w-full max-w-6xl items-center justify-between rounded-full border border-ligne/60 bg-papier/90 px-5 shadow-[0_12px_36px_-16px_rgba(11,15,20,0.25)] backdrop-blur-md md:px-7">
        <Link
          href="#"
          aria-label="Falx, accueil"
          className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapin focus-visible:ring-offset-2 focus-visible:ring-offset-papier"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm text-sm text-ink-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapin focus-visible:ring-offset-2 focus-visible:ring-offset-papier"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="#connexion"
            className="hidden rounded-sm text-sm font-medium text-ink-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sapin focus-visible:ring-offset-2 focus-visible:ring-offset-papier sm:block"
          >
            Se connecter
          </Link>
          <div className="hidden sm:block">
            <PrimaryButton href="#demarrer" className="px-5 py-2.5">
              Démarrer ma Sàrl
            </PrimaryButton>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
