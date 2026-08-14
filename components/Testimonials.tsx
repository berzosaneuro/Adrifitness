import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import type { Testimonial } from "@/lib/types";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

// No se monta en app/page.tsx todavía: no hay testimonios reales que
// mostrar y WhoItsFor/ResultsBlock ya cubren el mensaje honesto de
// "primeros casos". El componente queda listo para activarse en cuanto
// existan testimonios — basta con pasarle `testimonials` desde page.tsx.
export function Testimonials({ testimonials }: TestimonialsProps) {
  if (testimonials.length === 0) return null;

  return (
    <section className="px-4 py-20 md:py-32" id="testimonios">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            Lo que dicen mis clientes
          </h2>
          <p className="mt-3 font-body text-foreground-muted">
            Mensajes reales durante el proceso, transcritos para que se lean bien.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delayMs={index * 60}>
              <Card className="flex h-full flex-col gap-4 p-6">
                <span aria-hidden className="font-display text-3xl text-accent-primary">
                  &ldquo;
                </span>
                <blockquote className="font-body text-base text-foreground">
                  {testimonial.quote}
                </blockquote>
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
                  {testimonial.tag ? <Badge tone="primary">{testimonial.tag}</Badge> : null}
                  <span className="font-body text-xs uppercase tracking-wide text-foreground-muted">
                    {testimonial.name}
                  </span>
                  {testimonial.videoUrl ? (
                    <a
                      href={testimonial.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent-secondary underline underline-offset-2"
                    >
                      Ver vídeo
                    </a>
                  ) : null}
                  {testimonial.verified ? <Badge tone="secondary">✓ Verificado</Badge> : null}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
