import {Button} from "react-bootstrap";

export default function SingleRowView({item, onChange, managed}) {

  const button = managed ? {
    name: "deleteButton",
    variant: "danger",
    text: "Usuń"
  } : {
    name: "addButton",
    variant: "success",
    text: "Dodaj"
  };

  return (
    <div
      className="d-flex justify-content-start align-items-center p-1"
      key={item.name}
    >
      {item.name}
      <Button
        name={button.name}
        className="ml-auto"
        variant={button.variant}
        onClick={() => onChange(item)}
      >
        {button.text}
      </Button>
    </div>
  );
}
