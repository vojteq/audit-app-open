import { taskRequestStatuses } from "../enums/taskRequestStatuses";

export const getTaskRequestStatusString = (taskRequestStatusEnum) => {
  const status = taskRequestStatuses.find(
    (taskRequestStatus) => taskRequestStatus.value === taskRequestStatusEnum
  );
  const label = !!status ? status.label : null;
  return label;
};
