import IconButton from "./IconButton";
import { faPause } from "@fortawesome/free-solid-svg-icons";

export const ButtonPauseIcon = ({ children, ...props }) => (
  <IconButton leftIcon={faPause} {...props}>
    {children}
  </IconButton>
);
