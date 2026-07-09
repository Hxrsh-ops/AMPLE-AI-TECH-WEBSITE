-- SUPABASE SETUP SQL FOR AMPLETECHAI WEBSITE

-- 1. Create contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    location TEXT,
    subject TEXT,
    service_type TEXT,
    message TEXT NOT NULL,
    plan TEXT,
    status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'in_progress', 'resolved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on both tables
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Note: Since we are querying Supabase from our Netlify Functions using the SUPABASE_SERVICE_ROLE_KEY,
-- the requests automatically bypass RLS policies (as the service_role key acts as superuser).
-- However, we define these policies to completely lock down and prevent any public anon access.

-- Policy for contact_submissions: Deny all public anon reads and writes
CREATE POLICY "Deny public anon access to contact submissions"
ON contact_submissions
FOR ALL
USING (false)
WITH CHECK (false);

-- Policy for newsletter_subscribers: Deny all public anon reads and writes
CREATE POLICY "Deny public anon access to newsletter subscribers"
ON newsletter_subscribers
FOR ALL
USING (false)
WITH CHECK (false);

-- Add indexes for common query fields (to optimize dashboard lookups)
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_created_at ON newsletter_subscribers(created_at DESC);

-- 3. Create admin login attempts tracking table for IP lockout
CREATE TABLE IF NOT EXISTS admin_login_attempts (
    ip TEXT PRIMARY KEY,
    attempts INT NOT NULL DEFAULT 1,
    locked_until TIMESTAMP WITH TIME ZONE
);

ALTER TABLE admin_login_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Deny public anon access to login attempts"
ON admin_login_attempts
FOR ALL
USING (false)
WITH CHECK (false);

-- 4. Create rate limits tracking table for form submissions rate limiting
CREATE TABLE IF NOT EXISTS rate_limits (
    key TEXT PRIMARY KEY,
    hits INT NOT NULL DEFAULT 1,
    last_request TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Deny public anon access to rate limits"
ON rate_limits
FOR ALL
USING (false)
WITH CHECK (false);

