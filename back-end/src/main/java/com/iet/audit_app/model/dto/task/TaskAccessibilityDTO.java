package com.iet.audit_app.model.dto.task;

public class TaskAccessibilityDTO {
    private final long taskId;

    private final Boolean readAccess;

    private final Boolean writeAccess;

    public TaskAccessibilityDTO(long taskId, Boolean readAccess, Boolean writeAccess) {
        this.taskId = taskId;
        this.readAccess = readAccess;
        this.writeAccess = writeAccess;
    }

    public long getTaskId() {
        return taskId;
    }

    public Boolean getReadAccess() {
        return readAccess;
    }

    public Boolean getWriteAccess() {
        return writeAccess;
    }
}
