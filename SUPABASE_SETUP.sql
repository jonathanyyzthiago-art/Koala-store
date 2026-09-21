create table if not exists public.store_config (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.store_config enable row level security;

create policy "admin can read own store config"
on public.store_config for select to authenticated
using (auth.uid() = user_id);

create policy "admin can insert own store config"
on public.store_config for insert to authenticated
with check (auth.uid() = user_id);

create policy "admin can update own store config"
on public.store_config for update to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
