-- Create table for blog SEO metadata
CREATE TABLE IF NOT EXISTS blog_seo_metadata (
  id SERIAL PRIMARY KEY,
  blog_post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  meta_description TEXT,
  keywords TEXT[],
  has_faq BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for blog image prompts
CREATE TABLE IF NOT EXISTS blog_image_prompts (
  id SERIAL PRIMARY KEY,
  blog_post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  prompts TEXT[],
  generated BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for trending topics history
CREATE TABLE IF NOT EXISTS trending_topics_history (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  keywords TEXT[],
  estimated_search_volume TEXT,
  difficulty TEXT,
  used BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add SEO fields to blog_posts table
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_keywords TEXT[];
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_score INTEGER;
