import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabase = createClient(
  supabaseUrl,
  import.meta.env.VITE_SUPABASE_KEY_ROLE
);

export default supabase;
