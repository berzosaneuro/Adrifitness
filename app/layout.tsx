import type { Metadata, Viewport } from "next";
import { Inter, Orbitron } from "next/font/google";
import { CursorHalo } from "@/components/ui/CursorHalo";
import "./globals.css";

// Orbitron: fuente de titulares — geométrica, futurista, encaja con el
// posicionamiento "método" de alto rendimiento y con el verde neón/violeta
// del sistema de diseño.
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

// Inter como fuente de cuerpo: alta legibilidad a tamaños pequeños, soporte
// completo de tildes/ñ en español, y su geometría neutra contrasta bien con
// el carácter técnico de Orbitron sin competir con ella en los titulares.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// TODO: fijar NEXT_PUBLIC_SITE_URL al dominio definitivo en Vercel en cuanto
// exista — mientras tanto cae a la URL de deploy de Vercel o a localhost.
// Sin metadataBase, next/og generaría URLs relativas para las imágenes
// Open Graph/Twitter y los previews de WhatsApp/Instagram no las cargarían.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const title = "Adrián Method — Coaching de fitness online 1:1";
const description =
  "Coaching de fitness online 1:1: transforma tu cuerpo en 12 semanas con un plan de entrenamiento y nutrición personalizado y seguimiento real, sin dietas genéricas.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${orbitron.variable} ${inter.variable}`}>
      <body>
        <CursorHalo />
        {children}
      </body>
    </html>
  );
}
