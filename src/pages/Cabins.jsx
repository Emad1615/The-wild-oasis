import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Modal from "../ui/Modal";
import Row from "../ui/Row";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h2"></Heading>
        <p>TEST</p>
      </Row>
      <CabinTable />
    </>
  );
}

export default Cabins;
