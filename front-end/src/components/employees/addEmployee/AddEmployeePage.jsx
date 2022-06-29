import useCompanies from "../../../hooks/useCompanies";
import useRoles from "../../../hooks/useRoles";
import {
  ContainerCenter,
  FormViewContainer,
  Header,
  FormHeaderContainer,
  PageContainer,
} from "../../../styled";
import useTeams from "../../../hooks/useTeams";
import AddEmployeeForm from "./AddEmployeeForm";
import Spinner from "../../loader";
import { SectionContainer } from "../../../styled/containers";

export default function AddEmployeePage() {
  const {
    isLoading: isLoadingCompanies,
    isFetching: isFetchingCompanies,
    error: errorCompanies,
    data: companies,
  } = useCompanies();
  const {
    isLoading: isLoadingTeams,
    isFetching: isFetchingTeams,
    error: errorTeams,
    data: teams,
  } = useTeams();
  const {
    isLoading: isLoadingRoles,
    isFetching: isFetchingRoles,
    error: errorRoles,
    data: roles,
  } = useRoles();

  return (
    <PageContainer>
      <FormViewContainer>
        <SectionContainer>
          <FormHeaderContainer>
            <Header>Dodaj nowego pracownika</Header>
          </FormHeaderContainer>
          {isLoadingCompanies || isLoadingTeams || isLoadingRoles ? ( //TODO error handling
            <ContainerCenter>
              <Spinner />
            </ContainerCenter>
          ) : (
            <AddEmployeeForm
              companies={companies}
              teams={teams}
              roles={roles}
            />
          )}
        </SectionContainer>
      </FormViewContainer>
    </PageContainer>
  );
}
