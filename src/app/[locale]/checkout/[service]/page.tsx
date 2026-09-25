import { Container, GhostButton } from "@/components/site/ui";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

const STRINGS: Record<
  Locale,
  { selected: string; notice: string; back: string; disclaimer: string }
> = {
  fr: {
    selected: "Service sélectionné",
    notice:
      "L'intégration du paiement n'est pas encore connectée à un compte Stripe réel. Cette page est un espace réservé en attendant la mise en production du module de paiement.",
    back: "Retour à l'accueil",
    disclaimer:
      "Thrax Legal n'est pas un cabinet d'avocats et n'assure pas la représentation devant les tribunaux.",
  },
  de: {
    selected: "Ausgewählte Leistung",
    notice:
      "Die Zahlungsintegration ist noch nicht an ein echtes Stripe-Konto angebunden. Diese Seite ist ein Platzhalter bis zur Inbetriebnahme des Zahlungsmoduls.",
    back: "Zurück zur Startseite",
    disclaimer:
      "Thrax Legal ist keine Anwaltskanzlei und übernimmt keine Vertretung vor Gericht.",
  },
  en: {
    selected: "Selected service",
    notice:
      "Payment integration is not yet connected to a live Stripe account. This page is a placeholder until the payment module goes live.",
    back: "Back to home",
    disclaimer: "Thrax Legal is not a law firm and does not represent clients before courts.",
  },
};

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string; service: string }>;
}) {
  const { locale: rawLocale, service } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = STRINGS[locale];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center text-text">
      <Container className="flex max-w-md flex-col items-center gap-4">
        <p className="text-sm text-text-muted">{t.selected}</p>
        <h1 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
          {decodeURIComponent(service)}
        </h1>
        <p className="text-sm leading-relaxed text-text-muted">{t.notice}</p>
        <GhostButton href={`/${locale}`} className="mt-4">
          {t.back}
        </GhostButton>
        <p className="mt-8 max-w-sm text-xs leading-relaxed text-text-muted">
          {t.disclaimer}
        </p>
      </Container>
    </main>
  );
}
