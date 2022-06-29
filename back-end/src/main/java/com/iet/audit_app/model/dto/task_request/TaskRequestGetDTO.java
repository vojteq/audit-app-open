package com.iet.audit_app.model.dto.task_request;

import com.iet.audit_app.model.dto.employee.EmployeeGetDTO;
import com.iet.audit_app.model.dto.employee.EmployeeNameDTO;
import com.iet.audit_app.model.dto.team.TeamInfoDTO;
import com.iet.audit_app.model.entity.Company;
import com.iet.audit_app.model.entity.Methodology;
import com.iet.audit_app.model.entity.TaskRequest;
import com.iet.audit_app.model.entity.Team;
import com.iet.audit_app.model.enums.Acceptance;
import com.iet.audit_app.model.enums.TaskType;
import com.iet.audit_app.service.task.TaskUtils;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class TaskRequestGetDTO {

    private final long id;

    private final String topic;

    private final EmployeeGetDTO taskManager;

    private final TaskType taskType;

    private final Methodology methodology;

    private final List<Company> auditedCompanies;

    private final List<Company> nonAuditedCompanies;

    private final Acceptance acceptance;

    private final LocalDate startDate;

    private final LocalDate plannedFinishedDate;

    private final boolean isAdHoc;

    private final TeamInfoDTO teamInfo;

    private final List<EmployeeNameDTO> teamMembers;

    private final List<String> externalEmployees;

    public TaskRequestGetDTO(TaskRequest taskRequest, Team team, List<Company> nonAuditedCompanies) {
        this.id = taskRequest.getId();
        this.topic = taskRequest.getTopic();
        this.taskManager = new EmployeeGetDTO(taskRequest.getTaskManager());
        this.taskType = taskRequest.getTaskType();
        this.methodology = taskRequest.getMethodology();
        this.auditedCompanies = taskRequest.getAuditedCompanies();
        this.nonAuditedCompanies = nonAuditedCompanies;
        this.startDate = taskRequest.getStartDate();
        this.plannedFinishedDate = taskRequest.getPlannedFinishedDate();
        this.acceptance = taskRequest.getAcceptance();
        this.isAdHoc = taskRequest.isAdHoc();
        this.teamInfo = new TeamInfoDTO(team);
        this.teamMembers = taskRequest.getTeamMembers()
                .stream()
                .map(EmployeeNameDTO::new)
                .collect(Collectors.toList());
        this.externalEmployees = TaskUtils.externalEmployeesStringToList(taskRequest.getExternalEmployees());
    }

    public long getId() {
        return id;
    }

    public String getTopic() {
        return topic;
    }

    public EmployeeGetDTO getTaskManager() {
        return taskManager;
    }

    public TaskType getTaskType() {
        return taskType;
    }

    public Methodology getMethodology() {
        return methodology;
    }

    public List<Company> getAuditedCompanies() {
        return auditedCompanies;
    }

    public List<Company> getNonAuditedCompanies() {
        return nonAuditedCompanies;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getPlannedFinishedDate() {
        return plannedFinishedDate;
    }

    public Acceptance getAcceptance() {
        return acceptance;
    }

    public boolean isAdHoc() {
        return isAdHoc;
    }

    public TeamInfoDTO getTeamInfo() {
        return teamInfo;
    }

    public List<EmployeeNameDTO> getTeamMembers() {
        return teamMembers;
    }

    public List<String> getExternalEmployees() {
        return externalEmployees;
    }
}
