import { Form, Modal } from "react-bootstrap";
import { Button } from "../../buttons/Button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addFinishDate } from "../../../services/TaskService";
import Spinner from "../../loader";
import FormInputErrorMessage from "../../utils/FormInputErrorMessage";
import { useConfirmationModalContext } from "../../utils/modalConfirmationContext";
import { ModalSpinnerContainer } from "./styled";
import { useHistory } from "react-router";

export default function FinishDatePickerModal({
  show,
  onHide,
  startDate,
  plannedFinishDate,
  correctedPlannedFinishDate,
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

  const history = useHistory();

  const mutationAddFinishDate = useMutation(
    (finishDate) => {
      return addFinishDate(taskId, finishDate);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["taskDetails", taskId]);
        onHide();
        history.push(`/zadania/${taskId}`);
      },
    }
  );

  const handleAddFinishDate = (finishDate) => {
    mutationAddFinishDate.mutate(finishDate);
  };

  const onSubmit = async ({ date }) => {
    onHide();
    modalContext.setModalTitle("Potwierdzenie");
    modalContext.setModalText(
      `Czy na pewno chcesz ustawić datę raportu końcowego na ${new Date(
        date
      ).toLocaleDateString()}?`
    );
    modalContext.setModalWarningText(
      "UWAGA! Po ustawieniu daty raportu końcowego, zadanie zostanie oznaczone jako zrealizowane i nie będzie możliwości jego edycji."
    );
    modalContext.setModalButtonText("Tak, ustaw datę");
    const result = await modalContext.showConfirmation();
    result && handleAddFinishDate(date);
  };

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
        <h4>Data raportu końcowego</h4>
      </Modal.Header>
      <Modal.Body>
        {mutationAddFinishDate.isLoading ? (
          <ModalSpinnerContainer>
            <Spinner />
          </ModalSpinnerContainer>
        ) : (
          <>
            <Form.Label htmlFor="date">
              Wybierz datę raportu końcowego
            </Form.Label>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Form.Control
                  type="date"
                  name="date"
                  id="date"
                  defaultValue={
                    correctedPlannedFinishDate
                      ? correctedPlannedFinishDate
                      : plannedFinishDate
                  }
                  {...register("date", {
                    required: true,
                    validate: () => getValues("date") > startDate,
                  })}
                />
                {errors.date && errors.date.type === "required" && (
                  <FormInputErrorMessage errorMessage="Data jest wymagana" />
                )}
                {errors.date && errors.date.type === "validate" && (
                  <FormInputErrorMessage
                    errorMessage={`Data raportu końcowego musi być później niż data rozpoczęcia zadania (${new Date(
                      startDate
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
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
