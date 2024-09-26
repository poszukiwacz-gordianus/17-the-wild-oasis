import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markLogsAsRead as markLogsAsReadApi } from "../../services/apiLogs";

export function useMarkLogsAsRead() {
  const queryClient = useQueryClient();

  const { mutate: markLogsAsRead, isLoading } = useMutation({
    mutationFn: markLogsAsReadApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["newLogs"],
      });
    },
  });

  return { markLogsAsRead, isLoading };
}
