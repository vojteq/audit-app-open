package com.iet.audit_app.model.entity;

import javax.persistence.*;

@Entity
@Table(name = "milestone_template")
public class MilestoneTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    private int consecutiveNumber;

    private int taskShare; //percentage share in completing the task

    private boolean divisible; //states if milestone can be partially completed

    public MilestoneTemplate(long id, String name, int consecutiveNumber, int taskShare, boolean divisible) {
        this.id = id;
        this.name = name;
        this.consecutiveNumber = consecutiveNumber;
        this.taskShare = taskShare;
        this.divisible = divisible;
    }

    public MilestoneTemplate(String name, int consecutiveNumber, int taskShare, boolean divisible) {
        this.name = name;
        this.consecutiveNumber = consecutiveNumber;
        this.taskShare = taskShare;
        this.divisible = divisible;
    }

    public MilestoneTemplate() {
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getConsecutiveNumber() {
        return consecutiveNumber;
    }

    public int getTaskShare() {
        return taskShare;
    }

    public boolean isDivisible() {
        return divisible;
    }

    public void setDivisible(boolean divisible) {
        this.divisible = divisible;
    }
}
