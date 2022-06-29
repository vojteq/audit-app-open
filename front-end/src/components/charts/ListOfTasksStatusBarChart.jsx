import { ResponsiveBar } from "@nivo/bar";
import styled from "styled-components";

const TooltipRow = styled.div`
  margin: 0;
`;
const TooltipRowValue = styled.span`
  font-weight: bold;
`;

export default function ListOfTasksProgressBarChart({
  data,
  maxValue = 10,
  ...props
}) {
  return (
    <ResponsiveBar
      data={data}
      keys={["value"]}
      indexBy="key"
      margin={{ top: 20, right: 10, bottom: 50, left: 150 }}
      padding={0.3}
      minValue={0}
      maxValue={maxValue}
      layout="vertical"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={["#457b9d"]}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      enableGridX={false}
      enableGridY={true}
      axisLeft={{
        tickValues: [...Array.from(Array(maxValue + 1).keys())],
        legend: "Liczba zadań",
        legendPosition: "middle",
        legendOffset: -35,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Status",
        legendPosition: "middle",
        legendOffset: 40,
      }}
      tooltip={(d) => {
        return (
          <div>
            <TooltipRow>
              Liczba zadań: <TooltipRowValue>{d.value}</TooltipRowValue>
            </TooltipRow>
          </div>
        );
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor="#fff"
      role="application"
      ariaLabel="Bar chart"
    />
  );
}
