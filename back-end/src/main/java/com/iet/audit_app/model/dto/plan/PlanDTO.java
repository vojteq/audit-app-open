package com.iet.audit_app.model.dto.plan;

import com.iet.audit_app.model.entity.Plan;

import java.time.Year;

public class PlanDTO {

    private final long id;

    private final String name;

    private final Year year;

    private final long auditingTeamId;

    public PlanDTO(long id, String name, Year year, long auditingTeamId) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.auditingTeamId = auditingTeamId;
    }
    public PlanDTO(Plan plan) {
        this.id = plan.getId();
        this.name = plan.getName();
        this.year = plan.getYear();
        this.auditingTeamId = plan.getAuditingTeam().getId();
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Year getYear() {
        return year;
    }

    public long getAuditingTeamId() {
        return auditingTeamId;
    }
}
