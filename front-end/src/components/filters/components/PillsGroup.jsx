import styled from "styled-components";
import ClearAll from "./ClearAll";
import SelectablePill from "./SelectablePill";

const Pills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;

export default function PillsGroup({ elements, handleSelect, clearSelection }) {
  return (
    <>
      {!!elements && elements.length > 0 ? (
        <Pills>
          {elements.map((element) => (
            <SelectablePill
              key={element.value}
              label={element.label}
              value={element.value}
              isSelected={element.isSelected}
              onClick={() => handleSelect(element.value)}
            />
          ))}
          <ClearAll onClick={clearSelection} />
        </Pills>
      ) : null}
    </>
  );
}
