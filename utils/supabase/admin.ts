import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

// Server-only Supabase client with service role — bypasses RLS.
// NEVER import this on the client side.
export function getSupabaseAdmin(): SupabaseClient {
  if (!_client) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    }
    _client = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false },
    });
  }
  return _client;
}
