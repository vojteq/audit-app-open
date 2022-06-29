import { useState } from "react";
import { SectionContainer } from "../../styled/containers";
import { Tabs } from "../tabs";
import TabComponent from "../tabs/TabComponent";
import EndangeredStatisticsSection from "./statisticsSections/EndangeredStatisticsSection";
import ProgressStatisticsSection from "./statisticsSections/ProgressStatisticsSection";
import StatusStatisticsSection from "./statisticsSections/StatusStatisticsSection";

export default function StatisticsGraphsSection({ ...props }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const tabs = [
    {
      index: 0,
      label: "Postęp zadań",
      path: "/postep-zadan",
    },
    {
      index: 1,
      label: "Status zadań",
      path: "/status-zadan",
    },
    {
      index: 2,
      label: "Zadania zagrożone niedotrzymaniem terminu",
      path: "/zadania-z-zagrozonym-terminem",
    },
  ];

  return (
    <>
      <SectionContainer>
        <Tabs
          tabs={tabs}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </SectionContainer>
      <TabComponent index={0} currentIndex={currentIndex}>
        <ProgressStatisticsSection {...props} />
      </TabComponent>
      <TabComponent index={1} currentIndex={currentIndex}>
        <StatusStatisticsSection {...props} />
      </TabComponent>
      <TabComponent index={2} currentIndex={currentIndex}>
        <EndangeredStatisticsSection {...props} />
      </TabComponent>
    </>
  );
}
