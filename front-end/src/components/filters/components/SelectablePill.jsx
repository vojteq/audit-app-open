import styled from "styled-components";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.button`
  padding: 0.25em 0.8em 0.25em 2.2em;
  border: 2px solid #ebecf0;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: ${(props) => (props.isSelected ? "#f3f3f3" : "transparent")};
  :hover {
    background: ${(props) => (props.isSelected ? "#f3f3f3" : "#f8f8f8")};
  }
`;

const Label = styled.div`
  margin: 0;
  display: inline;
`;

const Icon = styled(FontAwesomeIcon)`
  display: inline;
  margin-left: 0.5em;
  font-size: 0.9em;
  background: transparent;
  color: ${(props) => (props.isSelected ? "#2a2a2a" : "transparent")};
`;

export default function SelectablePill({ label, value, isSelected, onClick }) {
  return (
    <Container onClick={onClick} isSelected={isSelected}>
      <Label isSelected={isSelected}>{label}</Label>
      <Icon icon={faTimesCircle} isSelected={isSelected} />
    </Container>
  );
}
