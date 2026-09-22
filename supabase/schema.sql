-- ==============================================================================
-- ASVITHI TRENDZ - SUPABASE DATABASE & STORAGE SETUP SCRIPT
-- ==============================================================================
-- Run this SQL in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query)
-- ==============================================================================

-- 1. CREATE OR UPGRADE 'dresses' TABLE WITH DUAL-ANGLE & COLOR VARIANT SUPPORT
CREATE TABLE IF NOT EXISTS public.dresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    code TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC,
    image_url TEXT NOT NULL,
    back_image_url TEXT,
    color_variants JSONB,
    fabric TEXT,
    sizes TEXT[],
    available_sizes TEXT[],
    gallery_images TEXT[],
    images TEXT[],
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- In case the table already exists, safely add any missing columns
ALTER TABLE public.dresses ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.dresses ADD COLUMN IF NOT EXISTS back_image_url TEXT;
ALTER TABLE public.dresses ADD COLUMN IF NOT EXISTS variants JSONB;
ALTER TABLE public.dresses ADD COLUMN IF NOT EXISTS color_variants JSONB;
ALTER TABLE public.dresses ADD COLUMN IF NOT EXISTS fabric TEXT;
ALTER TABLE public.dresses ADD COLUMN IF NOT EXISTS sizes TEXT[];
ALTER TABLE public.dresses ADD COLUMN IF NOT EXISTS available_sizes TEXT[];
ALTER TABLE public.dresses ADD COLUMN IF NOT EXISTS gallery_images TEXT[];
ALTER TABLE public.dresses ADD COLUMN IF NOT EXISTS images TEXT[];

NOTIFY pgrst, 'reload schema';

-- Index for speedy catalog sorting & category filtering
CREATE INDEX IF NOT EXISTS idx_dresses_category ON public.dresses(category);
CREATE INDEX IF NOT EXISTS idx_dresses_created_at ON public.dresses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_dresses_code ON public.dresses(code);

-- 2. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.dresses ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all users/visitors
DROP POLICY IF EXISTS "Public can view dresses" ON public.dresses;
CREATE POLICY "Public can view dresses"
ON public.dresses
FOR SELECT
TO public
USING (true);

-- Allow inserting new dresses (for simple admin with PIN)
DROP POLICY IF EXISTS "Allow insert to dresses" ON public.dresses;
CREATE POLICY "Allow insert to dresses"
ON public.dresses
FOR INSERT
TO public
WITH CHECK (true);

-- Allow deleting dresses (for simple admin with PIN)
DROP POLICY IF EXISTS "Allow delete to dresses" ON public.dresses;
CREATE POLICY "Allow delete to dresses"
ON public.dresses
FOR DELETE
TO public
USING (true);

-- Allow updating dresses
DROP POLICY IF EXISTS "Allow update to dresses" ON public.dresses;
CREATE POLICY "Allow update to dresses"
ON public.dresses
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);


-- 3. CREATE STORAGE BUCKET FOR DRESS IMAGES
INSERT INTO storage.buckets (id, name, public)
VALUES ('dress-images', 'dress-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 4. STORAGE BUCKET ROW LEVEL SECURITY POLICIES
-- Allow public viewing/downloading of images
DROP POLICY IF EXISTS "Public Read Access for dress-images" ON storage.objects;
CREATE POLICY "Public Read Access for dress-images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'dress-images');

-- Allow uploading images to dress-images bucket
DROP POLICY IF EXISTS "Allow Public Upload to dress-images" ON storage.objects;
CREATE POLICY "Allow Public Upload to dress-images"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'dress-images');

-- Allow updating/upserting images in dress-images bucket
DROP POLICY IF EXISTS "Allow Public Update to dress-images" ON storage.objects;
CREATE POLICY "Allow Public Update to dress-images"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'dress-images')
WITH CHECK (bucket_id = 'dress-images');

-- Allow deleting images from dress-images bucket
DROP POLICY IF EXISTS "Allow Public Delete from dress-images" ON storage.objects;
CREATE POLICY "Allow Public Delete from dress-images"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'dress-images');

