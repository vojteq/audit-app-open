import IconButton from "./iconButtons/IconButton";

export const ButtonDeleteTeamOrCompany = ({
  children,
  isSuspended,
  ...props
}) => <IconButton {...props}>{children}</IconButton>;
