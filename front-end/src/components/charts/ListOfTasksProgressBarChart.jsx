import { ResponsiveBar } from "@nivo/bar";
import styled from "styled-components";
import { getTaskStatusString } from "../utils/mappers/taskStatusToString";

const TooltipRow = styled.div`
  margin: 0;
`;
const TooltipRowValue = styled.span`
  font-weight: bold;
`;

export default function ListOfTasksProgressBarChart({ data, ...props }) {
  const chartData = data.map((d) => ({
    ...d,
    percentageDone: d.percentageDone === 0 ? 1 : d.percentageDone,
    percentageDoneReal: d.percentageDone === 0 ? 0 : d.percentageDone,
    cutName: d.name.slice(0, 24) + "...",
  }));

  return (
    <ResponsiveBar
      data={chartData}
      keys={["percentageDone"]}
      indexBy="cutName"
      margin={{ top: 0, right: 10, bottom: 50, left: 150 }}
      padding={0.3}
      minValue={0}
      maxValue={100}
      layout="horizontal"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={["#457b9d"]}
      label={(d) => `${d.value}%`}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      enableGridX={true}
      enableGridY={false}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Stopień wykonania",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      tooltip={(d) => {
        return (
          <div>
            <TooltipRow>
              Temat: <TooltipRowValue>{d.data.name}</TooltipRowValue>
            </TooltipRow>
            <TooltipRow>
              Stopień wykonania:{" "}
              <TooltipRowValue>
                {d.data.percentageDoneReal > 0
                  ? d.data.percentageDoneReal
                  : "0"}
                %
              </TooltipRowValue>
            </TooltipRow>
            <TooltipRow>
              Opis: <TooltipRowValue>{d.data.description}</TooltipRowValue>
            </TooltipRow>
            <TooltipRow>
              Status:{" "}
              <TooltipRowValue>
                {getTaskStatusString(d.data.status)}
              </TooltipRowValue>
            </TooltipRow>
          </div>
        );
      }}
      labelSkipWidth={100}
      labelSkipHeight={12}
      labelTextColor="#fff"
      role="application"
      ariaLabel="Bar chart"
    />
  );
}
