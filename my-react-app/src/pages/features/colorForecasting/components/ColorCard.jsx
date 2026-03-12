import React from "react";
import ColorActionMenu from "./ColorActionMenu";

export default function ColorCard({
  name,
  hex,
  onRename,
  onDuplicate,
  onViewDetails,
  onDelete
}) {
  return (
    <article className="color-card">
      <ColorActionMenu
        colorName={name}
        onRename={onRename}
        onDuplicate={onDuplicate}
        onViewDetails={onViewDetails}
        onDelete={onDelete}
      />
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
