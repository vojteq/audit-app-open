import { useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useQueryClient } from "react-query";
import Spinner from "../loader";
import { usePlanStatistics } from "../../hooks";

export default function PlanProgressChartGenerator({ planId }) {
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: planStatistics,
    isFetching,
  } = usePlanStatistics(planId);

  useEffect(() => {
    queryClient.invalidateQueries(["planStatistics", planId]);
  }, [planId, queryClient]);

  return (
    <>
      {isLoading || isFetching || !planStatistics ? (
        <Spinner />
      ) : (
        <div style={{ margin: "2em 0" }}>
          <CircularProgressbar
            value={planStatistics.percentageDone}
            text={`${planStatistics.percentageDone}%`}
            styles={buildStyles({
              strokeLinecap: "butt",
              pathColor: "#009ee0",
              textColor: "#009ee0",
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
          />
        </div>
      )}
    </>
  );
}
