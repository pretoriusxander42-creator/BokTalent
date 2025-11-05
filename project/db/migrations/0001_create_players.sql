-- 0001_create_players.sql

-- Create players table
CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  photo_url text,
  bio text,
  position text,
  height_cm integer,
  weight_kg integer,
  dominant_hand text,
  verified boolean DEFAULT false,
  owner uuid -- user id from auth
);

-- Enable RLS
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Allow players to insert/update their own row (owner match)
CREATE POLICY "Players can manage own profile" ON players
  FOR ALL USING (owner = auth.uid()) WITH CHECK (owner = auth.uid());

-- Allow anon/select for public approved fields: only verified players visible
CREATE POLICY "Public can select verified" ON players
  FOR SELECT USING (verified = true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_players_owner ON players(owner);

-- Note: auth.uid() requires Supabase Postgres auth helpers. Adjust for your setup.
