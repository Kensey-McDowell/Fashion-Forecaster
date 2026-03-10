import React, { useState } from "react";
import ColorCard from "./ColorCard";
import "./colorForecasting.css";

export default function ColorForecasting() {
  const [colors, setColors] = useState([
    { name: "Soft Clay", hex: "#D8B8A6" },
    { name: "Calm Sage", hex: "#B7C4B2" },
    { name: "Dust Blue", hex: "#98A8BC" },
    { name: "Warm Sand", hex: "#DDC9AB" }
  ]);

  const [newName, setNewName] = useState("");
  const [newHex, setNewHex] = useState("#000000");
  const [hexInput, setHexInput] = useState("#000000");
  const [hexError, setHexError] = useState("");
  const isValidHex = /^#[0-9A-Fa-f]{6}$/;

  return (
    <main className="color-page">
      <section className="hero">
        <div className="hero-text">
          <p className="small-label">Color Forecasting</p>
          <h1>Simple Layout Practice Page</h1>
          <p>
            This page is built with one React component so you can focus on
            learning basic structure and CSS layout.
          </p>
        </div>
      </section>

      <section className="two-column-section">
        <div className="column-box">
          <h2>Left Column</h2>
          <p>
            This is the first column. You can use a grid to place content side
            by side.
          </p>
        </div>

        <div className="column-box">
          <h2>Right Column</h2>
          <p>
            This is the second column. On smaller screens, the columns will
            stack on top of each other.
          </p>
        </div>
      </section>

      <section className="card-section">
        <p className="small-label">Color Cards</p>
        <h2>Simple Color Grid</h2>


        <div className="color-form">
          <div className="form-field name-field">
            <input
              type="text"
              placeholder="Color Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
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
            onClick={() => {
              if (!newName.trim()) return;

              setColors([
                ...colors,
                { name: newName, hex: newHex }
              ]);

              setNewName("");
              setNewHex("#000000");
              setHexInput("#000000");
              setHexError("");
            }}
          >
            Add Color
          </button>
        </div>

        <div className="card-grid">
          {colors.map((color, index) => (
            <ColorCard
              key={index}
              name={color.name}
              hex={color.hex}
              onDelete={() => {
                setColors(colors.filter((_, colorIndex) => colorIndex !== index));
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
