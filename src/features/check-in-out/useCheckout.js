import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const {
    mutate: checkOut,
    isLoading: isCheckout,
    error,
  } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} has been successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () =>
      toast.error(`an error occred during checked out this booking`),
  });
  return { checkOut, isCheckout, error };
}
