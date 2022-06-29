import { Form } from "react-bootstrap";
import styled, { css } from "styled-components";

export const FormControl = styled(Form.Control)`
  ${(props) =>
    !!props.highlighted &&
    css`
      border: 0;
      box-shadow: 0px 0px 0px 1px orange;
      &:focus {
        border: 0;
        box-shadow: 0px 0px 0px 2px orange;
      }
    `}

  ${(props) =>
    !!props.error &&
    css`
      border: 0;
      box-shadow: 0px 0px 0px 1px red;
      &:focus {
        border: 0;
        box-shadow: 0px 0px 0px 2px red;
      }
    `}
`;
