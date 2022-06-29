import { useEffect, useState } from "react";
import styled from "styled-components";
import SingleSelectDropdown from "../../inputs/select/singleSelect/SingleSelectDropdown";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const Header = styled.h6`
  margin: 0;
`;

export default function MaxDaysSelect({ options, selected, setSelected }) {
  const [optionsMapped, setOptionsMapped] = useState([]);

  useEffect(() => {
    if (!!options && options.length > 0) {
      setOptionsMapped(
        options.map((el) => ({
          value: el.value,
          label: `${el.label}`,
          isSelected: !!selected ? el === el.value : false,
        }))
      );
    }
  }, [options, selected]);

  const handleSelect = (value) => {
    setSelected(value);
  };

  const clearSelected = () => setSelected(null);

  return (
    <Container>
      <Header>
        Maksymalna liczba dni pozostałych do planowanej daty zakończenia
        zadania:
      </Header>
      <SingleSelectDropdown
        options={optionsMapped}
        handleSelect={handleSelect}
        clearSelection={clearSelected}
        value={selected}
        selectedElement={
          optionsMapped.find((option) => option.value === selected) || null
        }
      />
    </Container>
  );
}
