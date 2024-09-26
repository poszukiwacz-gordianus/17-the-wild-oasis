import {
  formatDistance,
  parseISO,
  differenceInDays,
  isWithinInterval,
} from "date-fns";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const setProperDatesTime = function (from, to) {
  // We need to convert date type to another to filter bookings correct

  let y = new Date(from);
  let x = new Date(to);

  let startDate;
  let endDate;

  // Check if the date is valid
  if (isNaN(y) || isNaN(x)) {
    startDate = y;
    endDate = x;
  } else {
    // Add one day (if needed) and work in UTC
    y.setUTCDate(y.getUTCDate() + 1); // Use UTC to add one day
    x.setUTCDate(x.getUTCDate() + 1); // Use UTC to add one day

    // Set the time to midnight in UTC
    y.setUTCHours(0, 0, 0, 0);
    x.setUTCHours(0, 0, 0, 0);

    // Convert to ISO string (with time at 00:00:00 UTC)
    startDate = y.toISOString().split("T")[0] + "T00:00:00.000Z";
    endDate = x.toISOString().split("T")[0] + "T00:00:00.000Z";
  }

  return { startDate, endDate };
};

export function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

export function formatTimeAndDate(string) {
  const date = new Date(string);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "2-digit",
  });

  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} at ${formattedTime}`;
}
