import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBriefcase,
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, bookingsCount, stays, staysCount, numDay, cabins }) {
  const totalSales = stays?.reduce((sum, arr) => sum + arr.totalPrice, 0);

  const occuapancyRate =
    stays?.reduce((sum, arr) => sum + arr.numNights, 0) / (numDay * cabins);
  return (
    <>
      <Stat
        color={"blue"}
        icon={<HiOutlineBriefcase />}
        title={"Bookings"}
        value={bookingsCount}
      />
      <Stat
        color={"green"}
        icon={<HiOutlineBanknotes />}
        title={"sales"}
        value={formatCurrency(totalSales)}
      />
      <Stat
        color={"indigo"}
        icon={<HiOutlineCalendarDays />}
        title={"check in"}
        value={staysCount}
      />
      <Stat
        color={"yellow"}
        icon={<HiOutlineChartBar />}
        title={"occupancy rate"}
        value={Math.round(occuapancyRate * 100) + "%"}
      />
    </>
  );
}

export default Stats;
