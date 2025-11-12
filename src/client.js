import { createClient } from '@supabase/supabase-js';

// Use Vite environment variables. Prefix must be VITE_ to be exposed to client-side code.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	// Warn in dev if env vars are missing — helps debugging but doesn't throw in production.
	// You can change this behavior to throw if you prefer stricter checks.
	// eslint-disable-next-line no-console
	console.warn('Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

