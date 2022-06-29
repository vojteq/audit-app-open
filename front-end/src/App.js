import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Navigation from "./components/navigation/Navigation";
import TaskList from "./components/tasks/TaskList";
import EmployeesPage from "./components/employees/EmployeesPage";
import Plan from "./components/plan/Plan";
import Profile from "./components/profile/Profile";
import Login from "./components/auth/Login";
import NewPlanPage from "./components/plan/newPlan/NewPlanPage";
import { ProvideAuth } from "./components/auth/useAuth";
import PrivateRoute from "./components/utils/PrivateRoute";
import NewTaskPage from "./components/tasks/newTask/create/NewTaskPage";
import TaskDetails from "./components/tasks/taskDetails/TaskDetails";
import TaskRequestList from "./components/tasks/TaskRequestList";
import EditAndAcceptPage from "./components/tasks/newTask/editAndAccept/EditAndAcceptPage";
import AllTasksList from "./components/tasks/allTasks/AllTasksList";
import ConfirmationModalContextProvider from "./components/utils/modalConfirmationContext";
import UserTaskRequestsView from "./components/tasks/taskRequests/UserTaskRequestsView";
import AuthVerify from "./components/auth/AuthVerify";
import AddEmployeePage from "./components/employees/addEmployee/AddEmployeePage";
import TasksEverythingPage from "./components/tasks/tasksEverything/TasksEverythingPage";
import { managerRoles } from "./components/utils/ManagerRoles";
import { ThemeProvider } from "styled-components";
import { theme } from "./layout/theme/theme";
import TaskDetailsEditPage from "./components/tasks/taskDetails/TaskDetailsEditPage";
import ChangePasswordPage from "./components/profile/changePassword/ChangePasswordPage";
import CompaniesPage from "./components/companies/CompaniesPage";
import AddCompanyPage from "./components/companies/addCompany/AddCompanyPage";
import TeamPage from "./components/teams/TeamPage";
import AddTeamPage from "./components/teams/addTeam/AddTeamPage";
import StatisticsPage from "./components/statistics/StatisticsPage";
import RulesPage from "./components/rules/RulesPage";
import { createGlobalStyle } from "styled-components";
import EditEmployeePage from "./components/employees/editEmployee/EditEmployeePage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const GlobalStyle = createGlobalStyle`
  body {
    background: ${(props) =>
      props.theme.colors.bg.gray ? props.theme.colors.bg.gray : "#FFFFFF"};
  }
`;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ConfirmationModalContextProvider>
          <ProvideAuth>
            <AuthVerify>
              <Router>
                <div>
                  <GlobalStyle />
                  <Navigation />
                  <Switch>
                    <PrivateRoute exact path="/" roles="any">
                      <Redirect to="/twoje-zadania" />
                    </PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/plan"
                      roles={["ADMIN", "DIRECTOR"]}
                    >
                      <Plan />
                    </PrivateRoute>
                    <PrivateRoute exact path="/plan/nowy" roles={["ADMIN"]}>
                      <NewPlanPage />
                    </PrivateRoute>
                    <PrivateRoute path="/zadania/:id/edycja" roles="any">
                      <TaskDetails editable />
                    </PrivateRoute>
                    <PrivateRoute path="/zadania/:id" roles="any">
                      <TaskDetails />
                    </PrivateRoute>
                    <PrivateRoute path="/twoje-zadania" roles="any">
                      <TaskList />
                    </PrivateRoute>
                    <PrivateRoute path="/baza-zadan" roles="any">
                      <TasksEverythingPage />
                    </PrivateRoute>
                    <PrivateRoute path="/zadanie/nowe" roles="any">
                      <NewTaskPage />
                    </PrivateRoute>
                    <PrivateRoute
                      path="/edycjaZadania/:id"
                      roles="{['ADMIN', 'MANAGER']}"
                    >
                      <TaskDetailsEditPage />
                    </PrivateRoute>
                    <PrivateRoute
                      path="/zadania"
                      roles={["ADMIN", "DIRECTOR", ...managerRoles]}
                    >
                      <AllTasksList />
                    </PrivateRoute>
                    <PrivateRoute path="/statystyki" roles="any">
                      <StatisticsPage />
                    </PrivateRoute>
                    <PrivateRoute path="/wnioski" roles={["ADMIN"]}>
                      <TaskRequestList />
                    </PrivateRoute>
                    <PrivateRoute path="/wniosek/:id" roles={["ADMIN"]}>
                      <EditAndAcceptPage />
                    </PrivateRoute>
                    <PrivateRoute path="/twoje-wnioski" roles="any">
                      <UserTaskRequestsView />
                    </PrivateRoute>
                    <PrivateRoute
                      path="/pracownicy/edycja/:id"
                      roles={["ADMIN"]}
                    >
                      <EditEmployeePage />
                    </PrivateRoute>
                    <PrivateRoute path="/pracownicy/dodaj" roles={["ADMIN"]}>
                      <AddEmployeePage />
                    </PrivateRoute>
                    <PrivateRoute path="/pracownicy" roles={["ADMIN"]}>
                      <EmployeesPage />
                    </PrivateRoute>
                    <PrivateRoute path="/spółki/dodaj" roles={["ADMIN"]}>
                      <AddCompanyPage />
                    </PrivateRoute>
                    <PrivateRoute path="/spółki" roles={["ADMIN"]}>
                      <CompaniesPage />
                    </PrivateRoute>
                    <PrivateRoute path="/zespoły/dodaj" roles={["ADMIN"]}>
                      <AddTeamPage />
                    </PrivateRoute>
                    <PrivateRoute path="/zespoły" roles={["ADMIN"]}>
                      <TeamPage />
                    </PrivateRoute>
                    <PrivateRoute path="/profil/zmiana-hasla" roles="any">
                      <ChangePasswordPage />
                    </PrivateRoute>
                    <PrivateRoute path="/profil" roles="any">
                      <Profile />
                    </PrivateRoute>
                    <PrivateRoute path="/zasady" roles="any">
                      <RulesPage />
                    </PrivateRoute>
                    <Route path="/zaloguj">
                      <Login />
                    </Route>
                    <Route path="*">
                      <Redirect to="/" />
                    </Route>
                  </Switch>
                </div>
              </Router>
            </AuthVerify>
          </ProvideAuth>
        </ConfirmationModalContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
