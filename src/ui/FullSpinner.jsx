import styled from "styled-components";

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  width: 100%;
`;
function FullSpinner() {
  return (
    <SpinnerContainer>
      <span className="loader"></span>
    </SpinnerContainer>
  );
}

export default FullSpinner;
