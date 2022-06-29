import { useState } from "react";
import {
  Header,
  FormHeaderContainer,
  PageContainer,
  FormViewContainer,
} from "../../../styled";
import Spinner from "../../loader";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useTaskDetails from "../../../hooks/useTaskDetails";
import TaskDetailsEditForm from "./TaskDetailsEditForm";
import useEmployees from "../../../hooks/useEmployees";
import useCompanies from "../../../hooks/useCompanies";
import { SectionContainer } from "../../../styled/containers";

export default function TaskDetailsEditPage() {
  const [employees, setEmployees] = useState([]);
  const [auditedCompanies, setAuditedCompanies] = useState([]);
  const [nonAuditedCompanies, setNonAuditedCompanies] = useState([]);

  const { id } = useParams();

  const {
    isLoading: isLoadingTaskDetails,
    error: errorTaskDetails,
    data: taskDetails,
  } = useTaskDetails(Number(id));
  const {
    isLoading: isLoadingEmployees,
    error: errorEmployees,
    data: employeesRequestData,
  } = useEmployees();
  const {
    isLoading: isLoadingCompanies,
    error: errorCompanies,
    data: companies,
  } = useCompanies(id);

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

  useEffect(() => {
    if (!!companies && !!taskDetails) {
      let nonAudited = [];
      let audited = [];
      companies.forEach((company) => {
        taskDetails.auditedCompanies.some(
          (auditedCompany) => company.id === auditedCompany.id
        )
          ? audited.push(company)
          : nonAudited.push(company);
      });
      setNonAuditedCompanies(nonAudited);
      setAuditedCompanies(audited);
    }
  }, [companies, taskDetails]);

  if (
    !taskDetails ||
    isLoadingTaskDetails ||
    isLoadingCompanies ||
    isLoadingEmployees ||
    ((!auditedCompanies || auditedCompanies.length === 0) &&
      (!nonAuditedCompanies || auditedCompanies.length === 0))
  ) {
    return (
      <PageContainer>
        <Spinner />
      </PageContainer>
    );
  }

  if (errorTaskDetails || errorCompanies || errorEmployees) {
    return (
      <PageContainer>
        <FormViewContainer>
          <h3>Wystąpił błąd podczas ładowania danych...</h3>
        </FormViewContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <FormViewContainer>
        <SectionContainer>
          <FormHeaderContainer>
            <Header>Edycja zadania {taskDetails.wpzId}</Header>
          </FormHeaderContainer>
          <TaskDetailsEditForm
            taskDetails={taskDetails}
            companies={[...auditedCompanies, ...nonAuditedCompanies]}
            auditedCompaniesInitial={auditedCompanies}
            employees={employees}
            selectedTeamMembersInitial={taskDetails.teamMembersNames}
          />
        </SectionContainer>
      </FormViewContainer>
    </PageContainer>
  );
}
