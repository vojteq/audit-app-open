import { useMemo } from "react";
import { TableInstance } from "../../tables/TableInstance";

export default function TableTasksEverything({ tasks }) {
  const tableColumns = useMemo(
    () => [
      {
        Header: "Temat zadania",
        accessor: "topic",
      },
      {
        Header: "Nazwa zespołu",
        accessor: "teamName",
      },
      {
        Header: "Opis",
        accessor: "description",
      },
    ],
    []
  );

  return (
    <>
      {!tasks || !tasks.length ? (
        <h6>Nie znaleziono żadnych zadań.</h6>
      ) : (
        <TableInstance tableData={tasks} tableColumns={tableColumns} />
      )}
    </>
  );
}
