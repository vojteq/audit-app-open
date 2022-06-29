import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "../../buttons/Button";
import { useForm } from "react-hook-form";
import FormInputErrorMessage from "../../utils/FormInputErrorMessage";
import CustomSnackbar from "../../snackbar/CustomSnackbar";
import { useMutation } from "react-query";
import { postNewPlan } from "../../../services/PlanService";
import { FormControl } from "../../../styled/form-control";
import ItemsToMove from "./itemsToMove/ItemsToMove";
import usePlanItemsToMove from "../../../hooks/usePlanItemsToMove";
import { moveTasks } from "../../../services/PlanService";
import { FormViewCancelButton } from "../../buttons/FormViewCancelButton";
import { useRedirect } from "../../../hooks/redirect/useRedirect";
import { useEffect } from "react";

export default function NewPlanForm({ teams, year, teamId, existingPlans }) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const [disableButton, setDisableButton] = useState(false);

  const [redirect, setRedirect] = useRedirect("/plan", 2000);

  const thisYear = Number(new Date().getFullYear());
  const yearsToShow = [thisYear, thisYear + 1];

  const [planForSelectedOptionsExists, setPlanForSelectedOptionsExists] =
    useState(false);

  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      year: !!year && yearsToShow.includes(Number(year)) ? year : null,
      auditingTeamId: !!teamId ? teamId : null,
    },
    mode: "all",
  });
  const watchAllFields = watch();

  useEffect(() => {
    if (!!watchAllFields.auditingTeamId && !!watchAllFields.year) {
      if (
        !!existingPlans &&
        existingPlans.yearsWithPlan[watchAllFields.year.toString()].some(
          (team) => team.teamId === Number(watchAllFields.auditingTeamId)
        )
      ) {
        setPlanForSelectedOptionsExists(true);
      } else {
        setPlanForSelectedOptionsExists(false);
      }
    }
  }, [existingPlans, watchAllFields]);

  const {
    isLoading: isLoadingPlanItemsToMove,
    isFetching: isFetchingPlanItemsToMove,
    error: errorPlanItemsToMove,
    data: planItemsToMove,
  } = usePlanItemsToMove(watchAllFields.auditingTeamId, watchAllFields.year);

  const mutationPostNewPlan = useMutation(
    ({ formData }) => {
      return postNewPlan(formData);
    },
    {
      onSuccess: (data) => {
        if (data) {
          if (!!planItemsToMove && planItemsToMove.length > 0) {
            mutationMoveTasks.mutate(data.data.id);
          } else {
            setSnackbarMessage(
              "Plan został utworzony pomyślnie! Zaraz zostaniesz przeniesiony na widok planu."
            );
            setSeverity("success");
            setRedirect(true);
            setConfirmationOpen(true);
          }
        } else {
          setDisableButton(false);
          setSeverity("error");
          setSnackbarMessage(
            "Nie udało się utworzyć planu. Istnieje już plan dla wybranej spółki na podany rok!"
          );
          setConfirmationOpen(true);
        }
      },
    }
  );

  const mutationMoveTasks = useMutation(
    (planId) => {
      return moveTasks(planId);
    },
    {
      onSuccess: (data) => {
        if (data) {
          setSnackbarMessage(
            "Plan został utworzony pomyślnie! Zaraz zostaniesz przeniesiony na widok planu."
          );
          setSeverity("success");
          setRedirect(true);
          setConfirmationOpen(true);
        } else {
          setDisableButton(false);
          setSeverity("error");
          setSnackbarMessage("Nie udało się utworzyć planu.");
          setConfirmationOpen(true);
        }
      },
    }
  );

  const submitFunction = (formData) => {
    setDisableButton(true);
    mutationPostNewPlan.mutate({ formData: formData });
  };

  return (
    <>
      <>
        {!!planForSelectedOptionsExists ? (
          <div className="mb-3">
            <FormInputErrorMessage errorMessage="Istnieje już plan dla wybranego zespołu na wybrany rok." />
          </div>
        ) : null}
        <Form id="newPlanForm" onSubmit={handleSubmit(submitFunction)}>
          <fieldset disabled={isSubmitting || mutationPostNewPlan.isLoading}>
            <Form.Group>
              <Form.Label htmlFor="auditingTeamId">
                Zespół dla którego tworzony jest plan *
              </Form.Label>
              <FormControl
                as="select"
                className="form-control"
                name="auditingTeamId"
                // defaultValue=""
                placeholder="Wybierz zespół"
                {...register("auditingTeamId", { required: true })}
                highlighted={!watchAllFields.auditingTeamId}
                error={errors.auditingTeamId}
              >
                <option disabled={true} value="">
                  Wybierz zespół
                </option>
                {teams.map((team) => {
                  return (
                    <option key={team.id} value={team.id}>
                      {`${team.name} (${team.acronym})`}
                    </option>
                  );
                })}
              </FormControl>
              {errors.auditingTeamId && (
                <FormInputErrorMessage errorMessage="Zespół jest wymagany" />
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="name">Nazwa planu *</Form.Label>
              <FormControl
                type="text"
                name="name"
                defaultValue=""
                placeholder="Podaj nazwę planu"
                {...register("name", { required: true, maxLength: 100 })}
                highlighted={!watchAllFields.name}
                error={errors.name}
              ></FormControl>
              {errors.name?.type === "maxLength" && (
                <FormInputErrorMessage errorMessage="Długość nazwy planu nie może być dłuższa niż 100 znaków" />
              )}
              {errors.name?.type === "required" && (
                <FormInputErrorMessage errorMessage="Nazwa planu jest wymagana" />
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="year">
                Rok na który jest tworzony plan *
              </Form.Label>
              <FormControl
                as="select"
                className="form-control"
                name="year"
                defaultValue=""
                placeholder="Podaj rok na który jest plan"
                {...register("year", { required: true })}
                highlighted={!watchAllFields.year}
                error={errors.year}
              >
                <option disabled={true} value="">
                  Wybierz rok na który chcesz stworzyć plan
                </option>
                {yearsToShow.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </FormControl>
              {errors.year && (
                <FormInputErrorMessage errorMessage="Rok jest wymagany" />
              )}
            </Form.Group>

            <ItemsToMove
              isLoading={isLoadingPlanItemsToMove || isFetchingPlanItemsToMove}
              itemsToMove={planItemsToMove}
              year={watchAllFields.year}
            />
            <div className="mt-5 mb-3">
              <Button
                mr
                variant="primary"
                type="submit"
                disabled={
                  !isValid ||
                  isSubmitting ||
                  mutationPostNewPlan.isLoading ||
                  isLoadingPlanItemsToMove ||
                  isFetchingPlanItemsToMove ||
                  planForSelectedOptionsExists ||
                  disableButton
                }
              >
                Utwórz plan
              </Button>
              <FormViewCancelButton
                disabled={isSubmitting || mutationPostNewPlan.isLoading}
              />
            </div>
          </fieldset>
        </Form>
      </>
      <CustomSnackbar
        severity={severity}
        message={snackbarMessage}
        isOpen={confirmationOpen}
        setIsOpen={setConfirmationOpen}
        timeout={3000}
      />
    </>
  );
}
