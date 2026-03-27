import { supabase } from "../../../../lib/supabaseClient";

function hexToRgb(hex) {
  const normalizedHex = hex.replace("#", "");
  const value = normalizedHex.length === 3
    ? normalizedHex.split("").map((char) => char + char).join("")
    : normalizedHex;

  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16)
  };
}

function getRgbDistance(source, target) {
  const rDiff = source.r - target.r;
  const gDiff = source.g - target.g;
  const bDiff = source.b - target.b;

  return Math.sqrt((rDiff ** 2) + (gDiff ** 2) + (bDiff ** 2));
}

export async function fetchColors() {
  const { data, error } = await supabase
    .from("colors")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Fetch error:", error);
    return [];
  }

  return data;
}

export async function getColors() {
  return fetchColors();
}

export async function getColorById(id) {
  const { data, error } = await supabase
    .from("colors")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Get color by id error:", error);
    return null;
  }

  return data;
}

export async function findNearestPantones(hex, limit = 5) {
  const { data, error } = await supabase
    .from("pantone_colors")
    .select("*");

  if (error) {
    console.error("Find nearest Pantones error:", error);
    return [];
  }

  const sourceRgb = hexToRgb(hex);

  return (data || [])
    .map((pantone) => ({
      ...pantone,
      distance: getRgbDistance(sourceRgb, {
        r: pantone.r,
        g: pantone.g,
        b: pantone.b
      })
    }))
    .sort((left, right) => left.distance - right.distance)
    .slice(0, limit);
}

export async function insertColor(color) {
  const { name, hex, season } = color;
  const { error } = await supabase
    .from("colors")
    .insert([
      {
        name,
        hex,
        season
      }
    ]);

  if (error) {
    console.error("Insert error:", error);
    return false;
  }

  return true;
}

export async function updateColorName(id, name) {
  const { error } = await supabase
    .from("colors")
    .update({ name })
    .eq("id", id);

  if (error) {
    console.error("Update color name error:", error);
    return false;
  }

  return true;
}

export async function deleteColor(id) {
  const { error } = await supabase
    .from("colors")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete error:", error);
    return false;
  }

  return true;
}

export async function createForecast({
  season,
  theme_name,
  cultural_context,
  target_market,
  inspiration
}) {
  const { data, error } = await supabase
    .from("forecasts")
    .insert([
      {
        season,
        theme_name,
        cultural_context,
        target_market,
        inspiration
      }
    ])
    .select()
    .single();

  if (error) {
    console.error("Create forecast error:", error);
    return null;
  }

  return data;
}

export async function getForecasts() {
  const { data, error } = await supabase
    .from("forecasts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get forecasts error:", error);
    return [];
  }

  return data;
}

export async function getForecastById(id) {
  const { data, error } = await supabase
    .from("forecasts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Get forecast by id error:", error);
    return null;
  }

  return data;
}

export async function attachColorToForecast(forecast_id, color_id) {
  const { data, error } = await supabase
    .from("forecast_colors")
    .insert([
      {
        forecast_id,
        color_id
      }
    ])
    .select()
    .single();

  if (error) {
    console.error("Attach color to forecast error:", error);
    return null;
  }

  return data;
}

export async function getColorsForForecast(forecast_id) {
  const { data, error } = await supabase
    .from("forecast_colors")
    .select("colors(*)")
    .eq("forecast_id", forecast_id);

  if (error) {
    console.error("Get colors for forecast error:", error);
    return [];
  }

  return (data || [])
    .map((item) => item.colors)
    .filter(Boolean);
}

export async function createColorStory({
  color_id,
  forecast_id = null,
  narrative,
  design_application,
  fabric_suggestions
}) {
  const { data, error } = await supabase
    .from("color_stories")
    .insert([
      {
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

export async function getColorStoriesByColor(color_id) {
  const { data, error } = await supabase
    .from("color_stories")
    .select("*")
    .eq("color_id", color_id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get color stories by color error:", error);
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

export async function createCollection({
  designer,
  brand,
  season,
  year,
  description,
  palette
}) {
  const { data, error } = await supabase
    .from("fashion_collections")
    .insert([
      {
        designer,
        brand,
        season,
        year,
        description,
        palette
      }
    ])
    .select()
    .single();

  if (error) {
    console.error("Create collection error:", error);
    return null;
  }

  return data;
}

export async function getCollections() {
  const { data, error } = await supabase
    .from("fashion_collections")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get collections error:", error);
    return [];
  }

  return data;
}

export async function getCollectionsByColor(hex) {
  const { data, error } = await supabase
    .from("fashion_collections")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get collections by color error:", error);
    return [];
  }

  const normalizedHex = hex.toUpperCase();
  const matches = (data || []).filter((collection) => {
    let palette = collection.palette;

    if (typeof palette === "string") {
      try {
        palette = JSON.parse(palette);
      } catch (parseError) {
        console.error("Parse collection palette error:", parseError);
        return false;
      }
    }

    if (!Array.isArray(palette)) {
      return false;
    }

    return palette.some((value) => String(value).toUpperCase() === normalizedHex);
  });

  console.log("getCollectionsByColor result", {
    hex: normalizedHex,
    totalCollections: (data || []).length,
    matches
  });

  return matches;
}
