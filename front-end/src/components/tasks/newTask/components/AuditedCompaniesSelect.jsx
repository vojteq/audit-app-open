import { useEffect, useState } from "react";
import ClearAll from "../../../filters/components/ClearAll";
import MultipleSelectDropdownWithSearchExpanded from "../../../inputs/select/multipleSelect/MultipleSelectDropdownWithSearchExpanded";

export default function AuditedCompaniesSelect({
  options,
  selected,
  setSelected,
  fullWidth,
}) {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (!!options && options.length > 0) {
      setElements(
        options.map((el) => ({
          value: el.id,
          label: el.name,
          isSelected: !!selected ? selected.includes(el.id) : false,
        }))
      );
    }
  }, [options, selected]);

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
    <>
      <MultipleSelectDropdownWithSearchExpanded
        placeholder="Szukaj..."
        elements={elements}
        handleSelect={handleSelect}
        clearSelection={clearSelected}
        fullWidth
        alwaysExpanded
      />
      {(!!selected && selected.length !== 0) || (
        <p className="m-0 mt-2 mb-1" style={{ color: "red" }}>
          Musisz wybrać przynajmniej jedną spółkę
        </p>
      )}
      <ClearAll onClick={clearSelected} />
    </>
  );
}
