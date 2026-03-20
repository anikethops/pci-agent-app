create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz default now()
);

create table if not exists sections (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  slug text not null,
  title text not null,
  subtitle text default '',
  category text default 'Custom',
  content text default '',
  locked boolean default false,
  position integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists notes (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  section_id uuid references sections(id) on delete cascade,
  anchor_key text default '',
  anchor_title text default '',
  note_html text default '',
  tags text[] default array['Important']::text[],
  status text default 'open',
  position_mode text default 'floating',
  x double precision,
  y double precision,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists bookmarks (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  section_id uuid references sections(id) on delete cascade,
  label text not null,
  created_at timestamptz default now()
);

create table if not exists snapshots (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null,
  data jsonb not null,
  created_at timestamptz default now()
);

create table if not exists change_logs (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null,
  label text not null,
  meta jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table sections enable row level security;
alter table notes enable row level security;
alter table bookmarks enable row level security;
alter table snapshots enable row level security;
alter table change_logs enable row level security;

drop policy if exists profiles_select_own on profiles;
drop policy if exists profiles_insert_own on profiles;
drop policy if exists profiles_update_own on profiles;
drop policy if exists sections_own_all on sections;
drop policy if exists notes_own_all on notes;
drop policy if exists bookmarks_own_all on bookmarks;
drop policy if exists snapshots_own_all on snapshots;
drop policy if exists change_logs_own_all on change_logs;

create policy profiles_select_own on profiles for select using (auth.uid() = id);
create policy profiles_insert_own on profiles for insert with check (auth.uid() = id);
create policy profiles_update_own on profiles for update using (auth.uid() = id);

create policy sections_own_all on sections for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy notes_own_all on notes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy bookmarks_own_all on bookmarks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy snapshots_own_all on snapshots for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy change_logs_own_all on change_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure handle_new_user();
