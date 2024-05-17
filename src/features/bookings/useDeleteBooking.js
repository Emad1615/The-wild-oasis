import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";
export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteBooking,
    isLoading: isDeleting,
    error,
  } = useMutation({
    mutationFn: (bookingId) => deleteBookingAPI(bookingId),
    onSuccess: (data) => {
      toast.success(`Booking  has been successfully deleted`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("an  error occred during delete this booking"),
  });
  return { deleteBooking, isDeleting, error };
}
