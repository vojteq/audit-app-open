import { InfoContainerFlex, InfoLabel, InfoValue } from "./styled";

export default function InfoFlex({ label, value, highlighted }) {
  return (
    <InfoContainerFlex highlighted={highlighted}>
      <InfoLabel>{label}</InfoLabel>
      <InfoValue>{value}</InfoValue>
    </InfoContainerFlex>
  );
}
