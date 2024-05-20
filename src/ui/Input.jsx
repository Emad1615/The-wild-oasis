import styled from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-200);
  border-radius: 5px;
  padding: 0.5rem 1rem;
  color: var(--color-grey-700);
  background-color: var(--color-grey-50);
  outline: none;
  width: 100%;
  &:focus {
    outline: none;
  }
`;
export default Input;
