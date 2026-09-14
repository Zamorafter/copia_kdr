-- =========================================================
-- ESQUEMA DE BASE DE DATOS Y STORAGE PARA URBAN GLOW 3D
-- Ejecuta este script en el "SQL Editor" de tu proyecto de Supabase
-- =========================================================

-- 1. Crear tabla de camisas
create table if not exists public.shirts (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  tag text default 'NUEVO',
  category text default 'Streetwear',
  image text not null,
  description text default '',
  color_3d text default '#161824',
  accent_color text default '#e1306c',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Habilitar Seguridad a Nivel de Fila (RLS)
alter table public.shirts enable row level security;

-- Limpiar políticas previas si existieran
drop policy if exists "Cualquiera puede ver las camisas" on public.shirts;
drop policy if exists "Solo admin puede insertar camisas" on public.shirts;
drop policy if exists "Solo admin puede actualizar camisas" on public.shirts;
drop policy if exists "Solo admin puede eliminar camisas" on public.shirts;

-- 3. Políticas de la tabla de camisas
-- Permitir lectura a todo el público (visitantes anónimos y registrados)
create policy "Cualquiera puede ver las camisas"
  on public.shirts for select
  using (true);

-- Solo administradores autenticados pueden crear camisas
create policy "Solo admin puede insertar camisas"
  on public.shirts for insert
  with check (auth.role() = 'authenticated');

-- Solo administradores autenticados pueden actualizar camisas
create policy "Solo admin puede actualizar camisas"
  on public.shirts for update
  using (auth.role() = 'authenticated');

-- Solo administradores autenticados pueden eliminar camisas
create policy "Solo admin puede eliminar camisas"
  on public.shirts for delete
  using (auth.role() = 'authenticated');

-- 4. Crear bucket público para imágenes de camisas
insert into storage.buckets (id, name, public) 
values ('shirt-images', 'shirt-images', true)
on conflict (id) do nothing;

-- 5. Políticas de Storage para el bucket shirt-images
drop policy if exists "Imagenes publicas para lectura" on storage.objects;
drop policy if exists "Solo admin puede subir imagenes" on storage.objects;
drop policy if exists "Solo admin puede actualizar imagenes" on storage.objects;
drop policy if exists "Solo admin puede borrar imagenes" on storage.objects;

create policy "Imagenes publicas para lectura"
  on storage.objects for select
  using (bucket_id = 'shirt-images');

create policy "Solo admin puede subir imagenes"
  on storage.objects for insert
  with check (bucket_id = 'shirt-images' and auth.role() = 'authenticated');

create policy "Solo admin puede actualizar imagenes"
  on storage.objects for update
  using (bucket_id = 'shirt-images' and auth.role() = 'authenticated');

create policy "Solo admin puede borrar imagenes"
  on storage.objects for delete
  using (bucket_id = 'shirt-images' and auth.role() = 'authenticated');
