import Link from "next/link";
import Logo from "./Logo";
import { Container } from "./ui";

const MENU = [
  { number: "001", label: "Accueil", href: "/" },
  { number: "002", label: "Services", href: "/services" },
  { number: "003", label: "Abonnement PME", href: "/abonnement-pme" },
  { number: "004", label: "Contact", href: "/#contact" },
];

const COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Certificat de travail", href: "/services/certificat-travail" },
      { label: "Recouvrement", href: "/services/recouvrement" },
      { label: "Hausse de loyer", href: "/services/hausse-loyer" },
      { label: "Création de Sàrl", href: "/services/creation-sarl" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Conditions générales", href: "#" },
      { label: "Politique de confidentialité", href: "#" },
      { label: "Mentions légales", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_2fr]">
          <div>
            <Link href="/" aria-label="Thrax Legal, accueil">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
              Une infrastructure juridique structurée pour les PME et les
              particuliers suisses. Prix fixes, exécution rapide.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
              Menu
            </p>
            <ul className="mt-4 space-y-3">
              {MENU.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-baseline gap-3 text-sm text-text-muted transition-colors hover:text-text"
                  >
                    <span className="text-xs text-text-muted/60">
                      {item.number}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-muted transition-colors hover:text-text"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 text-xs text-text-muted md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Thrax Legal. Tous droits réservés.</p>
          <p>Suisse romande &middot; FR</p>
        </div>
      </Container>
    </footer>
  );
}
