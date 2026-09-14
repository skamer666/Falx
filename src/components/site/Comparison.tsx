import Reveal from "@/components/Reveal";
import { Container, SectionHeading } from "./ui";

type Level = "yes" | "partial" | "no";

const ROWS: { label: string; firm: Level; falx: Level; diy: Level }[] = [
  { label: "Coût maîtrisé", firm: "no", falx: "yes", diy: "partial" },
  { label: "Délai de quelques minutes", firm: "no", falx: "yes", diy: "yes" },
  { label: "Conformité au droit suisse garantie", firm: "yes", falx: "yes", diy: "no" },
  { label: "Revue juridique humaine", firm: "yes", falx: "yes", diy: "no" },
  { label: "Tarification transparente", firm: "no", falx: "yes", diy: "yes" },
  { label: "Disponible 24/7", firm: "no", falx: "yes", diy: "yes" },
];

function Mark({ level }: { level: Level }) {
  if (level === "yes") {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sapin-pale text-sapin">
        <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
          <path
            d="M4 10.5L8 14.5L16 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  if (level === "partial") {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ligne text-ink-muted">
        <span className="h-2 w-2 rounded-full bg-current" />
      </span>
    );
  }
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ligne/70 text-ink-muted/70">
      <svg viewBox="0 0 20 20" fill="none" className="h-3 w-3">
        <path
          d="M5 5L15 15M15 5L5 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function Comparison() {
  return (
    <section className="bg-papier-dim/60 py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="Comparatif"
            title="Le juste milieu entre le cabinet traditionnel et le bricolage juridique."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-14 overflow-x-auto rounded-2xl border border-ligne bg-papier">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-ligne">
                  <th className="w-2/5 px-6 py-5 text-sm font-medium text-ink-muted">
                    Critère
                  </th>
                  <th className="px-6 py-5 text-sm font-medium text-ink-muted">
                    Avocat traditionnel
                  </th>
                  <th className="px-6 py-5">
                    <span className="rounded-full bg-sapin px-3 py-1 text-sm font-medium text-papier">
                      Falx
                    </span>
                  </th>
                  <th className="px-6 py-5 text-sm font-medium text-ink-muted">
                    Faire soi-même
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.label} className="border-b border-ligne last:border-0">
                    <td className="px-6 py-4 text-sm text-ink">{row.label}</td>
                    <td className="px-6 py-4">
                      <Mark level={row.firm} />
                    </td>
                    <td className="bg-sapin-pale/30 px-6 py-4">
                      <Mark level={row.falx} />
                    </td>
                    <td className="px-6 py-4">
                      <Mark level={row.diy} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
