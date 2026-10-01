import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dxezgdhqlxkleyxcwnko.supabase.co";
const supabaseAnonKey = "sb_publishable_xxTRvudoWR2Cm4xfSleymQ_kQ4RJEso";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
