-- ==============================================================================
-- SCHEMA SUPABASE PARA: GRACE & FLUENCY (INGLÊS & FÉ EM CASAL)
-- Execute este script no SQL Editor do seu projeto Supabase
-- ==============================================================================

-- 1. TABELA DE CASAIS (UNIDADES FAMILIARES)
CREATE TABLE IF NOT EXISTS public.couples (
  id TEXT PRIMARY KEY,
  husband_name TEXT NOT NULL,
  husband_emoji TEXT DEFAULT '👨‍💻',
  husband_level TEXT DEFAULT 'Iniciante',
  wife_name TEXT NOT NULL,
  wife_emoji TEXT DEFAULT '👩‍💼',
  wife_level TEXT DEFAULT 'Iniciante',
  couple_pin TEXT NOT NULL, -- Senha de acesso do casal
  is_admin BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'approved', -- 'approved' | 'pending' | 'blocked'
  couple_goal JSONB DEFAULT '{"title": "Estudo em Casal: 7 Dias de Fé & Fluência", "targetDays": 7, "loveNote": "Juntos somos mais fortes e mais sábios na Palavra."}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 2. TABELA DE PROGRESSÃO INDIVIDUAL DOS PERFIS
CREATE TABLE IF NOT EXISTS public.profiles_progress (
  id TEXT PRIMARY KEY, -- formato: {couple_id}_husband ou {couple_id}_wife
  couple_id TEXT NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  role TEXT NOT NULL, -- 'husband' ou 'wife'
  streak INTEGER DEFAULT 0,
  last_study_date TIMESTAMPTZ,
  points INTEGER DEFAULT 0,
  completed_devotionals JSONB DEFAULT '[]'::jsonb,
  memorized_verses JSONB DEFAULT '[]'::jsonb,
  flashcards JSONB DEFAULT '[]'::jsonb,
  completed_quizzes JSONB DEFAULT '[]'::jsonb,
  favorite_songs JSONB DEFAULT '[]'::jsonb,
  study_history JSONB DEFAULT '[]'::jsonb,
  weekly_goal JSONB DEFAULT '{"targetDevotionals": 5, "targetFlashcards": 25}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 3. TABELA DE CONFIGURAÇÕES DO SISTEMA & CONTROLE DE ACESSO
CREATE TABLE IF NOT EXISTS public.system_config (
  id TEXT PRIMARY KEY DEFAULT 'main',
  master_invite_code TEXT DEFAULT 'GRACE2026', -- Código obrigatório para novos casais cadastrarem
  require_admin_approval BOOLEAN DEFAULT true, -- Se novos casais precisam de aprovação manual do admin
  gemini_api_key TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Inserir configuração inicial se não existir
INSERT INTO public.system_config (id, master_invite_code, require_admin_approval)
VALUES ('main', 'GRACE2026', true)
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- POLÍTICAS DE ACESSO (ROW LEVEL SECURITY)
-- ==============================================================================
ALTER TABLE public.couples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_config ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso aberto com a chave anon pública do cliente
DROP POLICY IF EXISTS "Permitir leitura dos casais" ON public.couples;
CREATE POLICY "Permitir leitura dos casais" ON public.couples FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir leitura do progresso" ON public.profiles_progress;
CREATE POLICY "Permitir leitura do progresso" ON public.profiles_progress FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir leitura de configs" ON public.system_config;
CREATE POLICY "Permitir leitura de configs" ON public.system_config FOR ALL USING (true) WITH CHECK (true);

