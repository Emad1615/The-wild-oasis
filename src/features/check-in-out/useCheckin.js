import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export function useCheckin() {
  const { bookingId } = useParams();
  const queryClient = useQueryClient();
  const {
    mutate: checkIn,
    isLoading: isUpdating,
    error: checkInError,
  } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} has been successfully checked in`);
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: () => toast.error("an Error Occured during checking in process"),
  });
  return { checkIn, isUpdating, checkInError };
}
