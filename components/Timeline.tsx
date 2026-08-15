import { Reveal } from "@/components/ui/Reveal";

interface Milestone {
  week: string;
  title: string;
  description: string;
}

// TODO: confirmar con Adrián que estos hitos reflejan su progresión real
// de 12 semanas antes de publicar — son una estructura razonable, no datos
// medidos de clientes concretos (evitamos eso a propósito, ver ResultsBlock).
const MILESTONES: Milestone[] = [
  {
    week: "Semana 1",
    title: "Diagnóstico y arranque",
    description: "Primer plan de entrenamiento y nutrición ya en tus manos, ajustado a tu punto de partida.",
  },
  {
    week: "Semana 4",
    title: "Primer ajuste real",
    description: "Revisamos tu respuesta al plan con datos de 4 semanas y afinamos volumen, cargas y nutrición.",
  },
  {
    week: "Semana 8",
    title: "Consolidación",
    description: "El hábito ya está instalado — el foco pasa a progresión constante y a resolver los puntos débiles.",
  },
  {
    week: "Semana 12",
    title: "Balance y siguiente objetivo",
    description: "Revisión completa de resultados y decidimos juntos el siguiente bloque de 12 semanas.",
  },
];

// Línea de tiempo vertical que se "activa" al hacer scroll: cada hito entra
// con su propio Reveal (mismo patrón IntersectionObserver del resto de la
// página), dando sensación de progreso real sin necesitar fotos de
// antes/después que todavía no existen.
export function Timeline() {
  return (
    <section className="px-4 py-20 md:py-32" id="timeline">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            Tus próximas 12 semanas
          </h2>
          <p className="mt-3 font-body text-foreground-muted">
            Esto es lo que pasa desde que empiezas hasta la primera revisión completa.
          </p>
        </Reveal>

        <div className="relative mt-14 flex flex-col gap-10">
          <div
            aria-hidden
            className="absolute bottom-4 left-[15px] top-4 w-px bg-gradient-to-b from-accent-primary/60 via-accent-secondary/40 to-transparent sm:left-[19px]"
          />

          {MILESTONES.map((milestone, index) => (
            <Reveal key={milestone.week} delayMs={index * 100}>
              <div className="relative flex gap-5 pl-0 sm:gap-6">
                <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-accent-primary bg-background shadow-glow-primary-sm sm:h-10 sm:w-10">
                  <span className="font-display text-xs text-accent-primary">{index + 1}</span>
                </div>
                <div className="pb-2">
                  <span className="font-display text-xs uppercase tracking-widest text-accent-primary">
                    {milestone.week}
                  </span>
                  <h3 className="mt-1 font-display text-lg text-foreground">{milestone.title}</h3>
                  <p className="mt-2 font-body text-sm text-foreground-muted">
                    {milestone.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
