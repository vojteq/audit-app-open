import IconButton from "./IconButton";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export const ButtonArrowRight = ({ children, ...props }) => (
  <IconButton rightIcon={faAngleRight} {...props}>
    {children}
  </IconButton>
);
