package com.iet.audit_app.model.entity;

import javax.persistence.*;


@Entity
@Table(name = "milestone")
public class Milestone {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    private int consecutiveNumber;

    private int taskShare; //percentage share in completing the task

    private int percentageDone;

    private boolean done;

    private boolean divisible;

    public Milestone(long id, String name, int consecutiveNumber, int taskShare, int percentageDone, boolean done, boolean divisible) {
        this.id = id;
        this.name = name;
        this.consecutiveNumber = consecutiveNumber;
        this.taskShare = taskShare;
        this.percentageDone = percentageDone;
        this.done = done;
        this.divisible = divisible;
    }

    public Milestone(String name, int consecutiveNumber, int taskShare, boolean divisible) {
        this.name = name;
        this.consecutiveNumber = consecutiveNumber;
        this.taskShare = taskShare;
        this.divisible = divisible;
    }

    public Milestone(Milestone milestone) {
        this.name = milestone.name;
        this.consecutiveNumber = milestone.consecutiveNumber;
        this.taskShare = milestone.taskShare;
        this.divisible = milestone.divisible;
        this.percentageDone = milestone.percentageDone;
        this.done = milestone.done;
    }

    public Milestone() {
    }

    @Override
    public String toString() {
        return "Milestone{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", consecutiveNumber=" + consecutiveNumber +
                ", taskShare=" + taskShare +
                ", percentageDone=" + percentageDone +
                ", done=" + done +
                ", divisible=" + divisible +
                '}';
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getConsecutiveNumber() {
        return consecutiveNumber;
    }

    public void setConsecutiveNumber(int consecutiveNumber) {
        this.consecutiveNumber = consecutiveNumber;
    }

    public int getTaskShare() {
        return taskShare;
    }

    public void setTaskShare(int taskShare) {
        this.taskShare = taskShare;
    }

    public int getPercentageDone() {
        return percentageDone;
    }

    public void setPercentageDone(int percentageDone) {
        this.percentageDone = percentageDone;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public boolean isDivisible() {
        return divisible;
    }

    public void setDivisible(boolean divisible) {
        this.divisible = divisible;
    }
}
