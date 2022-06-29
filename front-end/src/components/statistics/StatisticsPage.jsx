import {
  HeaderContainer,
  Header,
  PageContainer,
  TableViewContainer,
} from "../../styled";
import { SectionContainer } from "../../styled/containers";
import StatisticsFiltersSection from "./StatisticsFiltersSection";

export default function StatisticsPage() {
  return (
    <PageContainer>
      <TableViewContainer>
        <SectionContainer>
          <HeaderContainer>
            <Header>Statystyki</Header>
          </HeaderContainer>
        </SectionContainer>
        <StatisticsFiltersSection />
      </TableViewContainer>
    </PageContainer>
  );
}
