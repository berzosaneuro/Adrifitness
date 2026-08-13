import type { Result } from "@/lib/types";

/**
 * Datos de casos de éxito — ESTADO ACTUAL: sin casos reales todavía.
 *
 * Las 3 entradas de abajo son placeholders (`isPlaceholder: true`). ResultCard
 * las detecta y renderiza un estado honesto ("Primeros casos en proceso — sé
 * de los primeros") en vez de una foto o cita inventada. `beforePhotoUrl`,
 * `afterPhotoUrl` y `quote` no se usan mientras `isPlaceholder` sea true —
 * se dejan vacíos a propósito, no rellenar con fotos de stock ni citas
 * genéricas: es exactamente lo que el spec de producto prohíbe.
 *
 * Cómo pasar a datos reales (sin tocar ResultCard/ResultsBlock):
 * 1. En cuanto Adrián mande la primera foto antes/después + cita + métrica
 *    reales, sustituye una de estas entradas por los datos reales y pon
 *    `isPlaceholder: false`.
 * 2. A partir de 2-3 casos reales, migra este array a la tabla `results` de
 *    Supabase (supabase/schema.sql) y cambia ResultsBlock para leer de ahí
 *    en vez de este archivo — el tipo `Result` es idéntico en ambos sitios.
 */
export const resultsSample: Result[] = [
  {
    id: "placeholder-1",
    clientName: "",
    beforePhotoUrl: "", // TODO: pedir foto real de antes a Adrián
    afterPhotoUrl: "", // TODO: pedir foto real de después a Adrián
    quote: "", // TODO: pedir cita real y específica al cliente
    metric: "",
    durationWeeks: 0,
    verified: false,
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    clientName: "",
    beforePhotoUrl: "",
    afterPhotoUrl: "",
    quote: "",
    metric: "",
    durationWeeks: 0,
    verified: false,
    isPlaceholder: true,
  },
  {
    id: "placeholder-3",
    clientName: "",
    beforePhotoUrl: "",
    afterPhotoUrl: "",
    quote: "",
    metric: "",
    durationWeeks: 0,
    verified: false,
    isPlaceholder: true,
  },
];
