import ListOfTasksProgressBarChart from "../../charts/ListOfTasksProgressBarChart";
import styled from "styled-components";
import { useQueryClient } from "react-query";
import useStatisticsProgress from "../../../hooks/useStatisticsProgress";
import { useEffect } from "react";
import { ContainerCenter } from "../../../styled";
import Spinner from "../../loader";
import { SectionContainer } from "../../../styled/containers";

const ChartContainer = styled.div`
  width: 100%;
  ${(props) =>
    props.numberOfTasks &&
    `
  height: ${80 + props.numberOfTasks * 40}px;
  `};
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

  const queryClient = useQueryClient();
  const { isLoading, error, data } = useStatisticsProgress(
    ...Object.values(filters)
  );

  const showOnlyAdHoc =
    filters.adHoc.length > 0 &&
    filters.adHoc.includes(true) &&
    !filters.adHoc.includes(false);
  const showOnlyPlanned =
    filters.adHoc.length > 0 &&
    filters.adHoc.includes(false) &&
    !filters.adHoc.includes(true);

  useEffect(() => {
    queryClient.invalidateQueries("statistics");
  }, [props, queryClient]);

  if (isLoading) {
    return (
      <ContainerCenter>
        <Spinner />
      </ContainerCenter>
    );
  }

  return (
    <>
      {!!data
        ? data.statistics.map((stats) => (
            <SectionContainer>
              <SingleTeamContainer>
                <TeamNameHeader>
                  Zespół:{" "}
                  <b>
                    {stats.teamInfoDTO.name} ({stats.teamInfoDTO.acronym})
                  </b>
                </TeamNameHeader>
                {!showOnlyAdHoc ? <h6>Zadania planowe</h6> : null}
                {!showOnlyAdHoc ? (
                  stats.tasks.planned.length > 0 ? (
                    <ChartContainer numberOfTasks={stats.tasks.planned.length}>
                      <ListOfTasksProgressBarChart data={stats.tasks.planned} />
                    </ChartContainer>
                  ) : (
                    <p>Nie znaleziono żadnych zadań planowych.</p>
                  )
                ) : null}

                {!showOnlyPlanned ? <h6>Zadania doraźne</h6> : null}
                {!showOnlyPlanned ? (
                  stats.tasks.adHoc.length > 0 ? (
                    <ChartContainer numberOfTasks={stats.tasks.adHoc.length}>
                      <ListOfTasksProgressBarChart data={stats.tasks.adHoc} />
                    </ChartContainer>
                  ) : (
                    <p>Nie znaleziono żadnych zadań doraźnych.</p>
                  )
                ) : null}
              </SingleTeamContainer>
            </SectionContainer>
          ))
        : null}
    </>
  );
}
