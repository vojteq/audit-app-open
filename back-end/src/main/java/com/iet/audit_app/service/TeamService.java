package com.iet.audit_app.service;

import com.iet.audit_app.model.dto.employee.EmployeeNameDTO;
import com.iet.audit_app.model.dto.team.TeamCreateDTO;
import com.iet.audit_app.model.dto.team.TeamWithEmployeesDTO;
import com.iet.audit_app.model.entity.Employee;
import com.iet.audit_app.model.entity.Team;
import com.iet.audit_app.model.enums.Role;
import com.iet.audit_app.model.utils.TeamsForRoleUtils;
import com.iet.audit_app.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class TeamService {

    private final TeamRepository teamRepository;

    private final EmployeeService employeeService;

    @Autowired
    public TeamService(TeamRepository teamRepository, EmployeeService employeeService) {
        this.teamRepository = teamRepository;
        this.employeeService = employeeService;
    }

    public List<Team> getAll() {
        return this.teamRepository.findAll();
    }

    public Team getTeamById(long id) {
        return this.teamRepository.getTeamById(id)
                .orElseThrow(() -> new NoSuchElementException("Team does not exist"));
    }

    public void createTeam(TeamCreateDTO dto) {
        boolean exists = getAll().stream()
                .anyMatch(team -> team.getName()
                        .equalsIgnoreCase(dto.getName()) || team.getAcronym()
                        .equalsIgnoreCase(dto.getAcronym()));
        if (exists) {
            throw new IllegalArgumentException(
                    "Team with given name or acronym already exists (" + dto.getName() + ", " + dto.getAcronym() + ")");
        }
        saveTeam(new Team(dto.getName(), dto.getAcronym()));
    }

    private void saveTeam(Team team) {
        this.teamRepository.save(team);
    }

    public List<EmployeeNameDTO> getConnectedEmployees(long teamId) {
        return employeeService.getEmployeeNamesByTeamId(teamId);
    }

    public void deleteTeam(long teamId) {
        teamRepository.deleteById(teamId);
    }

    public Team getTeamByAcronym(String acronym) {
        return this.teamRepository.getTeamByAcronym(acronym)
                .orElseThrow(() -> new NoSuchElementException("Team does not exist"));
    }

    public TeamWithEmployeesDTO getTeamWithEmployeesById(long teamId) {
        return getTeamWithEmployees(teamId);
    }

    public TeamWithEmployeesDTO getTeamWithEmployeesByEmail(String email) {
        Employee employee = employeeService.getEmployeeByEmail(email);
        return getTeamWithEmployees(employee.getTeam()
                .getId());
    }

    private TeamWithEmployeesDTO getTeamWithEmployees(long teamId) {
        List<EmployeeNameDTO> employeeNameDTOS = employeeService.getEmployeesByTeamId(teamId)
                .stream()
                .map(EmployeeNameDTO::new)
                .collect(Collectors.toList());

        return new TeamWithEmployeesDTO(
                getTeamById(teamId),
                employeeNameDTOS
        );
    }

    public List<Team> getTeamForEmployee(String email) {
        Employee employee = employeeService.getEmployeeByEmail(email);
        Role role = employee.getRole();
        if (role.equals(Role.ADMIN)) {
            return getAll();
        } else if (role.isManager()) {
            return getSupervisedTeams(role);
        } else {
            List<Team> teams = new ArrayList<>();
            teams.add(employee.getTeam());
            return teams;
        }
    }

    public List<Team> getSupervisedTeams(Role role) {
        List<Team> teams = new ArrayList<>();
        switch (role) {
            case MANAGER_KW:
                for (String acronym : TeamsForRoleUtils.KW_MANAGER_TEAMS) {
                    teams.add(getTeamByAcronym(acronym));
                }
                break;
            case MANAGER_TD:
                teams.add(getTeamByAcronym(TeamsForRoleUtils.TD_MANAGER_TEAM));
                break;
            case MANAGER_AW:
                teams.add(getTeamByAcronym(TeamsForRoleUtils.AW_MANAGER_TEAM));
                break;
        }
        return teams;
    }

}
