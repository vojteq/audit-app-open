import { useEffect, useState } from "react";
import {
  Header,
  FormHeaderContainer,
  PageContainer,
  FormViewContainer,
  ContainerCenter,
} from "../../../../styled";
import Spinner from "../../../loader";
import NewTaskForm from "./NewTaskForm";
import useEmployees from "../../../../hooks/useEmployees";
import { useAuth } from "../../../auth/useAuth";
import useCompanies from "../../../../hooks/useCompanies";
import useMethodologies from "../../../../hooks/useMethodologies";
import { SectionContainer } from "../../../../styled/containers";

//TODO add error handling

export default function NewTaskPage() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);

  const {
    isLoading: isLoadingCompanies,
    error: errorCompanies,
    data: companies,
  } = useCompanies();
  const {
    isLoading: isLoadingMethodologies,
    error: errorMethodologies,
    data: methodologies,
  } = useMethodologies();
  const {
    isLoading: isLoadingEmployees,
    error: errorEmployees,
    data: employeesRequestData,
  } = useEmployees();

  useEffect(() => {
    if (!!employeesRequestData && employeesRequestData.length > 0) {
      setEmployees(
        employeesRequestData.map((employee) => ({
          id: employee.id,
          name: `${employee.firstName} ${employee.lastName}`,
        }))
      );
    }
  }, [employeesRequestData]);

  const isLoading =
    isLoadingEmployees || isLoadingCompanies || isLoadingMethodologies;

  if (isLoading || !user) {
    return (
      <PageContainer>
        <ContainerCenter>
          <Spinner />
        </ContainerCenter>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <FormViewContainer>
        <SectionContainer>
          <FormHeaderContainer>
            <Header>Złóż wniosek o zadanie</Header>
          </FormHeaderContainer>

          <NewTaskForm
            companies={companies}
            methodologies={methodologies}
            employees={employees}
            defaultTaskManagerId={user.id}
          />
        </SectionContainer>
      </FormViewContainer>
    </PageContainer>
  );
}
