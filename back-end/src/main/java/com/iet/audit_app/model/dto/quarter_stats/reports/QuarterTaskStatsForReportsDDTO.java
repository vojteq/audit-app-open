package com.iet.audit_app.model.dto.quarter_stats.reports;

import com.iet.audit_app.model.dto.quarter_stats.QuarterTaskStatsForTableDDTO;

import java.util.List;

public class QuarterTaskStatsForReportsDDTO implements IQuarterStatsDTO {

    private final String directory;
    private final int year;
    private final int quarter;

    private final List<QuarterTaskStatsForTableDDTO> taskStats;

    public QuarterTaskStatsForReportsDDTO(String directory, int year, int quarter,
                                          List<QuarterTaskStatsForTableDDTO> taskStats) {
        this.directory = directory;
        this.year = year;
        this.quarter = quarter;
        this.taskStats = taskStats;
    }

    public String getDirectory() {
        return directory;
    }

    public int getYear() {
        return year;
    }

    public int getQuarter() {
        return quarter;
    }

    public List<QuarterTaskStatsForTableDDTO> getTaskStats() {
        return taskStats;
    }
}
