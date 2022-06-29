import styled from "styled-components";

export const TaskDetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 12fr;
  grid-gap: 1.5em;
  @media (min-width: 1024px) {
    grid-template-columns: 6fr 6fr;
  }
`;

export const TaskDetailsHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0 1rem 0;
  flex-wrap: wrap;
  gap: 1em;
`;

export const TaskDetailsHeader = styled.h2`
  margin: 0;
  flex-grow: 1;
`;

export const TaskInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 7fr 5fr;
  grid-gap: 1em;
  padding: 0.5em;
  margin: 0.5em 0;
  border: 2px solid #f3f3f3;
  border-radius: 10px;
  border-color: ${(props) => (props.highlighted ? "orange" : "#f3f3f3")};
  white-space: pre-line;
`;

export const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TaskProgressContainer = styled.div`
  display: grid;
  grid-template-columns: 12fr;

  @media (min-width: 576px) {
    grid-template-columns: 8fr 4fr;
    grid-gap: 1em;
  }
`;

export const TaskProgressData = styled.p`
  display: flex;
  gap: 4px;
  font-size: 1.2em;
`;

export const TaskProgressDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TaskProgressChartContainer = styled.div`
  height: 200px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const TaskMilestonesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TaskInfoParagraph = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
`;

export const TaskInfoTitle = styled(TaskInfoParagraph)`
  padding-left: 0.5em;
`;

export const TaskInfoValue = styled(TaskInfoParagraph)`
  font-weight: bold;
`;

export const Status = styled.h4`
  color: ${(props) =>
    props.status === "IN_PROGRESS"
      ? "orange"
      : props.status === "FINISHED"
      ? "green"
      : "red"};

  display: inline;
`;

export const ModalSpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
  margin-top: 0.5em;
`;
