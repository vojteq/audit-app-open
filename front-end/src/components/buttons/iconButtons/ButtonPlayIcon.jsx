import IconButton from "./IconButton";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export const ButtonPlayIcon = ({ children, ...props }) => (
  <IconButton leftIcon={faPlay} {...props}>
    {children}
  </IconButton>
);
