package com.iet.audit_app.model.entity;

import com.iet.audit_app.model.enums.TaskStatus;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "plan_item")
public class PlanItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    private String planItemTitle;

    @OneToOne
    @JoinColumn(name = "task_id", referencedColumnName = "id")
    private Task task;

    @ManyToOne
    @JoinColumn(name = "plan_id", referencedColumnName = "id")
    private Plan plan;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    private boolean isAdHoc;

    public PlanItem(long id, String planItemTitle, Task task, Plan plan, TaskStatus status, boolean isAdHoc) {
        this.id = id;
        this.planItemTitle = planItemTitle;
        this.task = task;
        this.plan = plan;
        this.status = status;
        this.isAdHoc = isAdHoc;
    }

    public PlanItem(String planItemTitle, Task task, Plan plan, TaskStatus status, boolean isAdHoc) {
        this.planItemTitle = planItemTitle;
        this.task = task;
        this.plan = plan;
        this.status = status;
        this.isAdHoc = isAdHoc;
    }

    public PlanItem(String planItemTitle, Plan plan, boolean isAdHoc) {
        this.planItemTitle = planItemTitle;
        this.plan = plan;
        this.isAdHoc = isAdHoc;
    }

    public PlanItem() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPlanItemTitle() {
        return planItemTitle;
    }

    public void setPlanItemTitle(String planItemTitle) {
        this.planItemTitle = planItemTitle;
    }

    @Transactional
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

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = Objects.requireNonNullElse(status, TaskStatus.NOT_STARTED);
    }

    public boolean isAdHoc() {
        return isAdHoc;
    }

    public void setAdHoc(boolean adHoc) {
        isAdHoc = adHoc;
    }
}
