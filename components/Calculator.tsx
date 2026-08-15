"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

type Sex = "male" | "female";
type Goal = "loss" | "maintain" | "gain";

const ACTIVITY_MULTIPLIER = 1.375; // actividad ligera/moderada — punto de partida conservador
const GOAL_ADJUSTMENT: Record<Goal, number> = {
  loss: -400,
  maintain: 0,
  gain: 300,
};

const GOAL_LABEL: Record<Goal, string> = {
  loss: "Perder grasa",
  maintain: "Mantener",
  gain: "Ganar músculo",
};

interface CalculatorProps {
  leadFormHref: string;
}

// Calculadora de mantenimiento calórico (fórmula Mifflin-St Jeor, estándar
// clínico bien documentado — no es un número inventado, es una estimación
// real a partir de tus datos). Sirve como gancho interactivo y termina
// empujando al formulario para el plan de verdad, dejando claro que esto
// es un punto de partida, no el plan final.
export function Calculator({ leadFormHref }: CalculatorProps) {
  const formId = useId();
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [goal, setGoal] = useState<Goal>("loss");
  const [result, setResult] = useState<{ bmr: number; target: number } | null>(null);

  const canCalculate = Number(age) > 0 && Number(heightCm) > 0 && Number(weightKg) > 0;

  function handleCalculate() {
    const a = Number(age);
    const h = Number(heightCm);
    const w = Number(weightKg);
    if (!(a > 0 && h > 0 && w > 0)) return;

    const bmr = sex === "male" ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    const maintenance = bmr * ACTIVITY_MULTIPLIER;
    const target = Math.round(maintenance + GOAL_ADJUSTMENT[goal]);

    setResult({ bmr: Math.round(bmr), target });
  }

  return (
    <section className="px-4 py-20 md:py-32" id="calculadora">
      <div className="mx-auto max-w-xl">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            Calcula tu punto de partida
          </h2>
          <p className="mt-3 font-body text-foreground-muted">
            Una estimación real de tu mantenimiento calórico, no un número al azar.
          </p>
        </Reveal>

        <Reveal delayMs={80}>
          <Card glow="secondary" className="mt-8 p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label htmlFor={`${formId}-sex`} className="mb-1.5 block text-sm font-medium text-foreground">
                  Sexo
                </label>
                <div className="flex gap-3">
                  {(["male", "female"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSex(option)}
                      className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-body transition-colors ${
                        sex === option
                          ? "border-accent-primary bg-accent-primary/10 text-accent-primary"
                          : "border-border-strong bg-white/5 text-foreground-muted"
                      }`}
                    >
                      {option === "male" ? "Hombre" : "Mujer"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor={`${formId}-age`} className="mb-1.5 block text-sm font-medium text-foreground">
                  Edad
                </label>
                <input
                  id={`${formId}-age`}
                  type="number"
                  inputMode="numeric"
                  min={14}
                  max={90}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full rounded-lg border border-border-strong bg-white/5 px-4 py-3 font-body text-foreground focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                  placeholder="30"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-height`} className="mb-1.5 block text-sm font-medium text-foreground">
                  Altura (cm)
                </label>
                <input
                  id={`${formId}-height`}
                  type="number"
                  inputMode="numeric"
                  min={120}
                  max={230}
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full rounded-lg border border-border-strong bg-white/5 px-4 py-3 font-body text-foreground focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                  placeholder="175"
                />
              </div>

              <div className="col-span-2">
                <label htmlFor={`${formId}-weight`} className="mb-1.5 block text-sm font-medium text-foreground">
                  Peso (kg)
                </label>
                <input
                  id={`${formId}-weight`}
                  type="number"
                  inputMode="numeric"
                  min={35}
                  max={250}
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full rounded-lg border border-border-strong bg-white/5 px-4 py-3 font-body text-foreground focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                  placeholder="78"
                />
              </div>

              <div className="col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-foreground">Objetivo</label>
                <div className="flex gap-2">
                  {(["loss", "maintain", "gain"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setGoal(option)}
                      className={`flex-1 rounded-lg border px-3 py-2.5 text-xs font-body transition-colors sm:text-sm ${
                        goal === option
                          ? "border-accent-primary bg-accent-primary/10 text-accent-primary"
                          : "border-border-strong bg-white/5 text-foreground-muted"
                      }`}
                    >
                      {GOAL_LABEL[option]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button
              type="button"
              variant="primary"
              className="mt-6 w-full"
              disabled={!canCalculate}
              onClick={handleCalculate}
            >
              Calcular
            </Button>

            {result ? (
              <div className="mt-6 rounded-xl border border-accent-primary/30 bg-accent-primary/5 p-5 text-center">
                <p className="font-body text-sm text-foreground-muted">
                  Tu estimación para <strong className="text-foreground">{GOAL_LABEL[goal]}</strong>
                </p>
                <p className="mt-2 font-display text-3xl text-accent-primary">
                  ~{result.target} kcal/día
                </p>
                <p className="mt-3 font-body text-xs text-foreground-muted">
                  Esto es un punto de partida general (fórmula Mifflin-St Jeor). Tu plan real
                  se ajusta con seguimiento semanal, no con una calculadora.
                </p>
                <Button href={leadFormHref} variant="outline" className="mt-4">
                  Quiero mi plan ajustado de verdad
                </Button>
              </div>
            ) : null}
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
