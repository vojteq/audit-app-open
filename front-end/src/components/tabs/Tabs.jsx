import styled from "styled-components";
import Tab from "./Tab";

const Container = styled.div`
  width: 100%;
  display: flex;
  border-radius: 4px;
  -webkit-box-shadow: 0px 5px 15px -8px rgba(181, 182, 187, 1);
  -moz-box-shadow: 0px 5px 15px -8px rgba(181, 182, 187, 1);
  box-shadow: 0px 5px 15px -8px rgba(181, 182, 187, 1);
`;

const List = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  width: 100%;
`;

export default function Tabs({ tabs, currentIndex, setCurrentIndex }) {
  return (
    <Container>
      <List>
        {!!tabs
          ? tabs.map((tab, index) => (
              <Tab
                key={tab.path}
                path={tab.path}
                label={tab.label}
                index={index}
                setIndex={setCurrentIndex}
                isSelected={index === currentIndex}
              />
            ))
          : null}
      </List>
    </Container>
  );
}
