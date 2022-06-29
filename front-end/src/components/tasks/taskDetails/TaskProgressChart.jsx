import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Spinner from "../../loader";

export default function TaskProgressChart({ taskProgress }) {
  return (
    <>
      {!taskProgress ? (
        <Spinner />
      ) : (
        <CircularProgressbar
          value={taskProgress.taskPercentageDone}
          text={`${taskProgress.taskPercentageDone}%`}
          styles={buildStyles({
            strokeLinecap: "butt",
            pathColor: "#009ee0",
            textColor: "#009ee0",
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7",
          })}
        />
      )}
    </>
  );
}
