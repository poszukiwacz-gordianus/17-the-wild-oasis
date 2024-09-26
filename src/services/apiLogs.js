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

export async function getNewLogs() {
  const { data, error, count } = await supabase
    .from("logs")
    .select("new", { count: "exact" })
    .eq("new", true);

  if (error) console.error(error.message);

  return { data, error, count };
}

export async function markLogsAsRead(logs) {
  // Filter logs that are marked as new
  const logsToMarkAsRead = logs.filter((log) => log.new === true);

  if (logsToMarkAsRead.length > 0) {
    const logIds = logsToMarkAsRead.map((log) => log.id);

    const { error } = await supabase
      .from("logs")
      .update({ new: false })
      .in("id", logIds); // Update only the logs on this page

    if (error) console.error(error.message);
  }
}

export async function deleteLogs() {
  const { error } = await supabase.from("logs").delete().eq("new", false);

  if (error) {
    console.error("Error while deleting logs:", error.message);
    throw new Error("Error while deleting logs");
  }
}
