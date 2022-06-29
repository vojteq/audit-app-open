import { useEffect, useState } from "react";
import {
  Header,
  HeaderContainer,
  PageContainer,
  TableViewContainer,
  ContainerCenter,
} from "../../styled";
import { TableInstance } from "../tables/TableInstance";
import { Link } from "react-router-dom";
import Spinner from "../loader";
import { LinkButton } from "../buttons/LinkButton";
import useTaskRequests from "../../hooks/useTaskRequests";
import { getTaskTypeString } from "../utils/mappers/taskTypeToString";
import { getTaskRequestStatusString } from "../utils/mappers/taskRequestStatusEnumToString";
import { isTaskRequestProcessed } from "../utils/isTaskRequestProcessed";
import { SectionContainer, TableContainer } from "../../styled/containers";

export default function TaskRequestList() {
  const [requests, setRequests] = useState([]);

  const {
    isLoading,
    isFetching,
    error,
    data: apiResponseData,
  } = useTaskRequests();

  useEffect(() => {
    setRequests(apiResponseData);
  }, [apiResponseData]);

  const tableColumns = [
    {
      Header: "Temat zadania",
      accessor: "topic",
      style: {
        maxWidth: 500,
      },
    },
    {
      Header: "Osoba zgłaszająca",
      accessor: "taskManager",
      Cell: (props) => {
        return (
          <span>
            {props.value.firstName} {props.value.lastName}
          </span>
        );
      },
    },
    {
      Header: "Typ",
      accessor: "taskType",
      Cell: (props) => getTaskTypeString(props.value),
    },
    {
      Header: "Metodologia",
      accessor: "methodology.name",
    },
    {
      Header: "Audytowane spółki",
      accessor: "auditedCompanies",
      Cell: (props) =>
        props.value &&
        props.value
          .reduce((acc, current) => {
            return acc + current.name + "\n";
          }, "")
          .slice(0, -1)
          .split("\n")
          .map((text) => <p style={{ margin: 0 }}>{text}</p>),
    },
    {
      Header: "Status wniosku",
      accessor: "acceptance",
      Cell: (props) => getTaskRequestStatusString(props.value),
    },
    {
      Header: "Rozpatrywanie wniosku",
      accessor: "",
      Cell: (props) =>
        isTaskRequestProcessed(props.data[props.row.index].acceptance) ? (
          "Wniosek rozpatrzony"
        ) : (
          <Link to={`/wniosek/${props.data[props.row.index].id}`}>
            <LinkButton name="processRequestButton">
              Rozpatrz wniosek
            </LinkButton>
          </Link>
        ),
    },
  ];

  return (
    <PageContainer>
      <TableViewContainer>
        <SectionContainer>
          <HeaderContainer>
            <Header id="allTaskRequests">Wszystkie wnioski</Header>
          </HeaderContainer>
        </SectionContainer>
        <TableContainer>
          {!!error ? (
            <div>Wystąpił błąd podczas ładowania danych.</div>
          ) : isLoading || isFetching ? (
            <ContainerCenter>
              <Spinner />
            </ContainerCenter>
          ) : !requests || requests?.length === 0 ? (
            <h6>Nie znaleziono żadnych wniosków do rozpatrzenia.</h6>
          ) : (
            <TableInstance
              tableId="allRequestsTable"
              tableRowName="allRequestsTableRow"
              tableData={requests}
              tableColumns={tableColumns}
            />
          )}
        </TableContainer>
      </TableViewContainer>
    </PageContainer>
  );
}
