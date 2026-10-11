import { Container } from "@/components/site/ui";
import type { Locale } from "@/i18n/config";
import type { Audience } from "@/lib/services/catalog";
import { SERVICES_UI } from "@/lib/services/strings";
import QuoteForm from "./QuoteForm";

/** Grande section « Votre problème n'est pas dans la liste ? » avec formulaire de demande de devis. */
export default function QuoteSection({ locale, audience, error }: { locale: Locale; audience: Audience; error?: string }) {
  const ui = SERVICES_UI[locale];
  const q = ui.quote;

  return (
    <section id="devis" className="scroll-mt-24 border-y border-white/10 bg-[#0a0a0b] py-16 text-text md:py-24">
      <Container className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
        <div>
          <h2 className="text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-5xl md:text-6xl">{q.title}</h2>
          <p className="mt-5 text-xl leading-relaxed text-text-muted md:text-2xl">{q.body}</p>
          <ul className="mt-8 space-y-3">
            {q.points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-base md:text-lg">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-text text-bg">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
                    <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <QuoteForm locale={locale} audience={audience} error={error} />
      </Container>
    </section>
  );
}
