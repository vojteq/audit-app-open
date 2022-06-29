import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Button } from "../Button";

const LeftIcon = styled(FontAwesomeIcon)`
  margin-right: ${(props) => (props.hasChildren ? "0.5em" : 0)};
  font-size: 0.8em;
`;

const RightIcon = styled(FontAwesomeIcon)`
  margin-left: ${(props) => (props.hasChildren ? "0.5em" : 0)};
  font-size: 0.8em;
`;

const Inner = styled.span`
  display: flex;
  align-items: center;
`;

export default function IconButton({
  children,
  leftIcon,
  rightIcon,
  ...props
}) {
  return (
    <Button {...props}>
      <Inner>
        {!!leftIcon ? (
          <LeftIcon icon={leftIcon} hasChildren={!!children} />
        ) : null}
        {children}
        {!!rightIcon ? (
          <RightIcon icon={rightIcon} hasChildren={!!children} />
        ) : null}
      </Inner>
    </Button>
  );
}
