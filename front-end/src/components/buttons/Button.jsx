import styled from "styled-components";

export const Button = styled.button`
  padding: ${(props) => (props.large ? "16px 32px" : "8px 16px")};
  width: ${(props) => (props.width ? `${props.width}%` : "auto")};
  margin-right: ${(props) => (props.mr ? "16px" : "0")};
  background: ${(props) => props.theme.colors.bg.primary};
  color: #fff;
  border: none;
  outline: none;
  border-radius: 5px;
  transition: 0.2s ease;
  border-radius: 2px;

  ${({ variant }) =>
    variant === "primary" &&
    `
      background: ${(props) => props.theme.colors.bg.primary};
      color: #fff;
      :hover {
        opacity: 0.9;
      }
    `}

  ${({ variant }) =>
    variant === "secondary" &&
    `
      background-color: #505E66;
      color: #fff;
      :hover {
        opacity: 0.9;
      }
    `}

  ${({ variant }) =>
    variant === "danger" &&
    `
      background-color: #e01e37;
      color: #fff;
      :hover {
        opacity: 0.9;
      }
    `}

  ${({ variant }) =>
    variant === "outline-danger" &&
    ` 
      -webkit-box-shadow:inset 0px 0px 0px 2px #e01e37;
      -moz-box-shadow:inset 0px 0px 0px 2px #e01e37;
      box-shadow:inset 0px 0px 0px 2px #e01e37;
      background-color: transparent;
      color: #e01e37;
      :hover {
        background-color: #e01e37;
        color: #fff;
      }
      :disabled {
        :hover {
          background-color: transparent;
          color: #e01e37;
        }
      }
      border-radius: 2px;
    `}

    ${({ variant }) =>
    variant === "outline-secondary" &&
    `
      -webkit-box-shadow:inset 0px 0px 0px 2px #505E66;
      -moz-box-shadow:inset 0px 0px 0px 2px #505E66;
      box-shadow:inset 0px 0px 0px 2px #505E66;
      background-color: transparent;
      color: #505E66;
      :hover {
        background-color: #505E66;
        color: #fff;
      }
      :disabled {
        :hover {
          background-color: transparent;
          color: #505E66;
        }
      }
      border-radius: 2px;
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
