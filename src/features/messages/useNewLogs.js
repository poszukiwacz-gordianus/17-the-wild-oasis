import { useQuery } from "@tanstack/react-query";
import { getNewLogs } from "../../services/apiLogs";

export function useNewLogs() {
  const {
    isLoading,
    error,
    data: { data: newLogs, count } = {},
  } = useQuery({
    queryKey: ["newLogs"],
    queryFn: getNewLogs,
  });

  return { isLoading, error, newLogs, count };
}
