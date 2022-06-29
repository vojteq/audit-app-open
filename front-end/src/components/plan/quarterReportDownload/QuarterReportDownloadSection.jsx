import { useState } from "react";
import { Button } from "../../buttons/Button";
import SingleSelectDropdown from "../../inputs/select/singleSelect/SingleSelectDropdown";
import styled from "styled-components";
import Spinner from "../../loader";
import useDownloadQuarterStats from "../../../hooks/useDownloadQuarterStats";
import { FormGroup } from "../../../styled";
import FormInputErrorMessage from "../../utils/FormInputErrorMessage";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-conent: flex-start;
  height: 100%;
  width: 100%;
`;

export default function QuarterReportDownloadSection({ planId, year }) {
  const [selected, setSelected] = useState(1);

  const options = [];
  const today = new Date();
  const thisQuarter = Math.floor((today.getMonth() + 3) / 3);
  const maxQuarter = Number(year) < today.getFullYear() ? 4 : thisQuarter - 1;
  for (let i = 1; i <= maxQuarter; i++) {
    options.push({ label: `${i}`, value: i });
  }

  const handleSelect = (value) => {
    setSelected(value);
  };

  const clearSelected = () => setSelected(null);

  const {
    isLoading: isLoadingQuearterStats,
    isFetching: isFetchingQuearterStats,
    error: errorQuearterStats,
    refetch,
  } = useDownloadQuarterStats(planId, selected);

  const handleSubmit = async (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <Container>
      <h3>Pobierz raport kwartalny dla tego planu</h3>
      {year > today.getFullYear() ||
      (year === today.getFullYear() && thisQuarter === 1) ? (
        "Brak raportów dla tego planu."
      ) : isLoadingQuearterStats || isFetchingQuearterStats ? (
        <Container>
          <Spinner />
        </Container>
      ) : (
        <form onSubmit={handleSubmit}>
          <>
            <FormGroup>
              <label>Kwartał</label>
              <SingleSelectDropdown
                options={options}
                handleSelect={handleSelect}
                clearSelection={clearSelected}
                value={selected}
                selectedElement={
                  options.find((option) => option.value === selected) || null
                }
                style={{ width: "100px" }}
              />
            </FormGroup>
            <Button type="submit">Pobierz raport</Button>
          </>
        </form>
      )}
      {!!errorQuearterStats ? (
        <FormInputErrorMessage errorMessage="Wystąpił błąd podczas pobierania raportu." />
      ) : null}
    </Container>
  );
}
