package com.iet.audit_app.service.task;

import com.iet.audit_app.model.dto.task.TaskEditDTO;
import com.iet.audit_app.model.dto.task.TaskProgressDTO;
import com.iet.audit_app.model.dto.task.TaskSuspensionDTO;
import com.iet.audit_app.model.dto.task_request.TaskRequestAcceptDTO;
import com.iet.audit_app.model.entity.Employee;
import com.iet.audit_app.model.entity.Milestone;
import com.iet.audit_app.model.entity.Plan;
import com.iet.audit_app.model.entity.Suspension;
import com.iet.audit_app.model.entity.Task;
import com.iet.audit_app.model.enums.TaskStatus;
import com.iet.audit_app.model.utils.DescriptionUtils;
import com.iet.audit_app.security.RoleValidator;
import com.iet.audit_app.service.CompanyService;
import com.iet.audit_app.service.EmployeeService;
import com.iet.audit_app.service.MethodologyService;
import com.iet.audit_app.service.SuspensionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Component
public class TaskAssembler {

    private final EmployeeService employeeService;

    private final CompanyService companyService;

    private final MethodologyService methodologyService;

    private final SuspensionService suspensionService;

    private final RoleValidator roleValidator;

    @Autowired
    public TaskAssembler(EmployeeService employeeService, CompanyService companyService,
                         MethodologyService methodologyService, SuspensionService suspensionService,
                         RoleValidator roleValidator) {
        this.employeeService = employeeService;
        this.companyService = companyService;
        this.methodologyService = methodologyService;
        this.suspensionService = suspensionService;
        this.roleValidator = roleValidator;
    }

    public Task createTask(TaskRequestAcceptDTO dto, Plan plan, List<Task> tasks, Employee taskManager) {
        return new Task(
                TaskUtils.generateWpzId(dto, plan, tasks),
                dto.getTopic(),
                taskManager,
                methodologyService.getMilestonesForMethodology(dto.getMethodologyId()),
                this.companyService.getCompaniesById(dto.getAuditedCompanies()),
                dto.getTaskType(),
                methodologyService.getMethodologyById(dto.getMethodologyId())
                        .getName(),
                plan.getYear(),
                dto.isAdHoc(),
                "Zadanie " + dto.getTaskType()
                        .getStringForDescription() + " z roku " + plan.getYear(),
                dto.getStartDate(),
                dto.getPlannedFinishedDate(),
                dto.getSharepointUrl(),
                TaskStatus.IN_PROGRESS,
                this.employeeService.getEmployeesByIds(dto.getTeamMembers()),
                plan.getAuditingTeam(),
                TaskUtils.externalEmployeesListToString(dto.getExternalEmployees())
        );
    }

    public void editTaskInformation(Task task, TaskEditDTO dto) {
        task.setTopic(dto.getTopic());
        task.setTaskManager(employeeService.getEmployeeById(dto.getTaskManagerId()));
        task.setTaskType(dto.getTaskType());
        task.setSharepointUrl(dto.getSharepointUrl());
        task.setTeamMembers(employeeService.getEmployeesByIds(dto.getTeamMembersIds()));
        task.setAuditedCompanies(companyService.getCompaniesById(dto.getAuditedCompaniesIds()));
        task.setExternalEmployees(TaskUtils.externalEmployeesListToString(dto.getExternalEmployees()));
        task.setStartDate(dto.getStartDate());
    }

    public List<Task> filterTasks(List<Task> tasks, Map<String, String[]> parameters) {
        for (String key : parameters.keySet()) {
            tasks = applyAppropriateFilter(tasks, key, Arrays.asList(parameters.get(key)));
        }
        return tasks;
    }

    private List<Task> applyAppropriateFilter(List<Task> tasks, String key, List<String> values) {
        return tasks.stream()
                .filter(task -> TaskUtils.checkTask(task, key, values))
                .collect(Collectors.toList());
    }

    public void setCorrectedFinishDate(Task task, LocalDate correctedFinishDate) {
        if (task.getStartDate() == null) {
            throw new NoSuchElementException("Task start date is null");
        }
        if (task.getCorrectedFinishDate() != null) {
            throw new IllegalArgumentException("Corrected finish date already set");
        }
        if (correctedFinishDate.isBefore(task.getStartDate())) {
            throw new IllegalArgumentException("Corrected finished date cant be before start date");
        }
        task.setCorrectedFinishDate(correctedFinishDate);
    }

    public List<TaskProgressDTO> getAllTaskStatsWithFilters(List<Task> tasks, Map<String, String[]> parameters) {
        return filterTasks(tasks, parameters).stream()
                .map(TaskUtils::getTaskProgress)
                .collect(Collectors.toList());
    }

    public List<TaskProgressDTO> getAllTaskStatsDTOsWithFiltersAndReadAccess(List<Task> tasks, Map<String, String[]> parameters, String token) {
        List<Task> readAccessTasks = tasks.stream()
                                          .filter(task -> roleValidator.hasReadAccess(token, task))
                                          .collect(Collectors.toList());
        return filterTasks(readAccessTasks, parameters).stream()
                                                       .map(TaskUtils::getTaskProgress)
                                                       .collect(Collectors.toList());
    }

    public List<Task> getAllTaskStatsWithFiltersAndReadAccess(List<Task> tasks, Map<String, String[]> parameters, String token) {
        List<Task> readAccessTasks = tasks.stream()
                                          .filter(task -> roleValidator.hasReadAccess(token, task))
                                          .collect(Collectors.toList());
        return filterTasks(readAccessTasks, parameters);
    }


    public Suspension manageTaskSuspension(Task task, TaskSuspensionDTO taskSuspensionDTO) throws NoSuchElementException{
        Suspension suspension = null;
        if (taskSuspensionDTO.isSuspended()) {
            if (task.getStatus()
                    .equals(TaskStatus.SUSPENDED)) {
                throw new IllegalArgumentException("Task is already suspended");
            }
            suspension = this.suspensionService.save(new Suspension(task, taskSuspensionDTO.getReason(), LocalDate.now()));
            task.setStatus(TaskStatus.SUSPENDED);
            task.addSuspension(suspension);
        } else {
            task.setStatus(TaskStatus.IN_PROGRESS);
            suspension = this.suspensionService.getCurrentSuspension(task.getId());
            suspension.setDateTo(LocalDate.now());
            this.suspensionService.save(suspension);
        }
        return suspension;
    }

    public void setFinishedDate(Task task, LocalDate finishedDate) {
        if (task.getStartDate() == null) {
            throw new NoSuchElementException("Task start date is null");
        }
        if (finishedDate.isBefore(task.getStartDate())) {
            throw new IllegalArgumentException("Finished date cant be before start date");
        }
        task.setFinishedDate(finishedDate);
        task.setStatus(TaskStatus.FINISHED);
    }

    public Task copyTask(Task oldTask, List<Milestone> milestones) {
        Task copiedTask = new Task(oldTask);
        copiedTask.setDescription(DescriptionUtils.updateTaskDescription(oldTask.getDescription()));
        copiedTask.setMilestones(milestones);
        copiedTask.setYear(oldTask.getYear()
                .plusYears(1));
        return copiedTask;
    }

    public void setOperationalActionsFlag(Task task) {
        task.setOperActionPerformed(true);
    }

}
