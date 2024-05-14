import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
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

  //PAGINATION
  //QUERY
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
    status,
  } = useQuery({
    queryKey: ["bookings", filter, sort, page],
    queryFn: () => getBookings(filter, sort, page),
  });
  // PREFETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page + 1],
      queryFn: () => getBookings(filter, sort, page + 1),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page - 1],
      queryFn: () => getBookings(filter, sort, page - 1),
    });
  return { bookings, isLoading, status, error, count };
}
