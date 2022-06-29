package com.iet.audit_app.service.quarter_task_stats;

import com.iet.audit_app.model.dto.quarter_stats.QuarterTaskStatsForTableADTO;
import com.iet.audit_app.model.dto.quarter_stats.QuarterTaskStatsForTableDDTO;
import com.iet.audit_app.model.dto.quarter_stats.QuarterTaskStatsForTableEDTO;
import com.iet.audit_app.model.dto.quarter_stats.pojo.QuarterTaskStatsForTableDPOJO;
import com.iet.audit_app.model.dto.quarter_stats.reports.QuarterTaskStatsForReportsADTO;
import com.iet.audit_app.model.dto.quarter_stats.reports.QuarterTaskStatsForReportsDDTO;
import com.iet.audit_app.model.dto.quarter_stats.reports.QuarterTaskStatsForReportsEDTO;
import com.iet.audit_app.model.entity.QuarterTaskStats;
import com.iet.audit_app.model.enums.TaskType;
import com.iet.audit_app.service.TeamService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Component
public class QuarterTaskStatsAssembler {

    private final TeamService teamService;

    private final Logger logger = LogManager.getLogger(this.getClass());

    @Autowired
    public QuarterTaskStatsAssembler(TeamService teamService) {
        this.teamService = teamService;
    }


    private List<QuarterTaskStatsForTableDDTO> convertRawQuarterTaskStatsForTableD(
            List<QuarterTaskStatsForTableDPOJO> quarterStats) {
        List<QuarterTaskStatsForTableDDTO> stats = new ArrayList<>();
        for (QuarterTaskStatsForTableDPOJO quarterStat : quarterStats) {
            stats.add(new QuarterTaskStatsForTableDDTO(
                    teamService.getTeamById(
                                    quarterStat.teamId)
                            .getName(),
                    quarterStat.taskStatus,
                    quarterStat.taskCount));
        }
        return stats;
    }

    QuarterTaskStatsForReportsDDTO createDTOsForTableDReports(List<QuarterTaskStatsForTableDPOJO> rawStats,
                                                              String dir, int year, int quarter) {
        List<QuarterTaskStatsForTableDDTO> stats = convertRawQuarterTaskStatsForTableD(rawStats);
        return new QuarterTaskStatsForReportsDDTO(dir, year, quarter, stats);
    }

    QuarterTaskStatsForReportsADTO createDTOsForTableAReports(List<QuarterTaskStats> quarterTaskStats, String dir,
                                                              int year, int quarter) {
        List<QuarterTaskStatsForTableADTO> stats = quarterTaskStats.stream()
                .map(QuarterTaskStatsForTableADTO::new)
                .collect(Collectors.toList());
        List<QuarterTaskStatsForTableADTO> auditTasks = new ArrayList<>();
        List<QuarterTaskStatsForTableADTO> controlTasks = new ArrayList<>();
        for (QuarterTaskStatsForTableADTO stat : stats) {
            if (stat.getTaskType()
                    .equals(TaskType.AUDIT)) {
                auditTasks.add(stat);
            } else if (stat.getTaskType()
                    .equals(TaskType.CONTROL)) {
                controlTasks.add(stat);
            }
        }
        return new QuarterTaskStatsForReportsADTO(year, quarter, dir, auditTasks, controlTasks);
    }

    QuarterTaskStatsForReportsEDTO createDTOsForTableEReports(List<QuarterTaskStats> quarterTaskStats, String dir,
                                                              int year, int quarter) {
        List<QuarterTaskStatsForTableEDTO> stats = quarterTaskStats.stream()
                .map(QuarterTaskStatsForTableEDTO::new)
                .collect(Collectors.toList());
        return new QuarterTaskStatsForReportsEDTO(year, quarter, dir, stats);
    }

}
