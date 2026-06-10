-- Ratu Oracle Neon Postgres starter schema
-- Use this after choosing the real auth provider.
-- For Google/Gmail login, connect Neon Auth or Better Auth and store the auth user id in app_users.auth_user_id.

create extension if not exists pgcrypto;

create table if not exists app_users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id text unique,
  email text not null unique,
  auth_provider text not null default 'email',
  display_name text not null,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists profiles (
  user_id uuid primary key references app_users(id) on delete cascade,
  bio text,
  primary_intention text,
  location text,
  public_profile boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists chant_spheres (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references app_users(id) on delete cascade,
  creator_id uuid references app_users(id) on delete set null,
  title text not null,
  category text not null check (category in ('Love', 'Wealth', 'Protection', 'Healing', 'Clarity')),
  intention text not null,
  status text not null default 'active' check (status in ('draft', 'active', 'private', 'sold', 'traded')),
  price_cents integer check (price_cents is null or price_cents >= 0),
  currency text not null default 'USD',
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists sphere_passports (
  id uuid primary key default gen_random_uuid(),
  sphere_id uuid not null unique references chant_spheres(id) on delete cascade,
  public_slug text not null unique,
  qr_target_url text not null unique,
  activated_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists sphere_experiences (
  id uuid primary key default gen_random_uuid(),
  sphere_id uuid not null references chant_spheres(id) on delete cascade,
  author_id uuid not null references app_users(id) on delete cascade,
  story text not null,
  photo_url text,
  visibility text not null default 'public' check (visibility in ('public', 'followers', 'private')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists marketplace_listings (
  id uuid primary key default gen_random_uuid(),
  sphere_id uuid not null references chant_spheres(id) on delete cascade,
  seller_id uuid not null references app_users(id) on delete cascade,
  listing_type text not null check (listing_type in ('sell', 'trade', 'sell_or_trade')),
  price_cents integer check (price_cents is null or price_cents >= 0),
  status text not null default 'open' check (status in ('open', 'pending', 'closed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists trade_offers (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references marketplace_listings(id) on delete cascade,
  buyer_id uuid not null references app_users(id) on delete cascade,
  offered_sphere_id uuid references chant_spheres(id) on delete set null,
  offer_cents integer check (offer_cents is null or offer_cents >= 0),
  message text,
  status text not null default 'sent' check (status in ('sent', 'accepted', 'rejected', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_chant_spheres_owner on chant_spheres(owner_id);
create index if not exists idx_chant_spheres_category on chant_spheres(category);
create index if not exists idx_sphere_experiences_sphere on sphere_experiences(sphere_id);
create index if not exists idx_marketplace_listings_status on marketplace_listings(status);
create index if not exists idx_trade_offers_listing on trade_offers(listing_id);
