import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "../buttons/Button";
import { useForm } from "react-hook-form";
import { Container } from "../../styled";
import { FormStyled, FormGroup } from "../../styled";
import { useMutation, useQueryClient } from "react-query";
import FormInputErrorMessage from "../utils/FormInputErrorMessage";
import { addPlanItem } from "../../services/PlanService";
import CustomSnackbar from "../snackbar/CustomSnackbar";

export default function NewPlanItemForm({ planId, onCancel, onSuccess }) {
  const [alertOpen, setAlertOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: "all" });

  const mutationAddPlanItem = useMutation(
    (formData) => {
      const planItem = {
        planId: planId,
        planItemTitle: formData.planItemTitle,
      };
      return addPlanItem(planItem);
    },
    {
      onSuccess: () => {
        setAlertOpen(true);
        queryClient.invalidateQueries("planItems");
        queryClient.invalidateQueries("planStatistics");
        queryClient.invalidateQueries("planStatistics2");
      },
    }
  );

  const handleAddPlanItem = async (formData) => {
    reset();
    mutationAddPlanItem.mutate(formData);
  };

  return (
    <Container>
      <div>
        <h3>Dodaj nową pozycję do planu</h3>
      </div>
      <div>
        <FormStyled onSubmit={handleSubmit(handleAddPlanItem)}>
          <FormGroup>
            <Form.Label htmlFor="planItemTitle">Nazwa pozycji planu</Form.Label>
            <Form.Control
              type="text"
              name="planItemTitle"
              defaultValue=""
              placeholder="Podaj nazwę pozycji planu"
              {...register("planItemTitle", { required: true, maxLength: 100 })}
            />
            {errors.planItemTitle?.type === "maxLength" && (
              <FormInputErrorMessage errorMessage="Długość nazwy pozycji planu nie może być dłuższa niż 100 znaków" />
            )}
            {errors.planItemTitle?.type === "required" && (
              <FormInputErrorMessage errorMessage="Nazwa pozycji planu jest wymagana" />
            )}
          </FormGroup>
          <Button mr variant="primary" type="submit">
            Dodaj pozycję planu
          </Button>
          {/* <Button onClick={() => onCancel()} variant="secondary">
            Anuluj
          </Button> */}
        </FormStyled>
      </div>
      <CustomSnackbar
        isOpen={alertOpen}
        setIsOpen={setAlertOpen}
        severity="success"
        message="Pozycja planu została dodana pomyślnie."
      />
    </Container>
  );
}
