package com.iet.audit_app.model.dto.team;

import com.iet.audit_app.model.entity.Team;

public class TeamInfoDTO {

    private final long id;

    private final String name;

    private final String acronym;

    public TeamInfoDTO(Team team) {
        this.id = team.getId();
        this.name = team.getName();
        this.acronym = team.getAcronym();
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
}
