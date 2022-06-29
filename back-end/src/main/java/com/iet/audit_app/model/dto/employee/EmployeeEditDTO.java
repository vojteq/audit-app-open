package com.iet.audit_app.model.dto.employee;

import com.iet.audit_app.model.enums.Role;

public class EmployeeEditDTO {

    private final long employeeId;

    private final long newTeamId;

    private final Role role;

    public EmployeeEditDTO(long employeeId, long newTeamId, Role role) {
        this.employeeId = employeeId;
        this.newTeamId = newTeamId;
        this.role = role;
    }

    public long getEmployeeId() {
        return employeeId;
    }

    public long getNewTeamId() {
        return newTeamId;
    }

    public Role getRole() {
        return role;
    }
}
