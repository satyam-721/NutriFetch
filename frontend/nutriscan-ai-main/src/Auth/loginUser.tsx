import { supabase } from "./SupaBaseClient";

export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error.message;
  }

  return data;
};