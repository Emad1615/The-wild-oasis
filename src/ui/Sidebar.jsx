import styled from "styled-components";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-300);
  grid-row: 1/-1;
`;
function Sidebar() {
  return <StyledSidebar>Sidebar</StyledSidebar>;
}

export default Sidebar;
