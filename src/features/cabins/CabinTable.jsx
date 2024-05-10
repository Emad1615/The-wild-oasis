import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Spinner from "./../../ui/Spinner";
import CreateCabinForm from "./CreateCabinForm";

function CabinTable() {
  const { cabins, isLoading, error } = useCabins();
  if (isLoading) return <Spinner />;
  return (
    <>
      <Table
        columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"
        title={"Cabin list"}
        searchBy={"name"}
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
          data={cabins}
          render={(cabin, idx) => <CabinRow cabin={cabin} key={idx} />}
        />
        <Table.Window>
          <CreateCabinForm />
        </Table.Window>
      </Table>
    </>
  );
}

export default CabinTable;
