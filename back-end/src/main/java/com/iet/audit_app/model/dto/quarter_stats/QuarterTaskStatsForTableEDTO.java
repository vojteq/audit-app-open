package com.iet.audit_app.model.dto.quarter_stats;

import com.iet.audit_app.model.entity.QuarterTaskStats;
import com.iet.audit_app.model.enums.TaskStatus;

public class QuarterTaskStatsForTableEDTO {

    private final String topic;

    private final String teamAcronym;

    private final TaskStatus taskStatus;

    public QuarterTaskStatsForTableEDTO(String topic, String teamAcronym,
                                        TaskStatus taskStatus) {
        this.topic = topic;
        this.teamAcronym = teamAcronym;
        this.taskStatus = taskStatus;
    }

    public QuarterTaskStatsForTableEDTO(QuarterTaskStats quarterTaskStats) {
        // python script fails on whitespaces
        this.topic = quarterTaskStats.getTask()
                .getTopic()
                .replaceAll(" ", "__");
        this.teamAcronym = quarterTaskStats.getTeam()
                .getAcronym();
        this.taskStatus = quarterTaskStats.getTaskStatus();
    }

    public String getTopic() {
        return topic;
    }

    public String getTeamAcronym() {
        return teamAcronym;
    }

    public TaskStatus getTaskStatus() {
        return taskStatus;
    }
}
