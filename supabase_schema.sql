-- ==============================================================================
-- GRACE & FLUENCY — SCHEMA SUPABASE (v2: Supabase Auth + RLS)
-- Execute este script INTEIRO no SQL Editor do Supabase (pode rodar mais de uma vez).
--
-- Segurança:
--  * Senhas ficam no Supabase Auth (criptografadas), nunca em tabelas públicas.
--  * O cadastro só é aceito com o código de convite (validado DENTRO do banco).
--  * O 1º casal cadastrado vira administrador automaticamente.
--  * Casais "pending" ou "blocked" não conseguem gravar nada (RLS).
--  * Usuários comuns não conseguem se promover a admin nem se auto-aprovar.
-- ==============================================================================

-- 1. CONFIGURAÇÃO DO SISTEMA ---------------------------------------------------
CREATE TABLE IF NOT EXISTS public.system_config (
  id TEXT PRIMARY KEY DEFAULT 'main' CHECK (id = 'main'),
  master_invite_code TEXT NOT NULL DEFAULT 'GRACE2026',
  require_admin_approval BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.system_config (id) VALUES ('main') ON CONFLICT (id) DO NOTHING;

-- 2. CASAIS (1 conta de login = 1 casal) ---------------------------------------
CREATE TABLE IF NOT EXISTS public.couples (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  husband_name TEXT NOT NULL,
  husband_emoji TEXT NOT NULL DEFAULT '👨‍💻',
  husband_level TEXT NOT NULL DEFAULT 'Iniciante',
  wife_name TEXT NOT NULL,
  wife_emoji TEXT NOT NULL DEFAULT '👩‍💼',
  wife_level TEXT NOT NULL DEFAULT 'Iniciante',
  is_admin BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('approved', 'pending', 'blocked')),
  couple_goal JSONB NOT NULL DEFAULT '{"title": "Estudo em Casal: 7 Dias de Fé & Fluência", "targetDays": 7, "loveNote": "Juntos somos mais fortes e mais sábios na Palavra. ❤️"}'::jsonb,
  preferences JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. PROGRESSO INDIVIDUAL (2 linhas por casal: husband e wife) -----------------
CREATE TABLE IF NOT EXISTS public.profiles_progress (
  couple_id UUID NOT NULL REFERENCES public.couples(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('husband', 'wife')),
  streak INTEGER NOT NULL DEFAULT 0,
  last_study_date TIMESTAMPTZ,
  points INTEGER NOT NULL DEFAULT 0,
  completed_devotionals JSONB NOT NULL DEFAULT '[]'::jsonb,
  memorized_verses JSONB NOT NULL DEFAULT '[]'::jsonb,
  flashcards JSONB NOT NULL DEFAULT '[]'::jsonb,
  completed_quizzes JSONB NOT NULL DEFAULT '[]'::jsonb,
  favorite_songs JSONB NOT NULL DEFAULT '[]'::jsonb,
  study_history JSONB NOT NULL DEFAULT '[]'::jsonb,
  weekly_goal JSONB NOT NULL DEFAULT '{"targetDevotionals": 5, "targetFlashcards": 25}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (couple_id, role),
  -- Trava anti-abuso: nenhuma linha de progresso passa de ~1 MB
  CONSTRAINT progress_row_size CHECK (
    pg_column_size(flashcards) + pg_column_size(study_history) + pg_column_size(completed_devotionals)
    + pg_column_size(memorized_verses) + pg_column_size(completed_quizzes) + pg_column_size(favorite_songs) < 1000000
  )
);

-- 4. FUNÇÕES AUXILIARES --------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT COALESCE((SELECT is_admin FROM public.couples WHERE id = auth.uid()), false);
$$;

CREATE OR REPLACE FUNCTION public.is_approved()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT COALESCE((SELECT status = 'approved' OR is_admin FROM public.couples WHERE id = auth.uid()), false);
$$;

-- Validação do convite ANTES do cadastro (devolve só true/false, nunca o código)
CREATE OR REPLACE FUNCTION public.check_invite_code(code TEXT)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT NOT EXISTS (SELECT 1 FROM public.couples)
      OR upper(trim(COALESCE(code, ''))) = (SELECT upper(trim(master_invite_code)) FROM public.system_config WHERE id = 'main');
$$;

GRANT EXECUTE ON FUNCTION public.check_invite_code(TEXT) TO anon, authenticated;

-- 5. GATILHO DE CADASTRO: cria o casal + 2 perfis ZERADOS ----------------------
CREATE OR REPLACE FUNCTION public.handle_new_couple()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  meta JSONB := COALESCE(NEW.raw_user_meta_data, '{}'::jsonb);
  cfg public.system_config;
  first_couple BOOLEAN;
  new_status TEXT;
BEGIN
  SELECT * INTO cfg FROM public.system_config WHERE id = 'main';
  SELECT NOT EXISTS (SELECT 1 FROM public.couples) INTO first_couple;

  -- Sem convite válido, o cadastro inteiro é cancelado (nem o login é criado)
  IF NOT first_couple AND upper(trim(COALESCE(meta->>'invite_code', ''))) <> upper(trim(cfg.master_invite_code)) THEN
    RAISE EXCEPTION 'INVALID_INVITE_CODE';
  END IF;

  new_status := CASE
    WHEN first_couple THEN 'approved'
    WHEN cfg.require_admin_approval THEN 'pending'
    ELSE 'approved'
  END;

  INSERT INTO public.couples (id, email, husband_name, husband_emoji, husband_level, wife_name, wife_emoji, wife_level, is_admin, status)
  VALUES (
    NEW.id,
    lower(NEW.email),
    left(COALESCE(NULLIF(trim(meta->>'husband_name'), ''), 'Esposo'), 60),
    left(COALESCE(NULLIF(trim(meta->>'husband_emoji'), ''), '👨‍💻'), 16),
    COALESCE(NULLIF(meta->>'husband_level', ''), 'Iniciante'),
    left(COALESCE(NULLIF(trim(meta->>'wife_name'), ''), 'Esposa'), 60),
    left(COALESCE(NULLIF(trim(meta->>'wife_emoji'), ''), '👩‍💼'), 16),
    COALESCE(NULLIF(meta->>'wife_level', ''), 'Iniciante'),
    first_couple,
    new_status
  );

  INSERT INTO public.profiles_progress (couple_id, role) VALUES (NEW.id, 'husband'), (NEW.id, 'wife');
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_couple();

-- 6. PROTEÇÃO: só admin muda status/is_admin; ninguém muda id/email ------------
CREATE OR REPLACE FUNCTION public.protect_couple_columns()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.is_admin() THEN
    NEW.is_admin := OLD.is_admin;
    NEW.status := OLD.status;
  END IF;
  NEW.id := OLD.id;
  NEW.email := OLD.email;
  NEW.created_at := OLD.created_at;
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS couples_protect_columns ON public.couples;
CREATE TRIGGER couples_protect_columns
  BEFORE UPDATE ON public.couples
  FOR EACH ROW EXECUTE FUNCTION public.protect_couple_columns();

-- 7. ROW LEVEL SECURITY --------------------------------------------------------
ALTER TABLE public.couples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_config ENABLE ROW LEVEL SECURITY;

-- couples
DROP POLICY IF EXISTS couples_select ON public.couples;
CREATE POLICY couples_select ON public.couples FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS couples_update ON public.couples;
CREATE POLICY couples_update ON public.couples FOR UPDATE TO authenticated
  USING ((id = auth.uid() AND public.is_approved()) OR public.is_admin())
  WITH CHECK ((id = auth.uid() AND public.is_approved()) OR public.is_admin());

-- profiles_progress
DROP POLICY IF EXISTS progress_select ON public.profiles_progress;
CREATE POLICY progress_select ON public.profiles_progress FOR SELECT TO authenticated
  USING (couple_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS progress_update ON public.profiles_progress;
CREATE POLICY progress_update ON public.profiles_progress FOR UPDATE TO authenticated
  USING (couple_id = auth.uid() AND public.is_approved())
  WITH CHECK (couple_id = auth.uid() AND public.is_approved());

-- system_config (só o admin lê/edita; o convite é validado pela função acima)
DROP POLICY IF EXISTS config_admin_select ON public.system_config;
CREATE POLICY config_admin_select ON public.system_config FOR SELECT TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS config_admin_update ON public.system_config;
CREATE POLICY config_admin_update ON public.system_config FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
