import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uotgnrrfllimeyawmpgb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvdGducnJmbGxpbWV5YXdtcGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNDA4NjcsImV4cCI6MjA3NDgxNjg2N30.zk82lsNwzLz87qTj5CoVgwWsoToaSW3FirG-XPb8vjw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);