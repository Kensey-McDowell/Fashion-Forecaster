const API_URL = "http://localhost:3001/api";

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
  try {
    const response = await fetch(`${API_URL}/colors`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export async function getColors() {
  return fetchColors();
}

export async function getColorById(id) {
  try {
    const response = await fetch(`${API_URL}/colors/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get color by id error:", error);
    return null;
  }
}

export async function findNearestPantones(hex, limit = 5) {
  try {
    const response = await fetch(`${API_URL}/pantone`);
    const data = await response.json();
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
  } catch (error) {
    console.error("Find nearest Pantones error:", error);
    return [];
  }
}

export async function insertColor(color) {
  try {
    const response = await fetch(`${API_URL}/colors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(color),
    });
    return response.ok;
  } catch (error) {
    console.error("Insert error:", error);
    return false;
  }
}

export async function updateColorName(id, name) {
  try {
    const response = await fetch(`${API_URL}/colors/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    return response.ok;
  } catch (error) {
    console.error("Update color name error:", error);
    return false;
  }
}

export async function deleteColor(id) {
  try {
    const response = await fetch(`${API_URL}/colors/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error("Delete error:", error);
    return false;
  }
}

export async function createForecast({
  season,
  theme_name,
  cultural_context,
  target_market,
  inspiration
}) {
  try {
    const response = await fetch(`${API_URL}/forecasts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ season, theme_name, cultural_context, target_market, inspiration }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Create forecast error:", error);
    return null;
  }
}

export async function getForecasts() {
  try {
    const response = await fetch(`${API_URL}/forecasts`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get forecasts error:", error);
    return [];
  }
}

export async function getForecastById(id) {
  try {
    const response = await fetch(`${API_URL}/forecasts/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get forecast by id error:", error);
    return null;
  }
}

export async function attachColorToForecast(forecast_id, color_id) {
  try {
    const response = await fetch(`${API_URL}/forecast_colors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ forecast_id, color_id }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Attach color to forecast error:", error);
    return null;
  }
}

export async function getColorsForForecast(forecast_id) {
  try {
    const response = await fetch(`${API_URL}/forecast_colors/${forecast_id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get colors for forecast error:", error);
    return [];
  }
}

export async function createColorStory({
  color_id,
  forecast_id = null,
  narrative,
  design_application,
  fabric_suggestions
}) {
  try {
    const response = await fetch(`${API_URL}/color_stories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ color_id, forecast_id, narrative, design_application, fabric_suggestions }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Create color story error:", error);
    return null;
  }
}

export async function getColorStoriesByColor(color_id) {
  try {
    const response = await fetch(`${API_URL}/color_stories/color/${color_id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get color stories by color error:", error);
    return [];
  }
}

export async function getColorStoryById(id) {
  try {
    const response = await fetch(`${API_URL}/color_stories/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get color story by id error:", error);
    return null;
  }
}

export async function createCollection({
  designer,
  brand,
  season,
  year,
  description,
  palette
}) {
  try {
    const response = await fetch(`${API_URL}/collections`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ designer, brand, season, year, description, palette }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Create collection error:", error);
    return null;
  }
}

export async function getCollections() {
  try {
    const response = await fetch(`${API_URL}/collections`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get collections error:", error);
    return [];
  }
}

export async function getCollectionsByColor(hex) {
  try {
    const response = await fetch(`${API_URL}/collections`);
    const data = await response.json();
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
  } catch (error) {
    console.error("Get collections by color error:", error);
    return [];
  }
}