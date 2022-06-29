import { taskTypesAdHoc } from "../enums/taskTypesAdHoc";

export const getTaskTypeAdHocString = (taskTypeAdHocEnum) => {
  const type = taskTypesAdHoc.find(
    (taskTypeAdHoc) => taskTypeAdHoc.value === taskTypeAdHocEnum
  );
  const label = !!type ? type.label : null;
  return label;
};
