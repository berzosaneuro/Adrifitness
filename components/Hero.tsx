import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { SocialProofStats } from "@/lib/types";

interface HeroProps {
  /**
   * Prueba social agregada. Configurable, nunca hardcodeada en el JSX: así
   * el día que existan transformaciones reales basta con pasar otros props
   * desde app/page.tsx, sin tocar este componente.
   *
   * Si transformationsCount es 0 (estado actual), NO se inventa un contador
   * ni un rating — se muestra un badge honesto de "programa recién
   * lanzado" en su lugar. Mismo principio que ResultsBlock.
   */
  socialProof: SocialProofStats;
  /** Ancla de la sección del formulario de leads. */
  leadFormHref: string;
  /** Número de WhatsApp en formato internacional sin "+", ej. "34600000000". */
  whatsappNumber?: string;
}

export function Hero({ socialProof, leadFormHref, whatsappNumber }: HeroProps) {
  const hasRealSocialProof = socialProof.transformationsCount > 0;

  return (
    <section className="relative overflow-hidden bg-grid-fade px-4 pb-16 pt-28 sm:pt-32 md:pb-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <Badge tone="secondary" className="mb-6 animate-fade-up">
          Coaching de fitness online 1:1
        </Badge>

        {/* H1 declara nicho explícito: a quién ayuda + qué resultado. */}
        <h1 className="animate-fade-up font-display text-4xl leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Transforma tu cuerpo en{" "}
          <span className="text-accent-primary">12 semanas</span> con un
          método 1:1, sin dietas ni rutinas genéricas
        </h1>

        <p className="mt-6 max-w-2xl animate-fade-up text-balance font-body text-lg text-foreground-muted sm:text-xl">
          Adrián Method es coaching online personalizado para hombres y
          mujeres que quieren perder grasa, ganar fuerza y por fin entender
          por qué su cuerpo cambia — con seguimiento real, no un PDF genérico.
        </p>

        <div className="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row">
          <Button href={leadFormHref} variant="primary">
            Quiero mi plan personalizado
          </Button>
          {whatsappNumber ? (
            <Button
              href={`https://wa.me/${whatsappNumber}`}
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablar por WhatsApp
            </Button>
          ) : null}
        </div>

        <div className="mt-10 animate-fade-up">
          {hasRealSocialProof ? (
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-foreground-muted">
              <span>
                <strong className="font-display text-foreground">
                  {socialProof.transformationsCount}+
                </strong>{" "}
                transformaciones reales
              </span>
              {socialProof.avgRating ? (
                <span>
                  <strong className="font-display text-foreground">
                    {socialProof.avgRating.toFixed(1)}★
                  </strong>{" "}
                  {socialProof.reviewsCount
                    ? `(${socialProof.reviewsCount} reseñas)`
                    : "valoración media"}
                </span>
              ) : null}
            </div>
          ) : (
            <Badge tone="primary">
              Programa recién lanzado — plazas limitadas para el primer grupo
            </Badge>
          )}
        </div>
      </div>
    </section>
  );
}
