import { taskRequestStatusesProcessed } from "./enums/taskRequestStatuses";

export const isTaskRequestProcessed = (taskRequestStatusEnum) => {
  return (
    taskRequestStatusesProcessed.find(
      (taskRequestStatus) => taskRequestStatus.value === taskRequestStatusEnum
    ) != null
  );
};
