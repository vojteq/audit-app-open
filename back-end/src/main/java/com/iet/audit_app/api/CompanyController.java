package com.iet.audit_app.api;

import com.iet.audit_app.model.dto.company.CompanyCreateDTO;
import com.iet.audit_app.model.dto.company.CompanyWithDeletionInfoGetDTO;
import com.iet.audit_app.model.entity.Company;
import com.iet.audit_app.service.CompanyService;
import com.iet.audit_app.service.TaskRequestService;
import com.iet.audit_app.service.task.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping( "/api/companies" )
public class CompanyController {

    private final CompanyService companyService;

    private final TaskService taskService;

    private final TaskRequestService taskRequestService;

    public CompanyController(CompanyService companyService, TaskService taskService,
                             TaskRequestService taskRequestService) {
        this.companyService = companyService;
        this.taskService = taskService;
        this.taskRequestService = taskRequestService;
    }

    @GetMapping
    public ResponseEntity<List<Company>> getCompanies() {
        List<Company> companies = companyService.getAll();
        return new ResponseEntity<>(companies, HttpStatus.OK);
    }

    @PreAuthorize( "hasRole('ROLE_ADMIN')" )
    @PostMapping
    public ResponseEntity<String> createCompany(@RequestBody CompanyCreateDTO dto) {
        companyService.createCompany(dto);
        return new ResponseEntity<>("Company created successfully", HttpStatus.CREATED);
    }

    @PreAuthorize( "hasRole('ROLE_ADMIN')" )
    @GetMapping( "/withDeletionInfo" )
    public ResponseEntity<List<CompanyWithDeletionInfoGetDTO>> getCompaniesInfo() {
        List<CompanyWithDeletionInfoGetDTO> companies = companyService.getAll()
                .stream()
                .map(company -> {
                    boolean canBeDeleted = !taskService.companyIsConnectedToAnyTask(
                            company) && !taskRequestService.companyIsConnectedToAnyRequest(company);
                    return new CompanyWithDeletionInfoGetDTO(company, canBeDeleted);
                })
                .collect(Collectors.toList());
        return new ResponseEntity<>(companies, HttpStatus.OK);
    }

    @PreAuthorize( "hasRole('ROLE_ADMIN')" )
    @DeleteMapping
    public ResponseEntity<?> deleteCompany(@RequestParam long companyId) {
        Company company = companyService.getCompanyById(companyId);
        boolean canBeDeleted = !taskService.companyIsConnectedToAnyTask(
                company) && !taskRequestService.companyIsConnectedToAnyRequest(company);
        if (canBeDeleted) {
            companyService.deleteCompany(companyId);
            return new ResponseEntity<>("Company deleted successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Company cannot be deleted", HttpStatus.NOT_MODIFIED);
    }
}
