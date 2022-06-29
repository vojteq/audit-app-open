import {
  Header,
  FormHeaderContainer,
  FormViewContainer,
  PageContainer,
  ContainerCenter,
} from "../../../styled";
import Spinner from "../../loader";
import NewPlanForm from "./NewPlanForm";
import useTeams from "../../../hooks/useTeams";
import { useLocation } from "react-router";
import usePlanDropdownInfo from "../../../hooks/usePlanDropdownInfo";
import { SectionContainer } from "../../../styled/containers";

export default function NewPlanPage() {
  const {
    isLoading: isLoadingTeams,
    error: errorTeams,
    data: teams,
  } = useTeams();

  const params = new URLSearchParams(useLocation().search);
  const year = params.get("y");
  const teamId = params.get("t");

  const {
    isLoading: isLoadingDropdownInfo,
    isFetching: isFetchingDropdownInfo,
    error: errorDropdownInfo,
    data: dropdownInfo,
  } = usePlanDropdownInfo();

  return (
    <PageContainer>
      <FormViewContainer>
        <SectionContainer>
          <FormHeaderContainer>
            <Header>Utwórz nowy plan</Header>
          </FormHeaderContainer>
          {isLoadingTeams ||
          isLoadingDropdownInfo ||
          isFetchingDropdownInfo ||
          (!!teams && teams.length === 0) ||
          !teams ? (
            <ContainerCenter>
              <Spinner />
            </ContainerCenter>
          ) : (
            <NewPlanForm
              teams={teams}
              year={year}
              teamId={teamId}
              existingPlans={dropdownInfo}
            />
          )}
        </SectionContainer>
      </FormViewContainer>
    </PageContainer>
  );
}
