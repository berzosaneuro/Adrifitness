import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Testimonial } from "@/lib/types";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

// No se monta en app/page.tsx todavía: no hay testimonios reales que
// mostrar y ResultsBlock ya cubre el mensaje honesto de "primeros casos".
// El componente queda listo para activarse en cuanto existan testimonios —
// basta con pasarle `testimonials` desde page.tsx.
export function Testimonials({ testimonials }: TestimonialsProps) {
  if (testimonials.length === 0) return null;

  return (
    <section className="px-4 py-16 md:py-24" id="testimonios">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-3xl text-foreground sm:text-4xl">
          Lo que dicen mis clientes
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col gap-4 p-6">
              <blockquote className="font-body text-base text-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center justify-between">
                <span className="font-display text-sm text-foreground-muted">
                  {testimonial.name}
                </span>
                <div className="flex items-center gap-2">
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
                  {testimonial.verified ? (
                    <Badge tone="primary">✓ Verificado</Badge>
                  ) : null}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
