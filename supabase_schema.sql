-- ============================================================
-- Brothers Parappara Club — Supabase SQL Schema Setup
-- Paste this entire script into the Supabase SQL Editor and click "Run"
-- ============================================================

-- 1. MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    wing TEXT NOT NULL, -- e.g. Football Squad, Cricket Club, Arts & Culture Guild
    age_group TEXT,     -- e.g. Juniors, Youth, Seniors
    address TEXT,
    member_id TEXT UNIQUE NOT NULL, -- e.g. BP-2026-1234
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- Allow public to register (insert)
CREATE POLICY "Allow public insert to members" 
ON public.members FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Allow public to view member roster
CREATE POLICY "Allow public read of members" 
ON public.members FOR SELECT 
TO anon, authenticated 
USING (true);


-- 2. EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    month TEXT NOT NULL,       -- e.g. NOV, DEC
    day TEXT NOT NULL,         -- e.g. 15, 28, 05
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    time TEXT NOT NULL,
    image TEXT NOT NULL,
    category TEXT DEFAULT 'Sports',
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read of events" 
ON public.events FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Allow authenticated insert to events" 
ON public.events FOR INSERT 
TO authenticated 
WITH CHECK (true);


-- 3. EVENT RSVPS TABLE
CREATE TABLE IF NOT EXISTS public.event_rsvps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id TEXT NOT NULL,
    participant_name TEXT NOT NULL,
    pass_code TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.event_rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to event_rsvps" 
ON public.event_rsvps FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Allow public read of event_rsvps" 
ON public.event_rsvps FOR SELECT 
TO anon, authenticated 
USING (true);


-- 4. NEWS & NOTICES TABLE
CREATE TABLE IF NOT EXISTS public.news_updates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tag TEXT NOT NULL,         -- NEWS, ACHIEVEMENT, NOTICE
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT DEFAULT 'Club Secretary',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.news_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read of news_updates" 
ON public.news_updates FOR SELECT 
TO anon, authenticated 
USING (true);


-- 5. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone_or_email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to contact_messages" 
ON public.contact_messages FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);


-- 6. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    is_video BOOLEAN DEFAULT false,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read of gallery" 
ON public.gallery FOR SELECT 
TO anon, authenticated 
USING (true);


-- ============================================================
-- SEED INITIAL DATA (Matches the Brothers Parappara website)
-- ============================================================

INSERT INTO public.events (month, day, title, location, time, image, category, description)
VALUES 
('NOV', '15', 'Annual Football Tournament', 'Parappara Ground', '8:00 AM - 6:00 PM', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80', 'Sports', 'The marquee 7v7 football knockout tournament featuring 16 top local clubs from across the district competing for the Rolling Trophy.'),
('NOV', '28', 'Cultural Evening', 'Club Auditorium', '5:00 PM - 10:00 PM', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80', 'Arts & Culture', 'A gala night of music, classical & cinematic dance, comedy drama, and honor ceremonies for community achievers.'),
('DEC', '05', 'Cricket Championship', 'Parappara Ground', '8:00 AM - 6:00 PM', 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=800&q=80', 'Sports', '10-over limited overs cricket championship with exciting prizes, live commentary, and player of the tournament awards.')
ON CONFLICT DO NOTHING;

INSERT INTO public.news_updates (tag, title, date, content, author)
VALUES 
('NEWS', 'New Members Registration Open', 'Oct 10, 2026', 'Registrations are officially open for the new season! Youth and community members interested in football coaching, cricket nets, or cultural arts are invited to join.', 'Club Secretary'),
('ACHIEVEMENT', 'Our Team Wins Inter-Club Football Championship', 'Oct 05, 2026', 'Hearty congratulations to Brothers Parappara FC for winning the prestigious Taluk Football Championship with a stellar 3-1 victory in the final match!', 'Sports Committee'),
('NOTICE', 'Club Maintenance This Sunday', 'Oct 02, 2026', 'A volunteer cleanup and ground maintenance drive will be held this Sunday starting at 7:30 AM. All members are requested to join hands in keeping our grounds green and clean.', 'Executive Committee')
ON CONFLICT DO NOTHING;
