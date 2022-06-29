import {ProgressBar} from "react-bootstrap";
import {ProgressBarStyled, ProgressBarHeader, ProgressBarSpan} from "../../styled"

export default function TaskProgress({percentageDone}) {
  return (
    <div>
        <ProgressBarStyled now={percentageDone} />
        <div style={{position:"relative", width:"100%", height:"100%"}}>
          <ProgressBarSpan lessThan55={percentageDone < 55}>{percentageDone}%</ProgressBarSpan>
        </div>
    </div>  
  )
}