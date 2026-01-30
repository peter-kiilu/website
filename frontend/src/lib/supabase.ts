import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// These should match your Supabase project settings
// @ts-ignore - Vite handles these env vars
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
// @ts-ignore - Vite handles these env vars
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';


// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Google OAuth sign in
export const signInWithGoogle = async () => {
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
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

// Sign out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
