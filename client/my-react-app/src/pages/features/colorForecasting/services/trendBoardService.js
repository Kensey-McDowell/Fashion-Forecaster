import { getAuthenticatedUserId } from "../../../../lib/authUser";
import { supabase } from "../../../../lib/supabaseClient";

function isDuplicateBoardColorError(error) {
  return error?.code === "23505" || error?.status === 409;
}

export async function getTrendBoards() {
  const { data: boards, error } = await supabase
    .from("trend_boards")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get trend boards error:", error);
    return [];
  }

  const boardsWithCounts = await Promise.all(
    (boards || []).map(async (board) => {
      const { count, error: countError } = await supabase
        .from("trend_board_colors")
        .select("*", { count: "exact", head: true })
        .eq("board_id", board.id);

      if (countError) {
        console.error("Get trend board color count error:", countError);
      }

      return { ...board, colorCount: count || 0 };
    })
  );

  return boardsWithCounts;
}

export async function createTrendBoard({ name, season, year }) {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return null;
  }

  const { data, error } = await supabase
    .from("trend_boards")
    .insert([
      {
        user_id: userId,
        name: name.trim(),
        season: season.trim(),
        year
      }
    ])
    .select()
    .single();

  if (error) {
    console.error("Create trend board error:", error);
    return null;
  }

  return data;
}

export async function updateTrendBoardName(boardId, name) {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return false;
  }

  const { error } = await supabase
    .from("trend_boards")
    .update({ name: name.trim() })
    .eq("id", boardId)
    .eq("user_id", userId);

  if (error) {
    console.error("Update trend board name error:", error);
    return false;
  }

  return true;
}

export async function deleteTrendBoard(boardId) {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return false;
  }

  const { error } = await supabase
    .from("trend_boards")
    .delete()
    .eq("id", boardId)
    .eq("user_id", userId);

  if (error) {
    console.error("Delete trend board error:", error);
    return false;
  }

  return true;
}

export async function addColorToBoard(boardId, colorId) {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return { ok: false, reason: "error" };
  }

  const { error } = await supabase
    .from("trend_board_colors")
    .insert([
      {
        user_id: userId,
        board_id: boardId,
        color_id: colorId
      }
    ]);

  if (error) {
    console.error("Add color to board error:", error);
    return {
      ok: false,
      reason: isDuplicateBoardColorError(error) ? "duplicate" : "error"
    };
  }

  return { ok: true };
}

export async function removeColorFromBoard(boardId, colorId) {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return false;
  }

  const { error } = await supabase
    .from("trend_board_colors")
    .delete()
    .eq("board_id", boardId)
    .eq("color_id", colorId)
    .eq("user_id", userId);

  if (error) {
    console.error("Remove color from board error:", error);
    return false;
  }

  return true;
}

export async function getBoardColors(boardId) {
  const { data, error } = await supabase
    .from("trend_board_colors")
    .select("colors(*)")
    .eq("board_id", boardId);

  if (error) {
    console.error("Get board colors error:", error);
    return [];
  }

  return (data || [])
    .map((item) => item.colors)
    .filter(Boolean);
}
