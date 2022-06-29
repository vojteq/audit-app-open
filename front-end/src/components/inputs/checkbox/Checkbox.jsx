import styled from "styled-components";

const CheckboxContainer = styled.div`
  display: inline-block;
  margin-right: ${(props) => (props.mr ? "0.5em" : "0")};
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: ${(props) => (props.sm ? "13px" : "16px")};
  width: ${(props) => (props.sm ? "13px" : "16px")};
  background: ${(props) => (props.checked ? "#b1b1b1" : "#fff")};
  border-radius: 2px;
  transition: all 150ms;
  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid #b1b1b1;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px #f1f1f1;
  }

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

export default function Checkbox({ className, checked, sm, mr, ...props }) {
  return (
    <CheckboxContainer className={className} mr={mr}>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked} sm={sm}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  );
}
