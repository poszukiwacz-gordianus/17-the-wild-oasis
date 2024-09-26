import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getLogs({ filter, sortBy, page }) {
  let query = supabase.from("logs").select("*", { count: "exact" });

  // Filter
  if (filter) {
    query = query[filter.method || "eq"](filter.field, filter.value);
  }

  // Sort
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  // Pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + (PAGE_SIZE - 1);
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) throw new Error("Can't load messages");

  return { data, error, count };
}
