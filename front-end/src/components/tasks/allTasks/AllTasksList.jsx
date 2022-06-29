import { useState, useMemo } from "react";
import {
  Header,
  HeaderContainer,
  PageContainer,
  TableViewContainer,
  ContainerCenter,
  ButtonsContainer,
} from "../../../styled";
import Spinner from "../../loader";
import { useEffect } from "react";
import ProgressBar from "../../utils/ProgressBar";
import ExpandableTable from "./expandableTable/ExpandableTable";
import useAllTasks from "../../../hooks/useAllTasks";
import { Link } from "react-router-dom";
import { LinkButton } from "../../buttons/LinkButton";
import { useQueryClient } from "react-query";
import { getTaskStatusString } from "../../utils/mappers/taskStatusToString";
import TeamsFilter from "../../filters/TeamsFilter";
import MethodologiesFilter from "../../filters/MethodologiesFilter";
import useMethodologies from "../../../hooks/useMethodologies";
import useAccessedTeams from "../../../hooks/useAccessedTeams";
import useEmployees from "../../../hooks/useEmployees";
import TaskManagersFilter from "../../filters/TaskManagersFilter";
import { FiltersSection } from "../../filters/FiltersSection";
import TaskStatusesFilter from "../../filters/TaskStatusesFilter";
import { taskStatuses } from "../../utils/enums/taskStatuses";
import { FiltersRow } from "../../filters/FiltersRow";
import AdHocFilter from "../../filters/AdHocFilter";
import { taskTypesAdHoc } from "../../utils/enums/taskTypesAdHoc";
import YearFilter from "../../filters/YearFilter";
import { SectionContainer, TableContainer } from "../../../styled/containers";

