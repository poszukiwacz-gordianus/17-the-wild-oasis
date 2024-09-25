import { useMutation } from "@tanstack/react-query";
import { createGuest as createGuestApi } from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useCreateGuest() {
  const { mutate: createGuest, isLoading: isCreating } = useMutation({
    mutationFn: createGuestApi,
    onSuccess: () => {
      toast.success("Guest created successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createGuest, isCreating };
}
