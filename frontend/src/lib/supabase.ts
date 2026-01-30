import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase configuration
// These should match your Supabase project settings
// @ts-ignore - Vite handles these env vars
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
// @ts-ignore - Vite handles these env vars
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

// Create Supabase client only if configured
let supabase: SupabaseClient | null = null;
if (isSupabaseConfigured) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

// Google OAuth sign in
export const signInWithGoogle = async () => {
  if (!supabase) {
    throw new Error('Google Sign-in requires Supabase configuration. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
  }
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/profile`,
    },
  });
  
  if (error) {
    throw error;
  }
  
  return data;
};

// Get current session
export const getSession = async () => {
  if (!supabase) return null;
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

// Sign out
export const signOut = async () => {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Export for direct usage
export { supabase, isSupabaseConfigured };
