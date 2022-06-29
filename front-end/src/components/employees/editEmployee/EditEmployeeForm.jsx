import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import FormInputErrorMessage from "../../utils/FormInputErrorMessage";
import { Button } from "../../buttons/Button";
import CustomSnackbar from "../../snackbar/CustomSnackbar";
import { useMutation } from "react-query";
import {
  putEditedEmployee,
  deleteEmployee,
} from "../../../services/EmployeeService";
import { FormControl } from "../../../styled/form-control";
import { getRoleString } from "../../utils/mappers/roleEnumToString";
import { FormViewCancelButton } from "../../buttons/FormViewCancelButton";
import { useRedirect } from "../../../hooks/redirect/useRedirect";
import { useConfirmationModalContext } from "../../utils/modalConfirmationContext";

export default function EditEmployeeForm({ employee, teams, roles }) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  const [redirect, setRedirect] = useRedirect("/pracownicy", 2000);
  const modalContext = useConfirmationModalContext();

  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    watch,
    getValues,
  } = useForm({ mode: "all" });
  const watchAllFields = watch();

  const mutationEditNewEmployee = useMutation(
    ({ formData }) => {
      const editedEmployee = {
        role: formData.role,
        newTeamId: formData.teamId,
        employeeId: employee.id,
      };
      return putEditedEmployee(editedEmployee);
    },
    {
      onSuccess: (data) => {
        if (data) {
          setSnackbarMessage(
            "Pracownik został edytowany pomyślnie! Zaraz zostaniesz przeniesiony na widok listy pracowników."
          );
          setSeverity("success");
          setRedirect(true);
          setConfirmationOpen(true);
        } else {
          setDisableButton(false);
          setSeverity("error");
          setSnackbarMessage("Nie udało się edytować pracownika.");
          setConfirmationOpen(true);
        }
      },
    }
  );

  const mutationDeleteEmployee = useMutation(
    ({ employeeId }) => {
      return deleteEmployee(employeeId);
    },
    {
      onSuccess: (data) => {
        if (data) {
          setSnackbarMessage(
            "Pracownik został usunięty pomyślnie! Zaraz zostaniesz przeniesiony na widok listy pracowników."
          );
          setSeverity("success");
          setRedirect(true);
          setConfirmationOpen(true);
        } else {
          setDisableButton(false);
          setSeverity("error");
          setSnackbarMessage("Nie udało się usunąć pracownika.");
          setConfirmationOpen(true);
        }
      },
    }
  );

  const submitFunction = async (formData) => {
    setDisableButton(true);
    modalContext.setModalTitle("Potwierdzenie");
    modalContext.setModalText("Czy na pewno chcesz edytować dane pracownika?");
    modalContext.setModalButtonText("Tak, potwierdź");
    const result = await modalContext.showConfirmation();
    result && mutationEditNewEmployee.mutate({ formData });
  };

  const deleteEmployee = async () => {
    modalContext.setModalTitle("Potwierdzenie");
    modalContext.setModalText(
      "Czy na pewno chcesz usunąć pracownika? Tej operacji nie będzie się dało cofnąć!"
    );
    modalContext.setModalButtonText(
      "Tak, potwierdź trwałe usunięcie pracownika"
    );
    const result = await modalContext.showConfirmation();
    result && mutationDeleteEmployee.mutate({ employeeId: employee.id });
  };

  return (
    <>
      <div>
        <Form id="editEmployeeForm" onSubmit={handleSubmit(submitFunction)}>
          <Form.Group>
            <Form.Label htmlFor="role">Rola *</Form.Label>
            <FormControl
              as="select"
              className="form-control"
              id="roleSelect"
              defaultValue={employee.role}
              placeholder="Wybierz rolę nowego pracownika"
              {...register("role", { required: true })}
              highlighted={!watchAllFields.role}
              error={errors.role}
            >
              {!!roles
                ? roles.map((role) => (
                    <option key={role} value={role}>
                      {getRoleString(role)}
                    </option>
                  ))
                : null}
            </FormControl>
            {errors.role && (
              <FormInputErrorMessage errorMessage="Rola jest wymagana" />
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="teamId">Zespół *</Form.Label>
            <FormControl
              as="select"
              className="form-control"
              id="teamSelect"
              defaultValue={employee.teamId}
              placeholder="Wybierz nowy zespół pracownika"
              {...register("teamId", { required: true })}
              highlighted={!watchAllFields.teamId}
              error={errors.teamId}
            >
              {!!teams
                ? teams.map((team) => (
                    <option key={team.name} value={team.id}>
                      {team.name}
                    </option>
                  ))
                : null}
            </FormControl>
            {errors.teamId && (
              <FormInputErrorMessage errorMessage="Zespół jest wymagany" />
            )}
          </Form.Group>
          <div className="mt-5 mb-3 mr-3">
            <Button
              id="editEmployeeButton"
              mr
              variant="primary"
              type="submit"
              disabled={
                mutationEditNewEmployee.isLoading ||
                disableButton ||
                (getValues().role === employee.role &&
                  +getValues().teamId === employee.teamId)
              }
            >
              Edytuj pracownika
            </Button>
            <Button
              id="deleteEmployeeButton"
              mr
              type="button"
              variant="danger"
              onClick={deleteEmployee}
            >
              Usuń pracownika
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
        timeout={3000}
      />
    </>
  );
}
