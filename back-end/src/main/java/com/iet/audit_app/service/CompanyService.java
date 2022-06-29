package com.iet.audit_app.service;

import com.iet.audit_app.model.dto.company.CompanyCreateDTO;
import com.iet.audit_app.model.entity.Company;
import com.iet.audit_app.repository.CompanyRepository;
import com.iet.audit_app.security.RoleValidator;
import com.iet.audit_app.security.jwt.JwtUtil;
import org.openqa.selenium.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    private final RoleValidator roleValidator;

    private final JwtUtil jwtUtil;

    private final EmployeeService employeeService;

    @Autowired
    public CompanyService(CompanyRepository companyRepository, RoleValidator roleValidator,
                          JwtUtil jwtUtil, EmployeeService employeeService) {
        this.jwtUtil = jwtUtil;
        this.roleValidator = roleValidator;
        this.companyRepository = companyRepository;
        this.employeeService = employeeService;
    }


    public Company getCompanyById(long id) {
        return this.companyRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Company does not exist"));
    }

    public Company getCompanyByAcronym(String acronym) {
        return this.companyRepository.getCompanyByAcronymEquals(acronym)
                .orElseThrow(() -> new NotFoundException("Acronym {" + acronym + "} does not match any company"));
    }

    private void saveCompany(Company company) {
        this.companyRepository.save(company);
    }

    public List<Company> getAll() {
        return this.companyRepository.findAll();
    }

    public List<Company> getCompaniesById(List<Long> companies) {
        return this.companyRepository.findAllById(companies);
    }

    public void createCompany(CompanyCreateDTO dto) {
        boolean exists = getAll().stream()
                .anyMatch(company -> company.getName()
                        .equalsIgnoreCase(dto.getName()) || company.getAcronym()
                        .equalsIgnoreCase(dto.getAcronym()));
        if (exists) {
            throw new IllegalArgumentException(
                    "Company with given name or acronym already exists (" + dto.getName() + ", " + dto.getAcronym() + ")");
        }
        saveCompany(new Company(dto.getName(), dto.getAcronym()));
    }

    public void deleteCompany(long companyId) {
        companyRepository.deleteById(companyId);
    }
}
