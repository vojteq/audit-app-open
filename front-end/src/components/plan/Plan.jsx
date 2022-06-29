import {
  ProgressChartContainer,
  ChartsContainer,
  PieChartContainer,
  PlanDataContainer,
  PlanDataItemContainer,
  NewPlanItemFormContainer,
  HeaderContainer,
  ChartTitle,
  ChartContainer,
  PageContainer,
  TableViewContainer,
  ContainerCenter,
} from "../../styled";
import { TablePlan } from "./TablePlan";
import { useEffect, useState } from "react";
import PlanStatisticsChartGenerator from "./PlanStatisticsChartGenerator";
import PlanProgressChartGenerator from "./PlanProgressChartGenerator";
import { Form } from "react-bootstrap";
import { Button } from "../buttons/Button";
import "react-circular-progressbar/dist/styles.css";
import { useMutation, useQueryClient } from "react-query";
import NewPlanItemForm from "./NewPlanItemForm";
import { Container, Header } from "../../styled";
import { Link, useHistory } from "react-router-dom";
import Spinner from "../loader";
import { usePlanSummary } from "../../hooks";
import useTeams from "../../hooks/useTeams";
import usePlanItemsToMove from "../../hooks/usePlanItemsToMove";
import { moveTasks } from "../../services/PlanService";
import InfoBannerWithButton from "../../styled/info-banner-with-button";
import CustomSnackbar from "../snackbar/CustomSnackbar";
import usePlanDropdownInfo from "../../hooks/usePlanDropdownInfo";
import { LinkButton } from "../buttons/LinkButton";
import QuarterReportDownloadSection from "./quarterReportDownload/QuarterReportDownloadSection";
import { SectionContainer, TableContainer } from "../../styled/containers";

