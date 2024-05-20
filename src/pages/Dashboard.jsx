import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h3">Dashboard</Heading>
        <p>TEST</p>
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
