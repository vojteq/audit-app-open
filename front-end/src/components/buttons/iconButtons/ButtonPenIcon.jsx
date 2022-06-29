import IconButton from "./IconButton";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export const ButtonPenIcon = ({ children, ...props }) => (
  <IconButton leftIcon={faPen} {...props}>
    {children}
  </IconButton>
);
