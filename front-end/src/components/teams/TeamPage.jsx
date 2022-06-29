import { Link } from "react-router-dom";
import {
  Header,
  HeaderContainer,
  PageContainer,
  TableViewContainer,
} from "../../styled";
import { ButtonPlusSign } from "../buttons/iconButtons/ButtonPlusSign";
import { TableTeams } from "./TableTeams";
import { SectionContainer, TableContainer } from "../../styled/containers";

export default function TeamPage() {
  return (
    <PageContainer>
      <TableViewContainer>
        <SectionContainer>
          <HeaderContainer>
            <Header>Zespoły</Header>
            <Link to="/zespoły/dodaj">
              <ButtonPlusSign id="addTeamButton">
                Dodaj nowy zespół
              </ButtonPlusSign>
            </Link>
          </HeaderContainer>
        </SectionContainer>
        <TableContainer>
          <TableTeams />
        </TableContainer>
      </TableViewContainer>
    </PageContainer>
  );
}
