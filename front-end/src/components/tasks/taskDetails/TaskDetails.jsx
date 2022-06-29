import { useState } from "react";
import { useHistory, useParams } from "react-router";
import {
  ContainerCenter,
  Header,
  HeaderContainer,
  PageContainer,
  TaskDetailsViewContainer,
} from "../../../styled";
import { TaskDetailsContainer } from "./styled";
import TaskInfoList from "./TaskInfoList";
import CustomSnackbar from "../../snackbar/CustomSnackbar";
import TaskProgress from "./TaskProgress";
import { Button } from "../../buttons/Button";
import { Link } from "react-router-dom";
import TaskStatus from "./TaskStatus";
import Spinner from "../../loader";
import { LinkButton } from "../../buttons/LinkButton";
import InfoBanner from "../../../styled/info-banner";
import useTaskDetails from "../../../hooks/useTaskDetails";
import { useAuth } from "../../auth/useAuth";
import useTaskAccess from "../../../hooks/useTaskAccess";
import { useEffect } from "react";
import { ButtonPenIcon } from "../../buttons/iconButtons/ButtonPenIcon";
import { SectionContainer } from "../../../styled/containers";
import FinishDateReminderModal from "./modals/FinishDateReminderModal";

export default function TaskDetails({ editable }) {
  const { id } = useParams();
  const [alertOpen, setAlertOpen] = useState(false);
  const [showFinishDateReminderModal, setShowFinishDateReminderModal] =
    useState(false);

  const history = useHistory();
  const auth = useAuth();

  const {
    isLoading,
    isFetching,
    data: taskDetails,
  } = useTaskDetails(Number(id));

  const { isLoading: isLoadingTaskAccess, data: taskAccess } =
    useTaskAccess(id);

  const handleExit = () => {
    !taskDetails.finishedDate && taskDetails.percentageDone === 100
      ? setShowFinishDateReminderModal(true)
      : history.push(`/zadania/${id}`);
  };

  useEffect(() => {
    if (
      !!taskAccess &&
      (!taskAccess.readAccess || (!!editable && !taskAccess.writeAccess))
    ) {
      history.goBack();
    }
  }, [taskAccess, history, editable]);

  if (
    isLoadingTaskAccess ||
    isLoading ||
    !auth.user ||
    (!!taskAccess &&
      (!taskAccess.readAccess || (!!editable && !taskAccess.writeAccess)))
  ) {
    return (
      <ContainerCenter>
        <Spinner />
      </ContainerCenter>
    );
  }

  return (
    <PageContainer>
      <TaskDetailsViewContainer>
        <SectionContainer>
          <HeaderContainer>
            {editable ? (
              <Header>
                Edycja zadania {taskDetails ? taskDetails.wpzId : <Spinner />}
              </Header>
            ) : (
              <Header>
                Zadanie {taskDetails ? taskDetails.wpzId : <Spinner />}
              </Header>
            )}
            {!editable ? (
              <Link to={`/twoje-zadania/`}>
                <LinkButton
                  mr
                  variant="secondary"
                  disabled={isLoading || !taskDetails}
                >
                  Powrót do zadań
                </LinkButton>
              </Link>
            ) : null}

            {editable ? (
              <Button disabled={isLoading || !taskDetails} onClick={handleExit}>
                Wyjdź z trybu edycji
              </Button>
            ) : (
              taskDetails?.taskStatus !== "FINISHED" &&
              !!taskAccess &&
              taskAccess.writeAccess && (
                <Link to={`/zadania/${id}/edycja`}>
                  <ButtonPenIcon disabled={isLoading || !taskDetails}>
                    Przejdź do trybu edycji
                  </ButtonPenIcon>
                </Link>
              )
            )}
          </HeaderContainer>
        </SectionContainer>

        {taskDetails ? (
          <SectionContainer>
            <TaskStatus taskStatus={taskDetails?.taskStatus} />
          </SectionContainer>
        ) : (
          <Spinner />
        )}

        {taskDetails?.taskStatus === "FINISHED" ? (
          <SectionContainer>
            <InfoBanner
              text="Pamiętaj o załączeniu raportu i one slide'u: "
              linkUrl={taskDetails?.sharepointUrl}
              linkText="przejdź do folderu sharepoint"
            />
          </SectionContainer>
        ) : null}
        <TaskDetailsContainer>
          <SectionContainer>
            <TaskInfoList
              editable={editable}
              taskDetails={taskDetails}
              isLoading={isLoading || isFetching}
            />
          </SectionContainer>
          <SectionContainer>
            <TaskProgress
              editable={
                editable &&
                !!taskDetails &&
                taskDetails.taskStatus === "IN_PROGRESS"
              }
              taskDetails={taskDetails}
              taskId={Number(id)}
              isLoading={isLoading}
            />
          </SectionContainer>
          <CustomSnackbar
            isOpen={alertOpen}
            setIsOpen={setAlertOpen}
            severity="error"
            message="Wystąpił błąd podczas ładowania danych."
          />
          <FinishDateReminderModal
            show={showFinishDateReminderModal}
            onHide={() => setShowFinishDateReminderModal(false)}
          />
        </TaskDetailsContainer>
      </TaskDetailsViewContainer>
    </PageContainer>
  );
}
