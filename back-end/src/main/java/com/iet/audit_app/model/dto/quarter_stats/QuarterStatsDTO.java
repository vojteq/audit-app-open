package com.iet.audit_app.model.dto.quarter_stats;


import com.iet.audit_app.model.entity.QuarterStats;

import java.time.Year;

public class QuarterStatsDTO {

    private final long planId;

    private final Year year;
    private final int quarter;

    private final int notStarted;
    private final int inProgress;
    private final int finished;
    private final int cancelled;
    private final int moved;
    private final int suspended;
    private final int total;
    private final int percentageDone;

    public QuarterStatsDTO(long planId, Year year, int quarter, int notStarted, int inProgress, int finished,
                           int cancelled,
                           int moved, int suspended, int total, int percentageDone) {
        this.planId = planId;
        this.year = year;
        this.quarter = quarter;
        this.notStarted = notStarted;
        this.inProgress = inProgress;
        this.finished = finished;
        this.cancelled = cancelled;
        this.moved = moved;
        this.suspended = suspended;
        this.total = total;
        this.percentageDone = percentageDone;
    }

    public QuarterStatsDTO(QuarterStats quarterStats) {
        this.planId = quarterStats.getPlan()
                                  .getId();
        this.year = quarterStats.getYear();
        this.quarter = quarterStats.getQuarter();
        this.notStarted = quarterStats.getNotStarted();
        this.inProgress = quarterStats.getInProgress();
        this.finished = quarterStats.getFinished();
        this.cancelled = quarterStats.getCancelled();
        this.moved = quarterStats.getMoved();
        this.suspended = quarterStats.getSuspended();
        this.total = quarterStats.getTotal();
        this.percentageDone = quarterStats.getPercentageDone();
    }


    public long getPlanId() {
        return planId;
    }

    public Year getYear() {
        return year;
    }

    public int getQuarter() {
        return quarter;
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

    public int getTotal() {
        return total;
    }

    public int getPercentageDone() {
        return percentageDone;
    }
}
