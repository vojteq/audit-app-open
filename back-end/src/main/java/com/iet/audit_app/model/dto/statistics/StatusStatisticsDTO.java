package com.iet.audit_app.model.dto.statistics;

import com.iet.audit_app.model.dto.team.TeamInfoDTO;
import com.iet.audit_app.model.enums.TaskStatus;

import java.util.Map;

public class StatusStatisticsDTO implements  IStatisticsDTO{

    private final TeamInfoDTO teamInfo;

    private final int maxPlanned;

    private final int maxAdHoc;

    private final Map<String, Map<TaskStatus, Integer>> tasks;

    public StatusStatisticsDTO(TeamInfoDTO teamInfoDTO, Map<String, Map<TaskStatus, Integer>> tasks, int maxPlanned, int maxAdHoc) {
        this.teamInfo = teamInfoDTO;
        this.tasks = tasks;
        this.maxPlanned = maxPlanned;
        this.maxAdHoc = maxAdHoc;
    }

    public TeamInfoDTO getTeamInfo() {
        return teamInfo;
    }

    public Map<String, Map<TaskStatus, Integer>> getTasks() {
        return tasks;
    }

    public int getMaxPlanned() {
        return maxPlanned;
    }

    public int getMaxAdHoc() {
        return maxAdHoc;
    }
}
