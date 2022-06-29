import Info from "./Info";
import { InfoListContainer } from "./styled";

export default function InfoList({ elements }) {
  return (
    <InfoListContainer>
      {!!elements && elements.length > 0
        ? elements.map(({ label, value, highlighted }) => (
            <Info label={label} value={value} highlighted={highlighted} />
          ))
        : null}
    </InfoListContainer>
  );
}
