package com.iet.audit_app.model.dto.statistics;

import com.iet.audit_app.model.dto.task.ITaskStatisticsDTO;
import com.iet.audit_app.model.dto.team.TeamInfoDTO;

import java.util.List;
import java.util.Map;

public class StatisticsDTO implements IStatisticsDTO {

    private final TeamInfoDTO teamInfoDTO;
    private final Map<String, List<ITaskStatisticsDTO>> tasks;

    public StatisticsDTO(TeamInfoDTO teamInfoDTO,
                         Map<String, List<ITaskStatisticsDTO>> tasks) {
        this.teamInfoDTO = teamInfoDTO;
        this.tasks = tasks;
    }

    public TeamInfoDTO getTeamInfoDTO() {
        return teamInfoDTO;
    }

    public Map<String, List<ITaskStatisticsDTO>> getTasks() {
        return tasks;
    }
}
