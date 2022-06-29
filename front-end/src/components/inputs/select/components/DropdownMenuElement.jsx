import styled from "styled-components";
import Checkbox from "../../checkbox/Checkbox";

const Container = styled.button`
  border: none;
  padding: 0.2em 1em;
  display: flex;
  align-items: center;
  width: 100%;
  :hover {
    background: ${(props) => (props.isSelected ? "#f3f3f3" : "#f8f8f8")};
  }
  background: ${(props) => (props.isSelected ? "#f3f3f3" : "transparent")};
`;

export default function DropdownMenuElement({
  label,
  isSelected,
  onClick,
  noCheckbox,
}) {
  return (
    <Container
      type="button"
      name={isSelected ? "deleteButton" : "addButton"}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      isSelected={isSelected}
    >
      {!noCheckbox ? (
        <Checkbox checked={isSelected} readOnly disabled sm mr />
      ) : null}
      {label}
    </Container>
  );
}
