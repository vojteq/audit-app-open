package com.iet.audit_app.repository;

import com.iet.audit_app.model.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> getEmployeeByEmail(String email);

    List<Employee> getEmployeesByTeamId(long teamId);

    List<Employee> getEmployeesByIdIn(List<Long> ids);
}
