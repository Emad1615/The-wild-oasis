import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDay = !searchParams.get("last") ? 7 : searchParams.get("last");
  const date = subDays(new Date(), numDay).toISOString();
  const { data: { data: allStays, count } = {}, isLoading } = useQuery({
    queryKey: ["stays", `last-${numDay}`],
    queryFn: () => getStaysAfterDate(date),
  });
  const stays = allStays?.filter((booking) => booking.status !== "unconfirmed");
  return { stays, count, isLoading, numDay };
}
