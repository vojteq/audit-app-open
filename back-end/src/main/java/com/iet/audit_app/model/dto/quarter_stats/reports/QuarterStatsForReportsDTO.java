package com.iet.audit_app.model.dto.quarter_stats.reports;

import com.iet.audit_app.model.entity.QuarterStats;

public class QuarterStatsForReportsDTO implements IQuarterStatsDTO {

    private final String teamName;

    private final int year;

    private final int quarter;

    private final int total;

    private final int notStarted;

    private final int inProgress;

    private final int finished;

    private final int cancelled;

    private final int moved;

    private final int suspended;

    private final String directory;

    public QuarterStatsForReportsDTO(QuarterStats stats, String directory) {
        // python script fails on whitespaces
        this.teamName = stats.getPlan()
                .getAuditingTeam()
                .getName()
                .replaceAll(" ", "__");
        this.year = stats.getYear()
                .getValue();
        this.quarter = stats.getQuarter();
        this.total = stats.getTotal();
        this.notStarted = stats.getNotStarted();
        this.inProgress = stats.getInProgress();
        this.finished = stats.getFinished();
        this.cancelled = stats.getCancelled();
        this.moved = stats.getMoved();
        this.suspended = stats.getSuspended();
        this.directory = directory;
    }

    public String getTeamName() {
        return teamName;
    }

    public int getYear() {
        return year;
    }

    public int getQuarter() {
        return quarter;
    }

    public int getTotal() {
        return total;
    }

    public int getNotStarted() {
        return notStarted;
    }

    public int getInProgress() {
        return inProgress;
    }

    public int getFinished() {
        return finished;
    }

    public int getCancelled() {
        return cancelled;
    }

    public int getMoved() {
        return moved;
    }

    public int getSuspended() {
        return suspended;
    }

    public String getDirectory() {
        return directory;
    }
}
