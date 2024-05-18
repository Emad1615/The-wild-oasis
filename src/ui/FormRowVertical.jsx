import styled from "styled-components";

const StyeldRowVertical = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 0.8rem;
`;
const Label = styled.label`
  font-size: 1.5rem;
  color: var(--color-grey-500);
  font-weight: 600;
  letter-spacing: 1px;
`;
const Error = styled.span`
  font-size: 1.2rem;
  color: var(--color-red-700);
`;
function FormRowVertical({ children, label, error }) {
  return (
    <StyeldRowVertical>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error htmlFor={children.props.id}>{error}</Error>}
    </StyeldRowVertical>
  );
}

export default FormRowVertical;
