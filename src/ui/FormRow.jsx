import styled from "styled-components";
import { HiOutlineCog } from "react-icons/hi2";
import { useState } from "react";
const StyledRowForm = styled.div`
  display: grid;
  grid-template-columns: 23rem 1fr 1.2fr;
  align-items: center;
  gap: 3rem;
  padding: 1.5rem 1rem;
  margin: 0.5rem 0;
  background-color: var(--color-grey-100);
  border-radius: 5px;
  box-shadow: var(--shadow-sm);
  position: relative;
  &:first-child {
    padding-top: 0.8rem;
  }
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-200);
  }
  & label {
    text-transform: capitalize;
    font-weight: 500;
    color: var(--color-grey-600);
    letter-spacing: 0.8px;
  }
  &:hover {
    background-color: var(--color-grey-0);
  }
  & svg {
    width: 2.5rem;
    height: 2.5rem;
    color: var(--color-brand-500);
    position: absolute;
    right: 1rem;
    top: 2rem;
    display: ${(props) => props.display};
    animation: Cog 4s linear infinite;
  }
  @keyframes Cog {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
    25% {
      color: var(--color-brand-300);
    }
    50% {
      color: var(--color-brand-400);
    }
    50% {
      color: var(--color-brand-550);
    }
    75% {
      color: var(--color-brand-600);
    }
    100% {
      color: var(--color-brand-700);
    }
  }
`;

const Error = styled.span`
  font-size: 1.5rem;
  color: var(--color-red-700);
  text-transform: uppercase;
`;
function FormRow({ label, error, children }) {
  const [displayIcon, setDisplayIcon] = useState(false);
  return (
    <StyledRowForm
      onMouseEnter={() => setDisplayIcon(true)}
      onMouseLeave={() => setDisplayIcon(false)}
    >
      {label && <label htmlFor={children.props.id}>{label}</label>}
      {children}
      {error && <Error>{error}</Error>}
      <HiOutlineCog display={`${displayIcon ? "block" : "none"}`} />
    </StyledRowForm>
  );
}

export default FormRow;
