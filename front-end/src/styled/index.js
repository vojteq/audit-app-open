import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProgressBar } from "react-bootstrap";
import { Form } from "react-bootstrap";

//pages and views
export const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 2em;
`;

const View = styled.div`
  display: grid;
  grid-template-columns: 12fr;
  grid-gap: 1.5em;
`;

export const FormViewContainer = styled(View)`
  margin-bottom: 32px;
  width: 95%;
  @media (${(props) => props.theme.breakpoints.up["sm"]}) {
    width: 500px;
  }
  @media (${(props) => props.theme.breakpoints.up["md"]}) {
    width: 650px;
  }
  @media (${(props) => props.theme.breakpoints.up["lg"]}) {
    width: 750px;
  }
`;

export const TableViewContainer = styled(View)`
  margin-bottom: 32px;
  width: 95%;
  @media (${(props) => props.theme.breakpoints.up["lg"]}) {
    width: 90%;
  }
  @media (${(props) => props.theme.breakpoints.up["xl"]}) {
    width: 85%;
  }
`;

export const TaskDetailsViewContainer = styled(View)`
  display: grid;
  grid-template-columns: 12fr;
  grid-gap: 1.5em;
  margin-bottom: 32px;
  width: 95%;
  @media (${(props) => props.theme.breakpoints.up["lg"]}) {
    width: 90%;
  }
  @media (${(props) => props.theme.breakpoints.up["xl"]}) {
    width: 85%;
  }
`;

export const ProfileViewContainer = styled(View)`
  margin-bottom: 32px;
  width: 95%;
  @media (${(props) => props.theme.breakpoints.up["lg"]}) {
    width: 90%;
  }
  @media (${(props) => props.theme.breakpoints.up["xl"]}) {
    width: 85%;
  }
`;

export const LoginViewContainer = styled.div`
  width: 95%;
  @media (${(props) => props.theme.breakpoints.up["sm"]}) {
    width: 500px;
  }
`;

export const ViewContainerFlexRow = styled.div`
  margin: 1em 0 1em 2em;
  display: flex;
  flex-direction: column;
`;

export const FormStyled = styled(Form)``;

export const FormGroup = styled(Form.Group)`
  margin: 1em 0 2em 0;
`;
//

export const Header = styled.h1`
  flex-grow: 1;
`;

export const PlanDataItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5em 0;
`;

//charts
export const ChartsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 2em 2em 0 0;
  flex-grow: 1;
  overflow: auto;
`;

export const PlanDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex-grow: 1;
  padding: 1em 0;
`;

export const ChartContainer = styled.div``;

export const YearPickerContainer = styled.div`
  width: 100px;
  text-align: left;
  margin-top: 0.5em;
`;

export const PieChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 300px;
  width: 600px;
  margin: 0 1em;
`;

export const ProgressChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 300px;
  width: 200px;
  margin: 0 1em;
`;
//

export const ChartTitle = styled.h5`
  margin-bottom: 2em;
  text-align: center;
`;

//tables
export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;

  tr {
    // border-right: 1px solid #dee2e6;
    // border-left: 1px solid #dee2e6;
    background-color: #fff;
  }

  tr:nth-child(even) {
    background-color: #f7f7f7;
  }

  th,
  td {
    margin: 0;
    padding: 0.5rem;
    // border-bottom: 1px solid #dee2e6;
    // border-right: 1px solid #dee2e6;
  }

  td {
    height: 1px;
  }

  th.searchBar {
    padding: 0 0 0 0;
    margin: 2em;
    text-align: left;
    background: #fff;
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  margin-left: 6px;
  font-size: 0.8em;
`;
//

//forms
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const FormHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 1em 0;
`;

export const ButtonsContainer = styled.div`
  margin: 0;
`;

export const NewPlanItemFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1em 0;
  flex-grow: 1;
`;

export const ContainerCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

//

//progress bar
export const ProgressBarHeader = styled.p`
  font-size: 2em;
`;

export const ProgressBarStyled = styled(ProgressBar)`
  height: 2em;
  margin: 0;
  padding: 0;
`;

export const ProgressBarSpan = styled.span`
  text-shadow: -0.3px -0.3px 0 #000;
  color: ${(props) => (props.lessThan55 ? "#000000" : "#FFFFFF")};
  // text-shadow: ${(props) =>
    props.lessThan55 ? "-0.4px -0.4px 0 #000" : ""};
  // color: ${(props) => (props.inMiddle ? "#000000" : "#FFFFFF")};
  position: absolute;
  left: 48%;
  bottom: 50%;
`;

export const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  // margin: -25px 0 0 -25px;
  margin: 1em;
  width: 50px;
  height: 50px;
  align-self: center;

  & .path {
    stroke: #802BFF;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export const SmallHeader = styled.p`
  font-size: 1.8em;
  font-weight: 600;
  margin-bottom: 0px;
`;

export const BorderedTrTop = styled.tr`
  box-shadow: inset 0 9px 0px -7px #802BFF, inset 9px 0 0px -7px #802BFF,
    inset -9px 0 0px -7px #802BFF;
  border-bottom: 0;
`;

export const BorderedTrBottom = styled.tr`
  box-shadow: inset 9px 0 0px -7px #802BFF, inset -9px 0 0px -7px #802BFF,
    inset 0 -9px 0px -7px #802BFF;
  border-top: 0;
`;
