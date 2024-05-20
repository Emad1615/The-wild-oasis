import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDay = !searchParams.get("last") ? 7 : searchParams.get("last");
  const date = subDays(new Date(), numDay).toISOString();
  const { data: { data: bookings, count } = {}, isLoading } = useQuery({
    queryKey: ["bookings", `last-${numDay}`],
    queryFn: () => getBookingsAfterDate(date),
  });
  return { bookings, count, isLoading };
}
