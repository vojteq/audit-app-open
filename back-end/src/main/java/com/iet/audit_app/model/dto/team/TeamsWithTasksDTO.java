package com.iet.audit_app.model.dto.team;



import com.iet.audit_app.model.dto.task.TaskDTO;

import java.util.List;

public class TeamsWithTasksDTO {

    List<TeamInfoDTO> connectedTeams;

    List<TaskDTO> allTasks;

    public TeamsWithTasksDTO(List<TeamInfoDTO> connectedTeams, List<TaskDTO> allTasks) {
        this.connectedTeams = connectedTeams;
        this.allTasks = allTasks;
    }

    public TeamsWithTasksDTO(){}

    public List<TeamInfoDTO> getConnectedTeams() {
        return connectedTeams;
    }

    public void setConnectedTeams(List<TeamInfoDTO> connectedTeams) {
        this.connectedTeams = connectedTeams;
    }

    public List<TaskDTO> getAllTasks() {
        return allTasks;
    }

    public void setAllTasks(List<TaskDTO> allTasks) {
        this.allTasks = allTasks;
    }
}
