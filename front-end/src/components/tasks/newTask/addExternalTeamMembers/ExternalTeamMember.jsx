import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

const Container = styled.div`
  border-radius: 4px;
  cursor: pointer;
  padding: 0.2em 0.5em;
  border-radius: 4px;
  border: 2px solid #ebecf0;
  margin-top: 0.5em;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 0.5em;
  color: #b1b1b1;
`;

export default function ExternalTeamMember({
  teamMemberName,
  removeTeamMemberName,
}) {
  return (
    <Container onClick={() => removeTeamMemberName(teamMemberName)}>
      <Icon icon={faTimes} />
      {teamMemberName}
    </Container>
  );
}
