import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getOccupiedCabinsFromBookings } from "../../services/apiBookings";

export function useOccupiedCabins() {
  const { mutate: getOccupiedCabins, isLoading } = useMutation({
    mutationFn: getOccupiedCabinsFromBookings,
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { getOccupiedCabins, isLoading };
}
