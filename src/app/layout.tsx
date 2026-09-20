import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

const title = "Thrax Legal : vos droits, exécutés en 24h à prix fixe";
const description =
  "Thrax Legal remplace les cabinets traditionnels, lents et opaques, par une infrastructure juridique structurée pour les PME et les particuliers suisses. Prix fixes, sans surprise.";

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

// À remplacer par le nom de domaine définitif avant la mise en production.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thraxlegal.ch";

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
    <html lang="fr" className={`${schibstedGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-text">
        {children}
      </body>
    </html>
  );
}
