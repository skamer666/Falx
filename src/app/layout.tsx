import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = "Falx : L'infrastructure juridique de la Suisse qui entreprend";
const description =
  "Falx met des juristes suisses au service de vos statuts de Sàrl, de votre conformité LPD et de vos contrats PME, avec la rigueur du droit suisse à chaque étape.";

export const viewport: Viewport = {
  themeColor: "#0b0f14",
};

// À remplacer par le nom de domaine définitif avant la mise en production.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://falx.ch";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-papier text-ink">
        {children}
      </body>
    </html>
  );
}
