package com.iet.audit_app.repository;

import com.iet.audit_app.model.entity.Suspension;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;
import java.util.List;

@Repository
public interface SuspensionRepository extends JpaRepository<Suspension, Long> {

    Optional<Suspension> findByDateFromAndReason(LocalDate dateFrom, String reason);

    List<Suspension> findSuspensionsByTaskId(long taskId);
}
