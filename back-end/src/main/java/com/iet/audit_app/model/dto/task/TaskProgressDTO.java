package com.iet.audit_app.model.dto.task;

import com.iet.audit_app.model.entity.Milestone;
import com.iet.audit_app.model.enums.TaskStatus;

import java.util.List;

public class TaskProgressDTO {

    private final int taskPercentageDone;

    private final int currentMilestoneNumber;

    private final int numberOfMilestones;

    private final List<Milestone> milestones;

    private final TaskStatus taskStatus;

    private final long teamId;

    private final boolean isAdHoc;

    public TaskProgressDTO(int taskPercentageDone, int currentMilestoneNumber, int numberOfMilestones,
                           List<Milestone> milestones, TaskStatus taskStatus, long teamId, boolean isAdHoc) {
        this.taskPercentageDone = taskPercentageDone;
        this.currentMilestoneNumber = currentMilestoneNumber;
        this.numberOfMilestones = numberOfMilestones;
        this.milestones = milestones;
        this.taskStatus = taskStatus;
        this.teamId = teamId;
        this.isAdHoc = isAdHoc;
    }

    public int getTaskPercentageDone() {
        return taskPercentageDone;
    }

    public int getCurrentMilestoneNumber() {
        return currentMilestoneNumber;
    }

    public int getNumberOfMilestones() {
        return numberOfMilestones;
    }

    public List<Milestone> getMilestones() {
        return milestones;
    }

    public TaskStatus getTaskStatus() {
        return taskStatus;
    }

    public long getTeamId() {
        return teamId;
    }

    public boolean isAdHoc() {
        return isAdHoc;
    }
}
