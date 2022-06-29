import { Modal } from "react-bootstrap";
import { Button } from "../../../buttons/Button";

export default function FinishDateReminderModal({ show, onHide, props }) {
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
        <h4 style={{ marginBottom: 0 }}>Wyjście z trybu edycji</h4>
      </Modal.Header>
      <Modal.Body>
        <>
          <p>
            Uwaga! Zakończyłeś wszystkie kamienie milowe, ale nie podałeś daty
            raportu końcowego.
          </p>
          <p style={{ marginBottom: 0 }}>
            Aby zakończyć zadanie, podaj datę raportu końcowego.
          </p>
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={(e) => {
            e.preventDefault();
            onHide();
          }}
        >
          Zamknij
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
