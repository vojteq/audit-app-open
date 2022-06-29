package com.iet.audit_app.model.dto.task_request;

import com.iet.audit_app.model.enums.TaskType;

import java.time.LocalDate;
import java.util.List;

public class TaskRequestAcceptDTO {

    private final long taskRequestId;

    private final String topic;

    private long planItemId;

    private final long taskManagerId;

    private final TaskType taskType;

    private final long methodologyId;

    private final List<Long> auditedCompanies;

    private final LocalDate startDate;

    private final LocalDate plannedFinishedDate;

    private final boolean isAdHoc;

    private final String sharepointUrl;

    private final List<Long> teamMembers;

    private final List<String> externalEmployees;

    public TaskRequestAcceptDTO(long taskRequestId, String topic, long planItemId, long taskManagerId,
                                TaskType taskType, long methodologyId, List<Long> auditedCompanies,
                                LocalDate startDate, LocalDate plannedFinishedDate, boolean isAdHoc,
                                String sharepointUrl, List<Long> teamMembers, List<String> externalEmployees
    ) {
        this.taskRequestId = taskRequestId;
        this.topic = topic;
        this.planItemId = planItemId;
        this.taskManagerId = taskManagerId;
        this.taskType = taskType;
        this.methodologyId = methodologyId;
        this.auditedCompanies = auditedCompanies;
        this.startDate = startDate;
        this.plannedFinishedDate = plannedFinishedDate;
        this.isAdHoc = isAdHoc;
        this.sharepointUrl = sharepointUrl;
        this.teamMembers = teamMembers;
        this.externalEmployees = externalEmployees;
    }

    public long getTaskRequestId() {
        return taskRequestId;
    }

    public String getTopic() {
        return topic;
    }

    public long getPlanItemId() {
        return planItemId;
    }

    //used for AdHoc tasks to set newly created plan item id
    public void setPlanItemId(long planItemId) {
        this.planItemId = planItemId;
    }

    public long getTaskManagerId() {
        return taskManagerId;
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

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getPlannedFinishedDate() {
        return plannedFinishedDate;
    }

    public boolean isAdHoc() {
        return isAdHoc;
    }

    public String getSharepointUrl() {
        return sharepointUrl;
    }

    public List<Long> getTeamMembers() {
        return teamMembers;
    }

    public List<String> getExternalEmployees() {
        return externalEmployees;
    }
}
