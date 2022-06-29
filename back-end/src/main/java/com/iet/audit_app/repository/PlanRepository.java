package com.iet.audit_app.repository;

import com.iet.audit_app.model.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Year;
import java.util.List;
import java.util.Optional;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Long> {

    Optional<Plan> getPlanByYearAndAuditingTeamId(Year year, long auditingTeamId);

    List<Plan> findAllByYearEquals(Year year);

    List<Plan> getPlansByAuditingTeamId(long teamId);
}
