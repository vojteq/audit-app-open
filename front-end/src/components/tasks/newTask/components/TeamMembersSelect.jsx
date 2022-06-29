import { useEffect, useState } from "react";
import ClearAll from "../../../filters/components/ClearAll";
import MultipleSelectDropdownWithSearchExpanded from "../../../inputs/select/multipleSelect/MultipleSelectDropdownWithSearchExpanded";

export default function TeamMembersSelect({
  options,
  selected,
  setSelected,
  fullWidth,
  currentTaskManagerId,
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

  //Remove team member id from selected team members if employee with this id
  //has been selected to be a task manager, in order to prevent this employee
  //from being both team member and task manager at the same time
  useEffect(() => {
    if (
      !!selected.find((teamMemberId) => teamMemberId === currentTaskManagerId)
    ) {
      setSelected(
        selected.filter((memberId) => memberId !== currentTaskManagerId)
      );
    }
  }, [currentTaskManagerId, selected, setSelected]);

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
        fullWidth={fullWidth}
        alwaysExpanded
      />
      <ClearAll onClick={clearSelected} />
    </>
  );
}
