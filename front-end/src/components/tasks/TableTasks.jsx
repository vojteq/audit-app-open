import { Link } from "react-router-dom";
import { LinkButton } from "../buttons/LinkButton";
import { TableInstance } from "../tables/TableInstance";
import Spinner from "../loader";
import ProgressBar from "../utils/ProgressBar";
import useMyTasks from "../../hooks/useMyTasks";
import { ContainerCenter } from "../../styled";
import { getTaskTypeString } from "../utils/mappers/taskTypeToString";

export default function TableTasks() {
  const { isLoading, isFetching, error, data: tasks } = useMyTasks();

  const tableColumns = [
    {
      Header: "Temat zadania",
      accessor: "topic",
      style: {
        maxWidth: 300,
      },
    },
    {
      Header: "Kierownik zadania",
      accessor: "taskManager",
    },
    {
      Header: "Data rozpoczęcia",
      accessor: "startDate",
    },
    {
      Header: "Planowana data zakończenia",
      accessor: "plannedFinishedDate",
      style: {
        width: 160,
      },
    },
    {
      Header: "Typ",
      accessor: "taskType",
      Cell: (props) => getTaskTypeString(props.value),
    },
    {
      Header: "Metodologia",
      accessor: "methodologyName",
    },
    {
      Header: "Audytowane spółki",
      accessor: "auditedCompanies",
      Cell: (props) =>
        !!props.row.values.auditedCompanies &&
        props.row.values.auditedCompanies.length > 0
          ? props.row.values.auditedCompanies
              .reduce((acc, current) => {
                return acc + current.name + "\n";
              }, "")
              .slice(0, -1)
              .split("\n")
              .map((text) => <p style={{ margin: 0 }}>{text}</p>)
          : "---",
    },
    {
      Header: "Stopień realizacji",
      accessor: "percentageDone",
      style: {
        padding: "4px",
      },
      Cell: (props) => (
        <ProgressBar
          value={
            !!props.row.values.percentageDone
              ? props.row.values.percentageDone
              : 0
          }
        />
      ),
    },
    {
      Header: "Szczegóły",
      accessor: "",
      Cell: (props) => (
        <Link to={`/zadania/${props.data[props.row.index].id}`}>
          <LinkButton>Szczegóły zadania</LinkButton>
        </Link>
      ),
    },
  ];

  if (isLoading || isFetching) {
    return (
      <ContainerCenter>
        <Spinner />
      </ContainerCenter>
    );
  }

  if (error) {
    return <div>Wystąpił błąd podczas ładowania danych.</div>; //TODO: error snackbar
  }

  return (
    <>
      {!tasks || !tasks.length ? (
        <h6>Nie znaleziono żadnych zadań.</h6>
      ) : (
        <TableInstance
          tableData={tasks.filter((t) => t.taskStatus !== "MOVED")}
          tableColumns={tableColumns}
        />
      )}
    </>
  );
}
