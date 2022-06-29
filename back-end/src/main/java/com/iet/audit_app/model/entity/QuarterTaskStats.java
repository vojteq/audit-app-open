package com.iet.audit_app.model.entity;


import com.iet.audit_app.model.enums.TaskStatus;
import com.iet.audit_app.model.enums.TaskType;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.Year;

@Entity
@Table(name = "quarter_task_stats")
public class QuarterTaskStats {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int quarter;

    private String taskName;

    private TaskStatus taskStatus;

    private TaskType taskType;

    @ManyToOne
    private Plan plan;

    @ManyToOne
    private Team team;

    @ManyToOne
    private Task task;

    public QuarterTaskStats(int quarter, String taskName,
                            TaskStatus taskStatus, TaskType taskType, Team team, Task task, Plan plan) {
        this.quarter = quarter;
        this.taskName = taskName;
        this.taskStatus = taskStatus;
        this.taskType = taskType;
        this.team = team;
        this.task = task;
        this.plan = plan;
    }

    public QuarterTaskStats(int quarter, Task task, Plan plan) {
        this.quarter = quarter;
        this.taskName = task.getDescription();
        this.taskType = task.getTaskType();
        this.team = task.getTeam();
        this.task = task;
        this.taskStatus = task.getStatus();
        this.plan = plan;
    }

    public QuarterTaskStats() { }

    public int getQuarter() {
        return quarter;
    }

    public void setQuarter(int quarter) {
        this.quarter = quarter;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public TaskStatus getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(TaskStatus taskStatus) {
        this.taskStatus = taskStatus;
    }

    public TaskType getTaskType() {
        return taskType;
    }

    public void setTaskType(TaskType taskType) {
        this.taskType = taskType;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public Plan getPlan() {
        return plan;
    }

    public void setPlan(Plan plan) {
        this.plan = plan;
    }
}
