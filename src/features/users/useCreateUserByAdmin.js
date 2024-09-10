import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createUserByAdmin } from "../../services/apiAdminActions";

export function useCreateUserByAdmin() {
  const queryClient = useQueryClient();

  const { mutate: createNewUser, isLoading: isCreating } = useMutation({
    mutationFn: createUserByAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("New account successfully created!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createNewUser, isCreating };
}
