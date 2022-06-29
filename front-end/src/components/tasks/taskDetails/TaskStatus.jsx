import { getTaskStatusString } from "../../utils/mappers/taskStatusToString";
import { Status } from "./styled";

export default function TaskStatus({ taskStatus }) {
  return (
    <div>
      <h4 style={{ display: "inline" }}>Status:</h4>
      <Status status={taskStatus}> {getTaskStatusString(taskStatus)}</Status>
    </div>
  );
}
