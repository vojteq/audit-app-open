import IconButton from "./IconButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const ButtonPlusSign = ({ children, ...props }) => (
  <IconButton leftIcon={faPlus} {...props}>
    {children}
  </IconButton>
);
