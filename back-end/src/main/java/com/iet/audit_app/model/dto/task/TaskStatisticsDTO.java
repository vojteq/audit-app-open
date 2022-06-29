package com.iet.audit_app.model.dto.task;

import com.iet.audit_app.model.entity.Task;
import com.iet.audit_app.model.enums.TaskStatus;

public class TaskStatisticsDTO implements ITaskStatisticsDTO {

    private final long id;
    private final String name;
    private final int percentageDone;
    private final TaskStatus status;
    private final String description;

    public TaskStatisticsDTO(Task task) {
        this.id = task.getId();
        this.name = task.getTopic();
        this.percentageDone = task.getPercentageDone();
        this.status = task.getStatus();
        this.description = task.getDescription();
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
}
