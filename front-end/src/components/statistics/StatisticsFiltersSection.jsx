import { useState } from "react";
import {
  PageContainer,
  TableViewContainer,
  ButtonsContainer,
} from "../../styled";
import { useEffect } from "react";
import { LinkButton } from "../buttons/LinkButton";
import { useQueryClient } from "react-query";
import TeamsFilter from "../filters/TeamsFilter";
import MethodologiesFilter from "../filters/MethodologiesFilter";
import useMethodologies from "../../hooks/useMethodologies";
import useAccessedTeams from "../../hooks/useAccessedTeams";
import useEmployees from "../../hooks/useEmployees";
import TaskManagersFilter from "../filters/TaskManagersFilter";
import { FiltersSection } from "../filters/FiltersSection";
import TaskStatusesFilter from "../filters/TaskStatusesFilter";
import { taskStatuses } from "../utils/enums/taskStatuses";
import { FiltersRow } from "../filters/FiltersRow";
import AdHocFilter from "../filters/AdHocFilter";
import { taskTypesAdHoc } from "../utils/enums/taskTypesAdHoc";
import YearFilter from "../filters/YearFilter";
import StatisticsGraphsSection from "./StatisticsGraphsSection";
import { SectionContainer } from "../../styled/containers";

export default function StatisticsFiltersSection() {
  const queryClient = useQueryClient();

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
  const [year, setYear] = useState(Number(new Date().getFullYear()));
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

  const error = errorEmployees || errorTeams || errorMethodologies;

  if (error) {
    return (
      <PageContainer>
        <TableViewContainer>
          <div>Wystąpił błąd podczas ładowania danych.</div>
        </TableViewContainer>
      </PageContainer>
    );
  }

  return (
    <>
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

      <StatisticsGraphsSection
        year={year}
        taskManagers={selectedTaskManagers}
        teams={selectedTeams}
        methodologies={selectedMethodologies}
        taskStatuses={selectedTaskStatuses}
        adHoc={selectedAdHoc}
      />
    </>
  );
}
