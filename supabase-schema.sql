-- ============================================================
-- TradeTrack X — Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── USERS PROFILE (extends Supabase auth.users) ──────────
create table public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  username    text unique,
  full_name   text,
  avatar_url  text,
  created_at  timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Users can view own profile"  on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── TRADES ───────────────────────────────────────────────
create table public.trades (
  id            uuid default uuid_generate_v4() primary key,
  user_id       uuid references public.profiles(id) on delete cascade not null,
  asset_name    text not null,
  asset_type    text check (asset_type in ('stock','crypto','forex','commodity','index')) default 'stock',
  direction     text check (direction in ('long','short')) not null,
  buy_price     numeric(18,4) not null,
  sell_price    numeric(18,4),
  quantity      numeric(18,4) not null,
  profit_loss   numeric(18,4) generated always as (
                  case when sell_price is not null
                  then (sell_price - buy_price) * quantity
                  else null end
                ) stored,
  emotion       text check (emotion in ('confident','greedy','fearful','neutral','disciplined','fomo','revenge')) default 'neutral',
  setup         text,
  notes         text,
  status        text check (status in ('open','closed','cancelled')) default 'open',
  risk_reward   numeric(6,2),
  stop_loss     numeric(18,4),
  take_profit   numeric(18,4),
  entry_date    timestamptz default now(),
  exit_date     timestamptz,
  created_at    timestamptz default now()
);
alter table public.trades enable row level security;
create policy "Users see own trades" on public.trades for all using (auth.uid() = user_id);
create index idx_trades_user_id on public.trades(user_id);
create index idx_trades_entry_date on public.trades(entry_date desc);

-- ─── CRYPTO WATCHLIST ─────────────────────────────────────
create table public.crypto_watchlist (
  id               uuid default uuid_generate_v4() primary key,
  user_id          uuid references public.profiles(id) on delete cascade not null,
  coin_id          text not null,
  coin_name        text not null,
  coin_symbol      text not null,
  added_at         timestamptz default now(),
  unique(user_id, coin_id)
);
alter table public.crypto_watchlist enable row level security;
create policy "Users manage own watchlist" on public.crypto_watchlist for all using (auth.uid() = user_id);

-- ─── CRICKET MATCHES ──────────────────────────────────────
create table public.cricket_matches (
  id              uuid default uuid_generate_v4() primary key,
  match_id        text unique not null,
  match_name      text not null,
  team_1          text not null,
  team_2          text not null,
  match_type      text check (match_type in ('ipl','odi','t20','test','other')) default 'other',
  venue           text,
  match_date      timestamptz,
  toss_winner     text,
  toss_decision   text,
  winner          text,
  prediction      jsonb,
  status          text default 'upcoming',
  created_at      timestamptz default now()
);

-- ─── USER PREDICTIONS (for cricket) ──────────────────────
create table public.user_predictions (
  id          uuid default uuid_generate_v4() primary key,
  user_id     uuid references public.profiles(id) on delete cascade not null,
  match_id    uuid references public.cricket_matches(id) on delete cascade not null,
  predicted_winner text not null,
  is_correct  boolean,
  created_at  timestamptz default now(),
  unique(user_id, match_id)
);
alter table public.user_predictions enable row level security;
create policy "Users manage own predictions" on public.user_predictions for all using (auth.uid() = user_id);

-- ─── JOURNAL NOTES ────────────────────────────────────────
create table public.journal_notes (
  id          uuid default uuid_generate_v4() primary key,
  user_id     uuid references public.profiles(id) on delete cascade not null,
  title       text,
  content     text not null,
  mood        text check (mood in ('great','good','neutral','bad','terrible')) default 'neutral',
  tags        text[],
  created_at  timestamptz default now()
);
alter table public.journal_notes enable row level security;
create policy "Users manage own notes" on public.journal_notes for all using (auth.uid() = user_id);

-- ============================================================
-- Done! Now go set up your Supabase Auth providers
-- (Email, Google) in: Authentication → Providers
-- ============================================================
