import {
  TaskContainer,
  ActionButtonsContainer,
  TaskDetailsHeaderContainer,
  TaskDetailsHeader,
} from "./styled";
import TaskInfo from "./TaskInfo";
import Spinner from "../../loader";
import { Button } from "../../buttons/Button";
import CorrectedPlannedFinishDatePickerModal from "./CorrectedPlannedFinishDatePickerModal";
import { useState } from "react";
import FinishDatePickerModal from "./FinishDatePickerModal";
import { useQuery } from "react-query";
import { fetchTaskProgress } from "../../../services/TaskService";
import FinishEarlyModal from "./FinishEarlyModal";
import { hasTaskWriteAccess } from "../../auth/hasTaskWriteAccess";
import { useHistory } from "react-router";
import { useAuth } from "../../auth/useAuth";
import SuspendTaskModal from "./SuspendTaskModal";
import { getTaskTypeString } from "../../utils/mappers/taskTypeToString";
import { getExternalEmployeeString } from "../../utils/mappers/externalEmployeeToString";
import { ButtonPenIcon } from "../../buttons/iconButtons/ButtonPenIcon";
import { ButtonCheckIcon } from "../../buttons/iconButtons/ButtonCheckIcon";
import { ButtonSuspendResumeTask } from "../../buttons/ButtonSuspendResumeTask";

