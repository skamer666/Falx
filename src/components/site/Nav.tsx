import Link from "next/link";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { Container, PrimaryButton } from "./ui";

const LINKS = [
  { href: "#produits", label: "Produits" },
  { href: "#comment-ca-marche", label: "Comment ça marche" },
  { href: "#securite", label: "Sécurité" },
  { href: "#tarifs", label: "Tarifs" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-ligne/70 bg-papier/85 backdrop-blur-md relative">
      <Container className="flex h-[72px] items-center justify-between">
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
      </Container>
    </header>
  );
}
