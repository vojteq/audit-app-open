import { useEffect, useState } from "react";
import { ContainerCenter } from "../../styled";
import Spinner from "../loader";
import { TableInstance } from "../tables/TableInstance";
import useTeamsWithDeletionInfo from "../../hooks/useTeamsWithDeletionInfo";
import { useMutation, useQueryClient } from "react-query";
import { ButtonDeleteTeamOrCompany } from "../buttons/ButtonDeleteTeamOrCompany";
import { deleteTeam } from "../../services/TeamService";
import { useConfirmationModalContext } from "../utils/modalConfirmationContext";
import CustomSnackbar from "../snackbar/CustomSnackbar";

export const TableTeams = () => {
  const [tableData, setTableData] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const modalContext = useConfirmationModalContext();
  const queryClient = useQueryClient();

  const {
    isLoading,
    isFetching,
    error,
    data: teams,
  } = useTeamsWithDeletionInfo();

  useEffect(() => {
    setTableData(teams);
  }, [teams]);

  const tableColumns = [
    {
      Header: "Nazwa",
      accessor: "name",
    },
    {
      Header: "Akronim",
      accessor: "acronym",
    },
    {
      Header: "Usuń",
      style: {
        width: 0,
      },
      Cell: (props) => (
        <ButtonDeleteTeamOrCompany
          w={100}
          variant="outline-danger"
          onClick={() => removeSelectedTeam(props.cell.row.original.id)}
          disabled={!props.row.original.canBeDeleted}
        >
          Usuń
        </ButtonDeleteTeamOrCompany>
      ),
    },
  ];

  const mutationRemoveTeam = useMutation(
    (teamId) => {
      return deleteTeam(teamId);
    },
    {
      onSuccess: (data) => {
        if (data) {
          setSnackbarMessage("Zespół został usunięty pomyślnie");
          setSeverity("success");
          setConfirmationOpen(true);
          queryClient.invalidateQueries("teamsWithDeletionInfo");
        } else {
          setSeverity("error");
          setSnackbarMessage("Nie udało się usunąć zespołu.");
          setConfirmationOpen(true);
        }
      },
    }
  );

  const removeSelectedTeam = async (id) => {
    modalContext.setModalTitle("Potwierdzenie");
    modalContext.setModalText("Czy na pewno chcesz usunąć zespół?");
    modalContext.setModalButtonText("Tak, usuń zespół");
    const result = await modalContext.showConfirmation();
    result && mutationRemoveTeam.mutate(id);
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
      {mutationRemoveTeam.isLoading ? (
        <ContainerCenter>
          <Spinner />
        </ContainerCenter>
      ) : (
        <TableInstance
          tableId="teamsTable"
          tableRowName="teamsTableRow"
          tableData={tableData}
          tableColumns={tableColumns}
        />
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
