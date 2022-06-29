import { useState } from "react";
import {
  Header,
  FormHeaderContainer,
  PageContainer,
  FormViewContainer,
  ContainerCenter,
} from "../../../../styled";
import Spinner from "../../../loader";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useMethodologies from "../../../../hooks/useMethodologies";
import useTaskRequestDetails from "../../../../hooks/useTaskRequestDetails";
import { usePlanItems, usePlanSummary } from "../../../../hooks";
import { rejectTask } from "../../../../services/TaskService";
import { useMutation } from "react-query";
import ConfirmationButton from "../../../utils/ConfirmationButton";
import EditAndAcceptForm from "./EditAndAcceptForm";
import useEmployees from "../../../../hooks/useEmployees";
import { useRedirect } from "../../../../hooks/redirect/useRedirect";
import useTeams from "../../../../hooks/useTeams";
import { SectionContainer } from "../../../../styled/containers";

export default function EditAndAcceptPage() {
  const [employees, setEmployees] = useState([]);
  const [auditedCompanies, setAuditedCompanies] = useState([]);
  const [nonAuditedCompanies, setNonAuditedCompanies] = useState([]);

  const [requestData, setRequestData] = useState(null);
  const [methodologies, setMethodologies] = useState([]);
  const [planItems, setPlanItems] = useState([]);
  const [teamId, setTeamId] = useState(-1);
  const [planId, setPlanId] = useState(-1);

  const [redirect, setRedirect] = useRedirect("/wnioski", 2000);

  const { id } = useParams();

  const {
    isLoading: isLoadingMethodologies,
    error: errorMethodologies,
    data: methodologiesResponse,
  } = useMethodologies();
  const {
    isLoading: isLoadingTaskRequestDetails,
    error: errorTaskRequestDetails,
    data: taskRequestDetailsResponse,
  } = useTaskRequestDetails(id);
  const {
    isLoading: isLoadingPlanInfo,
    error: errorPlanInfo,
    data: planInfoResponse,
  } = usePlanSummary(new Date().getFullYear(), teamId);
  const {
    isLoading: isLoadingPlanItems,
    error: errorPlanItems,
    data: planItemsResponse,
  } = usePlanItems(planId);
  const {
    isLoading: isLoadingEmployees,
    error: errorEmployees,
    data: employeesRequestData,
  } = useEmployees();
  const {
    isLoading: isLoadingTeams,
    error: errorTeams,
    data: teams,
  } = useTeams();

  useEffect(() => {
    if (!!employeesRequestData && employeesRequestData.length > 0) {
      setEmployees(
        employeesRequestData.map((employee) => ({
          id: employee.id,
          name: `${employee.firstName} ${employee.lastName}`,
          companyId: employee.companyId,
          teamId: employee.teamId,
        }))
      );
    }
  }, [employeesRequestData]);

  const mutationRejectRequest = useMutation(
    ({ requestData }) => {
      return rejectTask(requestData.id);
    },
    {
      onSuccess: () => {
        setRedirect(true);
      },
    }
  );

  const handleRejection = async () => {
    mutationRejectRequest.mutate({ requestData });
  };

  useEffect(() => {
    setMethodologies(methodologiesResponse);
  }, [methodologiesResponse]);

  useEffect(() => {
    if (taskRequestDetailsResponse) {
      setRequestData(taskRequestDetailsResponse);
      setAuditedCompanies(taskRequestDetailsResponse.auditedCompanies);
      setNonAuditedCompanies(taskRequestDetailsResponse.nonAuditedCompanies);
      setTeamId(taskRequestDetailsResponse.taskManager.teamId);
    }
  }, [taskRequestDetailsResponse]);

  useEffect(() => {
    if (planInfoResponse) {
      setPlanId(planInfoResponse.id);
    }
  }, [planInfoResponse]);

  useEffect(() => {
    if (planItemsResponse) {
      let planItemsWithoutTask = planItemsResponse.filter(
        (planItem) => planItem.taskId === null
      );
      setPlanItems(planItemsWithoutTask);
    }
  }, [planItemsResponse]);

  if (errorPlanInfo) {
    console.log(errorPlanInfo);
    return (
      <PageContainer>
        <FormViewContainer>
          <SectionContainer>
            <FormHeaderContainer>
              <Header>Rozpatrz wniosek o zadanie</Header>
              <ConfirmationButton
                id="rejectRequestButton"
                variant="danger"
                onClick={handleRejection}
                modalText="Czy na pewno chcesz odrzucić wniosek?"
                modalButtonText="Tak, odrzuć wniosek"
              >
                Odrzuć wniosek
              </ConfirmationButton>
            </FormHeaderContainer>
            <hr />
            <h4>
              Nie można rozpatrzyć wniosku ze względu na brak odpowiedniego
              planu audytu i kontroli.
            </h4>
            <h4>
              <Link to="/plan">Przejdź na widok planu</Link> i utwórz odpowiedni
              plan, a następnie powróć do rozpatrywania wniosku.
            </h4>
          </SectionContainer>
        </FormViewContainer>
      </PageContainer>
    );
  }

  if (
    !requestData ||
    isLoadingTaskRequestDetails ||
    isLoadingEmployees ||
    isLoadingTeams
  ) {
    return (
      <PageContainer>
        <Spinner />
      </PageContainer>
    );
  }

  if (
    errorMethodologies ||
    errorPlanInfo ||
    errorPlanItems ||
    errorTaskRequestDetails ||
    errorEmployees ||
    errorTeams
  ) {
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
            <Header>Rozpatrz wniosek o zadanie</Header>
            <ConfirmationButton
              id="rejectRequestButton"
              variant="danger"
              onClick={handleRejection}
              modalText="Czy na pewno chcesz odrzucić wniosek?"
              modalButtonText="Tak, odrzuć wniosek"
            >
              Odrzuć wniosek
            </ConfirmationButton>
          </FormHeaderContainer>
          {isLoadingMethodologies || isLoadingPlanInfo || isLoadingPlanItems ? (
            <ContainerCenter>
              <Spinner />
            </ContainerCenter>
          ) : (
            <EditAndAcceptForm
              requestData={requestData}
              methodologies={methodologies}
              planItems={planItems}
              employees={employees}
              companies={[...auditedCompanies, ...nonAuditedCompanies]}
              teams={teams}
              auditedCompaniesInitial={auditedCompanies}
              selectedTeamMembersInitial={requestData.teamMembers}
            />
          )}
        </SectionContainer>
      </FormViewContainer>
    </PageContainer>
  );
}
