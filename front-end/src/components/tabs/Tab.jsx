import styled from "styled-components";
import { theme } from "../../layout/theme/theme";

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const TabButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  padding: 1em 2em;
  display: flex;
  border: none;
  border-bottom: 3px solid transparent;
  background: #f3f3f3;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
  ${(props) =>
    props.disabled &&
    `
      opacity: 1;
      color: ${theme.colors.bg.primary};
      border-bottom: 3px solid ${theme.colors.bg.primary};
    `};
`;

export default function Tab({ index, setIndex, label, isSelected }) {
  return (
    <Container>
      <TabButton
        onClick={() => setIndex(index)}
        disabled={isSelected}
        isSelected={isSelected}
      >
        {label}
      </TabButton>
    </Container>
  );
}
