import { Container } from "./ui";

const ITEMS = [
  "Hébergement de données en Suisse",
  "Conforme à la nLPD",
  "Fondé sur le Code des obligations (CO)",
  "Documents revus par des juristes partenaires",
];

export default function TrustBar() {
  return (
    <section className="border-y border-ligne bg-papier-dim/60 py-8">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center">
          {ITEMS.map((item) => (
            <span
              key={item}
              className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted"
            >
              {item}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
