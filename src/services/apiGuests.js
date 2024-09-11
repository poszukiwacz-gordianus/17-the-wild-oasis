import { getCountryCode } from "countries-list";
import supabase from "./supabase";

export async function createGuest(newGuest) {
  //Check if nationality is correct
  const { nationality } = newGuest;
  let countryCode = getCountryCode(nationality);
  //If it's not than throw new error
  if (!countryCode) throw new Error("Please add proper country name");
  //If it's proper than get country code for flag
  else countryCode = getCountryCode(nationality).toLowerCase();

  //Checks if email is already in use
  const { data } = await supabase.from("guests").select("email");
  if (data.find((email) => email.email === newGuest.email))
    throw new Error("Email already in use!");

  //Add new guest to database
  const { error } = await supabase.from("guests").insert({
    ...newGuest,
    countryFlag: `https://flagcdn.com/${countryCode}.svg`,
  });

  if (error) throw new Error("Guest could not be created");
}
