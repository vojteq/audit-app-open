import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "../../../buttons/Button";
import { useForm } from "react-hook-form";
import FormInputErrorMessage from "../../../utils/FormInputErrorMessage";
import CustomSnackbar from "../../../snackbar/CustomSnackbar";
import { postNewTask } from "../../../../services/TaskService";
import { useMutation } from "react-query";
import { FormControl } from "../../../../styled/form-control";
import { taskTypes } from "../../../utils/enums/taskTypes";
import { taskTypesAdHoc } from "../../../utils/enums/taskTypesAdHoc";
import useRedirect from "../../../../hooks/redirect";
import { FormViewCancelButton } from "../../../buttons/FormViewCancelButton";
import TeamMembersSelect from "../components/TeamMembersSelect";
import AuditedCompaniesSelect from "../components/AuditedCompaniesSelect";
import AddExternalTeamMembersSection from "../addExternalTeamMembers/AddExternalTeamMembersSection";

export default function NewTaskForm({
  companies,
  methodologies,
  employees,
  defaultTaskManagerId,
}) {
  const [auditedCompanies, setAuditedCompanies] = useState([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [externalTeamMembersNames, setExternalTeamMembersNames] = useState([]);

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  const [redirect, setRedirect] = useRedirect("/twoje-wnioski", 2000);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = useForm({
    mode: "all",
    defaultValues: {
      taskManagerId: defaultTaskManagerId,
    },
  });
  const watchAllFields = watch();

  const mutationPostNewTask = useMutation(
    ({ externalTeamMembersNames, formData }) => {
      const taskInfo = {
        auditedCompanies: auditedCompanies,
        methodologyId: formData.methodologyId,
        topic: formData.taskName,
        taskType: formData.taskType,
        isAdHoc: formData.taskTypeAdHoc === "true" ? true : false,
        teamMembers: selectedTeamMembers,
        startDate: formData.startDate,
        plannedFinishedDate: formData.plannedFinishedDate,
        externalEmployees: externalTeamMembersNames,
        taskManagerId: formData.taskManagerId,
      };
      return postNewTask(taskInfo);
    },
    {
      onSuccess: (data) => {
        if (data) {
          setSnackbarMessage(
            "Wniosek został przesłany pomyślnie! Oczekuje on teraz na potwierdzenie. Zaraz powrócisz na widok Twoich wniosków."
          );
          setSeverity("success");
          setRedirect(true);
          setConfirmationOpen(true);
        } else {
          setDisableButton(false);
          setSeverity("error");
          setSnackbarMessage("Nie udało się wysłać wniosku. Spróbuj ponownie!");
          setConfirmationOpen(true);
          setTimeout(() => setConfirmationOpen(false), 5500);
        }
      },
    }
  );

  const submitFunction = async (formData) => {
    setDisableButton(true);

    mutationPostNewTask.mutate({
      externalTeamMembersNames,
      formData,
    });
  };

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit(submitFunction)} id="taskRequestForm">
          <Form.Group>
            <Form.Label htmlFor="taskName">Temat zadania *</Form.Label>
            <FormControl
              type="text"
              id="taskNameInput"
              defaultValue=""
              placeholder="Podaj temat zadania"
              {...register("taskName", { required: true, maxLength: 100 })}
              highlighted={!watchAllFields.taskName}
              error={errors.taskName}
            />
            {errors.taskName?.type === "maxLength" && (
              <FormInputErrorMessage errorMessage="Długość tematu zadania nie może być dłuższa niż 100 znaków" />
            )}
            {errors.taskName?.type === "required" && (
              <FormInputErrorMessage errorMessage="Temat zadania jest wymagany" />
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="methodologyId">
              Metodologia w której realizowane jest zadanie *
            </Form.Label>
            <FormControl
              as="select"
              className="form-control"
              id="methodologySelect"
              defaultValue=""
              {...register("methodologyId", { required: true })}
              highlighted={!watchAllFields.methodologyId}
              error={errors.methodologyId}
            >
              <option disabled={true} value="">
                Wybierz metodologię dla zadania
              </option>
              {!!methodologies && methodologies.length !== 0
                ? methodologies.map((methodology) => (
                    <option
                      key={methodology.methodologyId}
                      value={methodology.methodologyId}
                    >
                      {methodology.methodologyName}
                    </option>
                  ))
                : null}
            </FormControl>
            {errors.methodologyId && (
              <FormInputErrorMessage errorMessage="Metodologia zadania jest wymagana" />
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="taskType">
              Typ zadania (audytowe/kontrolne) *
            </Form.Label>
            <FormControl
              as="select"
              className="form-control"
              id="taskTypeSelect"
              defaultValue=""
              {...register("taskType", { required: true })}
              highlighted={!watchAllFields.taskType}
              error={errors.taskType}
            >
              <option disabled={true} value="">
                Wybierz typ zadania
              </option>
              {taskTypes.map((taskType) => (
                <option key={taskType.value} value={taskType.value}>
                  {taskType.label}
                </option>
              ))}
            </FormControl>
            {errors.taskType && (
              <FormInputErrorMessage errorMessage="Typ zadania jest wymagany" />
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="taskTypeAdHoc">
              Rodzaj zadania (planowe/doraźne) *
            </Form.Label>
            <FormControl
              as="select"
              className="form-control"
              id="taskTypeAdHocSelect"
              defaultValue=""
              {...register("taskTypeAdHoc", { required: true })}
              highlighted={!watchAllFields.taskTypeAdHoc}
              error={errors.taskTypeAdHoc}
            >
              <option disabled={true} value="">
                Wybierz rodzaj zadania
              </option>

              {taskTypesAdHoc.map((taskTypeAdHoc) => (
                <option value={taskTypeAdHoc.value}>
                  {taskTypeAdHoc.label}
                </option>
              ))}
            </FormControl>
            {errors.taskTypeAdHoc && (
              <FormInputErrorMessage errorMessage="Rodzaj zadania jest wymagany" />
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="taskManagerId">Kierownik zadania *</Form.Label>
            <FormControl
              as="select"
              className="form-control"
              id="taskManager"
              {...register("taskManagerId", { required: true })}
              highlighted={!watchAllFields.taskManagerId}
              error={errors.taskManagerId}
            >
              <option key={defaultTaskManagerId} value={defaultTaskManagerId}>
                {
                  employees.find(
                    (employee) => employee.id === defaultTaskManagerId
                  )?.name
                }
              </option>
              {employees &&
                employees
                  .filter((employee) => employee.id !== defaultTaskManagerId)
                  .map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
            </FormControl>
            {errors.taskManagerId && (
              <FormInputErrorMessage errorMessage="Kierownik zadania jest wymagany" />
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="startDate">
              Data rozpoczęcia zadania *
            </Form.Label>
            <FormControl
              type="date"
              id="startDateInput"
              disabled={false}
              {...register("startDate", {
                required: true,
                validate: () =>
                  getValues("startDate") >=
                  new Date().toISOString().split("T")[0],
              })}
              highlighted={!watchAllFields.startDate}
              error={errors.startDate}
            />
            {errors.startDate && errors.startDate.type === "required" && (
              <FormInputErrorMessage errorMessage="Data rozpoczęcia zadania jest wymagana" />
            )}
            {errors.startDate && errors.startDate.type === "validate" && (
              <FormInputErrorMessage errorMessage="Data rozpoczęcia zadania nie może być datą z przeszłości" />
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="plannedFinishedDate">
              Planowana data zakończenia zadania *
            </Form.Label>
            <FormControl
              type="date"
              id="plannedFinishedDateInput"
              disabled={false}
              {...register("plannedFinishedDate", {
                required: true,
                validate: () =>
                  getValues("plannedFinishedDate") >= getValues("startDate"),
              })}
              highlighted={!watchAllFields.plannedFinishedDate}
              error={errors.plannedFinishedDate}
            />
            {errors.plannedFinishedDate &&
              errors.plannedFinishedDate.type === "required" && (
                <FormInputErrorMessage errorMessage="Planowana data zakończenia zadania jest wymagana" />
              )}
            {errors.plannedFinishedDate &&
              errors.plannedFinishedDate.type === "validate" && (
                <FormInputErrorMessage errorMessage="Planowana data zakończenia zadania musi być po dacie rozpoczęcia zadania" />
              )}
          </Form.Group>

          <Form.Group>
            <h3 className="mt-4 mb-3">Członkowie zespołu (opcjonalne)</h3>
            <TeamMembersSelect
              options={employees.filter(
                (employee) =>
                  employee.id !== Number(watchAllFields.taskManagerId)
              )}
              selected={selectedTeamMembers}
              setSelected={setSelectedTeamMembers}
              currentTaskManagerId={Number(watchAllFields.taskManagerId)}
              fullWidth
            />
          </Form.Group>

          <AddExternalTeamMembersSection
            externalTeamMembersNames={externalTeamMembersNames}
            setExternalTeamMembersNames={setExternalTeamMembersNames}
          />

          <Form.Group>
            <h3 className="mt-4 mb-3">Audytowane spółki *</h3>
            <AuditedCompaniesSelect
              options={companies}
              selected={auditedCompanies}
              setSelected={setAuditedCompanies}
              fullWidth
            />
          </Form.Group>

          <div className="mt-5 mb-3 mr-3">
            <Button
              id="sendRequestButton"
              mr
              variant="primary"
              type="submit"
              disabled={
                (!!auditedCompanies && auditedCompanies.length === 0) ||
                disableButton
              }
            >
              Wyślij wniosek o zadanie
            </Button>
            <FormViewCancelButton />
          </div>
        </Form>
      </div>
      <CustomSnackbar
        severity={severity}
        message={snackbarMessage}
        isOpen={confirmationOpen}
        setIsOpen={setConfirmationOpen}
        timeout={5000}
      />
    </>
  );
}
