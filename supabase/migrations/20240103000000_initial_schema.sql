-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Enums
CREATE TYPE impact_category AS ENUM ('execution', 'strategy', 'networking', 'learning');

-- 1. Profiles Table
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    full_name TEXT,
    avatar_url TEXT,
    job_title TEXT,
    target_velocity FLOAT DEFAULT 1.0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Daily Logs Table
CREATE TABLE daily_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid(),
    content_text TEXT,
    audio_url TEXT,
    date DATE DEFAULT CURRENT_DATE,
    sentiment_score FLOAT DEFAULT 0.0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Impact Events Table
CREATE TABLE impact_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid(),
    log_id UUID REFERENCES daily_logs(id),
    category impact_category DEFAULT 'execution',
    title TEXT,
    leverage_score INT DEFAULT 1,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Velocity Metrics Table
CREATE TABLE velocity_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid(),
    date DATE,
    velocity_score FLOAT DEFAULT 0.0,
    rolling_average_7d FLOAT DEFAULT 0.0,
    delta_vs_baseline FLOAT DEFAULT 0.0
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE velocity_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles
CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
ON profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Daily Logs
CREATE POLICY "Users can view own data" 
ON daily_logs FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own data" 
ON daily_logs FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own data" 
ON daily_logs FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own data" 
ON daily_logs FOR DELETE 
USING (auth.uid() = user_id);

-- Impact Events
CREATE POLICY "Users can view own data" 
ON impact_events FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own data" 
ON impact_events FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own data" 
ON impact_events FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own data" 
ON impact_events FOR DELETE 
USING (auth.uid() = user_id);

-- Velocity Metrics
CREATE POLICY "Users can view own data" 
ON velocity_metrics FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own data" 
ON velocity_metrics FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own data" 
ON velocity_metrics FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own data" 
ON velocity_metrics FOR DELETE 
USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_profiles_id ON profiles(id);
CREATE INDEX idx_daily_logs_user_date ON daily_logs(user_id, date);
CREATE INDEX idx_impact_events_user_created ON impact_events(user_id, created_at);
CREATE INDEX idx_velocity_metrics_user_date ON velocity_metrics(user_id, date);
