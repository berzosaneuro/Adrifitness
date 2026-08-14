import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { WhoItsFor } from "@/components/WhoItsFor";

const LEAD_FORM_HREF = "#lead-form";

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
        />

        {/*
          ResultsBlock (fotos antes/después) queda fuera por petición
          explícita mientras no haya casos reales — el componente sigue
          intacto en ResultsBlock.tsx/ResultCard.tsx, listo para volver a
          montarse pasando `results` en cuanto existan.

          About y Testimonials: mismo motivo — sin bio/foto real de Adrián
          ni testimonios de clientes, mostrar contenido inventado es peor
          que omitirlo. Ver About.tsx y Testimonials.tsx.
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
