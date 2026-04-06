alter table public.colors
  add column if not exists pantone_code text,
  add column if not exists pantone_name text,
  add column if not exists pantone_hex text,
  add column if not exists match_distance double precision,
  add column if not exists is_pantone_matched boolean default false;
