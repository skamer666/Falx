import Link from "next/link";
import type { ReactNode } from "react";
import SubmitButton from "@/components/account/SubmitButton";
import { logout } from "@/app/[locale]/compte/actions";
import { ACCESS_LABEL } from "@/lib/account/admin-labels";
import type { AccessState, DossierStatus } from "@/lib/account/model";
import { DOSSIER_STATUS_LABEL } from "@/lib/account/admin-labels";

export type AdminSection = "overview" | "prospects" | "clients" | "dossiers" | "paiements" | "journal" | "parametres";

const NAV: { key: AdminSection; label: string; href: string }[] = [
  { key: "overview", label: "Vue d'ensemble", href: "/fr/admin" },
  { key: "prospects", label: "Prospects", href: "/fr/admin/prospects" },
  { key: "clients", label: "Clients", href: "/fr/admin/clients" },
  { key: "dossiers", label: "Demandes", href: "/fr/admin/dossiers" },
  { key: "paiements", label: "Paiements", href: "/fr/admin/paiements" },
  { key: "journal", label: "Journal", href: "/fr/admin/journal" },
  { key: "parametres", label: "Paramètres", href: "/fr/admin/parametres" },
];

export function AdminShell({
  active,
  adminEmail,
  badges,
  children,
}: {
  active: AdminSection;
  adminEmail: string;
  badges?: Partial<Record<AdminSection, number>>;
  children: ReactNode;
}) {
  return (
    <div className="theme-light min-h-screen bg-bg text-text lg:flex">
      <aside className="border-b border-border bg-surface lg:sticky lg:top-0 lg:h-screen lg:w-60 lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-3 px-5 py-4 lg:block">
          <div>
            <p className="text-[15px] font-semibold tracking-[-0.01em]">Thrax Legal</p>
            <p className="text-xs text-text-muted">Administration</p>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible lg:pb-0">
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`flex shrink-0 items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                active === item.key ? "bg-text font-medium text-bg" : "text-text-muted hover:bg-bg hover:text-text"
              }`}
            >
              {item.label}
              {badges?.[item.key] ? (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[11px] font-semibold leading-none ${
                    active === item.key ? "bg-bg text-text" : "bg-danger text-bg"
                  }`}
                >
                  {badges[item.key]}
                </span>
              ) : null}
            </Link>
          ))}
        </nav>
        <div className="hidden px-5 py-4 text-xs text-text-muted lg:absolute lg:bottom-0 lg:block lg:w-60">
          <p className="truncate">{adminEmail}</p>
          <div className="mt-2 flex items-center gap-3">
            <Link href="/fr" className="underline underline-offset-4 hover:text-text">
              Voir le site
            </Link>
            <form action={logout.bind(null, "fr")}>
              <button type="submit" className="underline underline-offset-4 hover:text-text">
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-5 py-8 md:px-10 md:py-10">
        <div className="mx-auto max-w-6xl">{children}</div>
        <div className="mx-auto mt-12 max-w-6xl border-t border-border pt-4 text-xs text-text-muted lg:hidden">
          <p className="truncate">{adminEmail}</p>
          <form action={logout.bind(null, "fr")} className="mt-1">
            <button type="submit" className="underline underline-offset-4">
              Déconnexion
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export function AdminDenied({ signedIn }: { signedIn: boolean }) {
  return (
    <div className="theme-light flex min-h-screen items-center justify-center bg-bg px-6 text-text">
      <div className="max-w-sm text-center">
        <h1 className="text-[1.75rem] font-semibold tracking-[-0.02em]">Accès réservé</h1>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">
          {signedIn
            ? "Ce compte n'a pas les droits d'administration."
            : "Connectez-vous avec le compte administrateur pour accéder à cette page."}
        </p>
        <Link
          href="/fr/compte"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg hover:bg-accent-hover"
        >
          {signedIn ? "Retour à mon espace" : "Se connecter"}
        </Link>
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-[1.75rem] font-semibold leading-tight tracking-[-0.02em]">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-text-muted">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function Card({ title, children, className = "", action }: { title?: string; children: ReactNode; className?: string; action?: ReactNode }) {
  return (
    <section className={`rounded-2xl border border-border bg-bg p-5 ${className}`}>
      {title || action ? (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title ? <h2 className="text-[15px] font-semibold tracking-[-0.01em]">{title}</h2> : <span />}
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function Stat({ label, value, hint, tone }: { label: string; value: ReactNode; hint?: ReactNode; tone?: "danger" | "warn" }) {
  return (
    <div className="rounded-2xl border border-border bg-bg p-5">
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-text-muted">{label}</p>
      <p className={`mt-2 text-[1.75rem] font-semibold leading-none tracking-[-0.02em] ${tone === "danger" ? "text-danger" : ""}`}>{value}</p>
      {hint ? <p className="mt-2 text-xs text-text-muted">{hint}</p> : null}
    </div>
  );
}

const ACCESS_STYLE: Record<AccessState, string> = {
  ok: "bg-success-soft text-text",
  pending: "border border-border bg-surface text-text",
  expired: "bg-danger-soft text-danger",
  paused: "border border-border bg-surface text-text-muted",
  cancelled: "border border-border bg-surface text-text-muted",
};

export function AccessBadge({ access }: { access: AccessState }) {
  return <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${ACCESS_STYLE[access]}`}>{ACCESS_LABEL[access]}</span>;
}

const STATUS_STYLE: Record<DossierStatus, string> = {
  nouveau: "bg-text text-bg",
  en_cours: "bg-success-soft text-text",
  attente_client: "border border-border bg-surface text-text-muted",
  traite: "border border-border bg-surface text-text-muted",
};

export function StatusBadge({ status }: { status: DossierStatus }) {
  return <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLE[status]}`}>{DOSSIER_STATUS_LABEL[status]}</span>;
}

export function Flash({ children, tone = "success" }: { children: ReactNode; tone?: "success" | "error" }) {
  return (
    <p
      className={`mb-6 rounded-xl border px-4 py-3 text-sm ${
        tone === "success" ? "border-success/30 bg-success-soft text-text" : "border-danger/30 bg-danger-soft text-danger"
      }`}
    >
      {children}
    </p>
  );
}

export const FIELD =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-text-muted/60 focus:border-text focus:outline-none";
export const FIELD_LABEL = "text-xs font-medium uppercase tracking-[0.08em] text-text-muted";

export function LinkButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-surface"
    >
      {children}
    </Link>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-text-muted">{children}</p>;
}

/** Petit formulaire d'un seul bouton (action serveur liée). */
export function ActionButton({
  action,
  children,
  variant = "ghost",
  confirm,
  className = "",
}: {
  action: () => Promise<void>;
  children: ReactNode;
  variant?: "primary" | "ghost" | "danger";
  confirm?: string;
  className?: string;
}) {
  return (
    <form action={action}>
      <SubmitButton variant={variant} confirm={confirm} className={`!px-4 !py-2 ${className}`}>
        {children}
      </SubmitButton>
    </form>
  );
}
