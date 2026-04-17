import { getAuthenticatedUserId } from "../../../../lib/authUser";
import { supabase } from "../../../../lib/supabaseClient";

export async function getTrendBoards() {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return [];
  }

  const { data, error } = await supabase
    .from("trend_boards")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get trend boards error:", error);
    return [];
  }

  const boards = data || [];
  const boardsWithCounts = await Promise.all(
    boards.map(async (board) => {
      const { count, error: countError } = await supabase
        .from("trend_board_colors")
        .select("*", { count: "exact", head: true })
        .eq("board_id", board.id)
        .eq("user_id", userId);

      if (countError) {
        console.error("Get trend board color count error:", countError);
        return {
          ...board,
          colorCount: 0
        };
      }

      return {
        ...board,
        colorCount: count || 0
      };
    })
  );

  return boardsWithCounts;
}

export async function createTrendBoard({ name, season, year }) {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return null;
  }

  const payload = {
    user_id: userId,
    name: name.trim(),
    season: season.trim(),
    year
  };

  const { data, error } = await supabase
    .from("trend_boards")
    .insert([payload])
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
    return false;
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
    return false;
  }

  return true;
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
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return [];
  }

  const { data, error } = await supabase
    .from("trend_board_colors")
    .select("colors(*)")
    .eq("board_id", boardId)
    .eq("user_id", userId);

  if (error) {
    console.error("Get board colors error:", error);
    return [];
  }

  return (data || [])
    .map((item) => item.colors)
    .filter(Boolean);
}
