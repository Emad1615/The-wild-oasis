import styled from "styled-components";

const StyledRowForm = styled.div`
  display: grid;
  grid-template-columns: 23rem 1fr 1.2fr;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 1rem;
  margin: 0.5rem 0;
  background-color: var(--color-grey-100);
  border-radius: 5px;
  box-shadow: var(--shadow-sm);
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
`;
const Error = styled.span`
  font-size: 1.2rem;
  color: var(--color-red-700);
`;
function FormRow({ label, error, children }) {
  return (
    <StyledRowForm>
      {label && <label htmlFor={children.props.id}>{label}</label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledRowForm>
  );
}

export default FormRow;
