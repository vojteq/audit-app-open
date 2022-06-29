import { ButtonPlayIcon } from "./iconButtons/ButtonPlayIcon";
import { ButtonPauseIcon } from "./iconButtons/ButtonPauseIcon";

export const ButtonSuspendResumeTask = ({
  children,
  isSuspended,
  ...props
}) => (
  <>
    {!!isSuspended ? (
      <ButtonPlayIcon {...props}>{children}</ButtonPlayIcon>
    ) : (
      <ButtonPauseIcon {...props}>{children}</ButtonPauseIcon>
    )}
  </>
);
