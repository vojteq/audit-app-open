import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import useCompaniesWithDeletionInfo from "../../hooks/useCompaniesWithDeletionInfo";
import { ContainerCenter } from "../../styled";
import { ButtonDeleteTeamOrCompany } from "../buttons/ButtonDeleteTeamOrCompany";
import { deleteCompany } from "../../services/CompanyService";
import Spinner from "../loader";
import { TableInstance } from "../tables/TableInstance";
import { useConfirmationModalContext } from "../utils/modalConfirmationContext";
import CustomSnackbar from "../snackbar/CustomSnackbar";

export const TableCompanies = () => {
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
    data: companies,
  } = useCompaniesWithDeletionInfo();

  console.log(companies);

  useEffect(() => {
    setTableData(companies);
  }, [companies]);

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
          onClick={() => removeSelectedCompany(props.cell.row.original.id)}
          disabled={!props.row.original.canBeDeleted}
        >
          Usuń
        </ButtonDeleteTeamOrCompany>
      ),
    },
  ];

  const mutationRemoveCompany = useMutation(
    (companyId) => {
      return deleteCompany(companyId);
    },
    {
      onSuccess: (data) => {
        if (data) {
          setSnackbarMessage("Spółka została usunięta pomyślnie");
          setSeverity("success");
          setConfirmationOpen(true);
          queryClient.invalidateQueries("companiesWithDeletionInfo");
        } else {
          setSeverity("error");
          setSnackbarMessage("Nie udało się usunąć spółki.");
          setConfirmationOpen(true);
        }
      },
    }
  );

  const removeSelectedCompany = async (id) => {
    modalContext.setModalTitle("Potwierdzenie");
    modalContext.setModalText("Czy na pewno chcesz usunąć spółkę?");
    modalContext.setModalButtonText("Tak, usuń spółkę");
    const result = await modalContext.showConfirmation();
    result && mutationRemoveCompany.mutate(id);
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
      {mutationRemoveCompany.isLoading ? (
        <ContainerCenter>
          <Spinner />
        </ContainerCenter>
      ) : (
        <TableInstance
          tableId="companiesTable"
          tableRowName="companiesTableRow"
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
