package com.iet.audit_app.model.dto.task;

public class TaskSuspensionDTO {

    private final boolean isSuspended;
    private final String reason;

    public TaskSuspensionDTO(boolean isSuspended, String reason) {
        this.isSuspended = isSuspended;
        this.reason = reason;
    }

    public boolean isSuspended() {
        return isSuspended;
    }

    public String getReason() {
        return reason;
    }
}
