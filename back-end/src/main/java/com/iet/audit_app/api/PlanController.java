package com.iet.audit_app.api;

import com.iet.audit_app.model.dto.common.TeamsAndYearsWithPlanDTO;
import com.iet.audit_app.model.dto.plan.PlanCreateDTO;
import com.iet.audit_app.model.dto.plan.PlanDTO;
import com.iet.audit_app.model.dto.plan.PlanStatisticsDTO;
import com.iet.audit_app.model.dto.plan_item.PlanItemInfoDTO;
import com.iet.audit_app.model.entity.Plan;
import com.iet.audit_app.security.jwt.JwtUtil;
import com.iet.audit_app.service.PlanService;
import javassist.tools.reflect.CannotCreateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Year;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping( value = "/api/plan" )
public class PlanController {

    private final PlanService planService;

    private final JwtUtil jwtUtil;

    @Autowired
    public PlanController(PlanService planService, JwtUtil jwtUtil) {
        this.planService = planService;
        this.jwtUtil = jwtUtil;
    }

    @PreAuthorize( "hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER_TD', 'ROLE_MANAGER_KW', 'ROLE_MANAGER_AW')" )
    @GetMapping
    public ResponseEntity<PlanDTO> getPlan(@RequestParam Year year,
                                           @RequestHeader( "Authorization" ) String token,
                                           @RequestParam long teamId) throws NoSuchElementException, IllegalAccessException {
        PlanDTO planDTO = this.planService.getPlanForTeamAndYearIfPossible(jwtUtil.extractUsername(token), teamId,
                year);
        return new ResponseEntity<>(planDTO, HttpStatus.OK);
    }

    @PreAuthorize( "hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER_TD', 'ROLE_MANAGER_KW', 'ROLE_MANAGER_AW')" )
    @PostMapping
    public ResponseEntity<PlanDTO> createPlan(
            @RequestBody PlanCreateDTO planCreateDTO) throws NoSuchElementException, CannotCreateException {
        PlanDTO planDTO = this.planService.createPlan(planCreateDTO);
        return new ResponseEntity<>(planDTO, HttpStatus.OK);
    }

    @PreAuthorize( "hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER_TD', 'ROLE_MANAGER_KW', 'ROLE_MANAGER_AW')" )
    @GetMapping( value = "/{planId}/status" )
    public ResponseEntity<PlanStatisticsDTO> getPlanStatistics(
            @PathVariable long planId) throws NoSuchElementException {
        PlanStatisticsDTO planStatisticsDTO = this.planService.getPlanStatistics(planId);
        return new ResponseEntity<>(planStatisticsDTO, HttpStatus.OK);
    }

    @PreAuthorize( "hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER_TD', 'ROLE_MANAGER_KW', 'ROLE_MANAGER_AW')" )
    @GetMapping( value = "/{planId}/items" )
    public ResponseEntity<List<PlanItemInfoDTO>> getPlanItemsInfo(
            @PathVariable long planId) throws NoSuchElementException {
        List<PlanItemInfoDTO> planItemInfoDTOList = this.planService.getPlanItemsInfo(planId);
        return new ResponseEntity<>(planItemInfoDTOList, HttpStatus.OK);
    }

    @PreAuthorize( "hasAnyRole('ROLE_ADMIN')" )
    @GetMapping( value = "/items/toMove" )
    public ResponseEntity<List<PlanItemInfoDTO>> getPlanItemsToMove(
            @RequestParam Year year,
            @RequestParam long teamId) throws NoSuchElementException {
        Plan plan = this.planService.getPlanForTeamAndPreviousYear(teamId, year);
        List<PlanItemInfoDTO> planItemInfoDTOList = this.planService.getNotFinishedPlanItemsDTO(plan.getId());
        return new ResponseEntity<>(planItemInfoDTOList, HttpStatus.OK);
    }

    // TODO nie wiem czy to potrzebne - do weryfikacji (jest endpoint getPlan())
    @PreAuthorize( "hasRole('ROLE_ADMIN')" )
    @GetMapping( "/forTeam" )
    public ResponseEntity<Plan> getPlanForTeamAndYear(
            @RequestParam long teamId,
            @RequestParam Year year
    ) {
        Plan plan = this.planService.getPlanForTeamAndYear(teamId, year);
        return new ResponseEntity<>(plan, HttpStatus.OK);
    }

    @PreAuthorize( "hasAnyRole('ROLE_ADMIN')" )
    @PutMapping( value = "/{planId}/move" )
    public ResponseEntity<String> movePlanItemsFromPlan(
            @PathVariable long planId) throws IllegalArgumentException {
        this.planService.moveUnfinishedTasksFromPreviousYear(planId);
        return new ResponseEntity<>("All tasks moved", HttpStatus.OK);
    }

    @GetMapping( value = "/dropdown/info" )
    public ResponseEntity<TeamsAndYearsWithPlanDTO> getYearsWithPlanForTeams() {
        return new ResponseEntity<>(this.planService.collectTeamsAndYearsWithPlan(), HttpStatus.OK);
    }
}
