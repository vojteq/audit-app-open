package com.iet.audit_app.service.statistics;

import com.iet.audit_app.model.dto.task.ITaskStatisticsDTO;
import com.iet.audit_app.model.dto.task.TaskEndangeredStatsDTO;
import com.iet.audit_app.model.dto.task.TaskStatisticsDTO;
import com.iet.audit_app.model.entity.Team;
import com.iet.audit_app.model.enums.TaskStatus;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.iet.audit_app.service.statistics.StatisticsService.AD_HOC;
import static com.iet.audit_app.service.statistics.StatisticsService.PLANNED;


public final class StatisticsUtils {

    static Map<String, Map<TaskStatus, Integer>> initTaskStatus() {
        Map<String, Map<TaskStatus, Integer>> taskMap = new HashMap<>();
        taskMap.put(PLANNED, initStatusMap());
        taskMap.put(AD_HOC, initStatusMap());
        return taskMap;
    }

    static List<Long> initTeams(Map<String, String[]> parameters, List<Team> teams) {
        if (parameters.containsKey("team")) {
            return Arrays.stream(parameters.get("team"))
                         .map(Long::valueOf)
                         .collect(Collectors.toList());
        } else {
            return teams
                    .stream()
                    .map(Team::getId)
                    .collect(Collectors.toList());
        }
    }

    static Map<String, List<ITaskStatisticsDTO>> initTaskStatsMap() {
        Map<String, List<ITaskStatisticsDTO>> taskStatistics = new HashMap<>();
        taskStatistics.put(PLANNED, new ArrayList<>());
        taskStatistics.put(AD_HOC, new ArrayList<>());
        return taskStatistics;
    }

    static Map<TaskStatus, Integer> initStatusMap() {
        Map<TaskStatus, Integer> statusMap = new HashMap<>();
        for(TaskStatus status : TaskStatus.values()) {
            statusMap.put(status, 0);
        }
        return statusMap;
    }

}
