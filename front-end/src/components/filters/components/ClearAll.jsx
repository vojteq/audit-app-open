import styled from "styled-components";

const Container = styled.button`
  border: none;
  border-radius: 4px;
  display: inline;
  text-decoration: underline;
  font-weight: bold;
  background: ${(props) => (props.isSelected ? "#f3f3f3" : "transparent")};
`;

const Label = styled.div`
  margin: 0;
  display: inline;
  color: #000;
`;

export default function ClearAll({ onClick }) {
  return (
    <Container
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <Label>Wyczyść</Label>
    </Container>
  );
}
