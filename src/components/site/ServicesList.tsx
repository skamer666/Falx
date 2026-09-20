import Reveal from "@/components/Reveal";
import { CircleArrowLink, Container } from "./ui";

const SERVICES = [
  {
    number: "001",
    title: "Certificat de travail",
    description:
      "Décryptage des formulations codées et mise en demeure prête à envoyer.",
    price: "149 CHF",
    href: "/services/certificat-travail",
  },
  {
    number: "002",
    title: "Recouvrement de créances",
    description:
      "Poursuite officielle sans frais cachés, commission au succès.",
    price: "Dès 89 CHF",
    href: "/services/recouvrement",
  },
  {
    number: "003",
    title: "Contestation de hausse de loyer",
    description:
      "Kit de contestation complet pour votre commission de conciliation.",
    price: "190 CHF",
    href: "/services/hausse-loyer",
  },
  {
    number: "004",
    title: "Création de Sàrl",
    description:
      "Constitution clé en main avec pack de conformité nLPD inclus.",
    price: "Sur devis",
    href: "/services/creation-sarl",
  },
];

export default function ServicesList() {
  return (
    <section id="services" className="theme-light bg-bg py-20">
      <Container>
        <Reveal>
          <h2 className="mx-auto max-w-xl text-center text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-text md:text-[48px]">
            Des services juridiques à prix fixe.
          </h2>
        </Reveal>

        <div className="mt-14 divide-y divide-border border-t border-border">
          {SERVICES.map((service, index) => (
            <Reveal key={service.number} delay={index * 60}>
              <div className="grid gap-4 py-10 md:grid-cols-[80px_minmax(0,1fr)_minmax(0,1.3fr)] md:items-baseline md:gap-10 md:py-12">
                <span className="text-sm font-medium text-text-muted">
                  {service.number}
                </span>
                <h3 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text md:text-[30px]">
                  {service.title}
                </h3>
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
                  <div>
                    <p className="max-w-md text-base leading-relaxed text-text-muted">
                      {service.description}
                    </p>
                    <p className="mt-2 text-sm font-medium text-accent">
                      {service.price}
                    </p>
                  </div>
                  <CircleArrowLink href={service.href} className="shrink-0" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
