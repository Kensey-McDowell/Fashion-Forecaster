import { supabase } from "../../../../lib/supabaseClient";

export async function createColorStory({
  color_hex,
  narrative,
  design_application,
  fabric_suggestions
}) {
  const { data, error } = await supabase
    .from("color_stories")
    .insert([
      {
        color_hex,
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

export async function fetchColorStoriesByHex(colorHex) {
  const { data, error } = await supabase
    .from("color_stories")
    .select("*")
    .eq("color_hex", colorHex)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fetch color stories by hex error:", error);
    return [];
  }

  return data || [];
}
