import styled from "styled-components";

export const LinkButton = styled.button`
  padding: 0;
  width: ${(props) => (props.width ? `${props.width}%` : "auto")};
  margin-right: ${(props) => (props.mr ? "16px" : "0")};
  font-size: ${(props) => (props.lg ? "1.2em" : "1em")};
  background: transparent;
  text-decoration: underline;
  color: #802BFF;
  border: none;
  outline: none;
  :hover {
    opacity: 0.9;
  }
  transition: 0.2s ease;

  ${({ variant }) =>
    variant === "primary" &&
    `
      color: #802BFF;
    `}

  ${({ variant }) =>
    variant === "secondary" &&
    `
      color: #505E66;
    `}

  ${(props) =>
    props.disabled
      ? `
      opacity: 0.4;
      :hover {
        opacity: 0.4;
      }
    `
      : `

    `};
`;
