import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLogs as deleteLogsApi } from "../../services/apiLogs";
import toast from "react-hot-toast";

export function useDeleteLogs() {
  const queryClient = useQueryClient();

  const { mutate: deleteLogs, isLoading: isDeleting } = useMutation({
    mutationFn: deleteLogsApi,
    onSuccess: () => {
      toast.success("Messages deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["logs"] });
    },
    onError: () => {
      toast.error("There was an error while deleting");
    },
  });

  return { deleteLogs, isDeleting };
}
