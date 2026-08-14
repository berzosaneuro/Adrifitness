import { About } from "@/components/About";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { WhoItsFor } from "@/components/WhoItsFor";

const LEAD_FORM_HREF = "#lead-form";

const ADRIAN_HERO_PHOTO_URL = "/images/adrian-hero.jpg";
const ADRIAN_ABOUT_PHOTO_URL = "/images/adrian-about.jpg";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero
          leadFormHref={LEAD_FORM_HREF}
          // TODO: pasar a número real de WhatsApp de Adrián para activar el CTA directo.
          whatsappNumber={undefined}
          // TODO: sustituir por datos reales en cuanto existan (o leerlos de Supabase).
          socialProof={{ transformationsCount: 0 }}
          // TODO: confirmar con Adrián el compromiso de respuesta real (¿24h? ¿48h?) antes de publicar.
          responseTimePromise="Proceso de selección · Respuesta en 24-48h"
          photoUrl={ADRIAN_HERO_PHOTO_URL}
        />

        <About
          name="Adrián"
          tagline="Fundador de Adrián Method"
          // Copy centrado en la filosofía del método, no en biografía/credenciales
          // que no podemos verificar todavía — ver comentario en About.tsx.
          bio="Cada plan se construye desde cero para tu cuerpo, tu rutina y tu objetivo — nada de plantillas descargadas de internet. Si me escribes, lo lees y lo respondo yo, no un equipo de soporte genérico."
          photoUrl={ADRIAN_ABOUT_PHOTO_URL}
          // TODO: añadir credenciales reales y verificables cuando Adrián las confirme.
          credentials={undefined}
        />

        {/*
          ResultsBlock (fotos antes/después) queda fuera por petición
          explícita mientras no haya casos reales — el componente sigue
          intacto en ResultsBlock.tsx/ResultCard.tsx, listo para volver a
          montarse pasando `results` en cuanto existan.

          Testimonials: mismo motivo — sin testimonios de clientes reales,
          mostrar contenido inventado es peor que omitirlo. Ver Testimonials.tsx.
        */}

        <HowItWorks />

        <WhoItsFor />

        <FAQ />

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
