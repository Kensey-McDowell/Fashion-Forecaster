import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getColors } from "./data/colorService";
import {
  addColorToBoard,
  getBoardColors,
  getTrendBoards
} from "./services/trendBoardService";

export default function TrendBoardDetail() {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [boardColors, setBoardColors] = useState([]);
  const [allColors, setAllColors] = useState([]);

  async function loadBoardDetail() {
    const [boards, colorsOnBoard, colors] = await Promise.all([
      getTrendBoards(),
      getBoardColors(boardId),
      getColors()
    ]);

    setBoard((boards || []).find((item) => item.id === boardId) || null);
    setBoardColors(colorsOnBoard || []);
    setAllColors(colors || []);
  }

  useEffect(() => {
    loadBoardDetail();
  }, [boardId]);

  async function handleAddColor(colorId) {
    const entry = await addColorToBoard(boardId, colorId);

    if (!entry) {
      return;
    }

    await loadBoardDetail();
  }

  if (!board) {
    return <div style={{ padding: "60px" }}>Loading...</div>;
  }

  const existingColorIds = new Set(boardColors.map((color) => color.id));

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
      <section style={{ marginBottom: "72px" }}>
        <p
          style={{
            margin: "0 0 12px",
            color: "#777",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            fontSize: "12px"
          }}
        >
          {board.season} {board.year}
        </p>
        <h1 style={{ margin: 0, fontSize: "56px", lineHeight: 1.05 }}>
          {board.name}
        </h1>
      </section>

      <section style={{ marginBottom: "80px" }}>
        <h2 style={{ margin: "0 0 28px", fontSize: "28px" }}>Board Colors</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "28px"
          }}
        >
          {boardColors.map((color) => (
            <div
              key={color.id}
              style={{
                border: "1px solid #e5dfd7",
                background: "#ffffff"
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "160px",
                  backgroundColor: color.hex
                }}
              />
              <div style={{ padding: "18px" }}>
                <p style={{ margin: "0 0 8px", fontWeight: 500 }}>{color.name}</p>
                <p style={{ margin: 0, color: "#666" }}>{color.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ margin: "0 0 28px", fontSize: "28px" }}>Add Colors</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "28px"
          }}
        >
          {allColors.map((color) => (
            <div
              key={color.id}
              style={{
                border: "1px solid #e5dfd7",
                background: "#ffffff"
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "160px",
                  backgroundColor: color.hex
                }}
              />
              <div style={{ padding: "18px" }}>
                <p style={{ margin: "0 0 8px", fontWeight: 500 }}>{color.name}</p>
                <p style={{ margin: "0 0 14px", color: "#666" }}>{color.hex}</p>
                <button
                  type="button"
                  onClick={() => handleAddColor(color.id)}
                  disabled={existingColorIds.has(color.id)}
                  style={{
                    width: "fit-content",
                    padding: "10px 16px",
                    border: "1px solid #000",
                    background: existingColorIds.has(color.id) ? "#f0eeea" : "#000",
                    color: existingColorIds.has(color.id) ? "#777" : "#fff",
                    cursor: existingColorIds.has(color.id) ? "default" : "pointer"
                  }}
                >
                  {existingColorIds.has(color.id) ? "Added" : "Add to Board"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
