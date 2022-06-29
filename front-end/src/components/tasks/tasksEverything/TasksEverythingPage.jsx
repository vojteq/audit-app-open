import {
  Header,
  HeaderContainer,
  PageContainer,
  TableViewContainer,
  ContainerCenter,
} from "../../../styled";
import Spinner from "../../loader";
import useTasksEverything from "../../../hooks/useTasksEverything";
import TableTasksEverything from "./TableTasksEverything";
import { SectionContainer, TableContainer } from "../../../styled/containers";

export default function TasksEverythingPage() {
  const { isLoading, isFetching, error, data: tasks } = useTasksEverything();

  return (
    <PageContainer>
      <TableViewContainer>
        <SectionContainer>
          <HeaderContainer>
            <Header>Baza zadań realizowanych w Grupie Towary</Header>
          </HeaderContainer>
        </SectionContainer>
        <TableContainer>
          {!!error ? (
            <div>Wystąpił błąd podczas ładowania danych.</div>
          ) : isLoading || isFetching ? (
            <ContainerCenter>
              <Spinner />
            </ContainerCenter>
          ) : !!tasks && tasks.length > 0 ? (
            <TableTasksEverything tasks={tasks} />
          ) : (
            <h6>Nie znaleziono żadnych zadań.</h6>
          )}
        </TableContainer>
      </TableViewContainer>
    </PageContainer>
  );
}
