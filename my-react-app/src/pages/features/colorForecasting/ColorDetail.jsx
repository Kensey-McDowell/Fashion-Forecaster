import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getColors,
  getColorById,
  getCollectionsByColor
} from "./data/colorService";
import {
  createColorStory,
  fetchColorStoriesByHex
} from "./data/colorStoryService";
import {
  addColorToBoard,
  getTrendBoards
} from "./services/trendBoardService";
import { pantoneColors } from "./data/pantoneColors";
import { findClosestColors, findClosestPantones } from "./utils/colorUtils";

export default function ColorDetail({ colorId, onBack }) {
  const navigate = useNavigate();
  const [activeColorId, setActiveColorId] = useState(colorId);
  const [color, setColor] = useState(null);
  const [pantones, setPantones] = useState([]);
  const [relatedColors, setRelatedColors] = useState([]);
  const [stories, setStories] = useState([]);
  const [narrative, setNarrative] = useState("");
  const [designApplication, setDesignApplication] = useState("");
  const [fabricSuggestions, setFabricSuggestions] = useState("");
  const [collections, setCollections] = useState([]);
  const [trendBoards, setTrendBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState("");

  useEffect(() => {
    async function loadTrendBoards() {
      const boards = await getTrendBoards();
      setTrendBoards(boards || []);
      if ((boards || []).length > 0) {
        setSelectedBoardId(boards[0].id);
      }
    }

    loadTrendBoards();
  }, []);

  useEffect(() => {
    setActiveColorId(colorId);
  }, [colorId]);

  useEffect(() => {
    async function loadColorDetail() {
      const [currentColor, allColors] = await Promise.all([
        getColorById(activeColorId),
        getColors()
      ]);

      setColor(currentColor);

      if (currentColor) {
        const [matchingCollections, colorStories] = await Promise.all([
          getCollectionsByColor(currentColor.hex),
          fetchColorStoriesByHex(currentColor.hex)
        ]);

        setPantones(findClosestPantones(currentColor.hex, pantoneColors, 3));
        setRelatedColors(findClosestColors(currentColor.hex, allColors || [], 4));
        setCollections(matchingCollections || []);
        setStories(colorStories || []);
      }
    }

    loadColorDetail();
  }, [activeColorId]);

  async function handleSubmit(event) {
    event.preventDefault();

    const story = await createColorStory({
      color_hex: color.hex,
      narrative,
      design_application: designApplication,
      fabric_suggestions: fabricSuggestions
    });

    if (!story) return;

    const colorStories = await fetchColorStoriesByHex(color.hex);
    setStories(colorStories || []);
    setNarrative("");
    setDesignApplication("");
    setFabricSuggestions("");
  }

  async function handleAddToTrendBoard() {
    if (!selectedBoardId || !color) {
      return;
    }

    const entry = await addColorToBoard(selectedBoardId, color.id);

    if (!entry) {
      return;
    }

    console.log("Added color to trend board", {
      boardId: selectedBoardId,
      colorId: color.id
    });
  }

  function handleBackToColors() {
    if (onBack) {
      onBack();
    }

    navigate("/color");
  }

  if (!color) {
    return <div style={{ padding: "60px" }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
      <button
        onClick={handleBackToColors}
        style={{
          marginBottom: "40px",
          padding: "10px 18px",
          border: "1px solid #ccc",
          background: "#fff",
          cursor: "pointer"
        }}
      >
        ← Back to Colors
      </button>

      <section style={{ marginBottom: "100px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(280px, 300px) minmax(0, 1fr)",
            gap: "48px",
            alignItems: "start"
          }}
        >
          <div
            style={{
              width: "300px",
              maxWidth: "100%",
              aspectRatio: "1 / 1",
              backgroundColor: color.hex,
              border: "1px solid #d9d2c9"
            }}
          />

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
              {color.season || "Uncategorized"}
            </p>

            <h1
              style={{
                margin: "0 0 16px",
                fontSize: "64px",
                lineHeight: 1,
                letterSpacing: "-0.02em"
              }}
            >
              {color.name}
            </h1>

            <p style={{ margin: 0, fontSize: "18px", color: "#666" }}>
              {color.hex}
            </p>

            <div style={{ marginTop: "24px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <select
                value={selectedBoardId}
                onChange={(event) => setSelectedBoardId(event.target.value)}
                style={{ padding: "12px 14px" }}
              >
                <option value="">Select Trend Board</option>
                {trendBoards.map((board) => (
                  <option key={board.id} value={board.id}>
                    {board.name} · {board.season} {board.year}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddToTrendBoard}
                style={{
                  padding: "12px 18px",
                  border: "1px solid #000",
                  background: "#000",
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                Add to Trend Board
              </button>
              <Link
                to="/trend-boards"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "12px 18px",
                  border: "1px solid #ccc",
                  color: "inherit",
                  textDecoration: "none"
                }}
              >
                View Boards
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PANTONE GRID */}
      <section style={{ marginBottom: "100px" }}>
        <h2 style={{ marginBottom: "40px", fontSize: "28px" }}>
          Pantone Validation
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "28px"
          }}
        >
          {pantones.map((pantone) => (
            <div
              key={pantone.id}
              style={{
                padding: "24px",
                border: "1px solid #e5dfd7",
                background: "#faf8f5"
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "70px",
                  backgroundColor: pantone.hex,
                  marginBottom: "16px"
                }}
              />

              <p style={{ margin: "0 0 6px", fontWeight: 500 }}>
                {pantone.name}
              </p>

              <p style={{ margin: "0 0 4px", color: "#666" }}>
                {pantone.code}
              </p>

              <p style={{ margin: 0, fontSize: "14px", color: "#888" }}>
                {pantone.hex}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: "100px" }}>
        <h2 style={{ marginBottom: "40px", fontSize: "28px" }}>
          Related Colors
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "28px"
          }}
        >
          {relatedColors.map((relatedColor) => (
            <button
              key={relatedColor.id}
              type="button"
              onClick={() => setActiveColorId(relatedColor.id)}
              style={{
                padding: 0,
                border: "1px solid #e5dfd7",
                background: "#ffffff",
                cursor: "pointer",
                textAlign: "left"
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "160px",
                  backgroundColor: relatedColor.hex
                }}
              />
              <div style={{ padding: "18px" }}>
                <p style={{ margin: "0 0 8px", fontWeight: 500 }}>
                  {relatedColor.name}
                </p>
                <p style={{ margin: 0, color: "#666" }}>
                  {relatedColor.hex}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
      {/* HISTORICAL COLLECTIONS */}
      <section style={{ marginBottom: "100px" }}>
        <h2 style={{ marginBottom: "40px", fontSize: "28px" }}>
          Historical Collections
        </h2>

        {collections.length === 0 && (
          <p style={{ color: "#777" }}>
            No collections currently reference this color.
          </p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "32px"
          }}
        >
          {collections.map((collection) => (
            <div
              key={collection.id}
              style={{
                padding: "30px",
                border: "1px solid #e5dfd7",
                background: "#faf8f5"
              }}
            >
              <h3 style={{ marginBottom: "8px" }}>
                {collection.brand}
              </h3>

              <p style={{ margin: "0 0 6px", color: "#666" }}>
                {collection.designer}
              </p>

              <p style={{ margin: "0 0 6px" }}>
                {collection.season} {collection.year}
              </p>

              <p style={{ margin: 0, fontSize: "14px", color: "#777" }}>
                {collection.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* STORIES */}
      <section style={{ marginBottom: "100px" }}>
        <h2 style={{ marginBottom: "40px", fontSize: "28px" }}>
          Color Stories
        </h2>

        <div style={{ display: "grid", gap: "50px" }}>
          {stories.length === 0 && (
            <p style={{ color: "#777" }}>No stories yet.</p>
          )}

          {stories.map((story) => (
            <div
              key={story.id}
              style={{
                padding: "40px",
                border: "1px solid #e5dfd7",
                background: "#ffffff"
              }}
            >
              <p style={{ margin: "0 0 24px", lineHeight: 1.8 }}>
                {story.narrative}
              </p>

              <div style={{ marginBottom: "18px" }}>
                <strong>Design Application</strong>
                <p style={{ margin: "8px 0 0", lineHeight: 1.6 }}>
                  {story.design_application}
                </p>
              </div>

              <div>
                <strong>Fabric Suggestions</strong>
                <p style={{ margin: "8px 0 0", lineHeight: 1.6 }}>
                  {story.fabric_suggestions}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section style={{ marginTop: "120px" }}>
        <h2 style={{ marginBottom: "40px", fontSize: "28px" }}>
          Add Color Story
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gap: "24px",
            maxWidth: "650px"
          }}
        >
          <textarea
            placeholder="Narrative"
            value={narrative}
            onChange={(e) => setNarrative(e.target.value)}
            rows={6}
            style={{ padding: "14px" }}
          />

          <textarea
            placeholder="Design Application"
            value={designApplication}
            onChange={(e) => setDesignApplication(e.target.value)}
            rows={4}
            style={{ padding: "14px" }}
          />

          <textarea
            placeholder="Fabric Suggestions"
            value={fabricSuggestions}
            onChange={(e) => setFabricSuggestions(e.target.value)}
            rows={4}
            style={{ padding: "14px" }}
          />

          <button
            type="submit"
            style={{
              width: "fit-content",
              padding: "14px 24px",
              border: "1px solid #000",
              background: "#000",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            Save Story
          </button>
        </form>
      </section>
    </div>
  );
}
