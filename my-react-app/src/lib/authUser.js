import { supabase } from "./supabaseClient";

export async function getAuthenticatedUserId() {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Get authenticated user error:", error);
    return null;
  }

  if (!user?.id) {
    console.error("No authenticated user found for write operation.");
    return null;
  }

  return user.id;
}
