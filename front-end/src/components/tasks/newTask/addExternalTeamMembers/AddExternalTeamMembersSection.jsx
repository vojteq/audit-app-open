import ExternalTeamMembersList from "./ExternalTeamMembersList";
import styled from "styled-components";
import AddExternalTeamMemberForm from "./AddExternalTeamMemberForm";

const Container = styled.div`
  border-radius: 4px;
  border: 2px solid #ebecf0;
  padding: 1em;
`;

export default function AddExternalTeamMembersSection({
  externalTeamMembersNames,
  setExternalTeamMembersNames,
  register,
}) {
  const addExternalTeamMemberName = (name) => {
    setExternalTeamMembersNames([...externalTeamMembersNames, name]);
  };

  const removeTeamMemberName = (name) => {
    setExternalTeamMembersNames([
      ...externalTeamMembersNames.filter(
        (teamMemberName) => teamMemberName !== name
      ),
    ]);
  };

  return (
    <Container>
      <h6>Dodaj członka zespołu spoza listy pracowników</h6>
      <AddExternalTeamMemberForm
        addExternalTeamMemberName={addExternalTeamMemberName}
        externalTeamMembersNames={externalTeamMembersNames}
      />
      <ExternalTeamMembersList
        teamMembersNames={externalTeamMembersNames}
        removeTeamMemberName={removeTeamMemberName}
      />
    </Container>
  );
}