export default function TaskInfoList({ taskDetails, isLoading, editable }) {
  const [
    showModalCorrectedPlannedFinishDate,
    setShowModalCorrectedPlannedFinishDate,
  ] = useState(false);
  const [showModalFinishDate, setShowModalFinishDate] = useState(false);
  const [showModalFinishEarly, setShowModalFinishEarly] = useState(false);
  const [showModalSuspend, setShowModalSuspend] = useState(false);

  const auth = useAuth();
  const history = useHistory();

  const { data: taskProgress } = useQuery(
    ["taskProgress", taskDetails?.id],
    () => fetchTaskProgress(taskDetails?.id)
  );

  const getTaskSuspensionHistoryText = (suspensions) => {
    const suspensionHistoryText = suspensions
      .map(
        (suspension) =>
          `Okres: ${new Date(suspension.dateFrom).toLocaleDateString()} - ${
            suspension.dateTo
              ? new Date(suspension.dateTo).toLocaleDateString()
              : "obecnie"
          }\nPowód: ${suspension.reason}`
      )
      .join("\n");

    return suspensionHistoryText;
  };

  return (
    <TaskContainer>
      <TaskDetailsHeaderContainer>
        <TaskDetailsHeader>Informacje o zadaniu</TaskDetailsHeader>
        {editable && hasTaskWriteAccess(auth.user, null, taskDetails) && (
          <ButtonPenIcon
            variant="secondary"
            onClick={() => history.push(`/edycjaZadania/${taskDetails.id}`)}
          >
            Edytuj informacje
          </ButtonPenIcon>
        )}
      </TaskDetailsHeaderContainer>
      {isLoading || !taskDetails || !taskProgress ? (
        <Spinner />
      ) : (
        <>
          <TaskInfo
            title="Kierownik zadania"
            value={taskDetails?.taskManager || "---"}
          />
          <TaskInfo title="Temat zadania" value={taskDetails?.topic || "---"} />
          <TaskInfo
            title="Rodzaj zadania"
            value={
              !!taskDetails && !!taskDetails.taskType
                ? getTaskTypeString(taskDetails.taskType)
                : "---"
            }
          />
          <TaskInfo
            title="Pozycja z planu"
            value={
              !!taskDetails?.planItemTitle ? taskDetails?.planItemTitle : "---"
            }
          />
          <TaskInfo
            title="Stosowana metodologia"
            value={taskDetails?.methodologyName || "---"}
          />
          <TaskInfo
            title="Zespół realizujący zadanie"
            value={
              (!!taskDetails?.teamMembersNames &&
                !!taskDetails?.teamMembersNames.length > 0) ||
              (!!taskDetails?.externalEmployees &&
                !!taskDetails?.externalEmployees.length > 0)
                ? taskDetails?.teamMembersNames
                    .map((teamMember) => teamMember.name)
                    .concat(
                      taskDetails.externalEmployees.map((name) =>
                        getExternalEmployeeString(name)
                      )
                    )
                    .join(", ")
                : "---"
            }
          />
          <TaskInfo
            title="Audytowane spółki"
            value={
              taskDetails?.auditedCompanies
                .map((company) => `${company.name}`)
                .join("\n") || "---"
            }
          />
          <TaskInfo
            title="Data rozpoczęcia zadania"
            value={
              new Date(taskDetails?.startDate).toLocaleDateString() || "---"
            }
          />
          <TaskInfo
            title="Planowana data zakończenia zadania"
            value={
              new Date(taskDetails?.plannedFinishedDate).toLocaleDateString() ||
              "---"
            }
          />
          <TaskInfo
            title="Skorygowana planowana data zakończenia zadania"
            value={
              taskDetails?.correctedFinishDate ? (
                new Date(taskDetails?.correctedFinishDate).toLocaleDateString()
              ) : taskDetails.plannedFinishedDate &&
                taskDetails.taskStatus === "IN_PROGRESS" &&
                editable ? (
                <Button
                  width={100}
                  onClick={() => setShowModalCorrectedPlannedFinishDate(true)}
                >
                  Dodaj
                </Button>
              ) : (
                "---"
              )
            }
          />
          <TaskInfo
            title="Data raportu końcowego"
            highlighted={
              !taskDetails.finishedDate &&
              taskProgress.data.taskPercentageDone === 100
            }
            value={
              taskDetails?.finishedDate ? (
                new Date(taskDetails?.finishedDate).toLocaleDateString()
              ) : taskDetails.plannedFinishedDate && editable ? (
                <Button
                  width={100}
                  disabled={taskProgress.data.taskPercentageDone !== 100}
                  onClick={() => setShowModalFinishDate(true)}
                >
                  Dodaj
                </Button>
              ) : (
                "---"
              )
            }
          />
          {taskDetails.suspensions?.length ? (
            <TaskInfo
              title="Historia zawieszeń zadania"
              value={getTaskSuspensionHistoryText(taskDetails.suspensions)}
            />
          ) : null}

          <ActionButtonsContainer>
            {editable && taskDetails.taskStatus !== "FINISHED" && (
              <ButtonSuspendResumeTask
                isSuspended={taskDetails.taskStatus === "SUSPENDED"}
                variant="secondary"
                onClick={() => setShowModalSuspend(true)}
              >
                {taskDetails.taskStatus === "SUSPENDED"
                  ? "Wznów zadanie"
                  : "Zawieś zadanie"}
              </ButtonSuspendResumeTask>
            )}
            {editable &&
              taskDetails.taskStatus !== "FINISHED" &&
              taskDetails.taskType === "CONTROL" && (
                <ButtonCheckIcon
                  variant="secondary"
                  onClick={() => setShowModalFinishEarly(true)}
                >
                  Zakończ na obecnym etapie
                </ButtonCheckIcon>
              )}
          </ActionButtonsContainer>

          <CorrectedPlannedFinishDatePickerModal
            show={showModalCorrectedPlannedFinishDate}
            onHide={() => {
              setShowModalCorrectedPlannedFinishDate(false);
            }}
            plannedFinishDate={taskDetails.plannedFinishedDate}
            taskId={taskDetails.id}
          />
          <FinishDatePickerModal
            show={showModalFinishDate}
            onHide={() => setShowModalFinishDate(false)}
            startDate={taskDetails.startDate}
            plannedFinishDate={taskDetails.plannedFinishedDate}
            correctedPlannedFinishDate={taskDetails.correctedFinishDate}
            taskId={taskDetails.id}
          />
          <FinishEarlyModal
            show={showModalFinishEarly}
            onHide={() => setShowModalFinishEarly(false)}
            startDate={taskDetails.startDate}
            plannedFinishDate={taskDetails.plannedFinishedDate}
            correctedPlannedFinishDate={taskDetails.correctedFinishDate}
            taskId={taskDetails.id}
          />
          <SuspendTaskModal
            show={showModalSuspend}
            onHide={() => setShowModalSuspend(false)}
            taskId={taskDetails.id}
            isSuspended={taskDetails.taskStatus === "SUSPENDED"}
          />
        </>
      )}
    </TaskContainer>
  );
}
