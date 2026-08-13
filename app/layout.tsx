import type { Metadata, Viewport } from "next";
import { Inter, Orbitron } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Adrián Method — Coaching de fitness online 1:1",
  description:
    "Coaching de fitness online 1:1: transforma tu cuerpo en 12 semanas con un plan de entrenamiento y nutrición personalizado y seguimiento real, sin dietas genéricas.",
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
      <body>{children}</body>
    </html>
  );
}
