import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import FormInputErrorMessage from "../../utils/FormInputErrorMessage";
import { Button } from "../../buttons/Button";
import CustomSnackbar from "../../snackbar/CustomSnackbar";
import { useMutation } from "react-query";
import { postNewEmployee } from "../../../services/EmployeeService";
import { FormControl } from "../../../styled/form-control";
import { getRoleString } from "../../utils/mappers/roleEnumToString";
import { FormViewCancelButton } from "../../buttons/FormViewCancelButton";
import { useRedirect } from "../../../hooks/redirect/useRedirect";

export default function AddEmployeeForm({ companies, teams, roles }) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  const [redirect, setRedirect] = useRedirect("/pracownicy", 2000);

  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    watch,
  } = useForm({ mode: "all" });
  const watchAllFields = watch();

  const mutationPostNewEmployee = useMutation(
    ({ companyId, teamId, formData }) => {
      const newEmployee = {
        companyId: companyId,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
        teamId: teamId,
      };
      return postNewEmployee(newEmployee);
    },
    {
      onSuccess: (data) => {
        if (data) {
          setSnackbarMessage(
            "Pracownik został dodany pomyślnie! Zaraz zostaniesz przeniesiony na widok listy pracowników."
          );
          setSeverity("success");
          setRedirect(true);
          setConfirmationOpen(true);
        } else {
          setDisableButton(false);
          setSeverity("error");
          setSnackbarMessage("Nie udało się dodać pracownika.");
          setConfirmationOpen(true);
        }
      },
    }
  );

  const submitFunction = (formData) => {
    setDisableButton(true);
    let companyId, teamId;
    companies.forEach((company) => {
      if (company.name === formData.companyName) {
        companyId = company.id;
      }
    });
    teams.forEach((team) => {
      if (team.name === formData.teamName) {
        teamId = team.id;
      }
    });
    mutationPostNewEmployee.mutate({ companyId, teamId, formData });
  };

  return (
    <>
      <div>
        <Form id="newEmployeeForm" onSubmit={handleSubmit(submitFunction)}>
          <fieldset
            disabled={isSubmitting || mutationPostNewEmployee.isLoading}
          >
            <Form.Group>
              <Form.Label htmlFor="firstName">Imię *</Form.Label>
              <FormControl
                type="text"
                id="firstNameInput"
                defaultValue=""
                placeholder="Podaj imię nowego pracownika"
                {...register("firstName", { required: true, maxLength: 50 })}
                highlighted={!watchAllFields.firstName}
                error={errors.firstName}
              />
              {errors.firstName?.type === "maxLength" && (
                <FormInputErrorMessage errorMessage="Imię nie może być dłuższe niż 50 znaków" />
              )}
              {errors.firstName?.type === "required" && (
                <FormInputErrorMessage errorMessage="Imię jest wymagane" />
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="lastName">Nazwisko *</Form.Label>
              <FormControl
                type="text"
                id="lastNameInput"
                defaultValue=""
                placeholder="Podaj nazwisko nowego pracownika"
                {...register("lastName", { required: true, maxLength: 50 })}
                highlighted={!watchAllFields.lastName}
                error={errors.lastName}
              />
              {errors.lastName?.type === "maxLength" && (
                <FormInputErrorMessage errorMessage="Nazwisko nie może być dłuższe niż 50 znaków" />
              )}
              {errors.lastName?.type === "required" && (
                <FormInputErrorMessage errorMessage="Nazwisko jest wymagane" />
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="email">Email *</Form.Label>
              <FormControl
                type="email"
                id="emailInput"
                defaultValue=""
                placeholder="Podaj email nowego pracownika"
                {...register("email", { required: true, maxLength: 100 })}
                highlighted={!watchAllFields.email}
                error={errors.email}
              />
              {errors.email?.type === "maxLength" && (
                <FormInputErrorMessage errorMessage="Email nie może być dłuższy niż 100 znaków" />
              )}
              {errors.email?.type === "required" && (
                <FormInputErrorMessage errorMessage="Email jest wymagany" />
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="role">Rola *</Form.Label>
              <FormControl
                as="select"
                className="form-control"
                id="roleSelect"
                defaultValue=""
                placeholder="Wybierz rolę nowego pracownika"
                {...register("role", { required: true })}
                highlighted={!watchAllFields.role}
                error={errors.role}
              >
                <option disabled={true} value="">
                  Wybierz rolę
                </option>
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
              <Form.Label htmlFor="companyName">Spółka *</Form.Label>
              <FormControl
                as="select"
                className="form-control"
                id="companySelect"
                defaultValue=""
                placeholder="Wybierz spółkę do której należy pracownik"
                {...register("companyName", { required: true })}
                highlighted={!watchAllFields.companyName}
                error={errors.companyName}
              >
                <option disabled={true} value="">
                  Wybierz spółkę
                </option>
                {!!companies
                  ? companies.map((companyName) => (
                      <option key={companyName.name}>{companyName.name}</option>
                    ))
                  : null}
              </FormControl>
              {errors.companyName && (
                <FormInputErrorMessage errorMessage="Spółka jest wymagana" />
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="teamName">Zespół *</Form.Label>
              <FormControl
                as="select"
                className="form-control"
                id="teamSelect"
                defaultValue=""
                placeholder="Wybierz zespół do którego należy pracownik"
                {...register("teamName", { required: true })}
                highlighted={!watchAllFields.teamName}
                error={errors.teamName}
              >
                <option disabled={true} value="">
                  Wybierz zespół
                </option>
                {!!teams
                  ? teams.map((team) => (
                      <option key={team.name}>{team.name}</option>
                    ))
                  : null}
              </FormControl>
              {errors.teamName && (
                <FormInputErrorMessage errorMessage="Zespół jest wymagany" />
              )}
            </Form.Group>
          </fieldset>
          <div className="mt-4 mb-3">
            <Button
              id="addEmployeeButton"
              mr
              variant="primary"
              type="submit"
              disabled={
                !isValid ||
                isSubmitting ||
                mutationPostNewEmployee.isLoading ||
                disableButton
              }
            >
              Dodaj pracownika
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
