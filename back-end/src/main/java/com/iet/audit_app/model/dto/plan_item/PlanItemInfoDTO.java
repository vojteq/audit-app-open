package com.iet.audit_app.model.dto.plan_item;

import com.iet.audit_app.model.entity.PlanItem;
import com.iet.audit_app.model.enums.TaskStatus;

public class PlanItemInfoDTO {

    private long planItemId;
    private String planItemTitle;
    private Long taskId;
    private TaskStatus taskStatus;
    private boolean isAdHoc;
    private int percentageDone;

    public PlanItemInfoDTO(long planItemId, String planItemTitle, Long taskId, TaskStatus taskStatus, boolean isAdHoc,
                           int percentageDone) {
        this.planItemId = planItemId;
        this.planItemTitle = planItemTitle;
        this.taskId = taskId;
        this.taskStatus = taskStatus;
        this.isAdHoc = isAdHoc;
        this.percentageDone = percentageDone;
    }

    public PlanItemInfoDTO(PlanItem planItem) {
        this.planItemId = planItem.getId();
        this.planItemTitle = planItem.getPlanItemTitle();
        this.taskId = planItem.getId();
        this.taskStatus = planItem.getStatus();
        this.isAdHoc = planItem.isAdHoc();
        if(planItem.getTask() == null) {
            this.percentageDone = 0;
        }
        else {
            this.percentageDone = planItem.getTask().getPercentageDone();
        }
    }

    public PlanItemInfoDTO() {
    }

    public long getPlanItemId() {
        return planItemId;
    }

    public void setPlanItemId(long planItemId) {
        this.planItemId = planItemId;
    }

    public String getPlanItemTitle() {
        return planItemTitle;
    }

    public void setPlanItemTitle(String planItemTitle) {
        this.planItemTitle = planItemTitle;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public TaskStatus getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(TaskStatus taskStatus) {
        this.taskStatus = taskStatus;
    }

    public boolean isAdHoc() {
        return isAdHoc;
    }

    public void setAdHoc(boolean adHoc) {
        isAdHoc = adHoc;
    }

    public int getPercentageDone() {
        return percentageDone;
    }

    public void setPercentageDone(int percentageDone) {
        this.percentageDone = percentageDone;
    }
}
