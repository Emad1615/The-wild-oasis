import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Box from "../../ui/Box";
import TodayItem from "./TodayItem";

const StyledToday = styled(Box)`
  grid-column: 1 / span 2;
`;
const StyledList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
`;
const NotActivity = styled.p`
  color: var(--color-grey-600);
  font-weight: 500;
  font-size: 1.8rem;
  text-align: center;
`;
function TodayActivity({ activities }) {
  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>
      <StyledList>
        {activities.length === 0 && (
          <NotActivity>No activity today</NotActivity>
        )}
        {activities?.map((activity, idx) => (
          <TodayItem key={idx} activity={activity} />
        ))}
      </StyledList>
    </StyledToday>
  );
}

export default TodayActivity;
