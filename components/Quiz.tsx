"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

interface QuizProps {
  /** Número de WhatsApp en formato internacional sin "+". undefined = el quiz cierra hacia #lead-form en su lugar. */
  whatsappNumber?: string;
  leadFormHref: string;
}

const GOALS = ["Perder grasa", "Ganar músculo", "Ambas (recomposición)", "Mejorar rendimiento"];
const LEVELS = ["Principiante", "Nivel medio", "Avanzado"];
const AVAILABILITY = ["1-2 días/semana", "3-4 días/semana", "5+ días/semana"];

// Quiz de 3 pasos que cualifica al visitante antes de que escriba. No
// captura datos "para la base de datos" — solo compone un mensaje de
// WhatsApp prellenado con sus respuestas, así la primera línea que escribe
// Adrián no es "hola, cuéntame tu objetivo" sino ya un contexto real.
export function Quiz({ whatsappNumber, leadFormHref }: QuizProps) {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [availability, setAvailability] = useState<string | null>(null);

  const steps = [
    { label: "Objetivo", options: GOALS, value: goal, set: setGoal },
    { label: "Nivel actual", options: LEVELS, value: level, set: setLevel },
    { label: "Disponibilidad", options: AVAILABILITY, value: availability, set: setAvailability },
  ];

  const finished = goal && level && availability;

  function selectOption(option: string) {
    steps[step]?.set(option);
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    }
  }

  const summaryMessage = `Hola Adrián, quiero mi plan personalizado. Mi objetivo es "${goal}", mi nivel es "${level}" y mi disponibilidad es "${availability}".`;
  const ctaHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(summaryMessage)}`
    : leadFormHref;

  return (
    <section className="px-4 py-20 md:py-32" id="quiz">
      <div className="mx-auto max-w-2xl">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            ¿Encajas en el método?
          </h2>
          <p className="mt-3 font-body text-foreground-muted">
            3 preguntas, 20 segundos — así Adrián ya sabe de qué hablar cuando le escribas.
          </p>
        </Reveal>

        <Reveal delayMs={80}>
          <Card glow="primary" className="mt-8 p-6 sm:p-8">
            {!finished ? (
              <>
                <div className="mb-6 flex items-center gap-2" aria-hidden>
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        index <= step ? "bg-accent-primary" : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>

                <Badge tone="secondary" className="mb-4">
                  Paso {step + 1} de {steps.length}
                </Badge>

                <h3 className="font-display text-xl text-foreground">{steps[step]?.label}</h3>

                <div className="mt-5 flex flex-col gap-3">
                  {steps[step]?.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => selectOption(option)}
                      className="rounded-xl border border-border-strong bg-white/5 px-5 py-3.5 text-left font-body text-foreground transition-colors hover:border-accent-primary/50 hover:bg-accent-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-primary"
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep((prev) => prev - 1)}
                    className="mt-5 font-body text-sm text-foreground-muted underline-offset-4 hover:underline"
                  >
                    ← Volver
                  </button>
                ) : null}
              </>
            ) : (
              <div className="text-center">
                <p className="font-display text-lg text-accent-primary">¡Listo!</p>
                <p className="mt-2 font-body text-sm text-foreground-muted">
                  {goal} · {level} · {availability}
                </p>
                <Button href={ctaHref} variant="primary" className="mt-6 w-full sm:w-auto" target={whatsappNumber ? "_blank" : undefined} rel={whatsappNumber ? "noopener noreferrer" : undefined}>
                  {whatsappNumber ? "Enviar por WhatsApp" : "Continuar al formulario"}
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setGoal(null);
                    setLevel(null);
                    setAvailability(null);
                    setStep(0);
                  }}
                  className="mt-4 block w-full font-body text-sm text-foreground-muted underline-offset-4 hover:underline"
                >
                  Empezar de nuevo
                </button>
              </div>
            )}
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
