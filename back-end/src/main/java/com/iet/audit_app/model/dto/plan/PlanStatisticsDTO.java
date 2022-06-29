package com.iet.audit_app.model.dto.plan;

public class PlanStatisticsDTO {

    private final int notStarted;
    private final int inProgress;
    private final int finished;
    private final int cancelled;
    private final int moved;
    private final int suspended;
    private final int total;
    private final int percentageDone;

    public PlanStatisticsDTO(int notStarted, int inProgress, int finished, int cancelled, int moved, int suspended, int total) {
        this.notStarted = notStarted;
        this.inProgress = inProgress;
        this.finished = finished;
        this.cancelled = cancelled;
        this.total = total;
        this.moved = moved;
        if (total - cancelled != 0) {
            this.percentageDone = (int) finished * 100 / (total - cancelled);
        } else {
            this.percentageDone = 0;
        }
        this.suspended = suspended;
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

    public int getTotal() {
        return total;
    }

    public int getPercentageDone() {
        return percentageDone;
    }

    public int getMoved() {
        return moved;
    }

    public int getSuspended() {
        return suspended;
    }
}
