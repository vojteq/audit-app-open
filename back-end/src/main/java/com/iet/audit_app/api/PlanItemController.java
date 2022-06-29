package com.iet.audit_app.api;

import com.iet.audit_app.model.dto.plan_item.PlanItemCreateDTO;
import com.iet.audit_app.model.entity.PlanItem;
import com.iet.audit_app.service.PlanItemService;
import com.iet.audit_app.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.NoSuchElementException;

@RestController
@RequestMapping( value = "/api/planItem" )
public class PlanItemController {

    private final PlanItemService planItemService;

    private final PlanService planService;

    @Autowired
    public PlanItemController(PlanItemService planItemService, PlanService planService) {
        this.planItemService = planItemService;
        this.planService = planService;
    }

    @PreAuthorize( "hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER')" )
    @GetMapping( value = "/{id}" )
    public ResponseEntity<PlanItem> getPlanItem(@PathVariable Long id) throws NoSuchElementException {
        PlanItem planItem = this.planItemService.findPlanItemById(id);
        return new ResponseEntity<>(planItem, HttpStatus.OK);
    }

    @PreAuthorize( "hasRole('ROLE_ADMIN')" )
    @PostMapping
    public ResponseEntity<String> createPlanItem(
            @RequestBody PlanItemCreateDTO planItemCreateDTO) throws NoSuchElementException {
        this.planItemService.create(planItemCreateDTO, planService.getById(planItemCreateDTO.getPlanId()));
        return new ResponseEntity<>("Plan item added successfully", HttpStatus.OK);
    }

    @PreAuthorize( "hasRole('ROLE_ADMIN')" )
    @DeleteMapping
    public ResponseEntity<String> deletePlanItem(@RequestParam long planItemId) {
        this.planItemService.delete(planItemId);
        return new ResponseEntity<>("Plan item deleted successfully", HttpStatus.OK);
    }
}
