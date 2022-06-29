import { Form } from "react-bootstrap";
import Spinner from "../../../loader";
import ItemsList from "./ItemsList";

export default function ItemsToMove({ itemsToMove, isLoading, year }) {
  return (
    <Form.Group>
      {!!year ? (
        <Form.Label htmlFor="year">
          Pozycje planu (wraz z powiązanymi zadaniami) z roku {year - 1} które
          zostaną przeniesione do nowego planu
        </Form.Label>
      ) : (
        <Form.Label htmlFor="year">
          Pozycje planu (wraz z powiązanymi zadaniami) które zostaną
          przeniesione do nowego planu
        </Form.Label>
      )}

      {isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <ItemsList items={itemsToMove} />
      )}
    </Form.Group>
  );
}