export default function AllTasksList() {
  const queryClient = useQueryClient();

  const [tasks, setTasks] = useState([]);
  const [year, setYear] = useState(Number(new Date().getFullYear()));

  const thisYear = new Date().getFullYear();
  const yearsToShow = [
    { value: thisYear + 1, label: thisYear + 1 },
    { value: thisYear, label: thisYear },
    { value: thisYear - 1, label: thisYear - 1 },
    { value: thisYear - 2, label: thisYear - 2 },
    { value: thisYear - 3, label: thisYear - 3 },
    { value: thisYear - 4, label: thisYear - 4 },
  ];

  //filters
  const [selectedTaskManagers, setSelectedTaskManagers] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedMethodologies, setSelectedMethodologies] = useState([]);
  const [selectedTaskStatuses, setSelectedTaskStatuses] = useState([]);
  const [selectedAdHoc, setSelectedAdHoc] = useState([]);
  const clearAllFilters = () => {
    setSelectedTaskManagers([]);
    setSelectedTeams([]);
    setSelectedMethodologies([]);
    setSelectedTaskStatuses([]);
    setSelectedAdHoc([]);
  };
  const [filtersSectionVisible, setFiltersSectionVisible] = useState(false);
  const toggleFiltersSectionVisibility = () => {
    setFiltersSectionVisible(!filtersSectionVisible);
  };
  //

  const { isLoading, isFetching, error, data } = useAllTasks(
    year,
    selectedTaskManagers,
    selectedTeams,
    selectedMethodologies,
    selectedTaskStatuses,
    selectedAdHoc
  );

  const {
    isLoading: isLoadingEmployees,
    error: errorEmployees,
    data: employees,
  } = useEmployees();
  const {
    isLoading: isLoadingTeams,
    error: errorTeams,
    data: teams,
  } = useAccessedTeams();
  const {
    isLoading: isLoadingMethodologies,
    error: errorMethodologies,
    data: methodologies,
  } = useMethodologies();

  useEffect(() => {
    setTasks(data?.allTasks);
  }, [data]);

  useEffect(() => {
    queryClient.invalidateQueries(["allTasks"]);
  }, [
    year,
    selectedTaskManagers,
    selectedTeams,
    selectedMethodologies,
    selectedTaskStatuses,
    selectedAdHoc,
    queryClient,
  ]);

  const tableColumns = useMemo(
    () => [
      {
        Header: "Temat zadania",
        accessor: "topic",
        style: {
          maxWidth: 300,
        },
      },
      {
        Header: "Numer WPZ",
        accessor: "wpzId",
      },
      {
        Header: "Kierownik zadania",
        accessor: "taskManager",
      },
      {
        Header: "Data rozpoczęcia",
        accessor: "startDate",
        Cell: (props) =>
          !!props.row.original.startDate ? props.row.original.startDate : "---",
      },
      {
        Header: "Planowana data zakończenia",
        accessor: "plannedFinishedDate",
        Cell: (props) =>
          !!props.row.original.plannedFinishedDate
            ? props.row.original.plannedFinishedDate
            : "---",
        style: {
          width: 160,
        },
      },
      {
        Header: "Status zadania",
        accessor: "taskStatus",
        Cell: (props) => getTaskStatusString(props.row.original.taskStatus),
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
        Header: "Opis",
        accessor: "description",
      },
      {
        Header: "Szczegóły",
        accessor: "",
        Cell: (props) => (
          <Link to={`/zadania/${props.data[props.row.index].id}`}>
            <LinkButton>Szczegóły zadania</LinkButton>
          </Link>
        ),
        style: {
          width: 150,
        },
      },
    ],
    []
  );

  if (error) {
    return (
      <PageContainer>
        <TableViewContainer>
          <SectionContainer>
            <HeaderContainer>
              <Header>Wszystkie zadania</Header>
            </HeaderContainer>
            <div>Wystąpił błąd podczas ładowania danych.</div>
          </SectionContainer>
        </TableViewContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <TableViewContainer>
        <SectionContainer>
          <HeaderContainer>
            <Header id="allTasksHeader">Wszystkie zadania</Header>
          </HeaderContainer>
        </SectionContainer>
        <SectionContainer>
          <ButtonsContainer>
            <LinkButton
              variant="primary"
              mr
              lg
              onClick={toggleFiltersSectionVisibility}
            >
              {filtersSectionVisible ? "Ukryj filtry" : "Pokaż filtry"}
            </LinkButton>
            <LinkButton variant="secondary" lg onClick={clearAllFilters}>
              Wyczyść filtry
            </LinkButton>
          </ButtonsContainer>

          {/* filters */}
          <FiltersSection visible={filtersSectionVisible}>
            <FiltersRow>
              <YearFilter
                options={yearsToShow}
                selected={year}
                setSelected={setYear}
              />
            </FiltersRow>
            <FiltersRow>
              {isLoadingEmployees ||
              !employees ||
              employees.length === 0 ? null : (
                <TaskManagersFilter
                  data={employees}
                  selected={selectedTaskManagers}
                  setSelected={setSelectedTaskManagers}
                />
              )}
              {isLoadingMethodologies ||
              !methodologies ||
              methodologies.length === 0 ? null : (
                <MethodologiesFilter
                  data={methodologies}
                  selected={selectedMethodologies}
                  setSelected={setSelectedMethodologies}
                />
              )}
              <AdHocFilter
                data={taskTypesAdHoc}
                selected={selectedAdHoc}
                setSelected={setSelectedAdHoc}
              />
            </FiltersRow>
            {isLoadingTeams || !teams || teams.length === 0 ? null : (
              <FiltersRow>
                <TeamsFilter
                  teams={teams}
                  selectedTeams={selectedTeams}
                  setSelectedTeams={setSelectedTeams}
                />
              </FiltersRow>
            )}
            <FiltersRow>
              <TaskStatusesFilter
                data={taskStatuses}
                selected={selectedTaskStatuses}
                setSelected={setSelectedTaskStatuses}
              />
            </FiltersRow>
          </FiltersSection>
          {/*  */}
        </SectionContainer>

        <TableContainer>
          {isLoading || isFetching ? (
            <ContainerCenter>
              <Spinner />
            </ContainerCenter>
          ) : !!tasks && tasks.length > 0 ? (
            <ExpandableTable
              tableId="allTasksTable"
              tableRowName="allTasksTableRow"
              tableData={tasks}
              tableColumns={tableColumns}
            />
          ) : (
            <h6>Nie znaleziono żadnych zadań.</h6>
          )}
        </TableContainer>
      </TableViewContainer>
    </PageContainer>
  );
}
