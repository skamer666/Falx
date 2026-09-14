import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Falx — L'infrastructure juridique de la Suisse qui entreprend",
  description:
    "Falx génère vos statuts de Sàrl, votre conformité LPD et vos contrats PME en quelques minutes, avec la rigueur du droit suisse et la revue de juristes partenaires.",
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
