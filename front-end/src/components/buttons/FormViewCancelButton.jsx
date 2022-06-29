import { useHistory } from "react-router";
import { Button } from "./Button";

export const FormViewCancelButton = (props) => {
  const history = useHistory();

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        history.goBack();
      }}
      variant="secondary"
      {...props}
    >
      Anuluj
    </Button>
  );
};
