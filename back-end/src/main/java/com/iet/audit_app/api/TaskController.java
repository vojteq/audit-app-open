package com.iet.audit_app.api;


import com.iet.audit_app.common.RequestUtils;
import com.iet.audit_app.model.dto.common.DateDTO;
import com.iet.audit_app.model.dto.task.TaskAccessibilityDTO;
import com.iet.audit_app.model.dto.task.TaskDTO;
import com.iet.audit_app.model.dto.task.TaskEditDTO;
import com.iet.audit_app.model.dto.task.TaskProgressDTO;
import com.iet.audit_app.model.dto.task.TaskReducedInfoDTO;
import com.iet.audit_app.model.dto.task.TaskSuspensionDTO;
import com.iet.audit_app.model.dto.team.TeamsWithTasksDTO;
import com.iet.audit_app.service.task.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping( value = "/api/tasks" )
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping( "/{id}" )
    public ResponseEntity<TaskDTO> getTask(
            @PathVariable long id,
            @RequestHeader( "Authorization" ) String token
    ) throws NoSuchElementException, IllegalAccessException {
        TaskDTO taskDTO = this.taskService.getTaskById(id, token);
        return new ResponseEntity<>(taskDTO, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getTasks(
            @RequestHeader( "Authorization" ) String token
    ) throws NoSuchElementException {
        List<TaskDTO> tasks = taskService.getTaskDTOsByToken(token);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping( "/everything" )
    public ResponseEntity<List<TaskReducedInfoDTO>> getAllTasksWithReducedInfo() {
        List<TaskReducedInfoDTO> tasks = taskService.getAllTasksReducedDto();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PreAuthorize( "hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER_TD', 'ROLE_MANAGER_KW', 'ROLE_MANAGER_AW')" )
    @GetMapping( "/all" )
    public ResponseEntity<TeamsWithTasksDTO> getTasksByTeamAndYear(
            HttpServletRequest request) throws NoSuchElementException {
        TeamsWithTasksDTO teamsWithTasksDTO = taskService.getAllTasksUnderSupervisedTeams(
                RequestUtils.getAuthorizationHeader(request), RequestUtils.getParameters(request));
        return new ResponseEntity<>(teamsWithTasksDTO, HttpStatus.OK);
    }

    @GetMapping( "/{taskId}/progress" )
    public ResponseEntity<TaskProgressDTO> getTaskProgress(
            @RequestHeader( "Authorization" ) String token,
            @PathVariable long taskId
    ) throws IllegalAccessException {
        TaskProgressDTO taskProgressDTO = this.taskService.getTaskProgress(token, taskId);
        return new ResponseEntity<>(taskProgressDTO, HttpStatus.OK);
    }

    @PutMapping( "/{taskId}/finishedDate" )
    public ResponseEntity<String> setFinishedDate(
            @RequestHeader( "Authorization" ) String token,
            @RequestBody DateDTO date,
            @PathVariable long taskId
    ) throws IllegalAccessException, MessagingException {
        this.taskService.setFinishedDate(token, taskId, date.getDate());
        return new ResponseEntity<>("Finished date set successfully", HttpStatus.OK);
    }

    @PutMapping( "/{taskId}/correctedDate" )
    public ResponseEntity<String> setCorrectedFinishDate(
            @RequestHeader( "Authorization" ) String token,
            @RequestBody DateDTO date,
            @PathVariable long taskId
    ) throws IllegalAccessException {
        this.taskService.setCorrectedFinishDate(token, taskId, date.getDate());
        return new ResponseEntity<>("Corrected finish date set successfully", HttpStatus.OK);
    }

    @PutMapping( "/edit" )
    public ResponseEntity<String> editTaskInformation(@RequestHeader( "Authorization" ) String token,
                                                      @RequestBody TaskEditDTO taskEditDTO) throws IllegalAccessException {
        this.taskService.editTaskInformation(token, taskEditDTO);
        return new ResponseEntity<>("Task information edited successfully", HttpStatus.OK);
    }

    @PreAuthorize( "hasRole('ROLE_ADMIN')" )
    @GetMapping( "/all/statistics" )
    public ResponseEntity<?> getAllStats(HttpServletRequest request) {
        List<TaskProgressDTO> stats = this.taskService.getAllTaskStatsWithFilters(RequestUtils.getParameters(request));
        return new ResponseEntity<>(stats, HttpStatus.OK);
    }

    @PutMapping( "/{taskId}/suspended" )
    public ResponseEntity<String> suspendTask(@RequestHeader( "Authorization" ) String token,
                                              @RequestBody TaskSuspensionDTO taskSuspensionDTO,
                                              @PathVariable long taskId
    ) throws IllegalAccessException, IllegalArgumentException {
        this.taskService.manageTaskSuspension(taskId, token, taskSuspensionDTO);
        return new ResponseEntity<>("Task suspension managed", HttpStatus.OK);
    }

    @GetMapping( "/accessibility" )
    public ResponseEntity<TaskAccessibilityDTO> getTaskAccessibility(@RequestHeader( "Authorization" ) String token,
                                                                     @RequestParam long taskId) {
        TaskAccessibilityDTO dto = taskService.getTaskAccessibilityForUser(token, taskId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PutMapping( "/{taskId}/actions/operational" )
    public ResponseEntity<String> setTaskOperationalActions(@RequestHeader( "Authorization" ) String token,
                                                            @PathVariable long taskId) throws IllegalAccessException {
        this.taskService.setOperationalActionsFlag(token, taskId);
        return new ResponseEntity<>("Successfully set operational actions flag", HttpStatus.OK);
    }

}
