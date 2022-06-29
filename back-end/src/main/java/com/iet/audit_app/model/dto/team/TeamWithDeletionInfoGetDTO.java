package com.iet.audit_app.model.dto.team;

import com.iet.audit_app.model.entity.Team;

public class TeamWithDeletionInfoGetDTO {

    private final long id;

    private final String name;

    private final String acronym;

    private final boolean canBeDeleted;

    public TeamWithDeletionInfoGetDTO(Team team, boolean canBeDeleted) {
        this.id = team.getId();
        this.name = team.getName();
        this.acronym = team.getAcronym();
        this.canBeDeleted = canBeDeleted;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAcronym() {
        return acronym;
    }

    public boolean isCanBeDeleted() {
        return canBeDeleted;
    }
}
