import { Container, GhostButton } from "@/components/site/ui";

export default async function CheckoutPage({
  params,
}: PageProps<"/checkout/[service]">) {
  const { service } = await params;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center text-text">
      <Container className="flex max-w-md flex-col items-center gap-4">
        <p className="text-sm text-text-muted">Service sélectionné</p>
        <h1 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
          {decodeURIComponent(service)}
        </h1>
        <p className="text-sm leading-relaxed text-text-muted">
          L&rsquo;intégration du paiement n&rsquo;est pas encore connectée à
          un compte Stripe réel. Cette page est un espace réservé en
          attendant la mise en production du module de paiement.
        </p>
        <GhostButton href="/" className="mt-4">
          Retour à l&rsquo;accueil
        </GhostButton>
        <p className="mt-8 max-w-sm text-xs leading-relaxed text-text-muted">
          Thrax Legal n&rsquo;est pas un cabinet d&rsquo;avocats et
          n&rsquo;assure pas la représentation devant les tribunaux.
        </p>
      </Container>
    </main>
  );
}
