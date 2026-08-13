import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ResultsBlock } from "@/components/ResultsBlock";
import { resultsSample } from "@/data/results.sample";

const LEAD_FORM_HREF = "#lead-form";

export default function HomePage() {
  return (
    <main>
      <Hero
        leadFormHref={LEAD_FORM_HREF}
        // TODO: pasar a número real de WhatsApp de Adrián para activar el CTA directo.
        whatsappNumber={undefined}
        // TODO: sustituir por datos reales en cuanto existan (o leerlos de Supabase).
        socialProof={{ transformationsCount: 0 }}
      />

      <ResultsBlock results={resultsSample} leadFormHref={LEAD_FORM_HREF} />

      <HowItWorks />

      {/*
        About y Testimonials existen como componentes funcionales pero no se
        montan aún: no tenemos bio/foto/credenciales reales de Adrián ni
        testimonios de clientes, y mostrar contenido inventado en cualquiera
        de las dos secciones es peor para la conversión que omitirlas.
        En cuanto llegue ese contenido, se añaden aquí pasando los props
        correspondientes — ver About.tsx y Testimonials.tsx.
      */}

      <FAQ />

      <CTASection />
    </main>
  );
}
