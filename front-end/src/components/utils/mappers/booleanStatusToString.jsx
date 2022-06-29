import { booleanStatuses } from "../enums/booleanStatuses";

export const getBooleanStatusString = (booleanStatus) => {
  const status = booleanStatuses.find(
    (status) => status.value === booleanStatus
  );
  const label = !!status ? status.label : null;
  return label;
};
