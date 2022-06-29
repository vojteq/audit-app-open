package com.iet.audit_app.model.dto.quarter_stats;

import com.iet.audit_app.model.entity.Company;
import com.iet.audit_app.model.entity.QuarterTaskStats;
import com.iet.audit_app.model.enums.TaskStatus;
import com.iet.audit_app.model.enums.TaskType;

import java.util.ArrayList;
import java.util.List;


public class QuarterTaskStatsForTableADTO {

    private final String topic;

    private final TaskType taskType;

    private final TaskStatus taskStatus;

    private final List<String> auditedCompanies;

    public QuarterTaskStatsForTableADTO(String topic, TaskType taskType,
                                        TaskStatus taskStatus, List<String> auditedCompanies) {
        this.topic = topic;
        this.taskType = taskType;
        this.taskStatus = taskStatus;
        this.auditedCompanies = auditedCompanies;
    }

    public QuarterTaskStatsForTableADTO(QuarterTaskStats quarterTaskStats) {
        // python script fails on whitespaces
        this.topic = quarterTaskStats.getTask()
                .getTopic()
                .replaceAll(" ", "__");
        this.taskType = quarterTaskStats.getTaskType();
        this.taskStatus = quarterTaskStats.getTaskStatus();
        List<Company> companies = quarterTaskStats.getTask()
                .getAuditedCompanies();
        List<String> acronyms = new ArrayList<>();
        for (Company company : companies) {
            acronyms.add(company.getAcronym());
        }
        this.auditedCompanies = acronyms;

    }

    public String getTopic() {
        return topic;
    }

    public TaskType getTaskType() {
        return taskType;
    }

    public TaskStatus getTaskStatus() {
        return taskStatus;
    }

    public List<String> getAuditedCompanies() {
        return auditedCompanies;
    }
}
