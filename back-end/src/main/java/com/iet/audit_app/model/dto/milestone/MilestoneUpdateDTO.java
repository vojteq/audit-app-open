package com.iet.audit_app.model.dto.milestone;

public class MilestoneUpdateDTO {

    private final long taskId;
    private final long milestoneId;
    private final int percentageDone;

    public MilestoneUpdateDTO(long taskId, long milestoneId, int percentageDone) {
        this.taskId = taskId;
        this.milestoneId = milestoneId;
        this.percentageDone = percentageDone;
    }

    public long getTaskId() {
        return taskId;
    }

    public long getMilestoneId() {
        return milestoneId;
    }

    public int getPercentageDone() {
        return percentageDone;
    }
}
