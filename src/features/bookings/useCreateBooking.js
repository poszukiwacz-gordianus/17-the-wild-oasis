import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { createBooking as createBookingApi } from "../../services/apiBookings";

export default function useCreateBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createBooking, isLoading: isCreating } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: (id) => {
      console.log(id);
      toast.success("Reservation created successfully");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      navigate(`/booking/${id}`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createBooking, isCreating };
}
