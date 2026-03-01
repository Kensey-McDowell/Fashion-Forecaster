import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import "./colorForecasting.css";

export default function ColorForecasting() {

  /*
    STATE SECTION
    -------------------------
    colors: stores all rows from database
    hexInput: stores current hex input field value
    seasonInput: stores season input value
  */

  const [colors, setColors] = useState([]);
  const [hexInput, setHexInput] = useState("");
  const [seasonInput, setSeasonInput] = useState("");

  /*
    LIFECYCLE SECTION
    -------------------------
    useEffect runs once when component mounts.
    It fetches all colors from Supabase.
  */

  useEffect(() => {
    fetchColors();
  }, []);

  /*
    FETCH COLORS
    -------------------------
    - Queries Supabase
    - Orders by newest first
    - Stores results in state
  */

  async function fetchColors() {
  const { data, error } = await supabase
    .from("colors")
    .select("*")
    .order("created_at", { ascending: false });

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (!error) {
    setColors(data);
  } else {
    console.error("Fetch error:", error);
  }
}

  /*
    ADD COLOR
    -------------------------
    - Prevents page refresh
    - Inserts new color into DB
    - Clears form
    - Refreshes UI
  */

  async function addColor(e) {
    e.preventDefault();

    if (!hexInput || !seasonInput) return;

    const { error } = await supabase
      .from("colors")
      .insert([
        {
          hex: hexInput,
          season: seasonInput
        }
      ]);

    if (!error) {
      setHexInput("");
      setSeasonInput("");
      fetchColors();
    } else {
      console.error("Insert error:", error);
    }
  }

  /*
    RENDER SECTION
    -------------------------
    - Form for adding new colors
    - Grid display of existing colors
  */

  return (
    <div className="main-grid">

      {/* FORM SECTION */}
      <form onSubmit={addColor} className="color-form">

        {/* Hex input */}
        <input
          type="text"
          placeholder="#FFFFFF"
          value={hexInput}
          onChange={(e) => setHexInput(e.target.value)}
        />

        {/* Season input */}
        <input
          type="text"
          placeholder="Season"
          value={seasonInput}
          onChange={(e) => setSeasonInput(e.target.value)}
        />

        <button type="submit">
          Add Color
        </button>

      </form>

      {/* DISPLAY SECTION */}
      <div className="column">
        <div className="row">
          {colors.map((color) => (
            <div
              key={color.id}
              className="field"
              style={{ backgroundColor: color.hex }}
            >
              {/* Overlay label */}
              <div className="color-label">
                {color.hex}
                <br />
                {color.season}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}