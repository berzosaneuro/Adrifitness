import { Card } from "@/components/ui/Card";

interface Step {
  title: string;
  description: string;
}

// TODO: confirmar con Adrián que estos 4 pasos describen su proceso real
// de onboarding y seguimiento antes de publicar a producción.
const steps: Step[] = [
  {
    title: "1. Diagnóstico inicial",
    description:
      "Analizamos tu punto de partida: composición corporal, historial de entrenamiento, hábitos y objetivo real — nada de plantillas genéricas.",
  },
  {
    title: "2. Plan 100% personalizado",
    description:
      "Diseño tu programa de entrenamiento y nutrición a tu medida, adaptado a tu horario, tus recursos y tu nivel actual.",
  },
  {
    title: "3. Seguimiento semanal 1:1",
    description:
      "Contacto directo conmigo cada semana para revisar progreso, resolver dudas y ajustar lo que haga falta — no un chatbot ni un PDF que nadie revisa.",
  },
  {
    title: "4. Ajustes continuos",
    description:
      "Tu cuerpo cambia y tu plan cambia con él. Vamos ajustando entrenamiento y nutrición cada pocas semanas según tu progreso real.",
  },
];

export function HowItWorks() {
  return (
    <section className="px-4 py-16 md:py-24" id="metodo">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            Cómo funciona el método
          </h2>
          <p className="mt-3 font-body text-foreground-muted">
            Cuatro pasos, cero improvisación.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {steps.map((step) => (
            <Card key={step.title} className="p-6">
              <h3 className="font-display text-lg text-accent-primary">{step.title}</h3>
              <p className="mt-2 font-body text-sm text-foreground-muted">
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
