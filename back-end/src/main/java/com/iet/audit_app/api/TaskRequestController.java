package com.iet.audit_app.api;

import com.iet.audit_app.model.dto.task_request.TaskRequestAcceptDTO;
import com.iet.audit_app.model.dto.task_request.TaskRequestCreateDTO;
import com.iet.audit_app.model.dto.task_request.TaskRequestGetDTO;
import com.iet.audit_app.service.PlanService;
import com.iet.audit_app.service.TaskRequestService;
import com.iet.audit_app.service.task.TaskService;
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

import javax.mail.MessagingException;
import java.time.Year;
import java.util.List;

@RestController
@RequestMapping( "/api/taskRequests" )
public class TaskRequestController {

    private final TaskRequestService taskRequestService;

    private final TaskService taskService;

    private final PlanService planService;

    @Autowired
    public TaskRequestController(
            TaskRequestService taskRequestService,
            TaskService taskService,
            PlanService planService
    ) {
        this.taskRequestService = taskRequestService;
        this.taskService = taskService;
        this.planService = planService;
    }

    @PostMapping
    public ResponseEntity<String> createTaskRequest(@RequestBody TaskRequestCreateDTO taskRequestCreateDTO,
                                                    @RequestHeader( "Authorization" ) String token) {
        this.taskRequestService.createTaskRequest(taskRequestCreateDTO, token);
        return new ResponseEntity<>("Task request added successfully", HttpStatus.OK);
    }

    @PreAuthorize( "hasRole('ROLE_ADMIN')" )
    @GetMapping
    public ResponseEntity<List<TaskRequestGetDTO>> getAllTaskRequests() {
        return new ResponseEntity<>(this.taskRequestService.getAll(), HttpStatus.OK);
    }

    @GetMapping( "/my" )      //todo zmienic sciezke?
    public ResponseEntity<List<TaskRequestGetDTO>> getTaskRequestsForEmployee(
            @RequestHeader( "Authorization" ) String token
    ) {
        return new ResponseEntity<>(this.taskRequestService.getTaskRequestsForEmployee(token), HttpStatus.OK);
    }

    @PreAuthorize( "hasRole('ROLE_ADMIN')" )
    @GetMapping( "/{id}" )
    public ResponseEntity<TaskRequestGetDTO> getOneTaskRequest(@PathVariable long id) {
        return new ResponseEntity<>(this.taskRequestService.getOneTaskRequest(id), HttpStatus.OK);
    }

    @PreAuthorize( "hasRole('ROLE_ADMIN')" )
    @PutMapping( "/acceptance" )
    public ResponseEntity<String> acceptTaskRequest(@RequestBody TaskRequestAcceptDTO taskRequestAcceptDTO,
                                                    @RequestHeader( "Authorization" ) String token) throws MessagingException {
        this.taskRequestService.acceptTaskRequest(taskRequestAcceptDTO, token);
        this.taskService.createTask(
                taskRequestAcceptDTO,
                this.planService.getPlanForYearForUser(
                        Year.of(taskRequestAcceptDTO.getStartDate()
                                .getYear()),
                        taskRequestAcceptDTO.getTaskManagerId()),
                token);
        return new ResponseEntity<>("Request accepted and task created", HttpStatus.OK);
    }

    @PreAuthorize( "hasRole('ROLE_ADMIN')" )
    @PutMapping( "/rejection" )
    public ResponseEntity<String> rejectTaskRequest(@RequestParam long taskRequestId,
                                                    @RequestHeader( "Authorization" ) String token) {
        this.taskRequestService.rejectTaskRequest(taskRequestId, token);
        return new ResponseEntity<>("Request was rejected", HttpStatus.OK);
    }
}
