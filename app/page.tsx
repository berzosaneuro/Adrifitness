import { About } from "@/components/About";
import { BookingCalendar } from "@/components/BookingCalendar";
import { Calculator } from "@/components/Calculator";
import { ComparisonTable } from "@/components/ComparisonTable";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { MethodBento } from "@/components/MethodBento";
import { Quiz } from "@/components/Quiz";
import { StatsCounters } from "@/components/StatsCounters";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { Timeline } from "@/components/Timeline";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { Reveal } from "@/components/ui/Reveal";
import { WhoItsFor } from "@/components/WhoItsFor";
import { getSiteSettings } from "@/lib/supabase";

const LEAD_FORM_HREF = "#lead-form";

const ADRIAN_HERO_PHOTO_URL = "/images/adrian-hero.jpg";
const ADRIAN_ABOUT_PHOTO_URL = "/images/adrian-about.jpg";

// TODO: pasar a número real de WhatsApp de Adrián para activar los CTA directos.
const WHATSAPP_NUMBER: string | undefined = undefined;
// TODO: sustituir por la URL real de Cal.com/Calendly de Adrián en cuanto exista.
const BOOKING_URL: string | undefined = undefined;
// TODO: confirmar con Adrián los términos reales de garantía antes de publicar.
const GUARANTEE_TERMS: string | undefined = undefined;
// TODO: sustituir por el vídeo real de presentación de Adrián en cuanto lo grabe.
const INTRO_VIDEO_URL: string | undefined = undefined;

export default async function HomePage() {
  // getSiteSettings() nunca lanza (ver lib/supabase.ts): si Supabase no
  // está configurado todavía o site_settings sigue vacía, todos los campos
  // llegan en null y las secciones que dependen de ellos (SpotsBadge,
  // StatsCounters) se ocultan solas, sin romper el build ni inventar cifras.
  const settings = await getSiteSettings();

  return (
    <>
      <Header />
      <main id="top">
        <Hero
          leadFormHref={LEAD_FORM_HREF}
          whatsappNumber={WHATSAPP_NUMBER}
          // TODO: sustituir por datos reales en cuanto existan (o leerlos de Supabase).
          socialProof={{ transformationsCount: 0 }}
          // TODO: confirmar con Adrián el compromiso de respuesta real (¿24h? ¿48h?) antes de publicar.
          responseTimePromise="Proceso de selección · Respuesta en 24-48h"
          photoUrl={ADRIAN_HERO_PHOTO_URL}
          spots={settings.availableSpots}
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

        <section className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-2xl">
            <Reveal className="text-center">
              <h2 className="font-display text-2xl text-foreground sm:text-3xl">
                Conóceme en vídeo
              </h2>
              <p className="mt-3 font-body text-foreground-muted">
                Antes de escribirme, ponme cara y voz.
              </p>
            </Reveal>
            <Reveal delayMs={80}>
              <VideoFrame src={INTRO_VIDEO_URL} title="Presentación de Adrián" className="mt-8" />
            </Reveal>
          </div>
        </section>

        {/*
          ResultsBlock (fotos antes/después) queda fuera por petición
          explícita mientras no haya casos reales — el componente sigue
          intacto en ResultsBlock.tsx/ResultCard.tsx, listo para volver a
          montarse pasando `results` en cuanto existan.

          Testimonials: mismo motivo — sin testimonios de clientes reales,
          mostrar contenido inventado es peor que omitirlo. Ver Testimonials.tsx.
        */}

        <MethodBento />

        <HowItWorks />

        <Calculator leadFormHref={LEAD_FORM_HREF} />

        <Timeline />

        <WhoItsFor />

        <ComparisonTable />

        <Quiz whatsappNumber={WHATSAPP_NUMBER} leadFormHref={LEAD_FORM_HREF} />

        <BookingCalendar
          bookingUrl={BOOKING_URL}
          whatsappNumber={WHATSAPP_NUMBER}
          leadFormHref={LEAD_FORM_HREF}
        />

        <FAQ />

        <StatsCounters settings={settings} />

        <CTASection guaranteeTerms={GUARANTEE_TERMS} />
      </main>
      <Footer />
      <StickyMobileCTA leadFormHref={LEAD_FORM_HREF} whatsappNumber={WHATSAPP_NUMBER} />
    </>
  );
}
