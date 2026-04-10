import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getColors } from "./data/colorService";
import {
  addColorToBoard,
  getBoardColors,
  getTrendBoards
} from "./services/trendBoardService";

export default function TrendBoardDetail() {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [boardColors, setBoardColors] = useState([]);
  const [allColors, setAllColors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadBoardDetail() {
    setIsLoading(true);

    try {
      const [boards, colorsOnBoard, colors] = await Promise.all([
        getTrendBoards(),
        getBoardColors(boardId),
        getColors()
      ]);

      setBoard((boards || []).find((item) => item.id === boardId) || null);
      setBoardColors(colorsOnBoard || []);
      setAllColors(colors || []);
    } catch (error) {
      console.error("Unable to load board detail:", error);
      setBoard(null);
      setBoardColors([]);
      setAllColors([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadBoardDetail();
  }, [boardId]);

  async function handleAddColor(colorId) {
    try {
      const entry = await addColorToBoard(boardId, colorId);

      if (!entry) {
        return;
      }

      await loadBoardDetail();
    } catch (error) {
      console.error("Unable to add color to board:", error);
    }
  }

  if (isLoading) {
    return <div style={{ padding: "60px" }}>Loading...</div>;
  }

  if (!board) {
    return (
      <div style={{ padding: "60px" }}>
        <button
          type="button"
          onClick={() => navigate("/trend-boards")}
          style={{
            marginBottom: "24px",
            padding: "10px 18px",
            border: "1px solid #ccc",
            background: "#fff",
            cursor: "pointer"
          }}
        >
          ← Back to Boards
        </button>
        <p style={{ margin: 0 }}>Board not found.</p>
      </div>
    );
  }

  const existingColorIds = new Set(boardColors.map((color) => color.id));

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
      <section style={{ marginBottom: "72px" }}>
        <button
          type="button"
          onClick={() => navigate("/trend-boards")}
          style={{
            marginBottom: "28px",
            padding: "10px 18px",
            border: "1px solid #ccc",
            background: "#fff",
            cursor: "pointer"
          }}
        >
          ← Back to Boards
        </button>
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
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "20px",
            alignItems: "start",
            width: "100%",
            maxHeight: "720px",
            overflowY: "auto",
            overflowX: "hidden",
            paddingRight: "8px"
          }}
        >
          {allColors.map((color) => (
            <div
              key={color.id}
              style={{
                border: "1px solid #e5dfd7",
                background: "#ffffff",
                minWidth: 0
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "140px",
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
