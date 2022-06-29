import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { LinkButton } from "../components/buttons/LinkButton";

const RaportReminderContainer = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid orange;
  border-radius: 5px;
  padding: 1em;
  margin: 1em 0;
`;

const RaportReminder = styled.h4`
  margin: 0;
`;

export default function InfoBannerWithButton({
  text,
  buttonOnClickFunction,
  buttonText,
}) {
  return (
    <RaportReminderContainer>
      <FontAwesomeIcon
        style={{ color: "orange", marginRight: "0.5em", fontSize: "32px" }}
        icon={faExclamationCircle}
      />
      <RaportReminder>
        {text}{" "}
        {!!buttonOnClickFunction && !!buttonText ? (
          <LinkButton onClick={buttonOnClickFunction}>{buttonText}</LinkButton>
        ) : null}
      </RaportReminder>
    </RaportReminderContainer>
  );
}
