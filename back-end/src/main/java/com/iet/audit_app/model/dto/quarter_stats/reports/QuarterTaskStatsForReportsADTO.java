package com.iet.audit_app.model.dto.quarter_stats.reports;

import com.iet.audit_app.model.dto.quarter_stats.QuarterTaskStatsForTableADTO;
import com.iet.audit_app.model.enums.TaskType;

import java.util.List;

public class QuarterTaskStatsForReportsADTO implements IQuarterStatsDTO {

    private final int year;

    private final int quarter;

    private final String directory;

    private final List<QuarterTaskStatsForTableADTO> auditStats;

    private final List<QuarterTaskStatsForTableADTO> controlStats;

    public QuarterTaskStatsForReportsADTO(int year, int quarter, String directory,
                                          List<QuarterTaskStatsForTableADTO> auditStats,
                                          List<QuarterTaskStatsForTableADTO> controlStats) {
        this.year = year;
        this.quarter = quarter;
        this.directory = directory;
        this.auditStats = auditStats;
        this.controlStats = controlStats;
    }

    public int getYear() {
        return year;
    }

    public int getQuarter() {
        return quarter;
    }

    public String getDirectory() {
        return directory;
    }

    public List<QuarterTaskStatsForTableADTO> getStatsByType(TaskType taskType) {
        return taskType.equals(TaskType.AUDIT) ?
                auditStats :
                controlStats;
    }
}
