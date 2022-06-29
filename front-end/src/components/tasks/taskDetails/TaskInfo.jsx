import { TaskInfoContainer, TaskInfoTitle, TaskInfoValue } from "./styled";

export default function TaskInfo({ title, value, highlighted }) {
  return (
    <TaskInfoContainer highlighted={highlighted}>
      <TaskInfoTitle>{title}</TaskInfoTitle>
      <TaskInfoValue>{value}</TaskInfoValue>
    </TaskInfoContainer>
  );
}
