package com.iet.audit_app.model.enums;

public enum TaskType {
    AUDIT("Audit"), CONTROL("Control");

    public final String taskType;

    TaskType(String taskType){this.taskType = taskType;}

    public String getStringForDescription() {
        switch (this) {
            case AUDIT:
                return "audytowe";
            case CONTROL:
                return "kontrolne";
            default:
                return "";
        }
    }
}