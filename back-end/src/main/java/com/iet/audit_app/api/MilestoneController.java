package com.iet.audit_app.api;

import com.iet.audit_app.model.dto.milestone.MilestoneUpdateDTO;
import com.iet.audit_app.service.task.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/milestones")
public class MilestoneController {

    private final TaskService taskService;

    @Autowired
    public MilestoneController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PutMapping
    public ResponseEntity<String> updateMilestone(
            @RequestHeader( "Authorization" ) String token,
            @RequestBody MilestoneUpdateDTO milestoneUpdateDTO
    ) throws IllegalAccessException, IllegalArgumentException {
        this.taskService.updateMilestone(token, milestoneUpdateDTO);
        return ResponseEntity.ok("Milestone updated successfully");
    }
}
