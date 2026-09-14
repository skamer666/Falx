import Link from "next/link";
import { Container } from "./ui";

const COLUMNS = [
  {
    title: "Produits",
    links: ["Création de Sàrl", "Conformité LPD", "Contrats PME", "Tarifs"],
  },
  {
    title: "Ressources",
    links: ["Centre d'aide", "Guide de la Sàrl", "Blog juridique", "API"],
  },
  {
    title: "Entreprise",
    links: ["À propos", "Carrières", "Partenaires juristes", "Contact"],
  },
  {
    title: "Légal",
    links: [
      "Conditions générales",
      "Politique de confidentialité",
      "Mentions légales",
      "Sécurité",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ligne bg-papier">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_2fr]">
          <div>
            <Link href="#" className="font-serif-display text-xl text-ink">
              Falx
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              L&rsquo;infrastructure juridique de la Suisse qui entreprend.
              Génération automatisée de documents, conforme au droit suisse.
            </p>
            <div className="mt-6 flex gap-4 text-sm text-ink-muted">
              <Link href="#" className="hover:text-ink">
                LinkedIn
              </Link>
              <Link href="#" className="hover:text-ink">
                X
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-sm text-ink-muted transition-colors hover:text-ink"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ligne pt-8 text-xs text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Falx. Tous droits réservés.</p>
          <p>Lausanne, Suisse &middot; FR · DE · IT · EN</p>
        </div>
      </Container>
    </footer>
  );
}
