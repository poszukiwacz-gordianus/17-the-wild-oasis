import supabase from "./supabase";

export async function getLogs() {
  const { data, error } = await supabase
    .from("logs")
    .select()
    .order("created_at", { ascending: false })
    .eq("new", true);

  if (error) throw new Error("Can't load messages");

  return data;
}
