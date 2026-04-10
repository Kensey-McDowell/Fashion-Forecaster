export async function getTrendBoards() {
  try {
    const res = await fetch(`${API_URL}/trend-boards`);
    if (!res.ok) throw new Error("Failed to fetch trend boards");
    return await res.json();
  } catch (err) {
    console.error("Get trend boards error:", err);
    return [];
  }
}

export async function createTrendBoard({ name, season, year }) {
  try {
    const res = await fetch(`${API_URL}/trend-boards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), season: season.trim(), year })
    });
    return await res.json();
  } catch (err) {
    console.error("Create trend board error:", err);
    return null;
  }
}

export async function updateTrendBoardName(boardId, name) {
  try {
    const res = await fetch(`${API_URL}/trend-boards/${boardId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim() })
    });
    return res.ok;
  } catch (err) {
    console.error("Update trend board name error:", err);
    return false;
  }
}

export async function deleteTrendBoard(boardId) {
  try {
    const res = await fetch(`${API_URL}/trend-boards/${boardId}`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (err) {
    console.error("Delete trend board error:", err);
    return false;
  }
}

export async function addColorToBoard(boardId, colorId) {
  try {
    const res = await fetch(`${API_URL}/trend-board-colors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ board_id: boardId, color_id: colorId })
    });
    return await res.json();
  } catch (err) {
    console.error("Add color to board error:", err);
    return null;
  }
}

export async function getBoardColors(boardId) {
  try {
    const res = await fetch(`${API_URL}/trend-board-colors/${boardId}`);
    return await res.json();
  } catch (err) {
    console.error("Get board colors error:", err);
    return [];
  }
}