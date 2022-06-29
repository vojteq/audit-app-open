import { useEffect, useState } from "react";
import ClearAll from "./components/ClearAll";
import FilterGroup from "./components/FilterGroup";
import MultipleSelectDropdownWithSearch from "../inputs/select/multipleSelect/MultipleSelectDropdownWithSearch";

export default function TaskManagersFilter({ data, selected, setSelected }) {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (!!data && data.length > 0) {
      setElements(
        data.map((el) => ({
          value: el.id,
          label: `${el.firstName} ${el.lastName}`,
          isSelected: !!selected ? selected.includes(el.id) : false,
        }))
      );
    }
  }, [data, selected]);

  const handleSelect = (value) => {
    if (!selected.includes(value)) {
      setSelected([value, ...selected]);
    } else {
      let newSelected = selected;
      if (selected.length === 1) {
        newSelected = [];
      } else {
        newSelected = selected.filter((x) => x !== value);
      }
      setSelected(newSelected);
    }
  };

  const clearSelected = () => setSelected([]);

  return (
    <FilterGroup header="Kierownicy zadania">
      <MultipleSelectDropdownWithSearch
        placeholder="Wybierz kierowników zadania"
        elements={elements}
        handleSelect={handleSelect}
        clearSelection={clearSelected}
      />
      <ClearAll onClick={clearSelected} />
    </FilterGroup>
  );
}
