import {
  FormHeaderContainer,
  FormViewContainer,
  Header,
  PageContainer,
} from "../../../styled";
import { SectionContainer } from "../../../styled/containers";
import AddCompanyForm from "./AddCompanyForm";

export default function AddCompanyPage() {
  return (
    <PageContainer>
      <FormViewContainer>
        <SectionContainer>
          <FormHeaderContainer>
            <Header>Dodaj nową spółkę</Header>
          </FormHeaderContainer>
          <AddCompanyForm />
        </SectionContainer>
      </FormViewContainer>
    </PageContainer>
  );
}
