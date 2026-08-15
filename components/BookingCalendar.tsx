import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

interface BookingCalendarProps {
  /** URL de Cal.com/Calendly de Adrián, ej. "https://cal.com/adrian-method/valoracion". undefined = fallback honesto a WhatsApp/formulario. */
  bookingUrl?: string;
  whatsappNumber?: string;
  leadFormHref: string;
}

// Si Adrián todavía no tiene un calendario de reservas configurado, no
// fingimos que existe uno (nada de iframe apuntando a una URL de ejemplo):
// mostramos el mismo bloque pero con el CTA real disponible ahora mismo
// (WhatsApp o formulario). En cuanto pase `bookingUrl`, se embebe el
// calendario real sin tocar el resto de la página.
export function BookingCalendar({ bookingUrl, whatsappNumber, leadFormHref }: BookingCalendarProps) {
  return (
    <section className="px-4 py-20 md:py-32" id="reserva">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            Reserva tu llamada de valoración
          </h2>
          <p className="mt-3 font-body text-foreground-muted">
            15 minutos para ver si el método encaja contigo — sin compromiso.
          </p>
        </Reveal>

        <Reveal delayMs={80}>
          {bookingUrl ? (
            <div className="mt-8 overflow-hidden rounded-2xl border border-border-strong">
              <iframe
                src={bookingUrl}
                title="Reserva tu llamada de valoración"
                className="h-[700px] w-full"
              />
            </div>
          ) : (
            <Card glow="primary" className="mt-8 p-8 text-center">
              <p className="font-body text-foreground-muted">
                El calendario de reservas se activa en breve. Mientras tanto, escríbenos
                directamente y cuadramos la llamada por WhatsApp.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                {whatsappNumber ? (
                  <Button
                    href={`https://wa.me/${whatsappNumber}`}
                    variant="primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hablar por WhatsApp
                  </Button>
                ) : null}
                <Button href={leadFormHref} variant="outline">
                  Rellenar formulario
                </Button>
              </div>
            </Card>
          )}
        </Reveal>
      </div>
    </section>
  );
}
