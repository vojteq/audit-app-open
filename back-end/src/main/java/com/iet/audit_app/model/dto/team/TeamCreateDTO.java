package com.iet.audit_app.model.dto.team;

public class TeamCreateDTO {

    private final String name;

    private final String acronym;

    public TeamCreateDTO(String name, String acronym) {
        this.name = name;
        this.acronym = acronym;
    }

    public String getName() {
        return name;
    }

    public String getAcronym() {
        return acronym;
    }
}
