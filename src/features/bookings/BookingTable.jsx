import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import { useBookings } from "./useBookings";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";

const filterOptions = [
  { value: "all", label: "All" },
  { value: "unconfirmed", label: "Unconfirmed" },
  { value: "checked-in", label: "Checked in" },
  { value: "checked-out", label: "Checked out" },
];
const sortOptions = [
  { value: "startDate-desc", label: "Sort by date (recent first)" },
  { value: "startDate-asc", label: "Sort by date (earlier first)" },
  {
    value: "totalPrice-desc",
    label: "Sort by amount (high first)",
  },
  { value: "totalPrice-asc", label: "Sort by amount (low first)" },
];
function BookingTable() {
  const { bookings, isLoading, error, status, count } = useBookings();
  if (isLoading) return <Spinner />;
  if (!bookings.length) return <Empty resource={"Bookings"} />;

  return (
    <Menus>
      <Table
        title={"Boobkings list"}
        columns={"0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem"}
        searchBy={"guests.fullName"}
        allowFilter={true}
        allowSort={true}
        filterValue="status"
        filterOptions={filterOptions}
        sortOptions={sortOptions}
      >
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={bookings}
          render={(booking, idx) => <BookingRow key={idx} booking={booking} />}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
        <Table.Window>
          <h1>You are welcome</h1>
        </Table.Window>
      </Table>
    </Menus>
  );
}

export default BookingTable;
