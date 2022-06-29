package com.iet.audit_app.model.dto.team;

import com.iet.audit_app.model.dto.employee.EmployeeNameDTO;
import com.iet.audit_app.model.entity.Team;

import java.util.List;

public class TeamWithEmployeesDTO {

    private final Team team;

    private final List<EmployeeNameDTO> employees;

    public TeamWithEmployeesDTO(Team team, List<EmployeeNameDTO> employees) {
        this.team = team;
        this.employees = employees;
    }

    public Team getTeam() {
        return team;
    }

    public List<EmployeeNameDTO> getEmployees() {
        return employees;
    }
}
