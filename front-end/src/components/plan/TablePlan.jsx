import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { TableInstance } from "../tables/TableInstance";
import ProgressBar from "../utils/ProgressBar";
import Spinner from "../loader";
import { usePlanItems } from "../../hooks";
import { getTaskStatusString } from "../utils/mappers/taskStatusToString";
import { ContainerCenter } from "../../styled";
import { ButtonDeletePlanItem } from "../buttons/ButtonDeletePlanItem";
import CustomSnackbar from "../snackbar/CustomSnackbar";
import { removePlanItem } from "../../services/PlanService";
import { useConfirmationModalContext } from "../utils/modalConfirmationContext";

export const TablePlan = ({ planId }) => {
  const queryClient = useQueryClient();
  const [tableData, setTableData] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const modalContext = useConfirmationModalContext();

  const {
    isLoading,
    isFetching,
    error,
    data: planItems,
    refetch,
  } = usePlanItems(planId);

  useEffect(() => {
    setTableData(planItems);
  }, [planItems]);

  useEffect(() => {
    queryClient.invalidateQueries(["planItems", planId]);
  }, [planId, queryClient]);

  const tableColumns = [
    {
      Header: "Nazwa pozycji planu",
      accessor: "planItemTitle",
    },
    {
      Header: "Status zadania",
      accessor: "taskStatus",
      Cell: (props) => getTaskStatusString(props.row.original.taskStatus),
    },
    {
      Header: "Stopień wykonania zadania",
      accessor: "percentageDone",
      style: {
        padding: "4px",
      },
      Cell: (props) => <ProgressBar value={props.row.values.percentageDone} />,
    },
    {
      Header: "Usuń",
      style: {
        width: 0,
      },
      Cell: (props) => (
        <ButtonDeletePlanItem
          w={100}
          variant="outline-danger"
          onClick={() =>
            removeSelectedPlanItem(props.cell.row.original.planItemId)
          }
          disabled={props.row.original.taskStatus !== "NOT_STARTED"}
        >
          Usuń
        </ButtonDeletePlanItem>
      ),
    },
  ];

  const mutationRemovePlanItem = useMutation(
    (planItemId) => {
      return removePlanItem(planItemId);
    },
    {
      onSuccess: (data) => {
        if (data) {
          setSnackbarMessage("Pozycja planu zostła usunięta pomyślnie");
          setSeverity("success");
          queryClient.invalidateQueries("planSummary");
          setConfirmationOpen(true);
          refetch();
        } else {
          setSeverity("error");
          setSnackbarMessage(
            "Nie udało się usunąć pozycji planu. Sprawdź czy nie ma zadania dla podanej pozycji."
          );
          setConfirmationOpen(true);
        }
      },
    }
  );

  const removeSelectedPlanItem = async (id) => {
    modalContext.setModalTitle("Potwierdzenie");
    modalContext.setModalText("Czy na pewno chcesz usunąć pozycję z planu?");
    modalContext.setModalButtonText("Tak, potwierdź");
    const result = await modalContext.showConfirmation();
    result && mutationRemovePlanItem.mutate(id);
  };

  if (isLoading || isFetching || !tableData) {
    return (
      <ContainerCenter>
        <Spinner />
      </ContainerCenter>
    );
  }

  if (error) {
    return <div>Wystąpił błąd podczas ładowania danych.</div>;
  }

  return (
    <>
      {!!planItems && planItems.length > 0 ? (
        <TableInstance tableData={tableData} tableColumns={tableColumns} />
      ) : (
        <p>W tym planie nie ma jeszcze żadnych pozycji.</p>
      )}
      <CustomSnackbar
        severity={severity}
        message={snackbarMessage}
        isOpen={confirmationOpen}
        setIsOpen={setConfirmationOpen}
        timeout={3000}
      />
    </>
  );
};
