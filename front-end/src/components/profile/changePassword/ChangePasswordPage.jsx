import {
  Header,
  FormHeaderContainer,
  PageContainer,
  FormViewContainer,
} from "../../../styled";
import { SectionContainer } from "../../../styled/containers";
import ChangePasswordForm from "./ChangePasswordForm";

export default function ChangePasswordPage() {
  return (
    <PageContainer>
      <FormViewContainer>
        <SectionContainer>
          <FormHeaderContainer>
            <Header>Zmień hasło</Header>
          </FormHeaderContainer>
          <ChangePasswordForm />
        </SectionContainer>
      </FormViewContainer>
    </PageContainer>
  );
}
