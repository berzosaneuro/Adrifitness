import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { SiteSettings } from "@/lib/types";

/**
 * Cliente único para leer/escribir en Supabase.
 *
 * Usamos la anon key (segura para exponer, NEXT_PUBLIC_*) tanto en servidor
 * como en cliente: no necesitamos la service role key porque las políticas
 * RLS de supabase/schema.sql ya limitan exactamente lo que la anon key puede
 * hacer (insert público en `leads`, solo lectura en `results`). Menos
 * superficie de secretos que gestionar en Vercel.
 *
 * Lazy + guardado: en esta iteración `results` se sirve desde
 * data/results.sample.ts, así que el build no debe romperse si las env vars
 * de Supabase todavía no existen. Solo /api/leads llama a getSupabaseClient()
 * en tiempo de request.
 */
let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY. Configúralas en .env.local o en Vercel."
    );
  }

  cachedClient = createClient(url, anonKey, {
    auth: { persistSession: false },
  });
  return cachedClient;
}

/**
 * Lee la fila única de `site_settings`. Nunca lanza: si faltan env vars, si
 * la tabla todavía no existe, o si la query falla por lo que sea, devuelve
 * todo en null — los componentes que consumen esto (SpotsBadge,
 * StatsCounters) tratan null exactamente igual que "Adrián no lo ha
 * rellenado todavía" y se ocultan, en vez de romper el build o mostrar un
 * error al visitante.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const empty: SiteSettings = {
    availableSpots: null,
    activeClientsCount: null,
    yearsExperience: null,
    sessionsCompleted: null,
  };

  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from("site_settings")
      .select("available_spots, active_clients_count, years_experience, sessions_completed")
      .eq("id", true)
      .single();

    if (error || !data) return empty;

    return {
      availableSpots: data.available_spots ?? null,
      activeClientsCount: data.active_clients_count ?? null,
      yearsExperience: data.years_experience ?? null,
      sessionsCompleted: data.sessions_completed ?? null,
    };
  } catch {
    return empty;
  }
}
