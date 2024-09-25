import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateUserByAdmin as updateUserByAdminApi } from "../../services/apiAdminActions";

export function useUpdateUserByAdmin() {
  const queryClient = useQueryClient();

  const { mutate: updateUserByAdmin, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserByAdminApi,
    onSuccess: () => {
      toast.success("User successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateUserByAdmin, isUpdating };
}
