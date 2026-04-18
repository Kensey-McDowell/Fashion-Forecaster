import { getAuthenticatedUserId } from "../../../../lib/authUser";
import { supabase } from "../../../../lib/supabaseClient";

export async function createColorStory({
  color_id,
  forecast_id = null,
  narrative,
  design_application,
  fabric_suggestions
}) {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return null;
  }

  const { data, error } = await supabase
    .from("color_stories")
    .insert([
      {
        user_id: userId,
        color_id,
        forecast_id,
        narrative,
        design_application,
        fabric_suggestions
      }
    ])
    .select()
    .single();

  if (error) {
    console.error("Create color story error:", error);
    return null;
  }

  return data;
}

export async function fetchColorStoriesByColor(colorId) {
  const { data, error } = await supabase
    .from("color_stories")
    .select("*")
    .eq("color_id", colorId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fetch color stories by color error:", error);
    return [];
  }

  return data;
}

export async function getColorStoryById(id) {
  const { data, error } = await supabase
    .from("color_stories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Get color story by id error:", error);
    return null;
  }

  return data;
}

export async function updateColorStory(id, {
  narrative,
  design_application,
  fabric_suggestions
}) {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return null;
  }

  const { data, error } = await supabase
    .from("color_stories")
    .update({
      narrative,
      design_application,
      fabric_suggestions
    })
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error("Update color story error:", error);
    return null;
  }

  return data;
}

export async function deleteColorStory(id) {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return false;
  }

  const { error } = await supabase
    .from("color_stories")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    console.error("Delete color story error:", error);
    return false;
  }

  return true;
}
