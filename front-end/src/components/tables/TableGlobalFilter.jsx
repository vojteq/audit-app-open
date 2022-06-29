import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAsyncDebounce } from "react-table";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
`;

const Input = styled.input`
  background: #f5f5f5;
  padding: 0.5em 1em;
  margin-bottom: 2em;
  &:focus {
    outline: none;
  }
  flex-grow: 1;
  border: 0;
  padding-left: 2.5em;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 12px;
  left: 12px;
  opacity: 0.5;
`;

const ResetIcon = styled(FontAwesomeIcon)`
  top: 12px;
  right: 12px;
  opacity: 0.5;
`;

const Button = styled.button`
  border: none;
  padding: 0.5em 1em;
  background: #f3f3f3;
`;

export default function TableGlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Container>
      <SearchIcon icon={faSearch} />
      <Input
        type="text"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Szukaj...`}
      />
      <Button
        onClick={(e) => {
          setValue(undefined);
          onChange(undefined);
        }}
      >
        <ResetIcon icon={faTimes} />
      </Button>
    </Container>
  );
}
