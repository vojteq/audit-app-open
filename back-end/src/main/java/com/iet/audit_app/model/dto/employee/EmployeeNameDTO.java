package com.iet.audit_app.model.dto.employee;

import com.iet.audit_app.model.entity.Employee;

public class EmployeeNameDTO {

    private final long id;

    private final String name;

    public EmployeeNameDTO(Employee employee) {
        this.id = employee.getId();
        this.name = employee.getFullName();
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
