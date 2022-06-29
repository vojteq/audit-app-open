import { taskTypes } from "../enums/taskTypes";

export const getTaskTypeString = (taskTypeEnum) => {
  const type = taskTypes.find((taskType) => taskType.value === taskTypeEnum);
  const label = !!type ? type.label : null;
  return label;
};
