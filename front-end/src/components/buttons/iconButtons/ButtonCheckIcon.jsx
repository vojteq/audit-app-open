import IconButton from "./IconButton";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export const ButtonCheckIcon = ({ children, ...props }) => (
  <IconButton leftIcon={faCheck} {...props}>
    {children}
  </IconButton>
);
