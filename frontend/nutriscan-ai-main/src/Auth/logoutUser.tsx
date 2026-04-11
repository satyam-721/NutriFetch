import { supabase } from "./SupaBaseClient";

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error.message;
  }
};