// ============================================================
// Secure Supabase Database Configuration
// ============================================================
// HOW TO GET YOUR DATABASE KEYS (100% Free, takes 1 minute):
// 1. Go to https://supabase.com and sign up for a free account.
// 2. Create a new Project (name it "Infant Jesus Admissions").
// 3. Go to Project Settings (gear icon) -> API.
// 4. Copy the "Project URL" and "anon / public" API Key.
// 5. Paste them below (or use a .env file with VITE_SUPABASE_URL):
// ============================================================

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://irnwkzjsksukddpqwmmd.supabase.co";
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_VClR1iA9O5rVSEygFcFaxg_Wh5fLSRi";
