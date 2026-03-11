import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateBoardModal from "../../../components/CreateBoardModal";
import {
  createTrendBoard,
  getTrendBoards
} from "./services/trendBoardService";

export default function TrendBoards() {
  const [boards, setBoards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredBoardId, setHoveredBoardId] = useState(null);
  const [name, setName] = useState("");
  const [season, setSeason] = useState("");
  const [year, setYear] = useState("");

  async function loadBoards() {
    const data = await getTrendBoards();
    setBoards(data || []);
  }

  useEffect(() => {
    loadBoards();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const board = await createTrendBoard({
      name,
      season,
      year: Number.parseInt(year, 10)
    });

    if (!board) {
      return;
    }

    setName("");
    setSeason("");
    setYear("");
    await loadBoards();
    setIsModalOpen(false);
  }

  const canCreateBoard = Boolean(name.trim() && season.trim() && year !== "");

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
      {isModalOpen && (
        <CreateBoardModal
          name={name}
          season={season}
          year={year}
          onNameChange={(event) => setName(event.target.value)}
          onSeasonChange={(event) => setSeason(event.target.value)}
          onYearChange={(event) => setYear(event.target.value)}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          canCreateBoard={canCreateBoard}
        />
      )}

      <section style={{ marginBottom: "72px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap"
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 12px",
                color: "#777",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                fontSize: "12px"
              }}
            >
              Trend Boards
            </p>
            <h1 style={{ margin: 0, fontSize: "56px", lineHeight: 1.05 }}>
              Forecasting Palettes
            </h1>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            style={{
              width: "fit-content",
              padding: "14px 24px",
              border: "1px solid #000",
              background: "#000",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            + Create Board
          </button>
        </div>
      </section>

      <section style={{ marginTop: "12px" }}>
        {boards.length === 0 && (
          <p style={{ margin: "0 0 24px", color: "#777" }}>
            No boards yet. Create your first forecasting palette to start building a gallery.
          </p>
        )}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "28px"
          }}
        >
          {boards.map((board) => (
            <Link
              key={board.id}
              to={`/boards/${board.id}`}
              onMouseEnter={() => setHoveredBoardId(board.id)}
              onMouseLeave={() => setHoveredBoardId(null)}
              style={{
                padding: "28px",
                border: "1px solid #e5dfd7",
                background: "#faf8f5",
                color: "inherit",
                textDecoration: "none",
                minHeight: "220px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                transform: hoveredBoardId === board.id ? "translateY(-2px)" : "translateY(0)",
                boxShadow: hoveredBoardId === board.id
                  ? "0 10px 24px rgba(17, 17, 17, 0.06)"
                  : "none",
                transition: "transform 0.18s ease, box-shadow 0.18s ease"
              }}
            >
              <p
                style={{
                  margin: "0 0 10px",
                  color: "#777",
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  fontSize: "12px"
                }}
              >
                {String(board.season).toUpperCase()} {board.year}
              </p>
              <h3 style={{ margin: 0, fontSize: "28px", lineHeight: 1.1 }}>
                {board.name}
              </h3>
              <p style={{ margin: "18px 0 0", color: "#666", fontSize: "14px" }}>
                {board.colorCount || 0} {(board.colorCount || 0) === 1 ? "Color" : "Colors"}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
