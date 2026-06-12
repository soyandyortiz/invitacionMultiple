import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Morocho · Clavijo | Celebración Familiar 2026",
  description: "Estás invitado a celebrar con nosotros: Confirmación, Matrimonio, Bautizos y Recepción. Sábado 4 de Julio de 2026, Riobamba.",
  metadataBase: new URL("https://invitacionmorochoclavijo.vercel.app"),
  openGraph: {
    title: "Morocho · Clavijo — Celebración Familiar · 4 de Julio 2026",
    description: "Estás invitado a celebrar con nosotros: Confirmación, Matrimonio, Bautizos y Recepción. Sábado 4 de Julio de 2026, Riobamba.",
    url: "https://invitacionmorochoclavijo.vercel.app",
    siteName: "Invitación Morocho · Clavijo",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Silvana & Pablo — Celebración Familiar 4 de Julio 2026",
      },
    ],
    locale: "es_EC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Morocho · Clavijo — Celebración Familiar · 4 de Julio 2026",
    description: "Estás invitado a celebrar con nosotros: Confirmación, Matrimonio, Bautizos y Recepción.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
