import IconButton from "./IconButton";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export const ButtonPenPaperIcon = ({ children, ...props }) => (
  <IconButton leftIcon={faEdit} {...props}>
    {children}
  </IconButton>
);
