import { Badge } from "@/components/ui/Badge";

interface SpotsBadgeProps {
  /** null = Adrián no ha configurado la cifra en Supabase todavía → no se renderiza nada. */
  spots: number | null;
}

// Contador de plazas real, nunca inventado: si `spots` es null (valor por
// defecto hasta que Adrián lo rellene en site_settings desde el Table
// Editor de Supabase), este componente no pinta nada — ver
// lib/supabase.ts#getSiteSettings.
export function SpotsBadge({ spots }: SpotsBadgeProps) {
  if (spots === null) return null;

  return (
    <Badge tone={spots <= 3 ? "primary" : "secondary"}>
      {spots > 0
        ? `Quedan ${spots} plaza${spots === 1 ? "" : "s"} este mes`
        : "Lista de espera abierta — plazas completas este mes"}
    </Badge>
  );
}
