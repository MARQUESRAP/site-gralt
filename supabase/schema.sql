-- ═══════════════════════════════════════════
-- GRALT — Database Schema
-- ═══════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ───────────────────────────────────────────
-- Sections
-- ───────────────────────────────────────────
CREATE TABLE sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  color_primary TEXT NOT NULL,
  color_secondary TEXT,
  color_bg TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  "order" INTEGER NOT NULL DEFAULT 0
);

-- ───────────────────────────────────────────
-- Agents
-- ───────────────────────────────────────────
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  section_id UUID NOT NULL REFERENCES sections(id),
  subsection TEXT,
  slug TEXT NOT NULL UNIQUE,
  accroche TEXT NOT NULL,
  description_steps JSONB NOT NULL DEFAULT '[]',
  resultats JSONB NOT NULL DEFAULT '{}',
  prix_setup INTEGER NOT NULL DEFAULT 0,
  prix_mensuel INTEGER NOT NULL DEFAULT 0,
  delai TEXT NOT NULL DEFAULT '',
  roi TEXT NOT NULL DEFAULT '',
  is_golden BOOLEAN NOT NULL DEFAULT FALSE,
  color TEXT NOT NULL,
  case_study_slug TEXT,
  agents_complementaires JSONB NOT NULL DEFAULT '[]',
  "order" INTEGER NOT NULL DEFAULT 0
);

-- ───────────────────────────────────────────
-- Case Studies
-- ───────────────────────────────────────────
CREATE TABLE case_studies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('detailed', 'mini')),
  context TEXT NOT NULL DEFAULT '',
  problem TEXT NOT NULL DEFAULT '',
  solution TEXT NOT NULL DEFAULT '',
  tech JSONB NOT NULL DEFAULT '[]',
  results JSONB NOT NULL DEFAULT '[]',
  agent_slugs JSONB NOT NULL DEFAULT '[]'
);

-- ───────────────────────────────────────────
-- Form Submissions
-- ───────────────────────────────────────────
CREATE TABLE form_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  website TEXT,
  employees TEXT NOT NULL,
  sector TEXT NOT NULL,
  agents_interested JSONB NOT NULL DEFAULT '[]',
  need_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ───────────────────────────────────────────
-- Blog Posts (empty, for later)
-- ───────────────────────────────────────────
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  meta_description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ───────────────────────────────────────────
-- Indexes
-- ───────────────────────────────────────────
CREATE INDEX idx_agents_section_id ON agents(section_id);
CREATE INDEX idx_agents_slug ON agents(slug);
CREATE INDEX idx_sections_slug ON sections(slug);
CREATE INDEX idx_case_studies_slug ON case_studies(slug);
CREATE INDEX idx_case_studies_type ON case_studies(type);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_form_submissions_created ON form_submissions(created_at DESC);

-- ───────────────────────────────────────────
-- RLS Policies
-- ───────────────────────────────────────────
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read access for sections, agents, case_studies
CREATE POLICY "Public read sections" ON sections FOR SELECT USING (true);
CREATE POLICY "Public read agents" ON agents FOR SELECT USING (true);
CREATE POLICY "Public read case_studies" ON case_studies FOR SELECT USING (true);
CREATE POLICY "Public read published blog_posts" ON blog_posts FOR SELECT USING (status = 'published');

-- Public insert for form_submissions
CREATE POLICY "Public insert form_submissions" ON form_submissions FOR INSERT WITH CHECK (true);
