import styled from "styled-components";
import { useQueryClient } from "react-query";
import useStatisticsEndangered from "../../../hooks/useStatisticsEndangered";
import { useEffect, useState } from "react";
import { ContainerCenter } from "../../../styled";
import Spinner from "../../loader";
import ListOfTasksEndangeredBarChart from "../../charts/ListOfTasksEndangeredChart";
import { SectionContainer } from "../../../styled/containers";
import MaxDaysSelect from "../components/MaxDaysSelect";

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

export default function EndangeredStatisticsSection(props) {
  const maxDaysOptions = Array.from(Array(31).keys()).map((el) => ({
    label: el,
    value: el,
  }));
  const [maxDays, setMaxDays] = useState(20);
  const [filters, setFilters] = useState({
    year: props.year,
    taskManagersIds: props.taskManagers,
    teamsIds: props.teams,
    methodologiesNames: props.methodologies,
    taskStatuses: props.taskStatuses,
    adHoc: props.adHoc,
    maxDays: maxDays,
  });

  const queryClient = useQueryClient();
  const { isLoading, error, data } = useStatisticsEndangered(
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
  }, [props, queryClient, maxDays]);

  useEffect(() => {
    setFilters({
      year: props.year,
      taskManagersIds: props.taskManagers,
      teamsIds: props.teams,
      methodologiesNames: props.methodologies,
      taskStatuses: props.taskStatuses,
      adHoc: props.adHoc,
      maxDays: maxDays,
    });
  }, [maxDays, props]);

  if (isLoading) {
    return (
      <ContainerCenter>
        <Spinner />
      </ContainerCenter>
    );
  }

  return (
    <>
      <SectionContainer>
        <MaxDaysSelect
          options={maxDaysOptions}
          selected={maxDays}
          setSelected={setMaxDays}
        />
      </SectionContainer>
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
                      <ListOfTasksEndangeredBarChart
                        data={stats.tasks.planned}
                      />
                    </ChartContainer>
                  ) : (
                    <p>Nie znaleziono żadnych zadań planowych.</p>
                  )
                ) : null}

                {!showOnlyPlanned ? <h6>Zadania doraźne</h6> : null}
                {!showOnlyPlanned ? (
                  stats.tasks.adHoc.length > 0 ? (
                    <ChartContainer numberOfTasks={stats.tasks.adHoc.length}>
                      <ListOfTasksEndangeredBarChart data={stats.tasks.adHoc} />
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
