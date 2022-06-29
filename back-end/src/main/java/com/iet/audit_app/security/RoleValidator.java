package com.iet.audit_app.security;

import com.iet.audit_app.model.entity.Employee;
import com.iet.audit_app.model.entity.Task;
import com.iet.audit_app.model.entity.Team;
import com.iet.audit_app.model.enums.Role;
import com.iet.audit_app.security.jwt.JwtUtil;
import com.iet.audit_app.service.EmployeeService;
import com.iet.audit_app.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RoleValidator {

    private final EmployeeService employeeService;

    private final JwtUtil jwtUtil;

    private final TeamService teamService;

    @Autowired
    public RoleValidator(EmployeeService employeeService, JwtUtil jwtUtil, TeamService teamService) {
        this.employeeService = employeeService;
        this.jwtUtil = jwtUtil;
        this.teamService = teamService;
    }

    public boolean isAdmin(String token) {
        String email = jwtUtil.extractUsername(token);
        Employee employee = this.employeeService.getEmployeeByEmail(email);
        return employee.getRole()
                .equals(Role.ADMIN);
    }

    public boolean isManager(Employee employee) {
        return employee.getRole()
                .isManager();
    }


    public void readAccess(String token, Task task) throws IllegalAccessException {
        if(!hasReadAccess(token,task)) {
            throw new IllegalAccessException("You dont have permissions to read this task");
        }
    }

    public void writeAccess(String token, Task task) throws IllegalAccessException {
        if(!hasWriteAccess(token,task)) {
            throw new IllegalAccessException("You dont have permissions to update this task");
        }
    }


    public boolean hasReadAccess(String token, Task task) {
        Employee employee = this.employeeService.getEmployeeByEmail(this.jwtUtil.extractUsername(token));
        if (isAdmin(employee) || isDirector(employee)) {
            return true;
        }
        if (employee.getRole()
                    .isManager()) {
            if (this.isSupervisorManager(employee, task.getTeam()
                                                       .getId())) {
                return true;
            }
        }
        return this.hasWriteAccess(token, task);
    }

    public boolean hasWriteAccess(String token, Task task) {
        Employee employee = this.employeeService.getEmployeeByEmail(this.jwtUtil.extractUsername(token));
        if (employee.getRole()
                    .equals(Role.ADMIN)) {
            return true;
        }
        if (task.getTaskManager()
                .getId() == employee.getId()) {
            return true;
        }
        if (!task.getTeamMembers()
                 .isEmpty()) {
            for (Employee teamMember : task.getTeamMembers()) {
                if (teamMember.getId() == employee.getId()) {
                    return true;
                }
            }
        }
        return false;
    }

    public void verifyTeamAccess(String email, long teamId) throws IllegalAccessException {
        Employee employee = this.employeeService.getEmployeeByEmail(email);
        if (employee.getTeam()
                .getId() == teamId) {
            return;
        }
        if (isSupervisorManager(employee, teamId)) {
            return;
        }
        if (isAdmin(employee) || isDirector(employee)) {
            return;
        }
        throw new IllegalAccessException("You dont have permissions to update this task");
    }

    private boolean isSupervisorManager(Employee employee, long teamId) {
        if (isManager(employee)) {
            List<Team> teams = this.teamService.getSupervisedTeams(employee.getRole());
            return teams.contains(this.teamService.getTeamById(teamId));
        }
        return false;
    }

    private boolean isAdmin(Employee employee) {
        return employee.getRole()
                .equals(Role.ADMIN);
    }

    public boolean isDirector(Employee employee) {
        return employee.getRole()
                .equals(Role.DIRECTOR);
    }
}
