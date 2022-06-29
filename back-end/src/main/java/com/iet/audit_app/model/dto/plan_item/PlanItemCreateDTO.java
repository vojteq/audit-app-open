package com.iet.audit_app.model.dto.plan_item;

public class PlanItemCreateDTO {

    private String planItemTitle;
    private long planId;
    private boolean isAdHoc;

    public PlanItemCreateDTO(String planItemTitle, long planId, boolean isAdHoc) {
        this.planItemTitle = planItemTitle;
        this.planId = planId;
        this.isAdHoc = isAdHoc;
    }

    public String getPlanItemTitle() {
        return planItemTitle;
    }

    public void setPlanItemTitle(String planItemTitle) {
        this.planItemTitle = planItemTitle;
    }

    public long getPlanId() {
        return planId;
    }

    public void setPlanId(long planId) {
        this.planId = planId;
    }

    public boolean isAdHoc() {
        return isAdHoc;
    }

    public void setAdHoc(boolean adHoc) {
        isAdHoc = adHoc;
    }
}
