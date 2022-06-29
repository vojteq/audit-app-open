import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default function CustomSnackbar(props) {
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleConfirmationClose = () => {
    props.setIsOpen(false);
  };

  return (
    <Snackbar
      open={props.isOpen}
      autoHideDuration={props.timeout || 2000}
      onClose={handleConfirmationClose}
    >
      <Alert
        style={{
          height: "60px",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClose={handleConfirmationClose}
        severity={props.severity}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
}
