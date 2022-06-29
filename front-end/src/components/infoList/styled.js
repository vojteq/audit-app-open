import styled from "styled-components";

const InfoParagraph = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
`;

export const InfoLabel = styled(InfoParagraph)`
  padding-left: 0.5em;
`;

export const InfoValue = styled(InfoParagraph)`
  padding-right: 0.5em;
  font-weight: bold;
`;

export const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: 4fr 4fr;
  grid-gap: 1em;
  padding: 0.5em;
  margin: 0.5em 0;
  border-color: ${(props) => (props.highlighted ? "orange" : "#f3f3f3")};
`;

export const InfoContainerFlex = styled.div`
  display: flex;
  gap: 0.5em;
  padding: 0.5em;
  margin: 0.5em 0;
  border: 2px solid #f3f3f3;
  border-radius: 10px;
  border-color: ${(props) => (props.highlighted ? "orange" : "#f3f3f3")};
`;

export const InfoListContainer = styled.div``;
