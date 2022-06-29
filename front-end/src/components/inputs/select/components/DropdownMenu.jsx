import styled from "styled-components";
import DropdownMenuElement from "./DropdownMenuElement";

const DropdownContainer = styled.div`
  border: 2px solid #ebecf0;
  border-radius: 4px;
  background: #fff;
  display: flex;
  flex-direction: column;
  position: ${(props) => (props.alwaysExpanded ? "relative" : "absolute")};
  margin-top: ${(props) => (props.alwaysExpanded ? "0.5em" : "0")};
  width: 100%;
  top: 110%;
  z-index: 2;
`;

const DropdownElementsContainer = styled.div`
  max-height: 200px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    transition: all 150ms;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #b1b1b1;
    border-radius: 2px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #888;
  }
  padding: 0.2em 0;
`;

const Alert = styled.div`
  border: none;
  padding: 0.2em 1em;
  display: flex;
  align-items: center;
  width: 100%;
`;

export default function DropdownMenu({
  isExpanded,
  elements,
  handleSelect,
  noCheckbox,
  alwaysExpanded,
}) {
  return (
    <>
      {!!elements && elements.length > 0 ? (
        <>
          {isExpanded ? (
            <DropdownContainer alwaysExpanded={alwaysExpanded}>
              <DropdownElementsContainer>
                {elements.map((element) => (
                  <DropdownMenuElement
                    key={element.value}
                    label={element.label}
                    value={element.value}
                    isSelected={element.isSelected}
                    onClick={() => handleSelect(element.value)}
                    noCheckbox={noCheckbox}
                  />
                ))}
              </DropdownElementsContainer>
            </DropdownContainer>
          ) : null}
        </>
      ) : (
        <DropdownContainer alwaysExpanded={alwaysExpanded}>
          <DropdownElementsContainer>
            {/* <Alert>Nie znaleziono pasujących wyników.</Alert> */}
          </DropdownElementsContainer>
        </DropdownContainer>
      )}
    </>
  );
}
