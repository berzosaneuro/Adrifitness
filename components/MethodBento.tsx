import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

// Bento grid de lo que incluye el método — celdas de tamaño desigual en vez
// de una lista plana, patrón que están usando ahora las páginas SaaS
// punteras para mostrar features complejas de forma escaneable. Cada
// tarjeta usa TiltCard (tilt 3D al cursor) para el look "producto premium".
export function MethodBento() {
  return (
    <section className="px-4 py-20 md:py-32" id="incluye">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            Qué incluye el método
          </h2>
          <p className="mt-3 font-body text-foreground-muted">
            Todo lo que necesitas, nada que no vayas a usar.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal className="sm:col-span-2 lg:col-span-2">
            <TiltCard glow="primary" className="flex h-full flex-col justify-between p-7">
              <div>
                <span aria-hidden className="text-3xl">🏋️</span>
                <h3 className="mt-4 font-display text-xl text-foreground">
                  Plan de entrenamiento personalizado
                </h3>
                <p className="mt-2 font-body text-sm text-foreground-muted">
                  Diseñado desde cero para tu nivel, tu horario y el equipo que tengas
                  disponible — no una plantilla que le sirve a cualquiera.
                </p>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delayMs={80}>
            <TiltCard glow="secondary" className="flex h-full flex-col justify-between p-7">
              <div>
                <span aria-hidden className="text-3xl">🍽️</span>
                <h3 className="mt-4 font-display text-lg text-foreground">Nutrición ajustada</h3>
                <p className="mt-2 font-body text-sm text-foreground-muted">
                  A tu rutina real, no a un Excel genérico.
                </p>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delayMs={120}>
            <TiltCard glow="primary" className="flex h-full flex-col justify-between p-7">
              <div>
                <span aria-hidden className="text-3xl">💬</span>
                <h3 className="mt-4 font-display text-lg text-foreground">Chat directo</h3>
                <p className="mt-2 font-body text-sm text-foreground-muted">
                  Escribes a Adrián, te responde él — no un equipo de soporte.
                </p>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delayMs={160}>
            <TiltCard glow="secondary" className="flex h-full flex-col justify-between p-7">
              <div>
                <span aria-hidden className="text-3xl">📊</span>
                <h3 className="mt-4 font-display text-lg text-foreground">Seguimiento semanal</h3>
                <p className="mt-2 font-body text-sm text-foreground-muted">
                  Revisión de progreso y ajustes cada semana, no cada tres meses.
                </p>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delayMs={200} className="sm:col-span-2 lg:col-span-1">
            <TiltCard glow="primary" className="flex h-full flex-col justify-between p-7">
              <div>
                <span aria-hidden className="text-3xl">🔄</span>
                <h3 className="mt-4 font-display text-lg text-foreground">Ajustes continuos</h3>
                <p className="mt-2 font-body text-sm text-foreground-muted">
                  Tu plan cambia contigo, no se queda congelado en la semana 1.
                </p>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
