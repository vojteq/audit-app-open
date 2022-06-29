import {
  FormHeaderContainer,
  FormViewContainer,
  Header,
  PageContainer,
} from "../../../styled";
import { SectionContainer } from "../../../styled/containers";
import AddTeamForm from "./AddTeamForm";

export default function AddTeamPage() {
  return (
    <PageContainer>
      <FormViewContainer>
        <SectionContainer>
          <FormHeaderContainer>
            <Header>Dodaj nowy zespół</Header>
          </FormHeaderContainer>
          <AddTeamForm />
        </SectionContainer>
      </FormViewContainer>
    </PageContainer>
  );
}
