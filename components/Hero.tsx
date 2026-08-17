"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Spotlight } from "@/components/ui/Spotlight";
import { SpotsBadge } from "@/components/ui/SpotsBadge";
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
  /**
   * Compromiso de respuesta tras enviar el formulario, ej. "Respuesta en 24-48h".
   * Configurable porque es una promesa operativa real que Adrián debe poder
   * cumplir — no un dato inventado. undefined = no se muestra la línea.
   */
  responseTimePromise?: string;
  /** Foto real de Adrián. undefined = PhotoFrame renderiza su placeholder honesto. */
  photoUrl?: string;
  /** Plazas disponibles reales, leídas de Supabase. null = no se muestra nada (ver SpotsBadge). */
  spots?: number | null;
}

export function Hero({
  socialProof,
  leadFormHref,
  whatsappNumber,
  responseTimePromise,
  photoUrl,
  spots = null,
}: HeroProps) {
  const hasRealSocialProof = socialProof.transformationsCount > 0;

  function handleSpotlightMove(event: React.MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty("--spot-x", `${x}%`);
    event.currentTarget.style.setProperty("--spot-y", `${y}%`);
  }

  return (
    <section
      onMouseMove={handleSpotlightMove}
      className="relative overflow-hidden px-4 pb-20 pt-32 sm:pt-40 md:pb-28"
    >
      {/* Fondo en capas: cuadrícula técnica fina + dos glows de color — sin
          imágenes externas, todo CSS/gradientes, coste de perf despreciable. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(245,245,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,245,247,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent-secondary/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-1/2 -z-10 h-72 w-72 translate-x-1/2 translate-y-1/2 rounded-full bg-accent-primary/10 blur-[100px]"
      />
      <Spotlight />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <Badge tone="secondary" className="mb-6 animate-fade-up">
            Coaching de fitness online 1:1
          </Badge>

          {/* H1 declara nicho explícito: a quién ayuda + qué resultado. */}
          <h1 className="animate-fade-up font-display text-5xl leading-[1.05] tracking-tight text-foreground sm:text-7xl">
            Transforma tu cuerpo{" "}
            <span className="relative inline-block text-accent-primary drop-shadow-[0_0_28px_rgba(57,255,20,0.45)] motion-safe:animate-pulse-glow">
              con mi método
              <span className="text-accent-secondary drop-shadow-[0_0_20px_rgba(139,92,246,0.55)]">
                !
              </span>
              <span
                aria-hidden
                className="absolute -bottom-1.5 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary opacity-70"
              />
            </span>
          </h1>

          <p className="mt-4 animate-fade-up font-display text-xs uppercase tracking-[0.2em] text-accent-secondary">
            12 semanas · 1:1 · sin dietas ni rutinas genéricas
          </p>

          <p className="mt-6 max-w-xl animate-fade-up text-balance font-body text-lg text-foreground-muted">
            Adrián Method es coaching online personalizado para hombres y
            mujeres que quieren perder grasa, ganar fuerza y por fin entender
            por qué su cuerpo cambia — con seguimiento real, no un PDF genérico.
          </p>

          <div className="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row">
            <Magnetic>
              <Button href={leadFormHref} variant="primary">
                Quiero mi plan personalizado
              </Button>
            </Magnetic>
            {whatsappNumber ? (
              <Magnetic>
                <Button
                  href={`https://wa.me/${whatsappNumber}`}
                  variant="outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hablar por WhatsApp
                </Button>
              </Magnetic>
            ) : null}
          </div>

          {responseTimePromise ? (
            <p className="mt-4 animate-fade-up font-body text-xs uppercase tracking-widest text-foreground-muted">
              {responseTimePromise}
            </p>
          ) : null}

          {spots !== null ? (
            <div className="mt-4 animate-fade-up">
              <SpotsBadge spots={spots} />
            </div>
          ) : null}

          <div className="mt-10 animate-fade-up">
            {hasRealSocialProof ? (
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-foreground-muted lg:justify-start">
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

        <div className="animate-fade-up">
          <PhotoFrame
            src={photoUrl}
            alt="Adrián, entrenador del Adrián Method"
            priority
            className="mx-auto max-w-sm lg:max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
