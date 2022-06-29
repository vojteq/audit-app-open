package com.iet.audit_app.model.dto.statistics;

import com.iet.audit_app.model.dto.task.TaskEndangeredStatsDTO;
import com.iet.audit_app.model.dto.team.TeamInfoDTO;

import java.util.Map;
import java.util.List;

public class EndangeredStatisticsDTO implements IStatisticsDTO{

    private final TeamInfoDTO teamInfoDTO;

    private final Map<String, List<TaskEndangeredStatsDTO>> tasks;

    public EndangeredStatisticsDTO(TeamInfoDTO teamInfoDTO,
                                   Map<String, List<TaskEndangeredStatsDTO>> tasks) {
        this.teamInfoDTO = teamInfoDTO;
        this.tasks = tasks;
    }

    public TeamInfoDTO getTeamInfoDTO() {
        return teamInfoDTO;
    }

    public Map<String, List<TaskEndangeredStatsDTO>> getTasks() {
        return tasks;
    }


}
