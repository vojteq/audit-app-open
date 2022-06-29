import {
  HeaderContainer,
  Header,
  PageContainer,
  TableViewContainer,
} from "../../styled";
import { Link } from "react-router-dom";
import { ButtonPenPaperIcon } from "../buttons/iconButtons/ButtonPenPaperIcon";
import TableTasks from "./TableTasks";
import { SectionContainer, TableContainer } from "../../styled/containers";

export default function TaskList() {
  return (
    <PageContainer>
      <TableViewContainer>
        <SectionContainer>
          <HeaderContainer>
            <Header>Twoje zadania</Header>
            <Link to="/zadanie/nowe">
              <ButtonPenPaperIcon>
                Wypełnij wniosek o zadanie
              </ButtonPenPaperIcon>
            </Link>
          </HeaderContainer>
        </SectionContainer>
        <TableContainer>
          <TableTasks />
        </TableContainer>
      </TableViewContainer>
    </PageContainer>
  );
}
