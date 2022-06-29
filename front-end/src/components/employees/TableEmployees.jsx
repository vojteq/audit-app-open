import { useEffect, useState } from "react";
import { TableInstance } from "../tables/TableInstance";
import Spinner from "../loader";
import { ButtonPenIcon } from "../buttons/iconButtons/ButtonPenIcon";
import { getRoleString } from "../utils/mappers/roleEnumToString";
import useEmployees from "../../hooks/useEmployees";
import { ContainerCenter } from "../../styled";
import { Link } from "react-router-dom";

export const TableEmployees = () => {
  const [tableData, setTableData] = useState(null);

  const { isLoading, error, data: employees } = useEmployees();

  useEffect(() => {
    setTableData(employees);
  }, [employees]);

  if (!!tableData) {
    tableData.forEach((employee) => {
      employee.roleString = getRoleString(employee.role);
      employee.activeString = employee.active ? "Aktywny" : "Nieaktywny";
    });
  }

  const tableColumns = [
    {
      Header: "Imię",
      accessor: "firstName",
    },
    {
      Header: "Nazwisko",
      accessor: "lastName",
    },
    {
      Header: "Adres e-mail",
      accessor: "email",
    },
    {
      Header: "Status",
      accessor: "activeString",
    },
    {
      Header: "Rola",
      accessor: "roleString",
    },
    {
      Header: "Edycja",
      style: {
        width: 0,
      },
      Cell: (props) => (
        <Link to={`/pracownicy/edycja/${props.row.original.id}`}>
          <ButtonPenIcon variant="outline-secondary">Edytuj</ButtonPenIcon>
        </Link>
      ),
    },
  ];

  if (isLoading || !tableData) {
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
    <TableInstance
      tableId="employeesTable"
      tableRowName="employeesTableRow"
      tableData={tableData}
      tableColumns={tableColumns}
    />
  );
};
