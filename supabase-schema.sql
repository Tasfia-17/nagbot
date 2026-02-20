-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  twitter_id TEXT UNIQUE NOT NULL,
  twitter_handle TEXT NOT NULL,
  twitter_access_token TEXT NOT NULL,
  twitter_refresh_token TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  streak INTEGER DEFAULT 0,
  total_goals INTEGER DEFAULT 0,
  completed_goals INTEGER DEFAULT 0
);

-- Goals table
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  deadline TIMESTAMPTZ NOT NULL,
  verification_method TEXT NOT NULL CHECK (verification_method IN ('manual', 'github', 'strava', 'webhook')),
  verification_data JSONB DEFAULT '{}',
  shame_tweet_text TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'failed', 'escaped')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  tweeted_at TIMESTAMPTZ
);

-- Verification checks table
CREATE TABLE verification_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID REFERENCES goals(id) ON DELETE CASCADE,
  checked_at TIMESTAMPTZ DEFAULT NOW(),
  is_complete BOOLEAN NOT NULL,
  method_used TEXT NOT NULL,
  evidence JSONB
);

-- Indexes
CREATE INDEX idx_goals_user_id ON goals(user_id);
CREATE INDEX idx_goals_deadline ON goals(deadline);
CREATE INDEX idx_goals_status ON goals(status);
CREATE INDEX idx_verification_checks_goal_id ON verification_checks(goal_id);
