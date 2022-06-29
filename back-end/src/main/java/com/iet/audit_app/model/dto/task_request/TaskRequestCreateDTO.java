package com.iet.audit_app.model.dto.task_request;

import com.iet.audit_app.model.enums.TaskType;

import java.time.LocalDate;
import java.util.List;

public class TaskRequestCreateDTO {

    private final long taskManagerId;

    private final String topic;

    private final TaskType taskType;

    private final long methodologyId;

    private final List<Long> auditedCompanies;

    private final List<Long> teamMembers;

    private final LocalDate startDate;

    private final LocalDate plannedFinishedDate;

    private final boolean isAdHoc;

    private final List<String> externalEmployees;

    public TaskRequestCreateDTO(long taskManagerId, String topic, TaskType taskType, long methodologyId,
                                List<Long> auditedCompanies, List<Long> teamMembers, LocalDate startDate,
                                LocalDate plannedFinishedDate, boolean isAdHoc, List<String> externalEmployees) {
        this.taskManagerId = taskManagerId;
        this.topic = topic;
        this.taskType = taskType;
        this.methodologyId = methodologyId;
        this.auditedCompanies = auditedCompanies;
        this.teamMembers = teamMembers;
        this.startDate = startDate;
        this.plannedFinishedDate = plannedFinishedDate;
        this.isAdHoc = isAdHoc;
        this.externalEmployees = externalEmployees;
    }

    public long getTaskManagerId() {
        return taskManagerId;
    }

    public String getTopic() {
        return topic;
    }

    public TaskType getTaskType() {
        return taskType;
    }

    public long getMethodologyId() {
        return methodologyId;
    }

    public List<Long> getAuditedCompanies() {
        return auditedCompanies;
    }

    public List<Long> getTeamMembers() {
        return teamMembers;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getPlannedFinishedDate() {
        return plannedFinishedDate;
    }

    public boolean isAdHoc() {
        return isAdHoc;
    }

    public List<String> getExternalEmployees() {
        return externalEmployees;
    }
}
