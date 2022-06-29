import { useEffect, useState } from "react";
import FilterGroup from "./components/FilterGroup";
import SingleSelectDropdown from "../inputs/select/singleSelect/SingleSelectDropdown";

export default function YearFilter({ options, selected, setSelected }) {
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
    <FilterGroup header="Rok">
      <SingleSelectDropdown
        options={optionsMapped}
        handleSelect={handleSelect}
        clearSelection={clearSelected}
        value={selected}
        selectedElement={
          optionsMapped.find((option) => option.value === selected) || null
        }
      />
    </FilterGroup>
  );
}
