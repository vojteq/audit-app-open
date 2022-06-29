import { useState } from "react";
import { useRedirect } from "../../../hooks/redirect/useRedirect";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { postNewCompany } from "../../../services/CompanyService";
import { Form } from "react-bootstrap";
import { Button } from "../../buttons/Button";
import { FormControl } from "../../../styled/form-control";
import CustomSnackbar from "../../snackbar/CustomSnackbar";
import FormInputErrorMessage from "../../utils/FormInputErrorMessage";
import { FormViewCancelButton } from "../../buttons/FormViewCancelButton";

export default function AddCompanyForm() {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  const [redirect, setRedirect] = useRedirect("/spółki", 2000);

  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    watch,
  } = useForm({ mode: "all" });
  const watchAllFields = watch();

  const mutationPostNewCompany = useMutation(
    (formData) => {
      const newCompany = {
        name: formData.name,
        acronym: formData.acronym,
      };
      return postNewCompany(newCompany);
    },
    {
      onSuccess: (data) => {
        if (data) {
          setSnackbarMessage(
            "Spółka została dodana pomyślnie! Zaraz zostaniesz przeniesiony na widok listy spółek."
          );
          setSeverity("success");
          setRedirect(true);
          setConfirmationOpen(true);
        } else {
          setDisableButton(false);
          setSeverity("error");
          setSnackbarMessage("Nie udało się dodać spółki.");
          setConfirmationOpen(true);
        }
      },
    }
  );

  const submitFunction = (formData) => {
    setDisableButton(true);
    mutationPostNewCompany.mutate(formData);
  };

  return (
    <>
      <div>
        <Form id="newCompanyForm" onSubmit={handleSubmit(submitFunction)}>
          <fieldset disabled={isSubmitting || mutationPostNewCompany.isLoading}>
            <Form.Group>
              <Form.Label htmlFor="name">Nazwa *</Form.Label>
              <FormControl
                type="text"
                id="nameInput"
                defaultValue=""
                placeholder="Podaj nazwę nowej spółki"
                {...register("name", { required: true, maxLength: 50 })}
                highlighted={!watchAllFields.name}
                error={errors.name}
              />
              {errors.name?.type === "maxLength" && (
                <FormInputErrorMessage errorMessage="Nazwa nie może być dłuższa niż 50 znaków" />
              )}
              {errors.name?.type === "required" && (
                <FormInputErrorMessage errorMessage="Nazwa jest wymagana" />
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="acronym">Akronim *</Form.Label>
              <FormControl
                type="text"
                id="acronymInput"
                defaultValue=""
                placeholder="Podaj akronim nowej spółki"
                {...register("acronym", { required: true, maxLength: 5 })}
                highlighted={!watchAllFields.acronym}
                error={errors.acronym}
              />
              {errors.acronym?.type === "maxLength" && (
                <FormInputErrorMessage errorMessage="Akronim nie może być dłuższy niż 5 znaków" />
              )}
              {errors.acronym?.type === "required" && (
                <FormInputErrorMessage errorMessage="Akronim jest wymagany" />
              )}
            </Form.Group>
          </fieldset>
          <div className="mt-4 mb-3">
            <Button
              id="addCompanyButton"
              mr
              variant="primary"
              type="submit"
              disabled={
                !isValid ||
                isSubmitting ||
                mutationPostNewCompany.isLoading ||
                disableButton
              }
            >
              Dodaj spółkę
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
