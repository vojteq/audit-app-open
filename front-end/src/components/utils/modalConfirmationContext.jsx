import { Modal } from "react-bootstrap";
import { Button } from "../buttons/Button";
import { useState, useRef, createContext, useContext } from "react";

const ConfirmationModalContext = createContext({});

const ConfirmationModalContextProvider = (props) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [modalTitle, setModalTitle] = useState("Potwierdzenie");
  const [modalWarningText, setModalWarningText] = useState("");
  const [modalText, setModalText] = useState("Czy na pewno chcesz to zrobić?");
  const [modalButtonText, setModalButtonText] = useState("Tak, potwierdź");

  const resolver = useRef();

  const handleShow = () => {
    setShowConfirmationModal(true);

    return new Promise(function (resolve) {
      resolver.current = resolve;
    });
  };

  const handleOk = () => {
    resolver.current && resolver.current(true);
    setShowConfirmationModal(false);
  };

  const handleCancel = () => {
    resolver.current && resolver.current(false);
    setShowConfirmationModal(false);
  };

  return (
    <ConfirmationModalContext.Provider
      value={{
        showConfirmation: handleShow,
        setModalTitle: setModalTitle,
        setModalText: setModalText,
        setModalButtonText: setModalButtonText,
        setModalWarningText: setModalWarningText,
      }}
    >
      {props.children}

      <Modal
        {...props}
        size="md"
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setShowConfirmationModal(false)}
        show={showConfirmationModal}
      >
        <Modal.Header>
          <h4>{modalTitle}</h4>
        </Modal.Header>
        <Modal.Body>
          <p>{modalText}</p>
          <p style={{ fontWeight: "bold" }}>{modalWarningText}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button id="modalConfirmButton" onClick={handleOk} mr>
            {modalButtonText}
          </Button>
          <Button
            id="modalCancelButton"
            variant="secondary"
            onClick={handleCancel}
          >
            Anuluj
          </Button>
        </Modal.Footer>
      </Modal>
    </ConfirmationModalContext.Provider>
  );
};

export const useConfirmationModalContext = () =>
  useContext(ConfirmationModalContext);
export default ConfirmationModalContextProvider;
