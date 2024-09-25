import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../../services/apiGuests";

export function useCountries() {
  const {
    isLoading,
    error,
    data: countries,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    retry: false,
  });

  return { isLoading, error, countries };
}
