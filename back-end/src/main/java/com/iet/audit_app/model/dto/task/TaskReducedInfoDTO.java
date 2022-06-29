package com.iet.audit_app.model.dto.task;

import com.iet.audit_app.model.entity.Task;

public class TaskReducedInfoDTO {

    private final String topic;

    private final String teamName;

    private final String description;

    public TaskReducedInfoDTO(String topic, String teamName, String description) {
        this.topic = topic;
        this.teamName = teamName;
        this.description = description;
    }

    public TaskReducedInfoDTO(Task task) {
        this.topic = task.getTopic();
        this.teamName = task.getTeam().getName();
        this.description = task.getDescription();
    }

    public String getTopic() {
        return topic;
    }

    public String getTeamName() {
        return teamName;
    }

    public String getDescription() { return description; }
}
