import { supabase } from "../../../../lib/supabaseClient";

export async function createColorStory({
  color_id,
  narrative,
  design_application,
  fabric_suggestions
}) {
  const { data, error } = await supabase
    .from("color_stories")
    .insert([
      {
        color_id,
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

  return data || [];
}
