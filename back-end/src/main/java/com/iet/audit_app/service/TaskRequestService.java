package com.iet.audit_app.service;

import com.iet.audit_app.model.dto.task_request.TaskRequestAcceptDTO;
import com.iet.audit_app.model.dto.task_request.TaskRequestCreateDTO;
import com.iet.audit_app.model.dto.task_request.TaskRequestGetDTO;
import com.iet.audit_app.model.entity.Company;
import com.iet.audit_app.model.entity.Employee;
import com.iet.audit_app.model.entity.TaskRequest;
import com.iet.audit_app.model.enums.Acceptance;
import com.iet.audit_app.repository.TaskRequestRepository;
import com.iet.audit_app.security.jwt.JwtUtil;
import com.iet.audit_app.service.task.TaskUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class TaskRequestService {

    private final TaskRequestRepository taskRequestRepository;

    private final EmployeeService employeeService;

    private final JwtUtil jwtUtil;

    private final MethodologyService methodologyService;

    private final CompanyService companyService;

    private final Logger logger = LogManager.getLogger(this.getClass());

    @Autowired
    public TaskRequestService(TaskRequestRepository taskRequestRepository, EmployeeService employeeService,
                              JwtUtil jwtUtil, MethodologyService methodologyService,
                              CompanyService companyService) {
        this.taskRequestRepository = taskRequestRepository;
        this.employeeService = employeeService;
        this.jwtUtil = jwtUtil;
        this.methodologyService = methodologyService;
        this.companyService = companyService;
    }

    public List<TaskRequestGetDTO> getAll() {
        List<Company> companies = this.companyService.getAll();
        return this.taskRequestRepository
                .findAll()
                .stream()
                .map(taskRequest -> {
                    List<Company> nonAuditedCompanies = new ArrayList<>(List.copyOf(companies));
                    nonAuditedCompanies.removeAll(taskRequest.getAuditedCompanies());
                    return new TaskRequestGetDTO(taskRequest, taskRequest.getTaskManager()
                            .getTeam(), nonAuditedCompanies);
                })
                .sorted(getTaskRequestComparator())
                .collect(Collectors.toList());
    }

    public TaskRequest getById(long id) {
        return this.taskRequestRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Task request with id=" + id + " does not exist"));
    }

    public List<TaskRequestGetDTO> getTaskRequestsForEmployee(String token) {
        Employee employee = this.employeeService.getEmployeeByEmail(this.jwtUtil.extractUsername(token));
        List<Company> companies = this.companyService.getAll();
        return this.taskRequestRepository
                .getAllByTaskManager_Id(employee.getId())
                .stream()
                .map(taskRequest -> {
                    List<Company> nonAuditedCompanies = new ArrayList<>(List.copyOf(companies));
                    nonAuditedCompanies.removeAll(taskRequest.getAuditedCompanies());
                    return new TaskRequestGetDTO(taskRequest, employee.getTeam(), nonAuditedCompanies);
                })
                .collect(Collectors.toList());
    }

    public boolean employeeIsConnectedToAnyRequest(Employee employee) {
        return taskRequestRepository.existsByTaskManagerOrTeamMembersContains(employee, employee);
    }


    //TODO zmienić nazwę i opisac w komentarzu
    public TaskRequestGetDTO getOneTaskRequest(long id) {
        TaskRequest taskRequest = getById(id);
        List<Company> nonAuditedCompanies = this.companyService.getAll();
        nonAuditedCompanies.removeAll(taskRequest.getAuditedCompanies());
        return new TaskRequestGetDTO(taskRequest, taskRequest.getTaskManager()
                .getTeam(), nonAuditedCompanies);
    }


    public void createTaskRequest(TaskRequestCreateDTO dto, String token) throws IllegalArgumentException {
        Employee employee = this.employeeService.getEmployeeById(dto.getTaskManagerId());

        this.validateDates(dto.getStartDate(), dto.getPlannedFinishedDate());

        TaskRequest taskRequest = new TaskRequest(
                dto.getTopic(),
                employee,
                dto.getTaskType(),
                this.methodologyService.getMethodologyById(dto.getMethodologyId()),
                this.companyService.getCompaniesById(dto.getAuditedCompanies()),
                this.employeeService.getEmployeesByIds(dto.getTeamMembers()),
                dto.getStartDate(),
                dto.getPlannedFinishedDate(),
                dto.isAdHoc(),
                TaskUtils.externalEmployeesListToString(dto.getExternalEmployees())
        );

        this.taskRequestRepository.save(taskRequest);

        logger.info("User {} created new TaskRequest: {}", jwtUtil.extractUsername(token), taskRequest);
    }


    public void acceptTaskRequest(TaskRequestAcceptDTO dto, String token) throws IllegalArgumentException {
        //find valid task request in database
        TaskRequest taskRequest = getById(dto.getTaskRequestId());
        if (!taskRequest.getAcceptance()
                .equals(Acceptance.PENDING)) {
            logger.info("User {} tried to accept not valid TaskRequest: {}", jwtUtil.extractUsername(token),
                    taskRequest);
            throw new IllegalArgumentException("This task request cannot be accepted");
        }
        //save possible changes made by admin in task request
        this.validateDates(dto.getStartDate(), dto.getPlannedFinishedDate());
        taskRequest.setTopic(dto.getTopic());
        taskRequest.setTaskManager(this.employeeService.getEmployeeById(dto.getTaskManagerId()));
        taskRequest.setTaskType(dto.getTaskType());
        taskRequest.setMethodology(this.methodologyService.getMethodologyById(dto.getMethodologyId()));
        taskRequest.setAuditedCompanies(this.companyService.getCompaniesById(dto.getAuditedCompanies()));
        taskRequest.setStartDate(dto.getStartDate());
        taskRequest.setPlannedFinishedDate(dto.getPlannedFinishedDate());
        taskRequest.setAcceptance(Acceptance.ACCEPTED);
        taskRequest.setAdHoc(dto.isAdHoc());
        taskRequest.setExternalEmployees(TaskUtils.externalEmployeesListToString(dto.getExternalEmployees()));
        this.taskRequestRepository.save(taskRequest);

        logger.info("User {} accepted TaskRequest: {}", jwtUtil.extractUsername(token), taskRequest);
    }


    public void rejectTaskRequest(long taskRequestId, String token) throws IllegalArgumentException {
        TaskRequest taskRequest = getById(taskRequestId);
        if (!taskRequest.getAcceptance()
                .equals(Acceptance.PENDING)) {
            logger.info("User {} tried to accept not valid TaskRequest: {}", jwtUtil.extractUsername(token),
                    taskRequest);
            throw new IllegalArgumentException("This task request cannot be rejected.");
        }
        taskRequest.setAcceptance(Acceptance.REJECTED);
        this.taskRequestRepository.save(taskRequest);
        logger.info("User {} rejected TaskRequest: {}", jwtUtil.extractUsername(token), taskRequest);
    }

    public boolean companyIsConnectedToAnyRequest(Company company) {
        return taskRequestRepository.existsByAuditedCompaniesContains(company);
    }

    private void validateDates(LocalDate startDate, LocalDate plannedFinishedDate) {
        LocalDate now = LocalDate.now();
        if (startDate.isBefore(now)) {
            throw new IllegalArgumentException("Start date cannot be in the past");
        }
        if (plannedFinishedDate.isBefore(now)) {
            throw new IllegalArgumentException("Planned finished date cannot be in the past");
        }
        if (plannedFinishedDate.isBefore(startDate)) {
            throw new IllegalArgumentException("Planned finished date cannot be before start date");
        }
    }

    private Comparator<TaskRequestGetDTO> getTaskRequestComparator() {
        return Comparator.comparingInt(o -> o.getAcceptance()
                .ordinal());
    }
}
