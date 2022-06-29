import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "../../buttons/Button";
import { useForm } from "react-hook-form";
import FormInputErrorMessage from "../../utils/FormInputErrorMessage";
import { useMutation } from "react-query";
import { changePassword } from "../../../services/EmployeeService";
import CustomSnackbar from "../../snackbar/CustomSnackbar";
import { FormControl } from "../../../styled/form-control";
import { FormViewCancelButton } from "../../buttons/FormViewCancelButton";
import { useRedirect } from "../../../hooks/redirect/useRedirect";

export default function ChangePasswordForm() {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  const [redirect, setRedirect] = useRedirect("/profil", 2000);

  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    getValues,
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
          setSnackbarMessage(
            "Hasło zostało pomyślnie zmienione! Zaraz zostaniesz przeniesiony na swój profil."
          );
          setSeverity("success");
          setRedirect(true);
          setConfirmationOpen(true);
        } else {
          setSeverity("error");
          setDisableButton(false);
          setSnackbarMessage(
            "Nie udało się zmienić hasła. Stare hasło jest nieprawidłowe."
          );
          setConfirmationOpen(true);
        }
      },
    }
  );

  const submitFunction = (formData) => {
    setDisableButton(true);
    mutationChangePassword.mutate({ formData });
  };

  return (
    <>
      <Form
        className="mt-2"
        id="newEmployeeForm"
        onSubmit={handleSubmit(submitFunction)}
      >
        <fieldset disabled={isSubmitting || mutationChangePassword.isLoading}>
          <Form.Group>
            <Form.Label htmlFor="oldPassword">Obecne hasło</Form.Label>
            <FormControl
              type="password"
              name="oldPassword"
              placeholder="Podaj obecne hasło"
              defaultValue=""
              {...register("oldPassword", { required: true, maxLength: 100 })}
              highlighted={!watchAllFields.oldPassword}
              error={errors.oldPassword}
            ></FormControl>
            {errors.oldPassword?.type === "maxLength" && (
              <FormInputErrorMessage errorMessage="Hasło nie może być dłuższe niż 100 znaków" />
            )}
            {errors.oldPassword?.type === "required" && (
              <FormInputErrorMessage errorMessage="Obecne hasło jest wymagane" />
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="newPassword">Nowe hasło</Form.Label>
            <FormControl
              type="password"
              name="newPassword"
              placeholder="Podaj nowe hasło"
              defaultValue=""
              {...register("newPassword", { required: true, maxLength: 100 })}
              highlighted={!watchAllFields.newPassword}
              error={errors.newPassword}
            ></FormControl>
            {errors.newPassword?.type === "maxLength" && (
              <FormInputErrorMessage errorMessage="Hasło nie może być dłuższe niż 100 znaków" />
            )}
            {errors.newPassword?.type === "required" && (
              <FormInputErrorMessage errorMessage="Nowe hasło jest wymagane" />
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="newPasswordConfirmation">
              Potwierdź nowe hasło
            </Form.Label>
            <FormControl
              type="password"
              name="newPasswordConfirmation"
              placeholder="Podaj nowe hasło ponownie"
              defaultValue=""
              {...register("newPasswordConfirmation", {
                required: true,
                maxLength: 100,
                validate: (value) => value === getValues("newPassword"),
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
            {errors.newPasswordConfirmation?.type === "validate" && (
              <FormInputErrorMessage errorMessage="Hasła muszą być identyczne" />
            )}
          </Form.Group>
        </fieldset>
        <div className="mt-4 mb-3 mr-3">
          <Button
            id="changePasswordButton"
            mr
            variant="primary"
            type="submit"
            disabled={
              !isValid ||
              isSubmitting ||
              mutationChangePassword.isLoading ||
              disableButton
            }
          >
            Zmień hasło
          </Button>
          <FormViewCancelButton />
        </div>
      </Form>

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
