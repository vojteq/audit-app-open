package com.iet.audit_app.service;

import com.iet.audit_app.common.MailSender;
import com.iet.audit_app.common.MailStringUtils;
import com.iet.audit_app.common.PasswordGenerator;
import com.iet.audit_app.model.dto.employee.EmployeeCreateDTO;
import com.iet.audit_app.model.dto.employee.EmployeeEditDTO;
import com.iet.audit_app.model.dto.employee.EmployeeNameDTO;
import com.iet.audit_app.model.dto.employee.PasswordDTO;
import com.iet.audit_app.model.entity.Employee;
import com.iet.audit_app.model.entity.Team;
import com.iet.audit_app.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    private final MailSender mailSender;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public EmployeeService(EmployeeRepository repository, MailSender mailSender, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.mailSender = mailSender;
        this.passwordEncoder = passwordEncoder;
    }

    public Employee getEmployeeById(long id) {
        return this.repository.findById(id)
                .orElseThrow();
    }

    public List<Employee> getEmployeesByIds(List<Long> ids) {
        return this.repository.getEmployeesByIdIn(ids);
    }

    public Employee getEmployeeByEmail(String email) {
        return this.repository.getEmployeeByEmail(email)
                .orElseThrow(() -> new NoSuchElementException("Employee does not exist"));
    }

    public List<Employee> getAllActive() {
        return getAll().stream()
                .filter(Employee::isActive)
                .collect(Collectors.toList());
    }

    public List<Employee> getAll() {
        return this.repository.findAll();
    }

    public void saveEmployee(Employee employee) {
        this.repository.save(employee);
    }

    public List<Employee> getEmployeesByTeamId(long teamId) {
        return this.repository.getEmployeesByTeamId(teamId);
    }

    public List<EmployeeNameDTO> getEmployeeNamesByTeamId(long teamId) {
        return getEmployeesByTeamId(teamId).stream()
                .map(EmployeeNameDTO::new)
                .collect(Collectors.toList());
    }

    public void createEmployee(EmployeeCreateDTO employeeCreateDTO, Team team) throws MessagingException {
        repository.getEmployeeByEmail(employeeCreateDTO.getEmail())
                .ifPresent(employee -> {
                    throw new IllegalArgumentException("Employee with this email already exist");
                });
        String password = PasswordGenerator.generatePassword();
        Employee employee = new Employee(
                employeeCreateDTO.getFirstName(),
                employeeCreateDTO.getLastName(),
                true,
                employeeCreateDTO.getEmail(),
                passwordEncoder.encode(password),
                employeeCreateDTO.getRole(),
                team
        );
        repository.save(employee);
        mailSender.sendEmail(MailStringUtils.MailType.PASSWORD_GENERATION_NOTIFICATION, employee.getEmail(),
                new String[] { password });
    }

    public void editEmployee(EmployeeEditDTO dto, Team team) {
        Employee employee = getEmployeeById(dto.getEmployeeId());
        if (!employee.isActive()) {
            throw new IllegalArgumentException("Cant edit deactivated employee");
        }
        employee.setTeam(team);
        employee.setRole(dto.getRole());
        saveEmployee(employee);
    }

    public void deactivateEmployee(long employeeId) {
        Employee employee = getEmployeeById(employeeId);
        employee.setActive(false);
        saveEmployee(employee);
    }

    public void deleteEmployee(long employeeId) {
        repository.deleteById(employeeId);
    }

    public void changePassword(String email, PasswordDTO passwordDTO) throws IllegalAccessException {
        Employee employee = getEmployeeByEmail(email);
        if (!passwordEncoder.matches(passwordDTO.getOldPassword(), employee.getPassword())) {
            throw new IllegalAccessException("Old password does not match");
        }
        employee.setPassword(passwordEncoder.encode(passwordDTO.getNewPassword()));
        saveEmployee(employee);
    }
}
