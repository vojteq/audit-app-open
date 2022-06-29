import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "../buttons/Button";
import { useForm } from "react-hook-form";
import FormInputErrorMessage from "../utils/FormInputErrorMessage";
import { useMutation } from "react-query";
import { changePassword } from "../../../services/EmployeeService";
import CustomSnackbar from "../snackbar/CustomSnackbar";
import { FormControl } from "../../styled/form-control";

export default function ChangePassword() {
  const [isActive, setIsActive] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm({ mode: "all" });
  const watchAllFields = watch();

  const mutationChangePassword = useMutation(
    ({ formData }) => {
      const requestData = {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      };
      return changePassword(requestData);
    },
    {
      onSuccess: (data) => {
        if (data) {
          setSnackbarMessage("Hasło zostało pomyślnie zmienione!");
          setSeverity("success");
          setConfirmationOpen(true);
          setIsActive(false);
        } else {
          setSeverity("error");
          setSnackbarMessage(
            "Nie udało się zmienić hasła. Stare hasło jest nieprawidłowe."
          );
          setConfirmationOpen(true);
        }
      },
    }
  );

  const submitFunction = (formData) => {
    mutationChangePassword.mutate({ formData });
  };

  return (
    <div>
      <Button
        variant="primary"
        onClick={() => {
          setIsActive(!isActive);
          reset();
        }}
      >
        {isActive ? "Anuluj zmianę hasła" : "Zmień hasło"}
      </Button>
      {isActive && (
        <Form
          className="mt-2"
          id="newEmployeeForm"
          onSubmit={handleSubmit(submitFunction)}
        >
          <Form.Group>
            <Form.Label htmlFor="oldPassword">Stare hasło</Form.Label>
            <FormControl
              type="password"
              name="oldPassword"
              defaultValue=""
              {...register("oldPassword", { required: true, maxLength: 100 })}
              highlighted={!watchAllFields.oldPassword}
              error={errors.oldPassword}
            ></FormControl>
            {errors.oldPassword?.type === "maxLength" && (
              <FormInputErrorMessage errorMessage="Hasło nie może być dłuższe niż 100 znaków" />
            )}
            {errors.oldPassword?.type === "required" && (
              <FormInputErrorMessage errorMessage="Podanie starego hasła jest wymagane" />
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="newPassword">Nowe hasło</Form.Label>
            <FormControl
              type="password"
              name="newPassword"
              defaultValue=""
              {...register("newPassword", { required: true, maxLength: 100 })}
              highlighted={!watchAllFields.newPassword}
              error={errors.newPassword}
            ></FormControl>
            {errors.newPassword?.type === "maxLength" && (
              <FormInputErrorMessage errorMessage="Hasło nie może być dłuższe niż 100 znaków" />
            )}
            {errors.newPassword?.type === "required" && (
              <FormInputErrorMessage errorMessage="Podanie nowego hasła jest wymagane" />
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="newPasswordConfirmation">
              Potwierdź nowe hasło
            </Form.Label>
            <FormControl
              type="password"
              name="newPasswordConfirmation"
              defaultValue=""
              {...register("newPasswordConfirmation", {
                required: true,
                maxLength: 100,
              })}
              highlighted={!watchAllFields.newPasswordConfirmation}
              error={errors.newPasswordConfirmation}
            ></FormControl>
            {errors.newPasswordConfirmation?.type === "maxLength" && (
              <FormInputErrorMessage errorMessage="Hasło nie może być dłuższe niż 100 znaków" />
            )}
            {errors.newPasswordConfirmation?.type === "required" && (
              <FormInputErrorMessage errorMessage="Potwierdzenie nowego hasła jest wymagane" />
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            Zapisz zmiany
          </Button>
        </Form>
      )}
      <CustomSnackbar
        severity={severity}
        message={snackbarMessage}
        isOpen={confirmationOpen}
        setIsOpen={setConfirmationOpen}
        timeout={3000}
      />
    </div>
  );
}
