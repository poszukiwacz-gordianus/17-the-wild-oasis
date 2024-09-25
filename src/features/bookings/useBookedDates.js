import { useQuery } from "@tanstack/react-query";
import { getBookedDates } from "../../services/apiBookings";

export default function useBookedDates(cabinId, guestId) {
  const {
    isLoading,
    error,
    data: bookedDates,
  } = useQuery({
    queryKey: ["bookedDates", cabinId, guestId],
    queryFn: () => getBookedDates(cabinId, guestId),
  });

  return { isLoading, error, bookedDates };
}
