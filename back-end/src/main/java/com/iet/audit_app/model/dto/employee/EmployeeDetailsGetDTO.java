package com.iet.audit_app.model.dto.employee;

import com.iet.audit_app.model.entity.Employee;
import com.iet.audit_app.model.enums.Role;

public class EmployeeDetailsGetDTO {

    private final long id;

    private final String name;

    private final String email;

    private final Role role;

    private final String teamName;

    public EmployeeDetailsGetDTO(Employee employee) {
        this.id = employee.getId();
        this.name = employee.getFullName();
        this.email = employee.getEmail();
        this.role = employee.getRole();
        this.teamName = employee.getTeam()
                .getName();
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }

    public String getTeamName() {
        return teamName;
    }
}
