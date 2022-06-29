import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const RaportReminderContainer = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid orange;
  border-radius: 5px;
  padding: 1em;
  margin: 2em 0;
`;

export const RaportReminder = styled.h4`
  margin: 0;
`;

export default function InfoBanner({ text, linkUrl, linkText }) {
  return (
    <RaportReminderContainer>
      <FontAwesomeIcon
        style={{ color: "orange", marginRight: "0.5em", fontSize: "32px" }}
        icon={faExclamationCircle}
      />
      <RaportReminder>
        {text}
        {!!linkUrl ? <a href={linkUrl}>{linkText}</a> : null}
      </RaportReminder>
    </RaportReminderContainer>
  );
}
