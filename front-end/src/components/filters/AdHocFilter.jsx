import { useEffect, useState } from "react";
import FilterGroup from "./components/FilterGroup";
import PillsGroup from "./components/PillsGroup";

export default function AdHocFilter({ data, selected, setSelected }) {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (!!data && data.length > 0) {
      setElements(
        data.map((el) => ({
          value: el.value,
          label: `${el.label}`,
          isSelected: !!selected ? selected.includes(el.value) : false,
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
    <FilterGroup header="Rodzaje zadań">
      <PillsGroup
        elements={elements}
        handleSelect={handleSelect}
        clearSelection={clearSelected}
      />
    </FilterGroup>
  );
}
