import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 0.5em 0;
`;

const ChildrenContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const HeaderContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 0.5em;
`;

const Header = styled.h6`
  margin: 0;
`;

const IconContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 0.5em;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 1em;
`;

export default function FilterGroup({ header, children }) {
  const [show, setShow] = useState(true);

  const toggleShow = () => setShow(!show);

  return (
    <Container>
      <HeaderContainer onClick={toggleShow}>
        <Header>{header}</Header>
        {show ? (
          <IconContainer>
            <Icon icon={faAngleUp} />
          </IconContainer>
        ) : (
          <IconContainer>
            <Icon icon={faAngleDown} />
          </IconContainer>
        )}
      </HeaderContainer>
      {show ? <ChildrenContainer>{children}</ChildrenContainer> : null}
    </Container>
  );
}
