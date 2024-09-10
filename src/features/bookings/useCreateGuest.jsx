import { useMutation } from "@tanstack/react-query";
import { createGuest as createGuestApi } from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useCreateGuest() {
  const { mutate: createGuest, isLoading: isCreating } = useMutation({
    mutationFn: createGuestApi,
    onSuccess: () => {
      toast.success("Guest created successfully");
    },
    onError: () => {
      toast.error(
        "Please check if the nationality field is correctly filled in"
      );
    },
  });

  return { createGuest, isCreating };
}
