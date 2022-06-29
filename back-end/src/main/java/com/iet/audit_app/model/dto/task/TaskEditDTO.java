package com.iet.audit_app.model.dto.task;

import com.iet.audit_app.model.enums.TaskType;

import java.time.LocalDate;
import java.util.List;

public class TaskEditDTO {

    private final long taskId;

    private final String topic;

    private final long taskManagerId;

    private final TaskType taskType;

    private final String sharepointUrl;

    private final List<Long> teamMembersIds;

    private final List<Long> auditedCompaniesIds;

    private final List<String> externalEmployees;

    private final LocalDate startDate;

    public TaskEditDTO(long taskId, String topic, long taskManagerId, TaskType taskType, String sharepointUrl,
                       List<Long> teamMembersIds, List<Long> auditedCompaniesIds, List<String> externalEmployees,
                       LocalDate startDate) {
        this.taskId = taskId;
        this.topic = topic;
        this.taskManagerId = taskManagerId;
        this.taskType = taskType;
        this.sharepointUrl = sharepointUrl;
        this.teamMembersIds = teamMembersIds;
        this.auditedCompaniesIds = auditedCompaniesIds;
        this.externalEmployees = externalEmployees;
        this.startDate = startDate;
    }

    public long getTaskId() {
        return taskId;
    }

    public String getTopic() {
        return topic;
    }

    public long getTaskManagerId() {
        return taskManagerId;
    }

    public TaskType getTaskType() {
        return taskType;
    }

    public String getSharepointUrl() {
        return sharepointUrl;
    }

    public List<Long> getTeamMembersIds() {
        return teamMembersIds;
    }

    public List<Long> getAuditedCompaniesIds() {
        return auditedCompaniesIds;
    }

    public List<String> getExternalEmployees() {
        return externalEmployees;
    }

    public LocalDate getStartDate() {
        return startDate;
    }
}
