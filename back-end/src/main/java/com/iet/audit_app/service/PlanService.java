package com.iet.audit_app.service;

import com.iet.audit_app.model.dto.common.TeamsAndYearsWithPlanDTO;
import com.iet.audit_app.model.dto.plan.PlanCreateDTO;
import com.iet.audit_app.model.dto.plan.PlanDTO;
import com.iet.audit_app.model.dto.plan.PlanStatisticsDTO;
import com.iet.audit_app.model.dto.plan_item.PlanItemInfoDTO;
import com.iet.audit_app.model.dto.team.TeamInfoReducedDTO;
import com.iet.audit_app.model.entity.Employee;
import com.iet.audit_app.model.entity.Plan;
import com.iet.audit_app.model.entity.PlanItem;
import com.iet.audit_app.model.entity.Task;
import com.iet.audit_app.model.entity.Team;
import com.iet.audit_app.model.enums.TaskStatus;
import com.iet.audit_app.repository.PlanRepository;
import com.iet.audit_app.security.RoleValidator;
import com.iet.audit_app.service.task.TaskService;
import javassist.tools.reflect.CannotCreateException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class PlanService {

    private final PlanRepository planRepository;

    private final TeamService teamService;

    private final EmployeeService employeeService;

    private final PlanItemService planItemService;

    private final RoleValidator roleValidator;

    private final TaskService taskService;

    private static final int YEAR_INTERVAL = 5;

    private final Logger logger = LogManager.getLogger(PlanService.class);

    @Autowired
    public PlanService(
            PlanRepository planRepository,
            TeamService teamService,
            EmployeeService employeeService,
            PlanItemService planItemService,
            RoleValidator roleValidator,
            TaskService taskService
    ) {
        this.planRepository = planRepository;
        this.teamService = teamService;
        this.employeeService = employeeService;
        this.planItemService = planItemService;
        this.roleValidator = roleValidator;
        this.taskService = taskService;
    }

    public Plan getPlanForYearForUser(Year year, long taskManagerId) throws NoSuchElementException {
        Employee employee = employeeService.getEmployeeById(taskManagerId);
        return getPlanForTeamAndYear(employee.getTeam()
                .getId(), year);
    }

    public List<Plan> getPlansByTeamId(long teamId) {
        return planRepository.getPlansByAuditingTeamId(teamId);
    }

    public PlanDTO createPlan(PlanCreateDTO planCreateDTO) throws NoSuchElementException, CannotCreateException {
        List<Plan> plans = getPlansByYear(planCreateDTO.getYear());
        for (Plan plan : plans) {
            if (plan.getAuditingTeam()
                    .getId() == planCreateDTO.getAuditingTeamId()) {
                throw new CannotCreateException(
                        "Plan for this team for a given year (" + planCreateDTO.getYear() + ") already exists");
            }
        }
        Team team = this.teamService.getTeamById(planCreateDTO.getAuditingTeamId());
        Plan plan = new Plan(
                planCreateDTO.getName(),
                planCreateDTO.getYear(),
                team
        );
        plan = this.planRepository.save(plan);
        return new PlanDTO(plan);
    }

    public List<Plan> getAll() {
        return this.planRepository.findAll();
    }

    public Plan getById(long id) throws NoSuchElementException {
        return this.planRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Plan does not exist"));
    }

    public List<Plan> getPlansByYear(Year year) {
        return planRepository.findAllByYearEquals(year);
    }

    /*TODO refactor plan statistics to use Map isntead of raw int*/
    public PlanStatisticsDTO getPlanStatistics(long planId) throws NoSuchElementException {
        int notStarted = 0, inProgress = 0, finished = 0, canceled = 0, total = 0, moved = 0, suspended = 0;
        getById(planId);
        List<PlanItem> planItems = this.planItemService
                .getPlanItemsByPlanId(planId)
                .stream()
                .filter(planItem -> !planItem.isAdHoc())
                .collect(Collectors.toList());
        for (PlanItem planItem : planItems) {
            total++;
            if (planItem.getStatus()
                    .equals(TaskStatus.NOT_STARTED)) {
                notStarted++;
            } else if (planItem.getStatus()
                    .equals(TaskStatus.CANCELLED)) {
                canceled++;
            } else if (planItem.getStatus()
                    .equals(TaskStatus.IN_PROGRESS)) {
                inProgress++;
            } else if (planItem.getStatus()
                    .equals(TaskStatus.MOVED)) {
                moved++;
            } else if (planItem.getStatus()
                    .equals(TaskStatus.SUSPENDED)) {
                suspended++;
            } else {
                finished++;
            }
//            if (planItem.getStatus().equals(TaskStatus.NOT_STARTED) || planItem.getTask() == null) {
//                notStarted++;
//            } else if (planItem.getStatus().equals(TaskStatus.CANCELLED) || planItem.getTask().isCancelled()) {
//                canceled++;
//            } else if (planItem.getStatus().equals(TaskStatus.IN_PROGRESS)) {
//                inProgress++;
//            } else if (planItem.getStatus().equals(TaskStatus.FINISHED)) {
//                finished++;
//            }
        }
        return new PlanStatisticsDTO(notStarted, inProgress, finished, canceled, moved, suspended, total);
    }

    public List<PlanItemInfoDTO> getPlanItemsInfo(long planId) throws NoSuchElementException {
        getById(planId);
        List<PlanItem> planItemList = planItemService
                .getPlanItemsByPlanId(planId)
                .stream()
                .filter(planItem -> !planItem.isAdHoc())
                .collect(Collectors.toList());
        List<PlanItemInfoDTO> planItemInfoDTOList = new ArrayList<>();
        for (PlanItem planItem : planItemList) {
            PlanItemInfoDTO planItemInfoDTO = new PlanItemInfoDTO();
            planItemInfoDTO.setPlanItemId(planItem.getId());
            planItemInfoDTO.setPlanItemTitle(planItem.getPlanItemTitle());
            if (planItem.getTask() == null) {
                planItemInfoDTO.setTaskId(null);
                planItemInfoDTO.setPercentageDone(0);
            } else {
                planItemInfoDTO.setTaskId(planItem.getTask()
                        .getId());
                planItemInfoDTO.setPercentageDone(planItem.getTask()
                        .getPercentageDone());
            }
            planItemInfoDTO.setTaskStatus(planItem.getStatus());
            planItemInfoDTOList.add(planItemInfoDTO);
        }
        return planItemInfoDTOList;
    }

    public List<PlanItemInfoDTO> getNotFinishedPlanItemsDTO(long planid) {
        List<PlanItem> planItems = this.planItemService.getPlanItemsByPlanId(planid);
        return planItems.stream()
                .filter(planItem -> planItem.getStatus()
                        .isUnfinished())
                .map(PlanItemInfoDTO::new)
                .collect(Collectors.toList());
    }

    public List<PlanItem> getNotFinishedPlanItems(long planid) {
        List<PlanItem> planItems = this.planItemService.getPlanItemsByPlanId(planid);
        return planItems.stream()
                .filter(planItem -> planItem.getStatus()
                        .isUnfinished())
                .collect(Collectors.toList());
    }

    public PlanDTO getPlanForTeamAndYearIfPossible(String username, long teamId,
                                                   Year year) throws IllegalAccessException {
        roleValidator.verifyTeamAccess(username, teamId);
        Plan plan = getPlanForTeamAndYear(teamId, year);
        return new PlanDTO(plan);
    }

    public Plan getPlanForTeamAndYear(long teamId, Year year) {
        return this.planRepository.getPlanByYearAndAuditingTeamId(year, teamId)
                .orElseThrow(() -> new NoSuchElementException(
                        "Plan for this team for year " + year.getValue() + " does not exist"));
    }

    public Plan getPlanForTeamAndPreviousYear(long teamId, Year year) {
        Year previousYear = year.minusYears(1);
        return getPlanForTeamAndYear(teamId, previousYear);
    }

    public void moveUnfinishedTasksFromPreviousYear(long newPlanId) throws IllegalArgumentException {
        Plan newPlan = getById(newPlanId);
        Plan oldPlan = getPlanForTeamAndPreviousYear(newPlan.getAuditingTeam()
                .getId(), newPlan.getYear());

        if (oldPlan.isUnfinishedTasksMoved()) {
            throw new IllegalArgumentException("Plan items from previous year were already moved.");
        }

        List<PlanItem> unfinishedItems = getNotFinishedPlanItems(oldPlan.getId());

        for (PlanItem planItem : unfinishedItems) {
            //first, move task associated with planItem
            Task oldTask = planItem.getTask();
            Task newTask = null;
            if (oldTask != null) {
                newTask = taskService.copyUnfinishedTask(oldTask);
            }
            //then move planItem itself
            planItemService.copyPlanItemToNewPlan(planItem, newTask, newPlan);
        }
        oldPlan.setUnfinishedTasksMoved(true);
        this.planRepository.save(oldPlan);
    }

    public TeamsAndYearsWithPlanDTO collectTeamsAndYearsWithPlan() {
        List<Plan> plans = getAll();
        Map<Year, List<TeamInfoReducedDTO>> yearsWithPlan = getTeamsWithPlanForEachYear(plans);
        Map<Long, List<Year>> teamsWithPlan = getYearsWithPlanForEachTeam(plans);
        return new TeamsAndYearsWithPlanDTO(yearsWithPlan, teamsWithPlan);
    }

    public Map<Year, List<TeamInfoReducedDTO>> getTeamsWithPlanForEachYear(List<Plan> plans) {
        Map<Year, List<TeamInfoReducedDTO>> yearMap = initYearMap();
        plans.forEach(plan -> {
            if (yearMap.containsKey(plan.getYear())) {
                yearMap.get(plan.getYear())
                        .add(new TeamInfoReducedDTO(plan.getAuditingTeam()));
            }
        });
        return yearMap;
    }

    public Map<Long, List<Year>> getYearsWithPlanForEachTeam(List<Plan> plans) {
        Map<Long, List<Year>> teamMap = initTeamMap();
        plans.forEach(plan -> {
            long teamId = plan.getAuditingTeam()
                    .getId();
            if (teamMap.containsKey(teamId)) {
                teamMap.get(teamId)
                        .add(plan.getYear());
            }
        });
        return teamMap;
    }

    private Map<Long, List<Year>> initTeamMap() {
        Map<Long, List<Year>> teamMap = new HashMap<>();
        List<Team> teams = this.teamService.getAll();
        teams.forEach(team -> teamMap.put(team.getId(), new ArrayList<>()));
        return teamMap;
    }

    private Map<Year, List<TeamInfoReducedDTO>> initYearMap() {
        Map<Year, List<TeamInfoReducedDTO>> yearMap = new HashMap<>();
        yearMap.put(Year.now()
                .plusYears(1), new ArrayList<>());
        for (int i = 0; i < YEAR_INTERVAL; i++) {
            yearMap.put(Year.now()
                    .minusYears(i), new ArrayList<>());
        }
        return yearMap;
    }
}
