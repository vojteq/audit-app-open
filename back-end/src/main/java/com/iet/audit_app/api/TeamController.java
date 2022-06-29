package com.iet.audit_app.api;

import com.iet.audit_app.model.dto.team.TeamCreateDTO;
import com.iet.audit_app.model.dto.team.TeamWithDeletionInfoGetDTO;
import com.iet.audit_app.model.dto.team.TeamWithEmployeesDTO;
import com.iet.audit_app.model.entity.Team;
import com.iet.audit_app.security.RoleValidator;
import com.iet.audit_app.security.jwt.JwtUtil;
import com.iet.audit_app.service.PlanService;
import com.iet.audit_app.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping( "/api/teams" )
public class TeamController {

    private final TeamService teamService;

    private final JwtUtil jwtUtil;

    private final RoleValidator roleValidator;

    private final PlanService planService;

    @Autowired
    public TeamController(TeamService teamService, JwtUtil jwtUtil, RoleValidator roleValidator,
                          PlanService planService) {
        this.teamService = teamService;
        this.jwtUtil = jwtUtil;
        this.roleValidator = roleValidator;
        this.planService = planService;
    }

    @GetMapping
    public ResponseEntity<List<Team>> getTeams() {
        return new ResponseEntity<>(teamService.getAll(), HttpStatus.OK);
    }

    @PreAuthorize( "hasRole('ROLE_ADMIN')" )
    @PostMapping
    public ResponseEntity<String> createTeam(@RequestBody TeamCreateDTO dto) {
        teamService.createTeam(dto);
        return new ResponseEntity<>("Team added successfully", HttpStatus.CREATED);
    }

    @GetMapping( "/{teamId}" )
    public ResponseEntity<TeamWithEmployeesDTO> getTeamWithEmployees(
            @RequestHeader( "Authorization" ) String token,
            @PathVariable long teamId
    ) throws IllegalAccessException {
        this.roleValidator.verifyTeamAccess(jwtUtil.extractUsername(token), teamId);
        TeamWithEmployeesDTO teamWithEmployeesDTO = teamService.getTeamWithEmployeesById(teamId);
        return new ResponseEntity<>(teamWithEmployeesDTO, HttpStatus.OK);
    }

    @GetMapping( "/myTeam" )
    public ResponseEntity<TeamWithEmployeesDTO> getMyTeam(@RequestHeader( "Authorization" ) String token) {
        TeamWithEmployeesDTO teamWithEmployeesDTO = teamService.getTeamWithEmployeesByEmail(
                jwtUtil.extractUsername(token));
        return new ResponseEntity<>(teamWithEmployeesDTO, HttpStatus.OK);
    }

    @GetMapping( "/access" )
    public ResponseEntity<List<Team>> getConnectedTeams(
            @RequestHeader( "Authorization" ) String token
    ) {
        List<Team> teams = this.teamService.getTeamForEmployee(jwtUtil.extractUsername(token));
        return new ResponseEntity<>(teams, HttpStatus.OK);
    }

    @PreAuthorize( "hasRole('ROLE_ADMIN')" )
    @GetMapping( "/withDeletionInfo" )
    public ResponseEntity<List<TeamWithDeletionInfoGetDTO>> getTeamsInfo() {
        List<TeamWithDeletionInfoGetDTO> teams = teamService.getAll()
                .stream()
                .map(team -> {
                    boolean canBeDeleted = planService.getPlansByTeamId(team.getId())
                            .isEmpty();
                    return new TeamWithDeletionInfoGetDTO(team, canBeDeleted);
                })
                .collect(Collectors.toList());
        return new ResponseEntity<>(teams, HttpStatus.OK);
    }

    @PreAuthorize( "hasRole('ROLE_ADMIN')" )
    @DeleteMapping
    public ResponseEntity<?> deleteTeam(@RequestParam long teamId) {
        boolean canBeDeleted = planService.getPlansByTeamId(teamId)
                .isEmpty();
        if (canBeDeleted) {
            teamService.deleteTeam(teamId);
            return new ResponseEntity<>("Team deleted successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Team cannot be deleted", HttpStatus.NOT_MODIFIED);
    }
}
