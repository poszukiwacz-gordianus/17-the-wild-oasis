import supabase from "./supabase";

import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import { eachDayOfInterval, isWithinInterval } from "date-fns";

export async function createBooking({ booking }) {
  //Check on server side if dates are already booked
  function isAlreadyBooked(from, to, datesArr) {
    return (
      from &&
      to &&
      datesArr.some((date) => isWithinInterval(date, { start: from, end: to }))
    );
  }

  const bookedDates = await getBookedDates(booking.cabinId, booking.guestId);

  if (isAlreadyBooked(booking.startDate, booking.endDate, bookedDates))
    throw new Error(
      "Oops, looks like someone else beat you to it! These dates are already reserved. Why not try a different date?"
    );

  const { data, error } = await supabase
    .from("bookings")
    .insert([booking])
    .select("id");

  if (error) throw new Error("Booking could not be created");

  return data[0].id;
}

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" }
    );

  // Filter
  if (filter) {
    query = query[filter.method || "eq"](filter.field, filter.value);
  }

  // Sort
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  //Pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + (PAGE_SIZE - 1);
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, error, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

export async function getBookedDates(cabinId, guestId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  // Combine queries for cabin and guest into a single request
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .or(`cabinId.eq.${cabinId},guestId.eq.${guestId}`)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  // Avoid duplicate bookings for the same guest and cabin
  const uniqueBookings = data.filter(
    (booking, index, self) =>
      index === self.findIndex((b) => b.id === booking.id)
  );

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = uniqueBookings
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date: ISOString
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function getOccupiedCabinsFromBookings({ startDate, endDate }) {
  const { data, error } = await supabase
    .from("bookings")
    .select("cabinId")
    .or(
      `and(startDate.gte.${startDate}T00:00:00, startDate.lte.${endDate}T00:00:00), and(endDate.gte.${startDate}T00:00:00, endDate.lte.${endDate}T00:00:00)`
    );

  // const { data, error } = await supabase
  //   .from("bookings")
  //   .select()
  //   .or(`not.and(startDate.gte.${startDate}, startDate.lte.${endDate})`)
  //   .or(`not.and(endDate.gte.${startDate}, endDate.lte.${endDate})`);

  if (error) throw new Error("Can't fetch cabins");

  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
