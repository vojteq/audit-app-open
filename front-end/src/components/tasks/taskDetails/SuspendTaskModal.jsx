import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router";
import styled from "styled-components";
import { setSuspend } from "../../../services/TaskService";
import { Button } from "../../buttons/Button";
import Spinner from "../../loader";
import FormInputErrorMessage from "../../utils/FormInputErrorMessage";
import { useConfirmationModalContext } from "../../utils/modalConfirmationContext";
import { ModalSpinnerContainer } from "./styled";

export default function SuspendTaskModal({
  show,
  onHide,
  taskId,
  isSuspended,
  ...props
}) {
  const queryClient = useQueryClient();
  const modalContext = useConfirmationModalContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({ mode: "all" });

  let history = useHistory();

  const mutationSetSuspend = useMutation(
    (reason) => {
      return setSuspend(taskId, !isSuspended, reason);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["taskDetails", taskId]);
        onHide();
        isSuspended
          ? history.push(`/zadania/${taskId}/edycja`)
          : history.push(`/zadania/${taskId}`);
      },
    }
  );

  const handleSetSuspend = (reason) => {
    mutationSetSuspend.mutate(reason);
  };

  const promptConfirmationModal = async () => {
    onHide();
    modalContext.setModalTitle("Potwierdzenie");
    modalContext.setModalText(
      `Czy na pewno chcesz ${isSuspended ? "odwiesić" : "zawiesić"} zadanie?`
    );
    modalContext.setModalButtonText(
      `Tak, ${isSuspended ? "odwieś" : "zawieś"} zadanie`
    );
    return modalContext.showConfirmation();
  };

  const onSubmit = async (formData) => {
    const result = await promptConfirmationModal();
    result && handleSetSuspend(formData?.reason);
  };

  if (isSuspended && show) {
    onSubmit(null);
    return <></>;
  }

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
        <h4>Zawieszenie zadania</h4>
      </Modal.Header>
      <Modal.Body>
        {mutationSetSuspend.isLoading ? (
          <ModalSpinnerContainer>
            <Spinner />
          </ModalSpinnerContainer>
        ) : (
          <>
            <Form.Label htmlFor="text">
              Podaj powód zawieszenia zadania
            </Form.Label>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="reason"
                  id="reason"
                  {...register("reason", {
                    required: true,
                  })}
                />
                {errors.reason && (
                  <FormInputErrorMessage errorMessage="Powód jest wymagany" />
                )}
              </Form.Group>
              <Button className="mr-3" variant="primary" type="submit">
                Zawieś zadanie
              </Button>
              <Button
                variant="secondary"
                onClick={(e) => {
                  setValue("reason", "");
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
