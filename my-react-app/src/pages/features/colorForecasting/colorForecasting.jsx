import React, { useEffect, useState } from "react";
import ColorDetail from "./ColorDetail";
import ColorCard from "./components/ColorCard";
import { deleteColor, fetchColors, insertColor } from "./data/colorService";
import "./colorForecasting.css";

export default function ColorForecasting() {
  const [colors, setColors] = useState([]);
  const [selectedColorId, setSelectedColorId] = useState(null); 

  const [newName, setNewName] = useState("");
  const [newSeason, setNewSeason] = useState("");
  const [newHex, setNewHex] = useState("#000000");
  const [hexInput, setHexInput] = useState("#000000");
  const [hexError, setHexError] = useState("");
  const isValidHex = /^#[0-9A-Fa-f]{6}$/;

  async function loadColors() {
    const data = await fetchColors();
    setColors(data || []);
  }

  useEffect(() => {
    loadColors();
  }, []);

  //  If a color is selected, render ColorDetail instead
  if (selectedColorId) {
    return (
      <ColorDetail
        colorId={selectedColorId}
        onBack={() => setSelectedColorId(null)}
      />
    );
  }

  const groupedColors = colors.reduce((groups, color) => {
    const season =
      color.season && color.season.trim()
        ? color.season
        : "Uncategorized";

    if (!groups[season]) {
      groups[season] = [];
    }

    groups[season].push(color);
    return groups;
  }, {});

  return (
    <main className="color-page">
      <section className="hero">
        <div className="hero-text">
          <p className="small-label">Color Forecasting</p>
          <h1>Seasonal Color Forecasting</h1>
          <p className="hero-copy">
            Build and explore seasonal colors used across forecasting palettes.
          </p>
        </div>
      </section>

      <section className="card-section">
        <div className="section-divider" aria-hidden="true" />
        <div className="section-header">
          <p className="small-label">Color Library</p>
          <h2>COLOR LIBRARY</h2>
          <p className="hero-copy">
            Explore seasonal colors used in forecasting palettes.
          </p>
        </div>

        <div className="color-form">
          <div className="form-field name-field">
            <input
              type="text"
              placeholder="Color Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>

          <div className="form-field name-field">
            <input
              type="text"
              placeholder="Season"
              value={newSeason}
              onChange={(e) => setNewSeason(e.target.value)}
            />
          </div>

          <div className="form-field color-picker-field">
            <input
              type="color"
              value={newHex}
              onChange={(e) => {
                const value = e.target.value.toUpperCase();
                setNewHex(value);
                setHexInput(value);
                setHexError("");
              }}
            />
          </div>

          <div className="form-field hex-field">
            <input
              type="text"
              placeholder="#RRGGBB"
              value={hexInput}
              onChange={(e) => {
                const value = e.target.value.toUpperCase();
                const isHexValid = isValidHex.test(value);

                setHexInput(value);

                if (isHexValid) {
                  setNewHex(value);
                  setHexError("");
                  return;
                }

                setHexError("Invalid hex code");
              }}
            />

            {hexError && <p className="hex-error">Invalid hex code</p>}
          </div>

          <button
            onClick={async () => {
              if (!newName.trim()) return;

              const didInsert = await insertColor({
                name: newName,
                hex: newHex,
                season: newSeason.trim() || null
              });

              if (!didInsert) return;

              await loadColors();

              setNewName("");
              setNewSeason("");
              setNewHex("#000000");
              setHexInput("#000000");
              setHexError("");
            }}
          >
            Add Color
          </button>
        </div>

        {Object.entries(groupedColors).map(([season, seasonColors]) => (
          <div key={season}>
            <h3>{season}</h3>
            <div className="card-grid">
              {seasonColors.map((color) => (
                <div
                  key={color.id}
                  onClick={() => setSelectedColorId(color.id)} //  click handler
                  style={{ cursor: "pointer" }}
                >
                  <ColorCard
                    id={color.id}
                    name={color.name}
                    hex={color.hex}
                    onDelete={async () => {
                      const didDelete = await deleteColor(color.id);
                      if (!didDelete) return;
                      await loadColors();
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
