"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { leadSchema } from "@/lib/validation";
import type { ContactMethod } from "@/lib/types";

type FormState = {
  name: string;
  contactMethod: ContactMethod;
  contactValue: string;
  goal: string;
};

const initialState: FormState = {
  name: "",
  contactMethod: "whatsapp",
  contactValue: "",
  goal: "",
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function CTASection() {
  const [form, setForm] = useState<FormState>(initialState);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const formId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const parsed = leadSchema.safeParse(form);
    if (!parsed.success) {
      const errors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!errors[key]) errors[key] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error ?? "No hemos podido enviar tu solicitud.");
      }

      setStatus("success");
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setFormError(
        error instanceof Error
          ? error.message
          : "Ha ocurrido un error inesperado. Inténtalo de nuevo."
      );
    }
  }

  if (status === "success") {
    return (
      <section className="px-4 py-16 md:py-24" id="lead-form">
        <div className="mx-auto max-w-xl">
          <Card className="p-8 text-center" glow="primary">
            <p className="font-display text-xl text-accent-primary">
              ¡Solicitud recibida!
            </p>
            <p className="mt-3 font-body text-foreground-muted">
              Te contactamos en menos de 24h para hablar de tu objetivo y ver
              si el Adrián Method encaja contigo.
            </p>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-16 md:py-24" id="lead-form">
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            Empieza tu transformación
          </h2>
          <p className="mt-3 font-body text-foreground-muted">
            Cuéntanos tu objetivo y te contactamos para ver si encajas en el
            programa.
          </p>
        </div>

        <Card className="mt-8 p-6 sm:p-8" glow="secondary">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div>
              <label htmlFor={`${formId}-name`} className="mb-1.5 block text-sm font-medium text-foreground">
                Nombre
              </label>
              <input
                id={`${formId}-name`}
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? `${formId}-name-error` : undefined}
                className="w-full rounded-lg border border-border-strong bg-white/5 px-4 py-3 font-body text-foreground placeholder:text-foreground-muted/60 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                placeholder="Tu nombre completo"
              />
              {fieldErrors.name ? (
                <p id={`${formId}-name-error`} className="mt-1.5 text-sm text-red-400">
                  {fieldErrors.name}
                </p>
              ) : null}
            </div>

            <fieldset>
              <legend className="mb-1.5 block text-sm font-medium text-foreground">
                Cómo prefieres que te contactemos
              </legend>
              <div className="flex gap-4">
                {(["whatsapp", "email"] as const).map((method) => (
                  <label key={method} className="flex items-center gap-2 text-sm text-foreground-muted">
                    <input
                      type="radio"
                      name="contactMethod"
                      value={method}
                      checked={form.contactMethod === method}
                      onChange={() =>
                        setForm((prev) => ({ ...prev, contactMethod: method, contactValue: "" }))
                      }
                      className="h-4 w-4 accent-accent-primary"
                    />
                    {method === "whatsapp" ? "WhatsApp" : "Email"}
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor={`${formId}-contact`} className="mb-1.5 block text-sm font-medium text-foreground">
                {form.contactMethod === "whatsapp" ? "Número de WhatsApp" : "Email"}
              </label>
              <input
                id={`${formId}-contact`}
                type={form.contactMethod === "whatsapp" ? "tel" : "email"}
                autoComplete={form.contactMethod === "whatsapp" ? "tel" : "email"}
                value={form.contactValue}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, contactValue: event.target.value }))
                }
                aria-invalid={Boolean(fieldErrors.contactValue)}
                aria-describedby={fieldErrors.contactValue ? `${formId}-contact-error` : undefined}
                className="w-full rounded-lg border border-border-strong bg-white/5 px-4 py-3 font-body text-foreground placeholder:text-foreground-muted/60 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                placeholder={form.contactMethod === "whatsapp" ? "+34 600 000 000" : "tu@email.com"}
              />
              {fieldErrors.contactValue ? (
                <p id={`${formId}-contact-error`} className="mt-1.5 text-sm text-red-400">
                  {fieldErrors.contactValue}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor={`${formId}-goal`} className="mb-1.5 block text-sm font-medium text-foreground">
                Tu objetivo
              </label>
              <textarea
                id={`${formId}-goal`}
                rows={3}
                value={form.goal}
                onChange={(event) => setForm((prev) => ({ ...prev, goal: event.target.value }))}
                aria-invalid={Boolean(fieldErrors.goal)}
                aria-describedby={fieldErrors.goal ? `${formId}-goal-error` : undefined}
                className="w-full rounded-lg border border-border-strong bg-white/5 px-4 py-3 font-body text-foreground placeholder:text-foreground-muted/60 focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary"
                placeholder="Ej: perder grasa y ganar fuerza antes de verano"
              />
              {fieldErrors.goal ? (
                <p id={`${formId}-goal-error`} className="mt-1.5 text-sm text-red-400">
                  {fieldErrors.goal}
                </p>
              ) : null}
            </div>

            {formError ? (
              <p role="alert" className="text-sm text-red-400">
                {formError}
              </p>
            ) : null}

            <Button type="submit" variant="primary" disabled={status === "submitting"}>
              {status === "submitting" ? "Enviando..." : "Enviar solicitud"}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
