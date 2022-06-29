import { InfoContainer, InfoLabel, InfoValue } from "./styled";

export default function Info({ label, value, highlighted }) {
  return (
    <InfoContainer highlighted={highlighted}>
      <InfoLabel>{label}</InfoLabel>
      <InfoValue>{value}</InfoValue>
    </InfoContainer>
  );
}
