import { getCountryCode } from "countries-list";
import supabase from "./supabase";

export async function createGuest(newGuest) {
  const { nationality } = newGuest;
  const countryCode = getCountryCode(nationality).toLowerCase();

  const { error } = await supabase.from("guests").insert({
    ...newGuest,
    countryFlag: `https://flagcdn.com/${countryCode}.svg`,
  });

  if (error) throw new Error("Guest could not be created");
}
