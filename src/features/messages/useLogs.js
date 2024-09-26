import { useQuery } from "@tanstack/react-query";
import { getLogs } from "../../services/apiLogs";

export function useLogs() {
  const {
    isLoading,
    error,
    data: logs,
  } = useQuery({
    queryKey: ["logs"],
    queryFn: getLogs,
  });

  return { isLoading, error, logs };
}
