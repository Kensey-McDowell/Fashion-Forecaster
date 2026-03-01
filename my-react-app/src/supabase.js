// Import Supabase client constructor
import { createClient } from "@supabase/supabase-js";

// Pull credentials from environment variables (.env file)
// These should NEVER be hardcoded
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create and export the Supabase client
// This allows other files to use it
export const supabase = createClient(supabaseUrl, supabaseKey);