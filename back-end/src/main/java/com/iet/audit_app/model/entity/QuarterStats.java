package com.iet.audit_app.model.entity;


import com.iet.audit_app.model.dto.plan.PlanStatisticsDTO;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.Year;

@Entity
@Table(name = "quarter_stats")
public class QuarterStats {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Plan plan;

    private Year year;
    private int quarter;

    private int notStarted;
    private int inProgress;
    private int finished;
    private int cancelled;
    private int moved;
    private int suspended;
    private int total;
    private int percentageDone;


    public QuarterStats(){}

    public QuarterStats(Year year, int quarter, Plan plan, PlanStatisticsDTO planStatisticsDTO) {
        this.year = year;
        this.quarter = quarter;
        this.notStarted = planStatisticsDTO.getNotStarted();
        this.inProgress = planStatisticsDTO.getInProgress();
        this.finished = planStatisticsDTO.getFinished();
        this.cancelled = planStatisticsDTO.getCancelled();
        this.moved = planStatisticsDTO.getMoved();
        this.suspended = planStatisticsDTO.getSuspended();
        this.total = planStatisticsDTO.getTotal();
        this.percentageDone = planStatisticsDTO.getPercentageDone();
        this.plan = plan;
    }

    public QuarterStats(Long id, Year year, int quarter, int notStarted, int inProgress, int finished, int cancelled,
                        int moved, int suspended, int total, int percentageDone) {
        this.id = id;
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

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Plan getPlan() {
        return plan;
    }

    public void setPlan(Plan plan) {
        this.plan = plan;
    }

    public Year getYear() {
        return year;
    }

    public void setYear(Year year) {
        this.year = year;
    }

    public int getQuarter() {
        return quarter;
    }

    public void setQuarter(int quarter) {
        this.quarter = quarter;
    }

    public int getNotStarted() {
        return notStarted;
    }

    public void setNotStarted(int notStarted) {
        this.notStarted = notStarted;
    }

    public int getInProgress() {
        return inProgress;
    }

    public void setInProgress(int inProgress) {
        this.inProgress = inProgress;
    }

    public int getFinished() {
        return finished;
    }

    public void setFinished(int finished) {
        this.finished = finished;
    }

    public int getCancelled() {
        return cancelled;
    }

    public void setCancelled(int cancelled) {
        this.cancelled = cancelled;
    }

    public int getMoved() {
        return moved;
    }

    public void setMoved(int moved) {
        this.moved = moved;
    }

    public int getSuspended() {
        return suspended;
    }

    public void setSuspended(int suspended) {
        this.suspended = suspended;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getPercentageDone() {
        return percentageDone;
    }

    public void setPercentageDone(int percentageDone) {
        this.percentageDone = percentageDone;
    }
}
