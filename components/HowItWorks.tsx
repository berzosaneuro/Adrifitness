import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

interface Step {
  number: string;
  title: string;
  description: string;
}

// TODO: confirmar con Adrián que estos 4 pasos describen su proceso real
// de onboarding y seguimiento antes de publicar a producción.
const steps: Step[] = [
  {
    number: "01",
    title: "Diagnóstico inicial",
    description:
      "Analizamos tu punto de partida: composición corporal, historial de entrenamiento, hábitos y objetivo real — nada de plantillas genéricas.",
  },
  {
    number: "02",
    title: "Plan 100% personalizado",
    description:
      "Diseño tu programa de entrenamiento y nutrición a tu medida, adaptado a tu horario, tus recursos y tu nivel actual.",
  },
  {
    number: "03",
    title: "Seguimiento semanal 1:1",
    description:
      "Contacto directo conmigo cada semana para revisar progreso, resolver dudas y ajustar lo que haga falta — no un chatbot ni un PDF que nadie revisa.",
  },
  {
    number: "04",
    title: "Ajustes continuos",
    description:
      "Tu cuerpo cambia y tu plan cambia con él. Vamos ajustando entrenamiento y nutrición cada pocas semanas según tu progreso real.",
  },
];

export function HowItWorks() {
  return (
    <section className="px-4 py-20 md:py-32" id="metodo">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            Cómo funciona el método
          </h2>
          <p className="mt-3 font-body text-foreground-muted">
            Cuatro pasos, cero improvisación.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {steps.map((step, index) => (
            <Reveal key={step.number} delayMs={index * 80}>
              <Card glow="primary" className="h-full p-6">
                <div className="flex items-center gap-4">
                  <span className="font-display text-3xl text-accent-primary/40">
                    {step.number}
                  </span>
                  <h3 className="font-display text-lg text-foreground">{step.title}</h3>
                </div>
                <p className="mt-3 font-body text-sm text-foreground-muted">
                  {step.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
