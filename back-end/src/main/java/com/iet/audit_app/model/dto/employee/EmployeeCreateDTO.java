package com.iet.audit_app.model.dto.employee;

import com.iet.audit_app.model.enums.Role;

public class EmployeeCreateDTO {

    private final String firstName;

    private final String lastName;

    private final String email;

    private final Role role;

    private final long teamId;

    public EmployeeCreateDTO(String firstName, String lastName, String email, Role role, long teamId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.teamId = teamId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }

    public long getTeamId() {
        return teamId;
    }
}
