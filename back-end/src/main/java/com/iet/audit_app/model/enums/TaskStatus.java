package com.iet.audit_app.model.enums;

public enum TaskStatus {

    NOT_STARTED, IN_PROGRESS, FINISHED, CANCELLED, MOVED, SUSPENDED;

    public boolean isUnfinished() {
        return this.equals(NOT_STARTED) || this.equals(IN_PROGRESS);
    }

}
