import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteUserByAdmin as deleteUserByAdminApi } from "../../services/apiAdminActions";

export function useDeleteUserByAdmin() {
  const queryClient = useQueryClient();

  const { mutate: deleteUserByAdmin, isLoading: isDeleting } = useMutation({
    mutationFn: deleteUserByAdminApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("User deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteUserByAdmin, isDeleting };
}
