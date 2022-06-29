import { useEffect, useState } from "react";
import FilterGroup from "./components/FilterGroup";
import PillsGroup from "./components/PillsGroup";

export default function TeamsFilter({
  teams,
  selectedTeams,
  setSelectedTeams,
}) {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (!!teams && teams.length > 0) {
      setElements(
        teams.map((team) => ({
          value: team.id,
          label: `${team.name}`,
          isSelected: !!selectedTeams ? selectedTeams.includes(team.id) : false,
        }))
      );
    }
  }, [teams, selectedTeams]);

  const handleSelect = (value) => {
    if (!selectedTeams.includes(value)) {
      setSelectedTeams([value, ...selectedTeams]);
    } else {
      let newSelectedTeams = selectedTeams;
      if (selectedTeams.length === 1) {
        newSelectedTeams = [];
      } else {
        newSelectedTeams = selectedTeams.filter((x) => x !== value);
      }
      setSelectedTeams(newSelectedTeams);
    }
  };

  const clearSelectedTeams = () => setSelectedTeams([]);

  return (
    <FilterGroup header="Zespoły">
      <PillsGroup
        elements={elements}
        handleSelect={handleSelect}
        clearSelection={clearSelectedTeams}
      />
    </FilterGroup>
  );
}
