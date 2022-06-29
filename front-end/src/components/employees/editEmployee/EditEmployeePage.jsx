import useRoles from "../../../hooks/useRoles";
import {
  ContainerCenter,
  FormViewContainer,
  Header,
  FormHeaderContainer,
  PageContainer,
} from "../../../styled";
import useTeams from "../../../hooks/useTeams";
import Spinner from "../../loader";
import { SectionContainer } from "../../../styled/containers";
import useEmployees from "../../../hooks/useEmployees";
import { useParams } from "react-router-dom";
import EditEmployeeForm from "./EditEmployeeForm";

export default function EditEmployeePage() {
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
  const {
    isLoading: isLoadingEmployees,
    isFetching: isFetchingEmployees,
    error: errorEmployees,
    data: employees,
  } = useEmployees();

  const employeeId = +useParams().id;
  const selectedEmployee = employees?.find((e) => e.id === employeeId);
  return (
    <PageContainer>
      <FormViewContainer>
        <SectionContainer>
          <FormHeaderContainer>
            <Header>{`Edytuj dane ${selectedEmployee?.firstName} ${selectedEmployee?.lastName}`}</Header>
          </FormHeaderContainer>
          {isLoadingEmployees || isLoadingTeams || isLoadingRoles ? ( //TODO error handling
            <ContainerCenter>
              <Spinner />
            </ContainerCenter>
          ) : !selectedEmployee ||
            errorEmployees ||
            errorRoles ||
            errorTeams ? (
            <ContainerCenter>
              <h2>Wystąpił błąd</h2>
            </ContainerCenter>
          ) : (
            <EditEmployeeForm
              employee={selectedEmployee}
              teams={teams}
              roles={roles}
            />
          )}
        </SectionContainer>
      </FormViewContainer>
    </PageContainer>
  );
}
