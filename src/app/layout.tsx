import type { Metadata, Viewport } from "next";
import { Gabarito, Inter } from "next/font/google";
import "./globals.css";

const gabarito = Gabarito({
  variable: "--font-gabarito",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
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
  themeColor: "#0a0a0a",
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
      className={`${gabarito.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-papier text-ink">
        {children}
      </body>
    </html>
  );
}
