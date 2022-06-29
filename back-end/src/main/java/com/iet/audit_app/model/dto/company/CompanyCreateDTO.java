package com.iet.audit_app.model.dto.company;

public class CompanyCreateDTO {

    private final String name;

    private final String acronym;

    public CompanyCreateDTO(String name, String acronym) {
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
