package com.iet.audit_app.service.statistics;


import com.iet.audit_app.model.dto.statistics.EndangeredStatisticsDTO;
import com.iet.audit_app.model.dto.statistics.IStatisticsDTO;
import com.iet.audit_app.model.dto.statistics.StatisticsDTO;
import com.iet.audit_app.model.dto.statistics.StatusStatisticsDTO;
import com.iet.audit_app.model.dto.statistics.cover.StatisticsCoverDTO;
import com.iet.audit_app.model.dto.task.ITaskStatisticsDTO;
import com.iet.audit_app.model.dto.task.TaskEndangeredStatsDTO;
import com.iet.audit_app.model.dto.task.TaskProgressDTO;
import com.iet.audit_app.model.dto.task.TaskStatisticsDTO;
import com.iet.audit_app.model.dto.team.TeamInfoDTO;
import com.iet.audit_app.model.entity.Task;
import com.iet.audit_app.model.enums.TaskStatus;
import com.iet.audit_app.security.jwt.JwtUtil;
import com.iet.audit_app.service.PlanItemService;
import com.iet.audit_app.service.TeamService;
import com.iet.audit_app.service.task.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;



@Service
public class StatisticsService {

    //this will be used for refactor Plan statistics
    private final PlanItemService planItemService;

    private final TaskService taskService;

    private final TeamService teamService;

    private final JwtUtil jwtUtil;

    static final String PLANNED = "planned";
    static final String AD_HOC = "adHoc";

    @Autowired
    public StatisticsService(PlanItemService planItemService, TaskService taskService, TeamService teamService,
                             JwtUtil jwtUtil) {
        this.planItemService = planItemService;
        this.taskService = taskService;
        this.teamService = teamService;
        this.jwtUtil = jwtUtil;
    }


    public StatisticsCoverDTO gatherStatusStatistics(Map<String, String[]> parameters, String token) {
        List<TaskProgressDTO> tasks = this.taskService.getAllTaskStatsDTOsWithFiltersAndReadAccess(parameters, token);
        List<IStatisticsDTO> statusStatistics = new ArrayList<>();
        List<Long> teams = StatisticsUtils.initTeams(parameters, this.teamService.getTeamForEmployee(
                jwtUtil.extractUsername(token)));
        for(Long teamId : teams) {
            List<TaskProgressDTO> teamTasks = tasks.stream()
                                                   .filter(task -> task.getTeamId() == teamId)
                                                   .collect(Collectors.toList());
            Map<String, Map<TaskStatus, Integer>> taskMap = StatisticsUtils.initTaskStatus();
            int maxPlanned = 0;
            int maxAdHoc = 0;
            for(TaskProgressDTO taskProgress : teamTasks) {
                if(taskProgress.isAdHoc()) {
                    int val = taskMap.get(AD_HOC).get(taskProgress.getTaskStatus()) + 1;
                    if (val > maxAdHoc) {
                        maxAdHoc = val;
                    }
                    taskMap.get(AD_HOC).replace(taskProgress.getTaskStatus(), val);
                }
                else {
                    int val = taskMap.get(PLANNED).get(taskProgress.getTaskStatus()) + 1;
                    if (val > maxPlanned) {
                        maxPlanned = val;
                    }
                    taskMap.get(PLANNED).replace(taskProgress.getTaskStatus(), val);
                }
            }
            TeamInfoDTO teamInfoDTO = new TeamInfoDTO(this.teamService.getTeamById(teamId));
            statusStatistics.add(new StatusStatisticsDTO(teamInfoDTO, taskMap, maxPlanned, maxAdHoc));
        }
        return new StatisticsCoverDTO(statusStatistics);
    }

    public StatisticsCoverDTO gatherTaskStatistics(Map<String, String[]> parameters, String token,
                                                   boolean areEndangered) {
        List<Task> tasks = this.taskService.getAllTaskStatsWithFiltersAndReadAccess(parameters, token);
        List<IStatisticsDTO> taskStatistics = new ArrayList<>();
        List<Long> teams = StatisticsUtils.initTeams(parameters, this.teamService.getTeamForEmployee(
                jwtUtil.extractUsername(token)));
        for (Long teamId : teams) {
            List<Task> teamTasks = tasks.stream()
                                        .filter(task -> task.getTeam()
                                                            .getId() == teamId)
                                        .collect(Collectors.toList());
            Map<String, List<ITaskStatisticsDTO>> taskStatisticsDTOMap = StatisticsUtils.initTaskStatsMap();
            for (Task task : teamTasks) {
                if (areEndangered) {
                    if (task.isAdHoc()) {
                        taskStatisticsDTOMap.get(AD_HOC)
                                            .add(new TaskEndangeredStatsDTO(task));
                    } else {
                        taskStatisticsDTOMap.get(PLANNED)
                                            .add(new TaskEndangeredStatsDTO(task));
                    }
                } else {
                    if (task.isAdHoc()) {
                        taskStatisticsDTOMap.get(AD_HOC)
                                            .add(new TaskStatisticsDTO(task));
                    } else {
                        taskStatisticsDTOMap.get(PLANNED)
                                            .add(new TaskStatisticsDTO(task));
                    }
                }
            }
            TeamInfoDTO teamInfoDTO = new TeamInfoDTO(this.teamService.getTeamById(teamId));
            taskStatistics.add(new StatisticsDTO(teamInfoDTO, taskStatisticsDTOMap));
        }
        return new StatisticsCoverDTO(taskStatistics);
    }

}
