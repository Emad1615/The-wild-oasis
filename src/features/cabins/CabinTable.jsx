import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Spinner from "./../../ui/Spinner";
import CreateCabinForm from "./CreateCabinForm";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

const filterOptions = [
  { value: "all", label: "All" },
  { value: "no-discount", label: "No discount" },
  { value: "with-discount", label: "With discount" },
];
const sortedOptions = [
  { value: "name-asc", label: "Sort by name (A-Z)" },
  { value: "name-desc", label: "Sort by name (Z-A)" },
  { value: "regularPrice-asc", label: "Sort by price (low first)" },
  { value: "regularPrice-desc", label: "Sort by price (high first)" },
  { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
  { value: "maxCapacity-desc", label: "Sort by capacity (high first)" },
];
function CabinTable() {
  const { cabins, isLoading, error } = useCabins();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  //FILTER
  const selectedFilter = searchParams.get("discount") || "all";
  let filteredData;
  if (selectedFilter === "all") filteredData = cabins;
  if (selectedFilter === "no-discount")
    filteredData = cabins.filter(
      (x) => x.discount === null || x.discount === 0
    );
  if (selectedFilter === "with-discount")
    filteredData = cabins.filter((x) => x.discount > 0);
  //SortBy

  return (
    <>
      <Menus>
        <Table
          columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"
          title={"Cabins list"}
          searchBy={"name"}
          filterOptions={filterOptions}
          filterValue="discount"
          sortOptions={sortedOptions}
          allowFilter={true}
          allowSort={true}
        >
          <Table.Header>
            <div></div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </Table.Header>
          <Table.Body
            // data={cabins}
            data={filteredData}
            render={(cabin, idx) => <CabinRow cabin={cabin} key={idx} />}
          />
          <Table.Window>
            <CreateCabinForm />
          </Table.Window>
        </Table>
      </Menus>
    </>
  );
}

export default CabinTable;
