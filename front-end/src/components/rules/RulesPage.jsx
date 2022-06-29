import {
  Header,
  HeaderContainer,
  PageContainer,
  TableViewContainer,
} from "../../styled";
import { SectionContainer } from "../../styled/containers";
import RulesList from "./RulesList";

export default function RulesPage() {
  return (
    <PageContainer>
      <TableViewContainer>
        <SectionContainer>
          <HeaderContainer>
            <Header>Zasady i założenia</Header>
          </HeaderContainer>
        </SectionContainer>
        <SectionContainer>
          <RulesList />
        </SectionContainer>
      </TableViewContainer>
    </PageContainer>
  );
}
