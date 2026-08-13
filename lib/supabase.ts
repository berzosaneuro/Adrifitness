import { createClient, type SupabaseClient } from "@supabase/supabase-js";

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
