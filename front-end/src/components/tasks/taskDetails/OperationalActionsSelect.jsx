import { useEffect, useState } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { setOperationalActionsNeeded } from "../../../services/TaskService";
import SingleSelectDropdown from "../../inputs/select/singleSelect/SingleSelectDropdown";
import { getBooleanStatusString } from "../../utils/mappers/booleanStatusToString";
import InfoFlex from "../../infoList/InfoFlex";

export default function OperationalActionsSelect({
  taskId,
  operationalActionsPerformed,
  editable,
}) {
  const queryClient = useQueryClient();
  const [value, setValue] = useState(operationalActionsPerformed);

  const options = [
    {
      label: "Tak",
      value: true,
      isSelected: value === true,
    },
    {
      label: "Nie",
      value: false,
      isSelected: value === false,
    },
  ];

  const mutationSetOperationalActionsNeeded = useMutation(
    () => {
      return setOperationalActionsNeeded(taskId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["taskDetails", taskId]);
      },
    }
  );

  useEffect(() => {
    if (value && !operationalActionsPerformed) {
      mutationSetOperationalActionsNeeded.mutate();
    }
  }, [value, operationalActionsPerformed]);

  const Container = styled.div`
    display: flex;
  `;

  return (
    <Container>
      <InfoFlex
        label={
          "Czy wymagane były dodatkowe działania operacyjne po publikacji raportu wstępnego?"
        }
        value={
          editable ? (
            operationalActionsPerformed ? (
              "Tak"
            ) : (
              <SingleSelectDropdown
                options={options}
                handleSelect={setValue}
                value={value}
                selectedElement={options.find(
                  (option) => option.value === value
                )}
              />
            )
          ) : (
            getBooleanStatusString(operationalActionsPerformed)
          )
        }
      />
    </Container>
  );
}
