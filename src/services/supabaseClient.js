import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase URL or Anon Key. Please check your environment variables."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get avatar URL for a user
export const getAvatarUrl = async (userId) => {
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .getPublicUrl(`${userId}/avatar.glb`);

    if (error) {
      throw error;
    }

    return data.publicUrl;
  } catch (error) {
    console.error("Error getting avatar URL:", error);
    return null;
  }
};

// Helper function to check if user has an avatar
export const checkAvatarExists = async (userId) => {
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .list(`${userId}`, {
        limit: 1,
        search: "avatar.glb",
      });

    if (error) {
      throw error;
    }

    return data && data.length > 0;
  } catch (error) {
    console.error("Error checking avatar existence:", error);
    return false;
  }
};
