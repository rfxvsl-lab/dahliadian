-- SQL Script untuk Supabase Dashboard
-- Copy & paste di SQL Editor di Supabase Console

-- 1. Create portfolios table
CREATE TABLE IF NOT EXISTS portfolios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 2. Enable RLS (Row Level Security)
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS policies
CREATE POLICY "Users can read their own portfolio"
  ON portfolios FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own portfolio"
  ON portfolios FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own portfolio"
  ON portfolios FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own portfolio"
  ON portfolios FOR DELETE
  USING (auth.uid() = user_id);

-- 4. Create storage bucket untuk media (images & videos)
-- Jalankan di Storage menu: CREATE NEW BUCKET > portfolio-media > Make it public

-- 5. Create index untuk performance
CREATE INDEX idx_portfolios_user_id ON portfolios(user_id);
