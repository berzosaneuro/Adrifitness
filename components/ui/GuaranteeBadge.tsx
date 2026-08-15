interface GuaranteeBadgeProps {
  /** Términos reales confirmados por Adrián, ej. "Primeras 2 semanas, si no encaja, no sigues pagando". undefined = no se muestra nada. */
  terms?: string;
  className?: string;
}

// Igual que credentials en About.tsx: publicar una garantía que Adrián no
// ha confirmado (o peor, que no piensa cumplir) es peor que no mostrar
// ninguna. Este badge solo aparece cuando `terms` llega con texto real
// desde app/page.tsx.
export function GuaranteeBadge({ terms, className = "" }: GuaranteeBadgeProps) {
  if (!terms) return null;

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border border-accent-primary/30 bg-accent-primary/5 px-5 py-4 ${className}`}
    >
      <span aria-hidden className="text-xl text-accent-primary">
        ✓
      </span>
      <p className="font-body text-sm text-foreground">{terms}</p>
    </div>
  );
}
