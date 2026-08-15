-- Adrián Method — esquema de Supabase
-- Ejecutar en el SQL editor del proyecto (o vía `supabase db push` con la
-- CLI). Pensado para que Adrián pueda añadir/editar `results` desde el
-- Table Editor de Supabase sin tocar código.

-- ============================================================
-- leads: entradas del formulario de la landing
-- ============================================================
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_method text not null check (contact_method in ('whatsapp', 'email')),
  contact_value text not null,
  goal text not null,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- Cualquiera puede crear un lead (es el formulario público de la landing).
create policy "leads_public_insert"
  on public.leads
  for insert
  to anon
  with check (true);

-- Sin policy de select/update/delete para "anon": por defecto RLS deniega
-- todo lo que no tenga policy, así que los leads no son legibles desde el
-- cliente. Adrián los consulta desde el dashboard de Supabase (rol
-- autenticado/admin, que ignora RLS por defecto en el Table Editor).

-- ============================================================
-- results: casos de éxito / transformaciones
-- ============================================================
create table if not exists public.results (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  before_photo_url text not null,
  after_photo_url text not null,
  quote text not null,
  metric text not null,
  duration_weeks integer not null check (duration_weeks > 0),
  verified boolean not null default false,
  is_placeholder boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.results enable row level security;

-- Solo lectura pública.
create policy "results_public_select"
  on public.results
  for select
  to anon
  using (true);

-- Inserts/updates/deletes de `results` se hacen desde el Table Editor de
-- Supabase con el rol autenticado de Adrián (RLS no aplica a ese rol por
-- defecto), no desde la app pública — por eso no hay policy de write aquí.

-- ============================================================
-- site_settings: valores editables por Adrián sin tocar código
-- (plazas disponibles, cifras reales para "en números", etc.)
-- Fila única (id fijo) — el frontend hace select().single() y si la fila
-- no existe todavía, el componente oculta la sección en vez de inventar
-- un número.
-- ============================================================
create table if not exists public.site_settings (
  id boolean primary key default true check (id),
  available_spots integer,
  active_clients_count integer,
  years_experience integer,
  sessions_completed integer,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

-- Solo lectura pública — la edición la hace Adrián desde el Table Editor.
create policy "site_settings_public_select"
  on public.site_settings
  for select
  to anon
  using (true);

-- Fila inicial vacía (todo NULL = todo oculto hasta que Adrián rellene
-- valores reales desde el Table Editor de Supabase).
insert into public.site_settings (id)
values (true)
on conflict (id) do nothing;
