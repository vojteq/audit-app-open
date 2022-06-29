import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "../../../buttons/Button";
import { useForm } from "react-hook-form";
import FormInputErrorMessage from "../../../utils/FormInputErrorMessage";
import CustomSnackbar from "../../../snackbar/CustomSnackbar";
import { acceptTask } from "../../../../services/TaskService";
import { useMutation } from "react-query";
import { FormControl } from "../../../../styled/form-control";
import { taskTypes } from "../../../utils/enums/taskTypes";
import { FormViewCancelButton } from "../../../buttons/FormViewCancelButton";
import { useRedirect } from "../../../../hooks/redirect/useRedirect";
import TeamMembersSelect from "../components/TeamMembersSelect";
import AuditedCompaniesSelect from "../components/AuditedCompaniesSelect";
import AddExternalTeamMembersSection from "../addExternalTeamMembers/AddExternalTeamMembersSection";
import { Link } from "react-router-dom";

export default function EditAndAcceptForm({
  requestData,
  methodologies,
  planItems,
  employees,
  selectedTeamMembersInitial,
  companies,
  teams,
  auditedCompaniesInitial,
}) {
  const [externalTeamMembersNames, setExternalTeamMembersNames] = useState(
    requestData.externalEmployees
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

  const [redirect, setRedirect] = useRedirect("/wnioski", 2000);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      topic: requestData.topic,
      methodology: requestData.methodology.id,
      type: requestData.taskType,
      typeIsAdHoc: requestData.adHoc ? "ADHOC" : "PLANNED",
      planItem: "",
      taskManagerId: requestData.taskManager.id,
      taskTeam:
        teams.find((teamId) => requestData.taskManager.teamId === teamId) || "",
      sharepointUrl: "",
      startDate: requestData.startDate,
      plannedFinishedDate: requestData.plannedFinishedDate,
      externalEmployees: externalTeamMembersNames,
    },
    mode: "all",
  });
  const watchAllFields = watch();

  const selectedTaskManagerTeamId =
    employees.find(
      (employee) => employee.id === Number(watchAllFields.taskManagerId)
    )?.teamId || "";

  const mutationAcceptRequest = useMutation(
    ({ externalTeamMembersNames, formData, requestData }) => {
      const requestInfo = {
        auditedCompanies: auditedCompanies,
        methodologyId: formData.methodology,
        planItemId: formData.typeIsAdHoc === "ADHOC" ? -1 : formData.planItem,
        topic: formData.topic,
        taskRequestId: requestData.id,
        taskManagerId: formData.taskManagerId,
        sharepointUrl: formData.sharepointUrl,
        taskType: formData.type,
        isAdHoc: formData.typeIsAdHoc === "ADHOC",
        teamMembers: selectedTeamMembers,
        plannedFinishedDate: formData.plannedFinishedDate,
        startDate: formData.startDate,
        externalEmployees: externalTeamMembersNames,
      };
      return acceptTask(requestInfo);
    },
    {
      onSuccess: (data) => {
        if (data) {
          setSnackbarMessage(
            "Wniosek został zaakceptowany pomyślnie! Zaraz zostaniesz przeniesiony na widok wszystkich wniosków."
          );
          setSeverity("success");
          setConfirmationOpen(true);
          setRedirect(true);
        } else {
          setSeverity("error");
          setSnackbarMessage(
            "Nie udało się zaakceptować wniosku. Spróbuj ponownie!"
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
    mutationAcceptRequest.mutate({
      externalTeamMembersNames,
      formData,
      requestData,
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit(submitFunction)}>
        <Form.Group>
          <Form.Label htmlFor="taskName">Temat zadania *</Form.Label>
          <FormControl
            type="text"
            id="topicInput"
            {...register("topic", { required: true })}
            highlighted={!watchAllFields.topic}
            error={errors.topic}
          />
          {errors.topic && (
            <FormInputErrorMessage errorMessage="Temat zadania jest wymagany" />
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="methodology">
            Metodologia w której realizowane jest zadanie *
          </Form.Label>
          <FormControl
            as="select"
            className="form-control"
            id="methodologySelect"
            {...register("methodology", { required: true })}
            highlighted={!watchAllFields.methodology}
            error={errors.methodology}
          >
            {!!methodologies
              ? methodologies.map((methodology) => (
                  <option
                    value={methodology.methodologyId}
                    key={methodology.methodologyId}
                  >
                    {methodology.methodologyName}
                  </option>
                ))
              : null}
          </FormControl>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="type">
            Typ zadania (audytowe/kontrolne) *
          </Form.Label>
          <FormControl
            as="select"
            className="form-control"
            id="typeSelect"
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
          <Form.Label htmlFor="typeIsAdHoc">
            Rodzaj zadania (planowe/doraźne) *
          </Form.Label>
          <FormControl
            as="select"
            className="form-control"
            id="typeIsAdHocSelect"
            {...register("typeIsAdHoc", { required: true })}
            highlighted={!watchAllFields.typeIsAdHoc}
            error={errors.typeIsAdHoc}
          >
            <option value="PLANNED">Planowe</option>
            <option value="ADHOC">Doraźne</option>
          </FormControl>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="planItem">
            {watchAllFields.typeIsAdHoc === "PLANNED"
              ? "Pozycja z planu *"
              : "Pozycja z planu"}
          </Form.Label>
          <FormControl
            as="select"
            className="form-control"
            id="planItemSelect"
            {...register("planItem", {
              required: watchAllFields.typeIsAdHoc === "PLANNED",
            })}
            disabled={
              watchAllFields.typeIsAdHoc === "ADHOC" ||
              !planItems ||
              planItems.filter((item) => item.taskStatus !== "MOVED").length <=
                0
            }
            highlighted={
              !watchAllFields.planItem &&
              watchAllFields.typeIsAdHoc === "PLANNED"
            }
            error={errors.planItem && watchAllFields.typeIsAdHoc === "PLANNED"}
          >
            <option disabled={true} value="">
              Wybierz pozycję z planu
            </option>
            {planItems
              .filter((item) => item.taskStatus !== "MOVED")
              .map((item) => {
                return (
                  <option value={item.planItemId}>{item.planItemTitle}</option>
                );
              })}
          </FormControl>
          {watchAllFields.typeIsAdHoc === "PLANNED" &&
          (!planItems ||
            planItems.filter((item) => item.taskStatus !== "MOVED").length <=
              0) ? (
            <p style={{ color: "red" }}>
              Brak odpowiednich pozycji planu.{" "}
              <Link to="/plan">Przejdź na widok planu</Link> i utwórz
              odpowiednią pozycję planu, a następnie powróć do rozpatrywania
              wniosku.
            </p>
          ) : null}
          {errors.planItem && watchAllFields.typeIsAdHoc === "PLANNED" && (
            <FormInputErrorMessage errorMessage="Pozycja z planu jest wymagana dla zadania planowego" />
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="taskManagerId">Kierownik zadania *</Form.Label>
          <FormControl
            as="select"
            className="form-control"
            id="taskManagerId"
            {...register("taskManagerId", { required: true })}
            highlighted={!watchAllFields.taskManagerId}
            error={errors.taskManagerId}
          >
            {!!employees && employees.length > 0
              ? employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))
              : null}
          </FormControl>
          {errors.taskManagerId && (
            <FormInputErrorMessage errorMessage="Kierownik zadania jest wymagany" />
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="taskTeam">Zespół realizujący zadanie</Form.Label>
          <FormControl
            type="text"
            id="taskTeam"
            {...register("taskTeam")}
            disabled={true}
            highlighted={false}
            error={errors.taskTeam}
            value={
              teams.find((team) => team.id === selectedTaskManagerTeamId)
                ?.name || ""
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="sharepointUrl">
            Link do folderu sharepoint
          </Form.Label>
          <FormControl
            type="url"
            id="sharepointUrlInput"
            {...register("sharepointUrl")}
            highlighted={false}
          />
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
                getValues("plannedFinishedDate") >= getValues("startDate"),
            })}
            highlighted={!watchAllFields.startDate}
            error={errors.startDate}
          />
          {errors.startDate && errors.startDate.type === "required" && (
            <FormInputErrorMessage errorMessage="Data rozpoczęcia zadania jest wymagana" />
          )}
          {errors.startDate && errors.startDate.type === "validate" && (
            <FormInputErrorMessage errorMessage="Data rozpoczęcia zadania musi być przed planowaną datą zakończenia" />
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
              <FormInputErrorMessage errorMessage="Planowana data zakończenia zadania musi być po dacie rozpoczęcia" />
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
            id="acceptTaskRequestButton"
            mr
            variant="primary"
            type="submit"
            disabled={
              !auditedCompanies ||
              auditedCompanies.length === 0 ||
              disableButton
            }
          >
            Zaakceptuj wniosek o zadanie
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
