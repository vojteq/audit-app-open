import IconButton from "./iconButtons/IconButton";

export const ButtonDeletePlanItem = ({ children, isSuspended, ...props }) => (
  <IconButton {...props}>{children}</IconButton>
);
