import supabase from "./supabase";
import { getCountryCode } from "countries-list";

export async function getGuests() {
  const { data, error } = await supabase
    .from("guests")
    .select()
    .order("created_at", {
      ascending: false,
    });

  if (error) throw new Error("Could not load guests");

  return data;
}

export async function createGuest(newGuest) {
  //If country was writen
  let countryCode;
  if (!newGuest.countryFlag) {
    //Check if nationality is correct
    const { nationality } = newGuest;
    countryCode = getCountryCode(nationality);
    //If it's not than throw new error
    if (!countryCode) throw new Error("Please add proper country name");
    //If it's proper than get country code for flag
    else countryCode = getCountryCode(nationality).toLowerCase();
  }

  if (!/^[a-zA-Z0-9]{6,12}$/.test(newGuest.nationalID))
    throw new Error("Provide a validate National ID");

  //Checks if email is already in use
  const { data } = await supabase.from("guests").select("email");
  if (data.find((email) => email.email === newGuest.email))
    throw new Error("Email already in use!");

  //Add new guest to database
  const { error } = await supabase
    .from("guests")
    .insert(
      !newGuest.countryFlag
        ? { ...newGuest, countryFlag: `https://flagcdn.com/${countryCode}.svg` }
        : [newGuest]
    );

  if (error) throw new Error("Guest could not be created");
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}
