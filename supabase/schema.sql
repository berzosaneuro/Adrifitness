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
