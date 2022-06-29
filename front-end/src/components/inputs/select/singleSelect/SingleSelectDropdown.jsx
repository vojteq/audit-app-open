import { useEffect, useState } from "react";
import styled from "styled-components";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClickAwayListener from "react-click-away-listener";
import DropdownMenu from "../components/DropdownMenu";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SelectContainer = styled.div`
  border: 2px solid #ebecf0;
  border-radius: 4px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: no-wrap;
  cursor: pointer;
  padding: 0.5em 0 0.5em 1em;
`;

const IconContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 1em;
`;

const Label = styled.div`
  flex-grow: 1;
`;

const Icon = styled(FontAwesomeIcon)``;

export default function SingleSelectDropdown({
  options,
  handleSelect,
  clearSelection,
  value,
  selectedElement,
  ...rest
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleClickAway = () => setIsExpanded(false);

  useEffect(() => {
    setIsExpanded(false);
  }, [value]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Container {...rest}>
        <SelectContainer onClick={toggleExpand}>
          <Label>{selectedElement?.label}</Label>
          {isExpanded ? (
            <IconContainer>
              <Icon icon={faAngleUp} />
            </IconContainer>
          ) : (
            <IconContainer>
              <Icon icon={faAngleDown} />
            </IconContainer>
          )}
        </SelectContainer>
        <DropdownMenu
          isExpanded={isExpanded}
          elements={options.filter((option) => option.value !== value)}
          handleSelect={handleSelect}
          clearSelection={clearSelection}
          noCheckbox={true}
        />
      </Container>
    </ClickAwayListener>
  );
}
