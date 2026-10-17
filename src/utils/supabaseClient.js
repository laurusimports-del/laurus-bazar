import { createClient } from '@supabase/supabase-js';

const getStoredOrEnv = (storageKey, envVal, fallback) => {
  try {
    const custom = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null;
    if (custom && custom.trim()) return custom.trim();
  } catch (e) {}
  return envVal || fallback;
};

export const getSupabaseCredentials = () => {
  const url = getStoredOrEnv(
    'bazar_custom_supabase_url',
    import.meta.env?.VITE_SUPABASE_URL,
    'https://rluojbfoimbpoimgdyqh.supabase.co'
  );
  const anonKey = getStoredOrEnv(
    'bazar_custom_supabase_key',
    import.meta.env?.VITE_SUPABASE_ANON_KEY,
    'sb_publishable_t2-NZopDUWMLs7YLTInD8g_Hz4y89Kr'
  );
  return { url, anonKey };
};

export const isSupabaseConfigured = () => {
  const { url, anonKey } = getSupabaseCredentials();
  return Boolean(url && anonKey && url.startsWith('http'));
};

const { url: supabaseUrl, anonKey: supabaseAnonKey } = getSupabaseCredentials();

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

