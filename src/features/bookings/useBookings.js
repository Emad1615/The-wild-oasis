import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();
  //FILTER
  const filteredValue = searchParams.get("status");
  const filter =
    !filteredValue || filteredValue === "all"
      ? null
      : { field: "status", value: filteredValue, method: "eq" };
  //SORT BY
  const sortedValue = searchParams.get("sortBy") || "startDate-desc";
  const [filed, direction] = sortedValue.split("-");
  const sort = { filed, direction };
  const {
    data: bookings,
    isLoading,
    error,
    status,
  } = useQuery({
    queryKey: ["bookings", filter, sort],
    queryFn: () => getBookings(filter, sort),
  });
  return { bookings, isLoading, status, error };
}
