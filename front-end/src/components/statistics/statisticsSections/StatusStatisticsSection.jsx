import ListOfTasksStatusBarChart from "../../charts/ListOfTasksStatusBarChart";
import styled from "styled-components";
import useStatisticsStatus from "../../../hooks/useStatisticsStatus";
import { getTaskStatusString } from "../../utils/mappers/taskStatusToString";
import Spinner from "../../loader";
import { ContainerCenter } from "../../../styled";
import { useQueryClient } from "react-query";
import { useEffect } from "react";
import { SectionContainer } from "../../../styled/containers";

const ChartContainer = styled.div`
  width: 100%;
  height: 250px;
`;

const SingleTeamContainer = styled.div`
  padding: 1em 0;
`;

const TeamNameHeader = styled.h5`
  margin-bottom: 1em;
`;

export default function ProgressStatisticsSection(props) {
  const filters = {
    year: props.year,
    taskManagersIds: props.taskManagers,
    teamsIds: props.teams,
    methodologiesNames: props.methodologies,
    taskStatuses: props.taskStatuses,
    adHoc: props.adHoc,
  };

  const showOnlyAdHoc =
    filters.adHoc.length > 0 &&
    filters.adHoc.includes(true) &&
    !filters.adHoc.includes(false);
  const showOnlyPlanned =
    filters.adHoc.length > 0 &&
    filters.adHoc.includes(false) &&
    !filters.adHoc.includes(true);

  const queryClient = useQueryClient();
  const { isLoading, error, data } = useStatisticsStatus(
    ...Object.values(filters)
  );

  useEffect(() => {
    queryClient.invalidateQueries("statistics", "status");
  }, [props, queryClient]);

  const mapDataToChartData = (singleTeamData) => {
    const results = [];
    for (const [key, value] of Object.entries(singleTeamData)) {
      results.push({ key: getTaskStatusString(key), value: value });
    }
    return results;
  };

  const anyTasksPresent = (tasks) => {
    let someTaskPresent = false;
    for (const [key, value] of Object.entries(tasks)) {
      if (value > 0) {
        someTaskPresent = true;
        break;
      }
    }
    return someTaskPresent;
  };

  if (isLoading) {
    return (
      <ContainerCenter>
        <Spinner />
      </ContainerCenter>
    );
  }

  return (
    <>
      {!!data ? (
        data.statistics.map((stats) => (
          <SectionContainer>
            <SingleTeamContainer>
              <TeamNameHeader>
                Zespół:{" "}
                <b>
                  {stats.teamInfo.name} ({stats.teamInfo.acronym})
                </b>
              </TeamNameHeader>

              {!showOnlyAdHoc ? <h6>Zadania planowe</h6> : null}
              {!showOnlyAdHoc ? (
                !!anyTasksPresent(stats.tasks.planned) ? (
                  <ChartContainer numberOfTasks={stats.tasks.planned.length}>
                    <ListOfTasksStatusBarChart
                      maxValue={stats.maxPlanned}
                      data={mapDataToChartData(stats.tasks.planned)}
                    />
                  </ChartContainer>
                ) : (
                  <p>Nie znaleziono żadnych zadań planowych.</p>
                )
              ) : null}

              {!showOnlyPlanned ? <h6>Zadania doraźne</h6> : null}
              {!showOnlyPlanned ? (
                !!anyTasksPresent(stats.tasks.adHoc) ? (
                  <ChartContainer numberOfTasks={stats.tasks.adHoc.length}>
                    <ListOfTasksStatusBarChart
                      maxValue={stats.maxAdHoc}
                      data={mapDataToChartData(stats.tasks.adHoc)}
                    />
                  </ChartContainer>
                ) : (
                  <p>Nie znaleziono żadnych zadań doraźnych.</p>
                )
              ) : null}
            </SingleTeamContainer>
          </SectionContainer>
        ))
      ) : (
        <p>Nie znaleziono żadnych zadań.</p>
      )}
    </>
  );
}
