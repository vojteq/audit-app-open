import { Link } from "react-router-dom";
import {
  Header,
  HeaderContainer,
  PageContainer,
  TableViewContainer,
} from "../../styled";
import { ButtonPlusSign } from "../buttons/iconButtons/ButtonPlusSign";
import { TableCompanies } from "./TableCompanies";
import { SectionContainer, TableContainer } from "../../styled/containers";

export default function CompaniesPage() {
  return (
    <PageContainer>
      <TableViewContainer>
        <SectionContainer>
          <HeaderContainer>
            <Header>Spółki</Header>
            <Link to="/spółki/dodaj">
              <ButtonPlusSign id="addCompanyButton">
                Dodaj nową spółkę
              </ButtonPlusSign>
            </Link>
          </HeaderContainer>
        </SectionContainer>
        <TableContainer>
          <TableCompanies />
        </TableContainer>
      </TableViewContainer>
    </PageContainer>
  );
}
