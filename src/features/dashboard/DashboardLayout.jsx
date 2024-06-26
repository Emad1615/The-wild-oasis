import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "./../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "./../cabins/useCabins";
import TodayActivity from "../check-in-out/TodayActivity";
import { useActivityDay } from "../check-in-out/useActivityDay";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const {
    bookings,
    isLoading: isLoadingBookings,
    count: bookingsCount,
  } = useRecentBookings();
  const {
    stays,
    count: staysCount,
    isLoading: isLoadingSays,
    numDay,
  } = useRecentStays();
  const { activity, isLoading: isLoadingActivity } = useActivityDay();
  const { cabins, isLoading: isLoadingCabins } = useCabins();
  if (
    isLoadingBookings ||
    isLoadingSays ||
    isLoadingCabins ||
    isLoadingActivity
  )
    return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        bookingsCount={bookingsCount}
        stays={stays}
        staysCount={staysCount}
        numDay={numDay}
        cabins={cabins?.length}
      />
      <TodayActivity activities={activity} />
      <DurationChart stays={stays} />
      <SalesChart bookings={bookings} numDay={numDay} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