export default function Plan() {
  const queryClient = useQueryClient();

  const [year, setYear] = useState(Number(new Date().getFullYear()));
  const [formVisible, setFormVisible] = useState(true);
  const [planSummary, setPlanSummary] = useState(null);
  const [viewedTeamId, setViewedTeamId] = useState(-1);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const hideForm = () => {
    setFormVisible(false);
  };

  const {
    isLoading: isLoadingDropdownInfo,
    isFetching: isFetchingDropdownInfo,
    error: errorDropdownInfo,
    data: dropdownInfo,
  } = usePlanDropdownInfo();
  const {
    isLoading: isLoadingTeams,
    isFetching: isFetchingTeams,
    error: errorTeams,
    data: teams,
  } = useTeams();
  const {
    isLoading: isLoadingSummary,
    isFetching: isFetchingSummary,
    error: errorSummary,
    data: apiResponseSummary,
  } = usePlanSummary(year, viewedTeamId);
  const {
    isLoading: isLoadingPlanItemsToMove,
    isFetching: isFetchingPlanItemsToMove,
    error: errorPlanItemsToMove,
    data: planItemsToMove,
  } = usePlanItemsToMove(viewedTeamId, year);

  const history = useHistory();

  const planExists = (year, teamId) => {
    if (!year || !teamId) {
      return false;
    }

    if (
      !!dropdownInfo &&
      !!dropdownInfo.yearsWithPlan &&
      Object.keys(dropdownInfo.yearsWithPlan).includes(year.toString()) &&
      dropdownInfo.yearsWithPlan[year.toString()].some(
        (team) => team.teamId === teamId
      )
    ) {
      return true;
    }
    return false;
  };

  const viewedTeam =
    !!teams && teams.length > 0
      ? teams.find((team) => team.id === viewedTeamId)
      : null;
  const viewedTeamName = !!viewedTeam ? viewedTeam.name : null;

  useEffect(() => {
    setPlanSummary(apiResponseSummary);
  }, [apiResponseSummary]);

  useEffect(() => {
    queryClient.invalidateQueries(["planSummary", year, viewedTeamId]);
  }, [year, viewedTeamId, queryClient]);

  const yearChange = (e) => {
    setYear(e.target.value);
  };

  const teamChange = (e) => {
    setViewedTeamId(Number(e.target.value));
  };

  useEffect(() => {
    if (!!teams && teams.length > 0 && viewedTeamId === -1) {
      setViewedTeamId(teams[0].id);
    }
  }, [teams, viewedTeamId]);

  const mutationMoveTasks = useMutation(
    (planId) => {
      return moveTasks(planId);
    },
    {
      onSuccess: () => {
        setSnackbarOpen(true);
        setSnackbarMessage(
          "Pozycje planu oraz powiązane z nimi zadania zostały przeniesione."
        );
        setSeverity("success");

        queryClient.invalidateQueries("planItemsToMove");
        queryClient.invalidateQueries("planItems", planSummary?.id);
        queryClient.invalidateQueries("planSummary");
        queryClient.invalidateQueries(["planItemsToMove", viewedTeamId, year]);
      },
      onError: () => {
        setSeverity("error");
        setSnackbarMessage(
          "Nie udało się przenieść pozycji planu i powiązanych z nimi zadań. Spróbuj ponownie."
        );
        setSnackbarOpen(true);
      },
    }
  );

  const moveTasksFromPreviousYear = (planId) => {
    mutationMoveTasks.mutate(planId);
  };

  if (errorDropdownInfo) {
    return (
      <PageContainer>
        <TableViewContainer>
          <SectionContainer>
            <HeaderContainer>
              <Header>Plan Audytu i Kontroli</Header>
              <Link to="/plan/nowy">
                <Button>Utwórz nowy plan</Button>
              </Link>
            </HeaderContainer>
            <div>Wystąpił błąd podczas ładowania danych.</div>
          </SectionContainer>
        </TableViewContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <TableViewContainer>
        <SectionContainer>
          <HeaderContainer>
            <Header>Plan Audytu i Kontroli</Header>
            <Link to="/plan/nowy">
              <Button>Utwórz nowy plan</Button>
            </Link>
          </HeaderContainer>
        </SectionContainer>
        {!!planItemsToMove &&
        planItemsToMove.length > 0 &&
        !!planSummary &&
        planExists(year, viewedTeamId) ? (
          <SectionContainer>
            <InfoBannerWithButton
              text={`Uwaga! Masz ${planItemsToMove.length} nieukończonych pozycji planu do przeniesienia z poprzedniego roku.`}
              buttonOnClickFunction={() =>
                moveTasksFromPreviousYear(planSummary.id)
              }
              buttonText="Przenieś zadania"
            />
          </SectionContainer>
        ) : null}

        <div style={{ display: "flex", gap: "2em", flexWrap: "wrap" }}>
          <SectionContainer>
            <PlanDataContainer>
              <Container>
                <PlanDataItemContainer>
                  <h4 style={{ marginRight: "0.5em", marginBottom: "0" }}>
                    Rok:
                  </h4>
                  {isLoadingDropdownInfo || isFetchingDropdownInfo ? (
                    <Spinner />
                  ) : (
                    <div style={{ width: "90px" }}>
                      <Form.Control
                        onChange={yearChange}
                        as="select"
                        defaultValue={year}
                        style={{ fontWeight: "bold" }}
                      >
                        {!!dropdownInfo && !!dropdownInfo.yearsWithPlan
                          ? Object.keys(dropdownInfo.yearsWithPlan)
                              .sort()
                              .reverse()
                              .map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))
                          : null}
                      </Form.Control>
                    </div>
                  )}
                </PlanDataItemContainer>
                <PlanDataItemContainer>
                  <>
                    <h4 style={{ marginRight: "0.5em", marginBottom: "0" }}>
                      Zespół:
                    </h4>
                    {isLoadingDropdownInfo ||
                    isFetchingDropdownInfo ||
                    isLoadingTeams ||
                    isFetchingTeams ||
                    !teams ? (
                      <Spinner />
                    ) : (
                      <>
                        {teams.length === 1 ? (
                          " " + planSummary?.auditingTeam?.name
                        ) : (
                          <div style={{ width: "290px" }}>
                            <Form.Control
                              onChange={teamChange}
                              as="select"
                              defaultValue={viewedTeamId}
                              style={{ fontWeight: "bold" }}
                            >
                              {teams.map((team) => {
                                return (
                                  <option value={team.id}>{team.name}</option>
                                );
                              })}
                            </Form.Control>
                          </div>
                        )}
                      </>
                    )}
                  </>
                </PlanDataItemContainer>
              </Container>
            </PlanDataContainer>
          </SectionContainer>

          {!!year &&
          !!viewedTeamId &&
          viewedTeamId > 0 &&
          planExists(year, viewedTeamId) ? (
            <SectionContainer style={{ flexGrow: 1 }}>
              <ChartsContainer>
                <ChartContainer>
                  <ChartTitle>Status zadań</ChartTitle>
                  <PieChartContainer>
                    {isLoadingSummary || isFetchingSummary || !planSummary ? (
                      <Spinner />
                    ) : (
                      <PlanStatisticsChartGenerator planId={planSummary.id} />
                    )}
                  </PieChartContainer>
                </ChartContainer>
                <ChartContainer>
                  <ChartTitle>Stopień realizacji</ChartTitle>
                  <ProgressChartContainer>
                    {isLoadingSummary || isFetchingSummary || !planSummary ? (
                      <Spinner />
                    ) : (
                      <PlanProgressChartGenerator planId={planSummary.id} />
                    )}
                  </ProgressChartContainer>
                </ChartContainer>
              </ChartsContainer>
            </SectionContainer>
          ) : null}
        </div>

        {!!year &&
        !!viewedTeamId &&
        viewedTeamId > 0 &&
        planExists(year, viewedTeamId) ? (
          <>
            <div
              style={{
                display: "flex",
                gap: "1.5em",
                flexWrap: "wrap",
              }}
            >
              <SectionContainer style={{ flexGrow: 1 }}>
                <NewPlanItemFormContainer>
                  {!formVisible && (
                    <Button
                      disabled={
                        isLoadingSummary || isFetchingSummary || !planSummary
                      }
                      onClick={() => setFormVisible(true)}
                    >
                      Dodaj pozycję planu
                    </Button>
                  )}
                  {formVisible && planSummary?.id && (
                    <NewPlanItemForm
                      planId={planSummary?.id}
                      onCancel={hideForm}
                      onSuccess={hideForm}
                    />
                  )}
                </NewPlanItemFormContainer>
              </SectionContainer>
              <SectionContainer style={{ flexGrow: 1 }}>
                <NewPlanItemFormContainer>
                  <QuarterReportDownloadSection
                    planId={planSummary?.id}
                    year={year}
                  />
                </NewPlanItemFormContainer>
              </SectionContainer>
            </div>

            {planSummary?.id ? (
              <TableContainer>
                <h4 style={{ marginBottom: "1em" }}>Pozycje planu</h4>
                <TablePlan planId={planSummary.id} />
              </TableContainer>
            ) : (
              <ContainerCenter>
                <Spinner />
              </ContainerCenter>
            )}
          </>
        ) : !!teams &&
          teams.length > 0 &&
          !!viewedTeamId &&
          !!year &&
          Number(year) >= Number(new Date().getFullYear()) ? (
          <h6 style={{ marginTop: "2em" }}>
            Nie znaleziono planu dla zespołu <b>{viewedTeamName}</b> na wybrany
            rok <b>{year}</b>. Zmień parametry wyszukiwania lub{" "}
            <LinkButton
              onClick={(e) => {
                e.preventDefault();
                history.push(`/plan/nowy?t=${viewedTeamId}&y=${year}`);
              }}
            >
              utwórz plan dla tej spółki
            </LinkButton>
            .
          </h6>
        ) : (
          <h6 style={{ marginTop: "2em" }}>
            Nie znaleziono planu dla wybranego zespołu na wybrany rok. Zmień
            parametry wyszukiwania lub utwórz plan dla tej spółki.
          </h6>
        )}

        <CustomSnackbar
          severity={severity}
          message={snackbarMessage}
          isOpen={snackbarOpen}
          setIsOpen={setSnackbarOpen}
          timeout={3000}
        />
      </TableViewContainer>
    </PageContainer>
  );
}
