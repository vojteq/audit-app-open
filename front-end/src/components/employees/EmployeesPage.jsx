import { Link } from "react-router-dom";
import {
  Header,
  HeaderContainer,
  PageContainer,
  TableViewContainer,
} from "../../styled";
import { ButtonPlusSign } from "../buttons/iconButtons/ButtonPlusSign";
import { TableEmployees } from "./TableEmployees";
import { SectionContainer, TableContainer } from "../../styled/containers";

export default function EmployeesPage() {
  return (
    <PageContainer>
      <TableViewContainer>
        <SectionContainer>
          <HeaderContainer>
            <Header>Pracownicy</Header>
            <Link to="/pracownicy/dodaj">
              <ButtonPlusSign id="addEmployeeButton">
                Dodaj nowego pracownika
              </ButtonPlusSign>
            </Link>
          </HeaderContainer>
        </SectionContainer>
        <TableContainer>
          <TableEmployees />
        </TableContainer>
      </TableViewContainer>
    </PageContainer>
  );
}
