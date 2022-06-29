package com.iet.audit_app.model.dto.quarter_stats.reports;

import com.iet.audit_app.model.dto.quarter_stats.QuarterTaskStatsForTableEDTO;

import java.util.List;

public class QuarterTaskStatsForReportsEDTO implements IQuarterStatsDTO {

    private final int year;

    private final int quarter;

    private final String directory;

    private final List<QuarterTaskStatsForTableEDTO> taskStats;


    public QuarterTaskStatsForReportsEDTO(int year, int quarter, String directory,
                                          List<QuarterTaskStatsForTableEDTO> taskStats) {
        this.year = year;
        this.quarter = quarter;
        this.directory = directory;
        this.taskStats = taskStats;
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

    public List<QuarterTaskStatsForTableEDTO> getTaskStats() {
        return taskStats;
    }
}
