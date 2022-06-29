import {
  TaskDetailsHeader,
  TaskProgressContainer,
  TaskProgressDataContainer,
  TaskProgressData,
  TaskContainer,
  TaskDetailsHeaderContainer,
} from "./styled";
import Spinner from "../../loader";
import TaskMilestones from "./TaskMilestones";
import { fetchTaskProgress } from "../../../services/TaskService";
import { useQuery } from "react-query";
import { TaskProgressChartContainer } from "./styled";
import TaskProgressChart from "./TaskProgressChart";
import OperationalActionsSelect from "./OperationalActionsSelect";

export default function TaskProgress({ taskDetails, taskId, editable }) {
  const {
    isLoading,
    isFetching,
    data: taskProgress,
  } = useQuery(["taskProgress", Number(taskId)], () =>
    fetchTaskProgress(taskId)
  );

  return (
    <TaskContainer>
      <TaskDetailsHeaderContainer>
        <TaskDetailsHeader>Postęp zadania</TaskDetailsHeader>
      </TaskDetailsHeaderContainer>
      {isLoading || !taskDetails || !taskProgress ? (
        <Spinner />
      ) : (
        <>
          {isFetching ? (
            <Spinner />
          ) : (
            <TaskProgressContainer>
              <TaskProgressDataContainer>
                <TaskProgressData>
                  Zakończone kamienie milowe:{" "}
                  {taskProgress.data.currentMilestoneNumber >
                  taskProgress.data.numberOfMilestones
                    ? taskProgress.data.numberOfMilestones
                    : taskProgress.data.currentMilestoneNumber}{" "}
                  z {taskProgress.data.numberOfMilestones}
                </TaskProgressData>
                <TaskProgressData>
                  Zadanie ukończone w: {taskProgress.data.taskPercentageDone}%
                </TaskProgressData>
                <TaskProgressData>
                  Do zakończenia zadania pozostało:{" "}
                  {100 - taskProgress.data.taskPercentageDone}%
                </TaskProgressData>
              </TaskProgressDataContainer>
              <TaskProgressChartContainer>
                <TaskProgressChart taskProgress={taskProgress.data} />
              </TaskProgressChartContainer>
            </TaskProgressContainer>
          )}
          <TaskMilestones
            taskId={taskId}
            taskProgress={taskProgress.data}
            isLoading={isLoading || isFetching}
            editable={editable}
          />
          {taskDetails.taskType === "CONTROL" ? (
            <OperationalActionsSelect
              taskId={taskId}
              operationalActionsPerformed={taskDetails.operActionPerformed}
              editable={editable}
            />
          ) : null}
        </>
      )}
    </TaskContainer>
  );
}
