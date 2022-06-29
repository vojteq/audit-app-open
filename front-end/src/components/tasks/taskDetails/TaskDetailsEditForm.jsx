import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "../../buttons/Button";
import { useForm } from "react-hook-form";
import FormInputErrorMessage from "../../utils/FormInputErrorMessage";
import CustomSnackbar from "../../snackbar/CustomSnackbar";
import { useMutation, useQueryClient } from "react-query";
import { FormControl } from "../../../styled/form-control";
import { taskTypes } from "../../utils/enums/taskTypes";
import { editTask } from "../../../services/TaskService";
import { FormViewCancelButton } from "../../buttons/FormViewCancelButton";
import { useRedirect } from "../../../hooks/redirect/useRedirect";
import TeamMembersSelect from "../newTask/components/TeamMembersSelect";
import AddExternalTeamMembersSection from "../newTask/addExternalTeamMembers/AddExternalTeamMembersSection";
import AuditedCompaniesSelect from "../newTask/components/AuditedCompaniesSelect";

export default function TaskDetailsEditForm({
  taskDetails,
  employees,
  selectedTeamMembersInitial,
  companies,
  auditedCompaniesInitial,
}) {
  const [externalTeamMembersNames, setExternalTeamMembersNames] = useState(
    taskDetails.externalEmployees
  );
  const [auditedCompanies, setAuditedCompanies] = useState(
    auditedCompaniesInitial.map((company) => company.id)
  );
  const [selectedTeamMembers, setSelectedTeamMembers] = useState(
    selectedTeamMembersInitial.map((teamMember) => teamMember.id)
  );

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  const queryClient = useQueryClient();

  const [redirect, setRedirect] = useRedirect(
    `/zadania/${taskDetails.id}/edycja`,
    2000
  );

  const {
    register,
    watch,
    formState: { errors, dirtyFields },
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      topic: taskDetails.topic,
      type: taskDetails.taskType,
      taskManagerId: taskDetails.taskManagerId,
      sharepointUrl: taskDetails.sharepointUrl,
      startDate: taskDetails.startDate,
    },
    mode: "all",
  });
  const watchAllFields = watch();

  const mutationEditTaskDetails = useMutation(
    ({ externalTeamMembersNames, formData }) => {
      const requestInfo = {
        auditedCompaniesIds: auditedCompanies,
        topic: formData.topic,
        sharepointUrl: formData.sharepointUrl,
        taskType: formData.type,
        teamMembersIds: selectedTeamMembers,
        taskManagerId: formData.taskManagerId,
        taskId: taskDetails.id,
        externalEmployees: externalTeamMembersNames,
        startDate: formData.startDate,
      };
      return editTask(requestInfo);
    },
    {
      onSuccess: (data) => {
        if (data) {
          queryClient.invalidateQueries([
            "taskDetails",
            Number(taskDetails.id),
          ]);

          setSnackbarMessage(
            "Edycja zakończona pomyślnie! Zaraz zostaniesz przeniesiony do widoku zadania."
          );
          setSeverity("success");
          setConfirmationOpen(true);
          setRedirect(true);
        } else {
          setSeverity("error");
          setSnackbarMessage(
            "Nie udało się Edytować zadania. Spróbuj ponownie!"
          );
          setDisableButton(false);
          setConfirmationOpen(true);
          setTimeout(() => setConfirmationOpen(false), 5500);
        }
      },
    }
  );

  const submitFunction = async (formData) => {
    setDisableButton(true);
    mutationEditTaskDetails.mutate({ externalTeamMembersNames, formData });
  };

  return (
    <>
      <Form onSubmit={handleSubmit(submitFunction)}>
        <Form.Group>
          <Form.Label htmlFor="taskName">Temat zadania *</Form.Label>
          <FormControl
            type="text"
            name="topic"
            {...register("topic", { required: true })}
            highlighted={!watchAllFields.topic}
            error={errors.topic}
          ></FormControl>
          {errors.topic && (
            <FormInputErrorMessage errorMessage="Temat zadania jest wymagany" />
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="type">
            Typ zadania (audytowe/kontrolne) *
          </Form.Label>
          <FormControl
            as="select"
            className="form-control"
            name="type"
            {...register("type", { required: true })}
            highlighted={!watchAllFields.type}
            error={errors.type}
          >
            {taskTypes.map((taskType) => (
              <option value={taskType.value}>{taskType.label}</option>
            ))}
          </FormControl>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="taskManagerId">Kierownik zadania *</Form.Label>
          <FormControl
            as="select"
            className="form-control"
            name="taskManagerId"
            {...register("taskManagerId", { required: true })}
            disabled={false}
            highlighted={false}
            error={errors.taskManagerId}
          >
            {employees.map((member) => (
              <option value={member.id}>{member.name}</option>
            ))}
          </FormControl>
          {errors.taskManagerId && (
            <FormInputErrorMessage errorMessage="Kierownik zadania jest wymagany" />
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="sharepointUrl">
            Link do folderu sharepoint
          </Form.Label>
          <FormControl
            type="url"
            name="sharepointUrl"
            {...register("sharepointUrl")}
            highlighted={false}
          ></FormControl>
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
                "startDate" in dirtyFields
                  ? getValues("startDate") >=
                    new Date().toISOString().split("T")[0]
                  : true,
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
          <h3 className="mt-4 mb-3">Członkowie zespołu (opcjonalne)</h3>
          <TeamMembersSelect
            options={employees.filter(
              (employee) => employee.id !== Number(watchAllFields.taskManagerId)
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
            mr
            variant="primary"
            type="submit"
            disabled={
              !auditedCompanies ||
              auditedCompanies.length === 0 ||
              disableButton
            }
          >
            Zapisz edycję zadania
          </Button>
          <FormViewCancelButton />
        </div>
      </Form>

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
