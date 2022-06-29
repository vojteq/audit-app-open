import IconButton from "./IconButton";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export const ButtonArrowLeft = ({ children, ...props }) => (
  <IconButton leftIcon={faAngleLeft} {...props}>
    {children}
  </IconButton>
);
