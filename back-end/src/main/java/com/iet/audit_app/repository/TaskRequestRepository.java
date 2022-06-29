package com.iet.audit_app.repository;

import com.iet.audit_app.model.entity.Company;
import com.iet.audit_app.model.entity.Employee;
import com.iet.audit_app.model.entity.TaskRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRequestRepository extends JpaRepository<TaskRequest, Long> {

    List<TaskRequest> getAllByTaskManager_Id(long managerId);

    boolean existsByTaskManagerOrTeamMembersContains(Employee manager, Employee teamMember);

    boolean existsByAuditedCompaniesContains(Company company);
}
