-- Run this once in the Supabase SQL editor to create what the admin panel needs.

create table if not exists projects    (id text primary key, position int not null default 0, data jsonb not null);
create table if not exists people      (id text primary key, position int not null default 0, data jsonb not null);
create table if not exists newsletters (id text primary key, position int not null default 0, data jsonb not null);
create table if not exists events      (id text primary key, position int not null default 0, data jsonb not null);
create table if not exists settings    (key text primary key, data jsonb not null);

-- Only the server (service role key) touches these tables. Nothing is exposed to browsers directly.
alter table projects    enable row level security;
alter table people      enable row level security;
alter table newsletters enable row level security;
alter table events      enable row level security;
alter table settings    enable row level security;

-- Public buckets for photos and newsletter PDFs.
insert into storage.buckets (id, name, public) values ('images', 'images', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('newsletters', 'newsletters', true) on conflict (id) do nothing;
create policy "public read images"      on storage.objects for select using (bucket_id = 'images');
create policy "public read newsletters" on storage.objects for select using (bucket_id = 'newsletters');
