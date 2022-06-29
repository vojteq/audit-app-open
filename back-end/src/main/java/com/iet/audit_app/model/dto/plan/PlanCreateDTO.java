package com.iet.audit_app.model.dto.plan;

import java.time.Year;

public class PlanCreateDTO {

    private final String name;

    private final Year year;

    private final long auditingTeamId;

    public PlanCreateDTO(String name, Year year, long auditingTeamId) {
        this.name = name;
        this.year = year;
        this.auditingTeamId = auditingTeamId;
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
