package com.iet.audit_app.repository;

import com.iet.audit_app.model.entity.Company;
import com.iet.audit_app.model.entity.Employee;
import com.iet.audit_app.model.entity.Task;
import com.iet.audit_app.model.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Year;
import java.util.*;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    Optional<Task> getTaskById(long Id);

    List<Task> getTasksByTaskManagerId(long taskManager_id);

    List<Task> getTasksByYear(Year year);

    List<Task> getTasksByTeamAndYear(Team team, Year year);

    List<Task> getTasksByTeamMembersContains(Employee employee);

    boolean existsByTaskManagerOrTeamMembersContains(Employee manager, Employee teamMember);

    boolean existsByAuditedCompaniesContains(Company company);
}
