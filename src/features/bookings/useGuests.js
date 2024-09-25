import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";

export default function useGuests() {
  const {
    isLoading,
    error,
    data: guests,
  } = useQuery({
    queryKey: ["guests"],
    queryFn: getGuests,
  });

  return { isLoading, error, guests };
}
