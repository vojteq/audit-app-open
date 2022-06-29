import { Form, Modal } from "react-bootstrap";
import { Button } from "../../buttons/Button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addCorrectedFinishDate } from "../../../services/TaskService";
import Spinner from "../../loader";
import FormInputErrorMessage from "../../utils/FormInputErrorMessage";
import { useConfirmationModalContext } from "../../utils/modalConfirmationContext";
import { ModalSpinnerContainer } from "./styled";

export default function CorrectedPlannedFinishDatePickerModal({
  show,
  onHide,
  plannedFinishDate,
  taskId,
  ...props
}) {
  const queryClient = useQueryClient();
  const modalContext = useConfirmationModalContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({ mode: "all" });

  const mutationAddCorrectedFinishDate = useMutation(
    (correctedFinishDate) => {
      return addCorrectedFinishDate(taskId, correctedFinishDate);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["taskDetails", taskId]);
        onHide();
      },
    }
  );

  const handleAddCorrectedFinishDate = (correctedFinishDate) => {
    mutationAddCorrectedFinishDate.mutate(correctedFinishDate);
  };

  const onSubmit = async ({ date }) => {
    onHide();
    modalContext.setModalTitle("Potwierdzenie");
    modalContext.setModalText(
      `Czy na pewno chcesz ustawić skorygowaną planowaną datę zakończenia zadania na ${new Date(
        date
      ).toLocaleDateString()}?`
    );
    modalContext.setModalButtonText("Tak, ustaw datę");
    const result = await modalContext.showConfirmation();
    result && handleAddCorrectedFinishDate(date);
  };

  const defaultDate = new Date(plannedFinishDate);
  defaultDate.setDate(defaultDate.getDate() + 1);

  return (
    <Modal
      {...props}
      size="md"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
      show={show}
    >
      <Modal.Header>
        <h4>Skorygowana data zakończenia zadania</h4>
      </Modal.Header>
      <Modal.Body>
        {mutationAddCorrectedFinishDate.isLoading ? (
          <ModalSpinnerContainer>
            <Spinner />
          </ModalSpinnerContainer>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label htmlFor="date">
                Wybierz skorygowaną datę zakończenia zadania
              </Form.Label>
              <Form.Control
                type="date"
                name="date"
                id="date"
                defaultValue={defaultDate.toISOString().substring(0, 10)}
                {...register("date", {
                  required: true,
                  validate: () => getValues("date") > plannedFinishDate,
                })}
              />
              {errors.date && errors.date.type === "required" && (
                <FormInputErrorMessage errorMessage="Data jest wymagana" />
              )}
              {errors.date && errors.date.type === "validate" && (
                <FormInputErrorMessage
                  errorMessage={`Skorygowana planowana data zakończenia musi być później niż planowana data zakończenia (${new Date(
                    plannedFinishDate
                  ).toLocaleDateString()}).`}
                />
              )}
            </Form.Group>
            <Button className="mr-3" variant="primary" type="submit">
              Ustaw datę
            </Button>
            <Button
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                onHide();
              }}
            >
              Anuluj
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}
