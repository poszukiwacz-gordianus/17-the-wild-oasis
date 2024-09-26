import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getLogs } from "../../services/apiLogs";
import { PAGE_SIZE } from "../../utils/constants";

export function useLogs() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get("action");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "action", value: filterValue, method: "eq" };

  // Sort
  const sortByRaw = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // Query
  const {
    isLoading,
    error,
    data: { data: logs, count } = {},
  } = useQuery({
    queryKey: ["logs", filter, sortBy, page],
    queryFn: () => getLogs({ filter, sortBy, page }),
  });

  // Pre-fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["logs", filter, sortBy, page + 1],
      queryFn: () => getLogs({ filter, sortBy, page: +1 }),
    });

  if (page > pageCount)
    queryClient.prefetchQuery({
      queryKey: ["logs", filter, sortBy, page - 1],
      queryFn: () => getLogs({ filter, sortBy, page: -1 }),
    });

  return { isLoading, error, logs, count };
}
