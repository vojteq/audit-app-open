import { ContainerCenter } from "../../../styled";
import { TableInstance } from "../../tables/TableInstance";
import Spinner from "../../loader";
import { useUserTaskRequests } from "../../../hooks";
import { getTaskTypeString } from "../../utils/mappers/taskTypeToString";
import { getTaskTypeAdHocString } from "../../utils/mappers/taskTypeAdHocToString";
import { getTaskRequestStatusString } from "../../utils/mappers/taskRequestStatusEnumToString";

export default function TableUserTaskRequests() {
  const {
    isLoading,
    isFetching,
    error,
    data: userTaskRequests,
  } = useUserTaskRequests();

  const tableColumns = [
    {
      Header: "Temat zadania",
      accessor: "topic",
      style: {
        maxWidth: 600,
      },
    },
    {
      Header: "Typ zadania",
      accessor: "taskType",
      Cell: (props) => getTaskTypeString(props.value),
    },
    {
      Header: "Metodologia",
      accessor: "methodology.name",
    },
    {
      Header: "Rodzaj zadania",
      accessor: "adHoc",
      Cell: (props) => getTaskTypeAdHocString(props.value),
    },
    {
      Header: "Audytowane spółki",
      accessor: "auditedCompanies",
      Cell: (props) =>
        !!props.value
          ? props.value
              .reduce((acc, current) => {
                return acc + current.name + "\n";
              }, "")
              .slice(0, -1)
              .split("\n")
              .map((text) => <p style={{ margin: 0 }}>{text}</p>)
          : null,
    },
    {
      Header: "Status wniosku",
      accessor: "acceptance",
      Cell: (props) => getTaskRequestStatusString(props.value),
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
    return <div>Wystąpił błąd podczas ładowania danych.</div>;
  }

  return (
    <>
      {(!!userTaskRequests && userTaskRequests.length < 1) ||
      !userTaskRequests ? (
        <h6>Nie znaleziono żadnych wniosków.</h6>
      ) : (
        <TableInstance
          tableId="taskRequestsTable"
          tableRowName="taskRequestRow"
          tableData={userTaskRequests}
          tableColumns={tableColumns}
        />
      )}
    </>
  );
}
