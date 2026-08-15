import { Reveal } from "@/components/ui/Reveal";

interface Row {
  label: string;
  generic: string;
  method: string;
}

// Comparativa genérica y defendible sobre el ENFOQUE (plantilla vs. 1:1),
// no sobre credenciales o resultados de Adrián que no podemos verificar
// todavía. Patrón tomado de landing pages SaaS premium (producto vs.
// alternativa floja) adaptado a coaching.
const ROWS: Row[] = [
  { label: "Plan de entrenamiento", generic: "Plantilla genérica descargada", method: "Diseñado para tu cuerpo y tu historial" },
  { label: "Nutrición", generic: "Calculadora automática sin contexto", method: "Ajustada a tu rutina y tus preferencias reales" },
  { label: "Seguimiento", generic: "Ninguno, o un PDF que nadie revisa", method: "Contacto semanal 1:1 con Adrián" },
  { label: "Ajustes", generic: "Tú solo, a base de prueba y error", method: "Se ajusta cada pocas semanas según tu progreso" },
  { label: "Cuando tienes una duda", generic: "Un foro o un vídeo genérico de YouTube", method: "Le escribes a Adrián y te responde él" },
];

export function ComparisonTable() {
  return (
    <section className="px-4 py-20 md:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            Plantilla genérica vs. Adrián Method
          </h2>
          <p className="mt-3 font-body text-foreground-muted">
            La diferencia no es el PDF — es lo que pasa después de dártelo.
          </p>
        </Reveal>

        <Reveal delayMs={80}>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[640px] border-collapse text-left font-body text-sm">
              <thead>
                <tr className="border-b border-border bg-white/5">
                  <th scope="col" className="p-4 font-display text-xs uppercase tracking-widest text-foreground-muted">
                    &nbsp;
                  </th>
                  <th scope="col" className="p-4 font-display text-xs uppercase tracking-widest text-foreground-muted">
                    Plantilla genérica
                  </th>
                  <th scope="col" className="p-4 font-display text-xs uppercase tracking-widest text-accent-primary">
                    Adrián Method
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, index) => (
                  <tr
                    key={row.label}
                    className={index < ROWS.length - 1 ? "border-b border-border" : ""}
                  >
                    <th scope="row" className="p-4 font-display text-foreground">
                      {row.label}
                    </th>
                    <td className="p-4 text-foreground-muted">
                      <span aria-hidden className="mr-2 text-foreground-muted/50">✕</span>
                      {row.generic}
                    </td>
                    <td className="p-4 text-foreground">
                      <span aria-hidden className="mr-2 text-accent-primary">✓</span>
                      {row.method}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
