import {
  TaskDetailsHeader,
  TaskDetailsHeaderContainer,
  TaskMilestonesContainer,
} from "./styled";
import Spinner from "../../loader";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Slider from "@material-ui/core/Slider";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQueryClient, useMutation } from "react-query";
import { updateMilestone } from "../../../services/TaskService";
import CustomSnackbar from "../../snackbar/CustomSnackbar";
import ConfirmationButton from "../../utils/ConfirmationButton";
import { makeStyles } from "@material-ui/core";
import {} from "styled-components";
import { theme } from "../../../layout/theme/theme";

const useStyles = makeStyles(() => ({
  stepLabel: {},
  root: {
    "& .MuiStepIcon-root": { fontSize: "2rem" },
    "& .MuiStepIcon-active": {
      color: theme.colors.bg.primary,
    },
    "& .MuiStepIcon-completed": {
      background: theme.colors.green,
      color: "#fff",
      padding: "3px",
      borderRadius: "50%",
    },
  },
}));

export default function TaskMilestones({ taskProgress, isLoading, editable }) {
  const [alertOpen, setAlertOpen] = useState(false);
  const [milestones, setMilestones] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const classes = useStyles();

  const [
    divisibleMilestonePercentageDone,
    setDivisibleMilestonePercentageDone,
  ] = useState(0);

  const handleSliderChange = (event, newValue) => {
    setDivisibleMilestonePercentageDone(newValue);
  };

  useEffect(() => {
    setMilestones(taskProgress?.milestones);
    setActiveStep(taskProgress?.currentMilestoneNumber);
    if (milestones) {
      const milestone = taskProgress.milestones.find(
        (milestone) => milestone.divisible
      );
      if (milestone) {
        setDivisibleMilestonePercentageDone(milestone.percentageDone);
      }
    }
  }, [taskProgress, milestones]);

  const marks = [
    {
      value: 0,
      label: "0%",
    },
    {
      value: 10,
      label: "10%",
    },
    {
      value: 20,
      label: "20%",
    },
    {
      value: 30,
      label: "30%",
    },
    {
      value: 40,
      label: "40%",
    },
    {
      value: 50,
      label: "50%",
    },
    {
      value: 60,
      label: "60%",
    },
    {
      value: 70,
      label: "70%",
    },
    {
      value: 80,
      label: "80%",
    },
    {
      value: 90,
      label: "90%",
    },
    {
      value: 100,
      label: "100%",
    },
  ];

  const handleUpdateMilestone = (milestoneId, percentageDone) => {
    mutationUpdateMilestone.mutate({
      milestoneId: milestoneId,
      percentageDone: percentageDone,
    });
  };

  const mutationUpdateMilestone = useMutation(
    ({ milestoneId, percentageDone }) => {
      const updatedMilestone = {
        taskId: Number(id),
        milestoneId: milestoneId,
        percentageDone: percentageDone,
      };
      return updateMilestone(updatedMilestone);
    },
    {
      onSuccess: async () => {
        setAlertOpen(true);
        queryClient.invalidateQueries(["taskProgress", Number(id)]);
        queryClient.invalidateQueries(["taskDetails", Number(id)]);
      },
    }
  );

  return (
    <TaskMilestonesContainer>
      <TaskDetailsHeaderContainer>
        <TaskDetailsHeader>Kamienie milowe</TaskDetailsHeader>
      </TaskDetailsHeaderContainer>
      {isLoading || mutationUpdateMilestone.isLoading || !milestones ? (
        <Spinner />
      ) : (
        <>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            className={classes.root}
          >
            {milestones.map((milestone) => (
              <Step key={milestone.consecutiveNumber}>
                {milestone.divisible ? (
                  <StepLabel classes={{ label: classes.stepLabel }}>
                    {milestone.name} ({milestone.percentageDone}%)
                  </StepLabel>
                ) : (
                  <StepLabel classes={{ label: classes.stepLabel }}>
                    {milestone.name}
                  </StepLabel>
                )}

                <StepContent>
                  {milestone.divisible && editable && (
                    <div>
                      <p>
                        Obecny stopień wykonania kamienia:{" "}
                        {milestone.percentageDone}%
                      </p>
                      <p>
                        Nowy stopień wykonania kamienia:{" "}
                        {divisibleMilestonePercentageDone}%
                      </p>

                      <Slider
                        defaultValue={milestone.percentageDone}
                        aria-labelledby="discrete-slider-custom"
                        step={10}
                        valueLabelDisplay="auto"
                        marks={marks}
                        value={divisibleMilestonePercentageDone}
                        onChange={handleSliderChange}
                      />
                    </div>
                  )}

                  {milestone.divisible
                    ? milestone.percentageDone < 100 &&
                      divisibleMilestonePercentageDone < 100 &&
                      editable
                      ? editable && (
                          <ConfirmationButton
                            variant="primary"
                            disabled={
                              divisibleMilestonePercentageDone ===
                                milestone.percentageDone ||
                              mutationUpdateMilestone.isLoading ||
                              isLoading
                            }
                            onClick={() =>
                              handleUpdateMilestone(
                                milestone.id,
                                divisibleMilestonePercentageDone
                              )
                            }
                            modalText={
                              divisibleMilestonePercentageDone <
                              milestone.percentageDone
                                ? `Czy na pewno chcesz zmniejszyć stopień wykonania kamienia milowego "${milestone.name}"?`
                                : `Czy na pewno chcesz zaktualizować kamień milowy "${milestone.name}"?`
                            }
                            modalButtonText={"Tak, zaktualizuj kamień milowy"}
                          >
                            Zaktualizuj kamień milowy
                          </ConfirmationButton>
                        )
                      : editable && (
                          <ConfirmationButton
                            variant="primary"
                            disabled={
                              mutationUpdateMilestone.isLoading || isLoading
                            }
                            onClick={() =>
                              handleUpdateMilestone(milestone.id, 100)
                            }
                            modalText={`Czy na pewno chcesz zakończyć kamień milowy "${milestone.name}"?`}
                            modalButtonText={"Tak, zakończ kamień milowy"}
                          >
                            Zakończ kamień milowy
                          </ConfirmationButton>
                        )
                    : editable && (
                        <ConfirmationButton
                          variant="primary"
                          disabled={
                            mutationUpdateMilestone.isLoading || isLoading
                          }
                          onClick={() =>
                            handleUpdateMilestone(milestone.id, 100)
                          }
                          modalText={`Czy na pewno chcesz zakończyć kamień milowy "${milestone.name}"?`}
                          modalButtonText={"Tak, zakończ kamień milowy"}
                        >
                          Zakończ kamień milowy
                        </ConfirmationButton>
                      )}
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {(!!milestones && milestones.length < 1) || !milestones ? (
            <p>Nie znaleziono kamieni milowych dla tego zadania.</p>
          ) : null}
          {!!milestones &&
          milestones.length > 0 &&
          activeStep >= milestones.length ? (
            <p>Wszystkie kamienie milowe zostały ukończone.</p>
          ) : taskProgress && taskProgress.taskStatus === "FINISHED" ? (
            <p>Zadanie zostało zakończone.</p>
          ) : null}
        </>
      )}
      <CustomSnackbar
        isOpen={alertOpen}
        setIsOpen={setAlertOpen}
        severity="success"
        message="Kamień milowy został zaktualizowany pomyślnie."
      />
    </TaskMilestonesContainer>
  );
}
