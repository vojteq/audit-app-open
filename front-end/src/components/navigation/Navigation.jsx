import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../auth/useAuth";
import { managerRoles } from "../utils/ManagerRoles";

const DropdownItem = styled(NavDropdown.Item)`
  padding: 0;
`;

export default function Navigation() {
  const auth = useAuth();

  if (!auth.user) {
    return <div></div>;
  }

  const hasManagerRole = auth.user.roles.some((r) => managerRoles.includes(r));
  const hasAdminRole = auth.user.roles.includes("ADMIN");
  const hasDirectorRole = auth.user.roles.includes("DIRECTOR");

  const StyledNavbar = styled(Navbar)`
    -webkit-box-shadow: 0px 3px 15px -12px rgba(117, 117, 119, 1);
    -moz-box-shadow: 0px 3px 15px -12px rgba(117, 117, 119, 1);
    box-shadow: 0px 3px 15px -12px rgba(117, 117, 119, 1);
  `;

  return (
    <StyledNavbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/zadania">
        Audit-App
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown id={"execution"} title={"Realizacja zadań"}>
            <DropdownItem style={{ padding: "0" }} id="yourTasksLink">
              <Nav.Link as={Link} to="/twoje-zadania">
                Twoje zadania
              </Nav.Link>
            </DropdownItem>
            <DropdownItem id="yourRequestsLink">
              <Nav.Link as={Link} to="/twoje-wnioski">
                Twoje wnioski
              </Nav.Link>
            </DropdownItem>
            {hasAdminRole && (
              <DropdownItem id="allRequestsLink">
                <Nav.Link as={Link} to="/wnioski">
                  Wszystkie wnioski
                </Nav.Link>
              </DropdownItem>
            )}
          </NavDropdown>

          <NavDropdown id={"monitoring"} title={"Monitoring"}>
            {(hasAdminRole || hasManagerRole || hasDirectorRole) && (
              <DropdownItem id="allTasksLink">
                <Nav.Link as={Link} to="/zadania">
                  Zadania
                </Nav.Link>
              </DropdownItem>
            )}
            <DropdownItem id="statisticsLink">
              <Nav.Link as={Link} to="/statystyki">
                Statystyki
              </Nav.Link>
            </DropdownItem>
          </NavDropdown>

          {(hasAdminRole || hasDirectorRole) && (
            <Nav.Link as={Link} to="/plan" id="planLink">
              Plan
            </Nav.Link>
          )}

          <Nav.Link as={Link} to="/baza-zadan" id="tasksBaseLink">
            Baza zadań
          </Nav.Link>

          {hasAdminRole && (
            <NavDropdown id={"management"} title={"Zarządzanie"}>
              <DropdownItem id={"employees"}>
                <Nav.Link as={Link} to="/pracownicy">
                  Pracownicy
                </Nav.Link>
              </DropdownItem>
              <DropdownItem id={"companies"}>
                <Nav.Link as={Link} to="/spółki">
                  Spółki
                </Nav.Link>
              </DropdownItem>
              <DropdownItem id={"teams"}>
                <Nav.Link as={Link} to="/zespoły">
                  Zespoły
                </Nav.Link>
              </DropdownItem>
            </NavDropdown>
          )}
        </Nav>
        {auth.user && (
          <Nav className="justify-content-end">
            <p style={{ alignSelf: "center", margin: "0 1em 0 0" }}>
              Witaj, {auth.user.name}!
            </p>
            <Nav.Link as={Link} to="/profil" id="profileLink">
              Profil
            </Nav.Link>
            <Nav.Link as={Link} to="/zasady" id="rulesLink">
              Zasady i założenia
            </Nav.Link>
            <Nav.Link as={Link} onClick={() => auth.logout()} id="logOutLink">
              Wyloguj
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </StyledNavbar>
  );
}
