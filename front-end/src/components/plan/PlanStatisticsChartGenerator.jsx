import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { usePlanStatistics } from "../../hooks";
import PieChart from "../charts/PieChart";
import Spinner from "../loader";
import { theme } from "../../layout/theme/theme";

export default function PlanStatisticsChartGenerator({ planId }) {
  const queryClient = useQueryClient();

  const colors = {
    Nierozpoczęte: theme.colors.red,
    "W trakcie realizacji": theme.colors.orange,
    Zakończone: theme.colors.green,
    Anulowane: theme.colors.black,
    Przeniesione: theme.colors.blue,
    Zawieszone: theme.colors.gray,
  };
  const getColor = (fragment) => colors[fragment.id];

  const chartData = [
    {
      fetchedStatus: "notStarted",
      id: "Nierozpoczęte",
      label: "Nierozpoczęte",
      value: 0,
    },
    {
      fetchedStatus: "inProgress",
      id: "W trakcie realizacji",
      label: "W trakcie realizacji",
      value: 0,
    },
    {
      fetchedStatus: "finished",
      id: "Zakończone",
      label: "Zakończone",
      value: 0,
    },
    {
      fetchedStatus: "cancelled",
      id: "Anulowane",
      label: "Anulowane",
      value: 0,
    },
    {
      fetchedStatus: "moved",
      id: "Przeniesione",
      label: "Przeniesione",
      value: 0,
    },
    {
      fetchedStatus: "suspended",
      id: "Zawieszone",
      label: "Zawieszone",
      value: 0,
    },
  ];

  const {
    isLoading,
    isFetching,
    error,
    data: planStatistics,
  } = usePlanStatistics(planId);

  useEffect(() => {
    queryClient.invalidateQueries(["planStatistics", planId]);
  }, [planId, queryClient]);

  if (planStatistics) {
    for (let x = 0; x < chartData.length; x++) {
      chartData[x].value = planStatistics[chartData[x].fetchedStatus];
    }
  }

  return (
    <>
      {isLoading || isFetching ? (
        <Spinner />
      ) : planStatistics.total === 0 ? (
        <p style={{ alignSelf: "center" }}>
          W tym planie nie ma jeszcze żadnych zadań.
        </p>
      ) : (
        <PieChart colors={getColor} data={chartData} innerRadius={0.5} />
      )}
    </>
  );
}
