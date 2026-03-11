import React from "react";
export default function ColorCard({ name, hex, onDelete }) {
  return (
    <article className="color-card">
      <button
        type="button"
        className="delete-button"
        onClick={(event) => {
          event.stopPropagation();
          onDelete?.();
        }}
        aria-label={`Delete ${name}`}
      >
        ×
      </button>
      <div
        className="color-swatch"
        style={{ backgroundColor: hex }}
      />
      <div className="card-text">
        <h3>{name}</h3>
        <p>{hex}</p>
      </div>
    </article>
  );
}
