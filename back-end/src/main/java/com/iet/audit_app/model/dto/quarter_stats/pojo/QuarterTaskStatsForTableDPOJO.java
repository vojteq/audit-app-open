package com.iet.audit_app.model.dto.quarter_stats.pojo;


import com.iet.audit_app.model.enums.TaskStatus;

/**
 * Class used as a POJO in QuarterTaskStatsRepository.
 * We are mapping aggregated query results to this class.
 */
public class QuarterTaskStatsForTableDPOJO {

    public long teamId;

    public TaskStatus taskStatus;

    public Long taskCount;

    public QuarterTaskStatsForTableDPOJO(Long taskCount, long team, TaskStatus taskStatus) {
        this.teamId = team;
        this.taskStatus = taskStatus;
        this.taskCount = taskCount;
    }

}
