import { Button } from "../buttons/Button";
import { useConfirmationModalContext } from "./modalConfirmationContext";

export default function ConfirmationButton({
  id,
  modalTitle,
  modalText,
  modalButtonText,
  variant,
  mr,
  ...props
}) {
  const modalContext = useConfirmationModalContext();

  const handleOnClick = async () => {
    modalContext.setModalTitle(modalTitle || "Potwierdzenie");
    modalContext.setModalText(modalText || "Czy na pewno chcesz to zrobić?");
    modalContext.setModalButtonText(modalButtonText || "Tak, potwierdź");
    const result = await modalContext.showConfirmation();
    result && props.onClick();
  };

  return (
    <Button
      id={id}
      onClick={handleOnClick}
      disabled={props.disabled}
      variant={variant}
      mr={mr}
    >
      {props.children}
    </Button>
  );
}
