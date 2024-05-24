import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import Uploader from "../data/Uploader";

const StyledNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 8rem);
  & p {
    margin-top: auto;
    font-size: 11px;
    font-weight: 500;
    color: var(--color-grey-500);
    text-transform: capitalize;
    text-align: center;
  }
`;
const NavList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-top: 1px solid var(--color-grey-100);
  padding-top: 0.8rem;
`;
const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    font-size: 1.6rem;
    font-weight: 500;
    color: var(--color-grey-600);
    padding: 1rem 2.3rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.2rem;
    letter-spacing: 1px;
  }
  &:hover,
  &:visited,
  &.active:link,
  &.active:visited {
    background-color: var(--color-grey-100);
    border-radius: var(--border-radius-sm);
  }
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
  }
  &:hover svg,
  &:link svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-500);
  }
`;
function MainNav() {
  return (
    <StyledNavContainer>
      <NavList>
        <li>
          <StyledNavLink to="dashboard">
            <HiOutlineHome />
            Home
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="bookings">
            <HiOutlineCalendarDays /> Bookings
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="cabins">
            <HiOutlineHomeModern /> Cabins
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="users">
            <HiOutlineUsers /> Users
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="settings">
            <HiOutlineCog /> Settings
          </StyledNavLink>
        </li>
      </NavList>
      {/* <Uploader /> */}
      <p>©️ Copyright-{new Date().getFullYear().toString()} Emad Ismail</p>
    </StyledNavContainer>
  );
}

export default MainNav;
