import styled from "styled-components";
import { FormControl } from "../../../../styled/form-control";

const Container = styled.div`
  padding: 6px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background: #e9ecef;
`;

const Item = styled.p`
  margin: 0;
  padding: 6px 0;
  cursor: default;
`;

const ItemWithBorder = styled(Item)`
  border-bottom: 1px solid #ced4da;
`;

export default function ItemsList({ items }) {
  return (
    <>
      {!!items && items.length > 0 ? (
        <Container>
          {items.map((item, index) =>
            index < items.length - 1 ? (
              <ItemWithBorder>{item.planItemTitle}</ItemWithBorder>
            ) : (
              <Item>{item.planItemTitle}</Item>
            )
          )}
        </Container>
      ) : (
        <FormControl
          type="text"
          defaultValue="Brak"
          disabled="true"
        ></FormControl>
      )}
    </>
  );
}
