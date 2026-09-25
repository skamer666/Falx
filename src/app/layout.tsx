import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import JsonLd from "@/components/site/JsonLd";
import "./globals.css";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

const title = "Conformité nLPD pour PME suisses, dès 590 CHF | Thrax Legal";
const description =
  "Thrax Legal met votre PME en conformité avec la nLPD révisée : registre des traitements, politique de confidentialité, contrats de sous-traitance. Prix fixe, sans avocat, sans rendez-vous.";

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

// À remplacer par le nom de domaine définitif avant la mise en production.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thraxlegal.ch";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "fr_CH",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Thrax Legal",
  url: siteUrl,
  description,
  areaServed: {
    "@type": "Country",
    name: "Switzerland",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "CH",
  },
  priceRange: "CHF 590 - CHF 79/mois",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${schibstedGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-text">
        <JsonLd data={organizationJsonLd} />
        {children}
      </body>
    </html>
  );
}
