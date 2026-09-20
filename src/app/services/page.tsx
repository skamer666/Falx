import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { CircleArrowLink, Container } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Tous nos services | Thrax Legal",
  description:
    "Des services juridiques ponctuels à prix fixe pour les particuliers et les PME suisses.",
};

const SERVICES = [
  {
    title: "Certificat de travail",
    description:
      "Décryptage des formulations codées et mise en demeure prête à envoyer.",
    price: "179 CHF",
    href: "/services/certificat-travail",
    image: "/media/photos/certificat-travail.jpg",
  },
  {
    title: "Recouvrement de créances",
    description:
      "Poursuite officielle sans frais cachés, commission au succès.",
    price: "Dès 89 CHF",
    href: "/services/recouvrement",
    image: "/media/photos/recouvrement.jpg",
  },
  {
    title: "Contestation de hausse de loyer",
    description:
      "Kit de contestation complet pour votre commission de conciliation.",
    price: "229 CHF",
    href: "/services/hausse-loyer",
    image: "/media/photos/hausse-loyer.jpg",
  },
  {
    title: "Création de Sàrl",
    description:
      "Constitution clé en main avec pack de conformité nLPD inclus.",
    price: "Dès 590 CHF",
    href: "/services/creation-sarl",
    image: "/media/photos/creation-sarl.jpg",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg text-text">
        <section className="relative isolate overflow-hidden border-b border-border py-24 text-center md:py-32">
          <Image
            src="/media/photos/hero-building.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div aria-hidden className="absolute inset-0 bg-bg/80" />
          <Container className="relative">
            <Reveal>
              <h1 className="mx-auto max-w-2xl text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.02em] text-text sm:text-5xl">
                Des services juridiques à prix fixe.
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
                Chaque service est exécuté selon un forfait annoncé à
                l&rsquo;avance. Aucune facturation à l&rsquo;heure.
              </p>
            </Reveal>
          </Container>
        </section>

        <section className="theme-light bg-bg py-4 md:py-8">
          <Container>
            <div className="divide-y divide-border border-t border-border">
              {SERVICES.map((service) => (
                <Reveal key={service.title}>
                  <div className="grid gap-6 py-10 md:grid-cols-[180px_minmax(0,1fr)_minmax(0,1.3fr)] md:items-center md:gap-10 md:py-12">
                    <div className="relative h-32 w-full overflow-hidden rounded-lg bg-surface md:h-24">
                      <Image
                        src={service.image}
                        alt=""
                        fill
                        sizes="180px"
                        className="object-cover grayscale"
                      />
                    </div>
                    <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
                      {service.title}
                    </h2>
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
                      <div>
                        <p className="max-w-md text-base leading-relaxed text-text-muted">
                          {service.description}
                        </p>
                        <p className="mt-2 text-sm font-medium text-text">
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
      </main>
      <Footer />
    </>
  );
}
