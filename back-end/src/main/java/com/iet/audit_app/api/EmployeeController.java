package com.iet.audit_app.api;


import com.iet.audit_app.model.dto.employee.EmployeeCreateDTO;
import com.iet.audit_app.model.dto.employee.EmployeeDetailsGetDTO;
import com.iet.audit_app.model.dto.employee.EmployeeEditDTO;
import com.iet.audit_app.model.dto.employee.EmployeeGetDTO;
import com.iet.audit_app.model.dto.employee.EmployeeWithDeletionInfoGetDTO;
import com.iet.audit_app.model.dto.employee.PasswordDTO;
import com.iet.audit_app.model.entity.Employee;
import com.iet.audit_app.model.enums.Role;
import com.iet.audit_app.security.jwt.JwtUtil;
import com.iet.audit_app.service.EmployeeService;
import com.iet.audit_app.service.TaskRequestService;
import com.iet.audit_app.service.TeamService;
import com.iet.audit_app.service.task.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping( "/api/employees" )
public class EmployeeController {

    private final EmployeeService employeeService;

    private final TeamService teamService;

    private final JwtUtil jwtUtil;

    private final TaskService taskService;

    private final TaskRequestService taskRequestService;

    public EmployeeController(EmployeeService employeeService, TeamService teamService,
                              JwtUtil jwtUtil, TaskService taskService, TaskRequestService taskRequestService) {
        this.employeeService = employeeService;
        this.teamService = teamService;
        this.jwtUtil = jwtUtil;
        this.taskService = taskService;
        this.taskRequestService = taskRequestService;
    }

    @GetMapping
    public ResponseEntity<List<EmployeeGetDTO>> getEmployees() {
        List<Employee> employees = employeeService.getAllActive();
        List<EmployeeGetDTO> employeesGetDTO = employees.stream()
                .map(EmployeeGetDTO::new)
                .collect(Collectors.toList());
        return new ResponseEntity<>(employeesGetDTO, HttpStatus.OK);
    }

    @PreAuthorize( "hasRole('ROLE_ADMIN')" )
    @PostMapping
    public void createEmployee(@RequestBody EmployeeCreateDTO employeeCreateDTO) throws MessagingException {
        employeeService.createEmployee(
                employeeCreateDTO,
                teamService.getTeamById(employeeCreateDTO.getTeamId())
        );
    }

    @PreAuthorize( "hasRole('ROLE_ADMIN')" )
    @PutMapping
    public ResponseEntity<String> editEmployee(@RequestBody EmployeeEditDTO employeeEditDTO) {
        employeeService.editEmployee(employeeEditDTO, teamService.getTeamById(employeeEditDTO.getNewTeamId()));
        return new ResponseEntity<>("Employee edited successfully", HttpStatus.OK);
    }

    @PutMapping( "/changePassword" )
    public void changePassword(@RequestHeader( "Authorization" ) String token,
                               @RequestBody PasswordDTO passwordDTO) throws IllegalAccessException {
        employeeService.changePassword(jwtUtil.extractUsername(token), passwordDTO);
    }

    @PreAuthorize( "hasRole('ROLE_ADMIN')" )
    @GetMapping( "/roles" )
    public ResponseEntity<Role[]> getRoles() {
        return new ResponseEntity<>(Role.values(), HttpStatus.OK);
    }

    @GetMapping( "/me" )
    public ResponseEntity<EmployeeDetailsGetDTO> getMyProfileInfo(@RequestHeader( "Authorization" ) String token) {
        EmployeeDetailsGetDTO employeeDTO = new EmployeeDetailsGetDTO(
                employeeService.getEmployeeByEmail(jwtUtil.extractUsername(token)));
        return new ResponseEntity<>(employeeDTO, HttpStatus.OK);
    }

    @PreAuthorize( "hasRole('ROLE_ADMIN')" )
    @GetMapping( "/withDeletionInfo" )
    public ResponseEntity<List<EmployeeWithDeletionInfoGetDTO>> getEmployeesInfo() {
        List<EmployeeWithDeletionInfoGetDTO> employees = employeeService.getAll()
                .stream()
                .map(employee -> {
                    boolean canBeDeleted = !taskService.employeeIsConnectedToAnyTask(
                            employee) && !taskRequestService.employeeIsConnectedToAnyRequest(employee);
                    return new EmployeeWithDeletionInfoGetDTO(employee, canBeDeleted);
                })
                .collect(Collectors.toList());
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @PreAuthorize( "hasRole('ROLE_ADMIN')" )
    @PutMapping( "/deactivate" )
    public ResponseEntity<String> deactivateEmployee(@RequestParam long employeeId) {
        employeeService.deactivateEmployee(employeeId);
        return new ResponseEntity<>("Employee deactivated successfully", HttpStatus.OK);
    }

    @PreAuthorize( "hasRole('ROLE_ADMIN')" )
    @DeleteMapping
    public ResponseEntity<String> deleteEmployee(@RequestParam long employeeId) {
        employeeService.deleteEmployee(employeeId);
        return new ResponseEntity<>("Employee deleted successfully", HttpStatus.OK);
    }
}
