import Link from "next/link";
import Logo from "./Logo";
import { Container } from "./ui";

const MENU = [
  { number: "001", label: "Accueil", href: "/" },
  { number: "002", label: "Diagnostic gratuit", href: "/#diagnostic" },
  { number: "003", label: "Suivi Conformité", href: "/suivi-conformite" },
  { number: "004", label: "FAQ", href: "/#contact" },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 shrink-0">
      <path
        d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr_1.2fr]">
          <div>
            <Link href="/" aria-label="Thrax Legal, accueil">
              <Logo />
            </Link>
            <h2 className="mt-6 text-2xl font-semibold leading-tight tracking-[-0.02em] text-text">
              La conformité nLPD de votre PME, à prix fixe.
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
              Thrax Legal met les PME suisses en conformité avec la nLPD :
              registre des traitements, politique de confidentialité,
              contrats de sous-traitance.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
              Nous contacter
            </p>
            <p className="mt-4 text-sm text-text">hey@thraxlegal.ch</p>

            <p className="mt-8 text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
              Horaires
            </p>
            <p className="mt-4 text-sm text-text">Lundi à vendredi</p>
            <p className="text-sm text-text">09:00 à 18:00</p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
              Menu
            </p>
            <ul className="mt-4 divide-y divide-border border-t border-border">
              {MENU.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between gap-3 py-3 text-sm text-text-muted transition-colors hover:text-text"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="text-xs text-text-muted/60">
                        {item.number}
                      </span>
                      {item.label}
                    </span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      <ArrowIcon />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-16 max-w-2xl text-xs leading-relaxed text-text-muted">
          Thrax Legal n&rsquo;est pas un cabinet d&rsquo;avocats : nous ne
          portons pas le titre d&rsquo;avocat et n&rsquo;assurons pas la
          représentation devant les tribunaux, réservée aux avocats inscrits
          à un registre cantonal suisse. Pour toute procédure contentieuse
          nécessitant une représentation, nous vous orientons vers un
          avocat.
        </p>

        <p
          aria-hidden
          className="mt-8 select-none text-[16vw] font-semibold leading-none tracking-[-0.03em] text-text/90 md:text-[9rem]"
        >
          Thrax Legal
        </p>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-8 text-xs text-text-muted md:flex-row md:items-center md:justify-between">
          <Link href="#" className="transition-colors hover:text-text">
            Conditions générales
          </Link>
          <p>Suisse romande &middot; FR</p>
          <p>&copy; {new Date().getFullYear()} Thrax Legal. Tous droits réservés.</p>
        </div>
      </Container>
    </footer>
  );
}
