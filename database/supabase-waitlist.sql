-- Safety Lane Waitlist Table
-- Digital Driver's License - Lead Capture

CREATE TABLE IF NOT EXISTS safety_lane_waitlist (
  id SERIAL PRIMARY KEY,
  
  -- Basic Info
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  
  -- User Type
  user_type VARCHAR(50) NOT NULL, -- 'parent', 'educator', 'investor', 'other'
  
  -- Parent-specific fields
  parent_children_ages VARCHAR(255), -- e.g., "8, 10, 13"
  parent_concerns TEXT[], -- Array of concerns
  parent_current_solution TEXT,
  
  -- Educator-specific fields
  educator_institution VARCHAR(255),
  educator_role VARCHAR(100),
  educator_student_age_range VARCHAR(50),
  
  -- Investor-specific fields
  investor_organization VARCHAR(255),
  investor_interest_area VARCHAR(100), -- 'edtech', 'safety', 'ai', 'parenting'
  investor_stage VARCHAR(50), -- 'angel', 'seed', 'series_a', 'strategic'
  
  -- Common fields
  location VARCHAR(255),
  how_heard VARCHAR(100), -- 'social_media', 'search', 'referral', 'news', 'other'
  additional_comments TEXT,
  
  -- Consent
  consent_communications BOOLEAN DEFAULT false,
  consent_data_processing BOOLEAN DEFAULT false,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT
);

-- Enable Row Level Security
ALTER TABLE safety_lane_waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role full access
CREATE POLICY "Service role can do everything" ON safety_lane_waitlist
  FOR ALL USING (true);

-- Create policy for anonymous inserts (for public form submission)
CREATE POLICY "Allow anonymous inserts" ON safety_lane_waitlist
  FOR INSERT WITH CHECK (true);

-- Create index on email for faster lookups
CREATE INDEX idx_safety_lane_waitlist_email ON safety_lane_waitlist(email);

-- Create index on user_type for analytics
CREATE INDEX idx_safety_lane_waitlist_user_type ON safety_lane_waitlist(user_type);

-- Create index on created_at for time-based queries
CREATE INDEX idx_safety_lane_waitlist_created_at ON safety_lane_waitlist(created_at DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_safety_lane_waitlist_updated_at 
  BEFORE UPDATE ON safety_lane_waitlist 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Create view for analytics (optional)
CREATE OR REPLACE VIEW safety_lane_waitlist_stats AS
SELECT 
  user_type,
  COUNT(*) as total_leads,
  COUNT(CASE WHEN consent_communications THEN 1 END) as opted_in,
  DATE_TRUNC('day', created_at) as signup_date
FROM safety_lane_waitlist
GROUP BY user_type, DATE_TRUNC('day', created_at)
ORDER BY signup_date DESC;

-- Grant access to view
GRANT SELECT ON safety_lane_waitlist_stats TO anon, authenticated;
