import { taskStatuses } from "../enums/taskStatuses";

export const getTaskStatusString = (taskStatusEnum) =>
  taskStatuses.find((taskStatus) => taskStatus.value === taskStatusEnum).label;
