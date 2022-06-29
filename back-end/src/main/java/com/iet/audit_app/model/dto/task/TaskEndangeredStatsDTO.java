package com.iet.audit_app.model.dto.task;

import com.iet.audit_app.model.entity.Task;
import com.iet.audit_app.model.enums.TaskStatus;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class TaskEndangeredStatsDTO implements ITaskStatisticsDTO {

    private final long id;
    private final String name;
    private final int percentageDone;
    private final TaskStatus status;
    private final String description;
    private final LocalDate startDate;
    private final LocalDate plannedFinishDate;
    private final long daysToPlannedDate;


    public TaskEndangeredStatsDTO(Task task) {
        this.id = task.getId();
        this.name = task.getTopic();
        this.percentageDone = task.getPercentageDone();
        this.status = task.getStatus();
        this.description = task.getDescription();
        this.startDate = task.getStartDate();
        this.plannedFinishDate = task.getPlannedFinishedDate();
        this.daysToPlannedDate = ChronoUnit.DAYS.between(LocalDate.now(), task.getPlannedFinishedDate());

    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getPercentageDone() {
        return percentageDone;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public String getDescription() {
        return description;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getPlannedFinishDate() {
        return plannedFinishDate;
    }

    public long getDaysToPlannedDate() {
        return daysToPlannedDate;
    }
}
