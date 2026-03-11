import { supabase } from "../../../../lib/supabaseClient";

export async function getTrendBoards() {
  const { data, error } = await supabase
    .from("trend_boards")
    .select("*")
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
        .eq("board_id", board.id);

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
  const payload = {
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

export async function addColorToBoard(boardId, colorId) {
  const { data, error } = await supabase
    .from("trend_board_colors")
    .insert([
      {
        board_id: boardId,
        color_id: colorId
      }
    ])
    .select()
    .single();

  if (error) {
    console.error("Add color to board error:", error);
    return null;
  }

  return data;
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
