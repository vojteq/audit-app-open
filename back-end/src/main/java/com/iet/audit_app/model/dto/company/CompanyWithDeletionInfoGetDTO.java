package com.iet.audit_app.model.dto.company;

import com.iet.audit_app.model.entity.Company;

public class CompanyWithDeletionInfoGetDTO {

    private final long id;

    private final String name;

    private final String acronym;

    private final boolean canBeDeleted;

    public CompanyWithDeletionInfoGetDTO(Company company, boolean canBeDeleted) {
        this.id = company.getId();
        this.name = company.getName();
        this.acronym = company.getAcronym();
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
