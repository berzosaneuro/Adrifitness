/**
 * Caso de éxito / transformación de un cliente.
 * Fuente de datos: `data/results.sample.ts` en esta iteración; migrará a la
 * tabla `results` de Supabase (ver supabase/schema.sql) sin cambios de tipo.
 */
export interface Result {
  id: string;
  clientName: string;
  beforePhotoUrl: string;
  afterPhotoUrl: string;
  /** Cita larga y específica del cliente, nunca genérica ("¡Me encantó!" no vale). */
  quote: string;
  /** Métrica concreta y verificable, ej. "-8kg en 12 semanas". */
  metric: string;
  durationWeeks: number;
  verified: boolean;
  /**
   * true mientras no exista un caso real que lo respalde. ResultCard
   * renderiza un estado honesto de "primeros casos en proceso" en vez de
   * inventar foto/cita — ver componente para el detalle.
   */
  isPlaceholder: boolean;
}

/**
 * Testimonio en texto (o vídeo, a futuro) no necesariamente ligado a un
 * antes/después. Componente listo para consumir esta interfaz en cuanto
 * existan testimonios reales — ver Testimonials.tsx.
 */
export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  verified: boolean;
  /** Opcional: testimonio en vídeo. No usado todavía, pero soportado sin rehacer el componente. */
  videoUrl?: string;
}

export type ContactMethod = "whatsapp" | "email";

/** Fila persistida en la tabla `leads`. */
export interface Lead {
  id: string;
  name: string;
  contactMethod: ContactMethod;
  contactValue: string;
  goal: string;
  createdAt: string;
}

/** Payload que envía el formulario — el resto de campos los genera Supabase. */
export type LeadInput = Omit<Lead, "id" | "createdAt">;

/** Prueba social agregada del Hero. Configurable vía prop, nunca hardcodeada. */
export interface SocialProofStats {
  transformationsCount: number;
  avgRating?: number;
  reviewsCount?: number;
}
