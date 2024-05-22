import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useActivityDay() {
  const {
    data: activity,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["activity-day"],
    queryFn: getStaysTodayActivity,
  });
  return { activity, isLoading, error };
}
