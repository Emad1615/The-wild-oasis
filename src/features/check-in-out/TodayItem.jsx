import styled from "styled-components";
import Tag from "./../../ui/Tag";
import Flag from "./../../ui/Flag";
import Button from "./../../ui/Button";
const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 11rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;
function TodayItem({ activity }) {
  return (
    <StyledTodayItem>
      {activity.status === "unconfirmed" && (
        <Tag type="blue">{activity.status}</Tag>
      )}
      {activity.status === "checked-in" && (
        <Tag type="green">{activity.status}</Tag>
      )}
      <Flag
        src={activity.guests.countryFlag}
        alt={`country flag of ${activity.guests.fullName}`}
      />
      <Guest>{activity.guests.fullName}</Guest>
      <div>{activity.numNights} nights</div>
      {activity.status === "unconfirmed" && (
        <Button variation="primary" sizes="small">
          Check in
        </Button>
      )}
      {activity.status === "checked-in" && (
        <Button variation="danger" sizes="small">
          Check out
        </Button>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
