import { Link } from "react-router-dom";
import { ButtonPenPaperIcon } from "../../buttons/iconButtons/ButtonPenPaperIcon";
import {
  HeaderContainer,
  Header,
  PageContainer,
  TableViewContainer,
} from "../../../styled";
import TableUserTaskRequests from "./TableUserTaskRequests";
import { SectionContainer, TableContainer } from "../../../styled/containers";

export default function UserTaskRequestsView() {
  return (
    <PageContainer>
      <TableViewContainer>
        <SectionContainer>
          <HeaderContainer>
            <Header id="yourRequests">Twoje wnioski</Header>
            <Link to="/zadanie/nowe">
              <ButtonPenPaperIcon id="openTaskRequestFormButton">
                Wypełnij wniosek o zadanie
              </ButtonPenPaperIcon>
            </Link>
          </HeaderContainer>
        </SectionContainer>
        <TableContainer>
          <TableUserTaskRequests />
        </TableContainer>
      </TableViewContainer>
    </PageContainer>
  );
}
