import { useEffect, useState } from "react";
import styled from "styled-components";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const results = elements.filter((el) =>
      el.label.toLowerCase().includes(searchText)
    );
    setSearchResults(results);
  }, [searchText, elements]);

  return (
    <Container fullWidth>
      <SelectContainer>
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
        ) : null}
      </SelectContainer>
      <DropdownMenu
        isExpanded={true}
        elements={searchResults}
        handleSelect={handleSelect}
        clearSelection={clearSelection}
        alwaysExpanded={true}
      />
    </Container>
  );
}
