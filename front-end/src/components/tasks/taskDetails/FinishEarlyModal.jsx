import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router";
import styled from "styled-components";
import { addFinishDate } from "../../../services/TaskService";
import { Button } from "../../buttons/Button";
import Spinner from "../../loader";
import FormInputErrorMessage from "../../utils/FormInputErrorMessage";
import { useConfirmationModalContext } from "../../utils/modalConfirmationContext";
import { ModalSpinnerContainer } from "./styled";

export default function FinishEarlyModal({
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

  let history = useHistory();

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
      `Czy na pewno chcesz zakończyć zadanie z datą ${new Date(
        date
      ).toLocaleDateString()}, przed ukończeniem wszystkich
      kamieni milowych?`
    );
    modalContext.setModalButtonText("Tak, zakończ zadanie");
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
        <h4>Zakończenie zadania przed czasem</h4>
      </Modal.Header>
      <Modal.Body>
        {mutationAddFinishDate.isLoading ? (
          <ModalSpinnerContainer>
            <Spinner />
          </ModalSpinnerContainer>
        ) : (
          <>
            <Form.Label htmlFor="date">
              Wybierz datę zakończenia zadania
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
                    errorMessage={`Data zakończenia zadania musi być później niż data rozpoczęcia zadania (${new Date(
                      startDate
                    ).toLocaleDateString()}).`}
                  />
                )}
              </Form.Group>
              <Button className="mr-3" variant="primary" type="submit">
                Zakończ zadanie
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
