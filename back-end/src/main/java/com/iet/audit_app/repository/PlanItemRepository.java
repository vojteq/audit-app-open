package com.iet.audit_app.repository;

import com.iet.audit_app.model.entity.PlanItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Year;
import java.util.Optional;

import java.util.List;

@Repository
public interface PlanItemRepository extends JpaRepository<PlanItem, Long> {
    Optional<PlanItem> getPlanItemById(Long id);

    List<PlanItem> getAllByPlan_Id(long planId);

    List<PlanItem> getAllByPlanYear(Year year);

    Optional<PlanItem> getPlanItemByTaskId(long taskID);
}
