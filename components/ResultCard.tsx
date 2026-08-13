import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Result } from "@/lib/types";

interface ResultCardProps {
  result: Result;
  /** true solo para la primera tarjeta visible sin scroll: evita layout shift con carga eager. */
  priority?: boolean;
  leadFormHref: string;
}

export function ResultCard({ result, priority = false, leadFormHref }: ResultCardProps) {
  if (result.isPlaceholder) {
    return (
      <Card className="flex flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-accent-secondary/50 text-2xl">
          🕓
        </div>
        <p className="font-display text-lg text-foreground">
          Primeros casos en proceso
        </p>
        <p className="max-w-xs font-body text-sm text-foreground-muted">
          Todavía no publicamos transformaciones inventadas: sé de los
          primeros en escribir la tuya con el Adrián Method.
        </p>
        <Button href={leadFormHref} variant="secondary" className="mt-2">
          Sé de los primeros
        </Button>
      </Card>
    );
  }

  return (
    <Card glow="primary" className="overflow-hidden">
      <div className="grid grid-cols-2">
        <div className="relative aspect-[3/4]">
          <Image
            src={result.beforePhotoUrl}
            alt={`${result.clientName}, antes de empezar el Adrián Method`}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover"
            priority={priority}
          />
          <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
            Antes
          </span>
        </div>
        <div className="relative aspect-[3/4]">
          <Image
            src={result.afterPhotoUrl}
            alt={`${result.clientName}, después de ${result.durationWeeks} semanas con el Adrián Method`}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover"
            loading={priority ? "eager" : "lazy"}
          />
          <span className="absolute right-2 top-2 rounded-full bg-accent-primary/90 px-2 py-0.5 text-xs font-medium text-background backdrop-blur-sm">
            Después
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="primary">{result.metric}</Badge>
          {result.verified ? <Badge tone="secondary">✓ Verificado</Badge> : null}
        </div>
        <blockquote className="font-body text-sm text-foreground-muted">
          &ldquo;{result.quote}&rdquo;
        </blockquote>
        <p className="font-display text-xs uppercase tracking-wide text-foreground-muted">
          {result.clientName} · {result.durationWeeks} semanas
        </p>
      </div>
    </Card>
  );
}
