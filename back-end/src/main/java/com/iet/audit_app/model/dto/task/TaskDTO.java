package com.iet.audit_app.model.dto.task;

import com.iet.audit_app.model.dto.employee.EmployeeNameDTO;
import com.iet.audit_app.model.dto.suspension.SuspensionDTO;
import com.iet.audit_app.model.entity.Company;
import com.iet.audit_app.model.entity.Employee;
import com.iet.audit_app.model.entity.PlanItem;
import com.iet.audit_app.model.entity.Task;
import com.iet.audit_app.model.enums.TaskStatus;
import com.iet.audit_app.model.enums.TaskType;
import com.iet.audit_app.service.task.TaskUtils;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class TaskDTO {

    private final long id;

    private final String wpzId;

    private final String topic;

    private final String taskManager;

    private final String planItemTitle;

    private final long taskManagerId;

    private final TaskType taskType;

    private final String methodologyName;

    private final LocalDate startDate;

    private final LocalDate plannedFinishedDate;

    private final LocalDate correctedFinishDate;

    private final LocalDate finishedDate;

    private final List<EmployeeNameDTO> teamMembersNames;

    private final List<Company> auditedCompanies;

    private final TaskStatus taskStatus;

    private final String sharepointUrl;

    private final int percentageDone;

    private final String description;

    private final String teamName;

    private final List<SuspensionDTO> suspensions;

    private final boolean isAdHoc;

    private final boolean operActionPerformed;

    private final List<String> externalEmployees;

    public TaskDTO(Task task, PlanItem planItem) {
        Employee taskManager = task.getTaskManager();
        this.id = task.getId();
        this.wpzId = task.getWpzID();
        this.topic = task.getTopic();
        this.taskManager = taskManager.getFirstName() + " " + taskManager.getLastName();
        this.planItemTitle = planItem.getPlanItemTitle();
        this.taskManagerId = taskManager.getId();
        this.methodologyName = task.getMethodologyName();
        this.auditedCompanies = task.getAuditedCompanies();
        this.taskType = task.getTaskType();
        this.startDate = task.getStartDate();
        this.finishedDate = task.getFinishedDate();
        this.plannedFinishedDate = task.getPlannedFinishedDate();
        this.correctedFinishDate = task.getCorrectedFinishDate();
        this.teamMembersNames = task.getTeamMembers()
                .stream()
                .map(EmployeeNameDTO::new)
                .collect(Collectors.toList());
        this.taskStatus = task.getStatus();
        this.sharepointUrl = task.getSharepointUrl();
        this.percentageDone = task.getPercentageDone();
        this.description = task.getDescription();
        this.teamName = task.getTeam()
                .getName();
        this.suspensions = task.getSuspensions().stream().map(SuspensionDTO::new).collect(Collectors.toList());
        this.isAdHoc = task.isAdHoc();
        this.operActionPerformed = task.isOperActionPerformed();
        this.externalEmployees = TaskUtils.externalEmployeesStringToList(task.getExternalEmployees());
    }

    public long getId() {
        return id;
    }

    public String getWpzId() {
        return wpzId;
    }

    public String getTopic() {
        return topic;
    }

    public String getTaskManager() {
        return taskManager;
    }

    public long getTaskManagerId() {
        return taskManagerId;
    }

    public String getPlanItemTitle() {
        return planItemTitle;
    }

    public TaskType getTaskType() {
        return taskType;
    }

    public String getMethodologyName() {
        return methodologyName;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getPlannedFinishedDate() {
        return plannedFinishedDate;
    }

    public LocalDate getCorrectedFinishDate() {
        return correctedFinishDate;
    }

    public LocalDate getFinishedDate() {
        return finishedDate;
    }

    public List<EmployeeNameDTO> getTeamMembersNames() {
        return teamMembersNames;
    }

    public List<Company> getAuditedCompanies() {
        return auditedCompanies;
    }

    public TaskStatus getTaskStatus() {
        return taskStatus;
    }

    public String getSharepointUrl() {
        return sharepointUrl;
    }

    public int getPercentageDone() {
        return percentageDone;
    }

    public String getDescription() {
        return description;
    }

    public String getTeamName() {
        return teamName;
    }

    public List<SuspensionDTO> getSuspensions() {
        return suspensions;
    }

    public boolean isAdHoc() {
        return isAdHoc;
    }

    public boolean isOperActionPerformed() {
        return operActionPerformed;
    }

    public List<String> getExternalEmployees() {
        return externalEmployees;
    }
}
