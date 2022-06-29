package com.iet.audit_app.model.dto.quarter_stats;

import com.iet.audit_app.model.enums.TaskStatus;

public class QuarterTaskStatsForTableDDTO {

    private final String name;

    private final Long taskCount;

    private final String taskStatus;

    public QuarterTaskStatsForTableDDTO(String teamName, TaskStatus taskStatus, Long taskCount) {
        // python script fails on whitespaces
        this.name = teamName.replaceAll(" ", "__");
        this.taskStatus = taskStatus.name();
        this.taskCount = taskCount;
    }

    public String getName() {
        return name;
    }

    public Long getTaskCount() {
        return taskCount;
    }

    public String getTaskStatus() {
        return taskStatus;
    }
}
