import { Button } from "@/components/ui/Button";
import { ResultCard } from "@/components/ResultCard";
import type { Result } from "@/lib/types";

interface ResultsBlockProps {
  results: Result[];
  leadFormHref: string;
}

// Componente más importante de la página: foto + cita + métrica en el mismo
// bloque visual, y el CTA va pegado justo debajo — nunca en otra sección
// desconectada. Funciona igual reciba datos reales o placeholders honestos
// (ver Result.isPlaceholder y ResultCard).
export function ResultsBlock({ results, leadFormHref }: ResultsBlockProps) {
  const allPlaceholders = results.every((result) => result.isPlaceholder);

  return (
    <section className="px-4 py-16 md:py-24" id="resultados">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">
            {allPlaceholders ? "Los próximos resultados" : "Resultados reales"}
          </h2>
          <p className="mt-3 font-body text-foreground-muted">
            {allPlaceholders
              ? "Cada transformación empieza en algún punto. La tuya podría ser la primera que publiquemos."
              : "Casos verificados de clientes del Adrián Method, con seguimiento real semana a semana."}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((result, index) => (
            <ResultCard
              key={result.id}
              result={result}
              priority={index === 0}
              leadFormHref={leadFormHref}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href={leadFormHref} variant="primary">
            {allPlaceholders ? "Sé de los primeros en probarlo" : "Quiero mi transformación"}
          </Button>
        </div>
      </div>
    </section>
  );
}
