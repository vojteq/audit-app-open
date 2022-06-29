import { ResponsivePie } from "@nivo/pie";

export default function PieChart({ data, ...props }) {
  const theme = {
    labels: {
      text: {
        fontSize: "1rem",
      },
    },
  };

  return (
    <ResponsivePie
      theme={theme}
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={props.innerRadius}
      padAngle={0}
      cornerRadius={0}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor="white"
      enableArcLinkLabels={props.enableArcLinkLabels}
      isInteractive={false}
      {...props}
    />
  );
}
