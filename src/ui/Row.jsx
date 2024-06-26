import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  gap: 0.8rem;
  margin: 1rem 0;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      justify-content: start;
    `}
`;
Row.defaultProps = {
  type: "vertical",
};
export default Row;
