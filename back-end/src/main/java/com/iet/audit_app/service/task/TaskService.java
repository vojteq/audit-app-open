package com.iet.audit_app.service.task;

import com.iet.audit_app.common.MailSender;
import com.iet.audit_app.common.MailStringUtils;
import com.iet.audit_app.common.RequestUtils;
import com.iet.audit_app.model.dto.milestone.MilestoneUpdateDTO;
import com.iet.audit_app.model.dto.plan_item.PlanItemCreateDTO;
import com.iet.audit_app.model.dto.task.TaskAccessibilityDTO;
import com.iet.audit_app.model.dto.task.TaskDTO;
import com.iet.audit_app.model.dto.task.TaskEditDTO;
import com.iet.audit_app.model.dto.task.TaskProgressDTO;
import com.iet.audit_app.model.dto.task.TaskReducedInfoDTO;
import com.iet.audit_app.model.dto.task.TaskSuspensionDTO;
import com.iet.audit_app.model.dto.task_request.TaskRequestAcceptDTO;
import com.iet.audit_app.model.dto.team.TeamInfoDTO;
import com.iet.audit_app.model.dto.team.TeamsWithTasksDTO;
import com.iet.audit_app.model.entity.Company;
import com.iet.audit_app.model.entity.Employee;
import com.iet.audit_app.model.entity.Plan;
import com.iet.audit_app.model.entity.PlanItem;
import com.iet.audit_app.model.entity.Task;
import com.iet.audit_app.model.entity.Team;
import com.iet.audit_app.model.enums.Role;
import com.iet.audit_app.model.enums.TaskStatus;
import com.iet.audit_app.repository.TaskRepository;
import com.iet.audit_app.security.RoleValidator;
import com.iet.audit_app.security.jwt.JwtUtil;
import com.iet.audit_app.service.EmployeeService;
import com.iet.audit_app.service.MilestoneService;
import com.iet.audit_app.service.PlanItemService;
import com.iet.audit_app.service.TeamService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.time.LocalDate;
import java.time.Year;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    private final PlanItemService planItemService;

    private final EmployeeService employeeService;

    private final MilestoneService milestoneService;

    private final TeamService teamService;

    private final JwtUtil jwtUtil;

    private final RoleValidator roleValidator;

    private final MailSender mailSender;

    private final TaskAssembler assembler;

    private final Logger logger = LogManager.getLogger(this.getClass());

    @Autowired
    public TaskService(
            TaskRepository taskRepository,
            PlanItemService planItemService,
            EmployeeService employeeService,
            MilestoneService milestoneService,
            TeamService teamService,
            JwtUtil jwtUtil,
            RoleValidator roleValidator,
            MailSender mailSender,
            TaskAssembler assembler
    ) {
        this.taskRepository = taskRepository;
        this.planItemService = planItemService;
        this.employeeService = employeeService;
        this.milestoneService = milestoneService;
        this.teamService = teamService;
        this.jwtUtil = jwtUtil;
        this.roleValidator = roleValidator;
        this.mailSender = mailSender;
        this.assembler = assembler;
    }

    public List<Task> getAll() {
        return this.taskRepository.findAll();
    }

    public List<TaskReducedInfoDTO> getAllTasksReducedDto() {
       /* TODO this method is iterating through all tasks in the system, so it would be wise to think about some
            indexes, for example index in Task on Team*/
        return this.getAll()
                .stream()
                .map(TaskReducedInfoDTO::new)
                .collect(Collectors.toList());
    }

    public TaskDTO getTaskById(long taskId, String token) throws IllegalAccessException {
        Task task = getTaskById(taskId);
        this.roleValidator.readAccess(token, task);
        PlanItem planItem = this.planItemService.getPlanItemByTaskId(taskId);
        return new TaskDTO(task, planItem);
    }

    private Task getTaskById(long id) {
        return this.taskRepository.getTaskById(id)
                .orElseThrow(() -> new NoSuchElementException("Task does not exist"));
    }

    public Task save(Task task) {
        return this.taskRepository.save(task);
    }

    public List<Task> getTasksByTaskManagerId(long id) {
        return this.taskRepository.getTasksByTaskManagerId(id);
    }

    public List<Task> getTasksByTeamMemberId(Employee employee) {
        return this.taskRepository.getTasksByTeamMembersContains(employee);
    }

    public List<TaskDTO> getTaskDTOsByToken(String token) {
        return getTasksByToken(token).stream()
                .map(task -> new TaskDTO(task, planItemService.getPlanItemByTaskId(task.getId())))
                .collect(Collectors.toList());
    }

    public List<Task> getTasksByToken(String token) throws NoSuchElementException {
        String email = this.jwtUtil.extractUsername(token);
        Employee employee = this.employeeService.getEmployeeByEmail(email);
        List<Task> tasks = new ArrayList<>();
        tasks.addAll(getTasksByTaskManagerId(employee.getId()));
        tasks.addAll(getTasksByTeamMemberId(employee));
        return tasks;
    }

    public List<TaskDTO> getTaskDTOsByYear(Year year) {
        return getTasksByYear(year).stream()
                .map(task -> new TaskDTO(task, planItemService.getPlanItemByTaskId(task.getId())))
                .collect(Collectors.toList());
    }

    public List<Task> getTasksByYear(Year year) throws NoSuchElementException {
        return this.taskRepository.getTasksByYear(year);
    }

    public List<Task> getTasksByTeamAndYear(Team team, Year year) throws NoSuchElementException {
        return this.taskRepository.getTasksByTeamAndYear(team, year);
    }

    public Task getTaskIfHaveWriteAccess(String token, long taskId) throws IllegalAccessException {
        Task task = getTaskById(taskId);
        this.roleValidator.writeAccess(token, task);
        return task;
    }

    public void createTask(TaskRequestAcceptDTO taskRequestAcceptDTO, Plan plan,
                           String token) throws MessagingException {
        PlanItem planItem;
        if (taskRequestAcceptDTO.isAdHoc()) {
            planItem = this.planItemService.create(new PlanItemCreateDTO("zadanie dorazne", plan.getId(), true), plan);
            taskRequestAcceptDTO.setPlanItemId(planItem.getId());
        } else {
            planItem = this.planItemService.getPlanItemById(taskRequestAcceptDTO.getPlanItemId());
        }

        Employee taskManager = this.employeeService.getEmployeeById(taskRequestAcceptDTO.getTaskManagerId());

        Task task = assembler.createTask(taskRequestAcceptDTO, plan, getTasksByYear(plan.getYear()), taskManager);

        this.milestoneService.saveAll(task.getMilestones());
        task = save(task);
        planItem.setTask(task);
        planItem.setStatus(TaskStatus.IN_PROGRESS);
        this.planItemService.update(planItem);
        logger.info("User {} created new Task: {}", jwtUtil.extractUsername(token), task);
        this.mailSender.sendEmail(MailStringUtils.MailType.TASK_REQUEST_ACCEPTANCE_NOTIFICATION, taskManager.getEmail(),
                new String[] { task.getWpzID(), task.getTopic() });
    }

    public void updateMilestone(String token,
                                MilestoneUpdateDTO milestoneUpdateDTO) throws IllegalAccessException, IllegalArgumentException {
        if (milestoneUpdateDTO.getPercentageDone() < 0 || milestoneUpdateDTO.getPercentageDone() > 100) {
            throw new IllegalArgumentException("Percentage done should be in range [0, 100]");
        }
        Task task = getTaskById(milestoneUpdateDTO.getTaskId());
        if (task.getStatus()
                .equals(TaskStatus.SUSPENDED)) {
            throw new IllegalAccessException("Cannot perform milestone update for suspended task");
        }
        this.roleValidator.writeAccess(token, task);
        String oldTask = task.toString();
        this.milestoneService.update(milestoneUpdateDTO, task);     // throws exception if milestone cant be updated
        this.taskRepository.save(task);
        logger.info("User {} updated progress of {} to {}", jwtUtil.extractUsername(token), oldTask, task);
    }

    public TaskProgressDTO getTaskProgress(String token, long taskId) throws IllegalAccessException {
        Task task = getTaskIfHaveWriteAccess(token, taskId);
        return getTaskProgress(task);
    }

    private TaskProgressDTO getTaskProgress(Task task) {
        return TaskUtils.getTaskProgress(task);
    }

    /*Temporary cover
     * Maybe we will move extracting employee from token elsewhere*/
    public TeamsWithTasksDTO getAllTasksUnderSupervisedTeams(String token, Map<String, String[]> parameters) {
        Year year = RequestUtils.extractAndRemoveYearFromParameters(parameters);
        String email = this.jwtUtil.extractUsername(token);
        Role role = this.employeeService.getEmployeeByEmail(email)
                .getRole();
        return getAllTasksUnderSupervisedTeams(role, year, parameters);
    }

    public TeamsWithTasksDTO getAllTasksUnderSupervisedTeams(Role role, Year year, Map<String, String[]> parameters) {
        TeamsWithTasksDTO teamsWithTasksDTO = new TeamsWithTasksDTO();
        //first set associated teams
        List<Team> teams;
        if (!role.equals(Role.ADMIN)) {
            teams = this.teamService.getSupervisedTeams(role);
        } else {
            teams = this.teamService.getAll();
        }

        teamsWithTasksDTO.setConnectedTeams(teams.stream()
                .map(TeamInfoDTO::new)
                .collect(Collectors.toList()));
        //then collect all tasks connected with those teams
        List<Task> tasks = new ArrayList<>();
        for (Team team : teams) {
            tasks.addAll(this.getTasksByTeamAndYear(team, year));
        }
        tasks = assembler.filterTasks(tasks, parameters);
        teamsWithTasksDTO.setAllTasks(tasks.stream()
                .map(task -> new TaskDTO(task, this.planItemService.getPlanItemByTaskId(
                        task.getId())))
                .collect(Collectors.toList()));
        return teamsWithTasksDTO;
    }

    public Task copyUnfinishedTask(Task oldTask) {
        Task copiedTask = assembler.copyTask(oldTask, milestoneService.copyMilestones(oldTask.getMilestones()));
        oldTask.setStatus(TaskStatus.MOVED);
        this.taskRepository.save(copiedTask);
        this.taskRepository.save(oldTask);
        return copiedTask;
    }

    public void setFinishedDate(String token, long taskId,
                                LocalDate finishedDate) throws IllegalAccessException, MessagingException {
        Task task = getTaskIfHaveWriteAccess(token, taskId);
        assembler.setFinishedDate(task, finishedDate);
        this.taskRepository.save(task);

        PlanItem planItem = this.planItemService.getPlanItemByTaskId(task.getId());
        planItem.setStatus(TaskStatus.FINISHED);
        this.planItemService.save(planItem);

        logger.info("User {} set finish date of Task {}", jwtUtil.extractUsername(token), task);

        this.mailSender.sendEmail(MailStringUtils.MailType.TASK_REPORT_REMINDER_NOTIFICATION, task.getTaskManager()
                .getEmail(), new String[] { task.getWpzID(), task.getTopic(), task.getSharepointUrl() });
    }

    public void setCorrectedFinishDate(String token, long taskId,
                                       LocalDate correctedFinishDate) throws IllegalAccessException {
        Task task = getTaskIfHaveWriteAccess(token, taskId);
        assembler.setCorrectedFinishDate(task, correctedFinishDate);
        taskRepository.save(task);
        logger.info("User {} set corrected finish date of Task {}", jwtUtil.extractUsername(token), task);
    }

    public void editTaskInformation(String token, TaskEditDTO taskEditDTO) throws IllegalAccessException {
        Task task = getTaskIfHaveWriteAccess(token, taskEditDTO.getTaskId());
        String oldTask = task.toString();
        assembler.editTaskInformation(task, taskEditDTO);
        save(task);
        logger.info("User {} edited Task {} to {}", jwtUtil.extractUsername(token), oldTask, task);
    }

    public List<TaskProgressDTO> getAllTaskStatsWithFilters(Map<String, String[]> parameters) {
        Year year = RequestUtils.extractAndRemoveYearFromParameters(parameters);
        return assembler.getAllTaskStatsWithFilters(taskRepository.getTasksByYear(year), parameters);
    }

    public List<TaskProgressDTO> getAllTaskStatsDTOsWithFiltersAndReadAccess(Map<String, String[]> parameters,
                                                                             String token) {
        Year year = RequestUtils.extractAndRemoveYearFromParameters(parameters);
        return assembler.getAllTaskStatsDTOsWithFiltersAndReadAccess(taskRepository.getTasksByYear(year), parameters,
                token);
    }

    public List<Task> getAllTaskStatsWithFiltersAndReadAccess(Map<String, String[]> parameters, String token) {
        Year year = RequestUtils.extractAndRemoveYearFromParameters(parameters);
        return assembler.getAllTaskStatsWithFiltersAndReadAccess(taskRepository.getTasksByYear(year), parameters,
                token);
    }

    public void manageTaskSuspension(long taskId, String token,
                                     TaskSuspensionDTO taskSuspensionDTO) throws IllegalAccessException {
        Task task = getTaskIfHaveWriteAccess(token, taskId);
        assembler.manageTaskSuspension(task, taskSuspensionDTO);
        this.planItemService.managePlanItemStatus(taskId, task.getStatus());
        save(task);
        logger.info("User {} managed task suspension, current - {}", jwtUtil.extractUsername(token), task);
    }

    public TaskAccessibilityDTO getTaskAccessibilityForUser(String token, long taskId) {
        Task task = getTaskById(taskId);
        boolean readAccess, writeAccess;
        readAccess = roleValidator.hasReadAccess(token, task);
        writeAccess = roleValidator.hasWriteAccess(token, task);
        return new TaskAccessibilityDTO(taskId, readAccess, writeAccess);
    }

    public void setOperationalActionsFlag(String token, long taskId) throws IllegalAccessException {
        Task task = getTaskIfHaveWriteAccess(token, taskId);
        assembler.setOperationalActionsFlag(task);
        save(task);
        logger.info("User {} set operational actions flag of Task {}", jwtUtil.extractUsername(token), task);
    }

    public boolean employeeIsConnectedToAnyTask(Employee employee) {
        return taskRepository.existsByTaskManagerOrTeamMembersContains(employee, employee);
    }

    public boolean companyIsConnectedToAnyTask(Company company) {
        return taskRepository.existsByAuditedCompaniesContains(company);
    }
}
