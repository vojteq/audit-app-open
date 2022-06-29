import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  faAngleDown,
  faAngleUp,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClickAwayListener from "react-click-away-listener";
import DropdownMenu from "../components/DropdownMenu";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.fullWidth ? "100%" : "300px")};
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
`;

const IconContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 1em;
`;

const Icon = styled(FontAwesomeIcon)``;

const Input = styled.input`
  padding: 0.5em 1em;
  border: none;
  height: 100%;
  width: 100%;
  &:focus {
    border: none;
    outline: none;
  }
`;

export default function MultipleSelectDropdownWithSearch({
  placeholder,
  elements,
  handleSelect,
  clearSelection,
  fullWidth,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleClickAway = () => setIsExpanded(false);

  useEffect(() => {
    if (searchText.length > 0) {
      setIsExpanded(true);
    }
    const results = elements.filter((el) =>
      el.label.toLowerCase().includes(searchText)
    );
    setSearchResults(results);
  }, [searchText, elements]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Container fullWidth={fullWidth}>
        <SelectContainer onClick={toggleExpand}>
          <Input
            type="text"
            placeholder={placeholder}
            value={searchText}
            onChange={handleChange}
          />
          {searchText !== "" ? (
            <IconContainer onClick={() => setSearchText("")}>
              <Icon icon={faTimesCircle} />
            </IconContainer>
          ) : isExpanded ? (
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
          elements={searchResults}
          handleSelect={handleSelect}
          clearSelection={clearSelection}
        />
      </Container>
    </ClickAwayListener>
  );
}
