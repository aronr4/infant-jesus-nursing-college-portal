import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config';

const isConfigured = 
  SUPABASE_URL && 
  SUPABASE_ANON_KEY && 
  SUPABASE_URL !== 'YOUR_SUPABASE_URL_HERE' && 
  SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY_HERE';

if (!isConfigured) {
  console.warn(
    '⚠️ Supabase Database is not configured! Please update src/config.js with your Supabase Project URL and Anon API Key to enable submissions and load the Admissions Admin Panel.'
  );
}

// Fallback to placeholder client if not configured, to prevent app crashing on load
const url = isConfigured ? SUPABASE_URL : 'https://placeholder.supabase.co';
const key = isConfigured ? SUPABASE_ANON_KEY : 'placeholder-anon-key';

export const supabase = createClient(url, key);
export { isConfigured };
