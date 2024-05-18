import styled, { css } from "styled-components";

const Heading = styled.h1`
  color: var(--color-grey-500);
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2.7rem;
      font-weight: 600;
    `}
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2.5rem;
      font-weight: 500;
    `}
    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: bold;
      text-align: center;
      text-transform: capitalize;
      letter-spacing: 2px;
    `}
`;

export default Heading;
