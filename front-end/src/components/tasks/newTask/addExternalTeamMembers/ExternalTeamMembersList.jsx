import styled from "styled-components";
import ExternalTeamMember from "./ExternalTeamMember";

const Container = styled.div`
  padding: 0.2em 0;
`;

export default function ExternalTeamMembersList({
  teamMembersNames,
  removeTeamMemberName,
}) {
  return (
    <Container>
      {!!teamMembersNames && teamMembersNames.length > 0
        ? teamMembersNames.map((teamMemberName) => (
            <ExternalTeamMember
              key={teamMemberName}
              teamMemberName={teamMemberName}
              removeTeamMemberName={removeTeamMemberName}
            />
          ))
        : null}
    </Container>
  );
}
