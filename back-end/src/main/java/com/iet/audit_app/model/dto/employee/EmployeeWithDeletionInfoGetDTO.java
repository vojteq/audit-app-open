package com.iet.audit_app.model.dto.employee;

import com.iet.audit_app.model.entity.Employee;
import com.iet.audit_app.model.enums.Role;

public class EmployeeWithDeletionInfoGetDTO {

    private final long id;

    private final String firstName;

    private final String lastName;

    private final boolean isActive;

    private final String email;

    private final Role role;

    private final boolean canBeDeleted;

    public EmployeeWithDeletionInfoGetDTO(Employee employee, boolean canBeDeleted) {
        this.id = employee.getId();
        this.firstName = employee.getFirstName();
        this.lastName = employee.getLastName();
        this.isActive = employee.isActive();
        this.email = employee.getEmail();
        this.role = employee.getRole();
        this.canBeDeleted = canBeDeleted;
    }

    public long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public boolean isActive() {
        return isActive;
    }

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }

    public boolean isCanBeDeleted() {
        return canBeDeleted;
    }
}
